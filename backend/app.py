from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

state = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
]


from collections import deque

GOAL_STATE = (
    (1, 2, 3),
    (4, 5, 6),
    (7, 8, 0)
)

def to_tuple(state):
    return tuple(tuple(row) for row in state)

def find_zero(state):
    for i in range(3):
        for j in range(3):
            if state[i][j] == 0:
                return i, j

def get_neighbors(state):
    x, y = find_zero(state)
    neighbors = []

    directions = {
        "up": (-1, 0),
        "down": (1, 0),
        "left": (0, -1),
        "right": (0, 1)
    }

    for move, (dx, dy) in directions.items():
        nx, ny = x + dx, y + dy
        if 0 <= nx < 3 and 0 <= ny < 3:
            new_state = [list(row) for row in state]
            new_state[x][y], new_state[nx][ny] = new_state[nx][ny], new_state[x][y]
            neighbors.append((move, to_tuple(new_state)))

    return neighbors

def bfs_solve(start_state):
    start = to_tuple(start_state)
    queue = deque()
    queue.append((start, []))
    visited = set()
    visited.add(start)

    while queue:
        current, path = queue.popleft()

        if current == GOAL_STATE:
            return path

        for move, next_state in get_neighbors(current):
            if next_state not in visited:
                visited.add(next_state)
                queue.append((next_state, path + [move]))

    return None


@app.route("/state", methods=["GET"])
def get_state():
    return jsonify(state)

@app.route("/set", methods=["POST"])
def set_state():
    global state
    new_state = request.json.get("state")
    flat = [n for row in new_state for n in row]
    if sorted(flat) != list(range(9)):
        return jsonify({"error": "Invalid puzzle"}), 400
    state = new_state
    return jsonify({"message": "Updated"})

@app.route("/solve", methods=["POST"])
def solve():
    puzzle = request.json.get("state")
    print("SOLVE ROUTE HIT")
    print(puzzle)

    solution = bfs_solve(puzzle)

    if solution is None:
        return jsonify({"error": "No solution found"}), 400

    return jsonify({
        "moves": solution,
        "steps": len(solution)
    })

if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(host="127.0.0.1", port=5000, debug=True)


