String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
 
    return this.substring(0, index) + replacement + this.substring(index + 1);
}

// Keyboard
function Keyboard(game) {
  var self = this;
  this.game = game;

  this.html_code = `
    <ul id="keyboard">
      <li class="symbol"><span class="off">²</span><span class="on"></span></li>
      <li class="symbol"><span class="off">&</span><span class="on">1</span></li>
      <li class="symbol"><span class="off">é</span><span class="on">2</span></li>
      <li class="symbol"><span class="off">"</span><span class="on">3</span></li>
      <li class="symbol"><span class="off">'</span><span class="on">4</span></li>
      <li class="symbol"><span class="off">(</span><span class="on">5</span></li>
      <li class="symbol"><span class="off">-</span><span class="on">6</span></li>
      <li class="symbol"><span class="off">è</span><span class="on">7</span></li>
      <li class="symbol"><span class="off">_</span><span class="on">8</span></li>
      <li class="symbol"><span class="off">ç</span><span class="on">9</span></li>
      <li class="symbol"><span class="off">à</span><span class="on">0</span></li>
      <li class="symbol"><span class="off">)</span><span class="on">°</span></li>
      <li class="symbol"><span class="off">=</span><span class="on">+</span></li>
      <li class="delete lastitem">delete</li>
      <li class="tab">tab</li>
      <li class="letter">a</li>
      <li class="letter">z</li>
      <li class="letter">e</li>
      <li class="letter">r</li>
      <li class="letter">t</li>
      <li class="letter">y</li>
      <li class="letter">u</li>
      <li class="letter">i</li>
      <li class="letter">o</li>
      <li class="letter">p</li>
      <li class="symbol"><span class="off">^</span><span class="on">¨</span></li>
      <li class="symbol"><span class="off">$</span><span class="on">£</span></li>
      <li class="symbol"><span class="off">*</span><span class="on">µ</span></li>
      <li class="capslock">caps lock</li>
      <li class="letter">q</li>
      <li class="letter">s</li>
      <li class="letter">d</li>
      <li class="letter">f</li>
      <li class="letter">g</li>
      <li class="letter">h</li>
      <li class="letter">j</li>
      <li class="letter">k</li>
      <li class="letter">l</li>
      <li class="letter">m</li>
      <li class="symbol"><span class="off">ù</span><span class="on">%</span></li>
      <li class="return lastitem">return</li>
      <li class="left-shift">shift</li>
      <li class="letter">w</li>
      <li class="letter">x</li>
      <li class="letter">c</li>
      <li class="letter">v</li>
      <li class="letter">b</li>
      <li class="letter">n</li>
      <li class="symbol"><span class="off">,</span><span class="on">?</span></li>
      <li class="symbol"><span class="off">;</span><span class="on">.</span></li>
      <li class="symbol"><span class="off">:</span><span class="on">/</span></li>
      <li class="symbol"><span class="off">!</span><span class="on">§</span></li>
      <li class="right-shift lastitem">shift</li>
      <li class="space lastitem">&nbsp</li>
    </ul>
  `;

  this.shift = false;
  this.capslock = false;

  // creating the keayboard
  this.container = $('<div>');
  this.container.attr('id', 'keyboard_container');
  this.container.html(this.html_code);

  // configure keyboard
  this.buttons = this.container.find('#keyboard li');
  this.buttons.attr("desactivee", "false");
  this.buttons.click({param1: self}, clicked);

  function clicked(event) {
    var $this = $(this),
      character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

    if ($this.attr('desactivee') == 'false') {

      if (($this.attr('class') == 'letter') || ($this.attr('class') == 'symbol') || ($this.attr('class') == 'symbol lastitem')) {
        $this.css({ 'background': '#eee', 'color': 'white' });
        $this.attr('desactivee', 'true');
      }

      // Shift keys
      if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
        $('.letter').toggleClass('uppercase');
        $('.symbol span').toggle();

        this.shift = (this.shift === true) ? false : true;
        this.capslock = false;
        return false;
      }

      // Caps lock
      if ($this.hasClass('capslock')) {
        $('.letter').toggleClass('uppercase');
        this.capslock = true;
        return false;
      }

      // Delete
      if ($this.hasClass('delete')) {
        var html = $write.html();

        $write.html(html.substr(0, html.length - 1));
        return false;
      }

      // Special characters
      if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
      if ($this.hasClass('space')) character = ' ';
      if ($this.hasClass('tab')) character = "\t";
      if ($this.hasClass('return')) character = "\n";

      // Uppercase letter
      if ($this.hasClass('uppercase')) character = character.toUpperCase();

      // Remove shift once a key is clicked.
      if (this.shift === true) {
        $('.symbol span').toggle();
        if (this.capslock === false) $('.letter').toggleClass('uppercase');

        this.shift = false;
      }

      console.log(character);

      self.game.input.val(character);
      self.game.check();
    }
  }

  this.get_container = function() {
    return this.container;
  }

  this.disable_button = function(char) {
    var letters = $(".letter:contains(" + char + ")");
    var symbols = $(".symbol:contains(" + char + ")");

    letters.css({'background': '#eee', 'color': 'white' });
    symbols.css({'background': '#eee', 'color': 'white' });

    letters.attr('desactivee', 'true');
    symbols.attr('desactivee', 'true');
  } 
}
///////////////////////////////////////////




