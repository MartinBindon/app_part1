var app = app || {};

// Todo Model
// The baseic todo model has 'title' and 'completed' attributes.

app.Todo = Backbone.Model.extend({

	// default attributes ensure that each todo created has 'title' and 'completed' keys.
	defaults: {
		title: '',
		completed: false
	},

	// Toggle the 'completed' state of the todo item
	toggle: function() {
		this.save({
			completed: !this.get('completed')
		})
	}	
});