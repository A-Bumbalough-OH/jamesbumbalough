Jamesbumbalough::Application.routes.draw do
  
  match '/create',  to: 'static_pages#create',  via: 'post'
    
  root  'static_pages#home'
  match '/experience_hawaii',      to: 'experiences#experience_hawaii',      via: 'get'
  match '/experience_fall_lookbook',      to: 'experiences#experience_fall_lookbook',      via: 'get'
  match '/experience_santa_squad',      to: 'experiences#experience_santa_squad',      via: 'get'
  match '/experience_happy_spring_login',      to: 'experiences#experience_happy_spring_login',      via: 'get'
  match '/experience_happy_spring',      to: 'experiences#experience_happy_spring',      via: 'get'
  match '/experience_happy_spring_mobile',      to: 'experiences#experience_happy_spring_mobile',      via: 'get'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
