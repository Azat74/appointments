Rails.application.routes.draw do
  # devise_for :customers, controllers: {
  #   registrations: 'customers/registrations'
  # }
  devise_scope :customer do
    get 'sign_up', to: 'customers/registrations#new',
                   as: :new_customer_registration
    post 'sign_up', to: 'customers/registrations#create',
                    as: :customer_registration
    get 'sign_in', to: 'customers/sessions#new', as: :new_customer_session
    post 'sign_in', to: 'customers/sessions#create', as: :customer_session
    delete 'sign_out', to: 'customers/sessions#destroy',
                       as: :destroy_customer_session
  end
  devise_for :customers, skip: :all
  get 'appointment', to: 'appointments#new'
  post 'appointment', to: 'appointments#create'
  root 'appointments#index'
end
