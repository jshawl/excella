var app = require("express")();
var bodyParser = require("body-parser");
app.use(bodyParser.json())

app.listen(process.env.PORT || 3000)

app.post("/hello", function(req, res){
  var hellos = req.body[0];
  var response = [];
  for(var i = 0; i < hellos; i++){
    response.push("Hello World");
  }
  res.json(response);
})