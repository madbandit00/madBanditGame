const players = {};
let playersDetect = [];

const state = {};
const clientRooms = {};

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// class titlePage extends Phaser.Scene {
//   constructor() {
//     super("titleScreen0");
//   }
//   create() {
//     this.add.text(20, 20, "Loading game...");
//     //this.scene.start("playGame");
//   }
// }

const config = {
  type: Phaser.HEADLESS,
  parent: 'phaser-example',
  width: 1280,
  height: 780,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: {
    //titleScreen,
    preload: preload,
    create: create,
    update: update
  },
  autoFocus: false
};

function preload() {
  this.load.image('ship', 'assets/spaceShips_001.png');
  this.load.image('otherPlayer', 'assets/enemyBlack5.png');
  this.load.image('star', 'assets/star_gold.png');
}

let scoreCheckerRed = 0;
let scoreCheckerBlue = 0;


function create() {

  this.confirmedTexture = [];

  const self = this;
  this.players = this.physics.add.group();

  this.scores = {
    blue: 0,
    red: 0
  };

  this.isPlayerA = false;

  this.star = this.physics.add.image(1100, 400, 'star');
  this.physics.add.collider(this.players);

  this.input.addPointer(2);

  this.physics.add.overlap(this.players, this.star, function (star, player) {
    if (players[player.playerId].team === 'red' ) {
      self.scores.red += 10;
      scoreCheckerRed += 10;
    } else {
      self.scores.blue += 10;
      scoreCheckerBlue += 10;

    }
    //self.star.setPosition(randomPosition(700), randomPosition(500));
    io.emit('updateScore', self.scores);
    //io.emit('starLocation', { x: self.star.x, y: self.star.y });
  }); 

  io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);
    // create a new player and add it to our players objecterupd
    players[socket.id] = {
      rotation: 0,
      x: Math.floor(Math.random() * 700) + 50,
      y: Math.floor(Math.random() * 500) + 50,
      playerId: socket.id,
      team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue',
      input: {
        left: false,
        right: false,
        up: false
      }
    };

    let socketNumber;

    function handleNewGame() {
      let roomName = makeid(5);
      clientRooms[socket.id] = roomName;
      socket.emit('gameCode', roomName);
  
      //state[roomName] = this.scene.start('characterSelect');
  
      socket.join(roomName);
      socket.number = 1;
      socketNumber = socket.number;
      socket.emit('init', 1);
    }

    let private = false;
    let Room;
    function handleJoinGame(roomName) {
      const room = io.sockets.adapter.rooms[roomName];
      Room = roomName;

      private = true;

      console.log (Room);
  
      let allUsers;
      if (room) {
        allUsers = room.sockets;
      }

      socket.emit('allUsers', allUsers);
 
      let numClients = 0;
      if (allUsers) {
        numClients = Object.keys(allUsers).length;
        console.log(Object.keys(allUsers));
      }

  
      console.log(numClients);
      if (numClients === 0) {
        socket.emit('unknownCode');
        return;
      } else if (numClients > 1) {
        socket.emit('tooManyPlayers');
        return;
      }
  
      clientRooms[socket.id] = roomName;
  
      socket.join(roomName);
      socket.number = 2;
      socket.emit('init', 2);
      
      //startGameInterval(roomName);
    }

    // add player to server
    addPlayer(self, players[socket.id]);
    // send the players object to the new player
    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);
    // send the star object to the new player
    socket.emit('starLocation', { x: self.star.x, y: self.star.y });
    // send the current scores
    socket.emit('updateScore', self.scores);

    //socket.emit('updateScore', self.scores);

    socket.on('disconnect', function () {
      // remove player from server
      removePlayer(self, socket.id);
      // remove this player from our players object
      delete players[socket.id];
      // emit a message to all players to remove this player
      io.emit('disconnect', socket.id);
    });

    // when a player moves, update the player data
    socket.on('playerInput', function (inputData) {
      handlePlayerInput(self, socket.id, inputData);
    });

    socket.on('points', (pts) => {
      console.log('points: ' + pts);
      if (players[socket.id].team === 'red' ) {
        self.scores.red += pts;
      } else {
        self.scores.blue += pts;
      }
      io.emit('updateScore', self.scores);
      
    });
    

    console.log(self.confirmedTexture);

    socket.on('newGame', handleNewGame);

    socket.on('joinGame', handleJoinGame);

    //characterSelect

    playersDetect.push(socket.id);
    //playersDetect.length - 1;

    //socket.emit('isPlayerA', self.isPlayerA);

    // socket.on('checkID', (ID) => {
    //   console.log('checkID: ' + ID);
    //   if (ID === playersDetect[0] ) {

    //     self.isPlayerA = true;
    //     console.log('Player A ID: ' + socket.id);
    //     io.emit('isPlayerA', self.isPlayerA);
    //   }
    //   else {

    //     self.isPlayerA = false;
    //     io.emit('isPlayerA', self.isPlayerA);

    //   }
       
      
    // });

    socket.on('playerAorNot', playerAorB);

    function playerAorB() {

      if (playersDetect.length === 1 || socketNumber === 1) {

        self.isPlayerA = true;

        console.log('Test: ' + socket.id);
        io.emit('isPlayerA', self.isPlayerA);
      }
      // else {

      //   self.isPlayerA = false;
      //   io.emit('isPlayerA', self.isPlayerA);

      // }

    }

    if (playersDetect.length > 2 ) {

      self.confirmedTexture = [];
    }

    socket.on('textureKey', checkTexture);
    
    function checkTexture(confirmTextureKey) {
      console.log('textureKey: ' + confirmTextureKey);
      self.confirmedTexture.push(confirmTextureKey.toString());


      io.emit('texturePicked', self.confirmedTexture);
      
      //io.emit('updateScore', self.scores);
      
    };

    socket.on('whatTexture', returnTexture);

    function returnTexture(confirmTextureKey) {
      self.confirmedTexture = self.confirmedTexture;
      
      if (private){
      io.sockets.in(Room).emit('texturePickedPrivate', self.confirmedTexture);
      console.log("this is private");
      }
      else{
        io.emit('texturePicked', self.confirmedTexture);
        console.log("this is random");
      }
      
      //io.emit('updateScore', self.scores);
      
    };



    socket.emit('textureKey', self.confirmedTexture);

    // if (playersDetect[1] === socket.id) {
    //   console.log('Player B ID: ' + socket.id);
    //   io.emit('isPlayerB');
    // };

    socket.on('dealCards', function () {
        io.emit('dealCards');
    });

    socket.on('cardPlayed', function (gameObject, isPlayerA) {
        console.log ('cardPlayed');
        io.emit('cardPlayed', gameObject, isPlayerA);
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        playersDetect = playersDetect.filter(player => player !== socket.id);
    });
  });
}

