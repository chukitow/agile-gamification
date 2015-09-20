class Story < ActiveRecord::Base
  acts_as_list scope: [:priority]
  belongs_to :project
  belongs_to :category
  belongs_to :state, foreign_key: :state_id, class_name: 'StoryState'
  has_many :comments, dependent: :destroy

  validates_presence_of :name

  before_create :assigns_category
  before_create :mark_as_unstarted

  private
  def assigns_category
    self.category = Category.find_or_initialize_by(name: 'Feature')
  end

  def mark_as_unstarted
    self.state = StoryState.find_or_initialize_by(name: 'Unstarted')
  end
end
