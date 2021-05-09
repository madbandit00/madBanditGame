class TitleScreen extends Phaser.Scene {
    constructor() {
      super({key: 'titleScreen'});
    }

    preload(){

      this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#C1C1C1");

    }

    create() {

      this.socket = io();

      let Socket = this.socket;

      this.add.text(20, 20, "SMK Sonata...an Ikmal Game").setScale(2, 2).setColor('#000000 ');
      //this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
      
      let random = this.add.text(120, 60, "Play Random").setFontSize(80).setColor('#000000 ').setInteractive();

      //let withFriend = this.add.text(120, 350, "Play With Friend").setFontSize(80).setInteractive();
      
      console.log("titleworking");

      random.on('pointerdown', function (pointer) {

        this.scene.start("characterSelect", Socket);

      }, this);

      // withFriend.on('pointerdown', function (pointer) {

      //   console.log('down');

      //   this.scene.start("roomScreen", Socket);

      // }, this);
      
    }

    update(){

    }
  }

  export default TitleScreen;