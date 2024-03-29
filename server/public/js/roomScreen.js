//import socket from 'socket.js';

class RoomScreen extends Phaser.Scene {

    constructor() {
      super({key: 'roomScreen'});
    }

    init (data)
    {
      this.Socket = data;
      console.log(this.Socket.id.toString())
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
       
        this.socket = this.Socket;

        let Socket = this.socket;

        let playerNumber;


        this.socket.on('init', handleInit);
        this.socket.on('gameCode', handleGameCode);
        this.socket.on('unknownCode', handleUnknownCode);
        this.socket.on('tooManyPlayers', handleTooManyPlayers);

        function handleInit(number) {
            playerNumber = number;
            console.log('init received');
            console.log(number);
            
          }

        let text0 = this.add.text(10, 400, 'Create new:', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

        // text0.setInteractive().on('pointerdown', () => {
        //     self.socket.emit('newGame');
        //     console.log('createclicked');
        //     text0.disableInteractive();
        //     text1.destroy();
            
        // })

        text0.setInteractive().on('pointerdown', function (pointer) {

          console.log('created');

          self.socket.emit('newGame');
          console.log('createclicked');
          text0.disableInteractive();
          //text1.destroy();
          
  
          //this.scene.launch("characterSelect", Socket);

  
        }, this);

        function handleGameCode(gameCode) {

            console.log(gameCode)
            text0.setText("New code: " + gameCode.toString());
            text3.setText(gameCode.toString())
            
        }

        function joinGame() {
            const code = text3.text;
            self.socket.emit('joinGame', code);
            //init();
          }
          
          
        //this.add.image(400, 300, 'pic');
    
        //let text0 = this.add.text(10, 10, 'Create new:', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

       
        this.add.text(10, 475, 'Enter Code:', { font: '32px Courier', fill: '#ffffff' });

        var text1 = this.add.text(10, 545, 'Join', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

        // text1.setInteractive().on('pointerdown', () => {
        //     this.scene.start("characterSelect", Socket)
        //     //joinGame()            
        // })

        text1.on('pointerdown', function (pointer) {

            console.log('boleh');

            //this.scene.remove('characterSelectPrivate');
    
            this.scene.launch("characterSelectPrivate", Socket);

            joinGame()
    
          }, this);


        let text3 = this.add.text(350, 495, 'Click', { fixedWidth: 200, fixedHeight: 75 })
        text3.setOrigin(0.5, 0.5);
    
        text3.setInteractive().on('pointerdown', () => {
            this.rexUI.edit(text3);

            if (text1.active){

              text1.setInteractive()

            }
            
            console.log(text3.text);
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

        let roomNotReadyText = this.add.text(1000, 425, 'Room is not ready :(', { font: '32px Courier', fill: '#ffffff' });

        function handleUnknownCode() {
          //reset();
          roomNotReadyText.setText("Room is empty :(")
        }
        
        function handleTooManyPlayers() {
          //reset();
          roomNotReadyText.setText("Room is full :(");
        }
    

        //let roomEmptyText = this.add.text(1000, 525, 'Room is empty :(', { font: '32px Courier', fill: '#ffffff' });
    
        

    }

}

export default RoomScreen;