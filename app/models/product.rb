class Product < ApplicationRecord
  has_one :baskets
  has_one :basket_items
end
