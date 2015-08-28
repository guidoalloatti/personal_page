
if (Meteor.isClient) {
  function submitContactForm() {
    alert("Submitting Contact Form");
  }
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

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
