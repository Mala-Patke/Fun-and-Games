const json = require('./emotes.js');
const fs = require('fs');

    var ret = {};
    for(var key in json){
      ret[json[key]] = key;
    }
    fs.writeFileSync("./emotes.json", JSON.stringify(ret));;
console.log("Done");