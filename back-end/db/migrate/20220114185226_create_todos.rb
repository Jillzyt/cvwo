class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.string :description
      t.references :user, null: false, foreign_key: true
      t.boolean :status
      t.timestamps
    end
  end
end
