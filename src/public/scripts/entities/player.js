class Player extends Entity {

    constructor( props ) {

        super( props );

        this.direction = 1;

        this.parentNode = null;
        this.onGround = true;

        this.parentNodeOffsetX = 0;

        this.tileCount = { x: 5, y: 1 }; // Number of tiles accordingly

        this.animationTime = 0.0;

        this.type = ENTITY_TYPE_PLAYER;

        this.loadTexture( this.level.renderer.ctx );

    }

    update() {

        let velocityX = this.velocityX;
        let velocityY = this.velocityY - this.level.gravity;

        let parentNode = null;
        
        let positionX = 0;
        let positionY = 0;

        let parentNodeOffsetX = this.parentNodeOffsetX;

        if( this.parentNode ) {

            positionX = this.parentNode.positionX + parentNodeOffsetX + velocityX * this.level.renderer.deltaTime;
            positionY = this.parentNode.positionY + this.parentNode.height + velocityY * this.level.renderer.deltaTime;

        } else {

            positionX = this.positionX + velocityX * this.level.renderer.deltaTime;
            positionY = this.positionY + velocityY * this.level.renderer.deltaTime;

        }

        let onGround = false;

        // Out of map check

        if( positionY < -200.00 ) {

            velocityY = 0.00;

            positionX = 0.00;
            positionY = 20.00;

            onGround = true;
            parentNode = null;

        } else {
            
            for( let entity of this.level.entities ) {

                if( this.detectCollision( entity, positionX, positionY ) == true ) {

                    if( entity.type === ENTITY_TYPE_SPIKE ) {
                        
                        velocityY = 0.00;

                        positionX = 0.00;
                        positionY = 20.00;
            
                        onGround = true;

                        break;

                    }

                    // Detecting, where we hit the entity
                    
                    if( this.positionY >= entity.positionY + entity.height ) {
                        
                        if( entity.type === ENTITY_TYPE_TRAMPOLINE ) {

                            velocityY = 1000.0;

                        } else {

                            velocityY = 0;

                            parentNodeOffsetX = positionX - entity.positionX;

                            positionY = entity.positionY + entity.height;

                            onGround = true;
                            parentNode = entity;

                        }

                    } else if( this.positionY + this.height <= entity.positionY ) {

                        velocityY = -this.level.gravity; 
                        positionY = entity.positionY - this.height;

                    } else if( this.positionX < entity.positionX ) {

                        velocityX = 0;
                        positionX = entity.positionX - this.width;

                    } else if( this.positionX > entity.positionX ) {

                        velocityX = 0;
                        positionX = entity.positionX + entity.width;

                    }

                }

            }

        }

        this.velocityX = velocityX;
        this.velocityY = velocityY;

        this.positionX = positionX;
        this.positionY = positionY;

        this.onGround = onGround;
        this.parentNode = parentNode;

        this.parentNodeOffsetX = parentNodeOffsetX;

        this.level.renderer.camera.update( this );

    }

    initTextureBuffer( gl ) {

        var textureCoordsBuffer = gl.createBuffer();

        gl.bindBuffer( gl.ARRAY_BUFFER, textureCoordsBuffer );

        let tileIndex;
        let numTiles;
        let animationSpeed = 1.5;

        if( this.onGround ) {

            if( this.velocityX === 0 ) {

                tileIndex = 0;
                numTiles = 2;

            } else {

                animationSpeed = 3.5;
                tileIndex = 3;
                numTiles = 2;

            }

        } else {

            tileIndex = 2;
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

    }

    jump() {

        if( this.onGround ) {

            this.velocityY = 500.0;
            this.onGround = false;
            this.parentNode = null;

        }

    }

    startMove( direction ) {

        this.direction = direction;
        this.velocityX = direction * 300;

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

        return result;

    }

}