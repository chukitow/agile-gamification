class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :name
      t.text :description

      t.integer :project_id, index: true
    end
  end
end
