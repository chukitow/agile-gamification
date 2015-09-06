require 'rails_helper'

describe Project do
  it { validate_presence_of(:name) }
end
