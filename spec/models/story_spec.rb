require 'spec_helper'

describe Story do
  it { belong_to(:project) }
  it { belong_to(:category) }
  it { belong_to(:state) }
  it { have_many(:comments) }
end

describe Story, 'after_create' do
  let(:story) { create(:story) }

  it 'assigns a default category' do
    expect(story.category.name).to eq('Feature')
  end

  it 'assigns the state as unstarted' do
    expect(story.state.name).to eq('Unstarted')
  end
end
