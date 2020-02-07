class RemoveCountFromBaskets < ActiveRecord::Migration[5.2]
  def change
    remove_column :baskets, :count
    remove_column :baskets, :product_id
    add_column :baskets, :basket_total, :integer
  end
end
