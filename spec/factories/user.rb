FactoryGirl.define do
  factory :user do
    email     { Faker::Internet.email }
    password  { Faker::Internet.password }
  end

  factory :user_with_project, parent: :user do
    after(:create) do |user|
      user.projects << create(:project)
      user.save
    end
  end
end
