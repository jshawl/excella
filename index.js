var app = require("express")();
var bodyParser = require("body-parser");
app.use(bodyParser.json())

app.listen(process.env.PORT || 3000)

app.post("/", function(req, res){
  res.json("hey")
})