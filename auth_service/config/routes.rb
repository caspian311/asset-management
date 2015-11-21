Rails.application.routes.draw do
  namespace :api, default: { format: :json } do
    namespace :auth do
      resources :session, only: [:index, :create, :destroy]
    end
  end
end
