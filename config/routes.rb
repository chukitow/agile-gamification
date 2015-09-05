Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  root 'home#index'
  get '/*all', to: 'home#index'
end
