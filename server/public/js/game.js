// class titleScreen extends Phaser.Scene {
//   constructor() {
//     super("titleScreen");
//   }
//   create() {
//     this.add.text(20, 20, "Loading game...");
//     //this.scene.start("playGame");
//   }
// }

// function preload() {
//   this.load.image('ship', 'assets/spaceShips_001.png');
//   this.load.image('sydney2', 'assets/sydney2.png');
//   this.load.image('sydney3', 'assets/sydney3.png');
//   this.load.image('sydney4', 'assets/sydney4.png');
//   this.load.image('sydney5', 'assets/sydney5.png');
//   this.load.image('otherPlayer', 'assets/enemyBlack5.png');
//   this.load.image('adam2', 'assets/adam2.png');
//   this.load.image('adam3', 'assets/adam3.png');
//   this.load.image('adam4', 'assets/adam4.png');
//   this.load.image('adam5', 'assets/adam5.png');
//   this.load.image('star', 'assets/star_gold.png');
// }

// let answerAcounter = 0;
// let answerBcounter = 0;

// let answerAcheck = false;
// let answerBcheck = false;

// function create() {
//   var self = this;
//   this.socket = io();
//   this.players = this.add.group();

//   this.renderZone = () => {
//     let dropZone = this.add.zone(340, 375, 300, 250).setRectangleDropZone(900/6, 230);
//     dropZone.setData({ cards: 0, zoneCheckA: 0 });
//     //dropZone.setName("A");
//     return dropZone;
//   };

//   this.renderZone2 = () => {
//     let dropZone2 = this.add.zone(1040, 375, 900/6, 250).setRectangleDropZone(900/6, 230);
//     dropZone2.setData({ cards: 0, zoneCheckB: 0 });
//     //dropZone2.setName("B")
//     return dropZone2;
//   };
  
//   // let answerC = this.add.zone(800, 375, 900, 250).setRectangleDropZone(900/6, 230);
//   // let answerCOutline = this.add.graphics();
//   // answerCOutline.lineStyle(4, 0xff69b4);
//   // answerCOutline.strokeRect(answerC.x - answerC.input.hitArea.width / 2, answerC.y - answerC.input.hitArea.height / 2, answerC.input.hitArea.width, answerC.input.hitArea.height)
//   // let answerD = this.add.zone(1060, 375, 900, 250).setRectangleDropZone(900/6, 230);
//   // let answerDOutline = this.add.graphics();
//   // answerDOutline.lineStyle(4, 0xff69b4);
//   // answerDOutline.strokeRect(answerD.x - answerD.input.hitArea.width / 2, answerD.y - answerD.input.hitArea.height / 2, answerD.input.hitArea.width, answerD.input.hitArea.height)

   
//   // this.renderOutlineA = (answerA) => {
//   //   let answerAOutline = this.add.graphics();
//   //   answerAOutline.lineStyle(4, 0xff69b4);
//   //   answerAOutline.strokeRect(answerA.x - answerA.input.hitArea.width / 2, answerA.y - answerA.input.hitArea.height / 2, answerA.input.hitArea.width, answerA.input.hitArea.height)
//   // };

//   this.renderOutline = (dropZone) => {
//     let dropZoneOutline = this.add.graphics();
//     dropZoneOutline.lineStyle(4, 0xff69b4);
//     dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height)
//   };

//   this.renderOutline2 = (dropZone2) => {
//     let dropZoneOutline2 = this.add.graphics();
//     dropZoneOutline2.lineStyle(4, 0xff69b4);
//     dropZoneOutline2.strokeRect(dropZone2.x - dropZone2.input.hitArea.width / 2, dropZone2.y - dropZone2.input.hitArea.height / 2, dropZone2.input.hitArea.width, dropZone2.input.hitArea.height)
//   };

//   this.isPlayerA = false;
//   this.opponentCards = [];

//   //this.zone = new Zone(this);
//   this.dropZone = this.renderZone();
//   // this.answerA = this.renderA();
//   this.dropZone2 = this.renderZone2();

//   // this.renderOutlineA = this.renderOutlineA(this.answerA);

