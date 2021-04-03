//import socket from './socket.js';

//var socket = socket;

class CharacterSelectPrivate extends Phaser.Scene {

    constructor() {
      super({key: 'characterSelectPrivate'});
    }

    // init(data)
    // {    
    // this.socket = data.socket;
    // }

    init (data)
    {
      this.Socket = data;
      console.log(this.Socket.id.toString())
     
    }

    preload(){
        this.load.image('Adam', 'assets/adamSelect.png');
        this.load.image('Sydney', 'assets/sydneySelect.png');
        this.load.image('Daniel', 'assets/danielSelect.png');

    }

    create() {

      var self = this;
      this.socket = this.Socket;




      let Socket = this.socket;

      let text = this.add.text(20, 20, "Select a character").setScale(2, 2);

      //this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
      console.log("charselectworking");

      let Confirm;
      

      var r1 = this.add.rectangle(200, 200, 148, 148, 0x6666ff);
      let otherPlayer = this.add.image(200, 190, 'Adam').setInteractive();
      otherPlayer.setScale(0.8, 0.8);
      otherPlayer.on('pointerdown', function (pointer) {

        this.setTint(0xff0000);

        Confirm = self.add.image(1200, 190, "Adam");
        Confirm.setScale(0.8, 0.8);
        r4.setStrokeStyle(4, 0xefc53f);
        confirmText.setTint(0xefc53f);

        ship.clearTint();
        Daniel.clearTint();

      });


      var r2 = this.add.rectangle(400, 200, 148, 148, 0x9966ff);
      let ship = this.add.image(400, 190, 'Sydney').setInteractive();
      ship.setScale(0.8, 0.8);
      ship.on('pointerdown', function (pointer) {

        this.setTint(0xff0000);

        Confirm = self.add.image(1200, 190, "Sydney");
        Confirm.setScale(0.8, 0.8);
        r4.setStrokeStyle(4, 0xefc53f);
        confirmText.setTint(0xefc53f);

        otherPlayer.clearTint();
        Daniel.clearTint();

      });

      //r2.setStrokeStyle(4, 0xefc53f);
  
      var r3 = this.add.rectangle(600, 200, 148, 148, 0x6666ff);
      let Daniel = this.add.image(600, 190, 'Daniel').setInteractive();
      Daniel.setScale(0.8, 0.8);
      Daniel.on('pointerdown', function (pointer) {

        this.setTint(0xff0000);

        Confirm = self.add.image(1200, 190, "Daniel");
        Confirm.setScale(0.8, 0.8);
        r4.setStrokeStyle(4, 0xefc53f);
        confirmText.setTint(0xefc53f);

        otherPlayer.clearTint();
        ship.clearTint();

      });

      var r4 = this.add.rectangle(1200, 200, 148, 148, 0x6666ff);

      let confirmText = this.add.text(1165, 280, "Confirm").setScale(2, 2).setInteractive();

      confirmText.on('pointerdown', function (pointer) {

        console.log(Confirm.texture.key);
        self.socket.emit('textureKey', Confirm.texture.key);

        // this.socket.on('textureKey', function (confirmedTexture) {
        //   self.confirmedTexture = Confirm.texture.key;
        //   console.log(confirmedTexture + ' logTest');
        
        // })

        //self.socket.close();
        this.scene.launch("roomScreen", Socket);

        //this.scene.remove('characterSelect');
        

      },this);

      
    }

    update(){

    }
  }

  export default CharacterSelectPrivate;