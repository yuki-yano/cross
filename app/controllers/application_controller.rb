# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  private

  def authenticate
    authenticate_or_request_with_http_token do |token, _options|
      session[:token] == token
    end
  end
end
