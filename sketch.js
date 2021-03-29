var img;
let nb;
let nbarray = [];
let octahedron;
let detailY;
var colors="f9dc5c-fae588-fcefb4-fdf8e1-f9dc5c".split("-").map(a=>"#"+a);

/*let myObject1 = { x: 5, y: 6 , z:5, size:7 };
let myObject2 = { x: -20, y: -30 , z:40, size:60 };
let myObject3 = { x: 45, y: -56 , z:65, size:87 };*/


function preload(){
  img=loadImage("https://i.imgur.com/OIgvcbK.jpg");
}

function changeBG() {
  let val = random(255);
  window.alert('按左鍵放大框框');
  window.alert('按中鍵縮小框框');
  window.alert('案住時不會閃爍，且中間東西改變顏色');
  window.alert('旁邊有一閃一閃的星星，重整會改變分布的地方');
  window.alert('底下可以調整中間星球的樣子');


  background(val);
}
  
function setup(x,y,r=30) {
  
  button = createButton('規則看這裡');
  button.position(100, 700);
  button.mousePressed(changeBG);
  
  fill(255, 255, 255, 50)
  stroke(0, 0, 0, 50)
  
  createCanvas(900,700,WEBGL);
  detailY = createSlider(3, 16, 3);
  detailY.position(10, height + 5);
  detailY.style('width', '80px');
  
  for(let i=0;i<100;i+=1){
  translate(x,y);
  nbarray.push({x:random(500),y:random(-250),z:random(800),size:random(10)}
                   )
  let ang= noise((i,frameCount)*r);
  let xx= noise(i,frameCount,500)*8*PI;
  let rr= random(0,50);

  ellipse(xx*cos(ang),xx*sin(ang),rr);}
  console.log(nbarray);
  
  /*for(let i=0;i<1000;i+=1){
      obsarray.push({x:random(width),y:random(height),z:random(width),size:random(50)}
                   )}*/

}




function draw() {
  
  let weight = dist(mouseX, mouseY, pmouseX, pmouseY)*1;
  ellipse(mouseX, mouseY, 10, 10, 0);
  line(mouseX, mouseY, pmouseX, pmouseY);
  background(400);
  
 //座標原點設為圖片中心
  imageMode(CENTER);
 //繪製圖片，後兩個引數調整長寬
  image(img,0,0,900,800);
  
  
  
  rotateY(millis() / 3000);
  
  fill(90);
  nb = new myBox(50,50,100,50);
  
  nb.display();
  
  nbarray.forEach((v)=>{
    push();
     
      noStroke();
      translate(v.x,v.y,v.z,r=100,v.size=10);
      let cc = random(colors);
      fill(cc);
    
      drawingContext.shadowColor=color(cc);
      drawingContext.shadowBlur=50;
    

      sphere(v.size);
     
    pop();
    
    
  })
  

}




class myBox{
  // 怎樣建構這個物件 只執行一次
  constructor(x,y,z,size,r,r1,x1,y1){
    this.x=x;
    this.y=y;
    this.z=z;
    this.r=r;
    this.r1=50;
    this.x1=200;
    this.y1=200;
    this.size=100;
    this.mx = 1;
    this.cc=color(random(255),0,0);
    //衛星的中心xyz = 物件，衛星的大小<物件，衛星的距離自訂
    this.stela= new stela(this.x,this.y,this.z,this.size*0.25,this.size);
    this.stela4= new stela4(this.x,this.y,this.z,this.size*0.25,this.size);
   
  }
  // 定義一些能力 我們呼叫時 執行 
  // 能力1:顯現這box
  display(){
    push();
    
    
      noStroke();
      translate(this.x,this.y,this.z); 
    
      if (mouseX-width/2 > this.x-this.size/1 && 
          mouseX-width/2 < this.x+this.size/1 &&
          mouseY-height/2 > this.y-this.size/1 && 
          mouseY-height/2 < this.y+this.size/1){
       
          this.mx = this.mx+0.5;
      
    
    
      rotateY(mouseY*0.01);
      rotateX(mouseX*0.01);
    
    
      
          
      }
    
      
    
    this.stela.display();
    this.stela4.display();
    
    fill(50);
    sphere(this.size,80,detailY.value());
    

    
    
    pop();
    this.move();
  }
  //能力2:移動規則
  move(){
    if (this.x>width/2){this.mx = -1*this.mx;}
    if (this.x<-width/2){this.mx = -1*this.mx;}  
    this.x = this.x + this.mx;
  }
  
}



class stela{
  constructor(x,y,z,size,cdx){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=300;
    //隨機生成顏色
    this.ccc=color(random(255),80);
    //衛星距離中心的x距離
    this.cdx=cdx;
    this.stela2= new stela2(this.x,this.y,this.z,this.size*0.25,this.size);
}
  display(){
    push();
    
    rotateY(mouseY*0.01);
    rotateX(mouseX*0.01);
    translate(this.cdx,0,0);
    
    if(mouseButton == LEFT && this.size>=300) {this.size=this.size+20 }
    
    else{this.size=this.size-50}
    
    
    fill(this.ccc);
    torus(this.size);
    this.stela2.display();
    
    pop();
  }
}


