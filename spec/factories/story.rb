FactoryGirl.define do
  factory :story do
    name        { Faker::Name.title }
    description { Faker::Lorem.sentence }
    estimation  [0, 1, 2, 3, 5, 8].sample
    project
  end

  factory :story_with_comments, parent: :story do
    after(:create) do |story|
      5.times { story.comments << create(:comment) }
      story.save
    end
  end
end
