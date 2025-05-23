// setup some globals 
var boids = [];
const totalBoids = 100; //total particle count
var navBar = document.getElementById("navigation"); 
var mouseVector;
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting)
        {
            entry.target.classList.add("show");
        }
        else
        {
            entry.target.classList.remove("show");
        }
    })
});
const hiddenElements = document.querySelectorAll(".skills-div > *");
hiddenElements.forEach((el) => observer.observe(el));
//////////

function setup() 
{
    window.scrollTo(0,0); 
    //particles for the background of the website //////
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent("canvas-html");
    
    var heading = document.querySelector(".heading");
    for(let i = 0; i < totalBoids; i++)
    {
        boids.push(new Boid()); //add new boid particle 
    }
    mouseVector = createVector(0,0);

}
    
const windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
}
  

const connectBoid = (boidA, boidB) =>
{
    let c = color(71, 227, 255);  //  fill(c); 
    strokeWeight(.1);
    stroke(c);
    line(boidA.position.x,boidA.position.y,boidB.position.x,boidB.position.y); //create a line between the 2 boids

}
const connectBoidMouse = (boidA, mouseVector) => 
{
    
  strokeWeight(.1);
  line(boidA.position.x,boidA.position.y,mouseVector.x,mouseVector.y);

}
const drawBoids = () => {
    let activeBoids = 0; //helps us keep track of our boid array. ensuring a minimum amount of boids
    for(let i  = 0; i < boids.length;i++)
    {
        if(boids[i].active)
        {
            if(boids[i].position.x>windowWidth || boids[i].position.y>windowHeight || boids[i].position.y<0 || boids[i].position.x<0)
            {
                boids[i].active = false;
                boids.splice(i,1)
            }         
            mouseVector.x = mouseX;
            mouseVector.y = mouseY;
            /// Acquire mouse Coordinates and put them in a vector so we can 
            //find the distance between the given boid vector and the mouse vector
            if(boids[i] && boids[i].position.dist(mouseVector)<300)
            { //if the boids are less than 300px from the mousevector, draw and update them
                boids[i].draw();
                boids[i].update();

                for(let j = 0; j < boids.length;j++)
                {
                    if(boids[i] && boids[j])
                    {
                        let distance = boids[i].position.dist(boids[j].position);
                        if(distance < 100 && i!=j ) //if boids are close to each other
                        {                           //draw a line between the two 
                            /// need to draw a skinny line form i to j
                            
                            connectBoid(boids[i],boids[j]);

                        }    
                    }
                } 
            }
            if(boids[i] && boids[i].position.dist(mouseVector)<150) 
            { //if boids are close to mouse draw a line between boid and mouse xy
                connectBoidMouse(boids[i],mouseVector);
            } 
           
            activeBoids++;
        } 
    }
    if(activeBoids<totalBoids)
    {
        boids.push(new Boid());
    }
}

function draw() 
{
    background(30);
    drawBoids();
}
