function sendEmail(from, to, message) {}

class User {
  constructor(name, surname, email, role) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.role = role;
    this.courses = {};
    this._messages = [];
  }

  addCourse(course, level) {
    this.courses[course] = level;
  }

  removeCourse(course) {
    delete this.courses[course];
  }

  editCourse(course, level) {
    if (course in this.courses) this.courses[course] = level;
  }

  sendMessage(from, message) {
    this._messages.push({ from, message });
    sendEmail(from, this, message);
  }

  showMessagesHistory() {
    this._messages.forEach(({ from, message }) =>
      console.log(`From: ${from.name} ${from.surname} | Message: ${message}`)
    );
  }
}