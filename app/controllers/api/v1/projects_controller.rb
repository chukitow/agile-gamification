class Api::V1::ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: [:show, :update, :destroy]
  respond_to :json

  def index
    render json: current_user.projects, status: :ok, root: false
  end

  def show
    render json: @project, status: :ok, root: false
  end

  def create
    project = current_user.projects.new(project_params)

    if project.save
      render json: project, status: :created
    else
      render json: project.errors, status: :unprocessable_entity
    end
  end

  def update
    if @project.update(project_params)
      render json: @project, status: :ok
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @project.destroy
      head :no_content
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  private
  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name)
  end
end
