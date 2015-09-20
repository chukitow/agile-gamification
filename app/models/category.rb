class Category < ActiveRecord::Base
  has_many :categories

  validates_uniqueness_of :name
end
