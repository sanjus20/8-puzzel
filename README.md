# 8-Puzzle Solver

A web-based 8-puzzle solver that allows you to **manually play** or **automatically solve** the puzzle using a Python Flask backend.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Folder Structure](#folder-structure)  
4. [Backend Setup](#backend-setup-python-flask)  
5. [Frontend Usage](#frontend-usage)  
6. [How to Solve a Puzzle](#how-to-solve-a-puzzle)

---

## Project Overview

The 8-puzzle is a sliding puzzle consisting of a 3x3 grid with numbers 1–8 and one empty space. The goal is to arrange the tiles in order from 1 to 8 with the empty space at the bottom-right.

This project provides:

- A **frontend** interface for entering puzzles and moving tiles.  
- A **backend** that can solve any valid puzzle using BFS (Breadth-First Search).  
- An **animated solution** for visual understanding.

---

## Features

- Input any valid 8-puzzle state via a text area.  
- Move tiles manually using buttons or arrow keys.  
- Automatically solve the puzzle using backend logic.  
- Animated moves to visualize the solution.  
- Lightweight frontend with HTML, CSS, and JavaScript.  
- Python Flask backend with CORS support for frontend communication.

---

## Folder Structure
8-puzzle/
 backend/
  app.py # Flask backend server
  requirements.txt # Python dependencies
  venv/ # Python virtual environment (ignored)
 frontend/
  index.html # Frontend HTML
  script.js # Frontend JavaScript
  style.css # Frontend CSS
gitignore # Files to ignore in Git
README.md

---

## Backend Setup (Python Flask)

This project uses a Python virtual environment (`venv`) to manage dependencies.

### 1. Navigate to backend folder
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
.\venv\Scripts\activate.bat
pip install -r requirements.txt
python app.py
```
Backend server will run at: http://127.0.0.1:5000/

FRONT END USAGE:
1.Open frontend/index.html in your browser.
2.Enter a puzzle in the text area, for example:
1 2 3
4 5 6
7 8 0
3.Click Set Puzzle to update the board.
4.Use the Up/Down/Left/Right buttons to move tiles manually.

HOW TO SOLVE A PUZZLE:
1.Make sure the backend server is running.
2.Click the Solve button (if available) or trigger the solvePuzzle() function.
3.Watch the board animate through the moves to reach the solved state.
4.Note: The backend currently uses BFS, so it can solve all solvable 8-puzzle states efficiently.


