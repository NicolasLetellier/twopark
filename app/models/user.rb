class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable. desactivated: :recoverable, :validatable
  devise :database_authenticatable, :registerable,
         :rememberable, :trackable

  has_many :parkings
end
