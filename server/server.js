if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);
        this.unblock();
        Email.send({
          // console.log("In here!");  
          to: to,
          from: from,
          subject: subject,
          text: text
        });
      }
    });
    process.env.MAIL_URL="smtp://alloatti.guido%40gmail.com:21011981@smtp.gmail.com:587/";
  });
}