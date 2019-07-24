var renderer = null;

window.onload = function() {

    var canvas = document.getElementById( 'canvas' );
    var ctx = canvas.getContext( 'webgl', { premultipliedAlpha: false } );

    ctx.clearColor( 0.36, 0.58, 0.98, 1.0 );
    ctx.enable( ctx.DEPTH_TEST );
    ctx.depthFunc( ctx.LEQUAL );
    ctx.clear( ctx.COLOR_BUFFER_BIT );

    renderer = new Renderer( ctx, canvas );
    
    renderer.loop();

};