class CreateBinsizes < ActiveRecord::Migration
  def change
    create_table :binsizes do |t|
      t.integer :weight
      t.boolean :const, default: false
      t.json :packages
      t.integer :avg

      t.timestamps null: false
    end
  end
end
