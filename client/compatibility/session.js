function clearEventSessionValues() {
	delete Session.keys["selected"];	
	delete Session.keys["selectionFromIndex"];
	delete Session.keys["selectionToIndex"];
}