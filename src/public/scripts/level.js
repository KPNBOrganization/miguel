class Level {

    constructor( renderer ) {

        this.renderer = renderer;
        this.gravity = 20;

        this.player = new Player({
            level: this,
            positionX: 0,
            positionY: 20,
            width: 84,
            height: 128,
            texture: 'images/Miguels-tile-sheet.png'
        });

        this.commands = new Commands( this.player );

        this.entities = [

            // Player
            this.player,

            // NPCs
            new NPCCactus({
                level: this,
                texture: 'images/Cactus-tile-sheet.png',
                route: [
                    { positionX: 400.0, positionY: 20.0 },
                    { positionX: 800.0, positionY: 20.0 },
                    { positionX: 400.0, positionY: 20.0 }
                ]
            }),
            new NPCCactus({
                level: this,
                texture: 'images/Cactus-tile-sheet.png',
                route: [
                    { positionX: 650.0, positionY: 720.0 },
                    { positionX: 1050.0, positionY: 720.0 },
                    { positionX: 650.0, positionY: 720.0 }
                ]
            }),
            new NPCCactus({
                level: this,
                texture: 'images/Cactus-tile-sheet.png',
                route: [
                    { positionX: 100.0, positionY: 1840.0 },
                    { positionX: 620.0, positionY: 1840.0 },
                    { positionX: 100.0, positionY: 1840.0 }
                ]
            }),

            // Platforms
            new PlatformStatic({ // Level 1
                level: this, 
                positionX: 0, 
                positionY: 0, 
                width: 1000, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new PlatformStatic({
                level: this, 
                positionX: 1000, 
                positionY: 100, 
                width: 200, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new PlatformStatic({
                level: this, 
                positionX: 1200, 
                positionY: 200, 
                width: 200, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new PlatformStatic({
                level: this, 
                positionX: 1400, 
                positionY: 300, 
                width: 200, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new PlatformStatic({
                level: this, 
                positionX: 1000, 
                positionY: 400, 
                width: 200, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new PlatformStatic({
                level: this, 
                positionX: 1400, 
                positionY: 550, 
                width: 200, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new PlatformSpike({
                level: this, 
                positionX: 1400, 
                positionY: 570, 
                width: 20, 
                height: 20, 
                texture: '/images/spike.png'
            }),
            new PlatformStatic({ // Level 2
                level: this, 
                positionX: 500, 
                positionY: 700, 
                width: 700, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            /*new PlatformStatic({
                level: this, 
                positionX: 300, 
                positionY: 700, 
                width: 100, 
                height: 20, 
                texture: '/images/sand.png'
            }),*/
            new PlatformStatic({
                level: this, 
                positionX: 0, 
                positionY: 700, 
                width: 200, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new PlatformTrampoline({
                level: this, 
                positionX: 0, 
                positionY: 720, 
                width: 100, 
                height: 20, 
                texture: '/images/trampoline.png'
            }),
            new PlatformStatic({ // Level 3
                level: this, 
                positionX: 100, 
                positionY: 1420, 
                width: 400, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new PlatformMoving({
                level: this,
                positionX: 500,
                positionY: 1420,
                width: 100,
                height: 20,
                texture: '/images/sand.png',
                endPosX: 900,
                endPosY: 1420
            }),
            new PlatformStatic({
                level: this,
                positionX: 1000,
                positionY: 1420,
                width: 200,
                height: 20,
                texture: '/images/sand.png',
            }),
            new PlatformStatic({
                level: this,
                positionX: 780,
                positionY: 1580,
                width: 100,
                height: 20,
                texture: '/images/sand.png',
            }),
            new PlatformStatic({
                level: this,
                positionX: 780,
                positionY: 1600,
                width: 20,
                height: 100,
                texture: '/images/sand.png',
            }),
            new PlatformStatic({
                level: this,
                positionX: 700,
                positionY: 1700,
                width: 100,
                height: 20,
                texture: '/images/sand.png',
            }),
            new PlatformStatic({
                level: this,
                positionX: 700,
                positionY: 1720,
                width: 20,
                height: 100,
                texture: '/images/sand.png',
            }),
            new PlatformStatic({ // Level 4
                level: this,
                positionX: 0,
                positionY: 1820,
                width: 720,
                height: 20,
                texture: '/images/sand.png',
            }),
            new PlatformStatic({
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

        /*for( let obstacle of this.obstacles ) {
            if( obstacle.type === OBSTACLE_TYPE_MOVING ) {
                obstacle.update();
            }
        }

        for( let npc of this.npcs ) {
            npc.update();
        }*/

        this.commands.update();

        for( let entity of this.entities ) {
            entity.update();
        }

        
        // this.player.update();

    }

    draw( gl ) {

        /*this.player.draw( gl );

        for( let obstacle of this.obstacles ) {
            obstacle.draw( gl );
        }

        for( let npc of this.npcs ) {
            npc.draw( gl );
        }*/

        for( let entity of this.entities ) {
            entity.draw( gl );
        }

    }

}