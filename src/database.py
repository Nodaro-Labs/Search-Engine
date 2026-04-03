import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

# Get the database connection string from your .env file or environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

def get_connection():
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable is missing. Please add it to your .env file.")
    return psycopg2.connect(DATABASE_URL)

def init_db():
    if not DATABASE_URL:
        return
    conn = get_connection()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS project_likes (
            project_title TEXT PRIMARY KEY,
            likes_count INTEGER DEFAULT 0
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS user_likes (
            user_token TEXT,
            project_title TEXT,
            PRIMARY KEY (user_token, project_title)
        )
    ''')
    conn.commit()
    conn.close()

def get_project_likes(project_title):
    if not DATABASE_URL: return 0
    conn = get_connection()
    c = conn.cursor()
    c.execute('SELECT likes_count FROM project_likes WHERE project_title = %s', (project_title,))
    row = c.fetchone()
    conn.close()
    return row[0] if row is not None else 0

def toggle_like(user_token, project_title):
    if not DATABASE_URL: return False, [], 0
    conn = get_connection()
    c = conn.cursor()
    
    # Check if already liked
    c.execute('SELECT 1 FROM user_likes WHERE user_token = %s AND project_title = %s', (user_token, project_title))
    liked = c.fetchone() is not None
    
    if liked:
        # Unlike
        c.execute('DELETE FROM user_likes WHERE user_token = %s AND project_title = %s', (user_token, project_title))
        c.execute('UPDATE project_likes SET likes_count = GREATEST(0, likes_count - 1) WHERE project_title = %s', (project_title,))
    else:
        # Like
        c.execute('INSERT INTO user_likes (user_token, project_title) VALUES (%s, %s)', (user_token, project_title))
        c.execute('INSERT INTO project_likes (project_title, likes_count) VALUES (%s, 0) ON CONFLICT (project_title) DO NOTHING', (project_title,))
        c.execute('UPDATE project_likes SET likes_count = likes_count + 1 WHERE project_title = %s', (project_title,))
        
    conn.commit()
    
    c.execute('SELECT project_title FROM user_likes WHERE user_token = %s', (user_token,))
    liked_projects = [r[0] for r in c.fetchall()]
    
    c.execute('SELECT likes_count FROM project_likes WHERE project_title = %s', (project_title,))
    row = c.fetchone()
    total_likes = row[0] if row is not None else 0
    
    conn.close()
    
    return not liked, liked_projects, total_likes

def get_user_likes(user_token):
    if not DATABASE_URL: return []
    conn = get_connection()
    c = conn.cursor()
    c.execute('SELECT project_title FROM user_likes WHERE user_token = %s', (user_token,))
    liked_projects = [r[0] for r in c.fetchall()]
    conn.close()
    return liked_projects

try:
    init_db()
except Exception as e:
    print(f"Warning: Could not initialize database: {e}")
