const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = ["start here"];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function (req, res) {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var today = new Date();
    var options = { weekday: "short", day: "numeric", month: "short"};
    var day = today.toLocaleDateString("en-US", options);
    // var day = today.toLocaleDateString("ja-JP", options);
    res.render("list",{ kindOfDay: day, newListItem: items });
});


app.post("/", function(req, res) {
    var item = req.body.newItem;
    items.push(item)
    res.redirect("/");
});



app.listen(3000, function () {
    console.log("server started successfully on 3000");
});