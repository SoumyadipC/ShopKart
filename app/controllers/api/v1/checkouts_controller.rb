module Api 
  module V1
    class CheckoutsController < ApplicationController

      def index
         @checkout = current_user.basket.checkout
        if user_signed_in?
          render json: @checkout
        else
          render json: {}, status: 401
        end
      end

      def new
        checkout_item = current_user.basket.checkout
        co = checkout_item.blank? ? Checkout.create!(basket_id: current_user.basket.id) : checkout_item
        co.basket_total = co.total
        co.basket_discount = co.total_discounts
        co.amount_payable = ( co.total - co.total_discounts )
        if co.save
          render json: co
        end
      end

      def update_checkout
        co = current_user.basket.checkout
        co.basket_total = co.total
        co.basket_discount = co.total_discounts
        co.amount_payable = ( co.total - co.total_discounts )
        if co.save
          render json: co
        end
      end
    end
  end 
end