class TitleScreen extends Phaser.Scene {
    constructor() {
      super({key: 'titleScreen'});
    }

    preload(){

    }

    create() {
      this.add.text(20, 20, "SMK Sonata...an Ikmal Game").setScale(2, 2);
      //this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
      
      let random = this.add.text(40, 20, "Play Random").setFixedSize(2, 2);

      let withFriend = this.add.text(60, 20, "Play With Friend").setScale(2, 2);
      
      console.log("titleworking");

      random.input.on('pointerdown', function (pointer) {

        console.log('down');

        this.scene.start("characterSelect");

      }, this);

      withFriend.input.on('pointerdown', function (pointer) {

        console.log('down');

        this.scene.start("characterSelect");

      }, this);
      
    }

    update(){

    }
  }

  export default TitleScreen;