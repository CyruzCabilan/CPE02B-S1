const imagesObj = {
  list: [],

  contains(title) {
    return this.list.some(img => img.title === title);
  },

  add(title, artist, date) {
    if (!this.contains(title)) {
      this.list.push(new Image(title, artist, date));
    }
  },

  show() {
    this.list.forEach(img => console.log(`${img.title} – ${img.artist}, ${img.date}`));
  },

  clear() {
    this.list = [];
  }
};

imagesObj.add("Mona Lisa", "Leonardo da Vinci", 1503);
imagesObj.add("The Scream", "Edvard Munch", 1893);
imagesObj.add("Mona Lisa", "Leonardo da Vinci", 1503);
imagesObj.show();
console.log(imagesObj.contains("The Scream"));
console.log(imagesObj.contains("Guernica"));
imagesObj.clear();
imagesObj.show();