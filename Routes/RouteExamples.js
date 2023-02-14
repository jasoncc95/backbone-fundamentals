(function() {
	var documents = [
		new Backbone.Model({
			title: 'Title 1',
			content: 'Content 1'
		}),
		new Backbone.Model({
			title: 'Title 2',
			content: 'Content 2'
		})
	];

	var eventAggregator = _.extend({}, Backbone.Events);

	var ContentsView = Backbone.View.extend({
		tagName: 'ul',
		render: function() {
			_(this.collection).each(function(document) {	//each 'document' is a 'li'
				this.$el.append(new DocumentListView({model: document}).render().el);
			}, this);
			return this;
		}
	});

	var DocumentListView = Backbone.View.extend({
		tagName: 'li',
		events: {
			'click': function() {
				eventAggregator.trigger('document:selected', this.model);
			}
		},
		render: function() {
			this.$el.html(this.model.get('title'));
			return this;
		}
	});

	var DocumentView = Backbone.View.extend({
		render: function() {
			this.$el.append(_.template('<h1><%= title %></h1>')(this.model.attributes));
			this.$el.append(_.template('<div><%= content %></div>')(this.model.attributes));
			return this;
		}
	});

	var DocumentRouter = Backbone.Router.extend({
		routes: { //when the URL matches the routes defined, it will call the function to handle the logic
			'contents': 'contents', //will call 'contents' when accesing it in the URL
			'view/:title': 'viewDocument'
		},
		contents: function() {
			$('body').html(new ContentsView({collection: documents}).render().el);
		},
		viewDocument: function(title) { //the 'title' parameter must match what was defined in 'routes'
			var selectedDocument = _(documents).find(function(document) {
				return document.get('title') === title;
			});
			$('body').empty().append(new DocumentView({model: selectedDocument}).render().el);
		}
	});
	//when a document is selected, it will redirect to 'view/:title'
	eventAggregator.on('document:selected', function(document) {
		var urlPath = 'view/' + document.get('title');
		router.navigate(urlPath, {trigger: true}); //trigger: true will make the navigation happen
	});

	var router = new DocumentRouter();
	Backbone.history.start(); //this will make Backbone to start listening for URL changes

	router.navigate('contents', {trigger: true}); //triggers the navigation, this is why opening the HTML file will start on this route
})();