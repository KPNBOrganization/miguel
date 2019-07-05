const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;
const KEY_A = 65;
const KEY_SPACE = 32;

class Commands {

    constructor( player ) {

        this.player = player;
        this.keys = [];

        window.addEventListener( 'keydown', ( event ) => this.keyDownEventHandler( event ) );
        window.addEventListener( 'keyup', ( event ) => this.keyUpEventHandler( event ) );

    }

    keyDownEventHandler( event ) {
        
        this.keys[ event.keyCode ] = true;

    }

    keyUpEventHandler( event ) {

        this.keys[ event.keyCode ] = false;

    }

    update() {

        if( this.keys[ KEY_SPACE ] || this.keys[ KEY_W ] ) {

            this.player.jump();

        }

        if( this.keys[ KEY_A ] ) {

            this.player.startMove( -1.0 );

        }

        if( this.keys[ KEY_D ] ) {

            this.player.startMove( 1.0 );

        }

        if( this.keys[ KEY_A ] !== true && this.keys[ KEY_D ] !== true ) {

            this.player.endMove();

        }

    }

}