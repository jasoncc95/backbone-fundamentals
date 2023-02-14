(function() {
	//BASICS
	var V = Backbone.View.extend({
		tagName: 'li',
		id: 'thing',
		attributes: {
			'data-value': 12345
		}
	});

	var v = new V();
	v.$el.text('Test li');
	$('body').prepend(v.el);
	//modifyng existing element
	var V2 = Backbone.View.extend({});
	var v2 = new V2({el: '#test'});
	v2.$el.css('background-color', 'CornflowerBlue');

	//el
	var v3 = new Backbone.View({el: 'body'}); //selects the 'body' DOM element
	console.log(v3.el);
	console.log(v3.$el); //$el is a jquery wrapper containing the DOM element, basically an object

	//RENDER
	var RefreshingView = Backbone.View.extend({
		initialize: function() {
			this.model.on('change', function() {	//each time the model changes this will be executed
				this.render();
			}, this);
		},
		render: function() {
			this.$el.html(this.model.get('text'));	//setting the 'text' property from the model to the html of the view
		}
	});

	var m = new Backbone.Model({text: new Date().toString()});
	var refreshingView = new RefreshingView({model: m, el: '#timer'}); //the view will be associated with the #timer of the html
	refreshingView.render();
	setInterval(function() {	//will execute ever 1 second
		m.set({text: new Date().toString()});
	}, 1000);

	//REMOVE
	var h = new Backbone.Model({
		content: 'Historical context'
	});

	var HeadingView = Backbone.View.extend({
		tagName: 'p',
		render: function() {
			this.$el.html(this.model.get('content'));
			return this;
		}
	});

	var headingView = new HeadingView({model: h, el: '#removable'});
	headingView.render();
	headingView.remove(); //will remove the #removable from the DOM

	//EVENTS
	var FormView = Backbone.View.extend({
		events: {
			'click .clickable': 'handleClick', //will call 'handleClick' on click
			'change': function() {	//will handle any change, also it is possible to define the called function inline
				console.log('Handling change');
			}
		},
		render: function() {
			this.$el.html('<input type"text" class="clickable" placeholder="clickable"/><input type="text"/>');
			return this;
		},
		handleClick: function() {
			console.log('Handling click');
		}
	});

	var fv = new FormView({el: '#onClick'});
	fv.render();


})();