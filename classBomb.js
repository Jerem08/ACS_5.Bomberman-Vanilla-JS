class Bomb{
  constructor(posX, posY) {
      this.posX = posX;
      this.posY = posY;
      this.el = null;

      this.createBomb();
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

  // Explosion
  explosion(){
    this.getEl().remove();
  }

  // Add Image of bomb
  createBomb(){
    this.el = document.createElement("img");
    this.el.src = "img/bomb.png";
    this.el.classList.add("bomb");
    this.el.style.left = (caseSize * (this.posY - 1));
    this.el.style.top = (caseSize * (this.posX - 1));

    var src = document.getElementById("gridContainer");
    src.appendChild(this.el);
  }
}
