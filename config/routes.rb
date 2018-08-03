Rails.application.routes.draw do
  devise_scope :user do
    get 'sign_up', to: 'users/registrations#new',
                   as: :new_user_registration
    post 'sign_up', to: 'users/registrations#create',
                    as: :user_registration
    get 'sign_in', to: 'users/sessions#new', as: :new_user_session
    post 'sign_in', to: 'users/sessions#create', as: :user_session
    delete 'sign_out', to: 'users/sessions#destroy',
                       as: :destroy_user_session
  end
  devise_for :users, skip: :all
  get 'appointments', to: 'appointments#index'
  get 'appointment', to: 'appointments#new'
  post 'appointments', to: 'appointments#create'
  root 'calendar#index'
end
