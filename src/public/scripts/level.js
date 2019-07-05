class Level {

    constructor( renderer ) {

        this.renderer = renderer;
        this.gravity = 20;

        this.player = new Player( this );
        this.commands = new Commands( this.player );

        this.obstacles = [
            new Obstacle( this, 0, 0, this.renderer.canvasWidth, 20 ),
            new Obstacle( this, 200, 20, 100, 20 ),
            new Obstacle( this, 400, 50, 100, 70 )
        ];

    }

    update() {

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