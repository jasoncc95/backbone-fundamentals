(function(){
	//BASICS
	var c = new Backbone.Collection([
		{name: 'name1'},
		{name: 'name2'}
	]);

	console.log(c.length);
	console.log(c.at(0));

	var Vehicle = Backbone.Model.extend({});

	var Vehicles = Backbone.Collection.extend({
		model: Vehicle,
		comparator: function(vehicle) { //this function will order the collection based on 'sequence'
			return vehicle.get('sequence');
		}
	},
	{	//second parameter to Backbone.Collection.extend will be class 'static' properties/functions
		oneVehicle: function() {
			return new Vehicle({color: 'Green', sequence: 0});
		}
	});

	var vehicles = new Vehicles([
		{color: 'Red', sequence: 2},
		{color: 'Blue', sequence: 1},
		Vehicles.oneVehicle()
	]);

	console.log(vehicles.length);
	console.log(JSON.stringify(vehicles));

	var collection = new Backbone.Collection();
	collection.add(new Backbone.Model({name: 'Fred', age: 21}));
	console.log(JSON.stringify(collection));
	collection.add([
		new Backbone.Model({name: 'Sue', age: 32}),
		{name: 'Dave', age: 60}	//will be transformed into a Backbone.Model
	]);
	console.log(JSON.stringify(collection));
	collection.remove(collection.at(1));
	console.log(JSON.stringify(collection));

	collection.on('add', function(model, col, options) {
		console.log('Added ' + JSON.stringify(model) + ' at index ' + options.index);
	});

	collection.add({name: 'Troy', age: 48});
	collection.add({name: 'Eric', age: 18}, {at: 0});
	collection.add({name: 'Tom', age: 25}, {at: 1, silent: true});
	console.log(JSON.stringify(collection));
	console.log(JSON.stringify(collection.at(0).cid));
	console.log(JSON.stringify(collection.get(collection.at(0).cid))); //can also get by cid
	//USEFUL FUNCTIONS
	collection.forEach(function(model) {
		console.log(JSON.stringify(model));
	});

	var upperscased = collection.map(function(model) {
		return model.get('name').toUpperCase();
	});

	console.log(JSON.stringify(upperscased));

	var temp = '';
	var firstLetters = collection.reduce(function(memo, model) {
		return memo + model.get('name').charAt(0);
	}, temp);

	var eric = collection.find(function(model){
		return model.get('name') === 'Eric';
	});

	console.log(JSON.stringify(eric));
	//EVENTS
	collection.on('remove', function(model) {
		console.log(JSON.stringify(model) + ' removed');
	});

	collection.remove(eric);

	collection.on('change', function(model, options) { //will listen to any event for the models in the collection
		console.log(JSON.stringify(model) + ' changed');
	});

	collection.on('change:name', function(model, options) { //will listen to name change event for the models in the collection
		console.log(JSON.stringify(model) + ' name changed');
	});

	var jason = new Backbone.Model({name: 'Json', age: 20});
	collection.add(jason);
	jason.set('age', 27);
	jason.set('name', 'Jason');
})();