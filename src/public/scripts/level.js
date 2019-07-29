class Level {

    constructor( renderer ) {

        this.renderer = renderer;
        this.gravity = 20;

        this.player = new Player( this );
        this.commands = new Commands( this.player );

        this.npcs = [
            new NPC({
                level: this,
                texture: 'images/Cactus-tile-sheet.png',
                route: [
                    { positionX: 200.0, positionY: 20.0 },
                    { positionX: 400.0, positionY: 20.0 },
                    { positionX: 200.0, positionY: 20.0 }
                ]
            })
        ];

        this.obstacles = [
            new Heart({
                level: this, 
                positionX: 100, 
                positionY: 30, 
                width: 32, 
                height: 32, 
                texture: '/images/heart.png'
            }),

            new Obstacle({
                level: this, 
                positionX: 0, 
                positionY: 0, 
                width: 1000, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new Obstacle({
                level: this, 
                positionX: 1000, 
                positionY: 100, 
                width: 200, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new Obstacle({
                level: this, 
                positionX: 1200, 
                positionY: 200, 
                width: 200, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new Obstacle({
                level: this, 
                positionX: 1400, 
                positionY: 300, 
                width: 200, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new Obstacle({
                level: this, 
                positionX: 1000, 
                positionY: 400, 
                width: 200, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new Obstacle({
                level: this, 
                positionX: 1400, 
                positionY: 550, 
                width: 200, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new Spike({
                level: this, 
                positionX: 1400, 
                positionY: 570, 
                width: 20, 
                height: 20, 
                texture: '/images/spike.png'
            }),
            new Obstacle({
                level: this, 
                positionX: 500, 
                positionY: 700, 
                width: 700, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new Obstacle({
                level: this, 
                positionX: 300, 
                positionY: 700, 
                width: 100, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new Obstacle({
                level: this, 
                positionX: 0, 
                positionY: 700, 
                width: 200, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new Trampoline({
                level: this, 
                positionX: 0, 
                positionY: 720, 
                width: 100, 
                height: 20, 
                texture: '/images/trampoline.png'
            }),
            new Obstacle({
                level: this, 
                positionX: 100, 
                positionY: 1420, 
                width: 400, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new Moving({
                level: this,
                positionX: 500,
                positionY: 1420,
                width: 100,
                height: 20,
                texture: '/images/sand.png',
                endPosX: 900,
                endPosY: 1420
            }),
            new Obstacle({
                level: this,
                positionX: 1000,
                positionY: 1420,
                width: 200,
                height: 20,
                texture: '/images/sand.png',
            }),
            new Obstacle({
                level: this,
                positionX: 780,
                positionY: 1580,
                width: 100,
                height: 20,
                texture: '/images/sand.png',
            }),
            new Obstacle({
                level: this,
                positionX: 780,
                positionY: 1600,
                width: 20,
                height: 100,
                texture: '/images/sand.png',
            }),
            new Obstacle({
                level: this,
                positionX: 700,
                positionY: 1700,
                width: 100,
                height: 20,
                texture: '/images/sand.png',
            }),
            new Obstacle({
                level: this,
                positionX: 700,
                positionY: 1720,
                width: 20,
                height: 100,
                texture: '/images/sand.png',
            }),
            new Obstacle({
                level: this,
                positionX: 0,
                positionY: 1820,
                width: 720,
                height: 20,
                texture: '/images/sand.png',
            }),
            new Obstacle({
                level: this,
                positionX: 0,
                positionY: 1970,
                width: 100,
                height: 20,
                texture: '/images/sand.png',
            }),
        ];

    }

    update() {

        for( let obstacle of this.obstacles ) {
            if( obstacle.type === OBSTACLE_TYPE_MOVING ) {
                obstacle.update();
            }
        }

        for( let npc of this.npcs ) {
            npc.update();
        }

        this.commands.update();
        this.player.update();

    }

    draw( gl ) {

        this.player.draw( gl );

        for( let obstacle of this.obstacles ) {
            obstacle.draw( gl );
        }

        for( let npc of this.npcs ) {
            npc.draw( gl );
        }

    }

}