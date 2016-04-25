json.meta do
    json.copyright 'mkmtc'
end
if @package.errors.any?
    json.data do
            json.type 'package'
            json.id @package.id
            json.attributes do
                json.extract! @package, :val, :unit, :percent
                json.url package_url(@package, format: :json)
            end
    end
    json.errors do
        json.array!(@package.errors.full_messages) do |error|
            json.description error
        end
    end
end