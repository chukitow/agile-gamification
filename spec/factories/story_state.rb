FactoryGirl.define do
  factory :story_state do
    name { Faker::Name.name }

     trait :finished do
       after(:create) do |story_state|
         story_state.name = 'Finished'
         story_state.save
       end
     end

     trait :started do
       after(:create) do |story_state|
         story_state.name = 'Started'
         story_state.save
       end
     end

     trait :unstarted do
       after(:create) do |story_state|
         story_state.name = 'Unstarted'
         story_state.save
       end
     end
  end
end
