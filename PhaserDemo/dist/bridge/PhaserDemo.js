// /**
//  * @version 1.0.0.0
//  * @copyright Copyright ©  2017
//  * @compiler Bridge.NET 17.1.0
//  */
// Bridge.assembly("PhaserDemo", function ($asm, globals) {
//     "use strict";

//     Bridge.define("PhaserDemo.App", {
//         main: function Main () {
//             PhaserDemo.App.InitEventHandlers();

//             PhaserDemo.App.SwitchGameTo(1);
//         },
//         statics: {
//             fields: {
//                 _game: null,
//                 _isRun: false
//             },
//             methods: {
//                 InitEventHandlers: function () {
//                     var btns = System.Array.init([document.getElementById("sample1Btn"), document.getElementById("sample2Btn"), document.getElementById("sample3Btn")], HTMLElement);

//                     for (var i = 0; i < btns.length; i = (i + 1) | 0) {
//                         var index = { v : i };

//                         btns[System.Array.index(i, btns)].onclick = (function ($me, index) {
//                             return function (e) {
//                                 PhaserDemo.App.SwitchGameTo(((index.v + 1) | 0));
//                             };
//                         })(this, index);
//                     }
//                 },
//                 SwitchGameTo: function (number) {
//                     if (PhaserDemo.App._isRun) {
//                         PhaserDemo.App._game.destroy();
//                         PhaserDemo.App._game = null;
//                         PhaserDemo.App._isRun = false;
//                     }

//                     PhaserDemo.App._game = PhaserDemo.App.RunGame(number);
//                     PhaserDemo.App._isRun = true;
//                 },
//                 RunGame: function (number) {
//                     switch (number) {
//                         case 1: 
//                             var state1 = new PhaserDemo.Games.GameState1();
//                             return new Phaser.Game(800, 600, Phaser.AUTO, "phaserRoot", state1);
//                         case 2: 
//                             var state2 = new PhaserDemo.Games.GameState2();
//                             return new Phaser.Game(800, 600, Phaser.AUTO, "phaserRoot", state2);
//                         case 3: 
//                             var state3 = new PhaserDemo.Games.GameState3();
//                             return new Phaser.Game(800, 600, Phaser.AUTO, "phaserRoot", state3);
//                         default: 
//                             throw new System.ArgumentOutOfRangeException.$ctor1("number");
//                     }
//                 }
//             }
//         }
//     });

//     Bridge.define("PhaserDemo.Games.AbstractGameState", {
//         inherits: [Phaser.State],
//         methods: {
//             preload: function () { },
//             create: function () { },
//             update: function () { },
//             render: function () { }
//         }
//     });

//     /** @namespace PhaserDemo.Games */

//     /**
//      * Original Demo is available here: https://phaser.io/examples/v2/games/invaders
//      *
//      * @public
//      * @class PhaserDemo.Games.GameState1
//      * @augments PhaserDemo.Games.AbstractGameState
//      */
//     Bridge.define("PhaserDemo.Games.GameState1", {
//         inherits: [PhaserDemo.Games.AbstractGameState],
//         fields: {
//             _player: null,
//             _aliens: null,
//             _bullets: null,
//             _bulletTime: 0,
//             _cursors: null,
//             _fireButton: null,
//             _explosions: null,
//             _starfield: null,
//             _score: 0,
//             _scoreString: null,
//             _scoreText: null,
//             _lives: null,
//             _enemyBullets: null,
//             _firingTimer: 0,
//             _stateText: null,
//             _livingEnemies: null
//         },
//         ctors: {
//             init: function () {
//                 this._scoreString = "";
//                 this._livingEnemies = new Array(0);
//             }
//         },
//         methods: {
//             preload: function () {
//                 this.game.load.crossOrigin = true;
//                 this.game.load.image("bullet", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/bullet.png");
//                 this.game.load.image("enemyBullet", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/enemy-bullet.png");
//                 this.game.load.spritesheet("invader", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/invader32x32x4.png", 32, 32);
//                 this.game.load.image("ship", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/player.png");
//                 this.game.load.spritesheet("kaboom", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/explode.png", 128, 128);
//                 this.game.load.image("starfield", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/starfield.png");
//                 this.game.load.image("background", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/starstruck/background2.png");
//             },
//             create: function () {
//                 this.game.physics.startSystem(Phaser.Physics.ARCADE);

//                 this._starfield = this.game.add.tileSprite(0, 0, 800, 600, "starfield");

//                 this._bullets = this.game.add.group();
//                 this._bullets.enableBody = true;
//                 this._bullets.physicsBodyType = Phaser.Physics.ARCADE;
//                 this._bullets.createMultiple(30, "bullet");
//                 this._bullets.setAll("anchor.x", 0.5);
//                 this._bullets.setAll("anchor.y", 1);
//                 this._bullets.setAll("outOfBoundsKill", true);
//                 this._bullets.setAll("checkWorldBounds", true);

//                 this._enemyBullets = this.game.add.group();
//                 this._enemyBullets.enableBody = true;
//                 this._enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
//                 this._enemyBullets.createMultiple(30, "enemyBullet");
//                 this._enemyBullets.setAll("anchor.x", 0.5);
//                 this._enemyBullets.setAll("anchor.y", 1);
//                 this._enemyBullets.setAll("outOfBoundsKill", true);
//                 this._enemyBullets.setAll("checkWorldBounds", true);

//                 this._player = this.game.add.sprite(400, 500, "ship");
//                 this._player.anchor.setTo(0.5, 0.5);
//                 this.game.physics.enable(this._player, Phaser.Physics.ARCADE);

//                 this._aliens = this.game.add.group();
//                 this._aliens.enableBody = true;
//                 this._aliens.physicsBodyType = Phaser.Physics.ARCADE;

//                 this.CreateAliens();

//                 this._scoreString = "Score : ";
//                 this._scoreText = this.game.add.text(10, 10, (this._scoreString || "") + System.Double.format(this._score), { font: "34px Arial", fill: "#fff" });

//                 this._lives = this.game.add.group();
//                 this.game.add.text(this.game.world.width - 100, 10, "Lives : ", { font: "34px Arial", fill: "#fff" });

//                 this._stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, " ", { font: "84px Arial", fill: "#fff" });
//                 this._stateText.anchor.setTo(0.5, 0.5);
//                 this._stateText.visible = false;

//                 for (var i = 0; i < 3; i = (i + 1) | 0) {
//                     var ship = this._lives.create(this.game.world.width - 100 + (Bridge.Int.mul(30, i)), 60, "ship");

//                     ship.anchor.setTo(0.5, 0.5);
//                     ship.angle = 90;
//                     ship.alpha = 0.4;
//                 }

//                 this._explosions = this.game.add.group();
//                 this._explosions.createMultiple(30, "kaboom");
//                 this._explosions.forEach(Bridge.fn.cacheBind(this, this.SetupInvader), this);

//                 this._cursors = this.game.input.keyboard.createCursorKeys();
//                 this._fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//             },
//             CreateAliens: function () {
//                 for (var y = 0; y < 4; y = (y + 1) | 0) {
//                     for (var x = 0; x < 10; x = (x + 1) | 0) {
//                         var alien = this._aliens.create(Bridge.Int.mul(x, 48), Bridge.Int.mul(y, 50), "invader");

