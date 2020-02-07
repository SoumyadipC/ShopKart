class AddCountToBasket < ActiveRecord::Migration[5.2]
  def change
    add_column :baskets, :count, :integer
  end
end
