ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails'
require 'shoulda/matchers'
require 'factory_girl'
require 'simplecov'

SimpleCov.start
if ENV['CI']=='true'
  require 'codecov'
  SimpleCov.formatter = SimpleCov::Formatter::Codecov
end

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.before(:suite) do
    DatabaseCleaner.clean_with :truncation
  end

  config.before(:each) do
      DatabaseCleaner.strategy = :truncation
      DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  Capybara.default_driver =  :webkit
  config.include FactoryGirl::Syntax::Methods
  config.infer_spec_type_from_file_location!

  config.include Devise::TestHelpers, type: :controller
end
