class AuthnService
  HMAC_SECRET = Rails.application.credentials.auth[:hmac_secret]
  CRYPTO_ALGORITHM = Rails.application.credentials.auth[:crypto_algorithm]

  def self.call(payload)
    JWT.encode payload, HMAC_SECRET, CRYPTO_ALGORITHM
  end
end
