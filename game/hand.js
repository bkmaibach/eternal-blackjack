const cards = require('cards');

var Hand = function(bet, hideFirst){
    this.stack = new cards.Deck();
    this.bet = bet;
    this.hideFirstCard = hideFirst;
};

cardValue = function(card){
    return {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'J': 10,
        'Q': 10,
        'K': 10,
        'A':11
    }[card.value]
}

Hand.prototype.add = function(cards){
    this.stack.add(cards);
    var total = 0;
    this.stack.cards.forEach((card) => {
        total += cardValue(card);
    });
    if( total > 21 ){
        this.stack.cards.forEach((card) => {
            if(total > 21 && card.value === 'A'){
                total -= 10;
            }
        });
    }
    this.score = total;
}

Hand.prototype.getSize = function(){
    return this.stack.length;
}

Hand.prototype.showCards = function(){
    this.stack.cards.map((card, i) => {
        if( i === 0 && this.hideFirstCard === true){
            console.log('*** FACEDOWN CARD ***');
        } else {
            console.log(card);
        }
    });
}

Hand.prototype.isBust = function(){
    return this.score > 21;
}

Hand.prototype.isBlackjack = function(){
    return this.score === 21;
}

Hand.prototype.isInsurable = function(){
    return this.stack.length = 2 && this.stack[1].value === 'A';
}

Hand.prototype.split = function(){
    return this.stack.draw(1);
}

Hand.prototype.canSplit = function(){
    return this.stack.lenngth === 2 && this.cardValue(this.stack[0]) === this.cardValue(this.stack[1]);

}

Hand.prototype.canDoubleDown = function(){
    return this.getSize() === 2;
}

Hand.prototype.doubleBet = function(){
    this.bet *= 2;
}

module.exports = {
    Hand
}