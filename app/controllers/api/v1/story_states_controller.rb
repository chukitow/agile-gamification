class Api::V1::StoryStatesController < ApplicationController
  before_action :authenticate_user!

  respond_to :json

  def index
    render json: StoryState.all, root: false
  end
end
