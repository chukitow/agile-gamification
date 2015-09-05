Rails.application.routes.draw do
  root 'home#index'
  get '/*all', to: 'home#index'
end
