$(()=>{
  console.log('JS Loaded');

  const $playBtn = $('.play-btn');
  const $landingPlay = $('.landing-play');
  const $htp = $('.how-to-play');
  const $toGame = $('.toGame');
  const $gameBoard = $('.game-board');
  const $shipOne = $('.ship1');
  const $shipTwo = $('.ship2');
  const $superman = $('.superman');
  const $scoreDisplay = $('.score');
  const $timer = $('.timer');
  const $gameOver = $('.gameover');
  const $gameOverDisplay = $('.game-over-score');
  const $playAgain = $('.play-again');
  const $allTargets = $('.target');
  const $levelTwoDisplay = $('.levelTwoDisplay');
  const $levelThreeDisplay = $('.levelThreeDisplay');
  let $score = 0;
  let timeRemaining = 25;
  let timerId = null;
  let level = 1;

  //// Animate element
  function animate($elem){
    const delay = level === 1 ? 8000 : level === 2 ? 5000 : 3000;
    $elem.stop()
         .animate({
           left: '110%'
         }, delay, 'linear', function() {
           $elem.css({ left: '-150px'});
           animate($elem);
         } );
  }

  //// When element reaches end or is clicked, return to start position.
  function returnToStart($elem){
    const animateHeight = (Math.floor(Math.random() * 61) + 10)+'%';

    $elem
      .stop()
      .hide()
      .css({ left: '-150px', top: animateHeight })
      .show();

    animate($elem);
  }

  $allTargets.on('click', (e)=>{
    $('.sound')[0].play();
    //// run returnToStart
    returnToStart($(e.target));
    //// add 50 to current score
    $score += 50;
    $scoreDisplay.html($score);

    //// LEVEL UP
    if ($score === 600){
      level = 2;
      console.log('level 2 reached!');
      $levelTwoDisplay.fadeIn('slow').fadeOut();
    }
    if ($score === 1200){
      level = 3 ;
      console.log('level 3 reached!');
      $levelThreeDisplay.fadeIn('slow').fadeOut();
    }
  });


  //// Start timer
  function startGame() {
    timerId = setInterval(() => {
      timeRemaining--;
      $timer.text(timeRemaining);

      if(timeRemaining === 0) {
        clearInterval(timerId);
        returnToStart($allTargets);
        $allTargets
          .stop()
          .hide();
        $timer.hide();
        $timer.text('');
        $gameOverDisplay.html($score);
        $gameOver.fadeIn();
      }
    }, 1000);
    timerIsRunning = true;
  }

  ///// When landing button is clicked, scroll to top of game-screen
  $landingPlay.on('click' , ()=>{
    $('html, body').animate({
      scrollTop: $htp.offset().top
    }, 2000);
    event.preventDefault();
  });

  $toGame.on('click' , ()=>{
    $('html, body').animate({
      scrollTop: $gameBoard.offset().top
    }, 2000);
    event.preventDefault();
  });


  ///// When game-board button is clicked, fade out and start the game
  $playBtn.on('click', () => {
    //// Fade out button
    $playBtn.fadeOut('fast');
    //// Begin animation
    animate($allTargets);
    startGame();
  });

  $playAgain.on('click', ()=>{
    $gameOver.hide();
    timeRemaining = 25;
    $timer.text('25');
    $score = 0;
    level = 1;
    $scoreDisplay.html($score);
    $allTargets.show();
    $timer.show();
    returnToStart($shipOne);
    returnToStart($shipTwo);
    returnToStart($superman);
    startGame();
  });

});
