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
});

app.post("/anagram", function(req, res){
  var annies = req.body
  var response = [];
  annies.forEach(function(anny){
    response.push(isAnagram(anny[0],anny[1]))
  })
  res.json(response);
})

function isAnagram(one, two){
  var firstLetters = one.split("");
  var secondLetters = two.split("");
  if(one.length != two.length) return false;
  var bool = true;
  firstLetters.forEach(function(l){
    if(!two.match(l)) bool = false;
  })
  secondLetters.forEach(function(l){
    if(!one.match(l)) bool = false;
  })
  return bool;
}