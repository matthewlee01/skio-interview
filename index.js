const store = {};

const put = (key, value, time) => {
  if (store[key] === undefined) {
    store[key] = {
      times: [time],
      values: [value],
    };
  } else {
    store[key].times.push(time);
    store[key].values.push(value);
  }
};

const get = (key, time) => {
  let record = store[key];
  if (record === undefined) {
    return null;
  } else {
    let i = binarySearch(record.times, time);
    if (i !== null) {
      return record.values[i];
    } else {
      return null;
    }
  }
};

const binarySearch = (array, value) => {
  let low = 0;
  let hi = array.length;
  let mid = Math.floor(hi / 2);

  while (true) {
    if (hi === low) {
      return null;
    }

    if (hi - low === 1) {
      if (value >= array[low]) {
        return low;
      } else {
        return null;
      }
    }

		if (array[mid] === value) {
			return mid;
		} else if (value > array[mid]) {
			low = mid;
			mid = Math.floor((low+hi)/2);
		} else {
			hi = mid;
			mid = Math.floor((low+hi)/2);
		}
  }
};

// array [], value: 1: null

// array [1], value: 2: 0
// array [1], value: 0: null

// array [1, 3], value: 3: 1
// array [1, 3], value: 2: 0
// array [1, 3], value: 0: null

// array [0, 5, 10], value 2: 0
// array [0, 5, 10], value 10: 2
// array [0, 5, 10], value -10: null
// array [0, 5, 10, 15], value 8: 1

put("a", 1, 0);
put("a", 2, 5);
put("a", 3, 10);

put("b", 100, 10)
put("b", 110, 12)
put("b", 120, 14)
put("b", 130, 16)
put("b", 140, 18)
put("b", 150, 20)
// console.log(get("a", 10));
// console.log(get("a", 5));
// console.log(get("a", 0));
// console.log(get("a", 3));
// console.log(get("a", 8));

console.log(get("b", 15) === 120);
console.log(get("b", 5) === null);
console.log(get("b", 2000) === 150);
console.log(get("b", 10) === 100);
console.log(get("b", 20) === 150);
console.log(store);

// console.log(binarySearch([0, 5, 10], 3));