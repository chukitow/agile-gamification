require 'spec_helper'

describe Comment do
  it { belong_to(:user) }
  it { belong_to(:story) }
end
