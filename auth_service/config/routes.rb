Rails.application.routes.draw do
  namespace :api, default: { format: :json } do
    resources :session, only: [:create]
  end
end
