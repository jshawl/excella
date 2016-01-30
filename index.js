var app = require("express")();

app.listen(3000)

app.get("/", function(req, res){
  res.json("hey")
})