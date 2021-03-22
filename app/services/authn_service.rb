class AuthnService
  HMAC_SECRET = Rails.application.credentials.auth[:hmac_secret]
  CRYPTO_ALGORITHM = Rails.application.credentials.auth[:crypto_algorithm]

  def self.generate_token(user_id)
    payload = { user_id: user_id }
    JWT.encode payload, HMAC_SECRET, CRYPTO_ALGORITHM
  end

  def self.decode(token)
    decoded_data = JWT.decode token, HMAC_SECRET, true, { algorithm: CRYPTO_ALGORITHM }

    decoded_data[0]['user_id']
  end
end
