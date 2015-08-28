function submitContactForm() {

	var first_name = $("#first_name_contact_form").val();
	var last_name = $("#last_name_contact_form").val();
	var phone_number = $("#phone_number_contact_form").val();
	var recipient = "guidoalloatti@gmail.com";
	var sender = $("#email_contact_form").val();
	var subject = $("#subject_contact_form").val();
	var message = "New enquiry made from: " + first_name + " " + last_name + "<br>Original message: <br>";
	message += $("#message_contact_form").val();;

	Meteor.call('sendEmail',
            recipient,
            sender,
            subject,
            message);

}