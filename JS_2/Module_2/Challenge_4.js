class Tutoring {
  constructor() {
    this.students = [];
    this.teachers = [];
  }

  getStudentByName(name, surname) {
    return this.students.find(s => s.name === name && s.surname === surname);
  }

  getTeacherByName(name, surname) {
    return this.teachers.find(t => t.name === name && t.surname === surname);
  }

  getStudentsForTeacher(teacher) {
    return this.students.filter(s => ExtendedUser.match(teacher, s).length > 0);
  }

  getTeacherForStudent(student) {
    return this.teachers.filter(t => ExtendedUser.match(t, student).length > 0);
  }

  addStudent(name, surname, email) {
    const student = new Student(name, surname, email);
    this.students.push(student);
    return student;
  }

  addTeacher(name, surname, email) {
    const teacher = new Teacher(name, surname, email);
    this.teachers.push(teacher);
    return teacher;
  }
}