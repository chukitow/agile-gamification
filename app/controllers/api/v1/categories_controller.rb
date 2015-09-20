class Api::V1::CategoriesController < ApplicationController
  before_action :authenticate_user!

  respond_to :json

  def index
    render json: Category.all, root: false
  end
end
