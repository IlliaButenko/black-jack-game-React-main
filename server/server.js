// Websocket server
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 4000;
const WebSocket = require("ws");

const WEB_URL =
  PORT === 4000
    ? "http://localhost:4000/"
    : "https://blackjack-multiplayer.herokuapp.com/";

const wss = new WebSocket.Server({ server: server });

// Serve all the static files, (ex. index.html app.js style.css)
app.use(express.static("public/"));
// Before 8081
server.listen(PORT, () =>
  console.log(`Listening on ${process.env.PORT} or 4000`)
);

var rand_card = [];

// Cards (values)

var global_deck = [];
var global_dealer = null;
var global_player = null;
var global_wallet = 5000;
var temp_wallet = 5000;
var global_currentBet = null;
var global_gameOver = false;
var game_state = 1;

// const { updatedDeck, player, dealer } = this.dealCards(deck);

const generateDeck = () => {
  const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
  const suits = ["heart_", "diamond_", "spades_", "club_"];
  const deck = [];
  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      deck.push({ number: cards[i], suit: suits[j] });
    }
  }
  return deck;
};

const dealCards = (deck) => {
  const playerCard1 = getRandomCard(deck);
  const dealerCard1 = getRandomCard(playerCard1.updatedDeck);
  const playerCard2 = getRandomCard(dealerCard1.updatedDeck);
  const playerStartingHand = [playerCard1.randomCard, playerCard2.randomCard];
  const dealerStartingHand = [dealerCard1.randomCard, {}];

  const player = {
    cards: playerStartingHand,
    count: getCount(playerStartingHand),
  };
  const dealer = {
    cards: dealerStartingHand,
    count: getCount(dealerStartingHand),
  };

  return { updatedDeck: playerCard2.updatedDeck, player, dealer };
};

const getRandomCard = (deck) => {
  const updatedDeck = deck;
  const randomIndex = Math.floor(Math.random() * updatedDeck.length);
  const randomCard = updatedDeck[randomIndex];
  updatedDeck.splice(randomIndex, 1);
  return { randomCard, updatedDeck };
};

const getCount = (cards) => {
  const rearranged = [];
  cards.forEach((card) => {
    if (card.number === "A") {
      rearranged.push(card);
    } else if (card.number) {
      rearranged.unshift(card);
    }
  });

  return rearranged.reduce((total, card) => {
    if (card.number === "J" || card.number === "Q" || card.number === "K") {
      return total + 10;
    } else if (card.number === "A") {
      return total + 11 <= 21 ? total + 11 : total + 1;
    } else {
      return total + card.number;
    }
  }, 0);
};

const stand = () => {
  if (global_wallet < 0) {
    global_gameOver = true;
    game_state = "Dealer bust! You win!";
    return;
  }

  if (global_wallet > temp_wallet * 2) {
    global_gameOver = true;
    game_state = "You bust!Dealer win! ";
    return;
  }
  game_state = 1;
  if (!global_gameOver) {
    const randomCard = getRandomCard(global_deck);
    let deck = randomCard.updatedDeck;

    let dealer = global_dealer;
    dealer.cards.pop();
    dealer.cards.push(randomCard.randomCard);
    dealer.count = getCount(dealer.cards);

    while (dealer.count < 17) {
      const draw = dealerDraw(dealer, deck);
      dealer = draw.dealer;
      deck = draw.updatedDeck;
    }

    if (dealer.count > 21) {
      global_deck = deck;
      global_dealer = dealer;
      global_wallet = global_wallet + global_currentBet * 2;
      (global_gameOver = true), (game_state = "Dealer bust! You win!");
    } else {
      const winner = getWinner(dealer, global_player);
      let wallet = global_wallet;
      if (winner === "dealer") {
        game_state = "Dealer wins...";
      } else if (winner === "player") {
        wallet += global_currentBet * 2;
        game_state = "You win!";
      } else {
        wallet += global_currentBet;
        game_state = "Push.";
      }
      global_deck = deck;
      global_dealer = dealer;
      global_wallet = wallet;
      global_gameOver = true;
    }
  } else {
    game_state = "Game over! Please start a new game.";
  }
  var payload = {
    method: "stand",
    deck: global_deck,
    dealer: global_dealer,
    balance: global_wallet,
    comment: game_state,
  };
  return payload;
};

