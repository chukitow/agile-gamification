class Story < ActiveRecord::Base
  acts_as_list scope: [:priority]
  belongs_to :project
  belongs_to :category
  has_many :comments, dependent: :destroy

  validates_presence_of :name

  before_create :assigns_category

  private
  def assigns_category
    self.category = Category.find_or_initialize_by(name: 'Feature')
  end
end
