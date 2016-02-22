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

ActiveRecord::Schema.define(version: 20160222103634) do

  create_table "parkings", force: :cascade do |t|
    t.string   "title"
    t.float    "price"
    t.string   "street_name"
    t.integer  "street_number"
    t.integer  "postal_code"
    t.string   "city"
    t.string   "country"
    t.decimal  "lat"
    t.decimal  "long"
    t.boolean  "available"
    t.text     "comments"
    t.float    "monday_start"
    t.float    "monday_end"
    t.float    "tuesday_start"
    t.float    "tuesday_end"
    t.float    "wednesday_start"
    t.float    "wednesday_end"
    t.float    "thursday_start"
    t.float    "thursday_end"
    t.float    "friday_start"
    t.float    "friday_end"
    t.float    "saturday_start"
    t.float    "saturday_end"
    t.float    "sunday_start"
    t.float    "sunday_end"
    t.integer  "user_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "parkings", ["user_id"], name: "index_parkings_on_user_id"

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
    t.boolean  "telefon_public"
    t.boolean  "email_public"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true

end
