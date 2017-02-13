$(()=>{
  console.log('JS Loaded');

  const $playBtn = $('.play-btn');
  const $landingPlay = $('.landing-play');
  const $htp = $('.how-to-play');
  const $levelOne = $('.level-one');
  const $gameBoard = $('.game-board');
  const $duck = $('.duck');
  const $goose = $('.goose');
  const $superman = $('.superman');
  const $scoreDisplay = $('.score');
  const $timer = $('.timer');
  const $gameOver = $('.gameover');
  const $gameOverDisplay = $('.game-over-score');
  const $playAgain = $('.play-again');
  let $score = 0;
  let timeRemaining = 20;
  let timerIsRunning = false;
  let timerId = null;

  //// Animation function
  function animateDuck(){
    const animateHeight = (Math.floor(Math.random() * 61) + 10)+'%';
    $duck.animate({
      left: '105%'
    }, 5000, 'linear', function() {
      $duck.css({ left: '-50px', top: animateHeight});
      animateDuck();
    } );
    console.log('Duck Animated!');
  }

  function animateGoose(){
    const animateHeight = (Math.floor(Math.random() * 61) + 10)+'%';
    $goose.delay(2000).animate({
      left: '105%'
    }, 4000, 'linear', function() {
      $goose.css({ left: '-150px', top: animateHeight });
      animateGoose();
    } );
    console.log('Goose Animated!');
  }

  function animateSuperman(){
    const animateHeight = (Math.floor(Math.random() * 61) + 10)+'%';
    $superman.delay(3000).animate({
      left: '105%'
    }, 2000, 'linear', function() {
      $superman.css({ left: '-250px', top: animateHeight});
      animateSuperman();
    } );
    console.log('Superman Animated!');
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

  function hideSuperman(){
    $superman.hide();
    console.log('Goose hidden!');
  }

  //// Move duck back to original position
  function duckReplaced(){
    const animateHeight = (Math.floor(Math.random() * 61) + 10)+'%';
    $duck.css({ left: '-50px', top: animateHeight});
    console.log('Duck Replaced!');
  }
  function gooseReplaced(){
    const animateHeight = (Math.floor(Math.random() * 61) + 10)+'%';
    $goose.css({ left: '-150px', top: animateHeight});
    console.log('Goose Replaced!');
  }
  function supermanReplaced(){
    const animateHeight = (Math.floor(Math.random() * 61) + 10)+'%';
    $superman.css({ left: '-150px', top: animateHeight});
    console.log('Superman Replaced!');
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
  function showSuperman(){
    $superman.show();
    console.log('Superman shown!');
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

  function returnToStartSuperman(){
    $superman.stop();
    hideSuperman();
    supermanReplaced();
    showSuperman();
    animateSuperman();
  }

  //// Duck clicked
  function duckClicked(){
    $duck.on('click', ()=>{
      //// run returnToStart
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
  function supermanClicked(){
    $superman.on('click', ()=>{
      //// run returnToStart
      returnToStartSuperman();
      console.log('Superman clicked!');
      //// add 1 to current score
      $score+=50;
      $scoreDisplay.html($score);
    });
  }

  //// Run duckClicked
  duckClicked();
  gooseClicked();
  supermanClicked();

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
        $duck.stop();
        $goose.hide();
        $goose.stop();
        $superman.hide();
        $superman.stop();
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

  $levelOne.on('click' , ()=>{
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
    animateSuperman();
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
    $superman.show();
    $timer.show();
    returnToStartDuck();
    returnToStartGoose();
    returnToStartSuperman();
    startGame();
  });
});
