require 'spec_helper'

describe MarkStory do
  let(:user)  { create(:user) }
  let(:story) { create(:story) }

  context 'when the story belongs to an owner' do
    context 'and the story state "Unstarted"' do
      let(:state) { create(:story_state, :unstarted)}

      before do
        MarkStory.as(story, state, user)
      end

      it 'unassigns the user as the owner' do
        expect(story.owner).to be_nil
      end
    end
  end

  context 'when the story doesn\'t belong an owner' do
    context 'and the story state "Started"' do
      let(:state) { create(:story_state, :started)}

      before do
        MarkStory.as(story, state, user)
      end

      it 'assigns the user as the owner' do
        expect(story.owner).to eq(user)
      end
    end
  end
end
