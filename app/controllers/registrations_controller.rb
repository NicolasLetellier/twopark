class RegistrationsController < Devise::RegistrationsController
  before_filter :configure_permitted_parameters

	protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up).push(:name, :telefon)
    devise_parameter_sanitizer.for(:account_update).push(:name, :telefon)
  end

	def after_sign_up_path_for(user)
		user_path(user)
	end
	def after_update_path_for(user)
		user_path(user)
	end

end
