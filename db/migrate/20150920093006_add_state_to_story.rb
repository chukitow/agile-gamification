class AddStateToStory < ActiveRecord::Migration
  def change
    add_column :stories, :state_id, :integer
    add_index  :stories, :state_id
  end
end
