Template.welcomeView.events({
    'click #logout-btn': function() {
	Meteor.logout();
	location.reload();
    }
});

Template.classRoomsList.helpers({
    'classRooms' : function() {
	return ClassRooms.find({students : {$in : [Meteor.userId()]}});
    }
});