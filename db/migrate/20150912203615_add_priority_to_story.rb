class AddPriorityToStory < ActiveRecord::Migration
  def change
    add_column :stories, :priority, :boolean, default: false
  end
end
