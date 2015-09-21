require 'spec_helper'

describe User do
  it { have_many(:projects) }
  it { have_many(:comments) }
  it { have_many(:stories) }
end
