# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id           :bigint(8)        not null, primary key
#  uid          :string(255)      not null
#  real_name    :string(255)      not null
#  display_name :string(255)      not null
#  phone        :string(255)      not null
#  image_url    :string(255)      not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class User < ApplicationRecord
end
