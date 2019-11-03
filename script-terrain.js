function carte (parentElementId, childElement, column, row)
{

  this.parentElementId = parentElementId;
  this.childElement = childElement;
  this.column = column;
  this.row = row;

  let nColumn = this.column + 1;
  let nTuile = this.column * this.row;
  let parentElement = document.getElementById(this.parentElementId);
  let posx = '';
  let posy = '';
  let test = '';
  let divGridItem = '';


  function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
  }
  let nBrique = getRndInteger(nTuile - 20,nTuile);
  parentElement.className='grid-container';
  parentElement.setAttribute("style", "grid-template-columns: repeat("+column+", 50px);");
  // parentElement.style.gridTemplateColumns = "repeat(19, 50px);";

  let count = 1;
  let count2 = 1;
  for(let i = 0;i<nTuile;i++)
  {

    if (count == nColumn)
    {
      count=1;
      count2++;
    }

    let childElement = document.createElement(this.childElement);
    childElement.className='grid-item';
    childElement.setAttribute("style", "color: white;");
    childElement.style.width = "50px;";
    childElement.style.height = "50px;";
    childElement.style.background = "url('img/herbe.png');";
    childElement.setAttribute("id", count2+'y'+count);
    var appendChildElement = parentElement.appendChild(childElement);
    // appendChildElement.innerHTML = 'x'+count2+'-y'+count;
    count++
  }
  let allDiv = document.getElementsByClassName('grid-item');

  for (var i = 0; i < allDiv.length; i++) {
    test = allDiv[i].id.split('y');
    posx = test[0];
    posy = test[1];
    if (test[0] == 1 || test[0] == this.row || test[1] == 1 || test[1] == this.column) {

      cases[posx][posy] = 1;
      divGridItem = document.getElementById(posx+'y'+posy);
      divGridItem.classList.add('tuileIndestructible');
    }
    else if (posx%2 == 1 && posy%2 == 1)
    {
      cases[posx][posy] = 1;
      divGridItem = document.getElementById(posx+'y'+posy);
      divGridItem.classList.add('tuileIndestructible');
    }
    else
    {
      if (posx == 2 && posy == 2 || posx == 2 && posy == 3 || posx == 3 && posy == 2 || posx == this.row-1 && posy == this.column-1 || posx == this.row-1 && posy == this.column-2 || posx == this.row-2 && posy == this.column-1) {
        cases[posx][posy] = 0;
      }
      else
      {
        if(Math.floor(Math.random() * 4) == 1){
          cases[posx][posy] = 4;
          divGridItem = document.getElementById(posx+'y'+posy);
          divGridItem.classList.add('brique');
        }
        else{
          cases[posx][posy] = 0;
        }
      }

    }

  }

  }
