module Api 
  module V1
    class BasketsController < ApplicationController

      def index
      end

      def create
        basket = current_user.basket ? current_user.basket : Basket.create!(user_id: current_user.id)
      end

      def promotions
        total_amount = []
        basket_products = current_user.baskets.each do |item|
          item.get_discounted_price
        end
      end

    end
  end 
end