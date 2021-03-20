class TitleScreen extends Phaser.Scene {
    constructor() {
      super({key: 'titleScreen'});
    }

    preload(){

    }

    create() {
      this.add.text(20, 20, "Loading game...click to start");
      //this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
      console.log("titleworking");

      this.input.on('pointerdown', function (pointer) {

        console.log('down');

        this.scene.start("characterSelect");

      }, this);
      
    }

    update(){

    }
  }

  export default TitleScreen;