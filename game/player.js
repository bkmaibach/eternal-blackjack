const {Hand} = require('./hand');
const readline = require('readline');
const rls = require('readline-sync');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

var Player = function(){
    //this.chips = this.initChips();
    this.chips = 5000;
    this.initialBet = 100;
    this.activeHandIndex = 0;
}

Player.prototype.deal = function(twoCards, initialBet){
    this.hands = [new Hand(initialBet, false)];
    this.insured = false;
    this.activeHand().add(twoCards);
    this.printCards();
}

Player.prototype.hit = function(card){
    this.activeHand()().add(card);
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
    this.activeHand().doubleBet();
    this.activeHand().add(card);
    this.printCards();
    if(this.activeHand.isBust()){
        showMessage('Bust!');
    }
    this.nextHand();
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
    this.chips += activeHand.bet * 2;
    this.showMessage(`Hand ${(handIndex + 1).toString()} of ${this.numberHands()} wins ${hand.bet.toString()}`);
}

Player.prototype.lose = function(handIndex){
    this.showMessage(`Hand ${(handIndex+1).toString()} of ${this.numberHands()} loses!`);
}

Player.prototype.push = function(handIndex){
    this.showMessage(`Hand ${(handIndex+1).toString()} of ${this.numberhands()} push...`); 
}

Player.prototype.blackjack = function(handIndex){
    this.chips += activeHand.bet;
    this.showMessage(`Hand ${(handIndex+1).toString()} of ${this.numberhands()} blackjack!`); 
}

Player.prototype.allBust = function(){
    for(i = 0; i< this.hands.length; i++){
        if(!hand[i].isBust()){
            return false;
        }
    }
    return true;
}

Player.prototype.allBlackjack = function(){
    for(i = 0; i< this.hands.length; i++){
        if(!hand[i].isBlackjack()){
            return false;
        }
    }
    return true;
}


// Player.prototype.initChips = function(){
//     this.chips = 5000;
// }

Player.prototype.numberHands = function() {
    return this.hands.length;
}

Player.prototype.getBet = function(min, max){
    // rl.question('Place your bet:', (answer) => {
    //     rl.close();
    //     return answer;
    //   });
    return rls.question('Place your bet: ');
}

Player.prototype.getAction = function(min, max){
    // rl.question('hit(h)/stay(s)/split(p)/doubledown(d)/insure(i)?:', (answer) => {
    //     rl.close();
    //     return answer;
    //   });
    return rls.question('hit(h)/stay(s)/split(p)/doubledown(d)/insure(i)?:');
}

Player.prototype.activeHand = function(){
    return this.hands[this.activeHandIndex];
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