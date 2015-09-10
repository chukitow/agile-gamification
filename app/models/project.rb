class Project < ActiveRecord::Base
  has_many :user_project
  has_many :users, through: :user_project

  validates_presence_of :name
end