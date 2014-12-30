example template of folder modified from angular seed as suggested from here:
http://www.artandlogic.com/blog/2013/05/ive-been-doing-it-wrong-part-1-of-3/

this folder structure isn't the final recommendation, but just short of that.


Here’s one example of a proposed structure: angular-seed project. It is made by the AngularJS team, it includes lots of good things like tests and places for all the essential parts:

app/ – all of the files to be used in production
css/ – css files
img/ – image files
index.html – app layout file (the main html template file of the app)
js/ – javascript files
app.js – application
controllers.js – application controllers
directives.js – application directives
filters.js – custom angular filters
services.js – custom angular services
lib/ – angular and 3rd party javascript libraries
partials/ – angular view partials (partial html templates)
config/ – config files for running unit tests with Testacular/Karma
scripts/ – handy shell/js/ruby scripts (run unit tests and dev server)
test/ – test source files and libraries
However, as your project grows, you’ll add tons and tons of code into controllers, services and directives. Using a file for each of these areas steers you into a direction where you’ll end up with “piles on the floor” – you know your AccountListController is somewhere in the Controllers pile, but it will take you a while to find it. In other words, angular-seed packages your code by layers. Here’s a place for all controllers, here’s a place for data services, etc.

You can make it more usable by using sub-directories for controllers, and so on:

controllers/
LoginController.js
RegistrationController.js
AccountListController.js
SearchResultsController.js
directives.js
filters.js
services/
CartService.js
UserService.js
AccountService.js

This is much better, since you have a nice place for everything. Now I can easily find where to add new modules or where to find current code that handles Account Lists.
