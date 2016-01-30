var app = require("express")();

app.listen(process.env.PORT || 3000)

app.get("/", function(req, res){
  res.json("hey")
})