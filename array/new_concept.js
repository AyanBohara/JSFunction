/*
 * JavaScript Arrays: basic to advanced
 *
 * Run this file with:
 *   node array/new_concept.js
 *
 * Each section has five examples. Array indexes start at 0.
 */

// ==================== 1. BASIC (5 examples) ====================

// 1. Create an array and read values by index.
const basicFruits = ["apple", "banana", "mango"];
console.log("1.1", basicFruits[0], basicFruits[2]);

// 2. Change an item and add an item at a chosen index.e
const basicNumbers = [10, 20, 30];
basicNumbers[1] = 25;
basicNumbers[3] = 40;
console.log("1.2", basicNumbers);

// 3. length gives the number of items.
const basicColors = ["red", "green", "blue"];
console.log("1.3", basicColors.length);

// 4. Access the first and last item safely.
const basicNames = ["Ayan", "Sayan", "Nayan"];
console.log("1.4", basicNames[0], basicNames.at(-1));

// 5. Check whether a value is an array.
console.log("1.5", Array.isArray([1, 2, 3]), Array.isArray("not an array"));


// ==================== 2. MUTATING METHODS (5 examples) ====================
// These methods change the original array.

// 1. push adds to the end; pop removes from the end.
const mutatingQueue = ["A", "B"];
mutatingQueue.push("C");
const lastQueueItem = mutatingQueue.pop();
console.log("2.1", mutatingQueue, lastQueueItem);

// 2. unshift adds to the beginning; shift removes from the beginning.
const mutatingTasks = ["study", "sleep"];
mutatingTasks.unshift("eat");
const firstTask = mutatingTasks.shift();
console.log("2.2", mutatingTasks, firstTask);

// 3. splice removes and/or inserts items: start, deleteCount, ...items.
const mutatingMonths = ["Jan", "Mar", "Apr"];
mutatingMonths.splice(1, 0, "Feb");
console.log("2.3", mutatingMonths);

// 4. sort numbers with a comparator (default sort compares strings).
const mutatingScores = [40, 5, 100, 25];
mutatingScores.sort((a, b) => a - b);
console.log("2.4", mutatingScores);

// 5. reverse changes the order in place.
const mutatingLetters = ["a", "b", "c"];
mutatingLetters.reverse();
console.log("2.5", mutatingLetters);


// ==================== 3. NON-MUTATING METHODS (5 examples) ====================
// These methods return a result without changing the original array.

// 1. slice extracts from start (inclusive) to end (exclusive).
const nonMutatingNumbers = [10, 20, 30, 40, 50];
const middleNumbers = nonMutatingNumbers.slice(1, 4);
console.log("3.1", middleNumbers, nonMutatingNumbers);

// 2. concat joins arrays and returns a new array.
const nonMutatingFirst = [1, 2];
const nonMutatingSecond = [3, 4];
console.log("3.2", nonMutatingFirst.concat(nonMutatingSecond));

// 3. includes checks for a value; indexOf returns its index or -1.
const nonMutatingUsers = ["Ayan", "Rita", "Nabin"];
console.log("3.3", nonMutatingUsers.includes("Rita"), nonMutatingUsers.indexOf("Rita"));

// 4. join converts array items into one string.
const nonMutatingWords = ["JavaScript", "arrays", "are", "useful"];
console.log("3.4", nonMutatingWords.join(" "));

// 5. toSorted and toReversed create changed copies (modern JavaScript).
const originalOrder = [3, 1, 2];
console.log("3.5", originalOrder.toSorted((a, b) => a - b), originalOrder.toReversed());


// ==================== 4. ITERATION AND CALLBACKS (5 examples) ====================

// 1. for...of reads every value.
const iterationCities = ["Kathmandu", "Pokhara", "Lalitpur"];
for (const city of iterationCities) {
  console.log("4.1", city);
}

// 2. map transforms every item and returns a new array.
const iterationPrices = [100, 200, 300];
const pricesWithTax = iterationPrices.map((price) => price * 1.13);
console.log("4.2", pricesWithTax);

// 3. filter keeps items that pass a condition.
const iterationAges = [12, 18, 25, 15, 30];
const adults = iterationAges.filter((age) => age >= 18);
console.log("4.3", adults);

// 4. find returns the first matching item; findIndex returns its index.
const iterationProducts = [
  { name: "pen", stock: 0 },
  { name: "book", stock: 5 },
  { name: "bag", stock: 2 },
];
console.log("4.4", iterationProducts.find((product) => product.stock > 0));
console.log("4.4 index", iterationProducts.findIndex((product) => product.name === "bag"));

// 5. some and every test array conditions and return booleans.
const iterationMarks = [65, 72, 81];
console.log("4.5", iterationMarks.some((mark) => mark < 40), iterationMarks.every((mark) => mark >= 40));


// ==================== 5. ADVANCED (5 examples) ====================

// 1. reduce combines all values into one result.
const advancedCart = [
  { item: "book", price: 500, quantity: 2 },
  { item: "pen", price: 50, quantity: 3 },
];
const cartTotal = advancedCart.reduce(
  (total, product) => total + product.price * product.quantity,
  0,
);
console.log("5.1", cartTotal);

// 2. flat removes nested levels; flatMap maps and then flattens one level.
const advancedNested = [1, [2, [3, 4]]];
console.log("5.2", advancedNested.flat(2));
console.log("5.2 flatMap", [1, 2, 3].flatMap((number) => [number, number * 2]));

// 3. Destructuring extracts values, while ...rest collects the remaining values.
const advancedScores = [95, 88, 76, 64];
const [highest, secondHighest, ...remainingScores] = advancedScores;
console.log("5.3", highest, secondHighest, remainingScores);

// 4. Copy an array before editing it to avoid accidental mutation.
const advancedOriginal = [{ done: false }, { done: false }];
const advancedUpdated = advancedOriginal.map((task, index) =>
  index === 0 ? { ...task, done: true } : task,
);
console.log("5.4", advancedOriginal, advancedUpdated);

// 5. Group objects with reduce and computed property names.
const advancedPeople = [
  { name: "Ayan", department: "IT" },
  { name: "Rita", department: "HR" },
  { name: "Nabin", department: "IT" },
];
const peopleByDepartment = advancedPeople.reduce((groups, person) => {
  (groups[person.department] ??= []).push(person.name);
  return groups;
}, {});
console.log("5.5", peopleByDepartment);