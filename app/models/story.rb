class Story < ActiveRecord::Base
  acts_as_list scope: [:priority]
  belongs_to :project
end
