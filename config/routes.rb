Rails.application.routes.draw do
  get 'appointment', to: 'appointments#new', as: 'appointment_new'
  post 'appointment', to: 'appointments#create'
  root 'appointments#index'
end
