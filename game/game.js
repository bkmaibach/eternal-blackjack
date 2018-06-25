const {Table} = require('./table');
const {Player} = require('./player');

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


//console.log(JSON.stringify(players, undefined, 2));
//console.log(JSON.stringify(Player, undefined, 2));
//TODO: construct players using authenticated users
var player = new Player();
var table = new Table(player);
while (true){
    table.playRound();
}


