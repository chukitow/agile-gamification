class CreateUserProjects < ActiveRecord::Migration
  def change
    create_table :user_projects do |t|
      t.integer :user_id,     index: true
      t.integer :project_id,  index: true
    end
  end
end
