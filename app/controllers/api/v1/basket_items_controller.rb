module Api 
  module V1
    class BasketItemsController < ApplicationController

      def index
         product_ids = current_user.basket.basket_items.pluck(:product_id)
         @saved_products = Product.find(product_ids)
        if user_signed_in?
          render json: @saved_products
        else
          render json: {}, status: 401
        end
      end

      def create
      end

      def delete
        item = current_user.basket.basket_items.find_by_product_id(params[:id])
        item.destroy! if item
        product_ids = current_user.basket.basket_items.pluck(:product_id)
        @saved_products = Product.find(product_ids)
        render json: @saved_products
      end

      def get_items
         @basket_items = current_user.basket.basket_items
         render json: @basket_items
      end

      def saved_products
      end
    end
  end 
end