# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160228215714) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "parkings", force: :cascade do |t|
    t.string   "title"
    t.float    "price"
    t.string   "street_name"
    t.integer  "street_number"
    t.string   "postal_code"
    t.string   "city"
    t.string   "country"
    t.decimal  "lat"
    t.decimal  "long"
    t.boolean  "available"
    t.text     "comments"
    t.integer  "user_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "parkings", ["user_id"], name: "index_parkings_on_user_id", using: :btree

  create_table "schedules", force: :cascade do |t|
    t.string   "day"
    t.integer  "start_hour"
    t.integer  "end_hour"
    t.integer  "parking_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "start_minutes"
    t.integer  "end_minutes"
  end

  add_index "schedules", ["parking_id"], name: "index_schedules_on_parking_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",               default: "", null: false
    t.string   "encrypted_password",  default: "", null: false
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",       default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.string   "name"
    t.integer  "telefon"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

  add_foreign_key "parkings", "users"
  add_foreign_key "schedules", "parkings"
end
