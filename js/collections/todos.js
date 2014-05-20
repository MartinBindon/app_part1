var app = app || {};

// Todo collection

// The collection of todos is backed by 'localStorage' instead of a remote server.
var TodoList = Backbone.Collection.extend({

	// Reference to this collections model.
	model: app.Todo,

	// save all of the todo items under the "tools-backbone" namespace.
	localStorage: new Backbone.LocalStorage('todos-backbone'),

	// Filter down the list of all todo items that are finished.
	NB this.filter is an underscore method
	completed: function() {
		return this.filter(function( todo ) {
			return todo.get('completed');
		});
	},

	//Filter down the list to only todo items that are still not finished.
	//NB this.without is an Underscore method
	remaining: function() {
		return this.without.apply( this, this.completed() );
	},

	// We keep the Todos in sequential order, despite being saved by unordered
	// GUID in the database. This generates the next order number for the new items.
	// NB this.last is an Underscore method.
	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	// Todos are sorted by their original insertion order.
	Comparator: function( todo ) {
		return todo.get('order');
	}
});

// Create our global collection of 'Todos'
app.Todos = new TodoList();