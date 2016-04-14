json.array!(@binsizes) do |binsize|
  json.extract! binsize, :id, :weight, :const, :packages, :avg
  json.url binsize_url(binsize, format: :json)
end
