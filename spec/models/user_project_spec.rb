require 'spec_helper'

describe UserProject do
  it { belong_to(:user) }
  it { belong_to(:project) }
end
