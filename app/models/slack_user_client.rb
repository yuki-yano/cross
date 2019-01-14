# frozen_string_literal: true

class SlackUserClient
  class << self
    def oauth(code)
      client.oauth_access(
        client_id: ENV['SLACK_USER_CLIENT_ID'],
        client_secret: ENV['SLACK_USER_CLIENT_SECRET'],
        code: code
      )
    end

    def identity(token)
      client(token).users_identity
    end

    private

    def client(token = nil)
      Slack::Web::Client.new(token: token)
    end
  end
end
