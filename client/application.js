
if (Meteor.isClient) {
  Template.Accordion.rendered = function () {
    $(function() {
      $("#accordion").accordion({
        heightStyle: "content"
      });
    });
  };

  Template.body.events({
    "submit #contact-form": function (event) {
        $('#message_sent').hide();
        event.preventDefault();

        var fields_error = false;
        if(first_name.value == '') {
            $("#missing_first_name").show();
            fields_error = true;
        } else $("#missing_first_name").hide();

        if(last_name.value == '') {
            $("#missing_last_name").show();
            fields_error = true;
        } else $("#missing_last_name").hide();
        
        if(email.value == '') {
            $("#missing_email").show();
            fields_error = true;
        } else $("#missing_email").hide();

        if(subject.value == '') {
            $("#missing_subject").show();
            fields_error = true;
        } else $("#missing_subject").hide();

        if(message.value == '') {
            $("#missing_message").show();
            fields_error = true;
        } else $("#missing_message").hide();
        if(fields_error) return false;


        var fullMessage     = 
            'New enquiry!\n' +
            '============\n\n' +
            'Enquiry made by: '  + first_name.value + ' ' + last_name.value + '\n' +
            'Phone Number: '    + phone_number.value  + '\n' +
            'Email Address: '   + email.value + '\n\n' +
            'Message Received:' + '\n' + 
            '=================' + '\n' +
            message.value;

        Meteor.call('sendEmail',
            'guidoalloatti@gmail.com',
            email.value,
            subject.value,
            fullMessage);

        $("#first_name").val('');
        $("#last_name").val('');
        $("#email").val('');
        $("#phone_number").val('');        
        $("#subject").val('');
        $("#message").val('');
        $('#message_sent').show();
    }
  });

  // function submitContactForm() {
  //   alert("Submitting Contact Form");
  // }
  // // counter starts at 0
  // Session.setDefault('button_counter', 0);
  // Session.setDefault('link_counter', 0);


  // // Actions Mapping
  // Template.buttons.helpers({
  //   button_counter: function () {
  //     return Session.get('button_counter');
  //   },
  // });

  // Template.links.helpers({
  //   link_counter: function () {
  //     return Session.get('link_counter');
  //   }
  // });


  // // Event Mapping
  // Template.buttons.events({
  //   'click #add_one_button': function () {
  //     Session.set('button_counter', Session.get('button_counter') + 1);
  //   },
  //   'click #substract_one_button': function () {
  //     Session.set('button_counter', Session.get('button_counter') - 1);
  //   },
  //   'click #set_to_zero_button': function () {
  //     Session.set('button_counter', 0);
  //   }
  // });

  // Template.links.events({
  //   'click #add_one_link': function () {
  //     Session.set('link_counter', Session.get('link_counter') + 1);
  //   },
  //   'click #substract_one_link': function () {
  //     Session.set('link_counter', Session.get('link_counter') - 1);
  //   },
  //   'click #set_to_zero_link': function () {
  //     Session.set('link_counter', 0);
  //   }
  // });
}



if (Meteor.isServer) {
    Meteor.methods({
      sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);
        this.unblock();
        Email.send({
          to: to,
          from: from,
          subject: subject,
          text: text
        });
      }
    });

    Meteor.startup(function () {
        process.env.MAIL_URL="smtp://alloatti.guido%40gmail.com:21011981@smtp.gmail.com:587/";
    });
}
