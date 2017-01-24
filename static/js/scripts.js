'use strict';

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function submitContact() {
  var title = $('#title').val();
  var email = $('#email').val();
  var confirmEmail = $('#confirmEmail').val();
  var body = $('#body').val();

  if (email != confirmEmail) {
    displayError("The provided emails don't match!");
    return
  }

  if (!validateEmail(email)) {
    displayError("Please double-check your email.");
    return
  }

  console.log(title)
  console.log(body)
  $.post("/api/submitContact", {
    "title": title,
    "email": email,
    "body": body
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