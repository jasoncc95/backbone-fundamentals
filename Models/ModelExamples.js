(function() {
	//BASICS
	var Vehicle = Backbone.Model.extend(
		//first parameter for Backbone.Model is where the structure of the object is defined, here default values can be set
		{
			//initialize function will be called each time an object is instantiated
			initialize: function() {
				console.log('Vehicle created');
			},
			prop1: '1'
		},
		//second parameter for Backbone.Model is to define 'static' properties/functions
		{
		  	summary: function() {
		    	return 'Vehicles are for travelling';
		}
	});
	
	var v1 = new Vehicle();
	v1.prop1 = 'one'; //overriding default
	console.log(v1.prop1);

	var v2 = new Vehicle();
	console.log(v2.prop1);

	console.log(Vehicle.summary());

	//INHERITANCE
	var A = Backbone.Model.extend({
		initialize: function() {
			console.log('Initialize A');
		},

		asString: function() {
			return JSON.stringify(this.toJSON());
		}
	});

	var a = new A({ one: '1', two: '2' });
	console.log(a.asString());
	//extending A functionality
	var B = A.extend({
		initialize: function() {
			console.log('Initialize B');
		}
	});

	var b = new B({ three: '3' });
	console.log(b.asString());
	console.log(b instanceof B);
	console.log(b instanceof A);
	console.log(b instanceof Backbone.Model);
	console.log(a instanceof B);

	//ATTRIBUTES
	var Bicycle = Backbone.Model.extend({
		asString: function() {
			return JSON.stringify(this.toJSON());
		}
	});
	//properties can be added in the construction of the object or using 'set'
	var redBycicle = new Bicycle({ color: 'Red'});
	console.log(redBycicle.asString());
	redBycicle.set('size', 'small');
	//it is possible to add more than one property at once
	redBycicle.set({
		description: "<script>alert('Red bicycle')</script>",
		weight: '20'
	});
	console.log(redBycicle.asString());
	//$('body').append(redBycicle.get('description')); //might be dangerous, allows to execute js code
	$('body').append(redBycicle.escape('description')); //safer
	//checking if an object has a particular attribute
	console.log(redBycicle.has('color'));
	console.log(redBycicle.has('owner'));

	//EVENTS
	var ford = new Backbone.Model({	//it is possible to create a Backbone.Model like this, directly without the 'extend', it will create the object directly instead of a 'class'
		type: 'car',
		color: 'blue'
	});
	//any change on the object will trigger this event
	ford.on('change', function() {
		console.log('Something changed');
	});

	ford.set('type', 'truck');
	//a change on the color will trigger this event
	ford.on('change:color', function() {
		console.log('Color changed');
	});

	ford.set('color', 'red');

	var volcano = _.extend({}, Backbone.Events); //will copy the properties from Backbone.Events into an empty object and return it

	volcano.on('disaster:eruption', function(options) {
		console.log('Duck and cover - ' + options.plan);
	})

	volcano.trigger('disaster:eruption', { plan: 'Run!'}); //second parameter of trigger allows to send parameters to the callback function

	volcano.off('disaster:eruption'); //no longer handling the event
	volcano.trigger('disaster:eruption', { plan: 'Run!'});

	//IDENTITY
	var bmw = new Backbone.Model({});
	console.log(bmw.id); //the id of a model is undefined until it's saved
	console.log(bmw.cid); //the cid is assigned when the object is created
	console.log(bmw.isNew()); //to know if the object has been saved

	//DEFAULTS
	var Bottle = Backbone.Model.extend({
		//defining default values for the object
		defaults: {
			'color': 'white',
			'size': 'small'
		}
	});

	var bottle1 = new Bottle();
	console.log(bottle1.get('color'));
	console.log(bottle1.get('size'));

	//VALIDATION
	var Palette = Backbone.Model.extend({
		validate: function(attrs, options) {	//'validate' gets called when validating a model
			var validColors = ['White', 'Red', 'Black'];

			var isValidColor = function(attrs) {
				if (!attrs.color) return true;
				return _.contains(validColors, attrs.color); //underscore js function
			}

			if (!isValidColor(attrs)) {
				return "Color must be one of: " + validColors.join(", ");
			}
		},
		asString: function() {
			return JSON.stringify(this.toJSON());
		}
	});

	var palette1 = new Palette();

	palette1.on('invalid', function(model, error) {
		console.log(error);
	});

	palette1.set('foo', 'bar', {validate: true}); //passes
	palette1.set('color', 'Black', {validate: true}); //passes
	palette1.set('color', 'Blue', {validate: true}); //fails
	console.log(palette1.asString());

	//JSON
	console.log(palette1.toJSON()); //json object
	console.log(JSON.stringify(palette1.toJSON())); //string representation of json
})();
























