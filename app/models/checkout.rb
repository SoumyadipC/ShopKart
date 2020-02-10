class Checkout < ApplicationRecord
  belongs_to :basket

  def total
    price_arr = cart_items.pluck(:product_total)
    return price_arr.sum
  end

  def total_discounts
    discount_per_product = []
    cart_items.each do |item|
      case item.product.name
      when 'Product A'
        flag = item.count/3
        discount = 15 * flag
        discount_per_product << discount
      when 'Product B'
        flag = item.count/2
        discount = 5 * flag
        discount_per_product << discount
      when ('Product C' || 'Product D') 
        discount_per_product << 0
      end
    end
    total_product_discount = discount_per_product.sum
    return total_product_discount + self.additional_discounts(total_product_discount)
  end

  def additional_discounts(discount)
    (self.total - discount) > 150 ? 20 : 0
  end

  def cart_items
    self.basket.basket_items
  end

  def to_pay
    self.total - self.total_discounts
  end
end
