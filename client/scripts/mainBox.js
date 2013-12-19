Template.mainBox.events({
    "mouseup": function() {
	var resetEventValues = function () {
	    Template.chatMessage.mouseDownTarget = null;
	    Template.chatMessage.mouseDownTargetIndex = null;
	    Template.chatMessage.mouseMoveTarget = null;
	}

	if (!Template.chatMessage.mouseDownTarget || !Template.chatMessage.mouseMoveTarget) {
	    resetEventValues();
	    return false;
	}

	var mouseDownTargetIndex = Template.chatMessage.mouseDownTargetIndex;
	var mouseUpTargetIndex = Template.chatMessage.mouseMoveTarget.index();

	if (mouseDownTargetIndex == mouseUpTargetIndex) {
	    resetEventValues();
	    return false;
	}

	Session.set("selected", Template.chatMessage.selected);
	Session.set("selectionFromIndex", Math.min(mouseDownTargetIndex, mouseUpTargetIndex));
	Session.set("selectionToIndex", Math.max(mouseDownTargetIndex, mouseUpTargetIndex));

	resetEventValues();
	chatMessageDep.changed();
    },
    'mousedown' : function (data) {
	$('div.popover').hide();
    }

});
