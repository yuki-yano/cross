# frozen_string_literal: true

class AuthController < ApplicationController
  class OtherTeamError < StandardError; end

  def slack
    response = SlackUserClient.oauth(auth_params[:code])
    user_id, token, team_id = parse_response(response).values_at(:user_id, :token, :team_id)

    raise OtherTeamError unless target_team?(team_id)

    save_session(token, user_id)
    render json: response.to_json, status: :ok
  rescue Slack::Web::Api::Errors::SlackError, OtherTeamError
    head :bad_request
  end

  private

  def auth_params
    params.permit(:code)
  end

  def parse_response(response)
    {
      user_id: response[:user][:id],
      token: response[:access_token],
      team_id: response[:team][:id]
    }
  end

  def target_team?(team_id)
    team_id == ENV['SLACK_TEAM_ID']
  end

  def save_session(access_token, uid)
    session[:token] = access_token
    session[:uid] = uid
  end
end
