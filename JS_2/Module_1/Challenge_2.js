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

images2.forEach(img => console.log(`${img.title} – ${img.artist}, ${img.date}`));