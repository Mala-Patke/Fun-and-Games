//I'm lazy, alright
module.exports = {
    /**
     * @param {Array} a
     * @returns {Array}
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
    }
}