function update() {
  this.players.getChildren().forEach((player) => {

    this.input.addPointer(1);
    const input = players[player.playerId].input;
      
    if (input.left) {
      player.setPosition(1000, 300); 
 
      //console.log(scoreCheckerRed);
    }
    
    if (input.right || scoreCheckerRed == 10 || scoreCheckerBlue == 10) {
      player.setPosition(16, 300);
            
      // scoreCheckerRed = false;
      // scoreCheckerBlue = false;
    } else {
      player.setAngularVelocity(0);
    }

    if (input.up) {
      this.physics.velocityFromRotation(player.rotation + 1.5, 200, player.body.acceleration);
    } else {
      player.setAcceleration(0);
    }

    players[player.playerId].x = player.x;
    players[player.playerId].y = player.y;
    players[player.playerId].rotation = player.rotation;
  
  });
  
  this.physics.world.wrap(this.players, 5);
  io.emit('playerUpdates', players);
}

function randomPosition(max) {
  return Math.floor(Math.random() * max) + 50;
}

function handlePlayerInput(self, playerId, input) {
  self.players.getChildren().forEach((player) => {
    if (playerId === player.playerId) {
      players[player.playerId].input = input;
    }
  });
}

function addPlayer(self, playerInfo) {
  const player = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(600, 380).setInteractive({ draggable: true });
  
  player.setDrag(100);
  player.setAngularDrag(100);
  player.setMaxVelocity(200);
  player.playerId = playerInfo.playerId;
  
  self.players.add(player);
  io.emit('playerUpdates', players);
}

function removePlayer(self, playerId) {
  self.players.getChildren().forEach((player) => {
    if (playerId === player.playerId) {
      player.destroy();
    }
  });
}
const game = new Phaser.Game(config);
window.gameLoaded();
