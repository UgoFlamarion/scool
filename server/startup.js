Meteor.startup(function () {
    // If the DB is empty, we fill it with some initial data
    if (Meteor.users.find().count() === 0) {
	var teacherId = Accounts.createUser({username : 'Ugo Flamarion', email : 'ugo.flamarion@gmail.com', password : 'a', profile : {type : 'teacher'}});
	
	var jdUserId = Accounts.createUser({username : 'John Doe', email : 'john.doe@gmail.com', password : 'a', profile : {type : 'student'}});
	var userId1 = Accounts.createUser({username : 'Jean Michel', email : '1@gmail.com', password : 'a', profile : {type : 'student'}});
	var userId2 = Accounts.createUser({username : 'Bernard Legros', email : '2@gmail.com', password : 'a', profile : {type : 'student'}});
	var userId3 = Accounts.createUser({username : 'François Boutsouffle', email : '3@gmail.com', password : 'a', profile : {type : 'student'}});

	ClassRooms.insert({'title' : 'My First English Class', students : [teacherId, jdUserId, userId1, userId2, userId3]});
	ClassRooms.insert({'title' : 'My First French Class', students : [teacherId, jdUserId, userId1, userId2, userId3]});
	ClassRooms.insert({'title' : 'My First Vietnamese Class', students : [teacherId, jdUserId, userId1, userId2, userId3]});

    }
});