Rails.application.routes.draw do


  post "uploads/avatar" => "uploads#avatar"
  post "uploads/:photo_id" => "uploads#photo", as: "photo_upload"

  devise_for :users, controllers: {
    sessions: 'auth/sessions',
    registrations: 'auth/registrations',
    #omniauth_callbacks: "users/omniauth_callbacks", 
  }

  resources :messagestoadministrators, :categories, :products
  
  get 'home/index'
  get 'stores/index'
  get 'stores/all_category'
  get 'stores/contact'

 
   
  resources :users, only: [:index, :show] do
    collection do
      get "touch"
      get "metrics"
    end
    member do
      put "rate"
      put "ban"
      put "unban"
    end
  end
  #root 'products#index'
  get '/users/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup
  delete 'user_delete/:id' => 'admin/admins#delete_user', as: "delete_user"
  root 'stores#index'

end