function load() {
  var img_pendule = $('<img>');
  img_pendule.attr('src', 'img_intro.gif');

  var message1 = $("<p>");
  message1.text("Devinez le mot avant d'être pendu !");
  message1.css('font-size', '30px');

  var button = $("<button>");
  button.text('Commencer le jeu');
  button.click(start_game);
  button.attr('id', 'start_button');

  div.append(img_pendule);
  div.append(message1);
  div.append(button);
}

function Timer() {

  this.totalSeconds = 0;
  
  this.minutesLabel = $('<label>');
  this.minutesLabel.attr('id', 'minutes');
  this.minutesLabel.text('00');

  this.secondsLabel = $('<label>');
  this.secondsLabel.attr('id', 'seconds');
  this.secondsLabel.text('00');

  this.text = $('<p>');
  this.text.append('Temps');
  this.text.append('<br>');
  this.text.append(this.minutesLabel);
  this.text.append(':');
  this.text.append(this.secondsLabel);
  this.text.css({'padding': '1em', 'font-size': '40px'});

  this.start_timer = function() {
    var self = this;
    setInterval(function() { self.setTime(self); }, 1000);
  }

  this.get_text = function(){
    return this.text;
  }

  this.pad = function(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
  this.setTime = function(self) {
    ++self.totalSeconds;
    self.secondsLabel.text(self.pad(self.totalSeconds % 60));
    self.minutesLabel.text(self.pad(parseInt(self.totalSeconds / 60)));
  }
  
}

function PointsLabel(points) {
  this.points = points;

  this.points_label = $('<p>');
  this.points_label.html('Points<br>' + points);
  this.points_label.attr('id', 'points_label');
  this.points_label.css({'padding': '1em', 'font-size': '40px'});

  this.get_text = function() {
    return this.points_label;
  }

  this.update = function(value) {
    this.points_label.html('Points<br>' + value);
  }
  
  this.shake = function() {
    var interval = 100;
    var distance = 10;
    var times = 4;

    this.points_label.css('position', 'relative');

    for (var iter = 0; iter < (times + 1) ; iter++) {
        this.points_label.animate({
            left: ((iter % 2 == 0 ? distance : distance * -1))
        }, interval);
    }                                                                                                          
    this.points_label.animate({ left: 0 }, interval);
  }
}

function Game() {
  var self = this;

  this.word = words[Math.floor(Math.random() * words.length)];
  this.guessed_letters = [];
  this.indexes;
  this.bonus = 0;
  this.malus = 0;
  this.points = number_steps;

  this.container = $('<div>');
  this.container.css('display', 'flex');

  this.right_window = $('<div>');
  this.right_window.attr('id', 'right_window');
  this.right_window.css({'display': 'table-cell', 'width': '80%', 'border-left': 'solid'});

  this.left_window = $('<div>');
  this.left_window.attr('id', 'left_window');
  this.left_window.css({'display': 'table-cell', 'width': '20%'});

  // ajout d'un timer
  this.timer = new Timer();

  // afficher le nombre de points
  this.points_label = new PointsLabel(this.points);

  this.left_window.append(this.timer.get_text());
  this.left_window.append(this.points_label.get_text());

  this.image = $('<img>');
  this.image.attr('src', 'Hangman-0.png');

  this.hider = new Hider(this.word.length);

  this.input = $('<input>');
  this.input.attr('type', 'text');
  this.input.attr('maxlength', '1');
  this.input.attr('placeholder', "Faites entrer un caractère");
  this.input.change(function() { self.check(); });
 
  this.button = $('<button>');
  this.button.text('Valider');
  //this.button.click(this.check);

  this.keyboard = new Keyboard(this);

  this.right_window.append(this.image);
  this.right_window.append(this.hider.text);
  this.right_window.append(this.input);
  this.right_window.append(this.button);
  this.right_window.append(this.keyboard.get_container());
  
  this.container.append(this.left_window);
  this.container.append(this.right_window);
  
  this.check = function() {
    this.guess = this.input.val().toLowerCase();
    this.input.val('');

    this.keyboard.disable_button(this.guess);

    if (!this.guessed_letters.includes(this.guess)) {
      this.guessed_letters.push(this.guess); 

      this.existe();

      if (typeof this.indexes !== 'undefined' && this.indexes.length > 0) {
        this.discover();
      }
      else {
        this.penaliser();
        this.points_label.update(this.points);
        this.points_label.shake();
      }
    }
  }

  this.existe = function() {
    this.indexes = [];
    for(var i = 0; i < this.word.length; i++){
      if(this.word[i].toLowerCase() == this.guess) {
        this.indexes.push(i);
      }
    } 
  }

  this.discover = function() {
    var audio = new Audio('mixkit-achievement-bell-600.wav');
  audio.play();
  
    var text = this.hider.get_text();

    console.log(typeof text);

    for (const index of this.indexes) {
      text = text.replaceAt(index, this.word[index]);
      this.bonus++;
    }

    this.hider.set_text(text);

    if(this.bonus == this.word.length){
      time = this.timer.totalSeconds;
      left_points = this.points;
      word_length = this.word.length;
      score = time / word_length + left_points;
      win();
    }
  }

  this.penaliser = function() {
    var audio = new Audio('mixkit-cowbell-sharp-hit-1743.wav');
  audio.play();

    this.malus++;
    this.points--;
    this.image.attr('src', 'Hangman-' + this.malus + '.png');

    if(this.malus == number_steps){
      lose();
    }
  }

  

  this.get_container = function() {
    return this.container;
  }
}

function Hider(length) {
  this.length = length;

  this.text = $("<p>");
  this.text.css('font-size', '50px');
  this.text.html('');

  for(var i = 0; i < this.length; i++){
    this.text.html(this.text.html() + '-');
  }

  this.get_text = function() {
    return this.text.html();
  }

  this.set_text = function(text) {
    this.text.html(text);
  }
}

function start_game(event) {
  var audio = new Audio('mixkit-happy-bells-notification-937.wav');
  audio.play();

  // tout vider
  div.html('');

  var game = new Game();
  div.append(game.get_container());

  game.timer.start_timer();
}

function win() {
  console.log('WIN');

  div.html('');

  var message1 = $("<p>");
  message1.text("YOU WIN.");
  
  div.append(message1); 

  demander_nom();
}

function lose() {
  console.log('GAME OVER');

  div.html('');

  var message1 = $("<p>");
  message1.text("GAME OVER.");

  var message2 = $("<p>");
  message2.text("Vous avez été pendu !");

  var image_end_game = $('<img>');
  image_end_game.attr('src', 'Hangman-6.png');
  image_end_game.css({'border': 'solid'});
  
  var button = $("<button>");
  button.text('Recommencer');
  button.click(start_game);
  button.attr('id', 'start_button');

  div.append(message1); 
  div.append(message2); 
  div.append(image_end_game); 
  div.append($('<br>'));
  div.append(button);
}

function demander_nom() {
  var br = $("<br>");

  var message1 = $('<p>');
  message1.text('Faites entrer votre nom SVP');

  var message_name_existe = $('<p>');
  message_name_existe.attr('id', 'message_name_existe');
  message_name_existe.css('color', 'white');

  var input_name = $("<input>");
  input_name.attr('type', 'text');
  input_name.change(valider_nom);

  var button = $('<button>');
  button.text('Valider');
  button.click(valider_nom);

  div.append(br);
  div.append(message1);
  div.append(message_name_existe);
  div.append(input_name);
  div.append(button);
}

function valider_nom() {
  
  name = $(this).val();
  if (existe(name)) {
    $('#message_name_existe').text('Ce nom existe déjà');
  }

  
  else {
    result();
  }
  

}

function existe(name) {

  for (var i = 0; i < dix_premiers.size(); i++) {
    if (dix_premiers.getJoueur(i).name == name) {
      return true;
    }
  }
  return false;
}

function isInTheTop10(name) {
  var n = 0;
  for (var i = 0; i < dix_premiers.size(); i++) {
    if (dix_premiers.getJoueur(i).score < score) {
      n++;
    }
  }

  if (n < 10) {
    return true;
  }
  else {
    return false;
  }
}

function result() {
  div.html('');

  if (isInTheTop10(name)) {
    var message = $('<p>');
    message.text('Vous faites partie des TOP 10');
    message.css('color', 'green');

    dix_premiers.add(new Joueur(name, left_points, word_length, time));
    localStorage.setItem('dix_premiers', JSON.stringify(dix_premiers));

    div.append(message);
  }

  show_dix_premiers();

  var button = $("<button>");
  button.text('Recommencer');
  button.click(start_game);
  button.attr('id', 'start_button');

  div.append(button);
}

function show_dix_premiers() {
  var table = $('<table>');
  table.css({'border': '1px solid black', 'margin': '0px auto'});

  var tr = $('<tr>');

  var th_rank = $('<th>'); th_rank.text('Rank'); th_rank.css('border', '1px solid black');
  var th_name = $('<th>'); th_name.text('Name'); th_name.css('border', '1px solid black');
  var th_time = $('<th>'); th_time.text('Temps'); th_time.css('border', '1px solid black');
  var th_score = $('<th>'); th_score.text('Score'); th_score.css({'border' : '1px solid black', 'color' : 'green'});

  tr.append(th_rank);
  tr.append(th_name);
  tr.append(th_time);
  tr.append(th_score);
  table.append(tr);
  div.append(table);

  for (var i = 0; i < dix_premiers.size(); i++) {
    var tr = $('<tr>');

    var td_rank = $('<td>'); td_rank.text(i + 1);
    var td_name = $('<td>'); td_name.text(dix_premiers.getJoueur(i).name);
    var td_time = $('<td>'); td_time.text(dix_premiers.getJoueur(i).time);
    var td_score = $('<td>'); td_score.text(1 / dix_premiers.getJoueur(i).score);

    tr.append(td_rank);
    tr.append(td_name);
    tr.append(td_time);
    tr.append(td_score);
    table.append(tr);
  }
}

function getSavedList() {
  var ls = JSON.parse(localStorage.getItem('dix_premiers'));

  if (ls) {
    ls['joueurs'].forEach(joueur => dix_premiers.add(new Joueur(joueur.name, joueur.left_points, joueur.word_length, joueur.time)));
  }
}

function Dix_premiers() {

  this.joueurs = [];

  this.add = function (joueur) {
    this.joueurs.push(joueur);
    this.sort();
    this.keep_first_10();
  }

  this.sort = function () {
    this.joueurs.sort(function (a, b) { return a.score - b.score });
  }

  this.keep_first_10 = function () {
    this.joueurs = this.joueurs.slice(0, 10);
  }

  this.getJoueur = function (index) {
    return this.joueurs[index];
  }

  this.toString = function () {
    return this.joueurs.forEach((joueur, rank) => console.log(String(rank + 1) + " => " + String(joueur)));
  }

  this.size = function () {
    return this.joueurs.length;
  }
}

function Joueur(name, left_points, word_length, time) {

  this.name = name;
  this.left_points = left_points;
  this.word_length = word_length;
  this.time = time;
  this.score = this.time / this.word_length + this.left_points;

  this.toString = function () {
    return "Nom : " + this.name + ", time : " + this.time + " s" + ", score : " + this.score;
  }
}


var div = $('#main');
//var words = ['Pendule'];
var words = ['Abricot', 'Ananas', 'Avocat', 'Banane', 'Cerise', 'Citron', 'Clémentine', 'Datte', 'Fraise', 'Framboise', 'Grenade', 'Kiwi', 'Kaki', 'Litchi', 'Mandarine', 'Mangue', 'Orange', 'Poire', 'Tomate'];
var number_steps = 6;

var time;
var left_points;
var word_length;
var score;
var dix_premiers = new Dix_premiers();
getSavedList();

//localStorage.clear();

