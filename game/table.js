const cards = require('cards');
const {Dealer} = require('./dealer');

const MIN_BET = 10;
const MAX_BET = 5000;

var Table = function(player){
    this.shoe = new cards.BlackjackDeck();
    //Must call void Deck::shuffleDiscard ( void ) whenever the deck is empty
    this.shoe.shuffleAll();
    this.dealer = new dealer();
    this.linkedPlayer = player;
}

Table.prototype.playRound = function(){
    var baseBet = this.player.getBet(MIN_BET, MAX_BET);
    this.dealer.deal(this.shoe.draw(2));
    this.linkedPlayer.deal(this.shoe.deal(2));
    while (!this.linkedPlayer.doneTurn()){
        switch(player.getAction()){
            case 'h':
                this.linkedPlayer.hit(this.shoe.draw(1));
                break;
            case 's':
                this.linkedPlayer.stay();
                break;
            case 'p':
                if (this.linkedPlater.activeHand.canSplit()){
                    this.linkedPlayer.split(this.shoe.draw(2));
                } else {
                    this.linkedPlayer.showError('Can only split hand of two cards with the same value!')
                }
                break;
            case 'd':
                if (this.linkedPlayer.activeHand.canDoubleDown()){
                    this.linkedPlayer.doubleDown(this.shoe.draw(1));
                } else {
                    this.linkedPlayer.showError('Can only double down hand of two cards!');
                }
                break;
            case 'i':
                if( this.dealer.activeHand.isInsurable()){
                    this.linkedPlayer.insure();
                }
                else{
                    this.linkedPlayer.showError('Can only insure when dealer has one facedown card and one ace!');
                }
                break;
            default:
                this.linkedPlayer.showError('Invalid input.');
                break;
        }
        
        this.dealer.reveal();
        var playerBust = this.linkedPlayer.allBust();
        while (this.dealer.stillHits() && !playerBust){
            this.dealer.hit(this.shoe.draw(1));
        }
        var dealerScore = this.dealer.dealerScore();
        var dealerBust = this.dealer.allBust();

        if(this.dealer.allBlackjack()){
            this.linkedPlayer.showMessage("Dealer blackjack!");
            if(this.linkedPlayer.insured){
                //this.linkedPlayer.chips += (bet * 1.5);
                this.linkedPlayer.claim();
            }
            this.linkedPlayer.hands.map((hand, i) => {
                if(hand.isBlackjack()){
                    this.linkedPlayer.push(i);
                    //this.linkedPlayer.showMessage(`Hand ${(i+1).toString()} of ${numberhands} push...`); 
                } else {
                    this.linkedPlayer.lose(i);
                    //this.linkedPlayer.showMessage(`Hand ${(i+1).toString()} of ${numberhands} loses!`);
                }
            })
        } else if(dealerBust){
            this.linkedPlayer.hands.map((hand, i) => {
                if (!hand.isBust()){
                    linkedPlayer.win(i);
                    //this.linkedPlayer.chips += hand.bet * 2;
                    //linkedPlayer.showMessage(`Hand ${(i + 1).toString()} of ${numberhands} wins ${hand.bet.toString()}`);
                }
            });
        } else {
            this.linkedPlayer.hands.map((hand, i) => {
                if (hand.isBust()){
                    this.linkedPlayer.lose(i);
                } else if (hand.isBlackjack()){
                    this.linkedPlayer.blackjack(i);
                } else if(hand.score < dealerScore){
                    this.linkedPlayer.lose(i);
                } else if(hand.score == dealerScore){
                    this.linkedPlayer.push(i);
                }
            })
        }
    }

}
