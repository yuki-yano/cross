# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate, only: %i[index]

  def index
    users = User.all.order('id ASC')
    render json: users, each_serializer: UserSerializer, status: :ok
  end
end
