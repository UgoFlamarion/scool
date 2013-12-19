Meteor.startup(function () {
    // If the DB is empty, we fill it with some initial data
    if (Meteor.users.find().count() === 0) {
	Accounts.createUser({username : 'Ugo Flamarion', email : 'ugo.flamarion@gmail.com', password : 'a', profile : {type : 'teacher'}});
	var jdUserId = Accounts.createUser({username : 'John Doe', email : 'john.doe@gmail.com', password : 'a', profile : {type : 'student'}});

	ClassRooms.insert({'title' : 'My First English Class', students : [jdUserId]});
	ClassRooms.insert({'title' : 'My First French Class', students : [jdUserId]});
	ClassRooms.insert({'title' : 'My First Vietnamese Class', students : [jdUserId]});

    }
});