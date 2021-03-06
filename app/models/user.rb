class User < ActiveRecord::Base
  has_many :user_project
  has_many :projects, through: :user_project
  has_many :comments
  has_many :stories

  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  include DeviseTokenAuth::Concerns::User
end
