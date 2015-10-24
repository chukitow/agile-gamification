class Api::V1::ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: [:show, :update, :destroy, :add_member]
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
      render json: project, status: :created, root: false
    else
      render json: project.errors, status: :unprocessable_entity
    end
  end

  def update
    if @project.update(project_params)
      render json: @project, status: :ok, root: false
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

  def add_member
    user = User.find_by(email: params[:email])
    if user && UserProject.create(user_id: user.id, project_id: @project.id)
      render json: @project, status: :ok, root: false
    else
      render json: { error: 'user not found', status: :unprocessable_entity }
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
