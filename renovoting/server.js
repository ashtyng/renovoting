const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'))


let items = [];
let id = 0;

let questions=[];

//Img Questions
let Q1={pics: ["static/imgs/sink1.jpeg", "static/imgs/sink2.jpeg", "static/imgs/sink3.jpg"], votes: [0,0,0]};
questions.push(Q1);
let Q2={pics: ["static/imgs/floor1.jpeg", "static/imgs/floor2.jpeg", "static/imgs/floor3.jpg"], votes: [0,0,0]};
questions.push(Q2);
let Q3={pics: ["static/imgs/lights1.jpeg", "static/imgs/lights2.jpeg", "static/imgs/lights3.jpg"], votes: [0,0,0]};
questions.push(Q3);
let Q4={pics: ["static/imgs/vanity1.jpg", "static/imgs/vanity2.jpg", "static/imgs/vanity3.jpg"], votes: [0,0,0]};
questions.push(Q4);
let Q5={pics: ["static/imgs/shower1.jpg", "static/imgs/shower2.jpg", "static/imgs/shower3.jpg"], votes: [0,0,0]};
questions.push(Q5);

app.get('/api/items', (req, res) => {
  res.send(items);
});

app.get('/api/questions', (req, res) => {
  res.send(questions);
});

app.put('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items.map(item => { return item.id; });
  let index = itemsMap.indexOf(id);
  let item = items[index];
  item.completed = req.body.completed;
  item.text = req.body.text;
  if (item.completed) {
    item.completedDate = Date.now();
  }
  // handle drag and drop re-ordering
  if (req.body.orderChange) {
    let indexTarget = itemsMap.indexOf(req.body.orderTarget);
    items.splice(index,1);
    items.splice(indexTarget,0,item);
  }
  res.send(item);
});

app.put('/api/questions/:Qindex/:picIndex', (req,res) => {
  questions[req.params.Qindex].votes[req.params.picIndex]+=1;
  res.send(questions);
});

app.post('/api/items', (req, res) => {
  id = id + 1;
  let item = {id:id, text:req.body.text, completed: req.body.completed};
  if (item.completed) {
    item.completedDate = Date.now();
  }
  items.push(item);
  res.send(item);
});

app.delete('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = items.map(item => { return item.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  items.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(8000, () => console.log('Server listening on port 8000!'))