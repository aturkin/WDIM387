require 'sinatra'
require 'date'
require 'json/ext'

get '/date' do
	date()
end


def date()
	my_json = { :Date => Date.today }
	JSON.pretty_generate(my_json)
end 

