class Obstacle {

    constructor( level, positionX, positionY, width, height ) {

        this.level = level;
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;

        this.texture = this.level.renderer.ctx.createTexture();

        Texture().load( this.level.renderer.ctx, 'images/sand.png', this.texture );

    }

    draw( gl ) {

        var vertexBuffer = gl.createBuffer();

        // Initializing Vertex Buffer

        gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );

        var vertices = [
            this.width,  this.height,  0.0,
            0.0, this.height,  0.0,
            this.width,  0.0, 0.0,
            0.0, 0.0, 0.0
        ];

        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

        gl.vertexAttribPointer( 
            this.level.renderer.vertexPositionAttribute,
            3,
            gl.FLOAT,
            false,
            0,
            0
        );

        // Initializing Texture Buffer

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

        // Initializing Transformation matrix

        var transformationMatrix = new THREE.Matrix4();

        transformationMatrix.makeTranslation( this.positionX, this.positionY, 0.0 );

        gl.uniformMatrix4fv( this.level.renderer.vertexTransformUniform, false, new Float32Array( transformationMatrix.toArray() ) );

        // Binding Projection matrix ( should we do it every time? )
        gl.uniformMatrix4fv( this.level.renderer.vertexProjectionUniform, false, new Float32Array( this.level.renderer.projectionMatrix.toArray() ) );

        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );   

    }

    /*loadTexture( gl ) {

        this.texture = gl.createTexture();
        
        gl.bindTexture( gl.TEXTURE_2D, this.texture );

        // Because loading the image may take some time, loading a 1x1 placeholder
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array( [ 255, 255, 255, 255 ] ) );

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

        var image = new Image();

        image.onload = () => {

            gl.bindTexture( gl.TEXTURE_2D, this.texture );

            gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
            
            gl.bindTexture( gl.TEXTURE_2D, null );

        };

        image.src = 'images/sand.png';

    }*/

}