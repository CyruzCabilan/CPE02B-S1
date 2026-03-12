Image.prototype.show = function() {
  console.log(`${this.title} – ${this.artist}, ${this.date}`);
};

imagesObj.edit = function(title, artist, date) {
  const img = this.list.find(img => img.title === title);
  if (img) {
    img.artist = artist;
    img.date = date;
  }
};

imagesObj.delete = function(title) {
  const index = this.list.findIndex(img => img.title === title);
  if (index !== -1) {
    this.list.splice(index, 1);
  }
};

imagesObj.show = function() {
  this.list.forEach(img => img.show());
};

imagesObj.add("Mona Lisa", "Leonardo da Vinci", 1503);
imagesObj.add("The Scream", "Edvard Munch", 1893);
imagesObj.add("Guernica", "Pablo Picasso", 1937);
imagesObj.show();
imagesObj.edit("The Scream", "E. Munch", 1895);
imagesObj.delete("Guernica");
imagesObj.show();