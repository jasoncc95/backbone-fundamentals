describe('Rectangle', function(){ //general context
	var rectangle;

	beforeEach(function() { //this will get executed before each context
		rectangle = new app.Rectangle();
	});

	describe('with lenght 7 and width 4', function() { //nested context
		beforeEach(function() { //this will get executed before each test
			rectangle.set({
				lenght: 7,
				width: 4
			});
		});

		it('should have an area of 28', function() {
			expect(rectangle.area()).toBe(28);
		});

		it('should have a perimeter of 22', function() {
			expect(rectangle.perimeter()).toBe(22);
		});
	});

	describe('with equal lenght and width', function() { //nested context
		beforeEach(function() {
			rectangle.set({
				lenght: 5,
				width: 5
			});
		})

		it('should be a square', function() {
			expect(rectangle.isSquare()).toBe(true);
		})

	});

	describe('with unequal lenght and width', function() { //nested context
		beforeEach(function() {
			rectangle.set({
				lenght: 7,
				width: 5
			});
		})

		it('should not be a square', function() {
			expect(rectangle.isSquare()).toBe(false);
		})

	});

	describe('setting invalid values', function() { //nested context

		describe('negative lenght or width', function() { 

			it('should throw error if lenght or width is negative', function() {
				function setDimensions() { //in this case beforeEach() doesn't work becase we want it to fail as soon as it happens
					rectangle.set({
						lenght: 1,
						width: -9
					});
				}
				expect(setDimensions).toThrow(new Error('Invalid dimensions'));
			});

		});

		describe('zero lenght or width', function() { 

			it('should throw error if lenght or width is zero', function() {
				function setDimensions() { //in this case beforeEach() doesn't work becase we want it to fail as soon as it happens
					rectangle.set({
						lenght: 0,
						width: 9
					});
				}
				expect(setDimensions).toThrow(new Error('Invalid dimensions'));
			});
			
		});

	});


});