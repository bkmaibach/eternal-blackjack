const cards = require('cards');

var Hand = function(bet, hideFirst){
    this.pile = new cards.Pile();
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
    this.pile.concat(cards)
    //this.pile.add(cards);
    var total = 0;
    for( i = 0; i < this.pile.length; i++){
        total += cardValue(this.pile[i]);
    }
    if( total > 21 ){
        for( i = 0; i < this.pile.length; i++){
            if(total > 21 && this.pile[i].value === 'A'){
                total -= 10;
            }
        }
    }
    this.score = total;
}

Hand.prototype.getSize = function(){
    return this.pile.length;
}

Hand.prototype.showCards = function(){
    this.pile.map((card, i) => {
        console.log(`card ${i}:`)
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
    return this.pile.length = 2 && this.pile[1].value === 'A';
}

Hand.prototype.split = function(){
    return this.pile.draw(1);
}

Hand.prototype.canSplit = function(){
    return this.pile.lenngth === 2 && this.cardValue(this.pile[0]) === this.cardValue(this.pile[1]);

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