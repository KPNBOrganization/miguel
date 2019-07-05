class Player {

    constructor( level ) {

        this.level = level;

        this.positionX = 0.0;
        this.positionY = 20.0;

        this.velocityX = 0.0;
        this.velocityY = 0.0;
        this.direction = 1;

        this.onGround = true;

        this.height = 128;
        this.width = 84;

        this.texture = null;
        this.tileCount = { x: 2, y: 1 }; // Number of tiles accordingly

        this.animationTime = 0.0;

        this.loadTexture( this.level.renderer.ctx );

    }

    update() {

        let velocityX = this.velocityX;
        let velocityY = this.velocityY - this.level.gravity;

        let positionX = this.positionX + velocityX * this.level.renderer.deltaTime;
        let positionY = this.positionY + velocityY * this.level.renderer.deltaTime;

        let onGround = false;

        // Out of map check

        if( positionY < -200.00 ) {

            velocityY = 0.00;

            positionX = 0.00;
            positionY = 20.00;

            onGround = true;

        } else {

            for( let obstacle of this.level.obstacles ) {

                if( this.detectCollision( obstacle, positionX, positionY ) == true ) {

                    // Detecting, where we hit the obstacle
                    
                    if( this.positionY >= obstacle.positionY + obstacle.height ) {
                        
                        velocityY = 0.00;
                        positionY = obstacle.positionY + obstacle.height;
                        onGround = true;

                    } else if( this.positionY + this.height <= obstacle.positionY ) {

                        velocityY = -this.level.gravity; 
                        positionY = obstacle.positionY - this.height;

                    } else if( this.positionX < obstacle.positionX ) {

                        positionX = obstacle.positionX - this.width;

                    } else if( this.positionX > obstacle.positionX ) {

                        positionX = obstacle.positionX + obstacle.width;

                    }

                }

            }

        }

        this.velocityX = velocityX;
        this.velocityY = velocityY;

        this.positionX = positionX;
        this.positionY = positionY;

        this.onGround = onGround;

        this.level.renderer.camera.update( this );

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

        let tileIndex;
        let numTiles;
        let animationSpeed = 1.5;

        if( this.onGround ) {

            tileIndex = 0;
            numTiles = 2;

        } else {

            tileIndex = 0;
            numTiles = 1;

        }

        tileIndex = tileIndex + Math.floor( this.animationTime ) % numTiles;

        this.animationTime += animationSpeed * this.level.renderer.deltaTime;

        var textureCoords = this.getTextureCoords( tileIndex, this.direction );

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

        // Binding View Matrix ( should we do it every time? )

        gl.uniformMatrix4fv( this.level.renderer.vertexViewUniform, false, new Float32Array( this.level.renderer.viewMatrix.toArray() ) );

        // Binding Projection matrix ( should we do it every time? )
        gl.uniformMatrix4fv( this.level.renderer.vertexProjectionUniform, false, new Float32Array( this.level.renderer.projectionMatrix.toArray() ) );

        // No shit, you should also use particular program every time you want to render some shit

        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    }

    jump() {

        if( this.onGround ) {

            this.velocityY = 500.0;
            this.onGround = false;

        }

    }

    startMove( direction ) {

        this.direction = direction;
        this.velocityX = direction * 500;

    }

    endMove() {

        this.velocityX = 0;

    }

    detectCollision( obstacle, positionX, positionY ) {
        
        if( positionX < obstacle.positionX + obstacle.width && 
            positionX + this.width > obstacle.positionX &&
            positionY < obstacle.positionY + obstacle.height &&
            positionY + this.height > obstacle.positionY ) {

            return true;

        }

        return false;

    }

    loadTexture( gl, tilesDims ) {

        this.texture = gl.createTexture();
        
        gl.bindTexture( gl.TEXTURE_2D, this.texture );

        // Because loading the image may take some time, loading a 1x1 placeholder
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array( [255, 255, 255, 255] ) );

        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );

        var image = new Image();

        image.onload = () => {

            gl.bindTexture( gl.TEXTURE_2D, this.texture );

            gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
            
            gl.bindTexture( gl.TEXTURE_2D, null );

        };

        image.src = 'images/Miguels-tile-sheet.png';

    }

    getTextureCoords( index, direction = 1 ) {

        let tileWidth = 1.0 / this.tileCount.x;
        let tileHeight = 1.0 / this.tileCount.y;

        let xCoord = tileWidth * index;
        let yCoord = 0.0;

        var result = [];

        if( direction == -1 ) {

            result = [
                xCoord, yCoord,
                xCoord + tileWidth, yCoord,
                xCoord, yCoord + tileHeight,
                xCoord + tileWidth, yCoord + tileHeight,
            ];

        } else {

            result = [
                xCoord + tileWidth, yCoord,
                xCoord, yCoord,
                xCoord + tileWidth, yCoord + tileHeight,
                xCoord, yCoord + tileHeight
            ];

        }

        /*var result = [
            1.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ];*/

        return result;

    }

}