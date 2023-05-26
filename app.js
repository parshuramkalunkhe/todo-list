const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();
const items = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

const itemSchema = {
    name: String
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcome to your todo-list!"
});

const item2 = new Item({
    name: "Hit the + to add a new item."
});

const item3 = new Item({
    name: "Hit the checkbox to delete the item."
});

const item4 = new Item({
    name: "You are ready to go."
});

const defaultItems = [item1, item2, item3, item4];

app.get("/", function (req, res) {

    const day = date.getDate();

    Item.find({}).then(function (foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems).then(function () {
                console.log("Successfully saved defult items to DB");
            }).catch(function (err) {
                console.log(err);
            });
            res.redirect("/");
        } else {
            res.render("list", { kindOfDay: day, newListItem: foundItems });
        }
    }).catch(function(err){
        console.log(err);
    });
});


app.post("/", function (req, res) {
    const itemName = req.body.newItem;
    const item = Item({
        name: itemName
    });
    item.save();
    res.redirect("/");
});

app.post("/delete", function(req, res){
    const checkId = req.body.checkbox;

    Item.findByIdAndRemove(checkId).then(function(err){
        if(!err){
            console.log("success deleted.");
        }
    }).catch(function(err){
        console.log(err);
    });
    res.redirect("/");
});



app.listen(3000, function () {
    console.log("server started successfully on 3000");
});