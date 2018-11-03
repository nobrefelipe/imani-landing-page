import $ from "jquery";

// Variable to hold request
var request;

let temp_emails =  [];

// Bind to the submit event of our form
$(".sign-up-form").submit(function(event){

  // Prevent default posting of form
  event.preventDefault();


  // Abort any pending request
  if (request) {
    request.abort();
  }
  // setup some local variables
  var $form = $(this);

  // Let's select and cache all the fields
  var $inputs = $form.find("input, select, button, textarea");

  // Serialize the data in the form
  var serializedData = $form.serialize();

  // Let's disable the inputs for the duration of the Ajax request.
  // Note: we disable elements AFTER the form data has been serialized.
  // Disabled form elements will not be serialized.
  $inputs.prop("disabled", true);


  temp_emails.push($inputs[0].value);

  let IMANI_EMAIL_REGISTRATION = 	window.localStorage.getItem('IMANI_EMAIL_REGISTRATION');

  let stored_emails = IMANI_EMAIL_REGISTRATION ? IMANI_EMAIL_REGISTRATION.split(',') : [];

  if(stored_emails.includes($inputs[0].value)){

    alert("ja registrado");

    $inputs.prop("disabled", false);

  }else{

    // ESCONDER TODOS OS FORMULARIO
    $(".sign-up-form").fadeOut();

    $(".success-message").fadeIn();

    temp_emails.push($inputs[0].value);

    localStorage.setItem("IMANI_EMAIL_REGISTRATION", temp_emails);

    // Fire off the request to /form.php
    request = $.ajax({
      url: "https://script.google.com/macros/s/AKfycbwqY96MTOsFPGP7xwHeH9TeqiC-OEn6OR5iQqW6FuyLu3D4JnQc/exec",
      type: "post",
      data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
      // Log a message to the console
      console.log("Hooray, it worked!");
      console.log(response);
      console.log(textStatus);
      console.log(jqXHR);
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error(
        "The following error occurred: "+
        textStatus, errorThrown
      );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
      // Reenable the inputs
      $inputs.prop("disabled", false);
    });



  }


});


//SHARE FACEBOOK LINK

let facebookButton = document.getElementById("share-facebook");

let fbLink = "https://www.facebook.com/sharer/sharer.php?u=";

let siteUrl = window.location.href;

facebookButton.setAttribute("href", fbLink + siteUrl)