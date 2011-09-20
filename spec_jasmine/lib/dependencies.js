// Add any app + lib files here that need to be loaded before all tests are run.
// NOTE: Load order does matter.

print("Loading Lib + App JS:")

EnvJasmine.load(EnvJasmine.libDir + "jquery-1.6.2.min.js");
EnvJasmine.load(EnvJasmine.libDir + "jquery-ui.min.js");
EnvJasmine.load(EnvJasmine.libDir + "json2.js");
EnvJasmine.load(EnvJasmine.libDir + "underscore.js");
EnvJasmine.load(EnvJasmine.libDir + "backbone.js");
EnvJasmine.load(EnvJasmine.libDir + "ICanHaz.js");
EnvJasmine.load(EnvJasmine.libDir + "handlebars-0.9.0.pre.4.js");

EnvJasmine.load(EnvJasmine.jsDir + "application.js");