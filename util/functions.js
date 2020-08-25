//I'm lazy, alright
module.exports = {
    /**
     * @param {Array} a
     * @returns {Array} a shuffled
     */
    shuffle(a) {
        for (let i = 0; i < a.length-1; i++) {
            const j = Math.floor(Math.random() * (i - 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },
    /**
     * @param {Number} a 
     * @returns {Boolean}
     */
    isInt(a){
        if(a === parseInt(a, 10)) return true;
        return false;
    },
    /**
     * @param {Array} arr
     * @returns Most Mentioned Value
     */
    mode(arr){
        return arr.sort((a,b) => arr.filter(v => v === a).length - arr.filter(v => v===b).length).pop();
    }
}