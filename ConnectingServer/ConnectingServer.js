(function() {
	var Person = Backbone.Model.extend({});
	var People = Backbone.Collection.extend({
		model: Person,
		url: 'http://localhost:3002/people'
	});

	var people = new People();
	people.create({name: 'Tom', age: 50}); //will send a POST to the server

	people.fetch({ //this will be an asynchronous call
		success: function() {
			console.log(JSON.stringify(people));
		}
	}); 
	
	console.log('After fecth people: ' + JSON.stringify(people)); //because the fetch ins asynchronous, this will only print what is in the collection at the moment

	var person = new Person({id: 1});
	people.add(person);

	person.fetch({ //will send a GET to the server to fetch that person, because the URL is defined in the collectionn it has to be add it to it
		success: function() {
			console.log(JSON.stringify(person));
		}
	});

	var person2 = new Person({
		name: "Zac",
		age: 43
	});
	people.add(person2);
	person2.save(); //will send a POST to the server
	console.log(JSON.stringify(person2));

	var person3 = new Person({id: 2});
	people.add(person3);

	person3.destroy({
		success: function(model, response) {
			console.log(response + " " + model);
		}
	}); //will send a DELETE to the server

})();
























