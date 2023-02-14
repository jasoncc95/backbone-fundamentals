(function() {
	//BASICS
	var V1 = Backbone.View.extend({
		el: '#example', //it is possible to define the view's 'el' like this and not just when creating an instance
		render: function() {
			var data = { lat: -27, lon: 153 };
			//adding the template via jquery
			this.$el.html(_.template('<%= lat %>, <%= lon %>')(data));
			return this;
		}
	});

	var v1 = new V1();
	v1.render();
	//setting up the values on existing template on the html
	var V2 = Backbone.View.extend({
		render: function() {
			var data = { lat: 50, lon: 50 };
			var template = $('#latlon-template').html();
			this.$el.html(_.template(template)(data));
			return this;
		}
	});

	var v2 = new V2({el: '#example2'});
	v2.render();

	//HANDLEBARS a tool for creating templates
	var source = '<p>Message: {{message}}</p>';
	var compiled = Handlebars.compile(source);
	var rendered = compiled({ message: 'Hello Handlebars'});
	console.log(rendered);
})();