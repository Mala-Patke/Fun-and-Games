const json = require('./emotes.js');
const fs = require('fs');

<<<<<<< HEAD
=======
function swap(json){
>>>>>>> 969843898a7df5be24af418dc364548234acf002
    var ret = {};
    for(var key in json){
      ret[json[key]] = key;
    }
    fs.writeFileSync("./emotes.json", JSON.stringify(ret));;
<<<<<<< HEAD
=======
  }
swap(json);
>>>>>>> 969843898a7df5be24af418dc364548234acf002
console.log("Done");