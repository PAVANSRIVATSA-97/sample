var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var ejs = require("ejs");
var fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", () => console.log("Error in connecting to database"));
db.once("open", () => console.log("Connected to database"));

app.post("/signup", (req, res) => {
  const { email, psw, "psw-repeat": repeatpassword } = req.body;

  if (psw !== repeatpassword) {
    return res.status(400).send("Passwords do not match");
  }

  const data = {
    email,
    password: psw,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      return res.status(500).send("Error inserting record");
    }
    console.log("Record inserted Successfully");
    redirect_to_home(email, res);
  });
});

function redirect_to_home(username, res) {
  fs.readFile("./public/home.html", "utf-8", function (err, content) {
    if (err) {
      console.log(err);
      res.end(err);
      return;
    }
    const user = username.split("@")[0];
    const renderedHtml = ejs.render(content, { user });

    db.collection("users")
      .find({ email: username })
      .toArray()
      .then((data) => {
        if (!data || data.length === 0) {
          return res.status(404).send("Not a registered user");
        } else {
          return res.send(renderedHtml);
        }
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send("Database error");
      });
  });
}

app.get("/", (req, res) => {
  res.set({ "Allow-access-Allow-Origin": "*" });
  return res.redirect("index.html");
});

app.post("/login", (req, res) => {
  const { username, userpassword } = req.body;
  const data = {
    email: username,
    password: userpassword,
  };
  redirect_to_home(username, res);
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
