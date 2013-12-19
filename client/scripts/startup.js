Meteor.startup(function () {
	// Log John Doe in in the first place
	Meteor.loginWithPassword('john.doe@gmail.com', 'a');
});