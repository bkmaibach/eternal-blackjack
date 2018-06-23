const {Table} = require('./table');
const cards = require('cards');

const NUM_DECKS = 12;

cards.generators.genBlackjackDeck = function(deck){
    for( i = 0; i < NUM_DECKS; i++){
        deck.add(new cards.PokerDeck());
    }
    
}

cards.Deck.createType('BlackjackDeck', 'genBlackjackDeck');

cards.useArc4 = true;

getInput = function(message){
    
}

var table = new Table();
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


