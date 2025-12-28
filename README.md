# Search-Engine

---

## Overview
This repository contains the internal codebase for the Nodaro Search Engine
It is maintained by the Nodaro team and is intended for internal contributors.

---

## Prerequisites
Make sure you have the following installed:
- Git
- Node.js / Python / Arduino IDE / etc.
- Any other tools

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/nodaro-labs/repo-name.git
cd repo-name
```
## Development Workflow

- **Never commit directly to `main`**
- Create a new branch for your work:
  ```bash
  git checkout -b feature/your-feature-name
  
## Commit Changes
```bash
git add .
git commit -m "Brief description of change"
```
## Push
```bash
git push origin feature/your-feature-name
```
## Open a Pull Request on GitHub


### Environment Setup

Copy the example environment file and fill in credentials

```bash
cp .env.example .env
```
## Setup Instructions

### 1. Create a Python virtual environment
From the project root:

```bash
python3 -m venv .venv
```
MacOS / Linux
```bash
source .venv/bin/activate
```

Windows
```bash
.venv\Scripts\activate
```

## Install Dependencies
```bash
pip install -r requirements.txt
```

