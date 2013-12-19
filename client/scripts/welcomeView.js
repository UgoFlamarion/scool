Template.welcomeView.events({
    'click #logout-btn': function() {
	Meteor.logout();
	location.reload();
    }
});

Template.welcomeView.helpers({
    'userName': function() {
	if (Meteor.user())
	    return Meteor.user()['username'];
    }
});

Template.classRoomsList.helpers({
    'classRooms' : function() {
	return ClassRooms.find({students : {$in : [Meteor.userId()]}});
    }
});