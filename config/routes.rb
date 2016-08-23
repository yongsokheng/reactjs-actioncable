Rails.application.routes.draw do
  mount ActionCable.server => "/cable"
  root "messages#new"
  resources :messages
end
