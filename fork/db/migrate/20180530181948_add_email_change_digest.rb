class AddEmailChangeDigest < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :email, :string
    add_column :users, :password_digest, :string
  end

   def change
    remove_column :users, :password
  end

end
