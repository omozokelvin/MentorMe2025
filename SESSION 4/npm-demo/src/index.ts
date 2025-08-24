const add = (...args: number[]) => args.reduce((a, b) => a + b, 0);

console.log(add(1, 2, 3, 4, 5, 6));


const user = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com"
}

// greet user function
const greetUser = (user: { name: string; email: string }) => {
  console.log(`Hello, ${user.name}! Your email is ${user.email}.`);
};

console.log(greetUser(user))

// using class
class User {
  bio: typeof user;

  constructor(bio: typeof user) {
    this.bio = bio;
  }

  greet() {
    console.log(`Hello, ${this.bio.name}! Your email is ${this.bio.email}.`);
  }
}

const newUser = new User({
  id: 2,
  name: "Jane Doe",
  email: "jane.doe@example.com"
});

console.log(newUser.greet());

