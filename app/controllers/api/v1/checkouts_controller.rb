module Api 
  module V1
    class CheckoutsController < ApplicationController

      def index
      end

      def new
        co = Checkout.new(basket_id: current_user.basket.id)
        co.basket_total = co.total
        co.basket_discount = co.total_discounts
        co.amount_payable = ( co.total - co.total_discounts )
        if co.save
          binding.pry
        else
          binding.pry
        end
      end
    end
  end 
end