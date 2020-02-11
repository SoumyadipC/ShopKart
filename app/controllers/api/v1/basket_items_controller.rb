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
        basket = current_user.basket
        saved_product = basket.basket_items.find_by_product_id(params[:id])
        if saved_product
          saved_product.update(count: saved_product.count+1, product_total: saved_product.product_total+params[:price])
        else
          product = Product.find_by_id(params[:id])
          BasketItem.create!( basket_id: basket.id, product_id: product.id, product_name: product.name, product_total: params[:price], product_discount: 0 )
      end
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