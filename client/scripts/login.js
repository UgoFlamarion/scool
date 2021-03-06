// Command to check users
// Meteor.users.find().forEach(function(data) { console.log(data._id + " : " + data.username + " : " + data.email)});

Template.login.events({
    "click #submit-login": function() {
	var user = $('#email').val();
	var password = $('#password').val();
	Meteor.loginWithPassword(user, password, function(error) {
	    if (error) {
		Session.set("loginErrorMessage", "Failed to log in (" + error.reason + ").");
		return false;
	    }
	});
    },
    "click #submit-subscribe": function() {
	var firstName = capitalizeFirstLetter($('#first-name').val());
	var lastName = capitalizeFirstLetter($('#last-name').val());
	var userEmail = $('#email-subscribe').val();
	var password = $('#password-subscribe').val();
	var passwordConfirm = $('#password-confirm').val();

	if (password !== passwordConfirm) {
	    Session.set("subscribeErrorMessage", "Password confirmation does not match.");
	    return false;
	}

	Accounts.createUser({username : firstName + " " + lastName, email : userEmail, password : password});
    }
});

Template.login.helpers({
    'loginErrorMessage': function() {
	var loginErrorMessage = Session.get("loginErrorMessage");
	delete Session.keys['loginErrorMessage'];
	if (loginErrorMessage)
	    return '<div class="alert alert-danger">' + loginErrorMessage + '</div>';
    },
    'subscribeErrorMessage': function() {
	var subscribeErrorMessage = Session.get("subscribeErrorMessage");
	delete Session.keys['subscribeErrorMessage'];
	if (subscribeErrorMessage)
	    return '<div class="alert alert-danger">' + subscribeErrorMessage + '</div>';
    }

});

function capitalizeFirstLetter(s) {
    if (!s)
	return '';
    return s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
}