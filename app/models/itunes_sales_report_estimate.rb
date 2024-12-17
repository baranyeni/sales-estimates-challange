class ItunesSalesReportEstimate
  include Mongoid::Document
  include TimeHelpers

  store_in collection: 'itunes_sales_report_estimate'

  field :d,   type: Time,    as: :date
  field :cc,  type: String,  as: :country
  field :aid, type: Integer, as: :app_id
  field :ir,  type: Integer, as: :iphone_revenue

  validates :app_id, presence: true
  validates :country, presence: true
  validates :date, presence: true


  def self.get_revenue_by_date(app_id, start_date, end_date)
    ItunesSalesReportEstimate
      .collection
      .aggregate(
        [{
           "$match": {
             "aid": app_id.to_i,
             "d": { "$gte": utc_timezone(start_date), "$lte": utc_timezone(end_date) },
           }
         },
         { "$sort": { "d": 1 } }
        ])
  end

  def self.get_time_series(app_id, start_date, end_date)
    get_revenue_by_date(app_id, start_date, end_date)
      .map {|r| r['ir']}
  end

  def self.app_ids
    self.distinct(:app_id)
  end
end
