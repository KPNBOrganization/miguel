class Moving extends Obstacle {

    constructor( props ) {

        super( props );

        this.type = OBSTACLE_TYPE_MOVING;

        this.startPosX = this.positionX;
        this.startPosY = this.positionY;

        this.endPosX = props.endPosX;
        this.endPosY = props.endPosY;

    }

    update() {

        let positionX = - ( this.endPosX - this.startPosX ) / 2 * Math.cos( Date.now() / 500 ) + this.startPosX + ( this.endPosX - this.startPosX ) / 2;
        let positionY = - ( this.endPosY - this.startPosY ) / 2 * Math.cos( Date.now() / 500 ) + this.startPosY + ( this.endPosY - this.startPosY ) / 2;

        this.velocityX = ( positionX - this.positionX ) / this.level.renderer.deltaTime;
        this.velocityY = ( positionY - this.positionY ) / this.level.renderer.deltaTime;

        this.positionX = positionX;
        this.positionY = positionY;

    }

}