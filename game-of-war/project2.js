let aSuit = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
let bRank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let cScore = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

class Card{
  constructor(suit, rank, score) {
    this.ranks = rank
    this.suit = suit
    this.score = score
  }
}

class Player{
  constructor(name, hand) {
    this.name = name
    this.score = 0
    this.hand = hand
  }
}

class Deck{
  constructor(lengths) {
    this.deckLength = lengths
    this.cards = [];
    this.handOne = [];
    this.handTwo = [];
  }
  addCards() {
    for (let i = 0; i < aSuit.length; i++) {
      for (let j = 0; j < bRank.length; j++) {
        this.cards.push(new Card( aSuit[i], bRank[j], cScore[j]) );
      }
    }
  }
  shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i));
          let random = this.cards[i];
          this.cards[i] = this.cards[j];
          this.cards[j] = random;
      }
  }
  distribute() {
    for (let i = 0; i < this.cards.length; i += 2) {
      this.handOne.push(this.cards[i]);
    }
    for (let i = 1; i < this.cards.length; i += 2) {
      this.handTwo.push(this.cards[i]);
    }
  }
}


class Table {
 
  constructor(a, b) {
    this.playerOne = a;
    this.playerTwo = b; 
  }
  onePlay = []
  twoPlay = []

  playHand() {
    this.onePlay.push(this.playerOne.hand.shift())
    this.twoPlay.push(this.playerTwo.hand.shift())
  }

  compareHand() {
    
      if ((this.onePlay[0].score > this.twoPlay[0].score)) {
        this.playerOne.hand.push(this.onePlay.shift());
        this.playerOne.hand.push(this.twoPlay.shift());
      }
      else if ((this.onePlay[0].score < this.twoPlay[0].score)) {
        this.playerTwo.hand.push(this.onePlay.shift());
        this.playerTwo.hand.push(this.twoPlay.shift());
      }
      else {
        this.playWar();
        // this.playerOne.hand.push(this.onePlay.shift());
        // this.playerTwo.hand.push(this.twoPlay.shift());
      }
     
  }


  playWar() {
    for (let i = 0; i < this.playerOne.hand.length; i += 4) {
      this.onePlay.push(this.playerOne.hand.splice(0, i))
      this.twoPlay.push(this.playerTwo.hand.splice(0, i))

      if ((this.onePlay[this.onePlay.length-1].score > this.twoPlay[this.twoPlay.length-1].score)) {
        this.playerOne.hand.push(this.onePlay.splice(0, this.onePlay.length-1))
        this.playerOne.hand.push(this.twoPlay.splice(0, this.twoPlay.length-1))
      }
      else if ((this.onePlay[this.onePlay.length-1].score < this.twoPlay[this.twoPlay.length-1].score)) {
        this.playerTwo.hand.push(this.onePlay.splice(0, this.onePlay.length-1))
        this.playerTwo.hand.push(this.twoPlay.splice(0, this.twoPlay.length-1))
      } else { 
        // this.keepWar()
      }
    }
  }

  keepPlay() {
    while ((this.playerOne.hand.length > 0) && (this.playerTwo.hand.length > 0)) {
      this.playHand()
      this.compareHand()
      }
    }

  keepWar() {
    while ((this.playerOne.hand.length < 4 && this.playerTwo.hand.length < 4)) {
      this.compareHand()
    }
  }

  


}



const newDeck = new Deck(52)
newDeck.addCards();
newDeck.shuffle();
newDeck.distribute();
const Tyler = new Player("playerOne", newDeck.handOne)
const Raul = new Player("playerTwo", newDeck.handTwo)
const theTable = new Table(Tyler, Raul)
// console.log(theTable.playerOne.hand)
// console.log(theTable.playerTwo.hand)
// console.log(theTable.playerOne.hand.pop())
// console.log(theTable.playerTwo.hand.pop())

theTable.playHand()

// console.log(theTable.onePlay[0].score)
// console.log(theTable.twoPlay[0].score)
theTable.compareHand()
theTable.keepPlay()

console.log(theTable.playerOne.hand.length)
console.log(theTable.playerTwo.hand.length)
console.log("one play", theTable.onePlay.length)
console.log("two play", theTable.twoPlay)

