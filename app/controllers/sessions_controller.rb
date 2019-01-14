# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    response = SlackClient.identity(params[:token])
    uid = response['user']['id']

    session[:uid] = uid
  rescue Slack::Web::Api::Errors::SlackError => _e
    head :bad_request
  end

  def destroy
    reset_session
    redirect_to root_path
  end

  def test
    response = SlackClient.identity(params[:token])
    render json: response.to_json, status: :ok
  rescue Slack::Web::Api::Errors::SlackError => _e
    head :bad_request
  end
end
