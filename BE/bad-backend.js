const express = require('express');
const http = require('http');

const cors = require('cors');

const app = express();
const alasql = require('alasql');
const database = new alasql.Database('posts');

database.exec("CREATE TABLE posts (id STRING, user STRING, text STRING)");
database.exec("CREATE TABLE secrets (description STRING, secret STRING)");

database.tables.posts.data = [
  { id: '1', user: 'Ralph Wiggum', text: "If mommy's purse didn't belong in the microwave, why did it fit?" },
  { id: '2', user: 'Ralph Wiggum', text: "I wet my arm pants." },
  { id: '3', user: 'Ralph Wiggum', text: "Grandma had hair like that when she went to sleep in her forever box!" },
  { id: '4', user: 'Ralph Wiggum', text: "All my friends have birthdays this year!" },
  { id: '5', user: 'Ralph Wiggum', text: "I'm bembarassed for you." },
  { id: '6', user: 'Ralph Wiggum', text: "My knob tastes funny." },
  { id: '7', user: 'Ralph Wiggum', text: "Hi, Principal Skinner! Hi, Super Nintendo Chalmers." },
  { id: '8', user: 'Ralph Wiggum', text: "And I want a bike and a monkey and a friend for the monkey." },
  { id: '9', user: 'Ralph Wiggum', text: "Eww, Daddy, this tastes like Gramma!" },
  { id: '10', user: 'Ralph Wiggum', text: "I bent my wookie." },
  { id: '11', user: 'Ralph Wiggum', text: "Lisa's bad dancing makes my feet sad." },
  { id: '12', user: 'Ralph Wiggum', text: "That's where I saw the Leprechaun. He tells me to burn things." },
  { id: '13', user: 'Ralph Wiggum', text: "Look Big Daddy, it's Regular Daddy." },
  { id: '14', user: 'Ralph Wiggum', text: "Look, Daddy, a whale egg!" },
  { id: '15', user: 'Ralph Wiggum', text: "Daddy, I'm scared. Too scared to wet my pants." },
  { id: '16', user: 'Ralph Wiggum', text: "My cat's name is Mittens." },
  { id: '17', user: 'Ralph Wiggum', text: "This snowflake tastes like fish sticks." },
  { id: '18', user: 'Ralph Wiggum', text: "My parents won't let me use scissors." },
  { id: '19', user: 'Ralph Wiggum', text: "Slow down, Bart! My legs don't know how to be as long as yours." },
  { id: '20', user: 'Ralph Wiggum', text: "When I grow up I wanna be a Principal or a Caterpillar." },
  { id: '21', user: 'Ralph Wiggum', text: "Principal Skinner, I got carsick in your office." },
  {
    id: '22',
    user: 'Ralph Wiggum',
    text: "Dear Miss Hoover, you have Lyme disease. We miss you. Kevin is biting me. Come back soon. Here's a drawing of a spirokeet. Love Ralph"
  },
  {
    id: '23',
    user: 'Ralph Wiggum',
    text: "Bushes are nice 'cause they don't have prickers. Unless they do. This one did. Ouch!"
  },
  { id: '24', user: 'Ralph Wiggum', text: "I dress myself." },
  { id: '25', user: 'Ralph Wiggum', text: "This is my sandbox, I'm not allowed to go in the deep end." },
  {
    id: '26',
    user: 'Ralph Wiggum',
    text: "The doctor told me that BOTH my eyes were lazy! And that's why it was the best summer ever."
  },
];

database.tables.secrets.data = [
  { id: 1, description: 'nuclear launch codes', secret: '1234' },
  { id: 2, description: 'admin passwords', secret: 'P4$$w0rd' },
  { id: 3, description: 'arc of the covenant location', secret: '@51.140402,4.4399512,16.45z' },
];

app.use(cors());

app.get("/posts/:id", function (req, res) {
  const id = req.params.id;
  const query = `SELECT * FROM posts WHERE id = "${id}"`;
  const result = database.exec(query);
  res.send(result);
});

const query = alasql.compile('SELECT * FROM posts WHERE id = ?', 'posts');
app.get("/posts/fixed/:id", function (req, res) {
  const id = req.params.id;
  const result = query([id]);
  res.send(result);
});

http.createServer(app).listen(8080);
