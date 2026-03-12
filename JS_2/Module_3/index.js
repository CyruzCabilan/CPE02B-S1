//Challenge 1
function drawNumbers(m, n, allowRepeats, sorted) {
  const result = [];

  if (!allowRepeats && m > n + 1) {
    throw new Error("Cannot draw more unique numbers than the range allows.");
  }

  if (allowRepeats) {
    for (let i = 0; i < m; i++) {
      result.push(Math.floor(Math.random() * (n + 1)));
    }
  } else {
    const set = new Set();
    while (set.size < m) {
      set.add(Math.floor(Math.random() * (n + 1)));
    }
    result.push(...set);
  }

  return sorted ? result.sort((a, b) => a - b) : result;
}

console.log(" Challenge 1 ");
console.log(drawNumbers(5, 10, false, true));
console.log(drawNumbers(5, 10, true, false));

//Challenge 2
class User {
  #firstName;
  #lastName;
  #email;

  static #nameRegex  = /^[A-Z][a-zA-Z]+$/;
  static #emailRegex = /^[a-zA-Z]+(\.[a-zA-Z]+)*@[a-zA-Z]+(\.[a-zA-Z]+)+$/;

  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName  = lastName;
    this.email     = email;
  }

  get firstName() { return this.#firstName; }
  set firstName(value) {
    if (!User.#nameRegex.test(value))
      throw new Error(`Invalid first name: ${value}`);
    this.#firstName = value;
  }

  get lastName() { return this.#lastName; }
  set lastName(value) {
    if (!User.#nameRegex.test(value))
      throw new Error(`Invalid last name: ${value}`);
    this.#lastName = value;
  }

  get email() { return this.#email; }
  set email(value) {
    if (!User.#emailRegex.test(value))
      throw new Error(`Invalid email: ${value}`);
    this.#email = value;
  }
}

console.log("\n Challenge 2 ");
try {
  const u1 = new User("John", "Doe", "john.doe@example.com");
  console.log(u1.firstName, u1.lastName, u1.email);
  const u2 = new User("john", "Doe", "john@example.com");
} catch (e) {
  console.log(e.message);
}
try {
  const u3 = new User("Jane", "Doe", "invalid_email@x");
} catch (e) {
  console.log(e.message);
}

//Challenge 3
class Users {
  #map = new Map();

  add(firstName, lastName, email) {
    const user = new User(firstName, lastName, email);
    this.#map.set(email, user);
  }

  delete(email) {
    this.#map.delete(email);
  }

  get(email) {
    return this.#map.get(email);
  }

  getAll(sortBy = "email") {
    const fieldMap = { name: "firstName", surname: "lastName", email: "email" };
    const field = fieldMap[sortBy] || "email";
    return [...this.#map.values()].sort((a, b) =>
      a[field].localeCompare(b[field])
    );
  }
}

console.log("\n Challenge 3 ");
const users = new Users();
users.add("Alice", "Wong", "alice.wong@school.edu");
users.add("Bob", "Smith", "bob.smith@school.edu");
users.add("Carol", "Adams", "carol.adams@school.edu");
console.log(users.getAll("name"));
console.log(users.get("bob.smith@school.edu"));
users.delete("bob.smith@school.edu");
console.log(users.getAll("surname"));

//Challenge 4
class Point {
  constructor(x, y) {
    this.x    = x;
    this.y    = y;
    this.type = "point";
  }
}

class Line {
  constructor(coords) {
    this.type   = "line";
    this.points = coords.map(([x, y]) => new Point(x, y));
  }
}

class Figure {
  constructor(elements = []) {
    this.points = [];
    this.lines  = [];
    elements.forEach(el => {
      if (el instanceof Point) this.points.push(el);
      if (el instanceof Line)  this.lines.push(el);
    });
  }

  addPoint(x, y) {
    this.points.push(new Point(x, y));
  }

  addLine(coords) {
    this.lines.push(new Line(coords));
  }

  toJSON() {
    return JSON.stringify({ points: this.points, lines: this.lines });
  }

  fromJSON(json, replace = false) {
    const data = JSON.parse(json);
    if (replace) this.deleteAll();
    data.points?.forEach(p => this.addPoint(p.x, p.y));
    data.lines?.forEach(l => this.addLine(l.points.map(p => [p.x, p.y])));
  }

  deleteAll() {
    this.points = [];
    this.lines  = [];
  }
}

console.log("\n Challenge 4 ");
const fig = new Figure();
fig.addPoint(0, 0);
fig.addPoint(5, 5);
fig.addLine([[0, 0], [10, 10], [20, 0]]);
const json = fig.toJSON();
console.log(json);

const fig2 = new Figure();
fig2.fromJSON(json, true);
console.log(fig2.toJSON());

//Challenge 5
class FigureV2 extends Figure {
  #pointKey(p) {
    return `${p.x},${p.y}`;
  }

  #lineKey(l) {
    return l.points.map(p => this.#pointKey(p)).join("|");
  }

  #dedupePoints() {
    const seen = new Set();
    this.points = this.points.filter(p => {
      const key = this.#pointKey(p);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  #dedupeLines() {
    const seen = new Set();
    this.lines = this.lines.filter(l => {
      const key = this.#lineKey(l);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  addPoint(x, y) {
    this.points.push(new Point(x, y));
    this.#dedupePoints();
    this.points.sort((a, b) => a.x - b.x || a.y - b.y);
  }

  addLine(coords) {
    this.lines.push(new Line(coords));
    this.#dedupeLines();
    this.lines.sort((a, b) =>
      this.#lineKey(a).localeCompare(this.#lineKey(b))
    );
  }
}

console.log("\n Challenge 5 ");
const fig3 = new FigureV2();
fig3.addPoint(5, 5);
fig3.addPoint(0, 0);
fig3.addPoint(5, 5);
fig3.addLine([[0, 0], [10, 10]]);
fig3.addLine([[0, 0], [10, 10]]);
fig3.addLine([[5, 5], [15, 15]]);
console.log(JSON.parse(fig3.toJSON()));