function Ninja(name){
  this.name = name;
  this.health = 50;
  var speed = 5;
  var strength= 5;
  var self = this;
  this.showStats = function(){
    console.log('Name: '+this.name+', Health: '+this.health+", Speed: "+speed+", Strength: "+strength);
    return this;
  }
  this.drinkSake = function(){
    this.health += 10;
  }
  this.kick = function(ninja){
    var damage= strength*5;
    ninja.health -= damage;
    console.log(ninja.name + " was kicked by "+this.name+" and lost "+damage+" Health.");
    return this;
  }
}

Ninja.prototype.punch = function(ninja){
  ninja.health -= 5;
  console.log(ninja.name + " was punched by "+this.name+" and lost 5 health!");
  return this;
}

Ninja.prototype.sayName = function(){
  console.log("My name is "+this.name+"!");
}

var blue_ninja = new Ninja("Bill Gates");
var red_ninja = new Ninja("Hyabusa");

blue_ninja.sayName();
red_ninja.sayName();

blue_ninja.punch(red_ninja);
red_ninja.kick(blue_ninja);

blue_ninja.showStats();
red_ninja.showStats();
