class StorySerializer < ActiveModel::Serializer
  include ActiveModel::Serialization
  attributes :id, :name, :description, :project_id, :position,
    :priority, :estimation

  has_one :category
end
