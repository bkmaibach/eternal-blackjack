const player = require('./player');
const {Hand} = require('./hand');

var Dealer = function(){

    player.call(this)
}

Dealer.prototype = Object.create(Dealer.prototype);

Dealer.prototype.constructor = Dealer;

Dealer.prototype.deal = function(twoCards){
    this.hands = [new Hand(null, true)];
    this.activeHandIndex = 0;
    this.activeHand.add(twoCards);
    this.printCards();
}


Dealer.prototype.printCards = function(){
    showMessage('\nDealer hand:');
    this.activeHand.showCards();
    if (!this.activeHand.hideFirstCard){
        showMessage(`Dealer total: ${dealerScore()}\n`)
    }
}

Dealer.prototype.reveal = function(){
    this.activeHnad.hideFirstCard = false;
    this.printCards();
}

Dealer.prototype.dealerScore = function(){
    return this.hands[0].score;
}

Dealer.prototype.activeHand = function(){
    return this.hands[0];
}

Dealer.prototype.stillHits = function (){
    return this.dealerScore < 17;
}