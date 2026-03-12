class ExtendedTutoring extends Tutoring {
  sendMessages(from, to, message) {
    to.forEach(recipient => recipient.sendMessage(from, message));
  }
}