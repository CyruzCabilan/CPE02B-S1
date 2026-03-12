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

const a = { title: "Mona Lisa", info: { artist: "da Vinci", date: 1503 } };
const b = { title: "Mona Lisa", info: { artist: "da Vinci", date: 1503 } };
const c = { title: "Mona Lisa", info: { artist: "da Vinci", date: 1499 } };

console.log(deepComp(a, b));
console.log(deepComp(a, c)); 