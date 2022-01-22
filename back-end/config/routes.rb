Rails.application.routes.draw do
  resources :todos
  get 'all/todos', to: 'todos#all'
  post 'todos/complete/:id', to: 'todos#complete'
  post 'todos/search', to: 'todos#search'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get 'tags/:tag', to: 'todos#index', as: :tag
  resources :tags

  # Defines the root path route ("/")
  # root "articles#index"
  resource :users, only: [:create]
  post "/login", to: "users#login"
  post "/register", to: "users#create"
  post "/logout", to: "users#logout"
  post "/check_credentials", to: "users#check_credentials"
  get "/auto_login", to: "users#auto_login"

end
