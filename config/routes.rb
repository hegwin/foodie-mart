Rails.application.routes.draw do
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :restaurants, only: %i[index show create update] do
        collection { get :my }
      end
      resources :meals, only: %i[index create update show]
      resources :sessions, only: :create
      resources :orders, only: %i[index show create] do
        member do
          post(*Order.aasm.events.map(&:name))
        end
      end
      resources :users, only: %i[create update] do
        collection { get :me }
      end
      resources :blacklists, only: %i[create index] do
        collection { delete :destroy }
      end
    end
  end

  get '*path', to: 'home#index'
end
