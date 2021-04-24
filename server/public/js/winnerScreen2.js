class WinnerScreen2 extends Phaser.Scene {
    constructor() {
      super({key: 'winnerScreen2'});
    }

    // init (data)
    // {
    //   this.Socket = data;
    //   //console.log(this.Socket.id.toString())
     
    // }

    preload(){

    }

    create() {

      this.socket = io();

      this.socket = this.Socket;

      let Socket = this.socket;

      this.add.text(60, 20, "Jojo wins").setScale(2, 2).setColor('#00ffff');
      //this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
      
      let playAgain = this.add.text(120, 60, "Refresh to Play Again").setFontSize(80).setInteractive();

      //let withFriend = this.add.text(120, 350, "Play With Friend").setFontSize(80).setInteractive();
      
      console.log("titleworking");

      playAgain.on('pointerdown', function (pointer) {

        // this.registry.destroy(); // destroy registry
        // this.events.off();﻿ // disable all active events

        this.sys.game.destroy(true);

        this.scene.start("titleScreen");
        this.scene.remove("winnerScreen2");

      }, this);

      // withFriend.on('pointerdown', function (pointer) {

      //   console.log('down');

      //   this.scene.start("roomScreen", Socket);

      // }, this);
      
    }

    update(){

    }
  }

  export default WinnerScreen2;