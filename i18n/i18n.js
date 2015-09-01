getUserLanguage = function (lang) {
  // var localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
  // console.log("Language from browser: " + localeFromBrowser);
  // if (localeFromBrowser == 'en-US') return 'en';
  // else if (localeFromBrowser == 'es-AR') return 'es';
  
  return 'en';
};



if (Meteor.isClient) {

  Template.Locale.events({
    "click #spanish-link": function (event) {
      event.preventDefault();
      console.log("Seteando a espanol!");
      TAPi18n.setLanguage('es');
    }
  })

  Template.Locale.events({
    "click #english-link": function (event) {
      event.preventDefault();
      console.log("Setting english!");
      TAPi18n.setLanguage('en');
    }
  })

  Meteor.startup(function () {
    Session.set("showLoadingIndicator", true);
    TAPi18n.setLanguage(getUserLanguage())
      .done(function () {
        Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        console.log(error_message);
      });
  });
}