Rails.application.routes.draw do
  namespace :api, default: { format: :json } do
    resources :user, only: [:index, :create]
  end
end
