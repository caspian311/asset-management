Rails.application.routes.draw do
  namespace :api, default: { format: :json } do
    resources :user, only: [:create]
  end
end
