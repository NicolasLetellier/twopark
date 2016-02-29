class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  layout "bootstrap_application"


  def after_sign_in_path_for(user)
  	parkings_path
	end

end
