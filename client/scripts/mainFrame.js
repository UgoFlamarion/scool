Template.mainFrame.helpers({
    'isLoggedIn' : function() {
	return Meteor.user();
    },
    'userName': function() {
	if (Meteor.user())
	    return Meteor.user()['username'];
    }
});