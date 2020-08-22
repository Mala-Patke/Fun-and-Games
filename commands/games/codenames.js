var words = ["doctor","eagle","oil","plastic","elephant","Germany","nail","hammer","electricity","milk","pipe","computer","Discord","Lifeline","Steam","Orange"];
var assasinWord = "";
var blueWords = [];
var redWords = [];
var bystandWords = [];
var tempIndex;
var element;

for (i = 0; i < 5; i++){
    tempIndex = Math.floor(Math.random()*words.length);
    element = words[tempIndex]
    blueWords.push(element);
    words = words.filter(el => el != element) 
}

for (i = 0; i < 5; i++){
    tempIndex = Math.floor(Math.random()*words.length);
    element = words[tempIndex]
    redWords.push(element);
    words = words.filter(el => el != element) 
}

for (i = 0; i < 5; i++){
    tempIndex = Math.floor(Math.random()*words.length);
    element = words[tempIndex]
    bystandWords.push(element);
    words = words.filter(el => el != element)
}
tempIndex = Math.floor(Math.random()*words.length);
assasinWord = words[tempIndex] 


console.log(assasinWord)
console.log(blueWords)
console.log(redWords)
console.log(words.length)


