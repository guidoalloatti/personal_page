if (Meteor.isServer) {
  Meteor.startup(function () {
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
    process.env.MAIL_URL="smtp://alloatti.guido%40gmail.com:password@smtp.gmail.com:587/";
  });
}