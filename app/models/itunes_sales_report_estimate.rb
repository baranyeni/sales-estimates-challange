class ItunesSalesReportEstimate
  include Mongoid::Document
  store_in collection: 'itunes_sales_report_estimate'

  field :d,   type: Time,    as: :date
  field :cc,  type: String,  as: :country
  field :aid, type: Integer, as: :app_id
  field :ir,  type: Integer, as: :iphone_revenue

  validates :app_id, presence: true
  validates :country, presence: true
  validates :date, presence: true

  def self.app_ids
    self.distinct(:app_id)
  end
end