//   this.outline1 = this.renderOutline(this.dropZone);
//   this.outline2 = this.renderOutline2(this.dropZone2);

//   //this.dealer = new Dealer(this);

//   this.blueScoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#0000FF' });
//   this.redScoreText = this.add.text(1050, 16, '', { fontSize: '32px', fill: '#FF0000' });

//   let questions = [
    
//     {
//       question: 'What year did world war 2 ended?',
//       A: 'A. 1957',
//       B: 'B. 1945'
//     },
//     {
//       question: 'Which of the following is a noble gas?',
//       A: 'A. Nitrogen',
//       B: 'B. Helium'
//     },
//     {
//       question: 'What unit is smaller then giga?',
//       A: 'A. Tera',
//       B: 'B. Kilo'
//     },
//     {
//       question: 'Which chromosomes pairing are for male?',
//       A: 'A. X, Y',
//       B: 'B. X, X'
//     },
//     {
//       question: '20% of 2 is equal to?',
//       A: 'A. 0.4',
//       B: 'B. 0.2'
//     }
      
//   ];

//   let questionList = [questions[0].question, questions[1].question, questions[2].question, questions[3].question, questions[4].question];


//   // let Q1 = ['What year did world war 2 ended?', 'A. 1957', 'B. 1945'];
//   // let Q2 = ['Which of the following is a noble gas?', 'A. Nitrogen', 'B. Helium'];
//   // let Q3 = ['What unit is smaller then giga?', 'A. Tera', 'B. Kilo'];
//   // let Q4 = ['Which chromosomes pairing are for male?', 'A. X, Y', 'B. X, X'];
//   // let Q5 = ['20% of 2 is equal to?', 'A. 0.4', 'B. 0.2'];

//   let answerA = [questions[0].A, questions[1].A, questions[2].A, questions[3].A, questions[4].A];
//   let answerB = [questions[0].B, questions[1].B, questions[2].B, questions[3].B, questions[4].B];


//   this.renderQ = (x, y, questionList) => {
//     let q = self.add.text(x, y, [questionList]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
//     return q;
//   };

//   this.renderAB = (x1, y1, x2, y2, answerA, answerB) => {
//     let a = self.add.text(x1, y1, answerA).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
//     let b = self.add.text(x2, y2, answerB).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
//     return a, b;
//   };

//   //this.card = this.renderCard();

//   this.renderCard = (x, y, sprite) => {
//     let card = self.add.image(x, y, sprite).setScale(0.3, 0.3).setInteractive();
//     self.input.setDraggable(card);
//     return card;
//   };

//   let playerCardImage = [['ship','otherPlayer','sydney2','adam2', 'sydney3' , 'adam3'], ['sydney4', 'adam4','sydney5', 'adam5']];

//   this.dealCards = () => {
//     let playerSprite;
//     let opponentSprite;
//     if (self.isPlayerA) {
//         playerSprite = ['ship', 'sydney2', 'sydney3' , 'sydney4', 'sydney5'];
//         opponentSprite = ['otherPlayer', 'adam2', 'adam3', 'adam4', 'adam5'];
//     } else {
//         playerSprite = ['otherPlayer', 'adam2', 'adam3', 'adam4', 'adam5'];
//         opponentSprite = ['ship', 'sydney2', 'sydney3' , 'sydney4', 'sydney5'];
//     };
//     for (let i = 0; i < 5; i++) {
//       playerCard = self.renderCard(475 + (i * 100), 500, Phaser.Math.RND.pick(playerSprite));
//       //playerCardImage = [playerCard.texture.key];
//       let opponentCard = self.renderCard(475 + (i * 100), 125, Phaser.Math.RND.pick(opponentSprite)).disableInteractive();
//       self.opponentCards.push(opponentCard);
//       //self.opponentCards.push(opponentCard.renderCard(475 + (i * 100), 125, opponentSprite).disableInteractive());
//       }

//     let renderQuestions = self.renderQ(500, 250, Phaser.Math.RND.pick(questionList));
//     let indexCheck = questionList.indexOf(renderQuestions.text);
//     if (indexCheck <= 2){
//       answerBcheck = true;
//     }

