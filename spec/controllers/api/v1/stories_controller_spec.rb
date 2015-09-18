require 'spec_helper'

describe Api::V1::StoriesController, 'GET#index' do
  let(:user)    { create(:user) }
  let(:project) { create(:project_with_stories) }
  let(:stories_serializers) do
    ActiveModel::ArraySerializer.new(
      project.stories,
      each_serializer: StorySerializer
    )
  end

  before do
    sign_in(user)
  end

  it 'retrives all the project stories' do
    get :index, project_id: project.id
    expect(response.body).to eq(stories_serializers.to_json)
  end
end

describe Api::V1::StoriesController, 'GET#show' do
  let(:user)    { create(:user) }
  let(:project) { create(:project_with_stories) }
  let(:story)   { StorySerializer.new(project.stories.first) }

  before do
    sign_in(user)
    get :show, project_id: project.id, id: story.id
  end

  it 'retrives the requested story' do
    expect(response.body).to eq(story.to_json)
  end
end

describe Api::V1::StoriesController, 'POST#create' do
  let(:user)    { create(:user) }
  let(:project) { create(:project_with_stories) }

  before do
    sign_in(user)
  end

  context 'when has valid attributes' do
    before do
      post :create, project_id: project.id, story: attributes_for(:story)
    end

    it 'retrives the created story' do
      story      = StorySerializer.new(project.stories.last)
      story.root = false
      expect(response.body).to eq(story.to_json)
    end
  end

  context 'when has invalid attributes' do
    before do
      post :create, project_id: project.id, story: attributes_for(:story, name: '')
    end

    it 'retrives the story errors' do
      errors = JSON.parse(response.body)
      expect(errors['name']).to include("can't be blank")
    end
  end
end

describe Api::V1::StoriesController, 'PUT#update' do
  let(:user)    { create(:user) }
  let(:project) { create(:project_with_stories) }
  let(:story)   { project.stories.last }

  before do
    sign_in(user)
  end

  context 'when has valid attributes' do
    before do
      put :update, project_id: project.id,
        id: story.id, story: attributes_for(:story)
    end

    it 'retrives the updated story' do
      story.reload
      response_story      = StorySerializer.new(story)
      response_story.root = false
      expect(response.body).to eq(response_story.to_json)
    end
  end

  context 'when has invalid attributes' do
    before do
      put :update, project_id: project.id,
        id: story.id, story: attributes_for(:story, name: '')
    end

    it 'retrives the story errors' do
      errors = JSON.parse(response.body)
      expect(errors['name']).to include("can't be blank")
    end
  end
end

describe Api::V1::StoriesController, 'DELETE#destroy' do
  let(:user)    { create(:user) }
  let(:project) { create(:project_with_stories) }
  let(:story)   { project.stories.last }

  before do
    sign_in(user)
  end

  it 'deletes the story' do
    expect{
      delete :destroy, project_id: project.id, id: story.id
    }.to change(Story, :count)
  end
end

describe Api::V1::StoriesController, 'PUT#move' do
  let(:user)    { create(:user) }
  let(:project) { create(:project_with_stories) }
  let(:story)   { project.stories.last }

  before do
    sign_in(user)
    put :move, project_id: project.id, id: story.id, position: 1
  end

  it 'moves the story to the requested index' do
    expect(story.reload.position).to eq(1)
  end

  it 'retrives the story' do
    story      = StorySerializer.new(project.stories.last)
    story.root = false
    expect(response.body).to eq(story.to_json)
  end
end
