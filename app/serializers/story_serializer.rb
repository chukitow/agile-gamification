class StorySerializer < ActiveModel::Serializer
  include ActiveModel::Serialization
  attributes :id, :name, :description, :project_id, :position,
    :priority, :estimation

  has_many :comments, serializer: CommentSerializer
end
