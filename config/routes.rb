Rails.application.routes.draw do
  root 'hegwin#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #
  namespace :api do
    namespace :v1 do
      resources :restaurants, only: :index
    end
  end
end
