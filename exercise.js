$(document).ready(function() {
  var set_pointer = 0;
  var exerciseEl  = $('#exercise');
  var counterEl   = $('#counter');
  var restText    = 'rest';

  (function handleAllSets(){
    var set = exercises[set_pointer];
    if(set){
      handleSet(set, function(){
        set_pointer++;
        setInterval(function(){
          setTimer(20);
          handleAllSets();
        },20000)
      });
    } else {
      exerciseEl.html('all done');
      counterEl.html('');
      $('body').removeClass('exercising');
      $('body').removeClass('resting');
      $('body').addClass('nomore');
    }
  })();


  function setTimer(seconds){
    counterEl.html(seconds);
    --seconds;
    if(seconds > 0){
      setTimeout(function(){
        setTimer(seconds);
      },1000);
    }
  }


 function handleSet(set, callback){
   var set_run_counter = 0;
   var exercise_counter = 0;

   (function handleSetExercise() {
     if (exercise_counter > set.length-1 && set_run_counter < 2){
       set_run_counter++;
       exercise_counter =0;
     }
     var exercise = set[exercise_counter];

     if(exercise) {
       handleExercise(exercise, function(){
         exercise_counter++;
         handleSetExercise();
       });
     } else {
       callback();
     }
   })();
 }

 function handleExercise(exercise, callback){
   exerciseEl.html(exercise);
   $('body').addClass('exercising');
   $('body').removeClass('resting');
   setTimer(20);
   setTimeout(function(){
     exerciseEl.html(restText);
     $('body').addClass('resting');
     $('body').removeClass('exercising');
     setTimer(10);
     setTimeout(function(){
       callback();
     },10000);
   },20000);
 }

});
