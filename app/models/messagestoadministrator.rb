class Messagestoadministrator < ActiveRecord::Base

  belongs_to :user
  validates :email, :message, presence: true

  def self.pluck_fields
    ["messagestoadministrators.id", "messagestoadministrators.name", "messagestoadministrators.telephone", "messagestoadministrators.email", "messagestoadministrators.message"]
  end


end
