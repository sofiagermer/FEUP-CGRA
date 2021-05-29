import {CGFobject, CGFtexture, CGFappearance} from '../../../../../lib/CGF.js';

export class MyRock  extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks, scaleX, scaleY, scaleZ, transX, transZ, rot) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.initBuffers(); 
    this.setScaling(scaleX, scaleY, scaleZ);
    this.setPosition(transX, 1, transZ);
    this.setInitialPosition(transX, 1, transZ);
    this.inNest = this.rockInNest(transX,1, transZ);
    this.rot = rot;
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
  
    var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var rand = Math.random();
        var aux = rand < 0.5 ? -1 : 1;
        var x = Math.cos(theta) * sinPhi;
        x += x * rand * aux;
        var y = cosPhi;
        //y += y * rand* aux;
        var z = Math.sin(-theta) * sinPhi;
        z += z * rand * aux;
        this.vertices.push(x, y, z);

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        // To be done... 
        // May need some additional code also in the beginning of the function.
        this.texCoords.push(longitude/this.longDivs,latitude/this.latDivs);
        
      }
      phi += phiInc;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
    
  }

  setInitialPosition(x,y,z){
    this.initialX = x;
    this.initialY = y;
    this.initialZ = z;
  }

  setPosition(transX, transY, transZ){
    this.transX = transX;
    this.transY = transY;
    this.transZ = transZ;
  }

  setScaling(sX, sY, sZ){
    this.scaleX = sX;
    this.scaleY = sY;
    this.scaleZ = sZ;
  }

  getInitialX(){
    return this.initialX;
  }

  getInitialY(){
    return this.initialY;
  }

  getInitialZ(){
    return this.initialZ;
  }
  
  getX(){
    return this.transX;
  }

  getY(){
    return this.transY;
  }

  getZ(){
    return this.transZ;
  }

  rockInNest(x,y,z) {
    if(Math.hypot(x,y,z) < 2)
      return true;
    return false;
  }
}

