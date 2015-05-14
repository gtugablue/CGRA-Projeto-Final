/**
 * MyRobotHead
 * @constructor
 */
 function MyRobotHead(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyRobotHead.prototype = Object.create(CGFobject.prototype);
 MyRobotHead.prototype.constructor = MyRobotHead;

 MyRobotHead.prototype.initBuffers = function() {
 	
	var ang = Math.PI*2/this.slices;
 	var alfa = 0;

	var ang2 = (Math.PI/2)/this.stacks;
 	var beta = 0;


 	this.indices = [];
 	this.vertices = [];
 	this.normals = [];
 	verts = 0;

	for(j = 0; j <= this.stacks; j++)
	{
		this.vertices.push(1 * Math.cos(beta), 0, Math.sin(beta));
		this.normals.push(1 * Math.cos(beta), 0, Math.sin(beta));
		verts += 1;

		for(i = 0; i < this.slices; i++)
		{
			alfa+=ang;
			x = Math.cos(alfa);
			y = Math.sin(alfa);
			this.vertices.push(x * (Math.cos(beta)), y * (Math.cos(beta)), Math.sin(beta));
			this.normals.push(x * Math.cos(beta), y * Math.cos(beta), Math.sin(beta));
			verts++;

			if(j > 0)
			{
				this.indices.push(verts-1, verts-2, verts-this.slices-2);
				this.indices.push(verts-this.slices-3, verts-this.slices-2, verts-2);
			}
		}

		beta += ang2;
	}
	
	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, -1);
	//this.texCoords.push(0.5, 0.5);
	
	verts+=1;
	alfa=0;
	
	index = verts-1;

	for(i = 0; i < this.slices; i++)
	{
		x=Math.cos(alfa);
		y=Math.sin(alfa);
		this.vertices.push(x, y, 0);
		this.normals.push(0, 0, -1);
		//this.texCoords.push(x/2+0.5, -y/2+0.5);
		
		alfa+=ang;
		verts++;

		if(i < this.slices-1)
			this.indices.push(index, verts, verts-1);
		else
			this.indices.push(index, index+1, verts-1);
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };