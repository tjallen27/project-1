$(()=>{
  console.log('JS Loaded');

  const $playBtn = $('.play-btn');
  const $landingPlay = $('.landing-play');
  const $gameBoard = $('.game-board');
  const $duck = $('.duck');
  const $goose = $('.goose');
  const $scoreDisplay = $('.score');
  const $timer = $('.timer');
  const $gameOver = $('.gameover');
  const $gameOverDisplay = $('.game-over-score');
  const $playAgain = $('.play-again');
  let $score = 0;
  let timeRemaining = 20;
  let timerIsRunning = false;
  let timerId = null;
  let $animateCounter = 1;
  const animateHeight = (Math.floor(Math.random() * 21) + 30)+'%';

  //// Animation function
  function animateDuck(){
    if ($animateCounter % 2 === 0 ){
      $duck.animate({
        left: '105%'
      }, 5000, 'linear', function() {
        $duck.css({ left: '-50px'});
        animateDuck();
      } );
      console.log('Duck Animated!');
    }
    { if ($animateCounter % 2 === 1){
      $duck.animate({
        left: '105%'
      }, 5000, 'linear', function() {
        $duck.css({ left: '-50px', top: animateHeight});
        animateDuck();
      } );
    }}
  }

  function animateGoose(){
    $goose.delay(2000).animate({
      left: '105%'
    }, 4000, 'linear', function() {
      $goose.css({ left: '-150px' });
      animateGoose();
    } );
    console.log('Goose Animated!');

  }

  //// Hide duck
  function hideDuck(){
    $duck.hide();
    console.log('Duck hidden!');
  }

  function hideGoose(){
    $goose.hide();
    console.log('Goose hidden!');
  }

  //// Move duck back to original position
  function duckReplaced(){
    $duck.css('left', '-50px');
    console.log('Duck Replaced!');
  }
  function gooseReplaced(){
    $goose.css('left', '-150px');
    console.log('Duck Replaced!');
  }

  //// Show duck
  function showDuck(){
    $duck.show();
    console.log('Duck shown!');
  }
  function showGoose(){
    $goose.show();
    console.log('Goose shown!');
  }

  //// When duck reaches end or is clicked, return to start position.
  function returnToStartDuck(){
    $duck.stop();
    hideDuck();
    duckReplaced();
    showDuck();
    animateDuck();
  }

  function returnToStartGoose(){
    $goose.stop();
    hideGoose();
    gooseReplaced();
    showGoose();
    animateGoose();
  }

  //// Duck clicked
  function duckClicked(){
    $duck.on('click', ()=>{
      //// run returnToStart
      $animateCounter++;
      console.log($animateCounter);
      returnToStartDuck();
      console.log('Duck clicked!');
      //// add 1 to current score
      $score+=5;
      $scoreDisplay.html($score);
    });
  }
  function gooseClicked(){
    $goose.on('click', ()=>{
      //// run returnToStart
      returnToStartGoose();
      console.log('Goose clicked!');
      //// add 1 to current score
      $score+=20;
      $scoreDisplay.html($score);
    });
  }

  //// Run duckClicked
  duckClicked();
  gooseClicked();

  //// Start timer
  function startGame() {
    timerId = setInterval(() => {
      timeRemaining--;
      $timer.text(timeRemaining);

      if(timeRemaining === 0) {
        clearInterval(timerId);
        returnToStartDuck();
        returnToStartGoose();
        $duck.hide();
        $goose.hide();
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
      scrollTop: $gameBoard.offset().top
    }, 2000);
    event.preventDefault();
  });


  ///// When game-board button is clicked, fade out and start the game
  $playBtn.on('click', () => {
    //// Fade out button
    $playBtn.fadeOut('fast');
    //// Begin animation
    animateDuck();
    animateGoose();
    startGame();
  });

  $playAgain.on('click', ()=>{
    $gameOver.hide();
    timeRemaining = 20;
    $timer.text('20');
    $score = 0;
    $scoreDisplay.html($score);
    $duck.show();
    $goose.show();
    $timer.show();
    returnToStartDuck();
    returnToStartGoose();
    startGame();
  });
});
