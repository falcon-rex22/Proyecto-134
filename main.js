object_detector = "";
img = "";
status = "";
result = [];

function preload(){
    
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);

    object_detector = ml5.objectDetector("cocossd", modelLoaded);

    document.getElementById("status").innerHTML = "Detectando objetos";
    video.hide();
}

function modelLoaded(){
    console.log("modelo cargado");
    status = true;
}

 function gotResults(error, results){
     if(error){
        console.error(error);
    }

    else{
        console.log(results);
        result = results;
    }
}

function draw(){
    console.log("probando")

    image(video, 0, 0, 380, 380);

    //text("perro", 45, 75);
    //stroke("darkgreen");
    //noFill();
    //rect(30, 60, 450, 350);

    //text("gato", 320, 120);
    //stroke("grey");
    //noFill();
    //rect(300, 90, 270, 320);

    if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      
        object_detector.detect(video, gotResults);
        for (i = 0; i < result.length; i++) {
          document.getElementById("status").innerHTML = "Status : Objeto detectado";
          //document.getElementById("number_of_objects").innerHTML = "El número de objetos detectados es: "+ result.length;
 
          fill(r,g,b);
          nombre= result[i].label;
          console.log(nombre);
          porcentaje = floor(result[i].confidence * 100);
          posicionX= result[i].x
          posicionY= result[i].y
          ancho= result[i].width
          alto = result[i].height
          text(nombre + " " + porcentaje + "%",posicionX +15 , posicionY + 15);
          noFill();
          stroke(r,g,b);
          rect(posicionX, posicionY, ancho, alto );
        }
      }

}