//                         alien.anchor.setTo(0.5, 0.5);
//                         alien.animations.add("fly", System.Array.init([0, 1, 2, 3], System.Double), 20, true);
//                         alien.play("fly");

//                         alien.body.moves = false;
//                     }
//                 }

//                 this._aliens.x = 100;
//                 this._aliens.y = 50;

//                 var tween = this.game.add.tween(this._aliens).to({ x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

//                 tween.onLoop.add(Bridge.fn.cacheBind(this, this.Descend), this);
//             },
//             SetupInvader: function (invader) {
//                 invader.anchor.x = 0.5;
//                 invader.anchor.y = 0.5;
//                 invader.animations.add("kaboom");
//             },
//             Descend: function () {
//                 this._aliens.y += 10;
//             },
//             update: function () {
//                 var $t;
//                 $t = this._starfield.tilePosition;
//                 $t.y += 2;

//                 if (this._player.alive) {
//                     var playerBody = this._player.body;

//                     playerBody.velocity.setTo(0, 0);

//                     if (this._cursors.left.isDown) {
//                         playerBody.velocity.x = -200;
//                     } else if (this._cursors.right.isDown) {
//                         playerBody.velocity.x = 200;
//                     }

//                     if (this._fireButton.isDown) {
//                         this.FireBullet();
//                     }

//                     if (this.game.time.now > this._firingTimer) {
//                         this.EnemyFires();
//                     }

//                     this.game.physics.arcade.overlap(this._bullets, this._aliens, Bridge.fn.cacheBind(this, this.collisionHandler), null, this);
//                     this.game.physics.arcade.overlap(this._enemyBullets, this._player, Bridge.fn.cacheBind(this, this.EnemyHitsPlayer), null, this);
//                 }
//             },
//             render: function () { },
//             collisionHandler: function (bullet, alien) {
//                 var alienBody = alien.body;

//                 bullet.kill();
//                 alien.kill();

//                 this._score += 20;
//                 this._scoreText.text = (this._scoreString || "") + System.Double.format(this._score);

//                 var explosion = this._explosions.getFirstExists(false);

//                 explosion.reset(alienBody.x, alienBody.y);
//                 explosion.play("kaboom", 30, false, true);

//                 if (this._aliens.countLiving() === 0) {
//                     this._score += 1000;
//                     this._scoreText.text = (this._scoreString || "") + System.Double.format(this._score);

//                     this._enemyBullets.callAll("kill", this);
//                     this._stateText.text = " You Won, \n Click to restart";
//                     this._stateText.visible = true;

//                     this.game.input.onTap.addOnce(Bridge.fn.cacheBind(this, this.Restart), this);
//                 }

//             },
//             EnemyHitsPlayer: function (player, bullet) {
//                 var playerBody = player.body;

//                 bullet.kill();

//                 var live = this._lives.getFirstAlive();

//                 if (live != null) {
//                     live.kill();
//                 }

//                 var explosion = this._explosions.getFirstExists(false);
//                 explosion.reset(playerBody.x, playerBody.y);
//                 explosion.play("kaboom", 30, false, true);

//                 if (this._lives.countLiving() < 1) {
//                     player.kill();
//                     this._enemyBullets.callAll("kill", null);

//                     this._stateText.text = " GAME OVER \n Click to restart";
//                     this._stateText.visible = true;

//                     this.game.input.onTap.addOnce(Bridge.fn.cacheBind(this, this.Restart), this);
//                 }
//             },
//             EnemyFires: function () {
//                 var enemyBullet = this._enemyBullets.getFirstExists(false);

//                 this._livingEnemies.length = 0;

//                 this._aliens.forEachAlive(Bridge.fn.bind(this, function (alien) {
//                     this._livingEnemies.push(alien);
//                 }), null);

//                 if (enemyBullet != null && this._livingEnemies.length > 0) {

//                     var random = this.game.rnd.integerInRange(0, this._livingEnemies.length - 1);

//                     var shooter = this._livingEnemies[random];

//                     var shooterBody = shooter.body;
//                     enemyBullet.reset(shooterBody.x, shooterBody.y);

//                     this.game.physics.arcade.moveToObject(enemyBullet, this._player, 120);
//                     this._firingTimer = this.game.time.now + 2000;
//                 }
//             },
//             FireBullet: function () {
//                 if (this.game.time.now > this._bulletTime) {
//                     var bullet = this._bullets.getFirstExists(false);

//                     if (bullet != null) {
//                         var bulletBody = bullet.body;

//                         bullet.reset(this._player.x, this._player.y + 8);
//                         bulletBody.velocity.y = -400;
//                         this._bulletTime = this.game.time.now + 200;
//                     }
//                 }

//             },
//             ResetBullet: function (bullet) {
//                 bullet.kill();
//             },
//             Restart: function () {

//                 this._lives.callAll("revive", null);

//                 this._aliens.removeAll();

//                 this.CreateAliens();

//                 this._player.revive();

//                 this._stateText.visible = false;
//             }
//         }
//     });

//     /**
//      * Original Demo is available here: https://phaser.io/examples/v2/p2-physics/accelerate-to-object
//      *
//      * @public
//      * @class PhaserDemo.Games.GameState2
//      * @augments PhaserDemo.Games.AbstractGameState
//      */
//     Bridge.define("PhaserDemo.Games.GameState2", {
//         inherits: [PhaserDemo.Games.AbstractGameState],
//         fields: {
//             _bullets: null,
//             _cursors: null,
//             _ship: null
//         },
//         methods: {
//             preload: function () {
//                 this.game.load.crossOrigin = true;
//                 this.game.load.image("car", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/sprites/car.png");
//                 this.game.load.image("tinycar", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/sprites/tinycar.png");
//             },
//             create: function () {
//                 this.game.physics.startSystem(Phaser.Physics.P2JS);

//                 this._bullets = this.game.add.group();

//                 for (var i = 0; i < 10; i = (i + 1) | 0) {
//                     var bullet = this._bullets.create(this.game.rnd.integerInRange(200, 1700), this.game.rnd.integerInRange(-200, 400), "tinycar");

//                     this.game.physics.p2.enable(bullet, false);
//                 }

//                 this._cursors = this.game.input.keyboard.createCursorKeys();
//                 this._ship = this.game.add.sprite(32, this.game.world.height - 150, "car");

//                 this.game.physics.p2.enable(this._ship);
//             },
//             update: function () {
//                 var shipBody = this._ship.body;

//                 this._bullets.forEachAlive(Bridge.fn.cacheBind(this, this.MoveBullets), this);

//                 if (this._cursors.left.isDown) {
//                     shipBody.rotateLeft(100);
//                 } else if (this._cursors.right.isDown) {
//                     shipBody.rotateRight(100);
//                 } else {
//                     shipBody.setZeroRotation();
//                 }

