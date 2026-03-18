import os
import sys

# Add the src folder to the Python path so Vercel can find it
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from server import app
