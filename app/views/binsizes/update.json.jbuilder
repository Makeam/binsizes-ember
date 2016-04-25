json.meta do
  json.copyright 'mkmtc'
end
if @binsize.errors.any?
  json.data do
    json.array! @binsizes do |binsize|
      json.type 'binsize'
      json.id binsize.id
      json.attributes do
        json.extract! binsize, :weight, :avg
        json.url binsize_url(binsize, format: :json)
      end
    end
    #json.relationships do
    #  json.packages do
    #    json.data do
    #      json.array!(@binsize.packages) do |package|
    #        json.type 'package'
    #        json.id package.id
    #
    #      end
    #    end
    #  end
    #end
  end
  #json.included do
  #  json.array!(@binsize.packages) do |package|
  #    json.type 'package'
  #    json.id package.id
  #    json.attributes do
  #      json.extract! package, :val, :unit, :percent
  #    end
  #  end
  #end
  json.errors do
    json.array!(@binsize.errors.full_messages) do |error|
      json.description error
    end
  end
end