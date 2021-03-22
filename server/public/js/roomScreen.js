class RoomScreen extends Phaser.Scene {
    constructor() {
      super({key: 'roomScreen'});
    }

    preload() {
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js';
        this.load.plugin('rexbbcodetextplugin', url, true);
      
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js';
        this.load.plugin('rextexteditplugin', url, true);
    }

    create() {           
        var printText = this.add.rexBBCodeText(400, 300, 'abc', {
            color: 'yellow',
            fontSize: '24px',
            fixedWidth: 200,
            fixedHeight: 80,
            backgroundColor: '#333333',
            valign: 'center'
        })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', function () {
                var config = {
                    onTextChanged: function (textObject, text) {
                        textObject.text = text;
                    },
                    selectAll: true
                }
                this.plugins.get('rextexteditplugin').edit(printText, config);
            }, this);

        this.add.text(0, 580, 'Click text to start editing, press enter key to stop editing')
    }

    update() { }
}


export default RoomScreen;