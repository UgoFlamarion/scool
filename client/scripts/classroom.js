Template.classroom.helpers({
    'userPicture': function(studentId) {
	var user = Meteor.users.findOne({_id: studentId});
	var picture = '<div class="avatar">';
	picture += '<img src="';
	if (user.picture)
	    picture += user.picture;
	else
	    picture += '/pictures/anonymous.png';
	picture += '" ';
	picture += 'title="' + user.username + '"';
	picture += '>';
	if (Meteor.user()._id == studentId)
	    picture += '<p>' + user.username + '</p>';
	else
	    picture += '<a href="#">' + user.username + '</a>';
	picture += '</div>';
	return picture;
    }
});

Template.classroom.classroom = function ( ) {
    return ClassRooms.findOne({_id: Session.get('classroom_id')});
}