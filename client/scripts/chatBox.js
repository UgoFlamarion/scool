// render all of our messages in the ui
Template.chatBox.helpers({
    "messages": function() {
	return Messages.find();
    }
});

// when Send Chat clicked at the message to the collection
Template.chatBox.events({
    "click #send": function() {
	sendMessage();
    },
    "keydown input": function(event) {
        if (event.keyCode == 13) 
            sendMessage();
    }
});

function sendMessage() {
    var message = $('#chat-message').val();
    Messages.insert({"text" : message, "sent_on" : new Date()});
    $('#chat-message').val('');
}
