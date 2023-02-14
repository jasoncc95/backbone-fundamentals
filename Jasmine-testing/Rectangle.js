var app = {}; //top-level app object, all objects will be within this namespace

(function(shapes) {
	shapes.Rectangle = Backbone.Model.extend({
		initialize: function() {
			this.on('change', function() {
				if (this.get('lenght') <= 0 || this.get('width') <= 0) {
					throw new Error('Invalid dimensions');
				}
			}, this);
		},
		area: function() {
			return this.get('lenght') * this.get('width');
		},
		perimeter: function() {
			return 2 * this.get('lenght') + 2 * this.get('width');
		},
		isSquare: function() {
			return this.get('lenght') === this.get('width');
		}
	});
})(app); //inmeadiate invoke a function, in this case shapes = app