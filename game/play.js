// Variables para el manejo del juego
var level; // Nivel del jueg
var layer; // Capa
var cursors; //Manej del juego con el teclado
var girl; //personaje dle juego
var stars; //Estrellas 
var score = 0; //Se incrementa cuando el jugador recoge estrellas en el juego
var scoreText; // manejo del texto del puntaje


var play = {

	preload: function(){
        //Se cargan las imágenes para el juego, el mapa .json, el tiledmap, los personajes y el fondo

		 game.load.tilemap('map', 'assets/mapa5.json', null, Phaser.Tilemap.TILED_JSON);
		 game.load.image('tiles', 'assets/platformer_tiles.png', 32, 32);
		 game.load.spritesheet('diamond', 'assets/diamond.png');
		 game.load.image('background', 'assets/sky.jpg');
		 game.load.image('star', 'assets/star.png');
		 game.load.spritesheet('girl', 'assets/girls.png', 32, 32);
	},

	create: function(){
        //Agrega el fondo del juego        
		game.add.sprite(0, 0, 'background');
        // Agrega el mapa
		level = game.add.tilemap('map');
        //Agrega los tiles del mapa
		level.addTilesetImage('platformer_tiles', 'tiles');
		//crea la capa
		layer = level.createLayer('world');
        // permite tomar el tama;o del canvas
        layer.resizeWorld(); 
        //agrega la fisica del juego         		
		game.physics.startSystem(Phaser.Physics.ARCADE);
        //permite el manejo del juego con el teclado
		cursors = game.input.keyboard.createCursorKeys();

        //permite las colisiones en el juego
		this.setCollisions();

        // Crea la chica en el juego
        this.createGirl();

        //Crea estrellitas en el juego
        this.createStar();

        //Incrementa el puntaje al tocar una estrella
        this.collectStar();       


    },

    // Especifica que baldosas del mapa son para colisionar 
    setCollisions: function () {
        level.setCollisionBetween(2,4);
        level.setCollisionBetween(8, 25);
        level.setCollisionBetween(33, 39);
        level.setCollisionBetween(41, 43);
        level.setCollisionBetween(49, 51);
        level.setCollisionBetween(65, 84);
        level.setCollisionBetween(85, 96);
        level.setCollision(25);
        level.setCollision(26);
        level.setCollision(27);
    },

    createGirl: function () {

        // Agrega la chica
        //girl = game.add.sprite(896, 2012, 'girl');
         girl = game.add.sprite(256, 1760, 'girl');

        // Hace que la chica pueda saltar
        game.physics.enable(girl);
        girl.body.tilePadding.set(48);


        // Valor de gravedad de la chica
        game.physics.arcade.gravity.y = 150;
       
        girl.body.collideWorldBounds = true;
        //  Animacion para moverse a la derecha
        girl.animations.add('right', [25,26,27],96, true);

        //  Animacion para moverse a la izquierda
        girl.animations.add('left', [13,14,15], 96, true);
        
        // La camara muestra siempre a la chica
        game.camera.follow(girl);

    },
     createStar: function () {

        // Crea un grupo de estrellas
        stars = game.add.group();
        stars.enableBody = true;
        
        // Crea las estrellas en una posicion determinada
        var star = stars.create(512, 1952, 'star');
      	star = stars.create(64, 1140, 'star');
        star = stars.create(736, 1632, 'star');
      	star = stars.create(353, 1140, 'star');
      	star = stars.create(896, 1280, 'star');
      	star = stars.create(640, 1952, 'star');
      	star = stars.create(896, 1024, 'star');
      	star = stars.create(1088, 1024, 'star');
      	star = stars.create(256, 928, 'star');
      	star = stars.create(512, 480, 'star');
        //  Gravedad de las estrellas
        star.body.gravity.y = 50;
        //  Hace que las estrellas se muevan al caer
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
		
   		// Puntaje del juego
     	scoreText = game.add.text(16,16, 'Score: 0', { fontSize: '42px', fill: '#000'});

    },

    

    // Actualiza el juego
    update: function () {

        // Colision entre la chica y el mapa
        game.physics.arcade.collide(girl, layer);

        // Colision entre las estrellas y el mapa
        game.physics.arcade.collide(stars, layer);

        //Si la chica toca una estrella
        game.physics.arcade.overlap(girl, stars, this.collectStar, null, this);

        // Mover a la chica
        this.moveGirl();

    },

    // Movimientos del jugador
    moveGirl: function () {

        // Inicia con velocidad 0
        girl.body.velocity.x = 0;

        // Al presionar izquierda
        if (cursors.left.isDown) {
            girl.body.velocity.x = -150;
            girl.animations.play('left');
        } else if (cursors.right.isDown) {
            //Al presionar derecha
            girl.body.velocity.x = 150;
            girl.animations.play('right');
        } else {
            // Cuando no se hace nada, se detiene
            girl.animations.stop();
            girl.frame = 1;
        }

        // Ver que este en el suelo cuando salte
        if (cursors.up.isDown && girl.body.onFloor()) {
            girl.body.velocity.y = -150;
        }

        // Cuando encuentra la posicion de la caverna termina el juego
        if (girl.body.x >= 192 && girl.body.y <= 225) {
            game.state.start('end');
        }

        // Si cae sobre las rocas
        if (girl.body.x >= 416 && girl.body.y >= 1856 || girl.body.y >= 1856) {
            game.state.start('fall');
        }

    },

   collectStar: function(player, star) {
    
    // Borra las estrellas cuando la chica las toca
    star.kill();

    //  Suma y actualiza el puntaje
    score += 10;
    scoreText.text = 'Score: ' + score;

	}
}