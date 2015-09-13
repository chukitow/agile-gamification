class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :story_id, :created_at

  has_one :user
end
