class Basket < ApplicationRecord
  belongs_to :user
  has_many :basket_items
  has_one :checkout

  def update_basket_items item
    saved_product = self.basket_items.find_by_product_id(item[:id])
    if saved_product
      saved_product.update(count: saved_product.count+1, product_total: saved_product.product_total+item[:price])
    else
      product = Product.find_by_id(item[:id])
      BasketItem.create!( basket_id: self.id, product_id: product.id, product_name: product.name, product_total: item[:price], product_discount: 0 )
    end
  end
end
