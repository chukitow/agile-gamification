class Story < ActiveRecord::Base
  acts_as_list
  belongs_to :project
end
