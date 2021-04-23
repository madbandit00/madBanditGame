class SMKSonata extends Phaser.Scene {

    answerAcounter;
    answerBcounter;

    answerAcheck;
    answerBcheck;

    constructor() {
      super({key: 'smkSonata'});

    }

    init (data)
    {
      this.Socket = data;    
      console.log(this.Socket.id.toString());
      //this.scene.remove('roomScreen');      
    }

    preload() {
   
    this.load.image('ship', 'assets/spaceShips_001.png');
    this.load.image('sydney2', 'assets/sydney2.png');
    this.load.image('sydney3', 'assets/sydney3.png');
    this.load.image('sydney4', 'assets/sydney4.png');
    this.load.image('sydney5', 'assets/sydney5.png');
    this.load.image('otherPlayer', 'assets/enemyBlack5.png');
    this.load.image('adam2', 'assets/adam2.png');
    this.load.image('adam3', 'assets/adam3.png');
    this.load.image('adam4', 'assets/adam4.png');
    this.load.image('adam5', 'assets/adam5.png');
    this.load.image('Daniel1', 'assets/Daniel1.png');
    this.load.image('Daniel2', 'assets/Daniel2.png');
    this.load.image('Daniel3', 'assets/Daniel3.png');
    this.load.image('Daniel4', 'assets/Daniel4.png');
    this.load.image('Daniel5', 'assets/Daniel5.png');
    this.load.image('star', 'assets/star_gold.png');
    }

    create() {
        
    var self = this;
    this.socket = this.Socket;
    this.players = this.add.group();

    let cam = this.cameras.main;
    cam.alpha = 0.5;

    this.confirmedTextures = [];

    this.socket.on('connect', function () {
        console.log('Connected!');
    });

    //self.socket.emit('checkID', this.Socket.id.toString());

    self.socket.emit('playerAorNot');

    this.socket.on('isPlayerA', playerAorNot);

    function playerAorNot(yesOrno) {

        this.isPlayerA = false;
        self.isPlayerA  = yesOrno;
        console.log('player A: ' + self.isPlayerA);
        //return self.isPlayerA
        self.socket.emit('imPlayerA', self.isPlayerA);
      }
 
    //console.log('player A: ' + self.isPlayerA);

    // this.socket.on('isPlayerA', function () {
    //     self.isPlayerA = true;
    //     //self.isPlayerB = false;
    //     console.log('i am player A');
    // });

    self.socket.emit('whatTexture');

    this.socket.on('texturePicked', textureCheck);
    
    function textureCheck(ConfirmedTexture) {
    
        //confirmedTexture = ConfirmedTexture;
        //this.socket.off('texturePicked');
                    
        console.log(ConfirmedTexture + ' logTest');

        console.log(self.confirmedTextures);

        self.confirmedTextures.push(ConfirmedTexture);

        console.log(self.confirmedTextures);

    };
    

    this.answerAcounter = 0;
    this.answerBcounter = 0;

    this.answerAcheck = false;
    this.answerBcheck = false;

    this.renderZone = () => {
        let dropZone = this.add.zone(340, 375, 300, 250).setRectangleDropZone(900/6, 230);
        dropZone.setData({ cards: 0, zoneCheckA: 0 });
        //dropZone.setName("A");
        return dropZone;
    };

    this.renderZone2 = () => {
        let dropZone2 = this.add.zone(1040, 375, 900/6, 250).setRectangleDropZone(900/6, 230);
        dropZone2.setData({ cards: 0, zoneCheckB: 0 });
        //dropZone2.setName("B")
        return dropZone2;
    };
    
    // let answerC = this.add.zone(800, 375, 900, 250).setRectangleDropZone(900/6, 230);
    // let answerCOutline = this.add.graphics();
    // answerCOutline.lineStyle(4, 0xff69b4);
    // answerCOutline.strokeRect(answerC.x - answerC.input.hitArea.width / 2, answerC.y - answerC.input.hitArea.height / 2, answerC.input.hitArea.width, answerC.input.hitArea.height)
    // let answerD = this.add.zone(1060, 375, 900, 250).setRectangleDropZone(900/6, 230);
    // let answerDOutline = this.add.graphics();
    // answerDOutline.lineStyle(4, 0xff69b4);
    // answerDOutline.strokeRect(answerD.x - answerD.input.hitArea.width / 2, answerD.y - answerD.input.hitArea.height / 2, answerD.input.hitArea.width, answerD.input.hitArea.height)

    
    // this.renderOutlineA = (answerA) => {
    //   let answerAOutline = this.add.graphics();
    //   answerAOutline.lineStyle(4, 0xff69b4);
    //   answerAOutline.strokeRect(answerA.x - answerA.input.hitArea.width / 2, answerA.y - answerA.input.hitArea.height / 2, answerA.input.hitArea.width, answerA.input.hitArea.height)
    // };

    this.renderOutline = (dropZone) => {
        let dropZoneOutline = this.add.graphics();
        dropZoneOutline.lineStyle(4, 0xff69b4);
        dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height)
    };

    this.renderOutline2 = (dropZone2) => {
        let dropZoneOutline2 = this.add.graphics();
        dropZoneOutline2.lineStyle(4, 0xff69b4);
        dropZoneOutline2.strokeRect(dropZone2.x - dropZone2.input.hitArea.width / 2, dropZone2.y - dropZone2.input.hitArea.height / 2, dropZone2.input.hitArea.width, dropZone2.input.hitArea.height)
    };

    //this.isPlayerB = false;
    this.opponentCards = [];
    

    //this.zone = new Zone(this);
    this.dropZone = this.renderZone();

    this.dropZone.setName("dropZone1");
    // this.answerA = this.renderA();
    this.dropZone2 = this.renderZone2();

    this.dropZone2.setName("dropZone2");

    // this.renderOutlineA = this.renderOutlineA(this.answerA);

    this.outline1 = this.renderOutline(this.dropZone);
    this.outline2 = this.renderOutline2(this.dropZone2);

    //this.dealer = new Dealer(this);

    this.blueScoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#0000FF' });
    this.redScoreText = this.add.text(1050, 16, '', { fontSize: '32px', fill: '#FF0000' });

    let questions = [
        
        {
        question: 'What year did world war 2 ended?',
        A: 'A. 1957',
        B: 'B. 1945'
        },
        {
        question: 'Which of the following is a noble gas?',
        A: 'A. Nitrogen',
        B: 'B. Helium'
        },
        {
        question: 'What unit is smaller then giga?',
        A: 'A. Tera',
        B: 'B. Kilo'
        },
        {
        question: 'Which chromosomes pairing are for male?',
        A: 'A. X, Y',
        B: 'B. X, X'
        },
        {
        question: '20% of 2 is equal to?',
        A: 'A. 0.4',
        B: 'B. 0.2'
        }
        
    ];

    let questionList = [questions[0].question, questions[1].question, questions[2].question, questions[3].question, questions[4].question];


    // let Q1 = ['What year did world war 2 ended?', 'A. 1957', 'B. 1945'];
    // let Q2 = ['Which of the following is a noble gas?', 'A. Nitrogen', 'B. Helium'];
    // let Q3 = ['What unit is smaller then giga?', 'A. Tera', 'B. Kilo'];
    // let Q4 = ['Which chromosomes pairing are for male?', 'A. X, Y', 'B. X, X'];
    // let Q5 = ['20% of 2 is equal to?', 'A. 0.4', 'B. 0.2'];

    let answerA = [questions[0].A, questions[1].A, questions[2].A, questions[3].A, questions[4].A];
    let answerB = [questions[0].B, questions[1].B, questions[2].B, questions[3].B, questions[4].B];


    this.renderQ = (x, y, questionList) => {
        let q = self.add.text(x, y, [questionList]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
        return q;
    };

    this.renderAB = (x1, y1, x2, y2, answerA, answerB) => {
        let a = self.add.text(x1, y1, answerA).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
        let b = self.add.text(x2, y2, answerB).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
        
        return [a,b];
        
    };

    //this.card = this.renderCard();

    this.renderCard = (x, y, sprite) => {
        let card = self.add.image(x, y, sprite).setScale(0.3, 0.3).setInteractive();
        self.input.setDraggable(card);
        return card;
    };

    let playerCardImage = [['ship','otherPlayer', 'Daniel1', 'sydney2','adam2', 'Daniel2', 'sydney3' , 'adam3'], ['Daniel3', 'sydney4', 'adam4', 'Daniel4','sydney5', 'adam5', 'Daniel5']];


    //console.log(S0[1].sprites)

    //let confirmedTexture;

    let playerSprite;
    let playerSprite2;

    let playerSpriteA;

    let playerSpriteB;

    setTimeout(() => {

 
        let S0 = [
        
            {
            textureKey: 'Adam',
            sprites: ['otherPlayer', 'adam2', 'adam3', 'adam4', 'adam5'],
            },
            {
            textureKey: 'Sydney',
            sprites: ['ship', 'sydney2', 'sydney3' , 'sydney4', 'sydney5'],
            },
            {
            textureKey: 'Daniel',
            sprites: ['Daniel1', 'Daniel2', 'Daniel3' , 'Daniel4', 'Daniel5']
            }

        ]

        for (let i = 0; i < S0.length; i++) {


            if (self.confirmedTextures[0][0] == S0[i].textureKey) {
                playerSpriteA = S0[i].sprites;
                
            }

            if (self.confirmedTextures[0][1] == S0[i].textureKey) {
                playerSpriteB = S0[i].sprites;
                
            }

        }
        

        console.log(self.confirmedTextures[0][0].toString());

        //console.log(self.confirmedTextures[0][1].toString());

        cam.alpha = 1 ;

        this.dealText.setInteractive();

        this.scene.remove('roomScreen');

    
    }, 9000);
      

    this.dealCards = () => {
        //console.log (self.confirmTexture);

        console.log('player A: ' + self.isPlayerA);
        
        setTimeout(() => {
            if (self.isPlayerA) {

                playerSprite = playerSpriteA;
                playerSprite2 = Phaser.Math.RND.pick([S1],[S2],[S3]);
                

            }else {
                    playerSprite = playerSpriteB;
                    playerSprite2 = playerSpriteA;
                };

            console.log(playerSprite);
            console.log(playerSprite2);

        
            for (let i = 0; i < 5; i++) {
                let playerCard = self.renderCard(475 + (i * 100), 500, Phaser.Math.RND.pick(playerSprite||playerSprite2 ));
                //playerCardImage = [playerCard.texture.key];
                //let opponentCard = self.renderCard(475 + (i * 100), 125, Phaser.Math.RND.pick(playerSprite2)).disableInteractive();
                //self.opponentCards.push(opponentCard);
                self.opponentCards.push(self.renderCard(475 + (i * 100), 125, Phaser.Math.RND.pick(playerSprite2)).disableInteractive());
                }
        }, 2000);
 

        // let player1;
        // let player2;
    
        
        //let opponentSprite;
        //let opponentSprite2;

        let S1 = ['otherPlayer', 'adam2', 'adam3', 'adam4', 'adam5'];
        let S2 = ['ship', 'sydney2', 'sydney3' , 'sydney4', 'sydney5'];
        let S3 = ['Daniel1', 'Daniel2', 'Daniel3' , 'Daniel4', 'Daniel5'];

        // for (let i = 0; i < S0.length; i++) {

        //     if (self.confirmedTextures[0][0].toString() == S0[i].textureKey ) {
        //         player1 = S0[i].sprites;
                
        //     }
        // }

        // for (let i = 0; i < S0.length; i++) {

        //     if (self.confirmedTextures[0][1].toString() == S0[i].textureKey ) {
        //         player2 = S0[i].sprites;
                
        //     }

        // 


        // }

        //  if (self.isPlayerB) {
        //     switch(confirmedTexture[1]) {
        //         case 'Adam':

        //             playerSprite2 = S1;
        //             //opponentSprite2 = playerSprite;
                    
        //             break;
        //         case 'Sydney':

        //             playerSprite2 = S2;
        //             //opponentSprite2 = playerSprite;
                        
        //             break;

        //         case 'Daniel':

        //             playerSprite2 = S3;
        //             //opponentSprite2 = playerSprite;
                            
        //             break;

        //     }


        //  }else {
        //        playerSprite = S2;
        //        playerSprite2 = S2;
        //     };
         
        // if (self.isPlayerA && self.confirmTexture === 'Adam') {
        //     playerSprite = S1;
        //     opponentSprite = ['otherPlayer', 'adam2', 'adam3', 'adam4', 'adam5'];
        // } else if (self.isPlayerA  && self.confirmTexture == 'Sydney') {
        //     playerSprite = S2;
        //     opponentSprite = ['otherPlayer', 'adam2', 'adam3', 'adam4', 'adam5'];
        // }else if ( self.isPlayerA && self.confirmTexture === 'Daniel') {
        //     playerSprite = S3;
        //     opponentSprite = ['otherPlayer', 'adam2', 'adam3', 'adam4', 'adam5'];
        // }
        
        // else {
        //     playerSprite = ['otherPlayer', 'adam2', 'adam3', 'adam4', 'adam5'];
        //     opponentSprite = ['ship', 'sydney2', 'sydney3' , 'sydney4', 'sydney5'];
        // };     

        // if (self.isPlayerB){
        //     for (let i = 0; i < 5; i++) {
        //     let playerCard = self.renderCard(475 + (i * 100), 500, Phaser.Math.RND.pick(playerSprite2));
        //     //playerCardImage = [playerCard.texture.key];
        //     let opponentCard2 = self.renderCard(475 + (i * 100), 125, Phaser.Math.RND.pick(playerSprite)).disableInteractive();
        //     self.opponentCards.push(opponentCard2);
        //     //self.opponentCards.push(opponentCard.renderCard(475 + (i * 100), 125, opponentSprite).disableInteractive());
        //     }
        // }

        let renderQuestions = self.renderQ(500, 250, Phaser.Math.RND.pick(questionList));
        let indexCheck = questionList.indexOf(renderQuestions.text);
        if (indexCheck <= 2){
        this.answerBcheck = true;
        }

        if (indexCheck > 2){
        this.answerAcheck = true;
        }

        //console.log(this.answerBcheck);
        

        for (let i = 0; i < questions.length; i++) {

        if (renderQuestions.text == questions[i].question ) {
        let renderAnswers = self.renderAB(450, 325, 850, 325, [questions[i].A], [questions[i].B]);

        this.renderAnswers = renderAnswers;
        }

        }

        this.socket.off('dealCards');
        this.renderQuestions = renderQuestions;

        
    }
        //let self = this;

        //this.socket = io('http://localhost:3000');

        // this.socket.on('isPlayerB', function () {
        //     self.isPlayerB = true;
        //     //self.isPlayerA = false;
        //     console.log('i am player B')
        // })

        let pointerOffColor;

        this.socket.on('dealCards', function () {
            self.dealText.setColor('#FFFFFF');

            pointerOffColor = 'white';

            self.dealCards();
            self.dealText.disableInteractive();         
        })

        this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
            if (isPlayerA !== self.isPlayerA) {
            console.log ('im playerB');
            let sprite = gameObject.textureKey;
            self.opponentCards.shift().destroy();
            //self.dropZone.data.values.cards++;
            //console.log(self.dropZone.data.values.cards);
            //let droppedCard = self.renderCard(((self.dropZone.x - 400) + (self.dropZone.data.values.cards * 25)), (self.dropZone.y + 125), sprite).disableInteractive();
            
            // if (self.dropZone.data.values.cards > 4){
            //     droppedCard.destroy();

            // }
        
            }
        })

        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');

        this.dealText.on('pointerdown', function () {
            self.socket.emit("dealCards");
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {

            if (pointerOffColor == 'white'){

                self.dealText.setColor('#FFFFFF');
                
            }

            else {
                
                self.dealText.setColor('#00ffff');
        
            }
            
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
        
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {

        console.log(self.dropZone.data.values.cards + self.dropZone2.data.values.cards);

        //console.log(gameObject.texture.key);
        if (dropZone.name == "dropZone1") {
            // stuff
        
        dropZone.data.values.zoneCheckA++;
        dropZone.data.values.cards++;  
        //console.log(dropZone.data.values.cards)
        gameObject.x = (dropZone.x - 10) + (dropZone.data.values.cards * 10);
        gameObject.y = dropZone.y;           
        gameObject.disableInteractive();
        //gameObject.destroy();

        self.socket.emit('cardPlayed', gameObject, self.isPlayerA);


        }


        if ( dropZone.data.values.zoneCheckA +1 && self.answerAcheck == true){
            if(playerCardImage[0].includes(gameObject.texture.key)){
            self.answerAcounter=2
            self.socket.emit('points', self.answerAcounter);
            }else if (playerCardImage[1].includes(gameObject.texture.key)){
            self.answerAcounter=1;
            self.socket.emit('points', self.answerAcounter);
            }
            console.log('A working');

            
        }

        if (self.dropZone.data.values.cards + self.dropZone2.data.values.cards == 5){

            self.renderQuestions.destroy();
            self.renderAnswers[0].destroy();
            self.renderAnswers[1].destroy();
            //self.dealText.setInteractive();
            //self.dealText.setColor('#00ffff');
            self.dropZone.data.values.cards = 0;
            self.dropZone2.data.values.cards = 0;
            self.dealCards();

            }
    
        })

        this.socket.on('playerUpdates', function (players) {
        Object.keys(players).forEach(function (id) {
            self.players.getChildren().forEach(function (player) {
            if (players[id].playerId === player.playerId) {
                player.setRotation(players[id].rotation);
                player.setPosition(players[id].x, players[id].y);
            }
            });
        });
        });

        this.input.on('drop', function (pointer, gameObject, dropZone2) {

        
        // self.players.getChildren().forEach((player) => {
        //   player.x = dropZone2.x;
        //   player.y = dropZone2.y;
        // });
        //console.log(gameObject.texture.key);

        console.log(self.dropZone.data.values.cards + self.dropZone2.data.values.cards);

        if (dropZone2.name == "dropZone2") {

        dropZone2.data.values.zoneCheckB++;
        dropZone2.data.values.cards++;
        gameObject.x = (dropZone2.x - 10) + (dropZone2.data.values.cards * 10);
        gameObject.y = dropZone2.y;
        gameObject.disableInteractive();
        //gameObject.destroy();

        self.socket.emit('cardPlayed', gameObject, self.isPlayerA);

        }


        
        if ( dropZone2.data.values.zoneCheckB +1 && self.answerBcheck == true ){
            if(playerCardImage[0].includes(gameObject.texture.key)){
            self.answerBcounter=2
            //console.log(self.answerBcounter);
            self.socket.emit('points', self.answerBcounter);
            }else if (playerCardImage[1].includes(gameObject.texture.key)){
            self.answerBcounter=1
            //console.log(self.answerBcounter);
            self.socket.emit('points', self.answerBcounter);
            }
            console.log('B working');
                
        }

        if (self.dropZone.data.values.cards + self.dropZone2.data.values.cards == 5){

            self.renderQuestions.destroy();
            self.renderAnswers[0].destroy();
            self.renderAnswers[1].destroy();
            //self.dealText.setInteractive();
            //self.dealText.setColor('#00ffff');
            self.dropZone.data.values.cards = 0;
            self.dropZone2.data.values.cards = 0;
            self.dealCards();

           

        }

        console.log("cards dropped" + (self.dropZone.data.values.cards + self.dropZone2.data.values.cards))
        
        return dropZone2
        //console.log(answerBcounter);
    
        })


        this.socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {
            if (players[id].playerId === self.socket.id) {
            self.displayPlayers(self, players[id], 'ship');
            } else {
            self.displayPlayers(self, players[id], 'otherPlayer');
            }
        });
        });

        // this.socket.on('newPlayer', function (playerInfo) {
        //   displayPlayers(self, playerInfo, 'otherPlayer');
        // });

        // this.socket.on('disconnect', function (playerId) {
        //   self.players.getChildren().forEach(function (player) {
        //     if (playerId === player.playerId) {
        //       player.destroy();
        //     }
        //   });
        // });

        this.socket.on('updateScore', function (scores) {
        self.blueScoreText.setText('CCS: ' + scores.blue);
        self.redScoreText.setText('JOJO: ' + scores.red);

        if (scores.blue > 29){
            console.log ('CCS wins')
            //this.scene.start("characterSelect", Socket);
            self.scene.remove('smkSonata');
            self.scene.start("winnerScreen");
            
        }

        if (scores.red > 29){
            console.log ('JOJO wins')
            self.scene.remove('smkSonata');
            self.scene.start("winnerScreen2");

        }
        });


        this.socket.on('starLocation', function (starLocation) {
        if (!self.star) {
            self.star = self.add.image(starLocation.x, starLocation.y, 'star');
        } else {
            self.star.setPosition(starLocation.x, starLocation.y);
        }
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.leftKeyPressed = false;
        this.rightKeyPressed = false;
        this.upKeyPressed = false;
        }

    //}

    update() {

        
    const left = this.leftKeyPressed;
    const right = this.rightKeyPressed;
    const up = this.upKeyPressed;

    if (this.answerBcounter == 1 && this.answerBcheck == true || this.answerAcounter == 1 && this.answerAcheck == true  ) {
        this.leftKeyPressed = true;

    } 

    // if (answerBcounter == 2 && answerBcheck == true) {
    //   this.leftKeyPressed = true;
    // } 
    
    if (this.cursors.right.isDown ) {
        this.rightKeyPressed = true;
    } else if (this.answerBcounter !== 1){
        this.leftKeyPressed = false;
        this.rightKeyPressed = false;
    }

    if (this.cursors.up.isDown) {
        this.upKeyPressed = true;
    } else {
        this.upKeyPressed = false;
    }

    if (left !== this.leftKeyPressed || right !== this.rightKeyPressed || up !== this.upKeyPressed) {
        this.socket.emit('playerInput', { left: this.leftKeyPressed , right: this.rightKeyPressed, up: this.upKeyPressed });
    }

    // this.input.on('drag', function (pointer,  players, dragX, dragY) {
    //   players[player.playerId].x = dragX;
    //   players[player.playerId].y = dragY;
    // })

    this.displayPlayers = (self, playerInfo, sprite) => {
        const player = self.add.sprite(playerInfo.x, playerInfo.y, sprite).setOrigin(0.5, 0.5).setDisplaySize(400,100).setInteractive({ draggable: true });
        // player.on('drag', function (pointer, dragX, dragY) {
    
        //       player.x = dragX;
        //       player.y = dragY;
    
        //   });
            
        if (playerInfo.team === 'blue') player.setTint(0x0000ff);
        else player.setTint(0xff0000);
        player.playerId = playerInfo.playerId;
        self.players.add(player);
        };

    }

}

export default SMKSonata;
