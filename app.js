require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John Doe",
  age: 30,
  favoriteFoods: ["pizza", "pasta"],
});

person.save((err, data) => {
  if (err) return console.error(err);
  console.log("Person saved:", data);
});

const arrayOfPeople = [
  { name: "Alice", age: 25, favoriteFoods: ["salad", "burger"] },
  { name: "Bob", age: 28, favoriteFoods: ["burrito", "taco"] },
  { name: "Mary", age: 32, favoriteFoods: ["sushi"] },
];

Person.create(arrayOfPeople, (err, people) => {
  if (err) return console.error(err);
  console.log("People created:", people);
});

Person.find({ name: "Alice" }, (err, people) => {
  if (err) return console.error(err);
  console.log("People named Alice:", people);
});

Person.findOne({ favoriteFoods: "burrito" }, (err, person) => {
  if (err) return console.error(err);
  console.log("Person who likes burrito:", person);
});

const personId = "PASTE_AN_ID_HERE";
Person.findById(personId, (err, person) => {
  if (err) return console.error(err);
  console.log("Person found by ID:", person);
});

Person.findById(personId, (err, person) => {
  if (err) return console.error(err);
  person.favoriteFoods.push("hamburger");
  person.save((err, updatedPerson) => {
    if (err) return console.error(err);
    console.log("Updated person:", updatedPerson);
  });
});

Person.findOneAndUpdate(
  { name: "Bob" },
  { age: 20 },
  { new: true },
  (err, updatedPerson) => {
    if (err) return console.error(err);
    console.log("Updated Bob's age:", updatedPerson);
  }
);

Person.findByIdAndRemove(personId, (err, deletedPerson) => {
  if (err) return console.error(err);
  console.log("Deleted person:", deletedPerson);
});

Person.remove({ name: "Mary" }, (err, result) => {
  if (err) return console.error(err);
  console.log("Removed Mary(s):", result);
});

Person.find({ favoriteFoods: "burrito" })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec((err, data) => {
    if (err) return console.error(err);
    console.log("Chained search result:", data);
  });