class stela1{
  // 怎樣建構這個物件 只執行一次
  constructor(x,y,z,size){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=50;
    this.mx = 1;
    this.cc=color(random(255),80,80);
    //衛星的中心xyz = 物件，衛星的大小<物件，衛星的距離自訂
    this.stela1= new stela1(this.x,this.y,this.z,this.size*0.25,this.size);
  }
  // 定義一些能力 我們呼叫時 執行 
  // 能力1:顯現這box
  display(){
    push();
    
     
      rotateX(mouseX*0.01);
    
      if (mouseX-width/2 > this.x-this.size/1 && 
          mouseX-width/2 < this.x+this.size/1 &&
          mouseY-height/2 > this.y-this.size/1 && 
          mouseY-height/2 < this.y+this.size/1){
       
        this.mx = this.mx+0.5;
        
        }
    
    
    fill(0);
    torus(this.size);
    pop();
    this.stela1.display();
    this.move();
  }
  //能力2:移動規則
  move(){
    if (this.x>width/2){this.mx = -1*this.mx;}
    if (this.x<-width/2){this.mx = -1*this.mx;}  
    this.x = this.x + this.mx;
  }
}

class stela2{
  // 怎樣建構這個物件 只執行一次
  constructor(x,y,z,size){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=50;
    this.mx = 5;
    this.cc=color(random(255),90,0);
    this.stela3= new stela3(this.x,this.y,this.z,this.size*0.5,this.size);
    //衛星的中心xyz = 物件，衛星的大小<物件，衛星的距離自訂
  }
  // 定義一些能力 我們呼叫時 執行 
  // 能力1:顯現這box
  display(){
    push();
          if(mouseIsPressed){
     
          fill(mouseX,mouseY,this.cc);
     }
    
    
      if (mouseX-width/2 > this.x-this.size/1 && 
          mouseX-width/2 < this.x+this.size/1 &&
          mouseY-height/2 > this.y-this.size/1 && 
          mouseY-height/2 < this.y+this.size/1){
       
        this.mx = this.mx+0.5;
        
        rotateY(frameCount*0.05);
        rotateX(frameCount*0.05);
        
        translate(this.x,this.y,this.z); 
        
  
    }
    sphere(this.size);
    pop();
    this.stela3.display();
    this.move();
  }
  //能力2:移動規則
  move(){
    if (this.x>width/2){this.mx = -1*this.mx;}
    if (this.x<-width/2){this.mx = -1*this.mx;}  
    this.x = this.x + this.mx;
    

  }
}


class stela3{
  // 怎樣建構這個物件 只執行一次
  constructor(x,y,z,size){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=20;
    this.mx = 20;
    this.cc=color(50,50,30);
    //衛星的中心xyz = 物件，衛星的大小<物件，衛星的距離自訂
  }
  // 定義一些能力 我們呼叫時 執行 
  // 能力1:顯現這box
  display(){
    push();
    translate(this.x,this.y,this.z); 
    rotateY(frameCount*0.05);
    rotateX(frameCount*0.05);
    rotateZ(frameCount*0.01);
    
      if (mouseX-width/2 > this.x-this.size/1 && 
          mouseX-width/2 < this.x+this.size/1 &&
          mouseY-height/2 > this.y-this.size/1 && 
          mouseY-height/2 < this.y+this.size/1){
        
       
        this.mx = this.mx+0.5;
        
        }
    sphere(this.size);
    pop();
    this.move();
  }
  //能力2:移動規則
  move(){
    if (this.x>width/2){this.mx = -1*this.mx;}
    if (this.x<-width/2){this.mx = -1*this.mx;}  
    this.x = this.x + this.mx;
  }
}


//瓜

class stela4{
  constructor(x,y,z,size,cdx){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=300;
    //隨機生成顏色
    this.ccc=color(random(255),80);
    //衛星距離中心的x距離
    this.cdx=cdx;
    this.stela2= new stela2(this.x,this.y,this.z,this.size*0.25,this.size);
    this.stela5= new stela2(this.x,this.y,this.z,this.size*0.25,this.size);
}
  display(){
    push();
    
    rotateY(mouseY*0.01);
    rotateX(mouseX*0.01);
    translate(this.cdx,this.cdx,200);
    
    if(mouseButton == LEFT && this.size>=300) {this.size=this.size+50}
    
    else{this.size=this.size-20}
    
    
    fill(this.ccc);
    torus(this.size);
    this.stela2.display();
    this.stela5.display();
    
    pop();
  }
}

class stela5{
  constructor(x,y,z,size,cdx){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=300;
    //隨機生成顏色
    this.ccc=color(random(255),80);
    //衛星距離中心的x距離
    this.cdx=cdx;
    this.stela2= new stela2(this.x,this.y,this.z,this.size*0.25,this.size);
}
  display(){
    push();
    
    rotateY(mouseY*0.01);
    translate(this.cdx,0,0);
    
    if(mouseButton == LEFT && this.size>=300) {this.size=this.size+50}
    
    else{this.size=this.size-20}
    
    
    fill(this.ccc);
    torus(this.size);
    this.stela2.display();
    
    pop();
  }
}


//背景點擊時變白
//中鍵點擊放大，停止時縮回去
//案住拖曳星球
//案上鍵明度，下鍵暗度
//旋轉改變東C

//!黃黑色設計