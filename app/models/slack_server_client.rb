# frozen_string_literal: true

class SlackServerClient
  class << self
    def users_list
      client.users_list.members.select { |user| !user.is_bot && user.id != 'USLACKBOT' }
    end

    def users_info(user_id)
      client.users_info(user: user_id)
    end

    private

    def client
      @client ||= Slack::Web::Client.new(token: ENV['SLACK_SERVER_TOKEN'])
    end
  end
end
