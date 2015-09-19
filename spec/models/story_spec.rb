require 'spec_helper'

describe Story do
  it { belong_to(:project) }
  it { belong_to(:category) }
  it { have_many(:comments) }
end

describe Story, 'after_create' do
  let(:story) { create(:story) }

  it 'assigns a default category' do
    expect(story.category.name).to eq('Feature')
  end
end
