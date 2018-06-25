const cards = require('cards');

var Hand = function(bet, hideFirst){
    this.cards = [];
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
    this.cards = this.cards.concat(cards);
    var total = 0;
    for( i = 0; i < this.cards.length; i++){
        total += cardValue(this.cards[i]);
    }
    if( total > 21 ){
        for( i = 0; i < this.cards.length; i++){
            if(total > 21 && this.cards[i].value === 'A'){
                total -= 10;
            }
        }
    }
    this.score = total;
}

Hand.prototype.getSize = function(){
    return this.cards.length;
}

Hand.prototype.showCards = function(){
    this.cards.map((card, i) => {
        console.log(`card ${ i + 1}:`)
        if( i === 0 && this.hideFirstCard === true){
            console.log('*** FACEDOWN CARD ***');
        } else {
            console.log(card.value, card.suit);
        }
    });

}

Hand.prototype.isBust = function(){
    return this.score > 21;
}

Hand.prototype.isBlackjack = function(){
    return this.score === 21;
}

Hand.prototype.split = function(){
    return this.cards.draw(1);
}

Hand.prototype.canSplit = function(){
    return this.cards.lenngth === 2 && this.cardValue(this.cards[0]) === this.cardValue(this.cards[1]);

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