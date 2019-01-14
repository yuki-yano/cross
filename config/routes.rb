# frozen_string_literal: true

# == Route Map
#
#       Prefix Verb   URI Pattern             Controller#Action
#         root GET    /                       application#index
#   auth_slack POST   /auth/slack(.:format)   auth#slack
#        users GET    /users(.:format)        users#index
# test_session GET    /session/test(.:format) sessions#test
#      session DELETE /session(.:format)      sessions#destroy
#              POST   /session(.:format)      sessions#create

Rails.application.routes.draw do
  root to: 'home#index'

  post '/auth/slack', to: 'auth#slack'

  resources :users, only: %i[index]

  resource :session, only: %i[create destroy] do
    member do
      get :test
    end
  end
end
