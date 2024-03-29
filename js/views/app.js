var app = app || {};

// ***** The application *****

// the overall 'appview' is the top level piece of the UI
app.AppView = Backbone.View.extend({

	// instead of generating new element, bind to the existing skeleton of the app already present in the HTML
	el: '#todoapp',

	// Our template for the line of statistics at the bottom of the app
	statsTemplate: _.template( $('#stats-template').html() ),

	// At initialization we bind to the relevant events on the 'Todos'
	//collection, when items are added or changed.
	initialize: function() {
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);
	},

	//Add a single todo item to the list by creating a view for it, and appending its element to the ui
	addOne: function( todo ) {
		var view = new app.TodoView({ model: todo });
		$('#todo-list').append( view.render().el );
	},

	// Add all items in the 'todos' collections at once.
	addAll: function() {
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	}
});