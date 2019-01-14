# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :uid, :real_name, :display_name, :phone, :image_url
end
