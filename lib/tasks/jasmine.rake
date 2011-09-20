
namespace :spec do
  desc 'Run the javascript Jasmine specs from public/javascripts/specs directory'
  task :jasmine do
    cmd = "spec_jasmine/bin/run_all_tests.sh"
    exit(system(cmd))
  end
end
