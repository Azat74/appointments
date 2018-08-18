class DaysController < ApplicationController
  def index
    @days = Day.includes(:appointments).order(:date)
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
    if @day.save
      redirect_to root_path
    else
      render 'new'
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

  private

  def day_params
    params.require(:day).permit(:id, :date)
  end
end
