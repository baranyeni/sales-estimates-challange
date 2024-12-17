module TimeHelpers
  extend ActiveSupport::Concern

  class_methods do
    def utc_timezone(time)
      Time.utc(time.year, time.month, time.day, time.hour, time.min, time.sec)
    end
  end
end