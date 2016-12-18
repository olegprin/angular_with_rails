# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
Product.create([{longitude: -77.0576414}, {latitude: 38.9340854}, { adress: 'Washington Hilton, Connecticut Avenue Northwest, Washington, DC, United States' }, { user_id: 1 }, { price: "5434".to_i }, { title: 'flat' }, { description: 'good flat' }])
Product.create([{longitude: -118.0465762}, {latitude: 34.0518446}, { adress: 'los angeles county fire department rush street south el monte ca united states' }, { user_id: 1 }, { price: "534".to_i }, { title: 'good house' }, { description: 'good house' }])

#Product.create([{ adress: 'Chicago' }, { price: 5434 }, { title: 'Copenhagen' }, { description: 'good house' }])
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#@config = YAML.load_file("#{Rails.root}/config/configurable.yml")