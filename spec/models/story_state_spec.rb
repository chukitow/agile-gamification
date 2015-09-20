require 'spec_helper'

describe StoryState do
  it { have_many(:stories) }
  it { validate_uniqueness_of(:name)}
end
