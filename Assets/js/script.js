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
    "5PM"
  ];

function SetUp(){

    var currentHour = (moment().format("ha")).toUpperCase();
    //console.log(currentHour)
    
    $.each(hourDisplay, function (i, hourDisplayinfo) {
        //console.log(hourDisplayinfo);
        //console.log(i)
        //first get the index of the iterated time 
        getIndex = hourDisplay.indexOf(currentHour);
        currentTimeIndex = i;
        //console.log(currentTimeIndex)
    //we're in the loop of setting up the Hours, so if the display hour is the same as the real current hour, the input should be the present
        if (currentHour === hourDisplayinfo) {
          inputEl = `<input type='text' class='present col border-0 note' data-time=${hourDisplayinfo} name=${hourDisplayinfo} />`;
        } else {
            //if the hour displayed is not the hour it is then check if the hour is coming up,
          if (getIndex !== -1 && getIndex < currentTimeIndex) {
            //make the elements green if teh hour is coming up
            inputEl = `<input type='text' class='future col border-0' data-time=${hourDisplayinfo} name=${hourDisplayinfo}/>`;
          } else {
            //set all other times to grey
            inputEl = `<input type='text' class='past col border-0' data-time=${hourDisplayinfo} name=${hourDisplayinfo} />`;
          }
        }

        //creating the individual rows, it goes, a big div with the class row, then a smaller div with the hour, sibling input element, sibling button element
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
           document.querySelectorAll(`[data-time='${hourDisplayinfo}']`)[0].value=timenotes.noteContents;
            //console.log(document.querySelectorAll(`[data-time='${hourDisplayinfo}']`)[0])
        }
    })

});







// refresh the set up every hour
setInterval(SetUp,3600000);


$(".saveBtn").on("click",function(event){

allTheNotes.push(
    //console.log(event.currentTarget.dataset.time),
    //console.log($(this).prev()[0]),
    {
    timeNow: event.currentTarget.dataset.time,
    
    noteContents: $(this).prev()[0].value
})
localStorage.setItem("allTheNotes",JSON.stringify(allTheNotes))
//console.log(allTheNotes)

})