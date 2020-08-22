const json = require('./emotes.js');
const fs = require('fs');

function swap(json){
    var ret = {};
    for(var key in json){
      ret[json[key]] = key;
    }
    fs.writeFileSync("./emotes.json", JSON.stringify(ret));;
  }
swap(json);
console.log("Done");