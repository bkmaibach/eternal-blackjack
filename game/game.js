const {Table} = require('./table');
const {Player} = require('./player');

const cards = require('cards');
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const NUM_DECKS = 12;

cards.generators.genBlackjackDeck = function(deck){
    for( i = 0; i < NUM_DECKS; i++){
        deck.add(new cards.PokerDeck());
    }
    
}

cards.Deck.createType('BlackjackDeck', 'genBlackjackDeck');

cards.useArc4 = true;

getInput = function(message){
    rl.question(message, (answer) => {
        rl.close();
        return answer;
      });
      
}
//TODO: construct players using authenticated users
var player = new Player();
var table = new Table(player);
var play = true;
while (play === true){
    table.playround();
    yesNo = getInput("Play again?")
    if (yesNo === 'y'){
        play = true;
    } else if (yesNo === 'n'){
        play = false;
    }
}


