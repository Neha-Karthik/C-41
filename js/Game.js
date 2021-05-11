class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      console.log(player.index);
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        console.log("start function, playerCount"+ playerCount);
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];

    car1.addImage(carImg1);
    car2.addImage(carImg2);
    car3.addImage(carImg3);
    car4.addImage(carImg4);
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      //var display_position = 100;

      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 180;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          ellipse(x,y,80,100);
          fill("black");
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      //console.log(player.distance);
    }

    if(player.distance>3650){
      gameState = 2;
      player.rank = player.rank + 1;
      player.updateCarsAtEnd(player.rank);
      text(player.name + " : "+ player.rank,displayWidth - 50,player.distance);
    }

    drawSprites();
  }

  end(){
    console.log("game is over");
    console.log(player.rank);
  }
}
