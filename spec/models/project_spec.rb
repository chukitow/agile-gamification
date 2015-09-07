require 'rails_helper'

describe Project do
  it { have_many(:users) }

  it { validate_presence_of(:name) }
end
