FactoryGirl.define do
  factory :comment do
    content { Faker::Lorem.sentence }
    user
  end
end
