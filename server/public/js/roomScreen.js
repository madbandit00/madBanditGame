class RoomScreen extends Phaser.Scene {

    constructor() {
      super({key: 'roomScreen'});
    }

    preload ()
    {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        })

        this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true)
    }
    
    create ()
    
    {
        var self = this;
        this.socket = io();

        let playerNumber;


        this.socket.on('init', handleInit);
        this.socket.on('gameCode', handleGameCode);

        function handleInit(number) {
            playerNumber = number;
            console.log('init received')
          }

        let text0 = this.add.text(10, 10, 'Create new:', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

        function handleGameCode(gameCode) {

            console.log(gameCode)
            self.text0.setText("New code:" + gameCode.toString());
        }
          
          
        //this.add.image(400, 300, 'pic');
    
        let text0 = this.add.text(10, 10, 'Create new:', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

        text0.setInteractive().on('pointerdown', () => {
            self.socket.emit('newGame');
            console.log('createclicked')
        })

       
        this.add.text(10, 70, 'Enter Code:', { font: '32px Courier', fill: '#ffffff' });

        var text1 = this.add.text(10, 140, 'Join', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

        let text3 = this.add.text(350, 90, 'Click', { fixedWidth: 200, fixedHeight: 75 })
        text3.setOrigin(0.5, 0.5);
    
        text3.setInteractive().on('pointerdown', () => {
            this.rexUI.edit(text3)
        })

        //var textEntry = this.add.text(110, 50, '', { font: '32px Courier', fill: '#ffff00' });
    
        // this.input.keyboard.on('keydown', function (event) {
    
        //     if (event.keyCode === 8 && textEntry.text.length > 0)
        //     {
        //         textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
        //     }
        //     else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
        //     {
        //         textEntry.text += event.key;
        //     }
    
        // });
    
        

    }

}

export default RoomScreen;