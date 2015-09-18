require 'rails_helper'

FactoryGirl.define do
  factory :story do
    name        { Faker::Name.title }
    description { Faker::Lorem.sentence }
    estimation  [0, 1, 2, 3, 5, 8].sample
    project
  end
end
