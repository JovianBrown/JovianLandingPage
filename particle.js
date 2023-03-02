class Boid
{
    constructor()
    {
        this.position = createVector(windowWidth*Math.random(), windowHeight*Math.random());
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();
        this.active = true;
        this.strokeWeight = Math.random()*3;
        this.numberOfConnections = 0; //store each connected boid, see if we for a triangle
    }
    update()
    {
        if(this.active)
        {
            this.position.add(this.velocity);
            this.velocity.add(p5.Vector.random2D()*.01*this.getNegOrPos());
        }
        
       
    }
    draw()
    {
        if(this.active)
        {
            strokeWeight(this.strokeWeight);
            stroke(this.position.x);
            point(this.position.x, this.position.y);
        }
    }
    
    getNegOrPos()
    {
        let negOrPos = 0;
        if(Math.floor(Math.random()*2<=1))
        {
          negOrPos = -1;
        }
        else
        {
            negOrPos = 1;
        }
        return negOrPos;
    }
}


