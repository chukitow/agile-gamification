require 'rails_helper'

describe User do
  it { have_many(:projects) }
  it { have_many(:comments) }
end
