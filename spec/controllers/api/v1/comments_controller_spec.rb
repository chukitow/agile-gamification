require 'rails_helper'

describe Api::V1::CommentsController, 'GET#show' do
  let(:user)    { create(:user) }
  let(:story)   { create(:story_with_comments) }
  let(:comment) { story.comments.first }

  before do
    sign_in(user)
    get :show, story_id: story.id, id: comment.id
  end

  it 'retrives the requested comment' do
    response_comment      = CommentSerializer.new(comment)
    response_comment.root = false
    expect(response.body).to eq(response_comment.to_json)
  end
end

describe Api::V1::CommentsController, 'POST#create' do
  let(:user)    { create(:user) }
  let(:story)   { create(:story_with_comments) }

  before do
    sign_in(user)
  end

  context 'when has valid params' do
    before do
      post :create, story_id: story.id, comment: attributes_for(:comment)
    end

    it 'retrives the created comment' do
      comment       = CommentSerializer.new(Comment.last)
      comment.root  = false
      expect(response.body).to eq(comment.to_json)
    end
  end

  context 'when has invalid params' do
    before do
      post :create, story_id: story.id, comment: attributes_for(:comment, content: '')
    end

    it 'retrives the errors' do
      errors = JSON.parse(response.body)['content']
      expect(errors).to include("can't be blank")
    end
  end
end

describe Api::V1::CommentsController, 'PUT#update' do
  let(:user)    { create(:user) }
  let(:story)   { create(:story_with_comments) }
  let(:comment) { story.comments.last }

  before do
    sign_in(user)
  end

  context 'when has valid params' do
    before do
      put :update, story_id: story.id,
        id: comment.id, comment: attributes_for(:comment)
    end

    it 'retrives the updated comment' do
      comment       = CommentSerializer.new(Comment.last)
      comment.root  = false
      expect(response.body).to eq(comment.to_json)
    end
  end

  context 'when has invalid params' do
    before do
      put :update, story_id: story.id,
        id: comment.id, comment: attributes_for(:comment, content: '')
    end

    it 'retrives the errors' do
      errors = JSON.parse(response.body)['content']
      expect(errors).to include("can't be blank")
    end
  end
end

describe Api::V1::CommentsController, 'DELETE#destroy' do
  let(:user)    { create(:user) }
  let(:story)   { create(:story_with_comments) }
  let(:comment) { story.comments.last }

  before do
    sign_in(user)
  end

  it 'deletes the story' do
    expect{
      delete :destroy, story_id: story.id, id: comment.id
    }.to change(Comment, :count)
  end
end
