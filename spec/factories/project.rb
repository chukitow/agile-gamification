require 'rails_helper'

FactoryGirl.define do
  factory :project do
    name { Faker::Lorem.word }
  end

  factory :project_with_stories, parent: :project do
    after(:create) do |project|
      5.times { project.stories << create(:story) }
      project.save
    end
  end
end
