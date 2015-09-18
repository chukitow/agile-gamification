require 'spec_helper'

describe Project do
  it { have_many(:users) }
  it { have_many(:stories) }

  it { validate_presence_of(:name) }
end
