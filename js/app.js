var zap = zap || {};

//// Animate element
zap.animate = function ($elem){
  const speed = this.level === 1 ? 8000 : this.level === 2 ? 5000 : 3000;
  $elem.stop()
       .animate({
         left: '110%'
       }, speed, 'linear', function() {
         $elem.css({ left: '-150px'});
         zap.animate($elem);
       });
};

//// When element reaches end or is clicked, return to start position.
zap.returnToStart = function ($elem){
  const animateHeight = (Math.floor(Math.random() * 61) + 10)+'%';

  $elem
    .stop()
    .hide()
    .css({ left: '-150px', top: animateHeight })
    .show();

  this.animate($elem);
};

//// Display the leaderboard
zap.displayLeaderboard = function (){
  const $playerName = $('#yourName').val();
  $('i').fadeIn('slow');
  $('.leaderboard h2').html(`${$playerName}'s Scores`);
  $('.leaderboard').fadeIn();
};

//// Start timer
zap.startGame = function () {
  var $playerName = $('#yourName').val();
  this.timerId = setInterval(() => {
    this.timeRemaining--;
    this.$timer.text(this.timeRemaining);

    if(this.timeRemaining === 0) {
      $('.gameOverSound')[0].play();
      clearInterval(this.timerId);
      this.returnToStart(this.$allTargets);
      this.$allTargets
        .stop()
        .hide();
      this.$timer.hide();
      this.$timer.text('');
      this.$gameOverDisplay.html(this.$score);
      this.$gameOver.fadeIn();

      ////Push name and score object into empty array
      this.scoresArr.push({Name: $playerName, Score: this.$score});
      console.log(this.scoresArr);

      /////Sort object by score
      this.scoresArr.sort((a,b)=>{
        return a.score - b.score;
      });

      ///Append Name and Score to leaderboard list
      $('.leaderboard ul').each(function (i) {
        console.log(i);
        console.log(zap.scoresArr);
        console.log(this.scoresArr);
        $(this).prepend(`<li>${zap.scoresArr[zap.scoresArr.length-1].Score}</li>`);
      });
      this.displayLeaderboard();
    }
  }, 1000);
  this.timerIsRunning = true;
};

/********SETUP FUNCTION*******/
zap.setup = function() {

  zap.$playBtn = $('.play-btn');
  zap.$landingPlay = $('.landing-play');
  zap.$htp = $('.how-to-play');
  zap.$toGame = $('.toGame');
  zap.$gameScreen = $('.game-screen');
  zap.$shipOne = $('.ship1');
  zap.$shipTwo = $('.ship2');
  zap.$superman = $('.superman');
  zap.$scoreDisplay = $('.score');
  zap.$timer = $('.timer');
  zap.$gameOver = $('.gameover');
  zap.$gameOverDisplay = $('.game-over-score');
  zap.$playAgain = $('.play-again');
  zap.$allTargets = $('.target');
  zap.$levelTwoDisplay = $('.levelTwoDisplay');
  zap.$levelThreeDisplay = $('.levelThreeDisplay');
  zap.$shotgun = $('.shootSound')[0];
  zap.$score = 0;
  zap.timeRemaining = 25;
  zap.timerId = null;
  zap.level = 1;
  zap.scoresArr = [];

  ///// When landing button is clicked, scroll to top of htp screen
  this.$landingPlay.on('click' , ()=>{
    console.log('button clicked');
    $('html, body').animate({scrollTop: this.$htp.offset().top}, 2000);
    event.preventDefault();
  });

  ///// Down to game screen
  this.$toGame.on('click' , ()=>{
    $('html, body').animate({scrollTop: this.$gameScreen.offset().top}, 2000);
    event.preventDefault();
  });

  ///// Down to scoreboard
  $('i').on('click' , ()=>{
    $('html, body').animate({scrollTop: $('.leaderboard').offset().top}, 2000);
    event.preventDefault();
  });

  ///// When game-board button is clicked, fade out and start the game
  this.$playBtn.on('click', () => {
    this.$playBtn.fadeOut('fast');
    this.animate(this.$allTargets);
    this.startGame();
  });

  //// Start game again
  zap.$playAgain.on('click', ()=>{
    $('html, body').animate({scrollTop: this.$gameScreen.offset().top}, 1000);
    event.preventDefault();

    this.$gameOver.hide();
    $('i').hide();

    this.timeRemaining = 25;
    this.$timer.text('25');
    this.$score = 0;
    this.level = 1;
    this.$scoreDisplay.html(this.$score);

    this.$allTargets.show();
    this.$timer.show();

    this.returnToStart(this.$shipOne);
    this.returnToStart(this.$shipTwo);
    this.returnToStart(this.$superman);
    this.startGame();
  });

  this.$allTargets.on('click', (e)=>{
    $('.shootSound')[0].play();
    this.returnToStart($(e.target));
    this.$score += 200;
    this.$scoreDisplay.html(this.$score);

    //// LEVEL 2
    if (this.$score === 300){
      this.level = 2;
      this.$levelTwoDisplay.fadeIn('slow').fadeOut();
    }
    //// LEVEL 3
    if (this.$score === 600){
      this.level = 3 ;
      this.$levelThreeDisplay.fadeIn('slow').fadeOut();
    }
  });
};

$(zap.setup.bind(zap));