//     if (indexCheck > 2){
//       answerAcheck = true;
//     }

//     console.log(answerBcheck);
    

//     for (let i = 0; i < questions.length; i++) {

//       if (renderQuestions.text == questions[i].question ) {
//       let renderAnswers = self.renderAB(450, 325, 850, 325, [questions[i].A], [questions[i].B]);
//       }

//     }
//   }
//       //let self = this;

//       //this.socket = io('http://localhost:3000');

//     this.socket.on('connect', function () {
//         console.log('Connected!');
//     });

//     this.socket.on('isPlayerA', function () {
//         self.isPlayerA = true;
//     })

//     this.socket.on('dealCards', function () {
//         self.dealCards();
//         self.dealText.disableInteractive();
//     })

//     this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
//         if (isPlayerA !== self.isPlayerA) {
//           console.log ('im playerB')
//           let sprite = gameObject.textureKey;
//           self.opponentCards.shift().destroy();
//           self.dropZone.data.values.cards++;
//           self.renderCard(((self.dropZone.x - 400) + (self.dropZone.data.values.cards * 25)), (self.dropZone.y + 125), sprite).disableInteractive();
//         }
//     })

//     this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

//     this.dealText.on('pointerdown', function () {
//         self.socket.emit("dealCards");
//     })

//     this.dealText.on('pointerover', function () {
//         self.dealText.setColor('#ff69b4');
//     })

//     this.dealText.on('pointerout', function () {
//         self.dealText.setColor('#00ffff');
//     })

//     this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
//         gameObject.x = dragX;
//         gameObject.y = dragY;
//     })

//     this.input.on('dragstart', function (pointer, gameObject) {
//         gameObject.setTint(0xff69b4);
//         self.children.bringToTop(gameObject);
//     })

//     this.input.on('dragend', function (pointer, gameObject, dropped) {
//         gameObject.setTint();
//         if (!dropped) {
//           gameObject.x = gameObject.input.dragStartX;
//           gameObject.y = gameObject.input.dragStartY;
//       }
      
//     })

//     this.input.on('drop', function (pointer, gameObject, dropZone) {

//       console.log(gameObject.texture.key);
//       dropZone.data.values.zoneCheckA++;
//       dropZone.data.values.cards++;      
//       gameObject.x = (dropZone.x - 10) + (dropZone.data.values.cards * 10);
//       gameObject.y = dropZone.y;           
//       gameObject.disableInteractive();

//       if ( dropZone.data.values.zoneCheckA +1 && answerAcheck == true){
//         if(playerCardImage[0].includes(gameObject.texture.key)){
//         answerAcounter=2
//         self.socket.emit('points', answerAcounter);
//         }else if (playerCardImage[1].includes(gameObject.texture.key)){
//         answerAcounter=1;
//         self.socket.emit('points', answerAcounter);
//         }
//         console.log('A working');
//       }
  
//       self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
 
//     })

//     this.socket.on('playerUpdates', function (players) {
//       Object.keys(players).forEach(function (id) {
//         self.players.getChildren().forEach(function (player) {
//           if (players[id].playerId === player.playerId) {
//             player.setRotation(players[id].rotation);
//             player.setPosition(players[id].x, players[id].y);
//           }
//         });
//       });
//     });

//     this.input.on('drop', function (pointer, gameObject, dropZone2, players) {

    
//       // self.players.getChildren().forEach((player) => {
//       //   player.x = dropZone2.x;
//       //   player.y = dropZone2.y;
//       // });
//       console.log(gameObject.texture.key);
//       dropZone2.data.values.zoneCheckB++;
//       dropZone2.data.values.cards++;
//       gameObject.x = (dropZone2.x - 10) + (dropZone2.data.values.cards * 10);
//       gameObject.y = dropZone2.y;
//       gameObject.disableInteractive();

//       if ( dropZone2.data.values.zoneCheckB +1 && answerBcheck == true ){
//         if(playerCardImage[0].includes(gameObject.texture.key)){
//           answerBcounter=2
//           self.socket.emit('points', answerBcounter);
//           }else if (playerCardImage[1].includes(gameObject.texture.key)){
//           answerBcounter=1
//           self.socket.emit('points', answerBcounter);
//           }
//           console.log('B working');
              
