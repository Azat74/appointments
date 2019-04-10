Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :v1 do
    resources :working_days
    get 'appointments', to: 'appointments#index'
    get 'appointment', to: 'appointments#new'
    post 'appointments', to: 'appointments#create'
    get 'users', to: 'users#index'
  end
  root 'appointments#index'
end
