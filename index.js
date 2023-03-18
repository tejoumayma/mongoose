const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error("could not connect to mongoDB"));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favouritFood: {
    type: Array,
  },
  phone: {
    type: Number,
    unique: true,
  },
});

const Person = mongoose.model("Person", personSchema);

const createPerson = async () => {
  const person = new Person({
    name: "jhon",
    age: 20,
    phone: 0000000000,
    favouritFood: ["salad"],
  });
  try {
    const result = await person.save();
    console.log("added successfuly", result);
  } catch (err) {
    console.error("erroe", err.message);
  }
};
// createPerson();

const createManyPersons = async (persons) => {
  try {
    const result = await Person.create(persons);
    console.log("Persons added", result);
  } catch (err) {
    console.error("error:", err.message);
  }
};
// createManyPersons([
//   {
//     name: "jane",
//     age: 24,
//     phone: 0000000001,
//     favouritFood: ["bread"],
//   },
//   {
//     name: "suzan",
//     age: 29,
//     phone: 0000000002,
//     favouritFood: ["pizza"],
//   },
//   {
//     name: "sam",
//     age: 24,
//     phone: 0000000003,
//     favouritFood: ["healthy food"],
//   },
// ]);

const getPersons = async () => {
  try {
    const persons = await Person.find();
    console.log("result", persons);
  } catch (err) {
    console.error("error", err.message);
  }
};
// getPersons();

const getOnePerson = async () => {
  try {
    const person = await Person.findOne({ favouritFood: ["bread"] });
    console.log("result :", person);
  } catch (err) {
    console.error("error:", err.message);
  }
};
// getOnePerson();

const getById = async (id) => {
  try {
    const person = await Person.findById(id);
    console.log("result:", person);
  } catch (err) {
    console.error("error:", err.message);
  }
};
// getById("6414db2332eb178f5708a0da");

const updateAge = async (name, newAge) => {
  try {
    const person = await Person.findOneAndUpdate(
      name,
      { $set: { age: newAge } },
      { new: true }
    );
    console.log(person);
  } catch (err) {
    console.error("Error:", err.message);
  }
};
// updateAge("jhon", 20);

const deletePerson = async (id) => {
  try {
    const deletedPerson = await Person.findByIdAndRemove(id);
    console.log(deletedPerson);
  } catch (err) {
    console.error("error:", err.message);
  }
};
// deletePerson("6414de569ca58402b0508d26");

const deletePersons = async () => {
  try {
    const deletedPersons = await Person.deleteMany({ name: "sam" });
    console.log(deletedPersons);
  } catch (err) {
    console.error("error:", err.message);
  }
};
// deletePersons();

const queryChain = async () => {
  try {
    Person.find({ favouritFood: ["bread"] })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 });
  } catch (err) {
    console.error("error:", err.message);
  }
};
// queryChain();

const findAndEdit = async (id) => {
  try {
    const person = await Person.findById(id);
    person.favouritFood.push("hamburger");
    person.save();
    console.log(person);
  } catch (err) {
    console.error("error:", err.message);
  }
};
findAndEdit("6414db2332eb178f5708a0da");
