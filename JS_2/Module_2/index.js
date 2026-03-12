//Challenge 1
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
  addCourse(course, level) { this.courses[course] = level; }
  removeCourse(course) { delete this.courses[course]; }
  editCourse(course, level) { if (course in this.courses) this.courses[course] = level; }
  sendMessage(from, message) { this._messages.push({ from, message }); sendEmail(from, this, message); }
  showMessagesHistory() {
    this._messages.forEach(({ from, message }) =>
      console.log(`From: ${from.name} ${from.surname} | Message: ${message}`)
    );
  }
}

//Challenge 2
class ExtendedUser extends User {
  get fullName() { return `${this.name} ${this.surname}`; }
  set fullName(value) { [this.name, this.surname] = value.split(' '); }
}

class Teacher extends ExtendedUser {
  constructor(name, surname, email) { super(name, surname, email, 'teacher'); }
}

class Student extends ExtendedUser {
  constructor(name, surname, email) { super(name, surname, email, 'student'); }
}

//Challenge 3
ExtendedUser.match = function(teacher, student, course) {
  if (course) {
    const tl = teacher.courses[course], sl = student.courses[course];
    return (tl !== undefined && sl !== undefined && tl >= sl) ? { course, level: sl } : undefined;
  }
  return Object.entries(student.courses)
    .filter(([c, sl]) => teacher.courses[c] !== undefined && teacher.courses[c] >= sl)
    .map(([c, sl]) => ({ course: c, level: sl }));
};

//Challenge 4
class Tutoring {
  constructor() { this.students = []; this.teachers = []; }
  getStudentByName(name, surname) { return this.students.find(s => s.name === name && s.surname === surname); }
  getTeacherByName(name, surname) { return this.teachers.find(t => t.name === name && t.surname === surname); }
  getStudentsForTeacher(teacher) { return this.students.filter(s => ExtendedUser.match(teacher, s).length > 0); }
  getTeacherForStudent(student) { return this.teachers.filter(t => ExtendedUser.match(t, student).length > 0); }
  addStudent(name, surname, email) { const s = new Student(name, surname, email); this.students.push(s); return s; }
  addTeacher(name, surname, email) { const t = new Teacher(name, surname, email); this.teachers.push(t); return t; }
}

//Challenge 5
class ExtendedTutoring extends Tutoring {
  sendMessages(from, to, message) { to.forEach(r => r.sendMessage(from, message)); }
}

//Test
const tutoring = new ExtendedTutoring();

const t1 = tutoring.addTeacher("Engr. Neal Barton James", "Matira", "qnqcbmatira@tip.edu.ph");
t1.addCourse("Software Design 2", 4);
t1.addCourse("Emerging Technologies 2", 3);

const s1 = tutoring.addStudent("Cyruz", "Cabilan", "qcpccabilan@tip.edu.ph");
s1.addCourse("Software Design 2", 2);

console.log(ExtendedUser.match(t1, s1));
console.log(tutoring.getTeacherForStudent(s1));

tutoring.sendMessages(t1, [s1], "Hello Cyruz!");
s1.showMessagesHistory();