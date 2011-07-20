require 'sinatra'
require 'date'
require 'json/ext'
get '/time' do

	my_json = { :DateTime => DateTime.now}
	JSON.pretty_generate(my_json)
	
	#puts "hello"
	#Date.today.to_s


end
