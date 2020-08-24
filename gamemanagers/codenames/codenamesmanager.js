const Base = require('../base');
const { isInt, shuffle } = require('../../util/functions');
const codenameswords = require('./codenameswords.json');
const emotes = require('../../util/emotes');

module.exports = class CodenamesManager extends Base{
    constructor(host, channel, client, maxplayers, minplayers){
        super(...arguments);
        this.maxplayers = 12;
        this.minplayers = 4;
    }
    init(){
        return new Promise(async (res, rej) => {
            let players = await this.startGame();
            players.push(this.host);

            if(players.length < this.minplayers) rej(`There are too few players to begin! The minimum number of players is ${this.minplayers}`)
            if(!isInt(players.length/2)) rej('This game will not function with an odd number of players. Please run the game again, but before starting, make sure an even number of players have joined.');

            shuffle(players);
            let redop = players.slice(1, players.length/2);
            let blueop = players.slice(players/2+1, players.length);
            let redsm = redop.pop();
            let bluesm = blueop.pop();
            
            let board = [{word: 'test', role:'test'}];
            let teamselect = Math.floor(Math.random() * 2);
            for(let i = 0; i < 24; i++){
                let randomword = codenameswords[Math.floor(Math.random()*codenameswords.length)];
                if(!board.map(w => w.word).includes(randomword)){
                    if(i <= 7){
                        if(teamselect === 1) board.push({word: randomword, role: 'red'});
                        else board.push({word: randomword, role:'blue'});
                    } else if(i > 7 && i <= 16){
                        if(teamselect === 2) board.push({word: randomword, role: 'red'});
                        else board.push({word: randomword, role:'blue'});
                    } else if(i !== 24) board.push({word:randomword, role: 'bystander'});
                    else board.push({word: randomword, role:'assassin'});
                } else i--;
            }
            shuffle(board);
            
            res({
                redop: redop, 
                redsm: redsm,
                blueop:blueop,
                bluesm:bluesm,
                board:board
            })
        })
    }
}