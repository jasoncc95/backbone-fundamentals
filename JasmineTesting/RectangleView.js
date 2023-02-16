var app = app || {}; //if 'app' exists it will include things there otherwise it will be empty

(function(shapes) {
	shapes.views = {
		RectangleView: Backbone.View.extend({
			className: 'rectangle',
			events: {
				'click': function() {
					app.eventAggregator.trigger('rectangle:selected')
				}
			},
			render: function() {
				this.$el.width(this.model.get('width'));
				this.$el.height(this.model.get('height'));
				return this;
			}
		})
	};

	shapes.eventAggregator = _.extend({}, Backbone.Events); //just an object with the Backbone.Events behavoir that can be use to trigger events and being notified of events triggering
})(app);