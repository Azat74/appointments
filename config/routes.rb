Rails.application.routes.draw do
  devise_for :customers, controllers: {
    sessions: 'customers/sessions',
    registrations: 'customers/registrations'
  }
  get 'appointment', to: 'appointments#new', as: 'appointment_new'
  post 'appointment', to: 'appointments#create'
  root 'appointments#index'
end