//                 if (this._cursors.up.isDown) {
//                     shipBody.thrust(400);
//                 } else if (this._cursors.down.isDown) {
//                     shipBody.reverse(400);
//                 }
//             },
//             MoveBullets: function (bullet) {
//                 this.AccelerateToObject(bullet, this._ship, 30);
//             },
//             AccelerateToObject: function (obj1, obj2, speed) {
//                 if (isNaN(speed)) {
//                     speed = 60;
//                 }

//                 var obj1Body = obj1.body;

//                 var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);

//                 obj1Body.rotation = angle + Math.PI / 2;
//                 obj1Body.force.x = Math.cos(angle) * speed;
//                 obj1Body.force.y = Math.sin(angle) * speed;
//             }
//         }
//     });

//     /**
//      * Original Demo is available here: https://phaser.io/examples/v2/basics/03-move-an-image
//      *
//      * @public
//      * @class PhaserDemo.Games.GameState3
//      * @augments PhaserDemo.Games.AbstractGameState
//      */
//     Bridge.define("PhaserDemo.Games.GameState3", {
//         inherits: [PhaserDemo.Games.AbstractGameState],
//         methods: {
//             preload: function () {
//                 this.game.load.crossOrigin = true;
//                 this.game.load.image("einstein", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/pics/ra_einstein.png");
//             },
//             create: function () {
//                 var image = this.game.add.sprite(0, 0, "einstein");

//                 this.game.physics.enable(image, Phaser.Physics.ARCADE);

//                 var imageBody = image.body;
//                 imageBody.velocity.x = 150;
//             }
//         }
//     });
// });

