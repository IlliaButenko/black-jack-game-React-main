import React, { useEffect, useState } from "react";

import img 	from "../assets/card_puple.png";
import logo from "../assets/img/logo.png";

import blue_button  	from "../assets/blue.png";
import orange_button  from "../assets/orange.png";
import red_button  	from "../assets/red.png";
import black_button  	from "../assets/black.png";
import purple_button  from "../assets/purple.png";
import green_button  	from "../assets/green.png";
import black_button1  from "../assets/black_1.png";
import green_button1  from "../assets/green_1.png";
import purple_button1 from "../assets/purple_1.png";

import ready_blue_button  	from "../assets/ready_blue.png";
import ready_orange_button  from "../assets/ready_orange.png";
import ready_red_button  	from "../assets/ready_red.png";
import ready_black_button  	from "../assets/ready_black.png";
import ready_purple_button  from "../assets/ready_purple.png";
import ready_green_button  	from "../assets/ready_green.png";
import ready_black_button1  from "../assets/ready_black_1.png";
import ready_green_button1  from "../assets/ready_green_1.png";
import ready_purple_button1 from "../assets/ready_purple_1.png";
import clean_animate from "../assets/clean_animate.png";
import max_animate from "../assets/max_animate.svg";
import leave_animate from "../assets/leave_animate.png";

import club_A from "../assets/card/club_A.png";
import club_2 from "../assets/card/club_2.png";
import club_3 from "../assets/card/club_3.png";
import club_4 from "../assets/card/club_4.png";
import club_5 from "../assets/card/club_5.png";
import club_6 from "../assets/card/club_6.png";
import club_7 from "../assets/card/club_7.png";
import club_8 from "../assets/card/club_8.png";
import club_9 from "../assets/card/club_9.png";
import club_10 from "../assets/card/club_10.png";
import club_J from "../assets/card/club_J.png";
import club_Q from "../assets/card/club_Q.png";
import club_K from "../assets/card/club_K.png";
import diamond_2 from "../assets/card/diamond_2.png";
import diamond_3 from "../assets/card/diamond_3.png";
import diamond_4 from "../assets/card/diamond_4.png";
import diamond_5 from "../assets/card/diamond_5.png";
import diamond_6 from "../assets/card/diamond_6.png";
import diamond_7 from "../assets/card/diamond_7.png";
import diamond_8 from "../assets/card/diamond_8.png";
import diamond_9 from "../assets/card/diamond_9.png";
import diamond_10 from "../assets/card/diamond_10.png";
import diamond_A from "../assets/card/diamond_A.png";
import diamond_J from "../assets/card/diamond_J.png";
import diamond_Q from "../assets/card/diamond_Q.png";
import diamond_K from "../assets/card/diamond_K.png";
import heart_2 from "../assets/card/heart_2.png";
import heart_3 from "../assets/card/heart_3.png";
import heart_4 from "../assets/card/heart_4.png";
import heart_5 from "../assets/card/heart_5.png";
import heart_6 from "../assets/card/heart_6.png";
import heart_7 from "../assets/card/heart_7.png";
import heart_8 from "../assets/card/heart_8.png";
import heart_9 from "../assets/card/heart_9.png";
import heart_10 from "../assets/card/heart_10.png";
import heart_A from "../assets/card/heart_A.png";
import heart_J from "../assets/card/heart_J.png";
import heart_Q from "../assets/card/heart_Q.png";
import heart_K from "../assets/card/heart_K.png";
import spades_2 from "../assets/card/spades_2.png";
import spades_3 from "../assets/card/spades_3.png";
import spades_4 from "../assets/card/spades_4.png";
import spades_5 from "../assets/card/spades_5.png";
import spades_6 from "../assets/card/spades_6.png";
import spades_7 from "../assets/card/spades_7.png";
import spades_8 from "../assets/card/spades_8.png";
import spades_9 from "../assets/card/spades_9.png";
import spades_10 from "../assets/card/spades_10.png";
import spades_A from "../assets/card/spades_A.png";
import spades_J from "../assets/card/spades_J.png";
import spades_Q from "../assets/card/spades_Q.png";
import spades_K from "../assets/card/spades_K.png";
import Card_back from "../assets/card/shift_black.png";
import Card_back2 from "../assets/card/shift_red.png";

