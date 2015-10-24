class StorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :project_id, :position,
    :priority, :estimation

  has_one :category
  has_one :state
  has_one :owner
end
