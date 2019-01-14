# frozen_string_literal: true

class UpdateUsersBatch
  def self.exec
    SlackServerClient.users_list.each do |user_info|
      profile = user_info.profile
      user = User.find_or_initialize_by(uid: user_info.id)
      user.update!(
        real_name: profile.real_name,
        display_name: profile.display_name,
        phone: profile.phone,
        image_url: profile.image_192
      )
    end
  end
end
