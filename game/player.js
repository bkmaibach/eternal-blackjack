const {Hand} = require('./hand');

var Player = function(){
    this.chips = initChips();
    this.initialBet = 100;
    this.activeHandIndex = 0;
}

Player.prototype.deal = function(twoCards, initialBet){
    this.hands = [new Hand(this.initialBet, false)];
    this.initialBet = initialBet;
    this.insured = false;
    this.activeHandIndex.add(twoCards);
    this.printCards();
}

Player.prototype.hit = function(){
    this.activeHand.add(card);
    this.printCards();
    if(this.activeHand.isBust()){
        showMessage('Bust!');
        this.nextHand()
    }

}

Player.prototype.stay = function(){
    this.nextHand();
}

Player.prototype.doubleDown = function(card){
    this.chips -= this.initialBet;
    this.activeHand.doubleBet();
    this.activeHand.add(card);
    this.printCards();
    if(this.activeHand.isBust()){
        showMessage('Bust!');
    }
    this.nextHand();
}

Player.prototype.split = function(){
    this.chips -= this.initialBet;
    this.hands.splice((this.activeHandIndex + 1), 0, new Hand(this.activeHand.bet, false));
}

Player.prototype.insure = function(){
    this.chips -= this.initialBet/2;
    this.insured = true;
}

Player.prototype.printCards = function(){
    this.hands.map((hand, i) => {
        showMessage(`\n Player hand ${i+1} of ${this.numberHands()}:`);
        hand.showCards();
        showMessage(`Hand total: ${hand.score}\n`);
    });
}

Player.prototype.claim = function(){
    this.chips += (bet * 1.5);
}

Player.prototype.win = function(handIndex){
    this.chips += activeHand.bet * 2;
    showMessage(`Hand ${(handIndex + 1).toString()} of ${numberHands()} wins ${hand.bet.toString()}`);

}

Player.prototype.lose = function(handIndex){
    showMessage(`Hand ${(handIndex+1).toString()} of ${numberHands()} loses!`);
}

Player.prototype.push = function(handIndex){
    showMessage(`Hand ${(handIndex+1).toString()} of ${numberhands()} push...`); 
}

Player.prototype.blackjack = function(handIndex){
    this.chips += activeHand.bet;
    showMessage(`Hand ${(handIndex+1).toString()} of ${numberhands()} push...`); 
}

Player.prototype.showError = function(error){
    console.log(error);
}

Player.prototype.showMessage = function(message){
    console.log(message);
}

Player.prototype.initChips = function(){
    this.chips = 5000;
}

Player.prototype.numberHands = function() { return hands.length; }