<html lang="fr" dir="ltr">

<head>
    <meta charset="utf-8">
    <meta name="author" lang="fr" content="Eddy MORLON">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css?family=Bangers&display=swap" rel="stylesheet">
</head>
<body>
  <div id="gridContainer">
  </div>

  <!-- The Modal -->
  <div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <p class="text"></p>

      <div id="play">
        <div class="center-v">
          <label for="numberMonsters">Nombre de monstres</label>
          <input type="text" id="numberMonsters" value="2" />
        </div>
        <div class="button" onClick="startGame()" id="button">Jouer</div>
      </div>
    </div>
  </div>

  <script src="modal.js"></script>
  <script src="script.js"></script>
  <script src="character.js"></script>
  <script src="classBomb.js"></script>
  <script src="classMonster.js"></script>
  <script src="script-terrain.js"></script>
  <script src="start.js"></script>
</body>
</html>
