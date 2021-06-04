
const express = require('express');

const app = express();

app.post('/',express.json({type:'*/*'}), (req,res)=> {
  // let keys = Object.keys(req.body);
  // console.log(req.body[keys[0]]);
  res.set({
    'Access-Control-Allow-Headers': 'accept',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST'
  })
  
  // res.set()
  // console.log(req.body)
  

  // console.log(JSON.parse(req.body))
  let a = getFinalAnswer(req.body)
  res.send(`${a}`)
});

function mapping(list){
  return list.map(function(el){
    return el.map(function(el2){
      return el2-0
    })
  })
}

function simplifier(list){
  for (let j = 0; j<list.length;j++){
    if (list[j][0] != 1){
      for (let i = 0; i<99999999;i++){
        let number = (list[j][2]*i + list[j][1])/list[j][0]
        if (number % 1 == 0){
          list[j][0] = 1
          list[j][1] = number
          break
        }
      }
    }
  }
  return list
}

function multiply(list,index){
  let multiplySum = 1
  for (let i =0; i<list.length;i++){
    if (i != index){
      multiplySum *= list[i]
    }
  }
  return multiplySum
}

function getM(a){
  let result = []
  for (let i = 0; i<a.length;i++){
    result.push(multiply(a,i))
  }
  return result
}

function getModulo(a){
  let result = []
  for (let i =0; i<a.length;i++){
    result.push(a[i][2])
  }
  return result
}

function getConstant(a){
  let result = []
  for (let i =0; i<a.length;i++){
    result.push(a[i][1])
  }
  return result
}

function getY(listM,listModulo){
  let result = []
  for (let i =0; i<listM.length;i++){
    for (let j =0; i<999999;j++){
      if (j*listM[i] % listModulo[i] === 1){
        result.push(j)
        break
      }
    }
  }
  return result 
}

function getAnswer(listY,listM,listConstant,m){
  let result = 0
  for (let i =0; i<listY.length;i++){
    result += listY[i] * listM[i] * listConstant[i]
  }
  return result % m
}

function getm(listModulo){
  let result = 1
  for (let i =0; i<listModulo.length;i++){
    result *= listModulo[i]
  }
  return result
}

function getFinalAnswer(a){
  a = mapping(a)
  console.log(a)
  a = simplifier(a)
  listModulo = getModulo(a)
  listConstant = getConstant(a)
  listM = getM(listModulo)
  listY = getY(listM,listModulo)
  let m = getm(listModulo)
  console.log(a)
  console.log(listModulo)
  console.log(listM)
  console.log(listConstant)
  console.log(listY)
  console.log(getAnswer(listY,listM,listConstant,m))
  return getAnswer(listY,listM,listConstant,m)
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));