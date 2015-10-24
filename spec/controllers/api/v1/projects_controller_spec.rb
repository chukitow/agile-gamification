require 'spec_helper'

describe Api::V1::ProjectsController, 'GET#index' do
  let(:user) { create(:user_with_project) }
  let(:projects) do
    ActiveModel::ArraySerializer.new(
      user.projects,
      each_serializer: ProjectSerializer
    )
  end

  before do
    sign_in(user)
  end

  it 'retrives all the user projects' do
    get :index
    expect(response.body).to eq(projects.to_json)
  end
end

describe Api::V1::ProjectsController, 'GET#show' do
  let(:user)    { create(:user_with_project) }
  let(:project) { ProjectSerializer.new(user.projects.first) }

  before do
    sign_in(user)
    get :show, id: project.id
  end

  it 'retrives the requested project' do
    project.root = false
    expect(response.body).to eq(project.to_json)
  end
end

describe Api::V1::ProjectsController, 'POST#create' do
  let(:user) { create(:user) }

  before do
    sign_in(user)
  end

  context 'when has valid params' do
    before do
      post :create, project: attributes_for(:project)
    end

    it 'creates the project' do
      expect(Project.count).to eq(1)
    end

    it 'retrives the project' do
      project      = ProjectSerializer.new(user.projects.last)
      project.root = false
      expect(response.body).to eq(project.to_json)
    end
  end

  context 'when has invalid params' do
    before do
      post :create, project: attributes_for(:project, name: '')
    end

    it 'doesn\'t create the project' do
      expect(Project.count).to eq(0)
    end

    it 'retrives the errors' do
      name_errors = JSON.parse(response.body)["name"]
      expect(name_errors).to include("can't be blank")
    end
  end
end

describe Api::V1::ProjectsController, 'PUT#update' do
  let(:user)    { create(:user_with_project) }
  let(:project) { user.projects.first }

  before do
    sign_in(user)
  end

  context 'when has valid params' do
    before do
      put :update, id: project.id, project: attributes_for(:project)
    end

    it 'retrives the project' do
      project.reload
      project_serializer      = ProjectSerializer.new(project)
      project_serializer.root = false
      expect(response.body).to eq(project_serializer.to_json)
    end
  end

  context 'when has invalid params' do
    before do
      put :update, id: project.id, project: attributes_for(:project, name: '')
    end

    it 'retrives the errors' do
      name_errors = JSON.parse(response.body)["name"]
      expect(name_errors).to include("can't be blank")
    end
  end
end

describe Api::V1::ProjectsController, 'DELETE#destroy' do
  let(:user)    { create(:user_with_project) }
  let(:project) { user.projects.first }

  before do
    sign_in(user)
  end
  it 'deletes the project' do
    expect{
      delete :destroy, id: project.id
    }.to change(Project, :count)
  end
end
