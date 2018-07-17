Rails.application.routes.draw do
  devise_for :customers, controllers: {
    registrations: 'customers/registrations'
  }
  get 'appointment', to: 'appointments#new'
  post 'appointment', to: 'appointments#create'
  root 'appointments#index'
end
