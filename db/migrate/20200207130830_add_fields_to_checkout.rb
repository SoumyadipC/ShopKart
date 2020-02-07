class AddFieldsToCheckout < ActiveRecord::Migration[5.2]
  def change
    add_column :checkouts, :basket_total, :integer
    add_column :checkouts, :basket_discount, :integer
    add_column :checkouts, :amount_payable, :integer
  end
end
