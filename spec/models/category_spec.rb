require 'spec_helper'

describe Category do
  it { have_many(:stories) }
  it { validate_uniqueness_of(:name)}
end
