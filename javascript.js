var val_of_btn;
var reaction_timeS = 0;
var memoryS = 1;
var done = false;

// show number to mem
// calulate
// score
// stlye

class Make {
  constructor(content, type = 'num') {
    this.content = content;
  }

  get button() {
      let btn = document.createElement("BUTTON");
      btn.innerHTML = this.content;
      btn.id = this.content;
      btn.className = 'btn';

      //an anyomus function probly isent ideal hard to get arond so and nested dosnt work bc the scope
      btn.onclick = function () {
        // this shoulnt be done here but theres problms with the scope
        if (this.id != "BackSpace" && this.id != "Submit" && this.id != "Start" && this.id != 'continue') {
          document.getElementById('button_val').innerHTML = document.getElementById('button_val').innerHTML + this.id;
        } else if (this.id == 'BackSpace') {
          console.log('back');
          document.getElementById('button_val').innerHTML = document.getElementById('button_val').innerHTML.slice(0, -1);
        }
        if (this.id == 'Submit') {

          do_test(3);
        }
        if (this.id == 'Start') {
          document.getElementById('Start').remove();
          memory_page(memoryS);
        }
        if (this.id == 'continue') {
          document.getElementById('heading').innerHTML = '';
          document.getElementById('text_shown').innerHTML = ''
          document.getElementById('continue').remove();
          new test().buildGrid;

        }
      };
        document.body.appendChild(btn);
  }

  get getBlockVal() {
    // a potential way to fix the scope problem/ or bypass
    return document.getElementById('button_val').innerHTML;
  }

}

class test {
  constructor(mem_score, reaction_time_score) {
      this.memS = mem_score;
      this.RT = reaction_time_score;
  }

  get start_test() {
    document.getElementById('text_shown').innerHTML = 'Test 1 of 2: <br><br><br> Number sequence <br><br> Remember the number each time with one more digit, input it into the next screen'
    console.log(memoryS);

    var start_button = new Make('Start').button;

    //memoryS++;
  }

  get buildGrid() {

    unique_number_set(0,9).forEach(function(val) {
       new Make(val).button;
    });

    new Make('BackSpace').button;
    new Make('Submit').button;


  }

  reaction_time() {

  }

  get hh() {
    this.buildGrid();
  }
}



function unique_number_set(from, to) {
    var output_array = [];

    num_len = Math.abs(from - to)

    for (let i = 0; i <= num_len; i++) {
      output_array.push(i);
    }

    return output_array.sort(function() {
      return .5 - Math.random();
    });
}

function random_number_array(to) {
  let output_array = [];
  for (var i = 0; i <= to; i++) {
    output_array.push(Math.floor((Math.random() * to)))
  }
  return output_array;
}

function NumbertoRemeber (memS) {
 var output = '';
  for (let i = 1; i <= memS; i++) {

     output = Math.floor((Math.random() * 9)) + "" + output;

  }
  return output;
}

function is_done(memoryS, end_time) {
  let arr = [memoryS, end_time, performance.now()];
  jsonOutput = JSON.stringify(arr);
  //^ save this ^
}

new test().start_test;

//this should be incoracted into a the Test class

function memory_page(memoryS) {
  document.getElementById('text_shown').innerHTML = ''


  var number_temp = NumbertoRemeber(memoryS);
  document.getElementById('heading').innerHTML = 'Remember:';
  document.getElementById('text_shown').innerHTML = document.getElementById('text_shown').innerHTML = number_temp;
  document.getElementById('hold_temp').innerHTML = document.getElementById('text_shown').innerHTML;
  new Make('continue').button
}

function do_test(stage) {

    if (document.getElementById('hold_temp').innerHTML == document.getElementById('button_val').innerHTML) {
      memoryS++;

      console.log(memoryS);


      unique_number_set(0,9).forEach(function(val) {
         document.getElementById(val).remove();
      });
      document.getElementById('BackSpace').remove();
      document.getElementById('Submit').remove();
      document.getElementById('button_val').innerHTML = '';
      memory_page(memoryS);

    } else {
      unique_number_set(0,9).forEach(function(val) {
         document.getElementById(val).remove();
      });
      document.getElementById('BackSpace').remove();
      document.getElementById('Submit').remove();
      document.getElementById('button_val').innerHTML = '';
      reaction_time();

    }

  }


function reaction_time() {
  document.getElementById('text_shown').innerHTML = 'Test 2 of 2: <br><br><br> Reaction Time <br><br>Tap as soon as the screen turns green <br><br> (tap to take test)';
    var ready = 0;
    setTimeout(function(){

      window.onclick = function() {
        document.getElementById('text_shown').innerHTML = '';
        document.body.style.background = 'red';
        ready = 1;
      }
    }, 1);
    if (ready == 1) {
      //this should fix the bugs but it dosent trigger
    }
    min = 0.7;
    max = 3;
    var rand_time = Math.floor(Math.random() * (max - min + 1) + min);

    setTimeout(function(){

        document.body.style.background = 'green';
        start_time = performance.now();
        window.onclick = function() {
          stop_time = performance.now();
          document.body.style.background = '#343434';

          if (memoryS == 1 ) {
            memoryS = 0;
          }

          end_time = start_time - stop_time;


          document.getElementById('text_shown').innerHTML = 'your score: <br><br> ' + 'memory:' + memoryS + '<br>' + 'reaction_time: ' + end_time;
          is_done(memoryS, end_time); // use this for the output
        }

    }, rand_time * 1000 );

    }
