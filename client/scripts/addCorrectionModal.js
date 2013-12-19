Template.addCorrectionModal.events({
    'click #save-btn': function(event, template) {
	var correctionText = template.find(".correction").value;
	Corrections.insert({"message_id" : Session.get("selected"), 
			    "text" : correctionText, 
			    "from_index" : Session.get("selectionFromIndex"), 
			    "to_index" : Session.get("selectionToIndex"),
			    "created_on" : new Date()});
	$("#add-correction-modal").modal("hide");

	clearEventSessionValues();
    }
});