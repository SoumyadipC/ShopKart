require 'rails_helper'

describe Checkout do
  describe "Discounts calculation logic" do
    let!(:user) { FactoryGirl.create(:user) }
    let!(:basket) { FactoryGirl.create(:basket, user: user) }
  
    context "When 3*Product A is added to cart" do 
      let!(:product) { FactoryGirl.create(:product, name: 'Product A', price: 30, description: 'A good product') }
      it "3 * Product A is added to cart" do
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product, product_name: 'Product A', count: 3, product_total: 90
        checkout = FactoryGirl.create :checkout, basket: basket
        expect(checkout.total).to be(90)
        expect(checkout.total_discounts).to be(15)
        expect(checkout.to_pay).to eq(75)
      end
    end
    context "When 2*Product B is added to cart" do
      let!(:product) { FactoryGirl.create(:product, name: 'Product B', price: 20, description: 'A good product') }
      it "2 * Product B is added to cart" do
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product, product_name: 'Product B', count: 2, product_total: 40
        checkout = FactoryGirl.create :checkout, basket: basket
        expect(checkout.total).to be(40)
        expect(checkout.total_discounts).to be(5)
        expect(checkout.to_pay).to eq(35)
      end
    end
    context "When 1*Product C is added to cart" do
      let!(:product) { FactoryGirl.create(:product, name: 'Product C', price: 50, description: 'A good product') }
      it "2 * Product B is added to cart" do
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product, product_name: 'Product C', count: 1, product_total: 50
        checkout = FactoryGirl.create :checkout, basket: basket
        expect(checkout.total).to be(50)
        expect(checkout.total_discounts).to be(0)
        expect(checkout.to_pay).to eq(50)
      end
    end
    context "When 1*Product D is added to cart" do
      let!(:product) { FactoryGirl.create(:product, name: 'Product D', price: 15, description: 'A good product') }
      it "2 * Product B is added to cart" do
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product, product_name: 'Product D', count: 1, product_total: 15
        checkout = FactoryGirl.create :checkout, basket: basket
        expect(checkout.total).to be(15)
        expect(checkout.total_discounts).to be(0)
        expect(checkout.to_pay).to eq(15)
      end
    end
    context "when A,B,C is added to cart" do
      let!(:product1) { FactoryGirl.create(:product, name: 'Product A', price: 30, description: 'A good product') }
      let!(:product2) { FactoryGirl.create(:product, name: 'Product B', price: 20, description: 'A good product') }
      let!(:product3) { FactoryGirl.create(:product, name: 'Product C', price: 50, description: 'A good product') }
      it "should have 0 discount" do
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product1, product_name: 'Product A', count: 1, product_total: 30
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product2, product_name: 'Product B', count: 1, product_total: 20
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product3, product_name: 'Product C', count: 1, product_total: 50
        checkout = FactoryGirl.create :checkout, basket: basket
        expect(checkout.total).to be(100)
        expect(checkout.total_discounts).to be(0)
        expect(checkout.to_pay).to eq(100)
      end
    end
    context "when 3*A,2*B, is added to cart" do
      let!(:product1) { FactoryGirl.create(:product, name: 'Product A', price: 30, description: 'A good product') }
      let!(:product2) { FactoryGirl.create(:product, name: 'Product B', price: 20, description: 'A good product') }
      it "should have discount 20" do
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product1, product_name: 'Product A', count: 3, product_total: 90
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product2, product_name: 'Product B', count: 2, product_total: 40
        checkout = FactoryGirl.create :checkout, basket: basket
        expect(checkout.total).to be(130)
        expect(checkout.total_discounts).to be(20)
        expect(checkout.to_pay).to eq(110)
      end
    end
    context "when 3*A,2*B,C,D is added to cart" do
      let!(:product1) { FactoryGirl.create(:product, name: 'Product A', price: 30, description: 'A good product') }
      let!(:product2) { FactoryGirl.create(:product, name: 'Product B', price: 20, description: 'A good product') }
      let!(:product3) { FactoryGirl.create(:product, name: 'Product C', price: 50, description: 'A good product') }
      let!(:product4) { FactoryGirl.create(:product, name: 'Product D', price: 15, description: 'A good product') }
      it "should have discount 40" do
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product1, product_name: 'Product A', count: 3, product_total: 90
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product2, product_name: 'Product B', count: 2, product_total: 40
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product3, product_name: 'Product C', count: 1, product_total: 50
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product4, product_name: 'Product D', count: 1, product_total: 15
        checkout = FactoryGirl.create :checkout, basket: basket
        expect(checkout.total).to be(195)
        expect(checkout.total_discounts).to be(40)
        expect(checkout.to_pay).to eq(155)
      end
    end
    context "when 3*A,C,D is added to cart" do
      let!(:product1) { FactoryGirl.create(:product, name: 'Product A', price: 30, description: 'A good product') }
      let!(:product2) { FactoryGirl.create(:product, name: 'Product C', price: 50, description: 'A good product') }
      let!(:product3) { FactoryGirl.create(:product, name: 'Product D', price: 15, description: 'A good product') }
      it "should have discount 15" do
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product1, product_name: 'Product A', count: 3, product_total: 90
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product2, product_name: 'Product C', count: 1, product_total: 50
        basket_item = FactoryGirl.create :basket_item, basket: basket, product: product3, product_name: 'Product D', count: 1, product_total: 15
        checkout = FactoryGirl.create :checkout, basket: basket
        expect(checkout.total).to be(155)
        expect(checkout.total_discounts).to be(15)
        expect(checkout.to_pay).to eq(140)
      end
    end
  end
end