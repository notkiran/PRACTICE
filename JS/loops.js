var persons = [
  {
    id: 1,
    fname: "Arun",
    lname: "Kumar",
    age: 34,
    occupation: "Business",
    car: "Honda City",
    Location: "Bangalore",
  },
  {
    id: 2,
    fname: "Ankith",
    lname: "R",
    age: 22,
    occupation: "Driver",
    car: "Maruti Swift",
    Location: "Mysore",
  },
  {
    fname: "Ramesh",
    lname: "Kumar",
    age: 27,
    occupation: "Bank Manager",
    car: "Kia Seltos",
    Location: "Hyderabad",
  },
  {
    id: 3,
    fname: "Darshan",
    lname: "S",
    age: 32,
    occupation: "Software Engineer",
    car: "Audi A4",
    Location: "Chennai",
  },
  {
    id: 4,
    fname: "Rohith",
    lname: "Sharma",
    age: 28,
    occupation: "Actor",
    car: "Volvo",
    Location: "Mumbai",
  },
];

// for

for (var i = 0; i <= 4; i++) {
  console.log(persons[i].fname + " " + persons[i].lname);
}

// for in

const shoppingCart = { banana: 2, apple: 5, cherry: 0 };

for (const fruit in shoppingCart) {
  console.log(fruit);
}

for (const fruit in shoppingCart) {
  console.log(shoppingCart[fruit]);
}

//for of

for (person of persons) {
  console.log(person.fname);
}

// forEach

persons.forEach((person) =>
  console.log(
    person["fname"] + " " + person["lname"] + " is from " + person["Location"]
  )
);
