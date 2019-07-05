class Camera {

    constructor( renderer ) {

        this.renderer = renderer;

        this.positionX = 0.00;
        this.positionY = 0.00;

    }

    update( player ) {

        this.positionX = -( player.positionX + player.width / 2 );
        this.positionY = -( player.positionY + player.height / 2 );

        this.renderer.viewMatrix.makeTranslation( this.positionX, this.positionY, -1.0 );

    }

}