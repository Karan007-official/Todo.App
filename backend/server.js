const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/tasks", (req, res) => {
  const { title, priority } = req.body;

  db.query(
    "INSERT INTO tasks(title, priority) VALUES (?, ?)",
    [title, priority],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task Added" });
    }
  );
});

app.delete("/tasks/:id", (req, res) => {
  db.query(
    "DELETE FROM tasks WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task Deleted" });
    }
  );
});

app.put("/tasks/:id", (req, res) => {
  db.query(
    `UPDATE tasks
     SET completed = CASE
     WHEN completed = 1 THEN 0
     ELSE 1
     END
     WHERE id=?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task Updated" });
    }
  );
});

app.put("/edit/:id", (req, res) => {
  const { title, priority } = req.body;

  db.query(
    "UPDATE tasks SET title=?, priority=? WHERE id=?",
    [title, priority, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task Edited" });
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});