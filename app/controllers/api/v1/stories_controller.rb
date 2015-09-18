class Api::V1::StoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project
  before_action :set_story, only: [:show, :update, :destroy, :move]
  respond_to :json

  def index
    render json: @project.stories, status: :ok, root: false
  end

  def show
    render json: @story, status: :ok
  end

  def create
    story = @project.stories.new(story_params)

    if story.save
      render json: story, status: :created, serializer: StorySerializer, root: false
    else
      render json: story.errors, status: :unprocessable_entity
    end
  end

  def update
    if @story.update(story_params)
      render json: @story, status: :ok, root: false
    else
      render json: @story.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @story.destroy
      head :no_content
    else
      render json: @story.errors, status: :unprocessable_entity
    end
  end

  def move
    position = params[:position].to_i
    @story.insert_at(position)

    render json: @story, status: :ok, root: false
  end

  private
  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_story
    @story = Story.find(params[:id])
  end

  def story_params
    params
    .require(:story)
    .permit(:name, :description, :project_id, :priority, :estimation);
  end
end
