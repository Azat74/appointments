class V1::WorkingDaysController < ApplicationController
  before_action :set_working_day, only: %i[show update destroy]
  before_action :authenticate_user!

  def index
    working_day = WorkingDay
                  .available
                  .page(params[:page]).per(params[:per_page])
    render json: working_day,
           include: %w[appointments users]
  end

  def show
    render json: @day
  end

  def create
    day = WorkingDay.new(working_day_params)
    if day.save
      render json: day
    else
      unprocessable_entity day.errors
    end
  end

  def update
    if @day.update_attributes(working_day_params)
      render json: @day
    else
      unprocessable_entity @day.errors
    end
  end

  def destroy
    if @day.destroy
      render json: {}, status: :ok
    else
      unprocessable_entity @day.errors
    end
  end

  private

  def working_day_params
    params.require(:working_day).permit(:date)
  end

  def set_working_day
    @day = WorkingDay.find(params[:id])
  end
end
