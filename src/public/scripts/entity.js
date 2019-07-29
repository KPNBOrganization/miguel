class Entity {

    constructor( props ) {

        this.level = props.level;

        this.positionX = props.positionX;
        this.positionY = props.positionY;

        this.width = props.width;
        this.height = props.height;

        this.velocityX = 0;
        this.velocityY = 0;

        this.textureSrc = props.texture;
        this.texture = null;
        this.isTiledTexture = false;

        this.type = props.type;

    }

    update() {

    }

    draw( gl ) {

        this.initVertexBuffer( gl );
        this.initTextureBuffer( gl );
        this.initTransformationMatrix( gl );
        this.bindViewMatrix( gl );
        this.bindProjectionMatrix( gl );
        this.drawTriangles( gl );

    }

    initVertexBuffer( gl ) {

        var vertexBuffer = gl.createBuffer();

        gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );

        var vertices = [
            this.width, this.height, 0.0,
            0.0, this.height, 0.0,
            this.width, 0.0, 0.0,
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

    }

    initTextureBuffer( gl ) {

        var textureCoordsBuffer = gl.createBuffer();

        gl.bindBuffer( gl.ARRAY_BUFFER, textureCoordsBuffer );
        
        // TODO: Make a method, that will return texture coordinates
        var textureCoords = [
            1.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
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

    initTransformationMatrix( gl ) {

        var transformationMatrix = new THREE.Matrix4();

        transformationMatrix.makeTranslation( this.positionX, this.positionY, 0.0 );

        gl.uniformMatrix4fv( this.level.renderer.vertexTransformUniform, false, new Float32Array( transformationMatrix.toArray() ) );

    }

    bindViewMatrix( gl ) {

        gl.uniformMatrix4fv( this.level.renderer.vertexViewUniform, false, new Float32Array( this.level.renderer.viewMatrix.toArray() ) );

    }

    bindProjectionMatrix( gl ) {

        gl.uniformMatrix4fv( this.level.renderer.vertexProjectionUniform, false, new Float32Array( this.level.renderer.projectionMatrix.toArray() ) );

    }

    drawTriangles( gl ) {

        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    }

    loadTexture( gl ) {

        this.texture = gl.createTexture();
        
        gl.bindTexture( gl.TEXTURE_2D, this.texture );

        // Because loading the image may take some time, loading a 1x1 placeholder
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array( [255, 255, 255, 255] ) );

        if( this.isTiledTexture ) {

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

        } else {

            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );

        }

        var image = new Image();

        image.onload = () => {

            gl.bindTexture( gl.TEXTURE_2D, this.texture );

            gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
            
            gl.bindTexture( gl.TEXTURE_2D, null );

        };

        image.src = this.textureSrc;

    }

}