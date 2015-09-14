class AddStimationToStory < ActiveRecord::Migration
  def change
    add_column :stories, :estimation, :integer
  end
end