const CardSet = {
  club_2: club_2,
  club_3: club_3,
  club_4: club_4,
  club_5: club_5,
  club_6: club_6,
  club_7: club_7,
  club_8: club_8,
  club_9: club_9,
  club_10: club_10,
  club_A: club_A,
  club_J: club_J,
  club_Q: club_Q,
  club_K: club_K,
  spades_2: spades_2,
  spades_3: spades_3,
  spades_4: spades_4,
  spades_5: spades_5,
  spades_6: spades_6,
  spades_7: spades_7,
  spades_8: spades_8,
  spades_9: spades_9,
  spades_10: spades_10,
  spades_A: spades_A,
  spades_J: spades_J,
  spades_Q: spades_Q,
  spades_K: spades_K,
  heart_2: heart_2,
  heart_3: heart_3,
  heart_4: heart_4,
  heart_5: heart_5,
  heart_6: heart_6,
  heart_7: heart_7,
  heart_8: heart_8,
  heart_9: heart_9,
  heart_10: heart_10,
  heart_A: heart_A,
  heart_J: heart_J,
  heart_Q: heart_Q,
  heart_K: heart_K,
  diamond_2: diamond_2,
  diamond_3: diamond_3,
  diamond_4: diamond_4,
  diamond_5: diamond_5,
  diamond_6: diamond_6,
  diamond_7: diamond_7,
  diamond_8: diamond_8,
  diamond_9: diamond_9,
  diamond_10: diamond_10,
  diamond_J: diamond_J,
  diamond_Q: diamond_Q,
  diamond_K: diamond_K,
  diamond_A: diamond_A,
  NaN: Card_back,
  NaN2: Card_back2,
};

var ws = new WebSocket("ws://localhost:4000/");

