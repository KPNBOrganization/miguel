class PlatformMoving extends Entity {

    constructor( props ) {

        super( props );

        this.type = ENTITY_TYPE_MOVING;

        this.startPosX = this.positionX;
        this.startPosY = this.positionY;

        this.endPosX = props.endPosX;
        this.endPosY = props.endPosY;

        this.isTiledTexture = true;

        this.loadTexture( this.level.renderer.ctx );

    }

    update() {

        let positionX = - ( this.endPosX - this.startPosX ) / 2 * Math.cos( Date.now() / 500 ) + this.startPosX + ( this.endPosX - this.startPosX ) / 2;
        let positionY = - ( this.endPosY - this.startPosY ) / 2 * Math.cos( Date.now() / 500 ) + this.startPosY + ( this.endPosY - this.startPosY ) / 2;

        this.velocityX = ( positionX - this.positionX ) / this.level.renderer.deltaTime;
        this.velocityY = ( positionY - this.positionY ) / this.level.renderer.deltaTime;

        this.positionX = positionX;
        this.positionY = positionY;

    }

    initTextureBuffer( gl ) {

        var textureCoordsBuffer = gl.createBuffer();

        gl.bindBuffer( gl.ARRAY_BUFFER, textureCoordsBuffer );

        var textureCoords = [
            this.width / 32, 0.0,
            0.0, 0.0,
            this.width / 32, this.height / 32,
            0.0, this.height / 32
        ];

        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( textureCoords ), gl.STATIC_DRAW );

        gl.vertexAttribPointer(
            this.level.renderer.vertexTexCoordAttribute, 
            2, 
            gl.FLOAT, 
            false, 
            0, 
            0
        );

        gl.activeTexture( gl.TEXTURE0 );

        gl.bindTexture( gl.TEXTURE_2D, this.texture );

        gl.uniform1i( this.level.renderer.fragSamplerUniform, 0 );

    }

}