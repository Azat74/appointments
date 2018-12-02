class WorkingDaysController < ApplicationController
  def index
    @days = WorkingDay
            .includes(:appointments)
            .order(:date)
  end

  def show
    @day = WorkingDay.find(params[:id])
  end

  def new
    @day = WorkingDay.new
  end

  def edit
    @day = WorkingDay.find(params[:id])
  end

  def create
    @day = WorkingDay.new(working_day_params)

    respond_to do |format|
      if @day.save
        format.json { render json: @day }
      end
    end
  end

  def update
    @day = WorkingDay.find(params[:id])

    if @day.update(working_day_params)
      redirect_to @day
    else
      render 'edit'
    end
  end

  def destroy
    @day = WorkingDay.find(params[:id])
    @day.destroy
  end

  private

  def working_day_params
    params.require(:working_day).permit(:date)
  end
end