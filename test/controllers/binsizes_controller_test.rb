require 'test_helper'

class BinsizesControllerTest < ActionController::TestCase
  setup do
    @binsize = binsizes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:binsizes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create binsize" do
    assert_difference('Binsize.count') do
      post :create, binsize: { avg: @binsize.avg, const: @binsize.const, packages: @binsize.packages, weight: @binsize.weight }
    end

    assert_redirected_to binsize_path(assigns(:binsize))
  end

  test "should show binsize" do
    get :show, id: @binsize
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @binsize
    assert_response :success
  end

  test "should update binsize" do
    patch :update, id: @binsize, binsize: { avg: @binsize.avg, const: @binsize.const, packages: @binsize.packages, weight: @binsize.weight }
    assert_redirected_to binsize_path(assigns(:binsize))
  end

  test "should destroy binsize" do
    assert_difference('Binsize.count', -1) do
      delete :destroy, id: @binsize
    end

    assert_redirected_to binsizes_path
  end
end
