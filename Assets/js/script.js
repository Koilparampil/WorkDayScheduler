$("#currentDay").text(moment().format("MMMM Do YYYY"));

function SetUp(){
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
      ];
    var currentHour = (moment().format("ha")).toUpperCase();
    console.log(currentHour)
    
    $.each(hourDisplay, function (i, hourDisplayinfo) {
        console.log(hourDisplayinfo);
        console.log(i)
        //first get the index of the iterated time that is not equal to the current
        getIndex = hourDisplay.indexOf(currentHour);
        currentTimeIndex = i;
        console.log(currentTimeIndex)
    
        if (currentHour === hourDisplayinfo) {
          //define the input field to add style during loop based on current time
          inputEl = `<input type='text' class='bg-danger col border p-3 note text-light' value='' data-time=${hourDisplayinfo} />`;
          //capture index
        } else {
          //for times other than the current time, turn them blue or gray
    
          //if in the work day time period but not the curren time and after the current iteration
          if (getIndex !== -1 && getIndex < currentTimeIndex) {
            //make the elements green to indicate availibility
            inputEl = `<input type='text' class='bg-success col border p-3 note text-light' value='' data-time=${hourDisplayinfo} />`;
          } else {
            //set all other timeslots to gray
            inputEl = `<input type='text' class='bg-secondary col border p-3 note text-dark' value='' data-time=${hourDisplayinfo} />`;
          }
        }
    
        //create a row with 3 columns
        var row = $(`<div class='row'>
        <div class="col-2 text-right border-top border-bottom p-3 time">
                ${hourDisplayinfo}
            </div>
            ${inputEl}
            <button class="btn-sm btn-info col-2 border-top border-bottom p-3 save">
                Save <i class="far fa-save"></i>
            </button>`);
        $(".container").append(row);
      });     
}
SetUp();