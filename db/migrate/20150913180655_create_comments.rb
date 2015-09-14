class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text    :content
      t.integer :user_id, index: true
      t.integer :story_id, index: true

      t.timestamps
    end
  end
end
