/**
 * MyRobotArm
 * @constructor
 */
 function MyRobotArm(scene, slices, stacks) {
 	CGFobject.call(this,scene);
 	
	this.slices=slices;
	this.stacks=stacks;
 	this.initBuffers();
 };
 MyRobotArm.prototype = Object.create(CGFobject.prototype);
 MyRobotArm.prototype.constructor = MyRobotArm;
 
 MyRobotArm.prototype.display = function() {
	 this.drawElements(this.primitiveType);
 }
 
 MyRobotArm.prototype.initBuffers = function() {
 	var ang = Math.PI*2/this.slices;
 	var alfa = 0;
 	
 	/////////////////////////////////////////////////////////
 	///////////// Draw the cylinder of the arm //////////////
 	/////////////////////////////////////////////////////////

 	this.indices = [];
 	this.vertices = [];
 	this.normals = [];
	this.texCoords = [];
 	verts = 0;
 	
 	for(j = 0; j <= this.stacks; j++)
	{
		this.vertices.push(1, 0, j / this.stacks);
		this.normals.push(1, 0, j / this.stacks);
		this.texCoords.push(0, 0);
		verts += 1;

		for(i = 0; i <= this.slices; i++)
		{
			alfa+=ang;
			x = Math.cos(alfa);
			y = Math.sin(alfa);
			this.vertices.push(x, y, j / this.stacks);
			this.normals.push(x, y, j / this.stacks);
			this.texCoords.push(i / this.slices, j / this.stacks);
			verts++;

			if(j > 0 && i > 0)
			{
				this.indices.push(verts-1, verts-2, verts-this.slices-3);
				this.indices.push(verts-this.slices-4, verts-this.slices-3, verts-2);
			}
		}
	}

 	/////////////////////////////////////////////////////////
 	////////////// Draw the bottom of the arm ///////////////
 	/////////////////////////////////////////////////////////
 	
 	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, -1);
	this.texCoords.push(0.5, 0.5);
	
	verts+=1;
	alfa=0;
	
	index = verts-1;

	for(i = 0; i < this.slices; i++)
	{
		x=Math.cos(alfa);
		y=Math.sin(alfa);
		this.vertices.push(x, y, 0);
		this.normals.push(0, 0, -1);
		this.texCoords.push(x/2+0.5, -y/2+0.5);
		
		alfa+=ang;
		verts++;

		if(i < this.slices-1)
			this.indices.push(index, verts, verts-1);
		else
			this.indices.push(index, index+1, verts-1);
	}
	

 	/////////////////////////////////////////////////////////
 	/////////////// Draw the top of the arm /////////////////
 	/////////////////////////////////////////////////////////
	
	this.vertices.push(0, 0, 1);
	this.normals.push(0, 0, 1);
	this.texCoords.push(0.5, 0.5);
	
	verts+=1;
	alfa=0;
	
	index = verts-1;

	for(i = 0; i < this.slices; i++)
	{
		x=Math.cos(alfa);
		y=Math.sin(alfa);
		this.vertices.push(x, y, 1);
		this.normals.push(0, 0, 1);
		this.texCoords.push(x/2+0.5, -y/2+0.5);
		
		alfa+=ang;
		verts++;

		if(i < this.slices-1)
			this.indices.push(index, verts-1, verts);
		else
			this.indices.push(index, verts-1, index+1);
	}
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };