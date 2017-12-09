var panel = $('#quiz-area');
var countStartNumber = 30;

//Button functions
$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

//Questions
var questions = [{
  question: "What was the first movie by Pixar to receive a rating higher than G in the United States?",
  answers: ["Finding Nemo", "The Incredibles", "Monsters Inc.", "Toy Story"],
  correctAnswer: "The Incredibles",
  image:"assets/images/incredibles.gif"
}, {
  question: "What is the highest grossing movie of all time?",
  answers: ["Gone With the Wind", "Titanic", "Avatar", "The Wizard of Oz"],
  correctAnswer: "Gone With the Wind",
  image:"assets/images/gonewiththewind2.gif"
}, {
  question: "The script for what movie was written during shooting breaks on the set of Raiders of the Lost Ark?",
  answers: ["Indiana Jones and the Last Crusade", "Indiana Jones and the Temple of Doom", "Poltergeist", "E.T."],
  correctAnswer: "E.T.",
  image:"assets/images/et.gif"
}, {
  question: "In Alien (1979), the blue laser lights used in the alien ship's egg chamber were borrowed from what band?",
  answers: ["Pink Floyd", "Led Zeppelin", "Yes", "The Who"],
  correctAnswer: "The Who",
  image:"assets/images/thewho.gif"
}, {
  question: 'In Citizen Kane, who or what is "Rosebud"?',
  answers: ["A Boat", "A Sled", "A Woman", "A Dog"],
  correctAnswer: "A Sled",
  image:"assets/images/rosebud2.gif"
}, {
  question: "The character Travis Bickle is from what movie?",
  answers: ["Pulp Fiction", "Taxi Driver", "American Psycho", "Ghostbusters"],
  correctAnswer: "Taxi Driver",
  image:"assets/images/taxidriver.gif"
}, {
  question: "What is Michael J. Fox's middle name?",
  answers: ["Andrew", "John", "Jacob", "James"],
  correctAnswer: "Andrew",
  image:"assets/images/what1.gif"
}, {
  question: "What city does the movie Dirty Harry take place?",
  answers: ["New York City", "Los Angeles", "San Francisco", "Chicago"],
  correctAnswer: "San Francisco",
  image:"assets/images/dirtyharry.gif"
}];

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};