require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Appointments
  class Application < Rails::Application
    config.load_defaults 5.2
    config.time_zone = 'Europe/Moscow'
    config.api_only = true
  end
end
