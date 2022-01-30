$("#currentDay").text(moment().format("MMMM Do YYYY"));

var hourDisplay = [
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
    "6PM",
    "7PM",
    "8PM",
    "9PM",
    "10PM",
    "11PM",
    "12AM"
  ];

function SetUp(){

    var currentHour = (moment().format("ha")).toUpperCase();
    //console.log(currentHour)
    
    $.each(hourDisplay, function (i, hourDisplayinfo) {
        //console.log(hourDisplayinfo);
        //console.log(i)
        //first get the index of the iterated time that is not equal to the current
        getIndex = hourDisplay.indexOf(currentHour);
        currentTimeIndex = i;
        //console.log(currentTimeIndex)
    
        if (currentHour === hourDisplayinfo) {
          //define the input field to add style during loop based on current time
          inputEl = `<input type='text' class='present col border-0 note' data-time=${hourDisplayinfo} name=${hourDisplayinfo} />`;
          //capture index
        } else {
          //for times other than the current time, turn them blue or gray
    
          //if in the work day time period but not the curren time and after the current iteration
          if (getIndex !== -1 && getIndex < currentTimeIndex) {
            //make the elements green to indicate availibility
            inputEl = `<input type='text' class='future col border-0' data-time=${hourDisplayinfo} name=${hourDisplayinfo}/>`;
          } else {
            //set all other timeslots to gray
            inputEl = `<input type='text' class='past col border-0' data-time=${hourDisplayinfo} name=${hourDisplayinfo} />`;
          }
        }
        //create a row with 3 columns
        var row = $(`<div class='row'>        <div class="col-2 hour">
        ${hourDisplayinfo}
        </div>
        ${inputEl}
        <button class="col-2 saveBtn" data-time=${hourDisplayinfo}>
            Save <span class="fa fa-save"></span>
        </button>
      </div>`);
        $(".container").append(row);

    
      });
}
//initial page load
SetUp();
allTheNotes=JSON.parse(localStorage.getItem('allTheNotes')) || []
$.each(hourDisplay, function (i, hourDisplayinfo) {
    $.each(allTheNotes,function(i,timenotes){
        if(hourDisplayinfo==timenotes.timeNow){
           // $(`[data-time=${hourDisplayinfo}]`).val(timenotes.noteContents)
           document.querySelectorAll(`[data-time='${hourDisplayinfo}']`)[0].value=timenotes.noteContents;
            console.log(document.querySelectorAll(`[data-time='${hourDisplayinfo}']`)[0])
        }
    })

});







// refresh the set up every hour
setInterval(SetUp,3600000);


$(".saveBtn").on("click",function(event){
allTheNotes.push({
    timeNow: event.currentTarget.dataset.time,
    noteContents: $(this).prev()[0].value
})
localStorage.setItem("allTheNotes",JSON.stringify(allTheNotes))
console.log(allTheNotes)

})