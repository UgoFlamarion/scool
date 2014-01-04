Router.configure({
    layoutTemplate: 'mainFrame'
});

Router.map(function () {
    this.route('home', {
	path: '/',
	template: 'welcomeView'
    });

    this.route('dashboard', {
	path: '/dashboard',
	template: 'welcomeView'
    });

    this.route('login', {
	path: '/login',
	template: 'login'
    });

    this.route('chatroom', {
	path: '/chatroom',
	template: 'mainBox'
    });

    this.route('classroom', {
	path: '/classroom/:classroom_id',
	template: 'classroom',

	before: function() {
	    Session.set('classroom_id', this.params.classroom_id);
	}
    });

});

Router.before(function() {
    if (!Meteor.user() && this.path !== '/login') {
	this.redirect('login');
	//Router.go('login');
	//document.location.href = '/login';
	return false;
    }
    else if (Meteor.user() && this.path === '/login')
	this.redirect('dashboard');
});