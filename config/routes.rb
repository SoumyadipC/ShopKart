Rails.application.routes.draw do
  devise_for :users
  get '/app', to: 'welcome#app', as: 'app'
  post '/api/v1/checkout/new', to: 'api/v1/checkouts#new'
  get '/api/v1/checkout', to: 'api/v1/checkouts#index'
  get '/api/v1/checkout/update_checkout', to: 'api/v1/checkouts#update_checkout'
  get '/api/v1/basket_items/get_items', to: 'api/v1/basket_items#get_items'
  put '/api/v1/basket_items/delete', to: 'api/v1/basket_items#delete'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#app'
  namespace :api do 
    namespace :v1 do 
      resources :products
      resources :baskets
      resources :basket_items
      resources :checkouts
    end 
  end
end
