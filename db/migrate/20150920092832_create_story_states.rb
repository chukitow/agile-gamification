class CreateStoryStates < ActiveRecord::Migration
  def change
    create_table :story_states do |t|
      t.string :name
    end
  end
end
