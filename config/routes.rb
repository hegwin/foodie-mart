Rails.application.routes.draw do
  root 'hegwin#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :restaurants, only: %i[index create update] do
        collection { get :my }
      end
      resources :sessions, only: :create
      resources :orders, only: %i[index show]
      resources :users, only: %i[create update] do
        collection { get :me }
      end
    end
  end
end
