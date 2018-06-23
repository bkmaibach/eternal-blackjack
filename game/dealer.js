const player = require('./player');
const hand = require('./hand');

var Dealer = function(){

    player.call(this)
}

Van.prototype = Object.create(Dealer.prototype);

Van.prototype.constructor = Dealer;

Dealer.prototype.deal = function(){

}


Dealer.prototype.printCards = function(){

}

Dealer.prototype.reveal = function(){

}

Dealer.prototype.dealerScore = function(){

}

Dealer.prototype.activeHand = function(){

}

Dealer.prototype.stillHits = function (){

}