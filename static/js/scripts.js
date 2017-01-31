'use strict';

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function enableBtn(data) {
  $('#recaptcha-response').val(data);
  $('#submitButton').prop("disabled", false);
}

function displayErrorMessage(msg) {
    $('#errorMessages')
      .css({
        'display':"none",
        'color': "red",
        'font-weight': "bold"
      })
      .html(msg)
      .fadeIn(500, "linear", setTimeout(function(){
        $('#errorMessages').fadeOut(500);
      }, 5000));
};

function submitContact() {
  var name = $('#name').val();
  var subject = $('#subject').val();
  var email = $('#email').val();
  var confirmEmail = $('#confirmEmail').val();
  var body = $('#body').val();
  var csrf = $('[name=csrfmiddlewaretoken]')[0].value;

  var recaptchaResponse = $('#recaptcha-response').val();

  if (name == "") {
    displayErrorMessage("Please enter your name!");
    return
  }

  if (subject == "") {
    displayErrorMessage("Please enter a subject for the email!");
    return
  }

  if (email != confirmEmail) {
    displayErrorMessage("The provided emails don't match!");
    return
  }

  if (!validateEmail(email)) {
    displayErrorMessage("Please double-check your email.");
    return
  }

  if (body == "") {
    displayErrorMessage("The email body is empty!");
    return
  }

  $.post("/api/submitContact", {
    "name": name,
    "subject": subject,
    "email": email,
    "body": body,
    "csrfmiddlewaretoken": csrf,
    "recaptchaResponse": recaptchaResponse
  })
  .fail(function(data) {
    console.log("What.");
  })
  .done(function(data) {
    window.location.href = "/submitted";
  });
}

$(document).ready(function() {
  $('#Services').hover(function(){
    $('#dropdown')
      .css("display", "inline-block !important")
      .fadeIn(300, "linear");
  }, function() {
    $('#dropdown')
      .css("display", "none !important")
      .fadeOut(300, "linear");
  });
});