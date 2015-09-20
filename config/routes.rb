Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do

      resources :projects do
        resources :stories do
          member do
            put :move
            put :change_category
          end
        end
      end

      resources :stories do
        resources :comments
      end

      resources :categories, only: [:index]
    end
  end

  root 'home#index'

  mount_devise_token_auth_for 'User', at: 'api/auth'
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  get '/*all', to: 'home#index'
end
