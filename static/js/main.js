(function($) {

	"use strict";


  // Form

	var contactForm = function() {
		if ($('#contactForm').length > 0 ) {
			$( "#contactForm" ).validate( {
				rules: {
					name: "required",
					subject: "required",
					email: {
						required: true,
						email: true
					},
					message: {
						required: true,
						minlength: 5
					}
				},
				messages: {
					name: "Please enter your name",
					subject: "Please enter your subject",
					email: "Please enter a valid email address",
					message: "Please enter a message"
				},
				/* submit via ajax */
				
				// end submitHandler

			});
		}
	};
	contactForm();

})(jQuery);

function validateForm() {
	var phoneNumber = document.getElementsByClassName("phone")[0].value;
	var phoneError = document.getElementById("phone-error");
	
	// Regular expression to match exactly 10 digits
	var phoneRegex = /^\d{10}$/;
	
	if (!phoneRegex.test(phoneNumber)) {
		phoneError.textContent = "Please enter a 10-digit phone number."; // Set error message
		return false;
	  } else {
		phoneError.textContent = ""; 
		return true;// Clear error message if valid
	  }
  }