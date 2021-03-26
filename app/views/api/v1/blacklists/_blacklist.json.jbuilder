json.extract! blacklist, :id, :user_id, :created_at, :updated_at
json.user blacklist.user, :id, :email, :first_name, :last_name
