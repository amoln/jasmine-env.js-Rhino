Intro
======

This demo application shows how to use Jasmine.js + Env.js + Rhino as a testing framework for javascript in your web application. 

Jasmine.js<http://pivotal.github.com/jasmine/> is a behavior-driven development framework for testing your JavaScript code. It does not depend on any other JavaScript frameworks. It does not require a DOM. And it has a clean, obvious syntax so that you can easily write tests.

The need for Env.js<http://www.envjs.com/> arises from the fact that a typical web application does a lot of data and DOM manipulations. While Jasmine does not require DOM, a lot of the specs are based on stories that require user interaction and DOM manipulations. And so, Env.js provides that simulated browser environment for Rhino to run all such specs.

Rhino<http://www.mozilla.org/rhino/> is an open-source implementation of JavaScript written entirely in Java. It is typically embedded into Java applications to provide scripting to end users. This project shows how Rhino can be used to run the Jasmine specs in a continuous integration environment such as Hudson.


Running tests
=============

locally during development
---------------------------

You can run the specs in this demo by typing the url http://localhost:3000/specs.html
This application has very simple javascript code in application.js that, on load, updates the DOM. Specs.html includes all the required JS libraries as well as the application.js to load the html, and then runs the onLoadSpec.js which actually executes a test again the DOM. 

If your application requires making AJAX calls to fetch and load the data, 
 - those calls can be made once in the beginning to setup the DOM and then the specs can be executed against the DOM, or
 - the beforeEach() and afterEach() functions, that are executed during a spec`s life cycle, should be used to fetch and setup any data or DOM elements. This is very useful and similar to the methods available in RSpec or JUnit tests.  

via Continuous Integration - Hudson
-----------------------------------

You can setup Hudson to run the JS specs by executing the following cmd - 
bundle exec rake spec:jasmine
Essentially this is just a wrapper around a shell script that invokes Rhino and passes in all the requires javascript files to it in the right order.


Notes 
======

1. The application was created on Jruby 1.5.6 and Rails 3, please change as required to get it running on your machine.
2. Although it looks like a RoR application, the goal here is just to demonstrate how to plug in Javascript tests and run them locally and via Hudson. 
3. Currently, there are many libraries such as Backbone.js included as part of javascript libraries, but the demo is kept simple and does not utilize them. The next version of the demo will be to write and run specs for a Backbone.js based web application.
4. The jasmine-junit-reporter.js included in this project has been patched so that the process exits after all the specs have been executed and reported. The original version obtained from https://github.com/larrymyers/jasmine-reporters.git did not exit after completion and so Hudson jobs would timeout.
5. Hudson reports for the test results are written out in log/hudson/reports directory which is directly read by Hudson.  


Known Issues
=============

1. Jasmine is a well written test framework and provides functions for async specs, fixture loading and many other features. However Env.js being a simulated browser environment and not a real one, has issues with certain types of specs. These issues have nothing to do with Jasmine or any other test framework, but with the fact that Env.js only provides an environment that supports DOM manipulations, but not actual HTML rendering. So if a spec has been written to validate the UI visible to the user in terms of height/width/opacity and such properties, the spec will not pass. This is because Env.js cannot actually render and hence compute the values of properties such as height, width, etc. Such specs can sometimes be re-written to test based on other factors, such as css selectors for example.

2. If testing the UI in terms of its graphics is very important, Env.js may not be the right choice. Other options such as Phantom.js can replace Env.js easily, but Phantom.js has its own set of issues such as it requires installation, it has installation level dependencies such as Qt, etc. 

3. If a web application involves making a lot of ajax calls, then such calls need to be either stubbed out with mock data, or the actual server needs to be made available. This would have to be guaranteed in both local as well as CI environments. For example, if your web application uses an MVC framework such as Backbone.js, you would need to override the Backbone.sync function while running the specs and provide for mock data.


