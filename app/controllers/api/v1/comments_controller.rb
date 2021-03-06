class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_comment, only: [:show, :update, :destroy]

  respond_to :json

  def index
    story = Story.find(params[:story_id])
    render json: story.comments, status: :ok, root: false
  end

  def show
    render json: @comment, status: :ok, root: false
  end

  def create
    comment = Comment.new(comment_params)

    if comment.save
      render json: comment, status: :created, root: false
    else
      render json: comment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment, status: :ok, root: false
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @comment.destroy
      head :no_content
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  private
  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:content, :user_id, :story_id)
  end
end
