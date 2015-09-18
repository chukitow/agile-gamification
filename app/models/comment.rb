class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :story

  validates_presence_of :content
end
