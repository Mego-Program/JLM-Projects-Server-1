import express from 'express';
import data from './data.js';
import connected from './db/mongoConnect.js';

import routerProject from './router/routerProject.js';
import cors from 'cors';


const app = express();
const port = 8137
const db = connected()
app.use(express.json());

app.use(cors());

app.post('/todos', (req, res) => {
  
  res.json(data);
});

app.use("/app",routerProject);



app.listen(port, () => {
  console.log('Server is running on port 8000');
});
