class TitleScreen extends Phaser.Scene {
    constructor() {
      super({key: 'titleScreen'});
    }

    preload(){

    }

    create() {
      this.add.text(20, 20, "An Ikmal Game...click to start").setScale(2, 2);
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