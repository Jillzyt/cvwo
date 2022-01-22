class CreateTaggings < ActiveRecord::Migration[7.0]
  def change
    create_table :taggings do |t|
      t.references :tag, null: false, foreign_key: true
      t.references :todo, null: false, foreign_key: true,  on_delete: :cascade

      t.timestamps
    end
  end
end
