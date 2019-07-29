class PlatformStatic extends Entity {

    constructor( props ) {

        super( props );

        this.isTiledTexture = true;

        this.loadTexture( this.level.renderer.ctx );

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