const hit = () => {
  if (global_wallet < 0) {
    global_wallet = 0;
    global_gameOver = true;
    game_state = "You bust!Dealer win!";
    var payload = {
      player: global_player,
      gameOver: global_gameOver,
      comment: game_state,
      deck: global_deck,
      balance: global_wallet,
    };
    return payload;
  }

  if (global_wallet > temp_wallet * 2) {
    global_wallet = temp_wallet * 2;
    global_gameOver = true;
    game_state = "Dealer bust! You win!";
    var payload = {
      player: global_player,
      gameOver: global_gameOver,
      comment: game_state,
      deck: global_deck,
      balance: global_wallet,
    };
    return payload;
  }
  game_state = 1;
  if (!global_gameOver) {
    if (global_currentBet) {
      const { randomCard, updatedDeck } = getRandomCard(global_deck);
      const player = global_player;
      player.cards.push(randomCard);
      console.log(player.cards);
      console.log(player.cards);

      player.count = getCount(player.cards);
      if (player.count > 21) {
        global_deck = updatedDeck;
        global_player = player;
        global_gameOver = true;
        game_state = "BUST";
      } else {
        global_deck = updatedDeck;
        global_player = player;
      }
    } else {
      game_state = "Please place bet.";
    }
  } else {
    game_state = "Game over! Please start a new game.";
  }
  var payload = {
    player: global_player,
    gameOver: global_gameOver,
    comment: game_state,
    deck: global_deck,
    balance: global_wallet,
  };
  return payload;
};

const getWinner = (dealer, player) => {
  if (dealer.count > player.count) {
    return "dealer";
  } else if (dealer.count < player.count) {
    return "player";
  } else {
    return "push";
  }
};

const dealerDraw = (dealer, deck) => {
  const { randomCard, updatedDeck } = getRandomCard(deck);
  dealer.cards.push(randomCard);
  dealer.count = getCount(dealer.cards);
  return { dealer, updatedDeck };
};

wss.on("connection", (ws) => {
  ws.on("open", () => console.log("opened")); // connection || wss
  ws.on("close", () => {
    // connection || wss
    console.log("closed");
  });

  ws.on("message", (message) => {
    if (JSON.parse(message).method === "start") {
      if (JSON.parse(message).bet > global_wallet) {
        game_state = "Need more balance";
      } else if (global_wallet == 0) {
        game_state = "You bust";
      } else {
        const deck = generateDeck();
        const { updatedDeck, player, dealer } = dealCards(deck);
        global_deck = updatedDeck;
        global_dealer = dealer;
        global_player = player;
        global_wallet = global_wallet - JSON.parse(message).bet;
        global_currentBet = JSON.parse(message).bet;
        global_gameOver = false;
      }
      var payLoad = {
        method: "connect",
        updatedDeck: global_deck,
        player: global_player,
        dealer: global_dealer,
        wallet: global_wallet,
      };
      ws.send(JSON.stringify(payLoad));
    }

    if (JSON.parse(message).method === "load_balance") {
      global_wallet = 5000;
      var payload = {
        method: "balance",
        balance: global_wallet,
      };
      ws.send(JSON.stringify(payload));
    }
    if (JSON.parse(message).method === "sgn_stand") {
      const payload = stand();
      ws.send(JSON.stringify(payload));
    }
    if (JSON.parse(message).method === "sgn_hit") {
      const loaddata = hit();
      var payload = {
        comment: loaddata.comment,
        method: "hit",
        player: loaddata.player,
        balance: loaddata.balance,
      };
      ws.send(JSON.stringify(payload));
    }
    if (JSON.parse(message).method === "sgn_double") {
      global_currentBet = JSON.parse(message).bet;
      global_wallet = global_wallet - global_currentBet;
      const loaddata = hit();
      var payload = {
        comment: loaddata.comment,
        method: "hit",
        player: loaddata.player,
        balance: global_wallet,
      };
      ws.send(JSON.stringify(payload));
    }
  });
});
