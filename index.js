import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 4000; 

app.get("/", (req, res) => {
  res.send("🚀 Blog API is running!");
});

app.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}`);
});

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Getting Started with Full Stack Development",
    content:
      "Full stack development refers to the ability to work on both the frontend and backend of web applications. A full stack developer is capable of building user interfaces with technologies like HTML, CSS, and JavaScript, while also managing databases, servers, and APIs. Learning both sides of development provides flexibility and opens the door to creating complete, end-to-end solutions.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Frontend vs Backend: Understanding the Stack",
    content:
      "Frontend development focuses on the visual parts of a website or app — the buttons, forms, and layouts that users interact with. Backend development powers the behind-the-scenes logic, such as APIs, databases, and authentication systems. A full stack developer bridges both areas, ensuring seamless communication between the frontend and backend layers of a project.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Essential Tools for Full Stack Developers",
    content:
      "To be an effective full stack developer, it's important to master a variety of tools and frameworks. On the frontend, popular choices include React, Angular, and Vue. For the backend, Node.js, Express, and Django are widely used. Databases like MongoDB and PostgreSQL handle data storage, while tools like Git and Docker help manage code and deployments efficiently.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];


let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
