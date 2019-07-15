class Moving extends Obstacle {

    constructor( props ) {

        super( props );

        this.type = OBSTACLE_TYPE_MOVING;

        this.startPosX = this.positionX;
        this.startPosY = this.positionY;

        this.endPosX = props.endPosX;
        this.endPosY = props.endPosY;

        this.velocityX = 0;
        this.velocityY = 0;

    }

    update() {


        this.velocityX = Math.sin( Date.now() * Math.PI / 180 );

        this.positionX = this.startPosX + this.velocityX * this.level.renderer.deltaTime;
 

        // this.positionX = - ( this.endPosX - this.startPosX ) / 2 * Math.cos( Date.now() / 500 ) + this.startPosX + ( this.endPosX - this.startPosX ) / 2;
        // this.positionY = - ( this.endPosY - this.startPosY ) / 2 * Math.cos( Date.now() / 500 ) + this.startPosY + ( this.endPosY - this.startPosY ) / 2;

    }

}