var express = require("express");
var app = express();

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const Comments = sequelize.define(
  "Comments",
  {
    // Model attributes are defined here
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
async function async() {
  await Comments.sync();
}
async();

// async () => {
//   await Comments.sync();
//   console.log("The table for the User model was just (re)created!");
// };
console.log(Comments === sequelize.models.Comments); // true

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// use res.render to load up an ejs view file

// index page
app.get("/", async function (req, res) {
  const comments = await Comments.findAll();
  res.render("index", { comments: comments });
});
app.get("/create", function (req, res) {
  res.send("hi");
});

app.post("/create", async function (req, res) {
  console.log(req.body);
  const content = req.body;
  console.log(content.content);
  await Comments.create({ content: content.content });
  res.redirect("/");
});

app.post("/update/:id", async function (req, res) {
  console.log(req.params);
  console.log(req.body);

  const content = req.body;
  const id = req.params;
  // Change everyone without a last name to "Doe"
  await Comments.update(
    { content: content.content },
    {
      where: {
        id: id.id,
      },
    }
  );

  res.redirect("/");
});

app.post("/delete/:id", async function (req, res) {
  console.log(req.params);

  const id = req.params;

  // Delete everyone named "Jane"
  await Comments.destroy({
    where: {
      id: id.id,
    },
  });
  res.redirect("/");
});

app.listen(3000);
console.log("Server is listening on port 3000");
