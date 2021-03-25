const express = require("express");

const Gospel = require("./gospel/gospel-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.post("/gospel", async (req, res) => {
  res.json(await Gospel.insert(req.body));
});

server.delete("/gospel/:id", async (req, res) => {
  res.json(await Gospel.remove(req.params.id));
});

module.exports = server;
