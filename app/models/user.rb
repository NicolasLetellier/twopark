class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable. desactivated: :recoverable,
  devise :database_authenticatable, :registerable,
         :rememberable, :trackable, :validatable

  has_many :parkings
end
