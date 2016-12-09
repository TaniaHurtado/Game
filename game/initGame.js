//Crea las dimensiones del juego
var game = new Phaser.Game(960, 1920, Phaser.AUTO, 'game');

//Se agregan las funciones del juego para cada fase.
game.state.add('begin', begin);
game.state.add('play', play);
game.state.add('win', win);
game.state.add('fall', fall);

// Se indica la funión con que debe inciar el juego
game.state.start('begin');