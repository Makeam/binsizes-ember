class Package < ActiveRecord::Base

  validates :val, :unit, :bytes, :percent, :binsize_id, presence: true

  belongs_to :binsize

end
