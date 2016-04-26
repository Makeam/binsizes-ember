class BinsizesController < ApplicationController
  before_action :set_binsize, only: [:show, :edit, :update, :destroy]

  # GET /binsizes
  # GET /binsizes.json
  def index
    @binsizes = Binsize.all
  end

  # GET /binsizes/1
  # GET /binsizes/1.json
  def show
  end

  # GET /binsizes/new
  def new
    @binsize = Binsize.new
  end

  # GET /binsizes/1/edit
  def edit
  end

  # POST /binsizes
  # POST /binsizes.json
  def create
    @binsize = Binsize.new
    @binsize.from_json(binsize_params)

    respond_to do |format|
      if @binsize.save
        format.html { redirect_to @binsize, notice: 'Binsize was successfully created.' }
        format.json { render :show, status: :created, location: @binsize }
      else
        format.html { render :new }
        format.json { render json: @binsize.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /binsizes/1
  # PATCH/PUT /binsizes/1.json
  def update
    respond_to do |format|

      @binsize.from_json(binsize_params)

      if @binsize.save
        format.html { redirect_to @binsize, notice: 'Binsize was successfully updated.' }
        format.json { render :show, status: :ok, location: @binsize }
      else
        format.html { render :edit }
        format.json { render json: @binsize.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /binsizes/1
  # DELETE /binsizes/1.json
  def destroy
    @binsize.destroy
    respond_to do |format|
      format.html { redirect_to binsizes_url, notice: 'Binsize was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_binsize
      @binsizes = Binsize.where(id: params[:id])
      @binsize = @binsizes.first
      #@binsize = Binsize.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def binsize_params
      params[:data][:attributes].to_json
    end
end
