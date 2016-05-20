
if (Meteor.isClient) {

  $(window).on("scroll touchmove", function () {
    $('#main-header').toggleClass('small', $(document).scrollTop() > 200, 200);
    $('.header-centered').toggleClass('small', $(document).scrollTop() > 200, 250);
    $('.english-lang').toggleClass('small', $(document).scrollTop() > 200, 210);
    $('.spanish-lang').toggleClass('small', $(document).scrollTop() > 200, 210);
    $('.go-top-element').toggleClass('small', $(document).scrollTop() > 200, 200);
    $('.go-bottom-element').toggleClass('small', $(document).scrollTop() > 200, 200);
  });

  Template.Header.events({
    "click #go_top_link": function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#top').offset().top
      }, 1000);
    },
    "click #go_bottom_link": function(event) {  
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#bottom').offset().top
      }, 1000);
    },
    "click #background_link": function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#background-anchor').offset().top
      }, 1000);
    },
    "click #about_me_link": function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#about-me-anchor').offset().top
      }, 1000);
    },
    "click #contact_link": function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#contact-anchor').offset().top
      }, 1000);
    },
    "click #visualizer_link": function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#visualizer-anchor').offset().top
      }, 1000);
    },
    "click #skills_link": function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#my-skills-anchor').offset().top
      }, 1000);
    },
    "click #my_work_link": function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#my-work-anchor').offset().top
      }, 1000);
    }
  });

  Template.carousel.rendered = function() {
    $('#carousel').slick({
      dots: true,
      arrows: true
    });
  }

  Template.Accordion.rendered = function () {
    $(function() {
      $("#accordion").accordion({
        heightStyle: "content"
      });
    });
  };

  Template.Contact.events({
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
            'email_address@gmail.com',
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
