require "test_helper"

class HegwinControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get hegwin_index_url
    assert_response :success
  end
end
