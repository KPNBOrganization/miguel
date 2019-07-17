class Level {

    constructor( renderer ) {

        this.renderer = renderer;
        this.gravity = 20;

        this.player = new Player( this );
        this.commands = new Commands( this.player );

        /*this.obstacles = [
            new Obstacle( this, 0, 0, this.renderer.canvasWidth, 20, '/images/sand.png' ),
            new Trampoline( this, 200, 20, 100, 20, '/images/trampoline.png' ),
            new Obstacle( this, 400, 50, 100, 70, '/images/sand.png' )
        ];*/

        this.obstacles = [
            new Obstacle({
                level: this, 
                positionX: 0, 
                positionY: 0, 
                width: this.renderer.canvasWidth, 
                height: 20, 
                texture: '/images/sand.png'
            }),
            new Trampoline({
                level: this, 
                positionX: 200, 
                positionY: 20, 
                width: 100, 
                height: 20, 
                texture: '/images/trampoline.png'
            }),
            new Obstacle({
                level: this, 
                positionX: 400, 
                positionY: 50, 
                width: 100, 
                height: 70, 
                texture: '/images/sand.png'
            }),
            new Moving({
                level: this,
                positionX: 200,
                positionY: 100,
                width: 100,
                height: 20,
                texture: '/images/sand.png',
                endPosX: 300,
                endPosY: 100
            })
        ];

    }

    update() {

        for( let obstacle of this.obstacles ) {
            if( obstacle.type === OBSTACLE_TYPE_MOVING ) {
                obstacle.update();
            }
        }

        this.commands.update();
        this.player.update();

    }

    draw( gl ) {

        this.player.draw( gl );

        for( let obstacle of this.obstacles ) {
            
            obstacle.draw( gl );

        }

    }

}