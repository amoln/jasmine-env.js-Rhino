/*
 EnvJasmine: Jasmine test runner for EnvJS.

 EnvJasmine allows you to run headless JavaScript tests.
 
 Based on info from:
 http://agile.dzone.com/news/javascript-bdd-jasmine-without
 http://www.mozilla.org/rhino/
 http://www.envjs.com/
 http://pivotal.github.com/jasmine/
 https://github.com/velesin/jasmine-jquery
*/
inBrowser = false;
Packages.org.mozilla.javascript.Context
    .getCurrentContext().setOptimizationLevel(-1);

// Create the EnvJasmine namespace
if (!this.EnvJasmine) {
    this.EnvJasmine = {};
}

EnvJasmine.about = function () {
    print("Usage: envjasmine.js <WIN|UNIX> <EnvJasmine Root Directory> [<js spec files>...]");
    exit(1);
};

EnvJasmine.environment = arguments[0];

EnvJasmine.SEPARATOR = (function (env) {
    if (env == "UNIX") {
        return "/";
    } else if  (env == "WIN") {
        return "\\";
    } else {
        EnvJasmine.about();
    }
}(EnvJasmine.environment));

EnvJasmine.load = (function(fileSeparator) {
    var truePath, loaded = [];

    return function(path) {
        if (loaded.indexOf(path) == -1) {
            loaded.push(path);

            // Format the path using the file separator
            truePath = path.split("/").join(fileSeparator);

            load(truePath);
        }
    };
}(EnvJasmine.SEPARATOR));

if (arguments.length < 1) {
    EnvJasmine.about();
}

EnvJasmine.disableColor = (function (env) {
    return (env == "WIN");
}(EnvJasmine.environment));

// These are standard driectories in the EnvJasmine project.
EnvJasmine.rootDir = java.io.File(arguments[1]).getCanonicalPath() || '';
EnvJasmine.jsDir = EnvJasmine.rootDir + "/../public/javascripts/";
EnvJasmine.libDir = EnvJasmine.jsDir + "lib/";
EnvJasmine.specsDir = EnvJasmine.jsDir + "specs/";
EnvJasmine.mocksDir = EnvJasmine.specsDir + "mocks/";
EnvJasmine.helpersDir = EnvJasmine.specsDir + "helpers/";
EnvJasmine.jasmineLibDir = EnvJasmine.rootDir + "/lib/";
EnvJasmine.logDir = EnvJasmine.rootDir + "/../log/hudson/reports/";

// Load the envjasmine environment
print("Loading Jasmine + Env.js environment:")
EnvJasmine.load(EnvJasmine.jasmineLibDir + "spanDir/spanDir.js");
EnvJasmine.load(EnvJasmine.jasmineLibDir + "envjs/env.rhino.1.2.js");
EnvJasmine.load(EnvJasmine.libDir + "jasmine-1.0.2/jasmine.js");
EnvJasmine.load(EnvJasmine.libDir + "jasmine-1.0.2/jasmine-html.js");
EnvJasmine.load(EnvJasmine.libDir + "jasmine-1.0.2/jasmine-jquery/jasmine-jquery.js");
EnvJasmine.load(EnvJasmine.jasmineLibDir + "jasmine-rhino-reporter/jasmine-junit-reporter.js");
jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(EnvJasmine.logDir));


// Load app dependencies for the jasmine specs
EnvJasmine.load(EnvJasmine.jasmineLibDir + "dependencies.js");

// Load the spec mocks
print("Loading Spec Mocks:")
spanDir(EnvJasmine.mocksDir, function (mock) {
  print(" - " + mock);
  EnvJasmine.load(mock);
});

// Load the spec helpers
print("Loading Spec Helpers:")
spanDir(EnvJasmine.helpersDir, function (helper) {
  print(" - " + helper);
  EnvJasmine.load(helper);
});


print("Loading Specs:")
EnvJasmine.specSuffix = new RegExp(/.Spec.js$/);

if (arguments.length > 2) {
    // Load the specs from the commandline
    var spec = '';
    for (var i = 2; i < arguments.length; i++) {
        if (arguments[i].slice(-3) !== '.js') {
            // if this is not a JavaScript file (ending in '.js'), then the stupid command line parsed a directory with a space (' ') in it.
            // When that happens, add the directory segment to the spec path with a space character and continue.
            spec += arguments[i] + ' ';
            continue;
        } else {
            spec += arguments[i];
            print(" - " + spec);
            EnvJasmine.load(spec);
            spec = '';
        }
    }
} else {
    // Load specs from the specs dir
    spanDir(EnvJasmine.specsDir, function (spec) {
        if(EnvJasmine.specSuffix.test(spec)) {
            print(" - " + spec);
            EnvJasmine.load(spec);
        }
    });
}


// Execute the specs
window.location = ["file://", EnvJasmine.jasmineLibDir, "envjasmine.html"].join(EnvJasmine.SEPARATOR);
