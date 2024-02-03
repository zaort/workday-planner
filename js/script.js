// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {

  function updateDateTime() {
    var currentDateTime = dayjs().format('MMM D, YYYY HH:mm:ss');
    $('#currentDay').text(currentDateTime);
  }
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").click(function () {
    var hourId = $(this).closest('.time-block').attr('id');
    var description = $(this).siblings('.description').val().trim();
    localStorage.setItem(hourId, description);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var hourId = parseInt($(this).attr('id').split('-')[1]);
      if (hourId < currentHour) {
        $(this).addClass('past').removeClass('present future');
      } else if (hourId === currentHour) {
        $(this).addClass('present').removeClass('past future');
      } else {
        $(this).addClass('future').removeClass('past present');
      }
    });
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $(".time-block").each(function () {
    var hourId = $(this).attr('id');
    var savedDescription = localStorage.getItem(hourId);
    if (savedDescription) {
      $(this).find('.description').val(savedDescription);
    }
  });

  // TODO: Add code to display the current date in the header of the page.
  updateDateTime();
  setInterval(updateDateTime, 1000);

  updateTimeBlocks();
  setInterval(updateTimeBlocks, 1000);
});


// test code before full functionality was completed

// $(function () {

//   var currentDateTime = dayjs().format('MMM D, YYYY HH:mm:ss');
//   $('#currentDay').text(currentDateTime);

//   var currentTime = dayjs().format('HH')
//   console.log(currentTime);

//   var savebutton = $(".saveBtn")

//   var timeBlock = $(".time-block")

//    // verify JQuery

//   // var taskDetails = {
//   //   taskdetails: descriptionInput.val().trim(),
//   //   // position-id: // "textarea".position - how do I get the position? Search for it in past activities
//   // }

//   savebutton.click(function () {
//     var descriptionInput = savebutton.siblings("textarea").val().trim()
//     console.log($(".saveBtn"))
//     console.log($(this).siblings("textarea").val())
//     localStorage.setItem('taskDetails', JSON.stringify(descriptionInput))
//   })
// });

