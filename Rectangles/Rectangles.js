(function () {
	//defining Rectangle as a Backbone.Model
	var Rectangle = Backbone.Model.extend({});
	//defining a view for a Rectangle
	var RectangleView = Backbone.View.extend({
		tagName: 'div',	//The view is going to work over a div
		className: 'rectangle',	//The view will apply the 'rectangle' css class

		events: {
			'click': 'move'	//when a click event occurs over a Rectangle it will execute the function 'move'
		},

		render: function() {
			this.setDimensions();
			this.setPosition();
			this.setColor();
			return this;
		},
		//this.$el is the jquery object of the hmtl, this.model is the Backbone.Model object
		setDimensions: function() {
			this.$el.css({
				width: this.model.get('width') + 'px',
				height: this.model.get('height') + 'px'
			});
		},

		setPosition: function() {
			var position = this.model.get('position');
			this.$el.css({
				left: position.x,
				top: position.y
			});

		},

		setColor: function() {
			this.$el.css('background-color', this.model.get('color'));
		},

		move: function() {
			this.$el.css('left', this.$el.position().left + 10);
		}
	});


	var rectangles = [
		new Rectangle({
			width: 100,
			height: 60,
			position: {
				x: 500,
				y: 300
			},
			color: '#ff4444'
		}),
		new Rectangle({
			width: 26,
			height: 200,
			position: {
				x: 200,
				y: 400
			},
			color: '#44ff44'
		}),
		new Rectangle({
			width: 300,
			height: 220,
			position: {
				x: 700,
				y: 300
			},
			color: '#4444ff'
		}),
	]
	//for each rectangle in the list, it will create a RectangleView and render it
	_(rectangles).each(function(rectangle) {
		$('div#canvas').append(new RectangleView({ model: rectangle }).render().el);
	});

})(); //This is know as a inmediate invoke function, it will get executed and avoid variables to be leaked into global scope