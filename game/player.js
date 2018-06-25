const {Hand} = require('./hand');
const rls = require('readline-sync');

var Player = function(){
    this.initialBet = 100;
}

Player.prototype.deal = function(twoCards, initialBet){
    this.hands = [new Hand(initialBet, false)];
    this.insured = false;
    this.activeHandIndex = 0;
    this.hands[0].add(twoCards);
    this.printCards();
}

Player.prototype.hit = function(card){
    this.activeHand().add(card);
    this.printCards();
    if(this.activeHand().isBust()){
        this.showMessage('Bust!');
        this.nextHand();
    }
}

Player.prototype.stay = function(){
    this.nextHand();
}

Player.prototype.canDoubleDown = function(){
    return this.activeHand().canDoubleDown();
}

Player.prototype.doubleDown = function(card){
    this.chips -= this.initialBet;
    this.activeHand().doubleBet();
    this.activeHand().add(card);
    this.printCards();
    if(this.activeHand().isBust()){
        this.showMessage('Bust!');
    }
    this.nextHand();
}

Player.prototype.canSplit = function(){
    return this.activeHand().canSplit();
}

Player.prototype.split = function(){
    this.chips -= this.initialBet;
    this.hands.splice((this.activeHandIndex + 1), 0, new Hand(this.activeHand().bet, false));
}

Player.prototype.insure = function(){
    this.chips -= this.initialBet/2;
    this.insured = true;
}

Player.prototype.printCards = function(){
    this.hands.map((hand, i) => {
        this.showMessage(`\n Player hand ${i+1} of ${this.numberHands()}:`);
        hand.showCards();
        this.showMessage(`Hand total: ${hand.score}\n`);
    });
}

Player.prototype.claim = function(){
    this.chips += (bet * 1.5);
}

Player.prototype.win = function(handIndex){
    var bet = this.hands[handIndex].bet;
    this.chips += bet * 2;
    this.showMessage(`Hand ${handIndex + 1} of ${this.numberHands()} wins ${bet}`);
}

Player.prototype.lose = function(handIndex){
    this.showMessage(`Hand ${handIndex+1} of ${this.numberHands()} loses!`);
}

Player.prototype.push = function(handIndex){
    this.chips += this.hands[handIndex].bet;
    this.showMessage(`Hand ${handIndex+1} of ${this.numberHands()} push...`); 
}

Player.prototype.blackjack = function(handIndex){
    var bet = this.hands[handIndex].bet;
    this.chips += bet * 2.5;
    this.showMessage(`Hand ${handIndex+1} of ${this.numberHands()} blackjack! Win ${bet * 2.5}`); 
}

Player.prototype.allBust = function(){
    for(i = 0; i< this.hands.length; i++){
        if(!this.hands[i].isBust()){
            return false;
        }
    }
    return true;
}

Player.prototype.allBlackjack = function(){
    for(i = 0; i< this.hands.length; i++){
        if(!this.hands[i].isBlackjack()){
            return false;
        }
    }
    return true;
}

Player.prototype.initChips = function(){
    this.chips = 5000;
}

Player.prototype.numberHands = function() {
    return this.hands.length;
}

Player.prototype.getBet = function(min, max){
    return rls.question(`You have ${this.chips} chips. Place your bet: `);
}

Player.prototype.getAction = function(min, max){
    return rls.question('hit(h)/stay(s)/split(p)/doubledown(d)/insure(i)?:');
}

Player.prototype.activeHand = function(){
    return this.hands[this.activeHandIndex];
}

Player.prototype.nextHand = function(){
    console.debug('nextHand() called');
    return this.activeHandIndex++;
}

Player.prototype.doneTurn = function(){
    return this.activeHandIndex >= this.hands.length;
}

Player.prototype.showError = function(error){
    console.log(error);
}

Player.prototype.showMessage = function(message){
    console.log(message);
}

module.exports = {
    Player
}