const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

var items = ["Buy Food", "Cook Food", "Eat Food"];

let workItems = [];

app.get("/", function(req, res) {

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);
  console.log(day);

  res.render('list', {
    listTitle: day,
    newListItem: items
  });
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItem: workItems
  });
});

app.get("/about", function(req, res) {
  res.render('about', {
    listTitle: "About"
  });
})


app.post("/", function(req, res){

  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item);
    res.redirect("/");
  }
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
})
