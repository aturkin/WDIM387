require 'rubygems'
require 'sinatra'
require 'date'
require 'json/ext'

set :session_secret, ENV["SESSION_KEY"] || 'too secret'

enable :sessions

error do
  e = request.env['sinatra.error']
  Kernel.puts e.backtrace.join("\n")
  'Application error'
end

# root page, Home
get '/' do
  erb :home, :locals => {}
end

#Call sends server Date to client
# @param [Request] request the request object TEST
get '/date' do
  date()
end

#Call sends server dateTime to client
# @param [Request] request the request object TEST
get '/dateTime' do
  dateTime()
end

#creates Json Date
def date()
	my_json = { :Date => Date.today }
	JSON.pretty_generate(my_json)
end 

#creates Json Datetime
def dateTime()
	my_json = { :DateTime => DateTime.now }
	JSON.pretty_generate(my_json)
end 
