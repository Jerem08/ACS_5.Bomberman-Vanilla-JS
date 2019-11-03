class Monster{
  constructor(posX, posY, el, timeBomb, speed) {
      this.posX = posX;
      this.posY = posY;
      this.el = el;
      this.timeBomb = timeBomb;
      this.speed = speed;
      this.timeout = null;
      this.droppedBomb = 0;

      this.el.style.left = (caseSize * (this.posY - 1));
      this.el.style.top = (caseSize * (this.posX - 1));

      this.selectDirection(this);
  }

  getPosX() {
      return this.posX;
  }
  getPosY() {
      return this.posY;
  }
  getEl() {
      return this.el;
  }
  getTimeBomb() {
      return this.timeBomb;
  }
  getSpeed() {
      return this.speed;
  }
  getOffsetLeft(){
    return (this.getPosY() - 1) * caseSize;
  }
  getOffsetTop(){
    return (this.getPosX() - 1) * caseSize;
  }
  getDroppedBomb(){
    return this.droppedBomb;
  }

  setPosX(pos) {
    this.posX = pos;
  }
  setPosY(pos) {
    this.posY = pos;
  }
  setLeft(size){
    this.el.style.left = size + "px";
  }
  setTop(size){
    this.el.style.top = size + "px";
  }
  setTimeBomb(el){
    el.timeBomb = 3;

    setTimeout(function(){
      el.timeBomb = 0;
    },3000);
  }
  setDroppedBomb(val){
    this.droppedBomb = val;
  }


  // Move an unit
  moveUnit(moveX, moveY){
    if(moveX != 0){
      if(cases[this.getPosX()][this.getPosY()] == 3)
        cases[this.getPosX()][this.getPosY()] = 0;

      animate(this.el,"top","px",this.getOffsetTop(),(this.getOffsetTop() + (moveX * caseSize)),this.speed);
      this.setPosX(this.getPosX() + moveX);

      if(cases[this.getPosX()][this.getPosY()] == 0)
        cases[this.getPosX()][this.getPosY()] = 3;
    }
    else if(moveY != 0){
      if(cases[this.getPosX()][this.getPosY()] == 3)
        cases[this.getPosX()][this.getPosY()] = 0;

      animate(this.el,"left","px",this.getOffsetLeft(),(this.getOffsetLeft() + (moveY * caseSize)),this.speed);
      this.setPosY(this.getPosY() + moveY);

      if(cases[this.getPosX()][this.getPosY()] == 0)
        cases[this.getPosX()][this.getPosY()] = 3;
    }
  }

  //define the direction to move to
  selectDirection(el){
    if(this != undefined){
      var positions = [];

      // Get all directions available
      // Up = 1, Right = 2, Bottom = 3, Left = 4
      if(cases[this.getPosX() - 1][this.getPosY()] == 0 || (this.getDroppedBomb() && cases[this.getPosX() - 1][this.getPosY()] == 5))
        positions.push(1);
      if(cases[this.getPosX()][this.getPosY() + 1] == 0 || (this.getDroppedBomb() && cases[this.getPosX()][this.getPosY() + 1] == 5))
        positions.push(2);
      if(cases[this.getPosX() + 1][this.getPosY()] == 0 || (this.getDroppedBomb() && cases[this.getPosX() + 1][this.getPosY()] == 5))
        positions.push(3);
      if(cases[this.getPosX()][this.getPosY() - 1] == 0 || (this.getDroppedBomb() && cases[this.getPosX()][this.getPosY() - 1] == 5))
        positions.push(4);

      if(this.getDroppedBomb()){
        this.setDroppedBomb(0);
      }

      // Get random position in all possible positions
      var posRandom = Math.floor(Math.random() * positions.length);
      var newX = 0;
      var newY = 0;

      // move monster
      if(positions[posRandom] == 1){ // Up
        this.moveUnit(-1,0);
        newX--;
      }
      else if(positions[posRandom] == 2){ // Right
        this.moveUnit(0,1);
        newY++;
      }
      else if(positions[posRandom] == 3){ // Bottom
        this.moveUnit(1,0);
        newX++;
      }
      else if(positions[posRandom] == 4){ // Left
        this.moveUnit(0,-1);
        newY--;
      }

      // define if the monster drop a bomb
      if(this.getTimeBomb() == 0){
        if(Math.floor(Math.random() * 3) == 1 && returnNbCases((this.getPosX()+newX),(this.getPosY()+newY),positions[posRandom]) > 1){
          this.setDroppedBomb(1);

          if(cases[this.getPosX()- 1][this.getPosY()] == 0)
            cases[this.getPosX() - 1][this.getPosY()] = 5;
          if(cases[this.getPosX()][this.getPosY() + 1] == 0)
            cases[this.getPosX()][this.getPosY() + 1] = 5;
          if(cases[this.getPosX() + 1][this.getPosY()] == 0)
            cases[this.getPosX() + 1][this.getPosY()] = 5;
          if(cases[this.getPosX()][this.getPosY() - 1] == 0)
            cases[this.getPosX()][this.getPosY() - 1] = 5;

          setTimeout(function(){
            dropBomb(el.getPosX(), el.getPosY(), el);
          },el.speed);
        }
      }

      this.timeout = setTimeout(function(){
        el.selectDirection(el);
      },el.speed);
    }
  }

  // clear timeout
  clearTimeout(){
    clearTimeout(this.timeout);
  }
}
