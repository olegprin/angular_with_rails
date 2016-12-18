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

ActiveRecord::Schema.define(version: 20161011173823) do

  create_table "answerfrommoderators", force: :cascade do |t|
    t.integer  "user_id"
    t.boolean  "send_message"
    t.string   "name"
    t.string   "content"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "avatars", force: :cascade do |t|
    t.string   "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "carts", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "configurables", force: :cascade do |t|
    t.string   "name"
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "configurables", ["name"], name: "index_configurables_on_name"

  create_table "identities", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "identities", ["user_id"], name: "index_identities_on_user_id"

  create_table "infos", force: :cascade do |t|
    t.string   "name"
    t.string   "city"
    t.integer  "user_id"
    t.string   "telephone"
    t.string   "data"
    t.string   "bio"
    t.integer  "avatar_id"
    t.string   "avatar_url",            default: "/default_avatar.png"
    t.boolean  "send_new_film",         default: false
    t.boolean  "send_comments_to_film", default: false
    t.boolean  "ban",                   default: false
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
  end

  add_index "infos", ["user_id"], name: "index_infos_on_user_id"

  create_table "line_items", force: :cascade do |t|
    t.integer  "product_id"
    t.integer  "cart_id"
    t.integer  "quantity",   default: 1
    t.integer  "price"
    t.integer  "order_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "line_items", ["cart_id"], name: "index_line_items_on_cart_id"
  add_index "line_items", ["product_id"], name: "index_line_items_on_product_id"

  create_table "messagestoadministrators", force: :cascade do |t|
    t.string   "name"
    t.integer  "user_id"
    t.integer  "telephone"
    t.string   "email"
    t.string   "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "orders", force: :cascade do |t|
    t.string   "name"
    t.text     "address"
    t.string   "email"
    t.string   "pay_type"
    t.integer  "total_price"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "products", force: :cascade do |t|
    t.string   "title"
    t.integer  "user_id"
    t.text     "description"
    t.integer  "avatar_id"
    t.string   "image"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "adress"
    t.boolean  "type_sell",                           default: false
    t.string   "avatar_url",                          default: "/default_avatar.png"
    t.integer  "category_id"
    t.decimal  "price",       precision: 8, scale: 2
    t.datetime "created_at",                                                          null: false
    t.datetime "updated_at",                                                          null: false
    t.string   "avatar",                              default: "/default_avatar.png"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",                    null: false
    t.string   "encrypted_password",     default: "",                    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.string   "role"
    t.boolean  "admin",                  default: false
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,                     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "name"
    t.integer  "avatar_id"
    t.string   "avatar_url",             default: "/default_avatar.png"
    t.boolean  "banned",                 default: false
    t.integer  "rating",                 default: 0
    t.integer  "votes"
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at",                                             null: false
    t.string   "provider"
    t.string   "uid"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
