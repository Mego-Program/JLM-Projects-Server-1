import express from "express";
import data from "./data.js";
import connected from "./db/mongoConnect.js";
import routerProject from "./router/routerProject.js";
import routerTasks from "./router/routerTasks.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8137;
const db = connected();
app.use(express.json());

app.use(cors());

app.use("/projects", routerProject);
app.use("/tasks", routerTasks);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
