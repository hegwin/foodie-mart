require 'rails_helper'

RSpec.describe AuthnService do
  describe '.call' do
    it 'returns a jwt' do
      token = described_class.generate_token(1)

      decoded = JWT.decode token, described_class::HMAC_SECRET, true, { algorithm: described_class::CRYPTO_ALGORITHM }

      expect(decoded).to eq [
        { 'user_id'  => 1 }, # payload
        { 'alg' => described_class::CRYPTO_ALGORITHM } # header
      ]
    end
  end
end
