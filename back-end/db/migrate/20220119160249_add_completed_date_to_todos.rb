class AddCompletedDateToTodos < ActiveRecord::Migration[7.0]
  def change
    add_column :todos, :completed_date, :date
  end
end
