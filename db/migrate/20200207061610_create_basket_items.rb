class CreateBasketItems < ActiveRecord::Migration[5.2]
  def change
    create_table :basket_items do |t|
      t.integer :basket_id
      t.integer :product_id
      t.integer :count, default: 1
      t.integer :product_total
      t.integer :product_discount

      t.timestamps
    end
  end
end
