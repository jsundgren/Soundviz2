var song, analyzer;
var w;
var filter;

function preload(){
    song = loadSound('tt.ogg');
}

function setup(){
    createCanvas(0.75*windowWidth, 0.75*windowHeight,WEBGL);
    colorMode(HSB);
    song.loop();
    analyzer = new p5.Amplitude();
    analyzer.setInput(song);
    fft = new p5.FFT(0.8,64);
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
            rotateY(frameCount * 0.0005);
            push();
                translate(2*i*w,y,0);
                ambientMaterial(i,255,255);
                sphere(30+rms*10);
            pop();
        }
    pop();
}

function pause(){
    if(song.isPlaying()){
        song.pause();
        document.getElementById("ppToggle").innerHTML = "&#9654;";
    }else{
        song.play();
        document.getElementById("ppToggle").innerHTML = "&#9724;";
    }
}

function windowResized() {
  resizeCanvas(0.75*windowWidth, 0.75*windowHeight);
}