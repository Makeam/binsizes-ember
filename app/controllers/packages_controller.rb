class PackagesController < ApplicationController
  before_action :set_package, only: [:update, :destroy]

  def create
    @package = Package.new
    @package.from_json(package_params)
    @package.binsize_id = params[:data][:relationships][:binsize][:data][:id]

    if @package.save
      render :update, status: 201
    else
      render :update, status: :unprocessable_entity
    end
  end

  def update
    @package.from_json(package_params)
    if @package.save
      render :update, status: 200
    else
      render :update, status: :unprocessable_entity
    end
  end

  def destroy
    if @package.destroy
      render :update, status: 200
    else
      render :update, status: :unprocessable_entity
    end
  end

  private

  def package_params
    params[:data][:attributes].to_json
  end

  def set_package
    @packages = Package.where(id: params[:id])
    @package = @packages.first
  end

end
