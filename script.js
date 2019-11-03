// -------- Initiate table of cases ------ //


// Handle character moves
document.addEventListener('keydown', function(event) {
  if(hero != undefined && hero.getMoving() == 0){
    var position = 0;

    if (event.code == 'ArrowUp') {
      if(cases[hero.getPosX() - 1][hero.getPosY()] == 0 || cases[hero.getPosX() - 1][hero.getPosY()] == 5 || cases[hero.getPosX() - 1][hero.getPosY()] == 2)
        position = 1;
    }
    else if (event.code == 'ArrowRight') {
      if(cases[hero.getPosX()][hero.getPosY() + 1] == 0 || cases[hero.getPosX()][hero.getPosY() + 1] == 5 || cases[hero.getPosX()][hero.getPosY() + 1] == 2)
        position = 2;
    }
    else if (event.code == 'ArrowDown') {
      if(cases[hero.getPosX() + 1][hero.getPosY()] == 0 || cases[hero.getPosX() + 1][hero.getPosY()] == 5 || cases[hero.getPosX() + 1][hero.getPosY()] == 2)
        position = 3;
    }
    else if (event.code == 'ArrowLeft') {
      if(cases[hero.getPosX()][hero.getPosY() - 1] == 0 || cases[hero.getPosX()][hero.getPosY() - 1] == 5 || cases[hero.getPosX()][hero.getPosY() - 1] == 2)
        position = 4;
    }
    else if (event.code == 'Space' && hero.getTimeBomb() == 0) {
      dropBomb(hero.getPosX(), hero.getPosY(), hero);

      if(cases[hero.getPosX()- 1][hero.getPosY()] == 0)
        cases[hero.getPosX() - 1][hero.getPosY()] = 5;
      if(cases[hero.getPosX()][hero.getPosY() + 1] == 0)
        cases[hero.getPosX()][hero.getPosY() + 1] = 5;
      if(cases[hero.getPosX() + 1][hero.getPosY()] == 0)
        cases[hero.getPosX() + 1][hero.getPosY()] = 5;
      if(cases[hero.getPosX()][hero.getPosY() - 1] == 0)
        cases[hero.getPosX()][hero.getPosY() - 1] = 5;

    }

    if(position != 0)
      hero.direction(position);
  }
});


// Animate movement of a character
function animate(elem,style,unit,from,to,time) {
    if( !elem) return;
    var start = new Date().getTime(),
        timer = setInterval(function() {
            var step = Math.min(1,(new Date().getTime()-start)/time);

            elem.style[style] = (from+step*(to-from))+unit;

            if( step == 1){
              clearInterval(timer);
            }
        },25);
    elem.style[style] = from+unit;
}


// Drop a bomb on the floor
function dropBomb(posX, posY, character){
  if(cases[posX][posY] == 0 || cases[posX][posY] == 3){
    // Add a bomb to explode
    bombs.push(new Bomb(posX,posY));
    var value = bombs.length - 1;

    setTimeout(function(){
      if(bombs != null && bombs[value] != null){
        bombs[value].explosion();
        bombs[value] = null;

        createBombExplosion('img/flame.png','bomb',posX,posY);

        if(cases[posX - 1][posY] != 1)
          createBombExplosion('img/flame.png','bomb',(posX-1),posY);
        if(cases[posX][posY + 1] != 1)
          createBombExplosion('img/flame.png','bomb',posX,(posY + 1));
        if(cases[posX + 1][posY] != 1)
          createBombExplosion('img/flame.png','bomb',(posX + 1),posY);
        if(cases[posX][posY - 1] != 1)
          createBombExplosion('img/flame.png','bomb',posX,(posY - 1));
      }
    }, 2500);

    character.setTimeBomb(character);
    cases[posX][posY] = 2;
  }
}


// Add Image
function createBombExplosion(link,classImg,posX,posY){
  var img = document.createElement("img");
  img.src = link;
  img.classList.add(classImg);
  img.style.left = (caseSize * (posY - 1));
  img.style.top = (caseSize * (posX - 1));

  var src = document.getElementById("gridContainer");
  src.appendChild(img);

  if(cases[posX][posY] == 4){
    document.getElementById(posX+'y'+posY).classList.remove('brique');
  }
  else if(cases[posX][posY] == 3 || cases[posX][posY] == 5 || cases[posX][posY] == 2){
    if(hero != null && hero.getPosX() == posX && hero.getPosY() == posY){
      changeTextModal("Défaite !");
      reinitializeGame();
    }
    else{
      if(monsters != null){
        monsters.forEach(function(monster, index){
          if(monster != null && monster.getPosX() == posX && monster.getPosY() == posY){
            monster.clearTimeout();
            monster = null;
            nbMonsters--;

            if(document.getElementById('monster'+index) != undefined)
              document.getElementById('monster'+index).remove();

            if(nbMonsters == 0){
              changeTextModal("Victoire !");
              reinitializeGame();
            }
          }
        });
      }
    }
  }

  cases[posX][posY] = 0;

  setTimeout(function(){
    img.remove();
  },600);
}

//return number of empty cases around specified case (except specified case)
function returnNbCases(x,y,from){
  var nbDirections = 0;

  // Up = 1, Right = 2, Bottom = 3, Left = 4
  if(cases[x - 1] != undefined && cases[x - 1][y] != undefined && cases[x - 1][y] == 0 && from != 1)
    nbDirections++;
  if(cases[x][y + 1] != undefined && cases[x][y + 1] == 0 && from != 2)
    nbDirections++;
  if(cases[x + 1] != undefined && cases[x + 1][y] != undefined && cases[x + 1][y] == 0 && from != 3)
    nbDirections++;
  if(cases[x][y - 1] != undefined && cases[x][y - 1] == 0 && from != 4)
    nbDirections++;

  return nbDirections;
}
