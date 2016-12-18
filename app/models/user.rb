class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,:omniauthable, :omniauth_providers => [:digitalocean,:google_oauth2, :facebook]
  has_many :products

  has_many :messagestoadministrators
  #after_create :create_role_and_info
  after_create :user_first
  # after_create :send_notification
  belongs_to :avatar
  ROLES = {0 => :guest, 1 => :user, 2 => :moderator, 3 => :admin}
  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end
  

  def create_role_and_info
    a=Info.new
    a.update_attributes(user_id: self.id)
    unless self.role.present?
      update_attributes(role: "user")
    end    
  end 

  def role?(role_name)
    if role.present?
      role.to_sym == role_name
    else 
      role="quest"
    end
  end
  
  def user_first
    @user=User.where(role: "admin")
    unless @user.present?
      self.update_attributes(role: "admin", admin: true)
    end  
  end


  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
    end
  end
  
  def email_verified?
    true
  end

  def self.pluck_fields
    [:id, :created_at, :updated_at, :name, :avatar_url, :rating, :banned]
  end

  def public_fields
    self.attributes.slice("id", "email", "rating", "name", "created_at", "updated_at")
  end

  def send_notification
    AdminMailer.new_user(self).deliver_now
    AdminMailer.new_user_admin(self).deliver_now
  end

end

