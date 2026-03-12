class ExtendedUser extends User {
  get fullName() {
    return `${this.name} ${this.surname}`;
  }

  set fullName(value) {
    [this.name, this.surname] = value.split(' ');
  }
}

class Teacher extends ExtendedUser {
  constructor(name, surname, email) {
    super(name, surname, email, 'teacher');
  }
}

class Student extends ExtendedUser {
  constructor(name, surname, email) {
    super(name, surname, email, 'student');
  }
}