//Challenge 1
class MyIterable {
  #items = [];

  add(element) {
    if (!this.has(element)) {
      this.#items.push(element);
    }
  }

  has(element) {
    return this.#items.includes(element);
  }

  del(element) {
    const index = this.#items.indexOf(element);
    if (index !== -1) this.#items.splice(index, 1);
  }

  get length() {
    return this.#items.length;
  }

  *[Symbol.iterator]() {
    for (const item of this.#items) {
      yield item;
    }
  }
}

console.log(" Challenge 1 ");
const iter = new MyIterable();
iter.add(1);
iter.add(2);
iter.add(3);
iter.add(2);
console.log(iter.length);
console.log(iter.has(2));
console.log([...iter]);
iter.del(2);
console.log(iter.has(2));
for (const val of iter) console.log(val);

//Challenge 2
function myDecorator(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log(`Function already called with arguments: ${args.join(', ')}`);
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

console.log("\n Challenge 2 ");
function add(a, b) { return a + b; }
const decoratedAdd = myDecorator(add);
console.log(decoratedAdd(2, 3));
console.log(decoratedAdd(2, 3));
console.log(decoratedAdd(4, 5));

//Challenge 3
function getPromiseArray(arr) {
  return arr.map(el => {
    if (Number.isInteger(el) && el > 0) {
      return new Promise(resolve => setTimeout(() => resolve(el), el));
    } else {
      return Promise.reject(new Error(`Invalid value: ${el}`));
    }
  });
}

console.log("\n Challenge 3 ");
const promises = getPromiseArray([100, 200, -5, "hello", 300]);
promises.forEach(p =>
  p.then(val => console.log(`Resolved: ${val}`))
   .catch(err => console.log(`Rejected: ${err.message}`))
);

//Challenge 4
function getWeather(cities, info = 'all') {
  const cityList = Array.isArray(cities) ? cities : [cities];

  const requests = cityList.map(city => {
    let url = `http://localhost:3000/weather?city=${city}`;
    if (info && info !== 'all') url += `&info=${info}`;

    return fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(`\nCity: ${data.city}`);
        console.log('Weather:', JSON.stringify(data.weather, null, 2));

        if (data.weather?.wind?.speed > 15) {
          console.log(`WARNING: High wind speed in ${data.city}: ${data.weather.wind.speed} m/s`);
        }
        if (data.weather?.temp < -20) {
          console.log(`WARNING: Very low temperature in ${data.city}: ${data.weather.temp}°C`);
        }
      })
      .catch(err => console.log(`Error fetching ${city}: ${err.message}`));
  });

  return Promise.all(requests);
}

console.log("\n Challenge 4 ");
getWeather('Oslo', 'wind');
getWeather(['Oslo', 'London'], 'all');

//Challenge 5
async function getWeatherAsync(cities, info = 'all') {
  const cityList = Array.isArray(cities) ? cities : [cities];

  for (const city of cityList) {
    try {
      let url = `http://localhost:3000/weather?city=${city}`;
      if (info && info !== 'all') url += `&info=${info}`;

      const res  = await fetch(url);
      const data = await res.json();

      console.log(`\nCity: ${data.city}`);
      console.log('Weather:', JSON.stringify(data.weather, null, 2));

      if (data.weather?.wind?.speed > 15) {
        console.log(`WARNING: High wind speed in ${data.city}: ${data.weather.wind.speed} m/s`);
      }
      if (data.weather?.temp < -20) {
        console.log(`WARNING: Very low temperature in ${data.city}: ${data.weather.temp}°C`);
      }
    } catch (err) {
      console.log(`Error fetching ${city}: ${err.message}`);
    }
  }
}

console.log("\n Challenge 5 ");
getWeatherAsync('Oslo', 'wind');
getWeatherAsync(['Oslo', 'London'], 'all');