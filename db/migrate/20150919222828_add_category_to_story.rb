class AddCategoryToStory < ActiveRecord::Migration
  def change
    add_column :stories, :category_id, :integer
    add_index  :stories, :category_id
  end
end
