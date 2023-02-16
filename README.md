# backbone-fundamentals
Backbone fundamentals course project.

The Rectangles, Models, Collections, Views and Routes folders contains the basic usage of Backbone, to see them in action just open the HTML file in a browser and in the browser's console will appear messages showing the behavoir. Also, the code can be found in each correspondant js file.

The ConnectingServer folder needs extra steps because it needs a server running.
The server can be found in this repo: https://github.com/liammclennan/resourceserver. Additionaly change this line in logger.coffee:
```
logger = new (winston.Logger)({
```
for:
```
logger = winston.createLogger({
```
The JasmineTesting folder contains a few basic unit tests for Backbone using Jasmine. To see them just open the SpecRunner.html in a browser. The tests can be found in the Spec files.