// //# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJQaGFzZXJEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJHYW1lcy9HYW1lU3RhdGUxLmNzIiwiR2FtZXMvR2FtZVN0YXRlMi5jcyIsIkdhbWVzL0dhbWVTdGF0ZTMuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7WUFjWUE7O1lBR0FBOzs7Ozs7Ozs7b0JBTUFBLFdBQVdBLG1CQUVQQSx1Q0FDQUEsdUNBQ0FBOztvQkFHSkEsS0FBS0EsV0FBV0EsSUFBSUEsYUFBYUE7d0JBRTdCQSxrQkFBWUE7O3dCQUVaQSx3QkFBS0EsR0FBTEEsaUJBQWtCQTs7Z0NBRWRBLDRCQUFhQTs7Ozs7d0NBS09BO29CQUU1QkEsSUFBSUE7d0JBRUFBO3dCQUNBQSx1QkFBUUE7d0JBQ1JBOzs7b0JBR0pBLHVCQUFRQSx1QkFBUUE7b0JBQ2hCQTs7bUNBRzZDQTtvQkFFN0NBLFFBQVFBO3dCQUVKQTs0QkFDSUEsYUFBYUEsSUFBSUE7NEJBRWpCQSxPQUFPQSxJQUFJQSxzQkFBcUNBLDJCQUEwQ0E7d0JBRTlGQTs0QkFDSUEsYUFBYUEsSUFBSUE7NEJBRWpCQSxPQUFPQSxJQUFJQSxzQkFBcUNBLDJCQUEwQ0E7d0JBRTlGQTs0QkFDSUEsYUFBYUEsSUFBSUE7NEJBRWpCQSxPQUFPQSxJQUFJQSxzQkFBcUNBLDJCQUEwQ0E7d0JBRTlGQTs0QkFDSUEsTUFBTUEsSUFBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NDakRvREEsSUFBSUE7Ozs7O2dCQUkxRUE7Z0JBQ0FBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBOzs7Z0JBS0FBLDhCQUF5QkE7O2dCQUd6QkEsa0JBQWFBOztnQkFHYkEsZ0JBQVdBO2dCQUNYQTtnQkFDQUEsZ0NBQTJCQTtnQkFDM0JBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQTs7Z0JB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VkEsaUJBQWlCQSxBQUE0Q0E7O3dCQUc3REEsYUFBYUEsZ0JBQVdBO3dCQUN4QkEsd0JBQXdCQTt3QkFDeEJBLG1CQUFjQTs7Ozs7bUNBTURBO2dCQUdyQkE7Ozs7Z0JBUUFBLDhCQUF5QkE7O2dCQUd6QkE7O2dCQUVBQTs7Z0JBR0FBOztnQkFHQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkM1VEFBO2dCQUNBQTtnQkFDQUE7OztnQkFLQUEsOEJBQXlCQTs7Z0JBRXpCQSxnQkFBV0E7O2dCQUVYQSxLQUFLQSxXQUFXQSxRQUFRQTtvQkFFcEJBLGFBQWFBLHFCQUFnQkEseUNBQW9DQSw2QkFBd0JBOztvQkFFekZBLDRCQUF1QkE7OztnQkFHM0JBLGdCQUFXQTtnQkFDWEEsYUFBUUEseUJBQW9CQTs7Z0JBRTVCQSw0QkFBdUJBOzs7Z0JBS3ZCQSxlQUFlQSxBQUF3Q0E7O2dCQUV2REEsMkJBQXNCQSxBQUF1Q0EsNkNBQWFBOztnQkFFMUVBLElBQUlBO29CQUVBQTt1QkFFQ0EsSUFBSUE7b0JBRUxBOztvQkFJQUE7OztnQkFHSkEsSUFBSUE7b0JBRUFBO3VCQUVDQSxJQUFJQTtvQkFFTEE7OzttQ0FJaUJBO2dCQUVyQkEsd0JBQW1CQSxRQUFRQTs7MENBR0NBLE1BQW1DQSxNQUFtQ0E7Z0JBRWxHQSxJQUFJQSxNQUFhQTtvQkFFYkE7OztnQkFHSkEsZUFBZUEsQUFBd0NBOztnQkFFdkRBLFlBQVlBLFdBQWVBLFNBQVNBLFFBQVFBLFNBQVNBOztnQkFFckRBLG9CQUFvQkEsUUFBUUE7Z0JBQzVCQSxtQkFBbUJBLFNBQWFBLFNBQVNBO2dCQUN6Q0EsbUJBQW1CQSxTQUFhQSxTQUFTQTs7Ozs7Ozs7Ozs7Ozs7OztnQkM3RXpDQTtnQkFDQUE7OztnQkFRQUEsWUFBWUE7O2dCQUVaQSx5QkFBb0JBLE9BQU9BOztnQkFFM0JBLGdCQUFnQkEsQUFBMkNBO2dCQUMzREEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBQaGFzZXJEZW1vLkdhbWVzO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIFBoYXNlckRlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQucGhhc2VyLlBoYXNlci5HYW1lIF9nYW1lO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGJvb2wgX2lzUnVuO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBJbml0IEV2ZW50IGhhbmRsZXJzOlxyXG4gICAgICAgICAgICBJbml0RXZlbnRIYW5kbGVycygpO1xyXG5cclxuICAgICAgICAgICAgLy8gUnVuIEdhbWUxIG9uIHN0YXJ0OlxyXG4gICAgICAgICAgICBTd2l0Y2hHYW1lVG8oMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIEluaXRFdmVudEhhbmRsZXJzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIEluaXQgZXZlbnQgaGFuZGxlciBmb3IgYnV0dG9ucyBzd2l0Y2hpbmcgc2NlbmVzXHJcbiAgICAgICAgICAgIHZhciBidG5zID0gbmV3W11cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2FtcGxlMUJ0blwiKSxcclxuICAgICAgICAgICAgICAgIGRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNhbXBsZTJCdG5cIiksXHJcbiAgICAgICAgICAgICAgICBkb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYW1wbGUzQnRuXCIpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ0bnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGJ0bnNbaV0ub25jbGljayA9IGUgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBTd2l0Y2hHYW1lVG8oaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTd2l0Y2hHYW1lVG8oaW50IG51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfaXNSdW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9nYW1lLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIF9nYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIF9pc1J1biA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfZ2FtZSA9IFJ1bkdhbWUobnVtYmVyKTtcclxuICAgICAgICAgICAgX2lzUnVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUmV0eXBlZC5waGFzZXIuUGhhc2VyLkdhbWUgUnVuR2FtZShpbnQgbnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChudW1iZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGUxID0gbmV3IEdhbWVTdGF0ZTEoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXR5cGVkLnBoYXNlci5QaGFzZXIuR2FtZSg4MDAsIDYwMCwgUmV0eXBlZC5waGFzZXIuUGhhc2VyLkFVVE8sIFwicGhhc2VyUm9vdFwiLCBzdGF0ZTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGF0ZTIgPSBuZXcgR2FtZVN0YXRlMigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJldHlwZWQucGhhc2VyLlBoYXNlci5HYW1lKDgwMCwgNjAwLCBSZXR5cGVkLnBoYXNlci5QaGFzZXIuQVVUTywgXCJwaGFzZXJSb290XCIsIHN0YXRlMik7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGF0ZTMgPSBuZXcgR2FtZVN0YXRlMygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJldHlwZWQucGhhc2VyLlBoYXNlci5HYW1lKDgwMCwgNjAwLCBSZXR5cGVkLnBoYXNlci5QaGFzZXIuQVVUTywgXCJwaGFzZXJSb290XCIsIHN0YXRlMyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwibnVtYmVyXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIFBoYXNlckRlbW8uR2FtZXNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIE9yaWdpbmFsIERlbW8gaXMgYXZhaWxhYmxlIGhlcmU6IGh0dHBzOi8vcGhhc2VyLmlvL2V4YW1wbGVzL3YyL2dhbWVzL2ludmFkZXJzXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIEdhbWVTdGF0ZTEgOiBBYnN0cmFjdEdhbWVTdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSBfcGxheWVyO1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5waGFzZXIuUGhhc2VyLkdyb3VwIF9hbGllbnM7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnBoYXNlci5QaGFzZXIuR3JvdXAgX2J1bGxldHM7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgX2J1bGxldFRpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnBoYXNlci5QaGFzZXIuQ3Vyc29yS2V5cyBfY3Vyc29ycztcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQucGhhc2VyLlBoYXNlci5LZXkgX2ZpcmVCdXR0b247XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnBoYXNlci5QaGFzZXIuR3JvdXAgX2V4cGxvc2lvbnM7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnBoYXNlci5QaGFzZXIuVGlsZVNwcml0ZSBfc3RhcmZpZWxkO1xyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIF9zY29yZTtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfc2NvcmVTdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5waGFzZXIuUGhhc2VyLlRleHQgX3Njb3JlVGV4dDtcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQucGhhc2VyLlBoYXNlci5Hcm91cCBfbGl2ZXM7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnBoYXNlci5QaGFzZXIuR3JvdXAgX2VuZW15QnVsbGV0cztcclxuICAgICAgICBwcml2YXRlIGRvdWJsZSBfZmlyaW5nVGltZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnBoYXNlci5QaGFzZXIuVGV4dCBfc3RhdGVUZXh0O1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZXM1LkFycmF5PFJldHlwZWQucGhhc2VyLlBoYXNlci5TcHJpdGU+IF9saXZpbmdFbmVtaWVzID0gbmV3IGVzNS5BcnJheTxSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlPigwKTtcclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgUHJlbG9hZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnYW1lLmxvYWQuY3Jvc3NPcmlnaW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoXCJidWxsZXRcIiwgXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcGhvdG9uc3Rvcm0vcGhhc2VyLWV4YW1wbGVzL21hc3Rlci9leGFtcGxlcy9hc3NldHMvZ2FtZXMvaW52YWRlcnMvYnVsbGV0LnBuZ1wiKTtcclxuICAgICAgICAgICAgZ2FtZS5sb2FkLmltYWdlKFwiZW5lbXlCdWxsZXRcIiwgXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcGhvdG9uc3Rvcm0vcGhhc2VyLWV4YW1wbGVzL21hc3Rlci9leGFtcGxlcy9hc3NldHMvZ2FtZXMvaW52YWRlcnMvZW5lbXktYnVsbGV0LnBuZ1wiKTtcclxuICAgICAgICAgICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KFwiaW52YWRlclwiLCBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9waG90b25zdG9ybS9waGFzZXItZXhhbXBsZXMvbWFzdGVyL2V4YW1wbGVzL2Fzc2V0cy9nYW1lcy9pbnZhZGVycy9pbnZhZGVyMzJ4MzJ4NC5wbmdcIiwgMzIsIDMyKTtcclxuICAgICAgICAgICAgZ2FtZS5sb2FkLmltYWdlKFwic2hpcFwiLCBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9waG90b25zdG9ybS9waGFzZXItZXhhbXBsZXMvbWFzdGVyL2V4YW1wbGVzL2Fzc2V0cy9nYW1lcy9pbnZhZGVycy9wbGF5ZXIucG5nXCIpO1xyXG4gICAgICAgICAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoXCJrYWJvb21cIiwgXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcGhvdG9uc3Rvcm0vcGhhc2VyLWV4YW1wbGVzL21hc3Rlci9leGFtcGxlcy9hc3NldHMvZ2FtZXMvaW52YWRlcnMvZXhwbG9kZS5wbmdcIiwgMTI4LCAxMjgpO1xyXG4gICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoXCJzdGFyZmllbGRcIiwgXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcGhvdG9uc3Rvcm0vcGhhc2VyLWV4YW1wbGVzL21hc3Rlci9leGFtcGxlcy9hc3NldHMvZ2FtZXMvaW52YWRlcnMvc3RhcmZpZWxkLnBuZ1wiKTtcclxuICAgICAgICAgICAgZ2FtZS5sb2FkLmltYWdlKFwiYmFja2dyb3VuZFwiLCBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9waG90b25zdG9ybS9waGFzZXItZXhhbXBsZXMvbWFzdGVyL2V4YW1wbGVzL2Fzc2V0cy9nYW1lcy9zdGFyc3RydWNrL2JhY2tncm91bmQyLnBuZ1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIENyZWF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUmV0eXBlZC5waGFzZXIuUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuXHJcbiAgICAgICAgICAgIC8vICBUaGUgc2Nyb2xsaW5nIHN0YXJmaWVsZCBiYWNrZ3JvdW5kXHJcbiAgICAgICAgICAgIF9zdGFyZmllbGQgPSBnYW1lLmFkZC50aWxlU3ByaXRlKDAsIDAsIDgwMCwgNjAwLCBcInN0YXJmaWVsZFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vICBPdXIgYnVsbGV0IGdyb3VwXHJcbiAgICAgICAgICAgIF9idWxsZXRzID0gZ2FtZS5hZGQuZ3JvdXAoKTtcclxuICAgICAgICAgICAgX2J1bGxldHMuZW5hYmxlQm9keSA9IHRydWU7XHJcbiAgICAgICAgICAgIF9idWxsZXRzLnBoeXNpY3NCb2R5VHlwZSA9IFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLkFSQ0FERTtcclxuICAgICAgICAgICAgX2J1bGxldHMuY3JlYXRlTXVsdGlwbGUoMzAsIFwiYnVsbGV0XCIpO1xyXG4gICAgICAgICAgICBfYnVsbGV0cy5zZXRBbGwoXCJhbmNob3IueFwiLCAwLjUpO1xyXG4gICAgICAgICAgICBfYnVsbGV0cy5zZXRBbGwoXCJhbmNob3IueVwiLCAxKTtcclxuICAgICAgICAgICAgX2J1bGxldHMuc2V0QWxsKFwib3V0T2ZCb3VuZHNLaWxsXCIsIHRydWUpO1xyXG4gICAgICAgICAgICBfYnVsbGV0cy5zZXRBbGwoXCJjaGVja1dvcmxkQm91bmRzXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhlIGVuZW15XCJzIGJ1bGxldHNcclxuICAgICAgICAgICAgX2VuZW15QnVsbGV0cyA9IGdhbWUuYWRkLmdyb3VwKCk7XHJcbiAgICAgICAgICAgIF9lbmVteUJ1bGxldHMuZW5hYmxlQm9keSA9IHRydWU7XHJcbiAgICAgICAgICAgIF9lbmVteUJ1bGxldHMucGh5c2ljc0JvZHlUeXBlID0gUmV0eXBlZC5waGFzZXIuUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xyXG4gICAgICAgICAgICBfZW5lbXlCdWxsZXRzLmNyZWF0ZU11bHRpcGxlKDMwLCBcImVuZW15QnVsbGV0XCIpO1xyXG4gICAgICAgICAgICBfZW5lbXlCdWxsZXRzLnNldEFsbChcImFuY2hvci54XCIsIDAuNSk7XHJcbiAgICAgICAgICAgIF9lbmVteUJ1bGxldHMuc2V0QWxsKFwiYW5jaG9yLnlcIiwgMSk7XHJcbiAgICAgICAgICAgIF9lbmVteUJ1bGxldHMuc2V0QWxsKFwib3V0T2ZCb3VuZHNLaWxsXCIsIHRydWUpO1xyXG4gICAgICAgICAgICBfZW5lbXlCdWxsZXRzLnNldEFsbChcImNoZWNrV29ybGRCb3VuZHNcIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyAgVGhlIGhlcm8hXHJcbiAgICAgICAgICAgIF9wbGF5ZXIgPSBnYW1lLmFkZC5zcHJpdGUoNDAwLCA1MDAsIFwic2hpcFwiKTtcclxuICAgICAgICAgICAgX3BsYXllci5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICBnYW1lLnBoeXNpY3MuZW5hYmxlKF9wbGF5ZXIsIFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcblxyXG4gICAgICAgICAgICAvLyAgVGhlIGJhZGRpZXMhXHJcbiAgICAgICAgICAgIF9hbGllbnMgPSBnYW1lLmFkZC5ncm91cCgpO1xyXG4gICAgICAgICAgICBfYWxpZW5zLmVuYWJsZUJvZHkgPSB0cnVlO1xyXG4gICAgICAgICAgICBfYWxpZW5zLnBoeXNpY3NCb2R5VHlwZSA9IFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLkFSQ0FERTtcclxuXHJcbiAgICAgICAgICAgIENyZWF0ZUFsaWVucygpO1xyXG5cclxuICAgICAgICAgICAgLy8gIFRoZSBzY29yZVxyXG4gICAgICAgICAgICBfc2NvcmVTdHJpbmcgPSBcIlNjb3JlIDogXCI7XHJcbiAgICAgICAgICAgIF9zY29yZVRleHQgPSBnYW1lLmFkZC50ZXh0KDEwLCAxMCwgX3Njb3JlU3RyaW5nICsgX3Njb3JlLCBuZXcge2ZvbnQgPSBcIjM0cHggQXJpYWxcIiwgZmlsbCA9IFwiI2ZmZlwifSk7XHJcblxyXG4gICAgICAgICAgICAvLyAgTGl2ZXNcclxuICAgICAgICAgICAgX2xpdmVzID0gZ2FtZS5hZGQuZ3JvdXAoKTtcclxuICAgICAgICAgICAgZ2FtZS5hZGQudGV4dChnYW1lLndvcmxkLndpZHRoIC0gMTAwLCAxMCwgXCJMaXZlcyA6IFwiLCBuZXcge2ZvbnQgPSBcIjM0cHggQXJpYWxcIiwgZmlsbCA9IFwiI2ZmZlwifSk7XHJcblxyXG4gICAgICAgICAgICAvLyAgVGV4dFxyXG4gICAgICAgICAgICBfc3RhdGVUZXh0ID0gZ2FtZS5hZGQudGV4dChnYW1lLndvcmxkLmNlbnRlclgsIGdhbWUud29ybGQuY2VudGVyWSwgXCIgXCIsIG5ldyB7Zm9udCA9IFwiODRweCBBcmlhbFwiLCBmaWxsID0gXCIjZmZmXCJ9KTtcclxuICAgICAgICAgICAgX3N0YXRlVGV4dC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICBfc3RhdGVUZXh0LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2hpcCA9IChSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlKSBfbGl2ZXMuY3JlYXRlKGdhbWUud29ybGQud2lkdGggLSAxMDAgKyAoMzAgKiBpKSwgNjAsIFwic2hpcFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzaGlwLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgICAgICBzaGlwLmFuZ2xlID0gOTA7XHJcbiAgICAgICAgICAgICAgICBzaGlwLmFscGhhID0gMC40O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgQW4gZXhwbG9zaW9uIHBvb2xcclxuICAgICAgICAgICAgX2V4cGxvc2lvbnMgPSBnYW1lLmFkZC5ncm91cCgpO1xyXG4gICAgICAgICAgICBfZXhwbG9zaW9ucy5jcmVhdGVNdWx0aXBsZSgzMCwgXCJrYWJvb21cIik7XHJcbiAgICAgICAgICAgIF9leHBsb3Npb25zLmZvckVhY2goKEFjdGlvbjxSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlPikgU2V0dXBJbnZhZGVyLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vICBBbmQgc29tZSBjb250cm9scyB0byBwbGF5IHRoZSBnYW1lIHdpdGhcclxuICAgICAgICAgICAgX2N1cnNvcnMgPSBnYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgICAgICAgICAgX2ZpcmVCdXR0b24gPSBnYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShSZXR5cGVkLnBoYXNlci5QaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENyZWF0ZUFsaWVucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IDQ7IHkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCAxMDsgeCsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbGllbiA9IChSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlKSBfYWxpZW5zLmNyZWF0ZSh4ICogNDgsIHkgKiA1MCwgXCJpbnZhZGVyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhbGllbi5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsaWVuLmFuaW1hdGlvbnMuYWRkKFwiZmx5XCIsIG5ldyBkb3VibGVbXSB7MCwgMSwgMiwgM30sIDIwLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGllbi5wbGF5KFwiZmx5XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAoKFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLkFyY2FkZS5Cb2R5KSBhbGllbi5ib2R5KS5tb3ZlcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfYWxpZW5zLnggPSAxMDA7XHJcbiAgICAgICAgICAgIF9hbGllbnMueSA9IDUwO1xyXG5cclxuICAgICAgICAgICAgLy8gIEFsbCB0aGlzIGRvZXMgaXMgYmFzaWNhbGx5IHN0YXJ0IHRoZSBpbnZhZGVycyBtb3ZpbmcuIE5vdGljZSB3ZVwicmUgbW92aW5nIHRoZSBHcm91cCB0aGV5IGJlbG9uZyB0bywgcmF0aGVyIHRoYW4gdGhlIGludmFkZXJzIGRpcmVjdGx5LlxyXG4gICAgICAgICAgICB2YXIgdHdlZW4gPSBnYW1lLmFkZC50d2VlbihfYWxpZW5zKS50byhuZXcge3ggPSAyMDB9LCAyMDAwLCAoRnVuYzxkb3VibGUsIGRvdWJsZT4pIFJldHlwZWQucGhhc2VyLlBoYXNlci5FYXNpbmcuTGluZWFyLk5vbmUsIHRydWUsIDAsIDEwMDAsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gIFdoZW4gdGhlIHR3ZWVuIGxvb3BzIGl0IGNhbGxzIGRlc2NlbmRcclxuICAgICAgICAgICAgdHdlZW4ub25Mb29wLmFkZCgoQWN0aW9uKSBEZXNjZW5kLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBTZXR1cEludmFkZXIoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSBpbnZhZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW52YWRlci5hbmNob3IueCA9IDAuNTtcclxuICAgICAgICAgICAgaW52YWRlci5hbmNob3IueSA9IDAuNTtcclxuICAgICAgICAgICAgaW52YWRlci5hbmltYXRpb25zLmFkZChcImthYm9vbVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERlc2NlbmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2FsaWVucy55ICs9IDEwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICBTY3JvbGwgdGhlIGJhY2tncm91bmRcclxuICAgICAgICAgICAgX3N0YXJmaWVsZC50aWxlUG9zaXRpb24ueSArPSAyO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9wbGF5ZXIuYWxpdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICBSZXNldCB0aGUgcGxheWVyLCB0aGVuIGNoZWNrIGZvciBtb3ZlbWVudCBrZXlzXHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyQm9keSA9IChSZXR5cGVkLnBoYXNlci5QaGFzZXIuUGh5c2ljcy5BcmNhZGUuQm9keSkgX3BsYXllci5ib2R5O1xyXG5cclxuICAgICAgICAgICAgICAgIHBsYXllckJvZHkudmVsb2NpdHkuc2V0VG8oMCwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9jdXJzb3JzLmxlZnQuaXNEb3duKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckJvZHkudmVsb2NpdHkueCA9IC0yMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChfY3Vyc29ycy5yaWdodC5pc0Rvd24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyQm9keS52ZWxvY2l0eS54ID0gMjAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vICBGaXJpbmc/XHJcbiAgICAgICAgICAgICAgICBpZiAoX2ZpcmVCdXR0b24uaXNEb3duKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEZpcmVCdWxsZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS50aW1lLm5vdyA+IF9maXJpbmdUaW1lcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbmVteUZpcmVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gIFJ1biBjb2xsaXNpb25cclxuICAgICAgICAgICAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcChfYnVsbGV0cywgX2FsaWVucywgKEFjdGlvbjxSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlLCBSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlPikgY29sbGlzaW9uSGFuZGxlciwgbnVsbCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAoX2VuZW15QnVsbGV0cywgX3BsYXllciwgKEFjdGlvbjxSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlLCBSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlPikgRW5lbXlIaXRzUGxheWVyLCBudWxsLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgUmVuZGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vZm9yICh2YXIgaSA9IDA7IGkgPCBfYWxpZW5zLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgZ2FtZS5kZWJ1Zy5ib2R5KChTcHJpdGUpX2FsaWVucy5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIGNvbGxpc2lvbkhhbmRsZXIoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSBidWxsZXQsIFJldHlwZWQucGhhc2VyLlBoYXNlci5TcHJpdGUgYWxpZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYWxpZW5Cb2R5ID0gKFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLkFyY2FkZS5Cb2R5KSBhbGllbi5ib2R5O1xyXG5cclxuICAgICAgICAgICAgLy8gIFdoZW4gYSBidWxsZXQgaGl0cyBhbiBhbGllbiB3ZSBraWxsIHRoZW0gYm90aFxyXG4gICAgICAgICAgICBidWxsZXQua2lsbCgpO1xyXG4gICAgICAgICAgICBhbGllbi5raWxsKCk7XHJcblxyXG4gICAgICAgICAgICAvLyAgSW5jcmVhc2UgdGhlIHNjb3JlXHJcbiAgICAgICAgICAgIF9zY29yZSArPSAyMDtcclxuICAgICAgICAgICAgX3Njb3JlVGV4dC50ZXh0ID0gX3Njb3JlU3RyaW5nICsgX3Njb3JlO1xyXG5cclxuICAgICAgICAgICAgLy8gIEFuZCBjcmVhdGUgYW4gZXhwbG9zaW9uIDopXHJcbiAgICAgICAgICAgIHZhciBleHBsb3Npb24gPSAoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSkgX2V4cGxvc2lvbnMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgZXhwbG9zaW9uLnJlc2V0KGFsaWVuQm9keS54LCBhbGllbkJvZHkueSk7XHJcbiAgICAgICAgICAgIGV4cGxvc2lvbi5wbGF5KFwia2Fib29tXCIsIDMwLCBmYWxzZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoX2FsaWVucy5jb3VudExpdmluZygpID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9zY29yZSArPSAxMDAwO1xyXG4gICAgICAgICAgICAgICAgX3Njb3JlVGV4dC50ZXh0ID0gX3Njb3JlU3RyaW5nICsgX3Njb3JlO1xyXG5cclxuICAgICAgICAgICAgICAgIF9lbmVteUJ1bGxldHMuY2FsbEFsbChcImtpbGxcIiwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBfc3RhdGVUZXh0LnRleHQgPSBcIiBZb3UgV29uLCBcXG4gQ2xpY2sgdG8gcmVzdGFydFwiO1xyXG4gICAgICAgICAgICAgICAgX3N0YXRlVGV4dC52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3RoZSBcImNsaWNrIHRvIHJlc3RhcnRcIiBoYW5kbGVyXHJcbiAgICAgICAgICAgICAgICBnYW1lLmlucHV0Lm9uVGFwLmFkZE9uY2UoKEFjdGlvbikgUmVzdGFydCwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRW5lbXlIaXRzUGxheWVyKFJldHlwZWQucGhhc2VyLlBoYXNlci5TcHJpdGUgcGxheWVyLCBSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlIGJ1bGxldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJCb2R5ID0gKFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLkFyY2FkZS5Cb2R5KSBwbGF5ZXIuYm9keTtcclxuXHJcbiAgICAgICAgICAgIGJ1bGxldC5raWxsKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbGl2ZSA9IChSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlKSBfbGl2ZXMuZ2V0Rmlyc3RBbGl2ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxpdmUgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGl2ZS5raWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICBBbmQgY3JlYXRlIGFuIGV4cGxvc2lvbiA6KVxyXG4gICAgICAgICAgICB2YXIgZXhwbG9zaW9uID0gKFJldHlwZWQucGhhc2VyLlBoYXNlci5TcHJpdGUpIF9leHBsb3Npb25zLmdldEZpcnN0RXhpc3RzKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwbG9zaW9uLnJlc2V0KHBsYXllckJvZHkueCwgcGxheWVyQm9keS55KTtcclxuICAgICAgICAgICAgZXhwbG9zaW9uLnBsYXkoXCJrYWJvb21cIiwgMzAsIGZhbHNlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdoZW4gdGhlIHBsYXllciBkaWVzXHJcbiAgICAgICAgICAgIGlmIChfbGl2ZXMuY291bnRMaXZpbmcoKSA8IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5raWxsKCk7XHJcbiAgICAgICAgICAgICAgICBfZW5lbXlCdWxsZXRzLmNhbGxBbGwoXCJraWxsXCIsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9zdGF0ZVRleHQudGV4dCA9IFwiIEdBTUUgT1ZFUiBcXG4gQ2xpY2sgdG8gcmVzdGFydFwiO1xyXG4gICAgICAgICAgICAgICAgX3N0YXRlVGV4dC52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3RoZSBcImNsaWNrIHRvIHJlc3RhcnRcIiBoYW5kbGVyXHJcbiAgICAgICAgICAgICAgICBnYW1lLmlucHV0Lm9uVGFwLmFkZE9uY2UoKEFjdGlvbikgUmVzdGFydCwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBFbmVteUZpcmVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICBHcmFiIHRoZSBmaXJzdCBidWxsZXQgd2UgY2FuIGZyb20gdGhlIHBvb2xcclxuICAgICAgICAgICAgdmFyIGVuZW15QnVsbGV0ID0gKFJldHlwZWQucGhhc2VyLlBoYXNlci5TcHJpdGUpIF9lbmVteUJ1bGxldHMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgX2xpdmluZ0VuZW1pZXMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgICAgIF9hbGllbnMuZm9yRWFjaEFsaXZlKG5ldyBBY3Rpb248UmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZT4oYWxpZW4gPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gcHV0IGV2ZXJ5IGxpdmluZyBlbmVteSBpbiBhbiBhcnJheVxyXG4gICAgICAgICAgICAgICAgX2xpdmluZ0VuZW1pZXMucHVzaChhbGllbik7XHJcbiAgICAgICAgICAgIH0pLCBudWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbmVteUJ1bGxldCAhPSBudWxsICYmIF9saXZpbmdFbmVtaWVzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tID0gZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMCwgX2xpdmluZ0VuZW1pZXMubGVuZ3RoIC0gMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmFuZG9tbHkgc2VsZWN0IG9uZSBvZiB0aGVtXHJcbiAgICAgICAgICAgICAgICB2YXIgc2hvb3RlciA9IF9saXZpbmdFbmVtaWVzW3JhbmRvbV07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQW5kIGZpcmUgdGhlIGJ1bGxldCBmcm9tIHRoaXMgZW5lbXlcclxuICAgICAgICAgICAgICAgIHZhciBzaG9vdGVyQm9keSA9IChSZXR5cGVkLnBoYXNlci5QaGFzZXIuUGh5c2ljcy5BcmNhZGUuQm9keSkgc2hvb3Rlci5ib2R5O1xyXG4gICAgICAgICAgICAgICAgZW5lbXlCdWxsZXQucmVzZXQoc2hvb3RlckJvZHkueCwgc2hvb3RlckJvZHkueSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5tb3ZlVG9PYmplY3QoZW5lbXlCdWxsZXQsIF9wbGF5ZXIsIDEyMCk7XHJcbiAgICAgICAgICAgICAgICBfZmlyaW5nVGltZXIgPSBnYW1lLnRpbWUubm93ICsgMjAwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEZpcmVCdWxsZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gIFRvIGF2b2lkIHRoZW0gYmVpbmcgYWxsb3dlZCB0byBmaXJlIHRvbyBmYXN0IHdlIHNldCBhIHRpbWUgbGltaXRcclxuICAgICAgICAgICAgaWYgKGdhbWUudGltZS5ub3cgPiBfYnVsbGV0VGltZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gIEdyYWIgdGhlIGZpcnN0IGJ1bGxldCB3ZSBjYW4gZnJvbSB0aGUgcG9vbFxyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGxldCA9IChSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlKSBfYnVsbGV0cy5nZXRGaXJzdEV4aXN0cyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChidWxsZXQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYnVsbGV0Qm9keSA9IChSZXR5cGVkLnBoYXNlci5QaGFzZXIuUGh5c2ljcy5BcmNhZGUuQm9keSkgYnVsbGV0LmJvZHk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICBBbmQgZmlyZSBpdFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldC5yZXNldChfcGxheWVyLngsIF9wbGF5ZXIueSArIDgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldEJvZHkudmVsb2NpdHkueSA9IC00MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgX2J1bGxldFRpbWUgPSBnYW1lLnRpbWUubm93ICsgMjAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlc2V0QnVsbGV0KFJldHlwZWQucGhhc2VyLlBoYXNlci5TcHJpdGUgYnVsbGV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gIENhbGxlZCBpZiB0aGUgYnVsbGV0IGdvZXMgb3V0IG9mIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgYnVsbGV0LmtpbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZXN0YXJ0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICBBIG5ldyBsZXZlbCBzdGFydHNcclxuXHJcbiAgICAgICAgICAgIC8vcmVzZXRzIHRoZSBsaWZlIGNvdW50XHJcbiAgICAgICAgICAgIF9saXZlcy5jYWxsQWxsKFwicmV2aXZlXCIsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgLy8gQW5kIGJyaW5ncyB0aGUgYWxpZW5zIGJhY2sgZnJvbSB0aGUgZGVhZCA6KVxyXG4gICAgICAgICAgICBfYWxpZW5zLnJlbW92ZUFsbCgpO1xyXG5cclxuICAgICAgICAgICAgQ3JlYXRlQWxpZW5zKCk7XHJcblxyXG4gICAgICAgICAgICAvL3Jldml2ZXMgdGhlIHBsYXllclxyXG4gICAgICAgICAgICBfcGxheWVyLnJldml2ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9oaWRlcyB0aGUgdGV4dFxyXG4gICAgICAgICAgICBfc3RhdGVUZXh0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgUGhhc2VyRGVtby5HYW1lc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gT3JpZ2luYWwgRGVtbyBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9waGFzZXIuaW8vZXhhbXBsZXMvdjIvcDItcGh5c2ljcy9hY2NlbGVyYXRlLXRvLW9iamVjdFxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBHYW1lU3RhdGUyIDogQWJzdHJhY3RHYW1lU3RhdGVcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQucGhhc2VyLlBoYXNlci5Hcm91cCBfYnVsbGV0cztcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQucGhhc2VyLlBoYXNlci5DdXJzb3JLZXlzIF9jdXJzb3JzO1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSBfc2hpcDtcclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgUHJlbG9hZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnYW1lLmxvYWQuY3Jvc3NPcmlnaW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoXCJjYXJcIiwgXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcGhvdG9uc3Rvcm0vcGhhc2VyLWV4YW1wbGVzL21hc3Rlci9leGFtcGxlcy9hc3NldHMvc3ByaXRlcy9jYXIucG5nXCIpO1xyXG4gICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoXCJ0aW55Y2FyXCIsIFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3Bob3RvbnN0b3JtL3BoYXNlci1leGFtcGxlcy9tYXN0ZXIvZXhhbXBsZXMvYXNzZXRzL3Nwcml0ZXMvdGlueWNhci5wbmdcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBDcmVhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLlAySlMpO1xyXG5cclxuICAgICAgICAgICAgX2J1bGxldHMgPSBnYW1lLmFkZC5ncm91cCgpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbGV0ID0gX2J1bGxldHMuY3JlYXRlKGdhbWUucm5kLmludGVnZXJJblJhbmdlKDIwMCwgMTcwMCksIGdhbWUucm5kLmludGVnZXJJblJhbmdlKC0yMDAsIDQwMCksIFwidGlueWNhclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBnYW1lLnBoeXNpY3MucDIuZW5hYmxlKGJ1bGxldCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfY3Vyc29ycyA9IGdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG4gICAgICAgICAgICBfc2hpcCA9IGdhbWUuYWRkLnNwcml0ZSgzMiwgZ2FtZS53b3JsZC5oZWlnaHQgLSAxNTAsIFwiY2FyXCIpO1xyXG5cclxuICAgICAgICAgICAgZ2FtZS5waHlzaWNzLnAyLmVuYWJsZShfc2hpcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNoaXBCb2R5ID0gKFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLlAyLkJvZHkpIF9zaGlwLmJvZHk7XHJcblxyXG4gICAgICAgICAgICBfYnVsbGV0cy5mb3JFYWNoQWxpdmUoKEFjdGlvbjxSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlPikgTW92ZUJ1bGxldHMsIHRoaXMpOyAvL21ha2UgYnVsbGV0cyBhY2NlbGVyYXRlIHRvIHNoaXBcclxuXHJcbiAgICAgICAgICAgIGlmIChfY3Vyc29ycy5sZWZ0LmlzRG93bilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2hpcEJvZHkucm90YXRlTGVmdCgxMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF9jdXJzb3JzLnJpZ2h0LmlzRG93bilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2hpcEJvZHkucm90YXRlUmlnaHQoMTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNoaXBCb2R5LnNldFplcm9Sb3RhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoX2N1cnNvcnMudXAuaXNEb3duKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaGlwQm9keS50aHJ1c3QoNDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfY3Vyc29ycy5kb3duLmlzRG93bilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2hpcEJvZHkucmV2ZXJzZSg0MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTW92ZUJ1bGxldHMoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSBidWxsZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBY2NlbGVyYXRlVG9PYmplY3QoYnVsbGV0LCBfc2hpcCwgMzApOyAvL3N0YXJ0IGFjY2VsZXJhdGVUb09iamVjdCBvbiBldmVyeSBidWxsZXRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBY2NlbGVyYXRlVG9PYmplY3QoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSBvYmoxLCBSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlIG9iajIsIGRvdWJsZSBzcGVlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkb3VibGUuSXNOYU4oc3BlZWQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcGVlZCA9IDYwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgb2JqMUJvZHkgPSAoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlBoeXNpY3MuUDIuQm9keSkgb2JqMS5ib2R5O1xyXG5cclxuICAgICAgICAgICAgdmFyIGFuZ2xlID0gZXM1Lk1hdGguYXRhbjIob2JqMi55IC0gb2JqMS55LCBvYmoyLnggLSBvYmoxLngpO1xyXG5cclxuICAgICAgICAgICAgb2JqMUJvZHkucm90YXRpb24gPSBhbmdsZSArIGVzNS5NYXRoLlBJIC8gMjsgLy8gY29ycmVjdCBhbmdsZSBvZiBhbmdyeSBidWxsZXRzIChkZXBlbmRzIG9uIHRoZSBzcHJpdGUgdXNlZClcclxuICAgICAgICAgICAgb2JqMUJvZHkuZm9yY2UueCA9IGVzNS5NYXRoLmNvcyhhbmdsZSkgKiBzcGVlZDsgLy8gYWNjZWxlcmF0ZVRvT2JqZWN0IFxyXG4gICAgICAgICAgICBvYmoxQm9keS5mb3JjZS55ID0gZXM1Lk1hdGguc2luKGFuZ2xlKSAqIHNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIlxyXG5uYW1lc3BhY2UgUGhhc2VyRGVtby5HYW1lc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gT3JpZ2luYWwgRGVtbyBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9waGFzZXIuaW8vZXhhbXBsZXMvdjIvYmFzaWNzLzAzLW1vdmUtYW4taW1hZ2VcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgR2FtZVN0YXRlMyA6IEFic3RyYWN0R2FtZVN0YXRlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgUHJlbG9hZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnYW1lLmxvYWQuY3Jvc3NPcmlnaW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoXCJlaW5zdGVpblwiLCBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9waG90b25zdG9ybS9waGFzZXItZXhhbXBsZXMvbWFzdGVyL2V4YW1wbGVzL2Fzc2V0cy9waWNzL3JhX2VpbnN0ZWluLnBuZ1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIENyZWF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgVGhpcyBjcmVhdGVzIGEgc2ltcGxlIHNwcml0ZSB0aGF0IGlzIHVzaW5nIG91ciBsb2FkZWQgaW1hZ2UgYW5kXHJcbiAgICAgICAgICAgIC8vICBkaXNwbGF5cyBpdCBvbi1zY3JlZW5cclxuICAgICAgICAgICAgLy8gIGFuZCBhc3NpZ24gaXQgdG8gYSB2YXJpYWJsZVxyXG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSBnYW1lLmFkZC5zcHJpdGUoMCwgMCwgXCJlaW5zdGVpblwiKTtcclxuXHJcbiAgICAgICAgICAgIGdhbWUucGh5c2ljcy5lbmFibGUoaW1hZ2UsIFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW1hZ2VCb2R5ID0gKFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLkFyY2FkZS5Cb2R5KWltYWdlLmJvZHk7XHJcbiAgICAgICAgICAgIGltYWdlQm9keS52ZWxvY2l0eS54ID0gMTUwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
