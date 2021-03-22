class RoomScreen extends Phaser.Scene {
    constructor() {
      super({key: 'roomScreen'});
    }

    preload ()
    {
        //this.load.html('nameform', 'assets/text/loginform.html');
        //this.load.image('pic', 'assets/pics/turkey-1985086.jpg');
    }
    
    create ()
    {
        //this.add.image(400, 300, 'pic');
    
        var text = this.add.text(10, 10, 'Enter Code', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

        this.add.text(10, 50, 'Code:', { font: '32px Courier', fill: '#ffffff' });

        var textEntry = this.add.text(100, 50, '', { font: '32px Courier', fill: '#ffff00' });
    
        this.input.keyboard.on('keydown', function (event) {
    
            if (event.keyCode === 8 && textEntry.text.length > 0)
            {
                textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
            {
                textEntry.text += event.key;
            }
    
        });

        var text = this.add.text(10, 100, 'Join', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
    
        

    }

}

export default RoomScreen;