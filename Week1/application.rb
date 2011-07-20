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

# root page
get '/' do
  erb :home, :locals => {}
end

get '/date' do
  date()
end

get '/dateTime' do
  dateTime()
end

def date()
	my_json = { :Date => Date.today }
	JSON.pretty_generate(my_json)
end 

def dateTime()
	my_json = { :DateTime => DateTime.now }
	JSON.pretty_generate(my_json)
end 
