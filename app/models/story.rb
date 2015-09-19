class Story < ActiveRecord::Base
  acts_as_list scope: [:priority]
  belongs_to :project
  belongs_to :category
  has_many :comments, dependent: :destroy

  validates_presence_of :name
end
