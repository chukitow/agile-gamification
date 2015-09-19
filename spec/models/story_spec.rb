require 'spec_helper'

describe Story do
  it { belong_to(:project) }
  it { belong_to(:category) }
  it { have_many(:comments) }
end
