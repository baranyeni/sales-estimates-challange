class RevenueController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:show]
  def index
    @app_ids = Rails.cache.fetch(daily_cache_key, expires_in: 1.day) do
      ItunesSalesReportEstimate.app_ids
    end
  end

  def show
    arr = [ItunesSalesReportEstimate.first, ItunesSalesReportEstimate.second]
    render json: arr
  end

  private
  def daily_cache_key
    @daily_cache_key ||= "index_options_cache_key_#{Time.now.to_i / 1.day}"
  end

  def revenue_params
    params.require(:revenue).permit(:name, :amount, :date)
  end
end
