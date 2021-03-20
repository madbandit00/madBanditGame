class titleScreen extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
    create() {
      this.add.text(20, 20, "Loading game...");
      this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
      //this.scene.start("SMKSonata");
    }
  }