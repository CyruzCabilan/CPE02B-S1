ExtendedUser.match = function(teacher, student, course) {
  if (course) {
    const teacherLevel = teacher.courses[course];
    const studentLevel = student.courses[course];
    return (teacherLevel !== undefined && studentLevel !== undefined && teacherLevel >= studentLevel)
      ? { course, level: studentLevel }
      : undefined;
  }

  return Object.entries(student.courses)
    .filter(([c, sl]) => teacher.courses[c] !== undefined && teacher.courses[c] >= sl)
    .map(([c, sl]) => ({ course: c, level: sl }));
};