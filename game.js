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
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      plane1 = createSprite(100,200);
      plane1.addImage("plane1",plane1_img);
      plane1.scale = 0.05;
      plane2 = createSprite(300,200);
      plane2.addImage("plane2",plane2_img);
      plane2.scale = 0.5;
      plane3 = createSprite(500,200);
      plane3.addImage("plane3",plane3_img);
      plane3.scale = 0.5;
      plane4 = createSprite(700,200);
      plane4.addImage("plane4",plane4_img);
      plane4.scale = 0.5;
      planes = [plane1, plane2, plane3, plane4];
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      player.getPlanesAtEnd();
  
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track, 0,-20, displayWidth*5, displayHeight);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 20;
        var y = 50;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = 20 + allPlayers[plr].distance;
          //use data form the database to display the cars in y direction
          y = y + 200
          planes[index-1].x = x;
          planes[index-1].y = y;
         // console.log(index, player.index)
  
         
          if (index === planes.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            //cars[index - 1].shapeColor = "red";
            camera.position.x = x;
            camera.position.y = displayHeight/2;
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance += 20
        player.updatePlayerInfo();
      }
  
      if(player.distance > 3860){
        gameState = 2;
        player.rank += 1
        Player.updatePlanesAtEnd(player.rank)
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      console.log("player.rank")
    }
  }