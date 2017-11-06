var song, analyzer;
var w;
var filter;

function preload(){
    song = loadSound('fy.ogg');
}

function setup(){
    createCanvas(0.75*windowWidth, 0.75*windowHeight,WEBGL);
    colorMode(HSB);
    song.loop();
    filter = new p5.HighPass();
    analyzer = new p5.Amplitude();
    analyzer.setInput(song);
    fft = new p5.FFT(0.9,64);
    fft.setInput(song);
    w = width / 64;
}

function draw(){
    background(360,0,93);
    var spectrum = fft.analyze();
    ambientLight(100);
    translate(0,-height,-1000);   
    rotateX(PI/4);
    push();
    var rms = analyzer.getLevel();
        for(var i = 0; i < spectrum.length; i++){
            var amp = spectrum[i];
            var y = map(amp, 0, 255, height, 0);
            rotateY(frameCount * 0.0003);
            push();
                translate(2*i*w,y,0);
                ambientMaterial(i,255,255);
                sphere(30);
            pop();
        }
    pop();
}

function windowResized() {
  resizeCanvas(0.75*windowWidth, 0.75*windowHeight);
}