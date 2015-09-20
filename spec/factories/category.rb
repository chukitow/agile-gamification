FactoryGirl.define do
  factory :category do
    name { Faker::Name.name }

     trait :bug do
       after(:create) do |category|
         category.name = 'Bug'
         category.save
       end
     end
  end
end
