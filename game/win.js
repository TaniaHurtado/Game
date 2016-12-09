var win = {
    // Cargar imagen de fondo
    preload: function () {
        game.load.image('background', 'assets/ganar.JPG');
    },

    create: function () {

        // Agregar fondo
        game.add.sprite(150, 20, 'background');

        var zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);

        zKey.onDown.addOnce(this.start, this);
    },

    start: function () {
        game.state.start('play');
    }
}