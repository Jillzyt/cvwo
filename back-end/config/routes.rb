Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resource :users, only: [:create]
  post "/login", to: "users#login"
  post "/register", to: "users#create"
  post "/logout", to: "users#logout"
  post "/check_credentials", to: "users#check_credentials"
  get "/auto_login", to: "users#auto_login"

end
