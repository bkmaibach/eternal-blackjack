const {Table} = require('./table');
const {Player} = require('./player');

const cards = require('cards');
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const NUM_DECKS = 12;

//TODO: figure out how to generate a blackjack deck
// cards.generators.genBlackjackDeck = function(deck){
//     for( i = 0; i < NUM_DECKS; i++){
//         deck.add(new cards.PokerDeck());
//     }
    
// }
//cards.Deck.createType('BlackjackDeck', 'genBlackjackDeck');


//cards.useArc4 = true;
//TODO: Figure out how to seed the ARC4 generator

getInput = function(message){
    rl.question(message, (answer) => {
        rl.close();
        return answer;
      });
      
}
//console.log(JSON.stringify(players, undefined, 2));
//console.log(JSON.stringify(Player, undefined, 2));
//TODO: construct players using authenticated users
var player = new Player();
var table = new Table(player);
var play = true;
while (play === true){
    table.playRound();
    yesNo = getInput("Play again?")
    if (yesNo === 'y'){
        play = true;
    } else if (yesNo === 'n'){
        play = false;
    }
}


