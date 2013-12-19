
// get the value for handlerbar helper user
Template.chatMessage.helpers({
    "user": function() {
	if(Meteor.userId() == 'me') {
	    return Meteor.userId();
	} else if (Meteor.userId()) {
	    var user = Meteor.user();
	    if (user)
		return user.username;
	    return 'Anonymous';
	} else {
	    return 'Anonymous';
	}
    },
    "parsedMessageText": function() {
	//if (Session.get("selected") !== this._id) {
	//    return "<a>" + this.text.chunk(1).join("</a><a>") + "</a>";
	//}

	var isSelected = Session.get("selected") === this._id;
	var msg = this.text;
	var result = "";
	var selectionFromIndex = Session.get("selectionFromIndex") === undefined ? -1 : Session.get("selectionFromIndex");
	var selectionToIndex = Session.get("selectionToIndex") === undefined ? -1 : Session.get("selectionToIndex");
	
	console.log("SELECTION FROM INDEX: " + selectionFromIndex);
	console.log("SELECTION TO INDEX: " + selectionToIndex);

	var corrections = Corrections.find({message_id : this._id}, {sort: {from_index : 1}});
	var correction;
	var correctionIndex = 0;
	if (corrections.count() > 0) {
	    corrections = corrections.fetch();
	    correction = corrections[correctionIndex++];
	}

	for (var i = 0; i < msg.length; i++) {
	    if (correction
		&& i === correction.from_index) {
		result += '<a class="corrected"';
		result += 'rel="popover"';
		result += 'data-container="body"';
		result += 'data-toggle="popover"';
		result += 'data-content="' + correction.text + '"';
		result += 'data-original-title="Correction"';
		result += 'data-placement="top">';

		result += msg.substring(correction.from_index, correction.to_index + 1) + '</a>';
		i = correction.to_index;
		var indexShift = (correction.to_index - correction.from_index);
		selectionFromIndex += indexShift;
		selectionToIndex += indexShift;
		correction = corrections[correctionIndex++];
	    }
	    else if (isSelected 
	 	     && i === selectionFromIndex) {
		result += '<a class="selected">' + msg.substring(selectionFromIndex, selectionToIndex + 1) + '</a>';
		i = selectionToIndex;
	    }
	    else
		result += '<a>' + msg[i] + '</a>';
	}
	
	return result;
    },
    "selected": function() {
	//chatMessageDep.depend();
	return Session.get("selected") === this._id;
    }

});

Template.chatMessage.events({
    "click #correct" : function() {
	$('#add-correction-modal').modal('toggle');
    },
    "mousedown span.chat-message-text :not('.corrected')": function(data) {
	clearEventSessionValues();
	//chatMessageDep.changed();
	var selectedElmt = $("span.chat-message-text > a.selected");
	if (selectedElmt && selectedElmt.html()) {
	    var splittedElmt = selectedElmt.html().split('');
	    var newContent = "";
	    
	    for (var i = 0; i < splittedElmt.length; i++)    
		newContent += "<a>" + splittedElmt[i] + "</a>";
	    
	    selectedElmt.replaceWith(newContent);
	}

	$("span.chat-message-text > a").removeClass("highlighted");
	Template.chatMessage.selected = this._id;
	Template.chatMessage.mouseDownTarget = $(data.target);
	Template.chatMessage.mouseDownTargetIndex = $(data.target).index();

	var selectedText = $("span.chat-message-text > a.selected");
	var currentElementId = data.target.parentElement.id;
	selectedText.each(function() {
	    if (this.parentElement.id === currentElementId)
		if ($(this).index() < Template.chatMessage.mouseDownTarget.index())
		    Template.chatMessage.mouseDownTargetIndex += selectedText.html() === undefined ? 0 : selectedText.html().length;
	});
	console.log("MOUSE DOWN INDEX: " + Template.chatMessage.mouseDownTargetIndex);
    },
    "mousemove span.chat-message-text :not('.corrected')": function (data) {
	console.log('MOVE');
	var mouseDownTarget = Template.chatMessage.mouseDownTarget;
	var target = $(data.target);

	if (mouseDownTarget) {
	    if (Template.chatMessage.mouseMoveTarget && mouseDownTarget.parent().attr('id') !== target.parent().attr('id'))
		return ;
	    
	    Template.chatMessage.mouseMoveTarget = $(data.target);
	    target.parent().children("a").removeClass("highlighted");

	    var isLeftToRight = target.index() < Template.chatMessage.mouseDownTargetIndex;
	    var loopElement = target;

	    // console.log("FROM: " + loopElement.index());
	    // console.log("TO: " + Template.chatMessage.mouseDownTargetIndex)
	    // return false;

	    var i = 0;
	    var previousLoopElement;
	    var correctedElementIndex = -1;

	    if (isLeftToRight) {
		var previousCorrectedElements = target.parent().children().eq(Template.chatMessage.mouseDownTargetIndex).prevAll('.corrected');
		if (previousCorrectedElements)
		    correctedElementIndex = previousCorrectedElements.eq(0).index();
	    } else {
		var nextCorrectedElements = target.parent().children().eq(Template.chatMessage.mouseDownTargetIndex).nextAll('.corrected');
		if (nextCorrectedElements)
		    correctedElementIndex = nextCorrectedElements.eq(0).index();
	    }

	    console.log("CORRECTED ELEMENT INDEX//// " + correctedElementIndex);

	    while (loopElement.index() !== Template.chatMessage.mouseDownTargetIndex) {
		// Prevent inifinite loops
		if (previousLoopElement && loopElement.index() === previousLoopElement.index())
		    break ;

		var isHighlighted = true;
		if (correctedElementIndex >= 0
		    && ((isLeftToRight && loopElement.index() <= correctedElementIndex)
			|| (!isLeftToRight && loopElement.index() >= correctedElementIndex))) {
		    isHighlighted = false;
		}

		if (isHighlighted)
		    loopElement.addClass("highlighted");

		// Prevent inifinite loops
		previousLoopElement = loopElement;

		if (isLeftToRight)
		    loopElement = loopElement.next();
		else
		    loopElement = loopElement.prev();

		if (!isHighlighted)
		    Template.chatMessage.mouseMoveTarget = loopElement;		    
		// if (i++ > 10) {
		//     console.log("OUT");
		//     return false;
		// }
		// console.log(loopElement[0]);
	    }
	    loopElement.addClass("highlighted");
	}
    },
    'click span.chat-message-text > a[rel="popover"]' : function (data) {
	$('span.chat-message-text > a[rel="popover"]').not(data.target).popover('hide');
    }
});

Template.chatMessage.rendered = function() {
    //$("#" + this.lastNode.id).popover({placement : 'top'});
    //$("#" + this.lastNode.id).popover('toggle');
    $('a[rel="popover"]').popover({trigger : 'click'});
    // $('a[rel="popover"]').each(function() {
    // 	$(this).attr('data-content', $(this).attr('data-content'));
    // });
};
