# frozen_string_literal: true

class AuthController < ApplicationController
  def slack
    response = SlackUserClient.oauth(auth_params[:code])

    session[:token] = response[:access_token]
    session[:uid] = response[:user][:id]

    render json: response.to_json, status: :ok
  rescue Slack::Web::Api::Errors::SlackError => _e
    head :bad_request
  end

  def auth_params
    params.permit(:code)
  end
end
