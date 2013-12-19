// var Router = Backbone.Router.extend({
//     routes: {
// 	"":                 "index", 
// 	"chatroom":         "chatroom"  
//     },

//     index: function() {
// 	if (!Meteor.user()) {
// 	    //$('#mainFrame').html(Template['login']());
// 	    //return false;
// 	    return Template['login'];
// 	}

// 	$('#mainFrame').html(Template['welcomeView']());
//     },

//     chatroom: function() {
// 	if (!Meteor.user()) {
// 	    $('#mainFrame').html(Template['login']());
// 	    return false;
// 	}

// 	$('#mainFrame').html(Template['mainBox']());
//     }
// });

// var app = new Router;

// Meteor.startup(function () {
//     Backbone.history.start({pushState: true, root : '/'});
// });