//       }
//       self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
//       return dropZone2
//       //console.log(answerBcounter);
 
//     })

//     this.socket.on('currentPlayers', function (players) {
//       Object.keys(players).forEach(function (id) {
//         if (players[id].playerId === self.socket.id) {
//           displayPlayers(self, players[id], 'ship');
//         } else {
//           displayPlayers(self, players[id], 'otherPlayer');
//         }
//       });
//     });

//     // this.socket.on('newPlayer', function (playerInfo) {
//     //   displayPlayers(self, playerInfo, 'otherPlayer');
//     // });

//     // this.socket.on('disconnect', function (playerId) {
//     //   self.players.getChildren().forEach(function (player) {
//     //     if (playerId === player.playerId) {
//     //       player.destroy();
//     //     }
//     //   });
//     // });


//     this.socket.on('updateScore', function (scores) {
//       self.blueScoreText.setText('CCS: ' + scores.blue);
//       self.redScoreText.setText('JOJO: ' + scores.red);
//     });

//     this.socket.on('starLocation', function (starLocation) {
//       if (!self.star) {
//         self.star = self.add.image(starLocation.x, starLocation.y, 'star');
//       } else {
//         self.star.setPosition(starLocation.x, starLocation.y);
//       }
//     });

//     this.cursors = this.input.keyboard.createCursorKeys();
//     this.leftKeyPressed = false;
//     this.rightKeyPressed = false;
//     this.upKeyPressed = false;
//     }

// //}

// function update() {
//   const left = this.leftKeyPressed;
//   const right = this.rightKeyPressed;
//   const up = this.upKeyPressed;

//   if (answerBcounter == 1 && answerBcheck == true || answerAcounter == 1 && answerAcheck == true  ) {
//     this.leftKeyPressed = true;

//   } 

//   // if (answerBcounter == 2 && answerBcheck == true) {
//   //   this.leftKeyPressed = true;
//   // } 
  
//   if (this.cursors.right.isDown ) {
//     this.rightKeyPressed = true;
//   } else if (answerBcounter !== 1){
//     this.leftKeyPressed = false;
//     this.rightKeyPressed = false;
//   }

//   if (this.cursors.up.isDown) {
//     this.upKeyPressed = true;
//   } else {
//     this.upKeyPressed = false;
//   }

//   if (left !== this.leftKeyPressed || right !== this.rightKeyPressed || up !== this.upKeyPressed) {
//     this.socket.emit('playerInput', { left: this.leftKeyPressed , right: this.rightKeyPressed, up: this.upKeyPressed });
//   }

//    // this.input.on('drag', function (pointer,  players, dragX, dragY) {
//   //   players[player.playerId].x = dragX;
//   //   players[player.playerId].y = dragY;
//   // })
// }

// function displayPlayers(self, playerInfo, sprite) {
//   const player = self.add.sprite(playerInfo.x, playerInfo.y, sprite).setOrigin(0.5, 0.5).setDisplaySize(400,100).setInteractive({ draggable: true });
//   // player.on('drag', function (pointer, dragX, dragY) {

//   //       player.x = dragX;
//   //       player.y = dragY;

//   //   });
    
//   if (playerInfo.team === 'blue') player.setTint(0x0000ff);
//   else player.setTint(0xff0000);
//   player.playerId = playerInfo.playerId;
//   self.players.add(player);
// }

import TitleScreen from './titleScreen.js';
import CharacterSelect from './characterSelect.js';
import SMKSonata from './smkSonata.js';

var titleScreen = new TitleScreen();
var characterSelect = new CharacterSelect();
var smkSonata = new SMKSonata();

var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1500,
  height: 700,
  scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
  // scene: {
  //   titleScreen: titleScreen
  //   // preload: preload,
  //   // create: create,
  //   // update: update
  // }
};

var game = new Phaser.Game(config);

game.scene.add('titleScreen', titleScreen);
game.scene.add('smkSonata', smkSonata);
game.scene.add('characterSelect', characterSelect);

game.scene.start('titleScreen');