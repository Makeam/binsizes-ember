json.data do
    json.array!(@binsizes) do |binsize|
        json.type 'binsize'
        json.id binsize.id
        json.attributes do
            json.extract! binsize, :weight, :avg
            json.url binsize_url(binsize, format: :json)
        end
        json.relationships do
            json.array!(binsize.packages) do |package|
                json.type 'package'
                json.id package.id
                json.attributes do
                    json.extract! package, :val, :unit, :percent
                end
            end
        end
    end
end

