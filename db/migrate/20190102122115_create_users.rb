class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :uid, null: false
      t.string :real_name, null: false
      t.string :display_name, null: false
      t.string :phone, null: false
      t.string :image_url, null: false

      t.timestamps
    end
  end
end
