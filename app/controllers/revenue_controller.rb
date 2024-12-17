class RevenueController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:show]

  def index
    @app_ids = Rails.cache.fetch(daily_cache_key, expires_in: 1.day) do
      ItunesSalesReportEstimate.app_ids
    end
  end

  def show
    app_id = revenue_params[:app_id]
    start_date = Date.strptime(revenue_params[:start_date].to_s, "%d/%m/%Y").mongoize rescue nil
    end_date = Date.strptime(revenue_params[:end_date].to_s, "%d/%m/%Y").mongoize rescue nil

    if app_id && start_date && end_date
      result = ItunesSalesReportEstimate.get_time_series(app_id, start_date, end_date)
      render json: result
    else
      render json: { error: 'Invalid parameters' }, status: :unprocessable_entity
    end
  end

  private

  def daily_cache_key
    @daily_cache_key ||= "index_options_cache_key_#{Time.now.to_i / 1.day}"
  end

  def revenue_params
    params.require(:revenue).permit(:app_id, :start_date, :end_date)
  end
end
