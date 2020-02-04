module Api 
  module V1
    class ProductsController < ApplicationController
      def index 
        @products = Product.all
        if user_signed_in?
          render json: @products
        else
          render json: {}, status: 401
        end
      end
    end
  end 
end