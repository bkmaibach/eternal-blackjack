const cards = require('cards');

var Hand = function(bet, hideFirst){
    this.stack = cards.Deck();

};

Hand.prototype.cardValue = function(card){
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
    this.stack.push(cards);
    var total = 0;
    this.stack.forEach((card) => {
        total += cardValue(card);
    });
    if( total > 21 ){
        this.stack.forEach((card) => {
            if(card.value === 'A' && total > 21){
                total -= 10;
            }
        });
    }
    this.bust = total > 21;
    this.score = total;
}

Hand.prototype.getSize = function(){
    return this.stack.length;
}

Hand.prototype.showCards = function(){

}

Hand.prototype.isbust = function(){


}

Hand.prototype.isblackjack = function(){


}

Hand.prototype.isinsurable = function(){


}

Hand.prototype.split = function(){


}

Hand.prototype.cansplit = function(){


}

Hand.prototype.candoubledown = function(){


}

Hand.prototype.doublebet = function(){


}