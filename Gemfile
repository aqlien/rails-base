source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.2'

gem 'rails', github: 'rails/rails', branch: 'main'    # bundle edge Rails
gem 'pg'                          # Use postgresql as the database for Active Record
gem 'puma', '~> 5.0'              # Use Puma as the app server
gem 'sass-rails', '>= 6'          # Use SCSS for stylesheets
gem 'cssbundling-rails'           # Bundle CSS assets into builds.      Read more: https://github.com/rails/cssbundling-rails
gem 'jsbundling-rails'            # Bundle JS assets into builds        Read more: Read more: https://github.com/rails/jsbundling-rails
gem 'jbuilder', '~> 2.7'          # Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'redis', '~> 4.0'           # Use Redis adapter to run Action Cable in production
# gem 'bcrypt', '~> 3.1.7'        # Use Active Model has_secure_password
# gem 'image_processing', '~> 1.2'    # Use Active Storage variant

gem 'bootsnap', '>= 1.4.4', require: false        # Reduces boot times through caching; required in config/boot.rb

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]       # Call 'byebug' anywhere in the code to stop execution and get a debugger console
end

group :development do
  gem 'web-console', '>= 4.1.0'         # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'rack-mini-profiler', '~> 2.0'    # Display performance information such as SQL time and flame graphs for each request in your browser.
    # Can be configured to work on production as well see: https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  gem 'listen', '~> 3.3'
end

group :test do
  gem 'capybara', '>= 3.26'           # Adds support for Capybara system testing and selenium driver
  gem 'selenium-webdriver'
  gem 'webdrivers'                    # Easy installation and use of web drivers to run system tests with browsers
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]          # Windows does not include zoneinfo files, so bundle the tzinfo-data gem
