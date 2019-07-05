class Renderer {
    
    constructor( ctx, canvas ) {

        this.ctx = ctx;

        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        this.lastFrameTime = Date.now();
        this.currentFrameTime = Date.now();
        this.deltaTime = ( this.currentFrameTime - this.lastFrameTime ) / 1000;

        this.vertexPositionAttribute = null;
        this.vertexColorAttribute = null;
        this.vertexTexCoordAttribute = null;

        this.vertexTransformUniform = null;
        this.vertexViewUniform = null;
        this.vertexProjectionUniform = null;

        this.fragSamplerUniform = null;

        this.projectionMatrix = new THREE.Matrix4();
            
        this.projectionMatrix.makePerspective( 
            -this.ctx.canvas.width / 2, 
            this.ctx.canvas.width / 2, 
            this.ctx.canvas.height / 2, 
            -this.ctx.canvas.height / 2, 
            1.0, 
            100 
        );

        this.viewMatrix = new THREE.Matrix4();
        this.viewMatrix.makeTranslation( 0.0, 0.0, -1.0 );

        this.initShaders( this.ctx );

        this.camera = new Camera( this );
        this.level = new Level( this );

    }

    loadShader( gl, type ) {

        var shaderScript = document.getElementById( type );
        var shaderSource = shaderScript.innerHTML;
        var shader = null;

        if( shaderScript.type == 'x-shader/x-fragment' ) {

            shader = gl.createShader( gl.FRAGMENT_SHADER );

        } else if( shaderScript.type == 'x-shader/x-vertex' ) {

            shader = gl.createShader( gl.VERTEX_SHADER );

        }

        gl.shaderSource( shader, shaderSource );
        gl.compileShader( shader );

        if( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {

            console.error( 
                "An error occured compiling the shaders", 
                gl.getShaderInfoLog( shader ) 
            );

            return null;

        }

        return shader;

    }

    initShaders( gl ) {

        var vertexShader    = this.loadShader( gl, 'shader-vs' );
        var fragmentShader  = this.loadShader( gl, 'shader-fs' );

        var shaderProgram = gl.createProgram();

        gl.attachShader( shaderProgram, vertexShader );
        gl.attachShader( shaderProgram, fragmentShader );
        gl.linkProgram( shaderProgram );

        if ( !gl.getProgramParameter( shaderProgram, gl.LINK_STATUS ) ) {
            console.error( 'Unable to initialize the shader program.' );
        }

        gl.useProgram( shaderProgram );

        this.vertexPositionAttribute = gl.getAttribLocation( shaderProgram, 'aVertexPosition' );
        gl.enableVertexAttribArray( this.vertexPositionAttribute );

        this.vertexTexCoordAttribute = gl.getAttribLocation( shaderProgram, 'aTextureCoord' );
        gl.enableVertexAttribArray( this.vertexTexCoordAttribute );

        // this.vertexColorAttribute = gl.getAttribLocation( shaderProgram, 'aVertexColor' );
        // gl.enableVertexAttribArray( this.vertexColorAttribute );

        this.vertexTransformUniform = gl.getUniformLocation( shaderProgram, 'uTransformMatrix' );
        this.vertexViewUniform = gl.getUniformLocation( shaderProgram, 'uViewMatrix' );
        this.vertexProjectionUniform = gl.getUniformLocation( shaderProgram, 'uProjectionMatrix' );

        this.fragSamplerUniform = gl.getUniformLocation( shaderProgram, 'uSampler' );

    }

    update() {

        this.currentFrameTime = Date.now();
        this.deltaTime = ( this.currentFrameTime - this.lastFrameTime ) / 1000;
        this.lastFrameTime = this.currentFrameTime;

        this.level.update();

    }

    draw( gl ) {

        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        this.level.draw( gl );

    }

    loop() {

        this.update();

        this.draw( this.ctx );

        window.requestAnimationFrame( () => this.loop() );
        
    }

}