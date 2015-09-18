require 'spec_helper'

describe Story do
  it { belong_to(:project) }
  it { have_many(:comments) }
end
