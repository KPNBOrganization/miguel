function Texture() {

    this.load = function( gl, source, texture ) {
        
        gl.bindTexture( gl.TEXTURE_2D, texture );

        // Because loading the image may take some time, loading a 1x1 placeholder
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array( [ 255, 255, 255, 255 ] ) );

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

        var image = new Image();

        image.onload = () => {

            gl.bindTexture( gl.TEXTURE_2D, texture );

            gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
            
            gl.bindTexture( gl.TEXTURE_2D, null );

        };

        image.src = source;

    };

    return this;

}