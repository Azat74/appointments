class DaysController < ApplicationController
  def index
    @days = Day
            .includes(:appointments)
            .order(:date)
  end

  def show
    @day = Day.find(params[:id])
  end

  def new
    @day = Day.new
  end

  def edit
    @day = Day.find(params[:id])
  end

  def create
    @day = Day.new(day_params)

    respond_to do |format|
      if @day.save
        format.json { render json: @day }
      end
    end
  end

  def update
    @day = Day.find(params[:id])

    if @day.update(day_params)
      redirect_to @day
    else
      render 'edit'
    end
  end

  def destroy
    @day = Day.find(params[:id])
    @day.destroy
  end

  private

  def day_params
    params.require(:day).permit(:date)
  end
end
