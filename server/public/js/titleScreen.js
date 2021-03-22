class TitleScreen extends Phaser.Scene {
    constructor() {
      super({key: 'titleScreen'});
    }

    preload(){

    }

    create() {
      this.add.text(20, 20, "SMK Sonata...an Ikmal Game").setScale(2, 2);
      //this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
      
      let random = this.add.text(120, 60, "Play Random").setFontSize(80).setInteractive();

      let withFriend = this.add.text(120, 500, "Play With Friend").setFontSize(80).setInteractive();
      
      console.log("titleworking");

      random.on('pointerdown', function (pointer) {

        console.log('down');

        this.scene.start("characterSelect");

      }, this);

      withFriend.on('pointerdown', function (pointer) {

        console.log('down');

        this.scene.start("characterSelect");

      }, this);
      
    }

    update(){

    }
  }

  export default TitleScreen;