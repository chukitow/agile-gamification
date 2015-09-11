Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :projects do
        resources :stories
      end
    end
  end

  root 'home#index'

  mount_devise_token_auth_for 'User', at: 'api/auth'
  get '/*all', to: 'home#index'
end
