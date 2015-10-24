class UserSerializer < ActiveModel::Serializer
  attributes :id, :uid, :provider, :name, :nickname, :email, :image
end
