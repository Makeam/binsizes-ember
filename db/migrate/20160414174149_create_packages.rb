class CreatePackages < ActiveRecord::Migration
  def change
    create_table :packages do |t|
      t.integer :val, default: 0
      t.string :unit, default: ''
      t.integer :bytes, default: 0
      t.integer :percent, default: 0
      t.references :binsize, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
