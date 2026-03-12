//Challenge 1 
const images = [
  { title: "Mona Lisa", artist: "Leonardo da Vinci", date: 1503 },
  { title: "The Last Supper", artist: "Leonardo da Vinci", date: 1495 },
  { title: "Starry Night", artist: "Vincent van Gogh", date: 1889 },
  { title: "The Scream", artist: "Edvard Munch", date: 1893 },
  { title: "Guernica", artist: "Pablo Picasso", date: 1937 },
  { title: "The Kiss", artist: "Gustav Klimt", date: 1907 },
  { title: "Girl With a Pearl Earring", artist: "Johannes Vermeer", date: 1665 },
  { title: "The Birth of Venus", artist: "Sandro Botticelli", date: 1485 },
  { title: "Las Meninas", artist: "Diego Velázquez", date: 1656 },
  { title: "The Creation of Adam", artist: "Michelangelo", date: 1512 },
];

console.log(" Challenge 1 ");
images.forEach(img => console.log(`${img.title} – ${img.artist}, ${img.date}`));

//Challenge 2
function Image(title, artist, date) {
  this.title = title;
  this.artist = artist;
  this.date = date;
}

function getImage(title, artist, date) {
  return { title, artist, date };
}

const images1 = images.map(img => new Image(img.title, img.artist, img.date));
const images2 = images1.map(img => getImage(img.title, img.artist, img.date));

console.log("\n Challenge 2 ");
images2.forEach(img => console.log(`${img.title} – ${img.artist}, ${img.date}`));

//Challenge 3
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

console.log("\n Challenge 3 ");
imagesObj.add("Mona Lisa", "Leonardo da Vinci", 1503);
imagesObj.add("The Scream", "Edvard Munch", 1893);
imagesObj.add("Mona Lisa", "Leonardo da Vinci", 1503);
imagesObj.show();
console.log(imagesObj.contains("The Scream"));
console.log(imagesObj.contains("Guernica"));
imagesObj.clear();

//Challenge 4
Image.prototype.show = function() {
  console.log(`${this.title} – ${this.artist}, ${this.date}`);
};

imagesObj.edit = function(title, artist, date) {
  const img = this.list.find(img => img.title === title);
  if (img) { img.artist = artist; img.date = date; }
};

imagesObj.delete = function(title) {
  const index = this.list.findIndex(img => img.title === title);
  if (index !== -1) this.list.splice(index, 1);
};

imagesObj.show = function() {
  this.list.forEach(img => img.show());
};

console.log("\n Challenge 4 ");
imagesObj.add("Mona Lisa", "Leonardo da Vinci", 1503);
imagesObj.add("The Scream", "Edvard Munch", 1893);
imagesObj.add("Guernica", "Pablo Picasso", 1937);
imagesObj.show();
imagesObj.edit("The Scream", "E. Munch", 1895);
imagesObj.delete("Guernica");
imagesObj.show();

//Challenge 5
function deepComp(obj1, obj2) {
  const keys1 = Object.keys(obj1).filter(k => typeof obj1[k] !== 'function');
  const keys2 = Object.keys(obj2).filter(k => typeof obj2[k] !== 'function');

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    if (val1 && val2 && typeof val1 === 'object' && typeof val2 === 'object') {
      if (!deepComp(val1, val2)) return false;
    } else {
      if (val1 !== val2) return false;
    }
  }
  return true;
}

console.log("\n Challenge 5 ");
const a = { title: "Mona Lisa", info: { artist: "da Vinci", date: 1503 } };
const b = { title: "Mona Lisa", info: { artist: "da Vinci", date: 1503 } };
const c = { title: "Mona Lisa", info: { artist: "da Vinci", date: 1499 } };

console.log(deepComp(a, b));
console.log(deepComp(a, c));