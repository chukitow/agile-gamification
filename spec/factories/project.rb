require 'rails_helper'

FactoryGirl.define do
  factory :project do
    name { Faker::Lorem.word }
  end
end
