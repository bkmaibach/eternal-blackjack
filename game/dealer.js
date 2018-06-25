const {Player} = require('./player');
const {Hand} = require('./hand');

var Dealer = function(){

    Player.call(this)
}

Dealer.prototype = Object.create(Player.prototype);

Dealer.prototype.constructor = Dealer;

Dealer.prototype.deal = function(twoCards){
    this.hands = [new Hand(null, true)];
    this.hands[0].add(twoCards);
    this.printCards();
}


Dealer.prototype.printCards = function(){
    this.showMessage('\nDealer hand:');
    this.activeHand().showCards();
    if (!this.activeHand().hideFirstCard){
        this.showMessage(`Dealer total: ${this.dealerScore()}\n`)
    }
}

Dealer.prototype.reveal = function(){
    this.activeHand().hideFirstCard = false;
    this.printCards();
}

Dealer.prototype.dealerScore = function(){
    return this.hands[0].score;
}

Dealer.prototype.activeHand = function(){
    return this.hands[0];
}

Dealer.prototype.stillHits = function (){
    return this.dealerScore() < 17;
}

Dealer.prototype.isInsurable = function(){
    return this.hands[0].cards.length === 2 && this.hands[0].cards[1].value === 'A';
}

module.exports = {
    Dealer
}