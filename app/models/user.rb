class User < ApplicationRecord
  has_secure_password

  def to_h
    {
      id: id,
      first_name: first_name,
      last_name: last_name,
      email: email
    }
  end
end
