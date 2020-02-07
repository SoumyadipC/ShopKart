Rails.application.routes.draw do
  devise_for :users
  get '/app', to: 'welcome#app', as: 'app'
  get '/api/v1/checkout', to: 'api/v1/checkouts#new'
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
