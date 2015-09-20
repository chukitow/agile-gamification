class StoryState < ActiveRecord::Base
  has_many :stories, foreign_key: :state_id

  validates_uniqueness_of :name
end
