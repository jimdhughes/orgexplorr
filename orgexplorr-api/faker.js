const faker = require('faker');
const mongoose = require('mongoose');
const fs = require('fs');

var people = [];

var ceo = {
  _id: mongoose.Types.ObjectId(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  country: faker.address.country(),
  title: 'CEO',
  managerId: null,
};

people = [ceo];

function generatePerson(managerId, title) {
  var person = {
    _id: mongoose.Types.ObjectId(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    country: faker.address.country(),
    managerId: managerId,
    title,
  };
  return person;
}

// Generate level 2
for (var i = 0; i < 5; i++) {
  p = generatePerson(ceo._id, `SVP ${i + 1}`);
  people.push(p);
  // generate level 3
  for (var j = 0; j < 10; j++) {
    var l3 = generatePerson(p._id, `Director ${j + 1}`);
    people.push(l3);
    // generate level 4
    for (var k = 0; k < 10; k++) {
      var l4 = generatePerson(l3._id, `Sr Manager ${k + 1}`);
      people.push(l4);
      // generate level 5
      for (var l = 0; l < 10; l++) {
        var l5 = generatePerson(l4._id, `Manager ${l + 1}`);
        people.push(l5);
        // generate level 6
        for (var m = 0; m < 10; m++) {
          var l6 = generatePerson(l5._id, `Staff ${m + 1}`);
          people.push(l6);
        }
      }
    }
  }
}

mongoose.connect('mongodb://localhost/orgexplorr-dev', {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('open', () => {
  db.collection('people')
    .insertMany(people)
    .then(() => {
      console.log('done');
    })
    .catch((e) => {
      console.error(e);
    });
});

fs.writeFile('fakedirectory.json', JSON.stringify(people), function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('JSON saved to fakedirectory.json');
  }
});
