require 'rails_helper'

RSpec.describe AuthnService do
  describe '.call' do
    it 'returns a jwt' do
      token = described_class.call({ id: 1, role: 'normal' })

      decoded = JWT.decode token, described_class::HMAC_SECRET, true, { algorithm: described_class::CRYPTO_ALGORITHM }

      expect(decoded).to eq [
        { 'id'  => 1, 'role' => 'normal' }, # payload
        { 'alg' => described_class::CRYPTO_ALGORITHM } # header
      ]
    end
  end
end