function Main() {
	const  [balance, setBalance] = useState(0);
	const  [bet, setBet] = useState(0);
	const [stone_disable_state, setDisable_stone] = useState(true);
	const [string_playercard, setplayerCardstring] = useState([]);
	const [string_dealercard, setdealerCardstring] = useState([]);

	const bet_stone = [
		{text: '10', 	src: ready_blue_button, 	color:"#1e8283", 	bet: 10},
		{text: '50', 	src: ready_orange_button, 	color:"#f7911a", 	bet: 50},	
		{text: '100',	src: ready_red_button, 		color:"#de0113", 	bet: 100},
		{text: '500',	src: ready_black_button, 	color:"#1d1c1c", 	bet: 500},
		{text: '1k', 	src: ready_purple_button, 	color:"#df0148", 	bet: 1000},
		{text: '5k', 	src: ready_green_button, 	color:"#7c9805", 	bet: 5000},
		{text: '10k',	src: ready_black_button1, 	color:"#1c1b1c", 	bet: 10000},
		{text: '50k',	src: ready_green_button1, 	color:"#7c9805", 	bet: 500000},
		{text: '100k',  src: ready_purple_button1, 	color:"#df0148", 	bet: 1000000}
	]

	const [show_stone, setStone] = useState();

	const [stone_color, setStonecolor] = useState("");

	useEffect(() => {
		setTimeout(() => {
		  load_balance();
		}, 1000);
	  }, []);

	const load_balance = (e) => {
		var payLoad = {
			method: "load_balance",
		};
		ws.send(JSON.stringify(payLoad));
		setDisable_stone(false);
	};

	const handleClick = () => {
		document.querySelector(".Dcision_stand").style.display = "flex";
		document.querySelector(".Dcision_hit").style.display = "flex";
		document.querySelector(".Dcision_double").style.display = "flex";
    if (bet === 0) {
      alert("Please Bet!!!");
    } else {
      var payLoad = {
        method: "start",
        bet: bet,
      };
      ws.send(JSON.stringify(payLoad));
       if (bet >= 10 && bet < 50)
			setStone(blue_button);
			setStonecolor("#1e8283");
       if (bet >= 50 && bet < 100)
			setStone(orange_button);
			setStonecolor("#f7911a");

       if (bet >= 100 && bet < 500)
			setStone(red_button);
			setStonecolor("#de0113");

       if (bet >= 500 && bet < 1000)
			setStone(black_button);
			setStonecolor("#1d1c1c");

       if (bet >= 1000 && bet < 5000)
			setStone(purple_button);
			setStonecolor("#df0148");

       if (bet >= 5000 && bet < 10000)
			setStone(green_button);
			setStonecolor("#7c9805");

       if (bet >= 10000 && bet < 50000)
			setStone(black_button1);
			setStonecolor("#1c1b1c");

       if (bet >= 50000 && bet < 1000000)
			setStone(green_button1);
			setStonecolor("#7c9805");

       if (bet >= 100000)
			setStone(purple_button1);
			setStonecolor("#df0148");
		setDisable_stone(true);
    }
  };

	const func_balance = (val) => {
		if (val === "clean") {
			setBet(0);
		} else if (val === "max") {
			setBet(balance);
		} else {
			if (balance >= (Number(bet) + Number(val))) setBet(Number(bet) + Number(val));
			else {
			alert("Need more balance");
			}
		}
	};

	const restore_end = (comment) => {
		if (comment != 1) {
		  setTimeout(() => {
			setplayerCardstring([]);
			setdealerCardstring([]);
			setBet(0);
			setStone("");
			document.querySelector(".Dcision_stand").style.display = "none";
			document.querySelector(".Dcision_hit").style.display = "none";
			document.querySelector(".Dcision_double").style.display = "none";
		  }, 4000);
		}
		setDisable_stone(false);
		alert(comment);
	  };

	const stand_signal = () => {
		var payLoad = {
		  method: "sgn_stand",	
		};	
		ws.send(JSON.stringify(payLoad));
	  };
	
	  const hit_signal = () => {
		var payLoad = {
		  method: "sgn_hit",
		};
	
		ws.send(JSON.stringify(payLoad));
	  };
	
	  const double_signal = () => {
		var double_bet = bet*2;
		setBet(double_bet);
		var payLoad = {
		  method: "sgn_double",
		  bet:double_bet
		};
		ws.send(JSON.stringify(payLoad));
	  }
	  
	var strplayer_card = [];
	var strdealer_card = [];

	ws.onmessage = function (message) {
		var response = JSON.parse(message.data);
		if (response.method === "balance") {
			setBalance(response.balance);
		}

		if (response.method === "connect") {
			console.log(response);
			for (var i in response.player.cards) {
			  strplayer_card.push(
				response.player.cards[i].suit + response.player.cards[i].number
			  );
			}
			for (var i in response.dealer.cards) {
			  strdealer_card.push(
				response.dealer.cards[i].suit + response.dealer.cards[i].number
			  );
			}
			setplayerCardstring(strplayer_card);
			setdealerCardstring(strdealer_card);
			setBalance(response.wallet);
		}

		if (response.method === "stand") {
			for (var i in response.dealer.cards)
			  strdealer_card.push(
				response.dealer.cards[i].suit + response.dealer.cards[i].number
			  );
			setBalance(response.balance);
			setdealerCardstring(strdealer_card);
			restore_end(response.comment);
		}

		if (response.method === "hit") {
			setBalance(response.balance);
			// alert(response.balance);

			for (var i in response.player.cards) {
			  strplayer_card.push(
				response.player.cards[i].suit + response.player.cards[i].number
			  );
			}
			setplayerCardstring(strplayer_card);
			restore_end(response.comment);
		  }


	}

	return (
		<div className="main">
			<div className="header">
				<img src={logo}></img>
				<div></div>
			</div>
			<div className="content">
				<div className="left"><a>Exit Room</a></div>
				<div className="middle">
					<div className="show_card">
						<div className="player1_card">
						{string_playercard.map((card, index) => (
							<img
							key={index}
							style={{
								padding: "10px",
								width: "120px",
								height: "100%",
							}}
							src={CardSet[string_playercard[index]]}
							alt={card}
							/>
						))}					
						</div>
						<div className="player2_card">
						{string_dealercard.map((card, index) => (
							<img
							key={index}
							style={{
								padding: "10px",
								width: "120px",
								height: "100%",
							}}
							src={CardSet[string_dealercard[index]]}
							/>
						))}							
						</div>
					</div>
					<div className="show_condition">
						<div className="state_stone">
							<div className="bet_data">
								<p className="bet_state">{balance}</p>
								<p className="balance_state">{bet}</p>
							</div>
							<div className="stone_data">
								<p>Place your bet:</p>
								<p className="result_stone">
									{show_stone ? <div style={{width:"100px",height:"100px", fontSize:"20px", paddingTop:"30px", borderRadius:"100px", backgroundImage:"url('"+`${show_stone}`+"')", color:`${stone_color}`}} src={show_stone}>{bet}</div> : <div style={{width:"100px",height:"100px"}}></div>}
								</p>
							</div>
							<div className="role_dicision" >
								<button className="Dcision_stand" 
									style={{display:"none"}}
									onClick={() => {
										stand_signal();
								}}>
									STAND
								</button>
								<button className="Dcision_hit"
									style={{display:"none"}}
									onClick={() => {
										hit_signal();
									}}>HIT</button>
								<button className="Dcision_double"
									style={{display:"none"}}
									onClick={() => {
										double_signal();
									}}>DOUBLE</button>
							</div>
						</div>
						<div className="prepare_stone">
							<div className="stone_top">
								<div className="bet_stone">
									<button className="clean" onClick={() => func_balance('clean')} value="clean" disabled={stone_disable_state}>
										<span>CLEAN</span>
										<img style={{width:"50px", height:"50px"}} src={clean_animate}/>
									</button>
									{
										bet_stone.map((v, k) => (
											<button
												disabled = {stone_disable_state}
												onClick={() => func_balance(v.bet)}
												key={k} 
												className={"chip"+v.text} 
												style={{backgroundImage:"url('"+`${v.src}`+"')", color:`${v.color}`}}
											>
												<strong>{v.text}</strong>
											</button>))
									}
									<button className="max" onClick={() => func_balance('max')} value="max" disabled={stone_disable_state}>
										<span>MAX</span>
										<img style={{width:"50px", height:"50px"}} src={max_animate}/>
									</button>
								</div>
							</div>
							<div className="stone_down">
								<div className="space"></div>
								<div className="beal_button"><button className="deal" disabled={stone_disable_state} onClick={handleClick}>DEAL</button></div>
								<div className="space"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="right">
					<div className="dealer_img"><p>Dealer</p></div>	
					<div className="leave_button"><div></div><div className="_leave"><img style={{width:"80px", height:"80px"}} src={leave_animate}></img><p className="text_lavel">Leave!</p></div></div>
				</div>
			</div>
		</div>
	);
}

export default Main;
