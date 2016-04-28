class Binsize < ActiveRecord::Base

  default_scope {order(id: :asc)}

  has_many :packages, dependent: :destroy
end
