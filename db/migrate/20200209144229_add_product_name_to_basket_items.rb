class AddProductNameToBasketItems < ActiveRecord::Migration[5.2]
  def change
    add_column :basket_items, :product_name, :string
  end
end
