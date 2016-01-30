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

app.post("/palindrome", function(req, res){
  var words = req.body;
  var response = [];
  console.log(words)
  words.forEach(function(word){
    response.push(word.split("").reverse().join("") == word)
  })
  res.json(response);
})

app.post("/fibonacci", function(req, res){
  var fibs = req.body;
  var response = [];
  fibs.forEach(function(fb){
    console.log("fb is", fb)
    var fibo = fib(fb + 1)
    response.push(fibo[fb])
  })
  res.json(response)
})



function fib(limit, o){
  var o = o || [0, 1]
  if(o.length >= 2){
    o.push(o[o.length - 2] + o[o.length - 1])
    if(o.length < limit){
      fib(limit, o)
    }
  }
  return o
}

app.post("/fizzbuzz", function(req, res){
  var fbs = req.body;
  var response = [];
  fbs.forEach(function(fb){
    response.push(fizzbuzz(fb))
  })
  res.json(response)
})

function fizzbuzz(int){
  if(int % 6 === 0) return "FizzBuzz"
  if(int % 2 === 0) return "Fizz"
  if(int % 3 === 0) return "Buzz"
  return int
}


app.post("/prime", function(req, res){
  var response = [];
  req.body.forEach(function(int){
    response.push(isPrime(int));
  })
  res.json(response);
})
function isPrime(int){
  for(var i = 2; i < int; i++){
    console.log(int, i)
    if(int % i === 0){
      return false 
    }
  } 
  return true
}

app.post("/sumsquares", function(req,res){
  var response = [];
  req.body.forEach(function(int){
    response.push(sumOfSquares(int))
  })
  res.json(response);
})

function sumOfSquares(int){
  var int = JSON.stringify(int)
  ints = int.split("")
  var sum = 0;
  ints.forEach(function(int){
    sum += (int * int)
  })
  return sum
}


function sexyPrimes(limit){
  var primes = [];
  for(var i = 2; i < limit; i++){
    if(isPrime(i)){
      primes.push(i)
    }
  }
  var sexyPrimes = [];
  primes.forEach(function(p1){
    primes.forEach(function(p2){
      if(Math.abs(p1 - p2) === 6 ){
        sexyPrimes.push([p1,p2])
      }
    })
  })
  return sexyPrimes
}

app.post("/sexy", function(req, res){
  res.json(sexyPrimes(req.body[0]))
})