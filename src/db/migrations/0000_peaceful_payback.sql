-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SEQUENCE "public"."transaction_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 10000000 CACHE 1;--> statement-breakpoint
CREATE TABLE "auth_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(128),
	"last_name" varchar(128),
	"email" varchar(512),
	"username" varchar(128),
	"password" varchar(512),
	"registration_key" varchar(512),
	"reset_password_key" varchar(512),
	"registration_id" varchar(512),
	"auth_group" integer,
	"role" varchar(512),
	"image" varchar(512),
	"phone" varchar(512),
	"login_next" varchar(512),
	"display_order" integer,
	"motp_secret" varchar(512),
	"motp_pin" varchar(128),
	"created_by" integer,
	"created_on" timestamp,
	"test_project" varchar(128)
);
--> statement-breakpoint
CREATE TABLE "auth_cas" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"created_on" timestamp,
	"service" varchar(512),
	"ticket" varchar(512),
	"renew" char(1)
);
--> statement-breakpoint
CREATE TABLE "auth_event" (
	"id" serial PRIMARY KEY NOT NULL,
	"time_stamp" timestamp,
	"client_ip" varchar(512),
	"user_id" integer,
	"origin" varchar(512),
	"description" text
);
--> statement-breakpoint
CREATE TABLE "file_upload" (
	"id" serial PRIMARY KEY NOT NULL,
	"tablename" text,
	"pkey" text,
	"table_id" text,
	"name" text,
	"filetype" text,
	"extension" text,
	"filesize" double precision,
	"filecomment" text,
	"textcontent" text,
	"publish" text DEFAULT 'True',
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"filename" text,
	"log_order_code" varchar
);
--> statement-breakpoint
CREATE TABLE "loan" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_customer" text,
	"phone_customer" text,
	"loan_package" integer,
	"loan_amount" text,
	"disbursement_date" text,
	"transaction_id" varchar(512),
	"status" text,
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp,
	"payment_method" varchar(512),
	"loan_term" text,
	"mortgage" integer,
	"note" text,
	"updated_on" timestamp,
	"customer" integer,
	"rose" text,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "loan_mortgage" (
	"id" serial PRIMARY KEY NOT NULL,
	"xtype" text,
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "loan_tracking" (
	"id" serial PRIMARY KEY NOT NULL,
	"loan" integer,
	"title" text,
	"note" text,
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "tmessage_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(512),
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "payment_methods" (
	"id" serial PRIMARY KEY NOT NULL,
	"method_name" varchar(512),
	"method_code" varchar(512),
	"method_type" varchar(512),
	"is_deposit_enabled" char(1),
	"is_withdrawal_enabled" char(1),
	"min_amount" numeric(15, 2),
	"max_amount" numeric(15, 2),
	"daily_limit" numeric(15, 2),
	"monthly_limit" numeric(15, 2),
	"deposit_fee_type" varchar(512),
	"deposit_fee_amount" numeric(15, 2),
	"deposit_fee_percentage" numeric(5, 2),
	"withdrawal_fee_type" varchar(512),
	"withdrawal_fee_amount" numeric(15, 2),
	"withdrawal_fee_percentage" numeric(5, 2),
	"icon" varchar(512),
	"logo" varchar(512),
	"description" text,
	"instructions" text,
	"display_order" integer,
	"gateway_config" text,
	"processing_time" varchar(512),
	"is_active" char(1),
	"is_maintenance" char(1),
	"maintenance_message" text,
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp,
	CONSTRAINT "payment_methods_method_code_key" UNIQUE("method_code")
);
--> statement-breakpoint
CREATE TABLE "procedures" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"label" varchar(512),
	"description" varchar(512),
	"avatar" varchar(512),
	"user_group" integer,
	"auth_group" text,
	"folder_parent" integer,
	"folder" text,
	"ptype" varchar(512),
	"controller" varchar(512),
	"tablename" varchar(512),
	"year_field" varchar(512),
	"is_create" char(1),
	"select_year" char(1),
	"setting" text,
	"display_order" integer,
	CONSTRAINT "procedures_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "transaction_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(512) NOT NULL,
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "real_estate_agent_assignment" (
	"id" serial PRIMARY KEY NOT NULL,
	"real_estate_id" integer,
	"agent_id" integer,
	"commission_rate" numeric(5, 2),
	"commission_amount" bigint,
	"is_primary_agent" char(1),
	"is_exclusive" char(1),
	"assignment_type" varchar(512),
	"territory" varchar(512),
	"notes" text,
	"start_date" date,
	"end_date" date,
	"is_active" char(1),
	"total_transactions" integer,
	"successful_transactions" integer,
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "real_estate_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"status_name" varchar(512) NOT NULL,
	"status_code" varchar(512),
	"description" text,
	"color_code" varchar(512),
	"icon" varchar(512),
	"display_order" integer,
	"show_in_resa_bds" char(1),
	"show_in_my_posts" char(1),
	"show_in_assigned_bds" char(1),
	"allow_view" char(1),
	"allow_edit" char(1),
	"allow_delete" char(1),
	"allow_favorite" char(1),
	"allow_hold" char(1),
	"allow_deposit" char(1),
	"allow_chat" char(1),
	"allow_schedule_viewing" char(1),
	"allow_upload_documents" char(1),
	"allow_pause" char(1),
	"allow_reopen" char(1),
	"allow_confirm_deposit" char(1),
	"allow_cancel" char(1),
	"allow_refund" char(1),
	"allow_remove" char(1),
	"allow_supplement_docs" char(1),
	"permissions_json" text,
	"is_active" char(1),
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp,
	"allow_create_transaction" char(1),
	CONSTRAINT "real_estate_status_status_code_key" UNIQUE("status_code")
);
--> statement-breakpoint
CREATE TABLE "transaction_notification" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_id" integer,
	"recipient_type" varchar(512),
	"recipient_id" integer,
	"notification_type" varchar(512),
	"title" varchar(512),
	"tmessage" text,
	"priority" integer,
	"send_email" char(1),
	"send_sms" char(1),
	"send_push" char(1),
	"send_in_app" char(1),
	"email_sent" char(1),
	"sms_sent" char(1),
	"push_sent" char(1),
	"email_sent_at" timestamp,
	"sms_sent_at" timestamp,
	"push_sent_at" timestamp,
	"is_read" char(1),
	"read_at" timestamp,
	"scheduled_at" timestamp,
	"sent_at" timestamp,
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "withdraw" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_bank" integer,
	"amount" varchar(512),
	"description" text,
	"table_name" text,
	"table_id" text,
	"implementer" varchar(512),
	"transaction_id" integer,
	"status" integer,
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "reconciliation_batch" (
	"id" serial PRIMARY KEY NOT NULL,
	"batch_code" varchar(512),
	"batch_name" varchar(512),
	"period" varchar(512),
	"agent_id" integer,
	"total_transactions" integer,
	"total_amount" bigint,
	"total_commission_seller" bigint,
	"total_commission_buyer" bigint,
	"total_commission_project" bigint,
	"batch_status" varchar(512),
	"submitted_at" timestamp,
	"processed_at" timestamp,
	"completed_at" timestamp,
	"processed_by" integer,
	"notes" text,
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp,
	CONSTRAINT "reconciliation_batch_batch_code_key" UNIQUE("batch_code")
);
--> statement-breakpoint
CREATE TABLE "tmessage_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"tmessage_id" integer,
	"tmessage_type" integer,
	"equipment" text,
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_activity_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"auth_user" integer,
	"system_name" integer,
	"session_number" integer,
	"last_time" char(1),
	"app" varchar(512),
	"created_on" timestamp,
	"user_action" text,
	"table_name" text,
	"table_id" integer
);
--> statement-breakpoint
CREATE TABLE "verify_agent" (
	"id" serial PRIMARY KEY NOT NULL,
	"salesman" integer,
	"id_card" varchar(50),
	"name" varchar(255),
	"birthday" date,
	"sex" smallint,
	"address" text,
	"id_day" date,
	"id_by" varchar(255),
	"legal_document_type" integer,
	"citizen_id_front" varchar(255),
	"citizen_id_back" varchar(255),
	"license_front" varchar(255),
	"license_back" varchar(255),
	"created_by" integer DEFAULT 1 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"step" smallint,
	"cmnd_number" varchar,
	CONSTRAINT "verify_agent_legal_document_type_check" CHECK (legal_document_type = ANY (ARRAY[1, 2])),
	CONSTRAINT "verify_agent_sex_check" CHECK (sex = ANY (ARRAY[0, 1, 2]))
);
--> statement-breakpoint
CREATE TABLE "customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(512),
	"phone" varchar(512),
	"email" varchar(512),
	"birthday" date,
	"sex" varchar(512),
	"customer_type" varchar(512),
	"city" varchar(512),
	"district" varchar(512),
	"ward" varchar(512),
	"city_name" varchar(512),
	"district_name" varchar(512),
	"ward_name" varchar(512),
	"address" varchar(512),
	"latlng" varchar(512),
	"salesman" integer,
	"saved_contacts" char(1),
	"aactive" char(1),
	"start_date" date,
	"created_on" timestamp,
	"created_by" integer,
	"xtype" varchar(512),
	"contact_facebook" varchar
);
--> statement-breakpoint
CREATE TABLE "loan_package" (
	"id" serial PRIMARY KEY NOT NULL,
	"bank" integer,
	"interest_rate" text,
	"term_months" text,
	"max_term_months" text,
	"grace_period" text,
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp,
	"interest_rate_float" text,
	"rose" text,
	"name" text,
	"status" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "consultation" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" varchar(100),
	"auth_user_id" bigint,
	"user_support" bigint,
	"property_id" bigint,
	"budget_range" numeric(15, 2),
	"aactive" boolean DEFAULT true,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"full_name" varchar(100),
	"phone_number" varchar(20),
	"customer_id" integer,
	"property_type" text,
	"transaction_type" text,
	"interested_cities" text,
	"interested_districts" text,
	"interested_wards" text,
	"interested_projects" text,
	"budget_min" bigint,
	"budget_max" bigint,
	"area_min" double precision,
	"area_max" double precision,
	"bedrooms_min" integer,
	"bedrooms_max" integer,
	"bathrooms_min" integer,
	"floors_min" integer,
	"floors_max" integer,
	"preferred_directions" text,
	"legal_requirements" text,
	"furniture_requirements" text,
	"note" text,
	"special_requirements" text,
	"enable_push_notification" char(1),
	"enable_sms_notification" char(1),
	"max_notifications_per_day" integer,
	"notification_schedule" text,
	"last_matched_on" timestamp,
	"total_suggestions_sent" integer,
	"total_suggestions_today" integer,
	"matching_criteria" text,
	"priority_score" integer,
	"demand_status" varchar(20),
	"status_changed_on" timestamp,
	"status_changed_by" integer,
	"status_reason" text,
	"view_count" integer,
	"contact_count" integer,
	"last_contacted_on" timestamp,
	"consultation_type" varchar(20),
	"created_by" integer,
	"updated_on" timestamp,
	"updated_by" integer,
	"status" varchar(5),
	"bedrooms" text,
	"consultation_code" varchar,
	"interested_locations" text,
	"post_office_id" integer,
	"tag_id" text
);
--> statement-breakpoint
CREATE TABLE "folder" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent" integer,
	"name" varchar(255),
	"label" varchar(512),
	"publish" char(1),
	"description" text,
	"avatar" char(512),
	"setting" text,
	"layout" char(512),
	"url_link" char(512),
	"display_order" integer,
	CONSTRAINT "folder_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "archives" (
	"id" serial PRIMARY KEY NOT NULL,
	"folder" integer,
	"name" varchar(512),
	"description" text,
	"daystart" date,
	"dayend" date,
	"user_signed" varchar(512),
	"user_office" varchar(512),
	"org_publish" varchar(512),
	"publish_on" timestamp,
	"expired_on" timestamp,
	"created_on" timestamp,
	"created_by" integer,
	"display_order" integer,
	"field_type" integer,
	"htmlcontent" text
);
--> statement-breakpoint
CREATE TABLE "auth_membership" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"group_id" integer
);
--> statement-breakpoint
CREATE TABLE "auth_permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" integer,
	"name" varchar(512),
	"table_name" varchar(512),
	"record_id" integer
);
--> statement-breakpoint
CREATE TABLE "dbank" (
	"id" serial PRIMARY KEY NOT NULL,
	"bank_name" varchar NOT NULL,
	"bank_code" varchar NOT NULL,
	"bank_logo" varchar,
	"is_active" boolean DEFAULT true,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "dbank_transactions_historys" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_id" integer,
	"transaction_type" varchar(512),
	"transaction_amount" bigint,
	"transaction_date" timestamp,
	"transaction_status" varchar(512),
	"transaction_description" text,
	"transaction_reference" varchar(512),
	"transaction_notes" text,
	"transaction_files" varchar(512),
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "sms_bank" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"sms" text,
	"table_name" varchar(100),
	"table_id" integer,
	"num_money" bigint,
	"note_internal" text,
	"auto_insert" boolean DEFAULT false,
	"auto_catch" boolean DEFAULT false,
	"pay_confirm" boolean DEFAULT false,
	"accountant_check" boolean DEFAULT false,
	"valid_type" integer,
	"status" boolean DEFAULT false,
	"created_on" timestamp DEFAULT now(),
	"hidden_sms" boolean,
	"is_active" boolean,
	"post_office_id" integer
);
--> statement-breakpoint
CREATE TABLE "auth_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent" integer,
	"role" varchar(512),
	"email" varchar(512),
	"description" text,
	"display_order" integer,
	"atype" varchar(512),
	"created_by" integer,
	"created_on" timestamp,
	"aactive" boolean DEFAULT true,
	"post_office" integer
);
--> statement-breakpoint
CREATE TABLE "dcontent" (
	"id" serial PRIMARY KEY NOT NULL,
	"folder" integer,
	"dtable" varchar,
	"table_id" integer,
	"link" varchar,
	"name" varchar,
	"avatar" varchar,
	"description" text,
	"publish_on" timestamp,
	"expired_on" timestamp,
	"meta_title" varchar,
	"meta_description" varchar,
	"meta_keywords" varchar,
	"textcontent" text,
	"languague" varchar,
	"publisher" varchar,
	"creator" varchar,
	"created_on" timestamp,
	"modified_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "sms_bank_session" (
	"id" serial PRIMARY KEY NOT NULL,
	"pay_session" bigint,
	"sms_bank" text,
	"table_name" text,
	"table_id" integer,
	"note" text,
	"total_money" bigint,
	"validation_type" integer,
	"accountant_check" boolean DEFAULT false,
	"created_on" timestamp DEFAULT now(),
	"updated_on" timestamp DEFAULT now(),
	CONSTRAINT "sms_bank_session_validation_type_check" CHECK (validation_type = ANY (ARRAY[1, 2]))
);
--> statement-breakpoint
CREATE TABLE "favorite_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"auth_user" integer,
	"images" varchar(512),
	"description" varchar(512),
	"aactive" char(1),
	"default_group" char(1),
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "commission_policy" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"table_name" text,
	"table_id" text,
	"zone_of_project" text,
	"city_id" text,
	"district_id" text,
	"ward_id" text,
	"valid_from" date,
	"valid_to" date,
	"aactive" boolean DEFAULT true,
	"commission_owner_percent" numeric(5, 2) DEFAULT '0.0',
	"commission_owner_fixed" bigint DEFAULT 0,
	"commission_customer_percent" numeric(5, 2) DEFAULT '0.0',
	"commission_customer_fixed" bigint DEFAULT 0,
	"bonus_owner_percent" numeric(5, 2) DEFAULT '0.0',
	"bonus_owner_fixed" bigint DEFAULT 0,
	"bonus_customer_percent" numeric(5, 2) DEFAULT '0.0',
	"bonus_customer_fixed" bigint DEFAULT 0,
	"rounding_step" bigint DEFAULT 100000,
	"rounding_mode" smallint DEFAULT 1,
	"deposit_type" text DEFAULT '1',
	"deposit_mode" smallint DEFAULT 1,
	"deposit_amount_fixed" bigint DEFAULT 0,
	"deposit_amount_min" bigint DEFAULT 0,
	"deposit_amount_max" bigint DEFAULT 0,
	"deposit_percent_fixed" numeric(5, 2) DEFAULT '0.0',
	"deposit_percent_min" numeric(5, 2) DEFAULT '0.0',
	"deposit_percent_max" numeric(5, 2) DEFAULT '0.0',
	"deposit_editable" boolean DEFAULT false,
	"notes" text,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT now(),
	"updated_on" timestamp DEFAULT now(),
	"transaction_type" smallint DEFAULT 1,
	"commission_owner_mode" smallint DEFAULT 1,
	"commission_owner_value" double precision,
	"commission_customer_mode" smallint DEFAULT 1,
	"commission_customer_value" double precision,
	"bonus_owner_mode" smallint DEFAULT 1,
	"bonus_owner_value" double precision,
	"bonus_customer_mode" smallint DEFAULT 1,
	"bonus_customer_value" double precision
);
--> statement-breakpoint
CREATE TABLE "work_member" (
	"id" serial PRIMARY KEY NOT NULL,
	"work_id" integer NOT NULL,
	"salesman_id" integer NOT NULL,
	"role" varchar(512),
	"status" varchar(512),
	"assigned_at" timestamp,
	"confirmed_at" timestamp,
	"started_at" timestamp,
	"note" text,
	"permission_level" varchar(512),
	"notification_enabled" char(1),
	"is_active" char(1),
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "real_estate_sale_detail" (
	"id" bigserial NOT NULL,
	"real_estate_sale" integer NOT NULL,
	"real_estate_id" integer NOT NULL,
	"salesman_id" integer NOT NULL,
	"deposit_amount" bigint DEFAULT 0,
	"status" integer DEFAULT 1 NOT NULL,
	"created_by" integer,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"deposit_type" integer,
	"customer_id" integer,
	"notes" text,
	"real_estate_transaction_id" integer,
	"real_estate_work_id" integer
);
--> statement-breakpoint
CREATE TABLE "real_estate_sale" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"project_id" bigint NOT NULL,
	"visibility_level" integer DEFAULT 1 NOT NULL,
	"real_estate_ids" text,
	"start_at" timestamp NOT NULL,
	"end_at" timestamp,
	"lock_wait_expected" integer DEFAULT 900 NOT NULL,
	"lock_wait_actual" integer DEFAULT 1020 NOT NULL,
	"status" integer DEFAULT 1 NOT NULL,
	"notes" text,
	"required_infor_verify" boolean DEFAULT false NOT NULL,
	"registration_type" integer DEFAULT 1 NOT NULL,
	"bank" bigint,
	"bank_acc_name" text,
	"bank_acc_number" text,
	"bank_branch" text,
	"created_by" bigint,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"updated_on" timestamp DEFAULT now() NOT NULL,
	"zone_of_project" text,
	"content_transfer" text,
	"role" integer DEFAULT 1,
	"extension_at" timestamp,
	CONSTRAINT "chk_sale_time_range" CHECK (end_at >= start_at),
	CONSTRAINT "real_estate_sale_required_sales_registration_check" CHECK (registration_type = ANY (ARRAY[1, 2, 3])),
	CONSTRAINT "real_estate_sale_status_check" CHECK (status = ANY (ARRAY[1, 2, 3, 4, 5, 9])),
	CONSTRAINT "real_estate_sale_visibility_level_check" CHECK (visibility_level = ANY (ARRAY[1, 2, 3]))
);
--> statement-breakpoint
CREATE TABLE "real_estate_sale_register" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"project_id" bigint NOT NULL,
	"real_estate_sale" bigint NOT NULL,
	"visibility_level" integer DEFAULT 2 NOT NULL,
	"salesman_ids" text NOT NULL,
	"status" integer DEFAULT 1 NOT NULL,
	"created_by" bigint,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"approval_by" bigint,
	"approval_on" timestamp,
	CONSTRAINT "real_estate_sale_register_status_check" CHECK (status = ANY (ARRAY[1, 2, 9])),
	CONSTRAINT "real_estate_sale_register_visibility_level_check" CHECK (visibility_level = ANY (ARRAY[2, 3]))
);
--> statement-breakpoint
CREATE TABLE "jackpot_salesman_criteria" (
	"id" serial PRIMARY KEY NOT NULL,
	"jackpot_config_id" integer NOT NULL,
	"salesman_id" integer NOT NULL,
	"real_estate_sale_id" integer,
	"notes" text,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"is_active" boolean
);
--> statement-breakpoint
CREATE TABLE "jackpot_salesman_criteria_value" (
	"id" serial PRIMARY KEY NOT NULL,
	"jackpot_salesman_criteria_id" integer NOT NULL,
	"jackpot_ranking_criteria_id" integer NOT NULL,
	"vvalue" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT now(),
	"updated_on" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "jackpot_reward_distribution" (
	"id" serial PRIMARY KEY NOT NULL,
	"jackpot_config_id" integer NOT NULL,
	"salesman_id" integer NOT NULL,
	"ranking_position" integer DEFAULT 0,
	"total_score" numeric(10, 2) DEFAULT '0.0',
	"reward_amount" numeric(18, 2) DEFAULT '0.0' NOT NULL,
	"reward_percentage" numeric(5, 2) DEFAULT '0.0',
	"calculation_period_start" date,
	"calculation_period_end" date,
	"calculated_on" timestamp,
	"status" integer DEFAULT 0,
	"paid_on" timestamp,
	"paid_by" integer,
	"notes" text,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT now(),
	"updated_on" timestamp DEFAULT now(),
	CONSTRAINT "jackpot_reward_distribution_status_check" CHECK (status = ANY (ARRAY[0, 1, 2, 9]))
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"n_id" varchar,
	"n_parentid" varchar,
	"n_name" varchar,
	"n_latlng" varchar,
	"n_normalizedname" varchar,
	"n_address" varchar,
	"n_type" varchar,
	"n_level" varchar,
	"n_country" varchar,
	"n_createddate" varchar,
	"n_modifieddate" varchar,
	"n_status" varchar,
	"is_partition" varchar,
	"city_id" varchar,
	"district_id" varchar,
	"ward_id" varchar,
	"city_name" varchar,
	"district_name" varchar,
	"ward_name" varchar,
	"total_rate" numeric(5, 2) DEFAULT '0.0',
	"total_amount" bigint DEFAULT 0,
	"rate_seller" numeric(5, 2) DEFAULT '0.0',
	"amount_seller" bigint DEFAULT 0,
	"rate_buyer" numeric(5, 2) DEFAULT '0.0',
	"amount_buyer" bigint DEFAULT 0,
	"rate_project" numeric(5, 2) DEFAULT '0.0',
	"amount_project" bigint DEFAULT 0,
	"aactive" boolean DEFAULT true,
	"update_on" timestamp,
	"created_on" timestamp,
	"created_by" integer,
	"decode_address" varchar,
	"display_order" integer DEFAULT 100,
	"n_slug" varchar,
	"search_count" bigint DEFAULT 8386,
	"mergedintoid" varchar,
	"n_slug_v1" varchar,
	CONSTRAINT "locations_is_partition_check" CHECK ((is_partition)::text = ANY (ARRAY[('v1'::character varying)::text, ('v2'::character varying)::text, ('v3'::character varying)::text, ('v3.5'::character varying)::text, ('v4'::character varying)::text, ('v5'::character varying)::text, ('v6'::character varying)::text, ('v7'::character varying)::text, ('v8'::character varying)::text]))
);
--> statement-breakpoint
CREATE TABLE "log_error" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_contain" text,
	"funtion" text,
	"type_error" text,
	"content_error" text,
	"line_error" integer,
	"source_error" text,
	"auth_user" integer,
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "media_upload" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" varchar(36) NOT NULL,
	"s3_url" varchar(1024),
	"s3_key" varchar(512),
	"file_name" varchar(255),
	"file_ext" varchar(50),
	"mime_type" varchar(100),
	"file_size" integer,
	"action_type" varchar(50) DEFAULT 'real_estate_verify',
	"real_estate_id" integer,
	"verified_by" integer,
	"verified_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"notes" text,
	"is_active" boolean DEFAULT true,
	CONSTRAINT "media_upload_uuid_key" UNIQUE("uuid"),
	CONSTRAINT "media_upload_action_type_check" CHECK ((action_type)::text = ANY (ARRAY[('real_estate_verify'::character varying)::text, ('user_verify'::character varying)::text, ('other'::character varying)::text]))
);
--> statement-breakpoint
CREATE TABLE "log_tracking" (
	"id" serial PRIMARY KEY NOT NULL,
	"tablename" text,
	"table_id" integer,
	"time_stamp" timestamp,
	"list_table_id" text,
	"client_ip" text,
	"auth_user" integer,
	"status" integer,
	"description" text,
	"aactive" char(1),
	"is_security" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "contract_verification_otp" (
	"id" serial PRIMARY KEY NOT NULL,
	"contract_id" integer NOT NULL,
	"phone" varchar(50) NOT NULL,
	"purpose" integer DEFAULT 1 NOT NULL,
	"otp_hash" varchar(255) NOT NULL,
	"salt" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"attempts" integer DEFAULT 0,
	"max_attempts" integer DEFAULT 5,
	"status" integer DEFAULT 1 NOT NULL,
	"channel" varchar(50) DEFAULT 'zalo',
	"sent_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"verified_at" timestamp,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "chk_contract_verification_otp_purpose" CHECK (purpose = ANY (ARRAY[1, 2, 3, 4, 5])),
	CONSTRAINT "chk_contract_verification_otp_status" CHECK (status = ANY (ARRAY[1, 2, 3, 4]))
);
--> statement-breakpoint
CREATE TABLE "office_permission_set" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"name_code" varchar(20),
	"description" text,
	"is_default" boolean DEFAULT false,
	"based_on_set_id" integer,
	"aactive" boolean DEFAULT true,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer
);
--> statement-breakpoint
CREATE TABLE "contract" (
	"id" bigserial NOT NULL,
	"info_office" integer,
	"verify_agent" integer,
	"real_estate_salesman" integer,
	"contract_type" integer DEFAULT 1 NOT NULL,
	"signing_method" integer DEFAULT 1 NOT NULL,
	"contract_no" integer,
	"contract_year" integer,
	"signed_at" timestamp,
	"signature_image" text,
	"status" integer DEFAULT 1,
	"created_by" integer,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"consultation_id" integer,
	"transaction_id" integer,
	"contract_code" varchar(255),
	"post_office_id" integer,
	"assigned_to" integer
);
--> statement-breakpoint
CREATE TABLE "info_office" (
	"id" bigserial NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"business_code" varchar(255),
	"company_address" text,
	"bank" integer,
	"bank_name" varchar(255),
	"bank_account_number" varchar(255),
	"bank_branch" varchar(255),
	"company_representative" varchar(255),
	"position_representative" varchar(255),
	"office" varchar(255),
	"signature_image" text,
	"created_by" integer,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"office_code" varchar,
	"post_office_id" integer,
	"authorization_number" varchar
);
--> statement-breakpoint
CREATE TABLE "office_territory" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_office_id" integer NOT NULL,
	"territory_type" integer DEFAULT 1,
	"city" varchar(20),
	"district" varchar(20),
	"ward" varchar(20),
	"coordinates" text,
	"priority" integer DEFAULT 1,
	"start_date" date,
	"end_date" date,
	"aactive" boolean DEFAULT true,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"ward_name" varchar(100),
	"city_name" varchar(100),
	CONSTRAINT "office_territory_territory_type_check" CHECK (territory_type = ANY (ARRAY[1, 2, 3, 4]))
);
--> statement-breakpoint
CREATE TABLE "real_estate" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"post" text,
	"price" bigint,
	"min_price" bigint,
	"max_price" bigint,
	"price_description" varchar,
	"bedrooms" integer,
	"bathrooms" integer,
	"floors" integer,
	"property_type" varchar,
	"property_type_id" integer,
	"house_direction" varchar,
	"year_built" varchar,
	"transaction_type" integer DEFAULT 1,
	"city" varchar,
	"city_id" varchar,
	"district" varchar,
	"district_id" varchar,
	"ward" varchar,
	"ward_id" varchar,
	"street_name" varchar,
	"street_address" varchar,
	"google_maps_url" varchar,
	"latlng" varchar,
	"ownership_status" varchar,
	"contact_name" varchar,
	"contact_phone" varchar,
	"contact_email" varchar,
	"images" text,
	"is_featured" boolean DEFAULT false,
	"is_verified" boolean DEFAULT false,
	"view_count" integer DEFAULT 0,
	"aactive" boolean DEFAULT true,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"backup_phone" varchar(512),
	"video_url" varchar(512),
	"source_post" varchar(512),
	"slug" varchar(512),
	"description" text,
	"main_image" text,
	"data_json" text,
	"price_history" text,
	"balcony_direction" varchar(512),
	"rate_seller" numeric(5, 2),
	"amount_seller" bigint,
	"rate_buyer" numeric(5, 2),
	"amount_buyer" bigint,
	"rate_project" numeric(5, 2),
	"amount_project" bigint,
	"owner_id" integer,
	"customer_id" integer,
	"legal_document_url" text,
	"created_time" timestamp,
	"return_price" bigint,
	"total_rate" numeric(5, 2),
	"total_amount" bigint,
	"project" varchar(512),
	"status_id" integer,
	"status" varchar(512),
	"zone_of_project" varchar(512),
	"management_fee" integer,
	"num_of_floors" integer,
	"frontage" integer,
	"building_density" varchar(512),
	"land_direction" varchar(512),
	"ceiling_height" integer,
	"door_size" integer,
	"house_number" varchar(512),
	"hammlet" varchar(512),
	"alley" varchar(512),
	"price_per_meter" integer,
	"furniture" varchar(512),
	"road_width" integer,
	"frontage_width" integer,
	"bonus_amt" bigint,
	"html_content" text,
	"contact_facebook" varchar(512),
	"area" double precision,
	"legal_document_type" text,
	"real_estate_code" varchar(512),
	"apartment_code" varchar(512),
	"street_slug" varchar(512),
	"street" integer,
	"is_checked" boolean DEFAULT false,
	"checked_status" integer DEFAULT 0,
	"vat_amount" bigint,
	"maintenance_fund" bigint,
	"price_incl_vat_maintenance" bigint,
	"source_url" varchar(512),
	"real_estate_salesman" integer,
	"new_ward" varchar,
	"new_province" varchar,
	CONSTRAINT "chk_positive_area" CHECK ((area IS NULL) OR (area > (0)::double precision)),
	CONSTRAINT "chk_valid_property_type" CHECK ((property_type_id IS NULL) OR (property_type_id > 0))
);
--> statement-breakpoint
CREATE TABLE "post_office" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"office_level" integer DEFAULT 2,
	"manager_user_id" integer,
	"permission_set_id" integer,
	"name" varchar(200) NOT NULL,
	"name_code" varchar(20),
	"phone" varchar(20),
	"email" varchar(100),
	"address_latitude" varchar(20),
	"address_longitude" varchar(20),
	"address" varchar(200),
	"city" varchar(20),
	"district" varchar(20),
	"ward" varchar(20),
	"city_name" varchar(255),
	"district_name" varchar(255),
	"ward_name" varchar(255),
	"start_date" date,
	"maps" text,
	"type_office" integer DEFAULT 0,
	"notes_other" text,
	"status" integer DEFAULT 1,
	"aactive" boolean DEFAULT true,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer DEFAULT 1,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"time_work" varchar(250),
	"full_name" varchar,
	"display_order" integer,
	CONSTRAINT "post_office_office_level_check" CHECK (office_level = ANY (ARRAY[1, 2, 3, 4, 5])),
	CONSTRAINT "post_office_status_check" CHECK (status = ANY (ARRAY[1, 2, 3, 4, 9])),
	CONSTRAINT "post_office_type_office_check" CHECK (type_office = ANY (ARRAY[0, 1, 2, 3]))
);
--> statement-breakpoint
CREATE TABLE "staff_work_area" (
	"id" serial PRIMARY KEY NOT NULL,
	"office_staff_id" integer NOT NULL,
	"area_type" integer DEFAULT 2,
	"city" varchar(20),
	"district" varchar(20),
	"ward" varchar(20),
	"city_name" varchar(200),
	"district_name" varchar(200),
	"ward_name" varchar(200),
	"custom_area_name" varchar(200),
	"coordinates" text,
	"start_date" date,
	"end_date" date,
	"is_exclusive" boolean DEFAULT false,
	"must_within_office_territory" boolean DEFAULT true,
	"aactive" boolean DEFAULT true,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "staff_work_area_area_type_check" CHECK (area_type = ANY (ARRAY[1, 2, 3]))
);
--> statement-breakpoint
CREATE TABLE "office_permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"permission_set_id" integer NOT NULL,
	"position_id" integer NOT NULL,
	"access_level" varchar(20) DEFAULT 'view',
	"can_access" boolean DEFAULT true,
	"conditions" text,
	"priority" integer DEFAULT 1,
	"notes" text,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer,
	"table_name" varchar(100),
	"table_id" integer,
	CONSTRAINT "office_permission_access_level_check" CHECK ((access_level)::text = ANY ((ARRAY['view'::character varying, 'disabled'::character varying, 'hidden'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE "office_staff" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_office_id" integer NOT NULL,
	"auth_user_id" integer NOT NULL,
	"salesman_id" integer,
	"position_ids" text,
	"is_primary" boolean DEFAULT true,
	"employment_type" integer DEFAULT 1,
	"start_date" date,
	"end_date" date,
	"status" integer DEFAULT 1,
	"contract_number" varchar(50),
	"contract_file" varchar(512),
	"aactive" boolean DEFAULT true,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"manager_id" integer,
	"team_name" varchar(100),
	CONSTRAINT "office_staff_employment_type_check" CHECK (employment_type = ANY (ARRAY[1, 2, 3, 4])),
	CONSTRAINT "office_staff_status_check" CHECK (status = ANY (ARRAY[1, 2, 3]))
);
--> statement-breakpoint
CREATE TABLE "seo_meta_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"page_type" varchar(64),
	"title" varchar(255),
	"meta_description" text,
	"meta_keywords" text,
	"og_title" varchar(512),
	"og_description" text,
	"og_image" varchar(512),
	"twitter_title" varchar(512),
	"twitter_description" text,
	"twitter_image" varchar(512),
	"canonical_url" varchar(512),
	"schema_type" varchar(512),
	"schema_json" text,
	"breadcrumb_json" text,
	"content_above" text,
	"content_below" text,
	"is_active" boolean,
	"created_at" timestamp,
	"updated_at" timestamp,
	"created_by" integer,
	"updated_by" integer,
	"social_tags" text,
	"is_default" boolean,
	"orderby" integer,
	"title_web" varchar,
	"cached_html" text,
	CONSTRAINT "seo_meta_data_slug_key" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "system_function" (
	"id" serial PRIMARY KEY NOT NULL,
	"function_code" varchar(100) NOT NULL,
	"function_name" varchar(200) NOT NULL,
	"function_category" varchar(50),
	"controller" varchar(100),
	"aaction" varchar(100),
	"url_pattern" varchar(200),
	"parent_menu_id" integer,
	"parent_function_code" varchar(100),
	"function_type" varchar(20) DEFAULT 'view',
	"requires_approval" boolean DEFAULT false,
	"is_critical" boolean DEFAULT false,
	"display_order" integer DEFAULT 0,
	"description" text,
	"aactive" boolean DEFAULT true,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"role_group" text,
	"office_position" text,
	"data_scope_config" json,
	"menu_id" integer,
	CONSTRAINT "system_function_function_code_key" UNIQUE("function_code"),
	CONSTRAINT "system_function_function_type_check" CHECK ((function_type)::text = ANY ((ARRAY['menu'::character varying, 'view'::character varying, 'create'::character varying, 'update'::character varying, 'delete'::character varying, 'approve'::character varying, 'other'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE "system_menu" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"menu_code" varchar(100) NOT NULL,
	"menu_name" varchar(200) NOT NULL,
	"menu_level" integer DEFAULT 1,
	"url" varchar(200),
	"icon" varchar(50),
	"display_order" integer DEFAULT 0,
	"description" text,
	"aactive" boolean DEFAULT true,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"menu_type" varchar(20),
	CONSTRAINT "system_menu_menu_code_key" UNIQUE("menu_code"),
	CONSTRAINT "system_menu_menu_level_check" CHECK (menu_level = ANY (ARRAY[1, 2, 3]))
);
--> statement-breakpoint
CREATE TABLE "transaction_reconciliation" (
	"id" serial PRIMARY KEY NOT NULL,
	"reconciliation_code" varchar(512),
	"transaction_id" integer,
	"agent_id" integer,
	"commission_type" varchar(512),
	"reconciliation_status" varchar(512),
	"expected_amount" bigint,
	"verified_amount" bigint,
	"variance_amount" bigint,
	"reconciliation_rate" numeric(5, 2),
	"reconciliation_period" varchar(512),
	"reconciliation_batch_id" varchar(512),
	"submitted_at" timestamp,
	"processed_at" timestamp,
	"settled_at" timestamp,
	"processed_by" integer,
	"notes" text,
	"admin_notes" text,
	"dispute_reason" varchar(512),
	"dispute_description" text,
	"dispute_submitted_at" timestamp,
	"dispute_resolved_at" timestamp,
	"dispute_resolution" text,
	"supporting_documents" text,
	"payment_proof" varchar(512),
	"wallet_transaction_id" varchar(512),
	"payment_method" varchar(512),
	"is_active" char(1),
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp,
	"bonus_amt" bigint,
	"bonus_rate" numeric(5, 2),
	CONSTRAINT "transaction_reconciliation_reconciliation_code_key" UNIQUE("reconciliation_code")
);
--> statement-breakpoint
CREATE TABLE "menu_function_mapping" (
	"id" serial PRIMARY KEY NOT NULL,
	"menu_id" integer NOT NULL,
	"function_id" integer NOT NULL,
	"display_order" integer DEFAULT 0,
	"is_primary" boolean DEFAULT true,
	"aactive" boolean DEFAULT true,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "menu_function_mapping_menu_id_function_id_key" UNIQUE("function_id","menu_id")
);
--> statement-breakpoint
CREATE TABLE "jackpot_calculation_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"jackpot_config_id" integer NOT NULL,
	"calculation_type" integer DEFAULT 1,
	"calculation_period_start" date,
	"calculation_period_end" date,
	"total_salesmen" integer DEFAULT 0,
	"total_reward_distributed" numeric(18, 2) DEFAULT '0.0',
	"calculation_data" json,
	"status" integer DEFAULT 0,
	"error_message" text,
	"notes" text,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT now(),
	"updated_on" timestamp DEFAULT now(),
	CONSTRAINT "jackpot_calculation_history_calculation_type_check" CHECK (calculation_type = ANY (ARRAY[1, 2, 3])),
	CONSTRAINT "jackpot_calculation_history_status_check" CHECK (status = ANY (ARRAY[0, 1, 2, 9]))
);
--> statement-breakpoint
CREATE TABLE "menu_permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"permission_set_id" integer,
	"position_id" integer,
	"menu_id" integer NOT NULL,
	"access_level" varchar(20) DEFAULT 'view',
	"can_access" boolean DEFAULT true,
	"conditions" text,
	"notes" text,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"table_name" varchar(100),
	"table_id" integer,
	"auth_group" integer,
	CONSTRAINT "menu_permission_access_level_check" CHECK ((access_level)::text = ANY ((ARRAY['view'::character varying, 'disabled'::character varying, 'hidden'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE "jackpot_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"fund_name" varchar(500) NOT NULL,
	"project_id" integer NOT NULL,
	"project_zone" varchar(200),
	"real_estate_sale_id" integer,
	"status" integer DEFAULT 1,
	"start_date" date,
	"end_date" date,
	"amount_begin" bigint DEFAULT 0,
	"notes" text,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"modified_by" integer,
	"modified_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "jackpot_config_status_check" CHECK (status = ANY (ARRAY[0, 1, 2, 9]))
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(512),
	"description" text,
	"project_status" varchar(512),
	"area_unit" varchar(512),
	"developer" integer,
	"legal_status" varchar(512),
	"total_units" integer,
	"total_towers" integer,
	"city" varchar(512),
	"city_id" varchar(512),
	"district" varchar(512),
	"district_id" varchar(512),
	"ward" varchar(512),
	"ward_id" varchar(512),
	"street_address" varchar(512),
	"main_image" text,
	"gallery_images" text,
	"rate_seller" double precision,
	"amount_seller" double precision,
	"rate_buyer" double precision,
	"amount_buyer" bigint,
	"rate_project" double precision,
	"amount_project" bigint,
	"is_featured" boolean,
	"aactive" boolean,
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp,
	"utilities" text,
	"developer_name" varchar(512),
	"developer_logo" text,
	"project_name" varchar(512),
	"project_code" varchar(512),
	"total_rate" numeric(5, 2),
	"total_amount" bigint,
	"project_type" integer,
	"project_area" double precision,
	"latitude" varchar(512),
	"longitude" varchar(512),
	"parent_id" integer,
	"note" varchar(512),
	"source_get" varchar(512),
	"master_plan_images" text,
	"price" integer,
	"price_description" varchar(512),
	"price_per_meter" integer,
	"source_project" varchar(512),
	"html_content" text,
	"zone_of_project" varchar(512),
	"group_id" varchar,
	"bot_ai" varchar(512),
	"is_bot_ai" boolean,
	"ai_convert" char(1),
	"ai_content" text,
	"project_code_show" varchar(512),
	"is_show_inventory" boolean DEFAULT true,
	CONSTRAINT "project_project_code_key" UNIQUE("project_code")
);
--> statement-breakpoint
CREATE TABLE "jackpot_apartment_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"jackpot_config_id" integer NOT NULL,
	"group_code" text NOT NULL,
	"reward_amount" numeric(18, 2) DEFAULT '0.0' NOT NULL,
	"reward_unit" integer DEFAULT 1,
	"description" text,
	"display_order" integer DEFAULT 0,
	CONSTRAINT "jackpot_apartment_group_reward_unit_check" CHECK (reward_unit = ANY (ARRAY[1, 2]))
);
--> statement-breakpoint
CREATE TABLE "real_estate_salesman" (
	"id" serial PRIMARY KEY NOT NULL,
	"real_estate_id" integer,
	"salesman_id" integer,
	"source_get" varchar(512),
	"post_time" timestamp,
	"status" varchar(512),
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp,
	"is_owner" char(1),
	"is_verified" boolean,
	"post" varchar,
	"source_post" varchar,
	"real_estate_value" bigint,
	"latlng" varchar,
	"google_maps_url" varchar,
	"ward_id" varchar,
	"district_id" varchar,
	"city_id" varchar,
	"address" varchar,
	"ownership_type" varchar(100),
	"verification_media_ids" text,
	"cover_media_ids" text,
	"contract_media_ids" text,
	"sale_off_member_id" bigint,
	"owner_account_id" bigint,
	"owner_phone" varchar(20),
	"owner_name" varchar(255),
	"completion_payout_percent" double precision,
	"deposit_percent" double precision,
	"buyer_company" varchar(255),
	"seller_name" varchar(255),
	"contract_signed_date" timestamp,
	"contract_number" varchar(100),
	"red_book_photos" text,
	"issued_date" timestamp,
	"number_book" varchar(100),
	"certificate_number" varchar(100),
	"tax_rate_percent" double precision,
	"tax_bearer" varchar(50),
	"brokerage_fee_unit" varchar(20) DEFAULT 'percent',
	"brokerage_fee_value" double precision,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"verified_at" timestamp,
	"verification_notes" text,
	"contract_type" varchar(128),
	"verification_status" varchar(32),
	"cccd_back_second" integer,
	"cccd_front_second" integer,
	"cccd_back_first" bigint,
	"cccd_front_first" bigint,
	"verified_by" bigint,
	"owner_name_first" varchar,
	"owner_name_second" varchar,
	"id_card_first" varchar,
	"id_card_second" varchar,
	"seller_cccd" varchar,
	"real_estate_status" smallint DEFAULT 1,
	"assign_sale_off_member_by" smallint,
	"verified_with_owner" boolean
);
--> statement-breakpoint
CREATE TABLE "salesman" (
	"id" serial PRIMARY KEY NOT NULL,
	"s_manager" integer,
	"avatar" varchar(512),
	"name_company" varchar(512),
	"name" varchar(512),
	"name_code" varchar(512),
	"birthday" date,
	"sex" varchar(512),
	"address" varchar(512),
	"id_card" varchar(512),
	"id_day" date,
	"id_by" varchar(512),
	"phone" varchar(512),
	"email" varchar(512),
	"salesman_type" integer,
	"acc_type" text,
	"num_days_for_control" integer,
	"auth_user_id" integer,
	"auth_user_name" varchar(512),
	"start_date" date,
	"created_on" timestamp,
	"created_by" integer,
	"display_order" integer,
	"status" char(1),
	"aactive" char(1),
	"auto_order" char(1),
	"note" varchar(512),
	"step" integer,
	"is_gift" char(1),
	"otp" integer,
	"citizen_id_front" varchar(512),
	"citizen_id_back" varchar(512),
	"license_front" varchar(512),
	"license_back" varchar(512),
	"yoe" integer,
	"city_id" text,
	"district_id" text,
	"ward_id" text,
	"is_send_lead" boolean,
	"contact_facebook" varchar,
	"convert_location" boolean DEFAULT false,
	"last_posted_at" timestamp,
	"count_real_estate" integer,
	"agent_support" integer,
	"verified_at" timestamp,
	"tax_code" varchar,
	"address_latitude" varchar(512),
	"address_longitude" varchar(512),
	"cmnd_number" varchar,
	"post_office_id" integer,
	"award_code" varchar,
	"tag_id" text,
	"source_get" integer
);
--> statement-breakpoint
CREATE TABLE "transaction_draft" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_id" text,
	"table_name" text,
	"table_id" text,
	"amount" text,
	"qr_code" text,
	"qr_withlogo" text,
	"description" text,
	"xtype" varchar(512),
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp,
	"transaction_type" integer,
	"real_estate_code" text
);
--> statement-breakpoint
CREATE TABLE "sms_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"sms_type" varchar(512),
	"sms" varchar(512),
	"id_device" varchar(512),
	"phone" varchar(512),
	"description" text,
	"status" varchar(512),
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "legal_document" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(512) NOT NULL,
	"aactive" char(1),
	"is_default" char(1),
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "rocket_message" (
	"id" serial PRIMARY KEY NOT NULL,
	"message_time" timestamp,
	"message_refresh" timestamp,
	"message_content" text,
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp,
	"rocket_room" integer,
	"count_miss" integer DEFAULT 0,
	"updated_on" timestamp,
	"user_name" text
);
--> statement-breakpoint
CREATE TABLE "furniture" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(512) NOT NULL,
	"aactive" char(1),
	"is_default" char(1),
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "equipment_token" (
	"id" serial PRIMARY KEY NOT NULL,
	"auth_user" integer,
	"token" text,
	"config" text,
	"app" varchar(512),
	"system_name" integer,
	"update_on" timestamp,
	"created_on" timestamp,
	"logout_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"folder" integer,
	"category" integer,
	"product" text,
	"name" varchar(512),
	"description" text,
	"htmlcontent" text,
	"avatar" varchar,
	"publish_on" timestamp,
	"expired_on" timestamp,
	"created_on" timestamp,
	"created_by" integer,
	"display_order" integer,
	"testfield" varchar,
	"aactive" boolean,
	"locations" bigint,
	"version_docs" text
);
--> statement-breakpoint
CREATE TABLE "property_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(512) NOT NULL,
	"parent_id" integer,
	"transaction_type" integer,
	"property_type" varchar(1) DEFAULT '1',
	"vietnamese" varchar,
	"slug" varchar,
	"vietnamese_lowercase" varchar,
	"description" text,
	"icon" text,
	"total_post" integer DEFAULT 0,
	"aactive" boolean DEFAULT true,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_on" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"fields_array" text,
	CONSTRAINT "property_type_property_type_check" CHECK ((property_type)::text = ANY (ARRAY[('0'::character varying)::text, ('1'::character varying)::text, ('2'::character varying)::text]))
);
--> statement-breakpoint
CREATE TABLE "transaction_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_id" integer,
	"action_type" varchar(512),
	"previous_status" integer,
	"new_status" integer,
	"field_changed" varchar(512),
	"old_value" text,
	"new_value" text,
	"action_description" text,
	"user_comment" text,
	"system_note" text,
	"attached_files" text,
	"performed_by" integer,
	"performed_on" timestamp,
	"ip_address" varchar(512),
	"user_agent" text
);
--> statement-breakpoint
CREATE TABLE "real_estate_transaction" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_code" varchar(512),
	"transaction_title" varchar(512),
	"real_estate_id" integer,
	"seller_id" integer,
	"buyer_id" integer,
	"agent_id_seller" integer,
	"rate_seller" numeric(5, 2),
	"amount_seller" bigint,
	"agent_id_buyer" integer,
	"rate_buyer" numeric(5, 2),
	"amount_buyer" bigint,
	"rate_project" numeric(5, 2),
	"amount_project" bigint,
	"transaction_status_type" varchar(512),
	"queue_position" integer,
	"waiting_list_date" timestamp,
	"promoted_from_waiting" char(1),
	"original_transaction_id" integer,
	"is_winner" char(1),
	"competition_rank" integer,
	"deposit_order" integer,
	"cancellation_reason" varchar(512),
	"cancelled_by_transaction_id" integer,
	"cancelled_at" timestamp,
	"auto_cancelled" char(1),
	"agreed_price" bigint,
	"deposit_amount" bigint,
	"final_price" bigint,
	"total_fees" bigint,
	"payment_method" varchar(512),
	"expected_completion_date" date,
	"actual_completion_date" date,
	"contract_date" date,
	"handover_date" date,
	"current_status" integer,
	"priority_level" integer,
	"notes" text,
	"internal_notes" text,
	"is_active" char(1),
	"created_by" integer,
	"assigned_to" integer,
	"created_on" timestamp,
	"updated_on" timestamp,
	"group_id" varchar(512),
	"commission_reconciliation_status" varchar(512),
	"commission_settlement_date" date,
	"commission_notes" text,
	"last_reconciliation_request" timestamp,
	"bonus_amt" bigint,
	"bonus_rate" numeric(5, 2),
	"deposit_type" varchar(512),
	"approval_status" varchar(512),
	"approved_by" integer,
	"approved_on" timestamp,
	"rejection_reason" text,
	"source_type" varchar(512),
	"parent_id" integer,
	"parent_ids" text,
	"consultation_id" integer,
	"is_consultation" boolean,
	"project_id" integer,
	"post_office_id" integer,
	CONSTRAINT "real_estate_transaction_transaction_code_key" UNIQUE("transaction_code")
);
--> statement-breakpoint
CREATE TABLE "plugin_ckeditor_upload" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"filename" varchar(255),
	"flength" integer,
	"mime_type" varchar(128),
	"upload" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "dbanks" (
	"id" serial PRIMARY KEY NOT NULL,
	"abbreviations" text,
	"bank_name_vn" text,
	"bank_code_vn" text,
	"mb_user" text,
	"bank_name_en" text,
	"swift_code" text,
	"image" varchar,
	"description" text,
	"aactive" boolean DEFAULT true,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer DEFAULT 1,
	"status" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "favorite" (
	"id" serial PRIMARY KEY NOT NULL,
	"real_estate" integer,
	"favorite_group" integer,
	"auth_user" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "objects" (
	"id" serial PRIMARY KEY NOT NULL,
	"folder" integer,
	"foldername" varchar(512),
	"tablename" varchar(512),
	"table_id" integer,
	"objects_id" integer,
	"process" integer,
	"auth_group" integer,
	"auth_org" integer,
	"publish_on" timestamp,
	"expired_on" timestamp,
	"ocomment" text,
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "process" (
	"id" serial PRIMARY KEY NOT NULL,
	"procedures" integer,
	"paccess" text,
	"pnext" integer,
	"name" varchar(255),
	"label" varchar(512),
	"description" varchar(512),
	"avatar" varchar(512),
	"auth_group" text,
	"view_group" text,
	"process_group" text,
	"pmode" varchar(512),
	"ptype" varchar(512),
	"url" varchar(512),
	"is_first" char(1),
	"is_copy" char(1),
	"is_confirm" char(1),
	"is_lock" char(1),
	"is_comment" char(1),
	"tablename" varchar(512),
	"field" text,
	"setting" text,
	"display_order" integer,
	"time_feedback" integer,
	"time_type" varchar(512),
	CONSTRAINT "process_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "process_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"objects" integer,
	"process" integer,
	"auth_group" integer,
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "real_estate_comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"tablename" varchar(512) NOT NULL,
	"table_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"content_comment" text NOT NULL,
	"comment_type" varchar(512),
	"reply_to_comment_id" integer,
	"thread_level" integer,
	"is_private" char(1),
	"visibility" varchar(512),
	"attachments" text,
	"mentioned_users" text,
	"is_edited" char(1),
	"edit_count" integer,
	"is_deleted" char(1),
	"is_pinned" char(1),
	"created_at" timestamp,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" integer,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "rocket_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"user_name" text,
	"email" text,
	"password" text,
	"auth_user_id" integer,
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp,
	"username" text,
	"room_id_agent" text,
	"room_id_tongkho" text,
	"list_room_id_project_agent" text,
	"list_room_id_project_tongkho" text
);
--> statement-breakpoint
CREATE TABLE "rocket_room" (
	"id" serial PRIMARY KEY NOT NULL,
	"room_id" text,
	"room_name" text,
	"room_type" integer,
	"rocket_config" integer,
	"room_system" char(1),
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp,
	"INSERT INTO public.rocket_room (room_id" varchar(50),
	"room_type) VALUES" varchar(50),
	"ai_status" boolean,
	"project_id" integer
);
--> statement-breakpoint
CREATE TABLE "transaction_document" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_type" varchar(512),
	"document_name" varchar(512),
	"description" text,
	"file_path" varchar(512),
	"file_size" integer,
	"file_type" varchar(512),
	"original_filename" varchar(512),
	"is_required" char(1),
	"is_verified" char(1),
	"verification_status" varchar(512),
	"verified_by" integer,
	"verified_on" timestamp,
	"verification_notes" text,
	"access_level" varchar(512),
	"expiry_date" date,
	"uploaded_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp,
	"table_name" varchar(512),
	"table_id" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "locations_with_count_property" (
	"id" serial PRIMARY KEY NOT NULL,
	"city" varchar(512),
	"city_id" varchar(512),
	"city_image" varchar(512),
	"city_latlng" varchar(512),
	"city_ref_id" varchar(512),
	"district" varchar(512),
	"district_id" varchar(512),
	"ward" varchar(512),
	"ward_id" varchar(512),
	"property_count" integer,
	"aactive" char(1),
	"created_on" timestamp,
	"updated_on" timestamp,
	"title" varchar(512),
	"slug" varchar,
	"name" varchar,
	"filename" varchar,
	"display_order" integer,
	"city_image_web" varchar,
	"mergedintoid" varchar
);
--> statement-breakpoint
CREATE TABLE "real_estate_work" (
	"id" serial PRIMARY KEY NOT NULL,
	"tablename" varchar(512) NOT NULL,
	"table_id" integer NOT NULL,
	"template_id" integer,
	"name" varchar(512) NOT NULL,
	"description" text,
	"status" varchar(512),
	"priority" integer,
	"deadline" timestamp,
	"created_at" timestamp,
	"completed_at" timestamp,
	"started_at" timestamp,
	"progress_percentage" integer,
	"estimated_hours" integer,
	"actual_hours" integer,
	"is_active" char(1),
	"created_by" integer,
	"assigned_to" integer,
	"updated_on" timestamp,
	"amount_deposit" bigint,
	"deposit_type" varchar,
	"attachments" text,
	"meeting_place" varchar(255),
	"reason" varchar(255),
	"result_note" varchar(255),
	"return_amount" integer DEFAULT 0,
	"real_estate_id" integer,
	"contract_type" varchar,
	"signing_method" varchar,
	"signing_date" timestamp,
	"post_office_id" integer
);
--> statement-breakpoint
CREATE TABLE "developer_project" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(512) NOT NULL,
	"logo" text,
	"phone" varchar(512),
	"email" varchar(512),
	"address" varchar(512),
	"aactive" boolean,
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "field_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"aactive" char(1)
);
--> statement-breakpoint
CREATE TABLE "permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" text,
	"display_order" integer,
	"created_by" integer,
	"created_on" timestamp,
	CONSTRAINT "permission_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "gift_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"table_name" text,
	"table_id" text,
	"point" text,
	"voucher" text,
	"news" integer,
	"gift_status" integer,
	"note" text,
	"note_for_user" text,
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "work_template" (
	"id" serial PRIMARY KEY NOT NULL,
	"tablename" varchar(512) NOT NULL,
	"name" varchar(512) NOT NULL,
	"description" text,
	"default_duration" integer,
	"priority" integer,
	"order_index" integer,
	"is_active" char(1),
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp,
	"transaction_status_filter" text,
	"transaction_type" varchar(512),
	"is_visible" char(1),
	"code" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "dfield" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"ftype" varchar(512),
	"fdefine" text,
	"fformat" varchar(512),
	"ckeditor" char(1)
);
--> statement-breakpoint
CREATE TABLE "tmessage" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" varchar(512),
	"list_auth_user" text,
	"tmessage_type" integer,
	"message_title" varchar(512),
	"message_content" text,
	"htmlcontent" text,
	"app" varchar(512),
	"image" text,
	"is_url" varchar(512),
	"is_url_mobile" varchar(512),
	"is_modal" char(1),
	"foldername" varchar(512),
	"tablename" varchar(512),
	"table_id" integer,
	"process" varchar(512),
	"aactive" boolean,
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "dtable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"label" varchar(512),
	"publish" char(1),
	"attachment" char(1),
	"is_import" char(1),
	"is_comment" char(1),
	"display_order" integer,
	"description" text,
	"setting" text,
	"layout" varchar(512),
	"display_row" text,
	"display_rows" text,
	"link_edit" varchar(512),
	CONSTRAINT "dtable_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "isread" (
	"id" serial PRIMARY KEY NOT NULL,
	"objects" integer,
	"created_by" integer,
	"created_on" timestamp,
	"table_name" varchar,
	"table_id" integer
);
--> statement-breakpoint
CREATE TABLE "zalo_access" (
	"id" serial PRIMARY KEY NOT NULL,
	"zalo_id" varchar(512),
	"access_token" varchar(512),
	"refresh_token" varchar(512),
	"expires_in" varchar(512),
	"refresh_token_time" varchar(512),
	"update_on" timestamp,
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "zone_of_project" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(512) NOT NULL,
	"slug" varchar(512),
	"description" text,
	"total_area" double precision,
	"number_of_units" integer,
	"utilities" text,
	"map_image" text,
	"latlng" text,
	"display_order" integer,
	"rate_seller" numeric(5, 2),
	"amount_seller" bigint,
	"rate_buyer" numeric(5, 2),
	"amount_buyer" bigint,
	"rate_project" numeric(5, 2),
	"amount_project" bigint,
	"is_active" boolean,
	"created_on" timestamp,
	"updated_on" timestamp,
	"total_rate" numeric(5, 2),
	"total_amount" bigint,
	"project" varchar(512),
	"bonus_amt" bigint
);
--> statement-breakpoint
CREATE TABLE "tablefield" (
	"id" serial PRIMARY KEY NOT NULL,
	"dtable" integer,
	"dfield" integer,
	"dlabel" varchar(512),
	"writable" char(1),
	"readable" char(1),
	"link_on_table" char(1),
	"show_on_table" char(1),
	"search_on" char(1),
	"ckeditor" char(1),
	"fformat" varchar(512),
	"display_order" integer
);
--> statement-breakpoint
CREATE TABLE "transaction_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"status_name" varchar(512) NOT NULL,
	"status_code" varchar(512),
	"description" text,
	"color_code" varchar(512),
	"icon" varchar(512),
	"display_order" integer,
	"is_final_status" char(1),
	"is_active" char(1),
	"notify_buyer" char(1),
	"notify_seller" char(1),
	"notify_agent" char(1),
	"notify_admin" char(1),
	"status_type" varchar(512),
	"next_statuses" text,
	"previous_statuses" text,
	"is_editable" char(1),
	"can_cancel" char(1),
	"auto_transition" char(1),
	"transition_condition" text,
	"max_days_in_status" integer,
	"warning_days" integer,
	"escalation_status" varchar(512),
	"required_role" varchar(512),
	"approval_required" char(1),
	"approver_role" varchar(512),
	"notification_template" text,
	"email_template" text,
	"sms_template" text,
	"status_metadata" text,
	"business_rules" text,
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp,
	"approval_status" varchar[],
	CONSTRAINT "transaction_status_status_code_key" UNIQUE("status_code")
);
--> statement-breakpoint
CREATE TABLE "type_field" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(512),
	"code" varchar(512),
	"api_source" varchar(512),
	"type_input" varchar(512),
	"is_active" char(1),
	"created_by" integer,
	"data_field" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "user_bank" (
	"id" serial PRIMARY KEY NOT NULL,
	"bank" integer,
	"acc_name" text,
	"acc_number" text,
	"branch" text,
	"is_use" char(1),
	"aactive" char(1),
	"table_name" text,
	"table_id" varchar(512),
	"created_on" timestamp,
	"created_by" integer,
	"status" char(1)
);
--> statement-breakpoint
CREATE TABLE "salesman_support" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_support" integer NOT NULL,
	"support_type" varchar(255),
	"table_name" varchar(255),
	"table_id" integer,
	"status" boolean DEFAULT true,
	"start_date" date DEFAULT CURRENT_DATE,
	"end_date" date,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "achives" (
	"id" serial PRIMARY KEY NOT NULL,
	"testfield" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "history_searching" (
	"id" serial PRIMARY KEY NOT NULL,
	"key_name" text,
	"data_search" text,
	"name" text,
	"description" text,
	"ref_id" text,
	"address" text,
	"city" text,
	"district" text,
	"ward" text,
	"ward_name" text,
	"district_name" text,
	"city_name" text,
	"latlng" text,
	"auth_user" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "message_campaign_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"type_name" text,
	"description" text,
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "process_lock" (
	"id" serial PRIMARY KEY NOT NULL,
	"tablename" varchar(512),
	"table_id" integer,
	"objects_id" integer,
	"process" integer,
	"comment_lock" text,
	"comment_unlock" text,
	"lock_by" integer,
	"lock_on" timestamp,
	"unlock_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "consultation_suggestions" (
	"id" serial PRIMARY KEY NOT NULL,
	"consultation_id" integer,
	"real_estate_id" integer,
	"suggestion_type" varchar(512),
	"match_score" numeric(5, 2),
	"match_criteria" text,
	"suggestion_reason" text,
	"is_sent" char(1),
	"sent_via" varchar(512),
	"sent_at" timestamp,
	"is_viewed" char(1),
	"viewed_at" timestamp,
	"is_interested" char(1),
	"feedback_score" integer,
	"feedback_note" text,
	"created_on" timestamp,
	"created_by" integer,
	"updated_on" timestamp,
	"aactive" char(1)
);
--> statement-breakpoint
CREATE TABLE "news_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"display_order" integer,
	CONSTRAINT "news_category_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" serial PRIMARY KEY NOT NULL,
	"auth_user" integer,
	"token" text,
	"notification_title" text,
	"notification_content" text,
	"link_refer" text,
	"xtype" integer,
	"update_on" timestamp,
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "real_estate_post_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"real_estate_id" integer,
	"salesman_id" integer,
	"source_get" varchar(512),
	"post_time" timestamp,
	"status" varchar(512),
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "message_campaign" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_type" integer,
	"tmessage_type" integer,
	"campaign_name" text,
	"notification_title" text,
	"notification_content" text,
	"date_run" timestamp,
	"f_day" integer,
	"f_month" integer,
	"f_year" integer,
	"f_hour" integer,
	"f_minute" integer,
	"f_day_salesman" integer,
	"f_day_to" integer,
	"recipients" text,
	"list_auth_user" text,
	"table_name" text,
	"table_id" integer,
	"content_processing" char(1),
	"notify_to_system" char(1),
	"notify_to_mobile" char(1),
	"notify_to_sms" char(1),
	"notify_to_zalo" char(1),
	"qty_user" integer,
	"aactive" char(1),
	"is_run" char(1),
	"history_update_on" text,
	"update_on" timestamp,
	"created_by" integer,
	"created_on" timestamp,
	"image" varchar(512),
	"context" integer,
	"context_id" integer,
	"condition_absolute" char(1),
	"xquery_json" varchar(512),
	"condition_type" integer
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_type" varchar(512),
	"transaction_id" integer,
	"hold_old" varchar(512),
	"bonus_old" varchar(512),
	"amount_hold" varchar(512),
	"amount_bonus" varchar(512),
	"amount_cash" varchar(512),
	"amount_point" varchar(512),
	"hold_new" varchar(512),
	"bonus_new" varchar(512),
	"point_old" varchar(512),
	"point_new" varchar(512),
	"cash_old" varchar(512),
	"cash_new" varchar(512),
	"description" text,
	"table_name" text,
	"table_id" text,
	"compare_name" text,
	"compare_id" text,
	"is_check" char(1),
	"aactive" char(1),
	"is_collaboration_reward" char(1),
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "verify_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"field" text,
	"reason" text,
	"auth_user_id" integer,
	"decal_control" integer,
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "zalo_hook" (
	"id" serial PRIMARY KEY NOT NULL,
	"htmlcontent" varchar(512),
	"aactive" char(1),
	"created_by" integer,
	"created_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "consultation_interest" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"consultation_id" bigint NOT NULL,
	"real_estate_id" bigint NOT NULL,
	"salesman_id" bigint,
	"real_estate_transaction_id" bigint,
	"status" smallint DEFAULT 1 NOT NULL,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" bigint,
	CONSTRAINT "consultation_interest_status_check" CHECK (status = ANY (ARRAY[1, 2, 3, 9]))
);
--> statement-breakpoint
CREATE TABLE "reconciliation_dispute" (
	"id" serial PRIMARY KEY NOT NULL,
	"dispute_code" varchar(512),
	"reconciliation_id" integer,
	"dispute_type" varchar(512),
	"dispute_title" varchar(512),
	"dispute_description" text,
	"requested_amount" bigint,
	"current_amount" bigint,
	"dispute_status" varchar(512),
	"priority" integer,
	"submitted_at" timestamp,
	"reviewed_at" timestamp,
	"resolved_at" timestamp,
	"deadline" timestamp,
	"resolution_type" varchar(512),
	"approved_amount" bigint,
	"resolution_notes" text,
	"resolution_by" integer,
	"evidence_documents" text,
	"admin_documents" text,
	"escalated_to" integer,
	"escalation_reason" text,
	"escalated_at" timestamp,
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp,
	CONSTRAINT "reconciliation_dispute_dispute_code_key" UNIQUE("dispute_code")
);
--> statement-breakpoint
CREATE TABLE "transaction_payment" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_id" integer,
	"payment_type" varchar(512),
	"amount" bigint,
	"payment_method" varchar(512),
	"payment_reference" varchar(512),
	"bank_name" varchar(512),
	"account_number" varchar(512),
	"payment_date" date,
	"due_date" date,
	"received_date" date,
	"payment_status" varchar(512),
	"verification_status" varchar(512),
	"description" text,
	"receipt_file" varchar(512),
	"verified_by" integer,
	"verified_on" timestamp,
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp
);
--> statement-breakpoint
CREATE TABLE "wallet_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"setting_key" varchar(512),
	"setting_name" varchar(512),
	"setting_value" text,
	"setting_type" varchar(512),
	"category" varchar(512),
	"subcategory" varchar(512),
	"description" text,
	"default_value" text,
	"validation_rules" text,
	"is_user_configurable" char(1),
	"requires_restart" char(1),
	"is_active" char(1),
	"display_order" integer,
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp,
	CONSTRAINT "wallet_settings_setting_key_key" UNIQUE("setting_key")
);
--> statement-breakpoint
CREATE TABLE "withdraw_control" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(512),
	"withdraw" text,
	"total_amount" bigint,
	"control_type" varchar(512),
	"period" varchar(512),
	"created_date" date,
	"processed_date" date,
	"completed_date" date,
	"status" varchar(512),
	"verification_status" varchar(512),
	"processed_by" integer,
	"notes" text,
	"admin_notes" text,
	"supporting_files" text,
	"created_by" integer,
	"created_on" timestamp,
	"updated_on" timestamp,
	CONSTRAINT "withdraw_control_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "verify" (
	"id" serial PRIMARY KEY NOT NULL,
	"auth_user_id" integer,
	"table_name" text,
	"table_id" text,
	"verify_type" text,
	"salesman" integer,
	"status" integer,
	"updated_on" timestamp,
	"created_on" timestamp,
	"created_by" integer
);
--> statement-breakpoint
CREATE TABLE "invited_salesman" (
	"id" integer PRIMARY KEY NOT NULL,
	"salesman" integer,
	"invited" integer,
	"aactive" boolean,
	"created_on" date,
	"created_by" integer
);
--> statement-breakpoint
CREATE TABLE "config_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(512),
	"code" varchar(512),
	"display_order" integer,
	"note" text,
	"is_active" char(1),
	"input_schema" json,
	"display_schema" json
);
--> statement-breakpoint
CREATE TABLE "config" (
	"id" serial PRIMARY KEY NOT NULL,
	"value0" varchar(512),
	"value1" varchar(512),
	"value2" varchar(512),
	"note" text,
	"display_order" integer,
	"is_active" char(1),
	"config_type" integer NOT NULL,
	"name" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "jackpot_ranking_criteria" (
	"id" serial PRIMARY KEY NOT NULL,
	"jackpot_config_id" integer NOT NULL,
	"config_id" integer NOT NULL,
	"weight_percentage" numeric(5, 2) DEFAULT '0.0' NOT NULL,
	"description" text,
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "condition_values" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" integer NOT NULL,
	"selected_value" varchar(255) DEFAULT NULL,
	"input_value" integer,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer,
	"updated_on" timestamp,
	"updated_by" integer,
	"group_index" integer,
	"condition_name" varchar(512),
	"group_name" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" serial PRIMARY KEY NOT NULL,
	"referrer_salesman" integer,
	"referred_salesman" integer,
	"referrer_type" integer DEFAULT 0,
	"xtype" integer DEFAULT 0,
	"reward_amount" text,
	"aactive" boolean DEFAULT true,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"update_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"note" text,
	CONSTRAINT "referrals_xtype_check" CHECK (xtype = ANY (ARRAY[0, 1, 2]))
);
--> statement-breakpoint
CREATE TABLE "award_config" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"code" text,
	"html_content" text,
	"aactive" boolean DEFAULT true,
	"created_by" integer DEFAULT 1,
	"created_on" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_on" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "context" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"aactive" varchar(1) DEFAULT 'T',
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"has_condition" varchar(1),
	"has_repeat" varchar(1),
	"xtype" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "campaign_conditions" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_name" varchar(255) DEFAULT NULL,
	"parent_id" integer,
	"condition_name" varchar(255) DEFAULT NULL,
	"type_html" varchar(50) DEFAULT NULL,
	"default_value" text,
	"is_value" boolean DEFAULT false,
	"aactive" boolean DEFAULT true,
	"update_on" timestamp,
	"created_on" timestamp,
	"created_by" integer,
	"decode_address" varchar(255) DEFAULT NULL,
	"display_order" integer DEFAULT 100,
	"search_count" bigint DEFAULT 8386,
	"mergedintoid" integer,
	"notes" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "condition_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"context_id" integer,
	"name" varchar(255),
	"xvalue" text,
	"has_repeat" varchar(1) DEFAULT 'F',
	"aactive" varchar(1) DEFAULT 'T',
	"created_by" integer DEFAULT 1,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "function_scope_permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"function_id" integer NOT NULL,
	"access_level" varchar(32) DEFAULT 'view',
	"can_access" boolean DEFAULT true,
	"conditions" json,
	"priority" integer DEFAULT 1,
	"notes" text,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer,
	"modified_on" timestamp,
	"modified_by" integer,
	"auth_group" integer
);
--> statement-breakpoint
CREATE TABLE "office_department" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_office_id" integer NOT NULL,
	"parent_id" integer,
	"name" varchar(200) NOT NULL,
	"name_code" varchar(50),
	"description" text,
	"manager_staff_id" integer,
	"display_order" integer DEFAULT 0,
	"status" integer DEFAULT 1,
	"aactive" boolean DEFAULT true,
	"created_on" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" integer DEFAULT 1,
	"updated_on" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"source_department_id" integer,
	"source_office_id" integer,
	"imported_at" timestamp,
	"auto_sync" boolean DEFAULT false,
	CONSTRAINT "office_department_post_office_id_name_code_key" UNIQUE("name_code","post_office_id"),
	CONSTRAINT "office_department_status_check" CHECK (status = ANY (ARRAY[1, 2, 3]))
);
--> statement-breakpoint
CREATE TABLE "office_staff_department" (
	"id" serial PRIMARY KEY NOT NULL,
	"office_staff_id" integer NOT NULL,
	"department_id" integer NOT NULL,
	"position_id" integer,
	"role_type" varchar(20) DEFAULT 'staff',
	"is_primary" boolean DEFAULT false,
	"is_manager" boolean DEFAULT false,
	"start_date" date,
	"end_date" date,
	"aactive" boolean DEFAULT true,
	"created_on" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" integer DEFAULT 1,
	"updated_on" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "office_staff_department_check" CHECK ((end_date IS NULL) OR (end_date >= start_date)),
	CONSTRAINT "office_staff_department_role_type_check" CHECK ((role_type)::text = ANY (ARRAY[('manager'::character varying)::text, ('deputy_manager'::character varying)::text, ('staff'::character varying)::text, ('coordinator'::character varying)::text, ('specialist'::character varying)::text]))
);
--> statement-breakpoint
CREATE TABLE "tag_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(255) NOT NULL,
	"description" text,
	"icon" varchar(255),
	"color" varchar(255) DEFAULT '#6c757d',
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "tag_categories_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "office_position" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_office_id" integer,
	"name" varchar(100) NOT NULL,
	"name_code" varchar(20),
	"description" text,
	"llevel" integer DEFAULT 5,
	"auth_group_id" integer,
	"is_default" boolean DEFAULT false,
	"is_manager" boolean DEFAULT false,
	"can_create_suboffice" boolean DEFAULT false,
	"can_manage_staff" boolean DEFAULT false,
	"aactive" boolean DEFAULT true,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer DEFAULT 1,
	"updated_on" timestamp,
	"department_id" integer,
	"parent_id" integer,
	"level_depth" integer DEFAULT 0 NOT NULL,
	"xpath" varchar(255),
	"can_receive_care" boolean,
	"source_position_id" integer,
	"source_office_id" integer,
	"imported_at" timestamp,
	"auto_sync" boolean DEFAULT false,
	"source_auth_group_id" integer,
	CONSTRAINT "office_position_llevel_check" CHECK ((llevel >= 1) AND (llevel <= 5))
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(255) NOT NULL,
	"description" text,
	"color" varchar(255) DEFAULT '#6c757d',
	"icon" varchar(255),
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "tag_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(255) NOT NULL,
	"description" text,
	"selection_type" varchar(50) DEFAULT 'multiple',
	"display_order" integer DEFAULT 0,
	"is_required" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"view_roles" text,
	"edit_roles" text,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "tag_groups_selection_type_check" CHECK ((selection_type)::text = ANY ((ARRAY['single'::character varying, 'multiple'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE "entity_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"table_name" varchar(255) NOT NULL,
	"table_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	"created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_by" integer
);
--> statement-breakpoint
ALTER TABLE "auth_user" ADD CONSTRAINT "auth_user_auth_group_fkey" FOREIGN KEY ("auth_group") REFERENCES "public"."auth_group"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "auth_cas" ADD CONSTRAINT "auth_cas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "auth_event" ADD CONSTRAINT "auth_event_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "file_upload" ADD CONSTRAINT "fk_created_by" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loan" ADD CONSTRAINT "loan_loan_package_fkey" FOREIGN KEY ("loan_package") REFERENCES "public"."loan_package"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "loan" ADD CONSTRAINT "loan_mortgage_fkey" FOREIGN KEY ("mortgage") REFERENCES "public"."loan_mortgage"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "loan_tracking" ADD CONSTRAINT "loan_tracking_loan_fkey" FOREIGN KEY ("loan") REFERENCES "public"."loan"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "procedures" ADD CONSTRAINT "procedures_user_group_fkey" FOREIGN KEY ("user_group") REFERENCES "public"."auth_group"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_type" ADD CONSTRAINT "transaction_type_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_agent_assignment" ADD CONSTRAINT "real_estate_agent_assignment_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "public"."salesman"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_agent_assignment" ADD CONSTRAINT "real_estate_agent_assignment_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_agent_assignment" ADD CONSTRAINT "real_estate_agent_assignment_real_estate_id_fkey" FOREIGN KEY ("real_estate_id") REFERENCES "public"."real_estate"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_status" ADD CONSTRAINT "real_estate_status_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_notification" ADD CONSTRAINT "transaction_notification_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_notification" ADD CONSTRAINT "transaction_notification_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_notification" ADD CONSTRAINT "transaction_notification_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "public"."real_estate_transaction"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "withdraw" ADD CONSTRAINT "withdraw_user_bank_fkey" FOREIGN KEY ("user_bank") REFERENCES "public"."user_bank"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "reconciliation_batch" ADD CONSTRAINT "reconciliation_batch_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "public"."salesman"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "reconciliation_batch" ADD CONSTRAINT "reconciliation_batch_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "reconciliation_batch" ADD CONSTRAINT "reconciliation_batch_processed_by_fkey" FOREIGN KEY ("processed_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tmessage_status" ADD CONSTRAINT "tmessage_status_tmessage_id_fkey" FOREIGN KEY ("tmessage_id") REFERENCES "public"."tmessage"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tmessage_status" ADD CONSTRAINT "tmessage_status_tmessage_type_fkey" FOREIGN KEY ("tmessage_type") REFERENCES "public"."tmessage_type"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_activity_log" ADD CONSTRAINT "user_activity_log_auth_user_fkey" FOREIGN KEY ("auth_user") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "customer" ADD CONSTRAINT "customer_salesman_fkey" FOREIGN KEY ("salesman") REFERENCES "public"."salesman"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "loan_package" ADD CONSTRAINT "loan_package_bank_fkey" FOREIGN KEY ("bank") REFERENCES "public"."dbanks"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "consultation" ADD CONSTRAINT "consultation_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultation" ADD CONSTRAINT "consultation_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "consultation" ADD CONSTRAINT "consultation_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "consultation" ADD CONSTRAINT "consultation_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."real_estate"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultation" ADD CONSTRAINT "consultation_status_changed_by_fkey" FOREIGN KEY ("status_changed_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "consultation" ADD CONSTRAINT "consultation_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "consultation" ADD CONSTRAINT "consultation_user_support_fkey" FOREIGN KEY ("user_support") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "folder" ADD CONSTRAINT "folder_parent_fkey" FOREIGN KEY ("parent") REFERENCES "public"."folder"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "archives" ADD CONSTRAINT "archives_folder_fkey" FOREIGN KEY ("folder") REFERENCES "public"."folder"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "auth_membership" ADD CONSTRAINT "auth_membership_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."auth_group"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "auth_membership" ADD CONSTRAINT "auth_membership_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "auth_permission" ADD CONSTRAINT "auth_permission_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."auth_group"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "dbank" ADD CONSTRAINT "dbank_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dbank_transactions_historys" ADD CONSTRAINT "dbank_transactions_historys_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "dbank_transactions_historys" ADD CONSTRAINT "dbank_transactions_historys_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "public"."real_estate_transaction"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "auth_group" ADD CONSTRAINT "auth_group_parent_fkey" FOREIGN KEY ("parent") REFERENCES "public"."auth_group"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "auth_group" ADD CONSTRAINT "fk_auth_group_post_office" FOREIGN KEY ("post_office") REFERENCES "public"."post_office"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dcontent" ADD CONSTRAINT "dcontent_folder_fkey" FOREIGN KEY ("folder") REFERENCES "public"."folder"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "work_member" ADD CONSTRAINT "work_member_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "work_member" ADD CONSTRAINT "work_member_salesman_id_fkey" FOREIGN KEY ("salesman_id") REFERENCES "public"."salesman"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "work_member" ADD CONSTRAINT "work_member_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "public"."real_estate_work"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_sale" ADD CONSTRAINT "real_estate_sale_bank_fkey" FOREIGN KEY ("bank") REFERENCES "public"."dbanks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_estate_sale" ADD CONSTRAINT "real_estate_sale_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_estate_sale" ADD CONSTRAINT "real_estate_sale_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_estate_sale_register" ADD CONSTRAINT "real_estate_sale_register_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_estate_sale_register" ADD CONSTRAINT "real_estate_sale_register_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_estate_sale_register" ADD CONSTRAINT "real_estate_sale_register_real_estate_sale_fkey" FOREIGN KEY ("real_estate_sale") REFERENCES "public"."real_estate_sale"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_salesman_criteria" ADD CONSTRAINT "jackpot_salesman_criteria_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_salesman_criteria" ADD CONSTRAINT "jackpot_salesman_criteria_jackpot_config_id_fkey" FOREIGN KEY ("jackpot_config_id") REFERENCES "public"."jackpot_config"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_salesman_criteria" ADD CONSTRAINT "jackpot_salesman_criteria_real_estate_sale_id_fkey" FOREIGN KEY ("real_estate_sale_id") REFERENCES "public"."real_estate_sale"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_salesman_criteria" ADD CONSTRAINT "jackpot_salesman_criteria_salesman_id_fkey" FOREIGN KEY ("salesman_id") REFERENCES "public"."salesman"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_salesman_criteria_value" ADD CONSTRAINT "jackpot_salesman_criteria_val_jackpot_salesman_criteria_id_fkey" FOREIGN KEY ("jackpot_salesman_criteria_id") REFERENCES "public"."jackpot_salesman_criteria"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_salesman_criteria_value" ADD CONSTRAINT "jackpot_salesman_criteria_valu_jackpot_ranking_criteria_id_fkey" FOREIGN KEY ("jackpot_ranking_criteria_id") REFERENCES "public"."jackpot_ranking_criteria"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_salesman_criteria_value" ADD CONSTRAINT "jackpot_salesman_criteria_value_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_reward_distribution" ADD CONSTRAINT "jackpot_reward_distribution_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_reward_distribution" ADD CONSTRAINT "jackpot_reward_distribution_jackpot_config_id_fkey" FOREIGN KEY ("jackpot_config_id") REFERENCES "public"."jackpot_config"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_reward_distribution" ADD CONSTRAINT "jackpot_reward_distribution_paid_by_fkey" FOREIGN KEY ("paid_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_reward_distribution" ADD CONSTRAINT "jackpot_reward_distribution_salesman_id_fkey" FOREIGN KEY ("salesman_id") REFERENCES "public"."salesman"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "log_error" ADD CONSTRAINT "log_error_auth_user_fkey" FOREIGN KEY ("auth_user") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "media_upload" ADD CONSTRAINT "media_upload_real_estate_id_fkey" FOREIGN KEY ("real_estate_id") REFERENCES "public"."real_estate"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_upload" ADD CONSTRAINT "media_upload_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "public"."auth_user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_permission_set" ADD CONSTRAINT "office_permission_set_based_on_set_id_fkey" FOREIGN KEY ("based_on_set_id") REFERENCES "public"."office_permission_set"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_permission_set" ADD CONSTRAINT "office_permission_set_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_territory" ADD CONSTRAINT "office_territory_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_territory" ADD CONSTRAINT "office_territory_post_office_id_fkey" FOREIGN KEY ("post_office_id") REFERENCES "public"."post_office"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_estate" ADD CONSTRAINT "real_estate_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_estate" ADD CONSTRAINT "real_estate_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate" ADD CONSTRAINT "real_estate_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate" ADD CONSTRAINT "real_estate_property_type_id_fkey" FOREIGN KEY ("property_type_id") REFERENCES "public"."property_type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_estate" ADD CONSTRAINT "real_estate_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "public"."real_estate_status"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate" ADD CONSTRAINT "real_estate_transaction_type_fkey" FOREIGN KEY ("transaction_type") REFERENCES "public"."transaction_type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_office" ADD CONSTRAINT "post_office_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_office" ADD CONSTRAINT "post_office_manager_user_id_fkey" FOREIGN KEY ("manager_user_id") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_office" ADD CONSTRAINT "post_office_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."post_office"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_office" ADD CONSTRAINT "post_office_permission_set_id_fkey" FOREIGN KEY ("permission_set_id") REFERENCES "public"."office_permission_set"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff_work_area" ADD CONSTRAINT "staff_work_area_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff_work_area" ADD CONSTRAINT "staff_work_area_office_staff_id_fkey" FOREIGN KEY ("office_staff_id") REFERENCES "public"."office_staff"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_permission" ADD CONSTRAINT "office_permission_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_permission" ADD CONSTRAINT "office_permission_permission_set_id_fkey" FOREIGN KEY ("permission_set_id") REFERENCES "public"."office_permission_set"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_permission" ADD CONSTRAINT "office_permission_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."office_position"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_staff" ADD CONSTRAINT "office_staff_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_staff" ADD CONSTRAINT "office_staff_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_staff" ADD CONSTRAINT "office_staff_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "public"."office_staff"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_staff" ADD CONSTRAINT "office_staff_post_office_id_fkey" FOREIGN KEY ("post_office_id") REFERENCES "public"."post_office"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_staff" ADD CONSTRAINT "office_staff_salesman_id_fkey" FOREIGN KEY ("salesman_id") REFERENCES "public"."salesman"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "system_function" ADD CONSTRAINT "fk_system_function_menu_id" FOREIGN KEY ("menu_id") REFERENCES "public"."system_menu"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "system_function" ADD CONSTRAINT "system_function_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "system_function" ADD CONSTRAINT "system_function_parent_function_code_fkey" FOREIGN KEY ("parent_function_code") REFERENCES "public"."system_function"("function_code") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "system_function" ADD CONSTRAINT "system_function_parent_menu_id_fkey" FOREIGN KEY ("parent_menu_id") REFERENCES "public"."system_menu"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "system_menu" ADD CONSTRAINT "system_menu_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "system_menu" ADD CONSTRAINT "system_menu_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."system_menu"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_reconciliation" ADD CONSTRAINT "transaction_reconciliation_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "public"."salesman"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_reconciliation" ADD CONSTRAINT "transaction_reconciliation_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_reconciliation" ADD CONSTRAINT "transaction_reconciliation_processed_by_fkey" FOREIGN KEY ("processed_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_reconciliation" ADD CONSTRAINT "transaction_reconciliation_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "public"."real_estate_transaction"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "menu_function_mapping" ADD CONSTRAINT "menu_function_mapping_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_function_mapping" ADD CONSTRAINT "menu_function_mapping_function_id_fkey" FOREIGN KEY ("function_id") REFERENCES "public"."system_function"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_function_mapping" ADD CONSTRAINT "menu_function_mapping_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "public"."system_menu"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_calculation_history" ADD CONSTRAINT "jackpot_calculation_history_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_calculation_history" ADD CONSTRAINT "jackpot_calculation_history_jackpot_config_id_fkey" FOREIGN KEY ("jackpot_config_id") REFERENCES "public"."jackpot_config"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_permission" ADD CONSTRAINT "menu_permission_auth_group_fk" FOREIGN KEY ("auth_group") REFERENCES "public"."auth_group"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_permission" ADD CONSTRAINT "menu_permission_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_permission" ADD CONSTRAINT "menu_permission_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "public"."system_menu"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_permission" ADD CONSTRAINT "menu_permission_permission_set_id_fkey" FOREIGN KEY ("permission_set_id") REFERENCES "public"."office_permission_set"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_permission" ADD CONSTRAINT "menu_permission_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."office_position"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_config" ADD CONSTRAINT "jackpot_config_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_config" ADD CONSTRAINT "jackpot_config_modified_by_fkey" FOREIGN KEY ("modified_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_config" ADD CONSTRAINT "jackpot_config_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_config" ADD CONSTRAINT "jackpot_config_real_estate_sale_id_fkey" FOREIGN KEY ("real_estate_sale_id") REFERENCES "public"."real_estate_sale"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_project_type_fkey" FOREIGN KEY ("project_type") REFERENCES "public"."property_type"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "jackpot_apartment_group" ADD CONSTRAINT "jackpot_apartment_group_jackpot_config_id_fkey" FOREIGN KEY ("jackpot_config_id") REFERENCES "public"."jackpot_config"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_estate_salesman" ADD CONSTRAINT "real_estate_salesman_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_salesman" ADD CONSTRAINT "real_estate_salesman_real_estate_id_fkey" FOREIGN KEY ("real_estate_id") REFERENCES "public"."real_estate"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_salesman" ADD CONSTRAINT "real_estate_salesman_real_estate_status_fk" FOREIGN KEY ("real_estate_status") REFERENCES "public"."real_estate_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_estate_salesman" ADD CONSTRAINT "real_estate_salesman_salesman_id_fkey" FOREIGN KEY ("salesman_id") REFERENCES "public"."salesman"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "salesman" ADD CONSTRAINT "fk_post_office_id" FOREIGN KEY ("post_office_id") REFERENCES "public"."post_office"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salesman" ADD CONSTRAINT "salesman_s_manager_fkey" FOREIGN KEY ("s_manager") REFERENCES "public"."salesman"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "news" ADD CONSTRAINT "news_category_fkey" FOREIGN KEY ("category") REFERENCES "public"."news_category"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "news" ADD CONSTRAINT "news_folder_fkey" FOREIGN KEY ("folder") REFERENCES "public"."folder"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "property_type" ADD CONSTRAINT "property_type_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_type" ADD CONSTRAINT "property_type_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."property_type"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_type" ADD CONSTRAINT "property_type_transaction_type_fkey" FOREIGN KEY ("transaction_type") REFERENCES "public"."transaction_type"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_history" ADD CONSTRAINT "transaction_history_new_status_fkey" FOREIGN KEY ("new_status") REFERENCES "public"."transaction_status"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_history" ADD CONSTRAINT "transaction_history_performed_by_fkey" FOREIGN KEY ("performed_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_history" ADD CONSTRAINT "transaction_history_previous_status_fkey" FOREIGN KEY ("previous_status") REFERENCES "public"."transaction_status"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_history" ADD CONSTRAINT "transaction_history_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "public"."real_estate_transaction"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_transaction" ADD CONSTRAINT "real_estate_transaction_agent_id_buyer_fkey" FOREIGN KEY ("agent_id_buyer") REFERENCES "public"."salesman"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_transaction" ADD CONSTRAINT "real_estate_transaction_agent_id_seller_fkey" FOREIGN KEY ("agent_id_seller") REFERENCES "public"."salesman"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_transaction" ADD CONSTRAINT "real_estate_transaction_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_transaction" ADD CONSTRAINT "real_estate_transaction_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_transaction" ADD CONSTRAINT "real_estate_transaction_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "public"."customer"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_transaction" ADD CONSTRAINT "real_estate_transaction_cancelled_by_transaction_id_fkey" FOREIGN KEY ("cancelled_by_transaction_id") REFERENCES "public"."real_estate_transaction"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_transaction" ADD CONSTRAINT "real_estate_transaction_consultation_fk" FOREIGN KEY ("consultation_id") REFERENCES "public"."consultation"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_estate_transaction" ADD CONSTRAINT "real_estate_transaction_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_transaction" ADD CONSTRAINT "real_estate_transaction_current_status_fkey" FOREIGN KEY ("current_status") REFERENCES "public"."transaction_status"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_transaction" ADD CONSTRAINT "real_estate_transaction_original_transaction_id_fkey" FOREIGN KEY ("original_transaction_id") REFERENCES "public"."real_estate_transaction"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_transaction" ADD CONSTRAINT "real_estate_transaction_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."real_estate_transaction"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_transaction" ADD CONSTRAINT "real_estate_transaction_real_estate_fk" FOREIGN KEY ("real_estate_id") REFERENCES "public"."real_estate"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_estate_transaction" ADD CONSTRAINT "real_estate_transaction_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."customer"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "dbanks" ADD CONSTRAINT "dbanks_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_favorite_group_fkey" FOREIGN KEY ("favorite_group") REFERENCES "public"."favorite_group"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_real_estate_fkey" FOREIGN KEY ("real_estate") REFERENCES "public"."real_estate"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "objects" ADD CONSTRAINT "objects_auth_group_fkey" FOREIGN KEY ("auth_group") REFERENCES "public"."auth_group"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "objects" ADD CONSTRAINT "objects_auth_org_fkey" FOREIGN KEY ("auth_org") REFERENCES "public"."auth_group"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "objects" ADD CONSTRAINT "objects_process_fkey" FOREIGN KEY ("process") REFERENCES "public"."process"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "process" ADD CONSTRAINT "process_pnext_fkey" FOREIGN KEY ("pnext") REFERENCES "public"."process"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "process" ADD CONSTRAINT "process_procedures_fkey" FOREIGN KEY ("procedures") REFERENCES "public"."procedures"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "process_log" ADD CONSTRAINT "process_log_auth_group_fkey" FOREIGN KEY ("auth_group") REFERENCES "public"."auth_group"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "process_log" ADD CONSTRAINT "process_log_objects_fkey" FOREIGN KEY ("objects") REFERENCES "public"."objects"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "process_log" ADD CONSTRAINT "process_log_process_fkey" FOREIGN KEY ("process") REFERENCES "public"."process"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_comment" ADD CONSTRAINT "real_estate_comment_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_comment" ADD CONSTRAINT "real_estate_comment_reply_to_comment_id_fkey" FOREIGN KEY ("reply_to_comment_id") REFERENCES "public"."real_estate_comment"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_comment" ADD CONSTRAINT "real_estate_comment_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_comment" ADD CONSTRAINT "real_estate_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "rocket_config" ADD CONSTRAINT "rocket_config_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "rocket_room" ADD CONSTRAINT "rocket_room_rocket_config_fk" FOREIGN KEY ("rocket_config") REFERENCES "public"."rocket_config"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_document" ADD CONSTRAINT "transaction_document_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_document" ADD CONSTRAINT "transaction_document_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_work" ADD CONSTRAINT "real_estate_work_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_work" ADD CONSTRAINT "real_estate_work_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_work" ADD CONSTRAINT "real_estate_work_real_estate_id_fkey" FOREIGN KEY ("real_estate_id") REFERENCES "public"."real_estate"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_estate_work" ADD CONSTRAINT "real_estate_work_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."work_template"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "gift_log" ADD CONSTRAINT "gift_log_news_fkey" FOREIGN KEY ("news") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "work_template" ADD CONSTRAINT "work_template_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tmessage" ADD CONSTRAINT "tmessage_tmessage_type_fkey" FOREIGN KEY ("tmessage_type") REFERENCES "public"."tmessage_type"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tablefield" ADD CONSTRAINT "tablefield_dfield_fkey" FOREIGN KEY ("dfield") REFERENCES "public"."dfield"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tablefield" ADD CONSTRAINT "tablefield_dtable_fkey" FOREIGN KEY ("dtable") REFERENCES "public"."dtable"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_status" ADD CONSTRAINT "transaction_status_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "type_field" ADD CONSTRAINT "type_field_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_bank" ADD CONSTRAINT "user_bank_bank_fkey" FOREIGN KEY ("bank") REFERENCES "public"."dbanks"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "salesman_support" ADD CONSTRAINT "salesman_support_user_support_fkey" FOREIGN KEY ("user_support") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultation_suggestions" ADD CONSTRAINT "consultation_suggestions_consultation_id_fkey" FOREIGN KEY ("consultation_id") REFERENCES "public"."consultation"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "consultation_suggestions" ADD CONSTRAINT "consultation_suggestions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "consultation_suggestions" ADD CONSTRAINT "consultation_suggestions_real_estate_id_fkey" FOREIGN KEY ("real_estate_id") REFERENCES "public"."real_estate"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_auth_user_fkey" FOREIGN KEY ("auth_user") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_post_log" ADD CONSTRAINT "real_estate_post_log_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_post_log" ADD CONSTRAINT "real_estate_post_log_real_estate_id_fkey" FOREIGN KEY ("real_estate_id") REFERENCES "public"."real_estate"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "real_estate_post_log" ADD CONSTRAINT "real_estate_post_log_salesman_id_fkey" FOREIGN KEY ("salesman_id") REFERENCES "public"."salesman"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "message_campaign" ADD CONSTRAINT "message_campaign_tmessage_type_fkey" FOREIGN KEY ("tmessage_type") REFERENCES "public"."tmessage_type"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "reconciliation_dispute" ADD CONSTRAINT "reconciliation_dispute_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "reconciliation_dispute" ADD CONSTRAINT "reconciliation_dispute_escalated_to_fkey" FOREIGN KEY ("escalated_to") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "reconciliation_dispute" ADD CONSTRAINT "reconciliation_dispute_reconciliation_id_fkey" FOREIGN KEY ("reconciliation_id") REFERENCES "public"."transaction_reconciliation"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "reconciliation_dispute" ADD CONSTRAINT "reconciliation_dispute_resolution_by_fkey" FOREIGN KEY ("resolution_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_payment" ADD CONSTRAINT "transaction_payment_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_payment" ADD CONSTRAINT "transaction_payment_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "public"."real_estate_transaction"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transaction_payment" ADD CONSTRAINT "transaction_payment_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "wallet_settings" ADD CONSTRAINT "wallet_settings_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "withdraw_control" ADD CONSTRAINT "withdraw_control_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "withdraw_control" ADD CONSTRAINT "withdraw_control_processed_by_fkey" FOREIGN KEY ("processed_by") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "verify" ADD CONSTRAINT "verify_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "verify" ADD CONSTRAINT "verify_salesman_fkey" FOREIGN KEY ("salesman") REFERENCES "public"."salesman"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invited_salesman" ADD CONSTRAINT "invited_salesman_salesman_fk" FOREIGN KEY ("salesman") REFERENCES "public"."salesman"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invited_salesman" ADD CONSTRAINT "invited_salesman_salesman_fk_1" FOREIGN KEY ("invited") REFERENCES "public"."salesman"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "config" ADD CONSTRAINT "config_config_type_fkey" FOREIGN KEY ("config_type") REFERENCES "public"."config_types"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "jackpot_ranking_criteria" ADD CONSTRAINT "jackpot_ranking_criteria_config_id_fkey" FOREIGN KEY ("config_id") REFERENCES "public"."config"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_ranking_criteria" ADD CONSTRAINT "jackpot_ranking_criteria_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jackpot_ranking_criteria" ADD CONSTRAINT "jackpot_ranking_criteria_jackpot_config_id_fkey" FOREIGN KEY ("jackpot_config_id") REFERENCES "public"."jackpot_config"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "condition_values" ADD CONSTRAINT "fk_condition_values_campaign" FOREIGN KEY ("campaign_id") REFERENCES "public"."message_campaign"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "condition_values" ADD CONSTRAINT "fk_condition_values_created_by" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "condition_values" ADD CONSTRAINT "fk_condition_values_updated_by" FOREIGN KEY ("updated_by") REFERENCES "public"."auth_user"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "context" ADD CONSTRAINT "fk_context_created_by" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaign_conditions" ADD CONSTRAINT "fk_campaign_conditions_parent" FOREIGN KEY ("parent_id") REFERENCES "public"."campaign_conditions"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "condition_type" ADD CONSTRAINT "fk_condition_type_context" FOREIGN KEY ("context_id") REFERENCES "public"."context"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "condition_type" ADD CONSTRAINT "fk_condition_type_user" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "function_scope_permission" ADD CONSTRAINT "function_scope_permission_auth_group_fk" FOREIGN KEY ("auth_group") REFERENCES "public"."auth_group"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "function_scope_permission" ADD CONSTRAINT "function_scope_permission_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "function_scope_permission" ADD CONSTRAINT "function_scope_permission_function_id_fkey" FOREIGN KEY ("function_id") REFERENCES "public"."system_function"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "function_scope_permission" ADD CONSTRAINT "function_scope_permission_modified_by_fkey" FOREIGN KEY ("modified_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_department" ADD CONSTRAINT "office_department_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_department" ADD CONSTRAINT "office_department_manager_staff_id_fkey" FOREIGN KEY ("manager_staff_id") REFERENCES "public"."office_staff"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_department" ADD CONSTRAINT "office_department_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."office_department"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_department" ADD CONSTRAINT "office_department_post_office_id_fkey" FOREIGN KEY ("post_office_id") REFERENCES "public"."post_office"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_staff_department" ADD CONSTRAINT "office_staff_department_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_staff_department" ADD CONSTRAINT "office_staff_department_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."office_department"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_staff_department" ADD CONSTRAINT "office_staff_department_office_staff_id_fkey" FOREIGN KEY ("office_staff_id") REFERENCES "public"."office_staff"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_staff_department" ADD CONSTRAINT "office_staff_department_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."office_position"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_position" ADD CONSTRAINT "office_position_auth_group_id_fkey" FOREIGN KEY ("auth_group_id") REFERENCES "public"."auth_group"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_position" ADD CONSTRAINT "office_position_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_position" ADD CONSTRAINT "office_position_office_department_fk" FOREIGN KEY ("department_id") REFERENCES "public"."office_department"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_position" ADD CONSTRAINT "office_position_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."office_position"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_position" ADD CONSTRAINT "office_position_post_office_id_fkey" FOREIGN KEY ("post_office_id") REFERENCES "public"."post_office"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."tag_groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tag_groups" ADD CONSTRAINT "tag_groups_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."tag_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entity_tags" ADD CONSTRAINT "entity_tags_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entity_tags" ADD CONSTRAINT "entity_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_consultation_created_on" ON "consultation" USING btree ("created_on" timestamp_ops);--> statement-breakpoint
CREATE INDEX "idx_consultation_demand_status" ON "consultation" USING btree ("demand_status" text_ops);--> statement-breakpoint
CREATE INDEX "idx_consultation_last_matched" ON "consultation" USING btree ("last_matched_on" timestamp_ops);--> statement-breakpoint
CREATE INDEX "idx_consultation_user_support" ON "consultation" USING btree ("user_support" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_auth_membership_user_group" ON "auth_membership" USING btree ("user_id" int4_ops,"group_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_jackpot_salesman_criteria_value_active" ON "jackpot_salesman_criteria_value" USING btree ("is_active" bool_ops) WHERE (is_active = true);--> statement-breakpoint
CREATE INDEX "idx_jackpot_salesman_criteria_value_criteria_id" ON "jackpot_salesman_criteria_value" USING btree ("jackpot_salesman_criteria_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_jackpot_salesman_criteria_value_ranking_id" ON "jackpot_salesman_criteria_value" USING btree ("jackpot_ranking_criteria_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_jackpot_reward_distribution_created_by" ON "jackpot_reward_distribution" USING btree ("created_by" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_jackpot_reward_distribution_jackpot_config_id" ON "jackpot_reward_distribution" USING btree ("jackpot_config_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_jackpot_reward_distribution_paid_by" ON "jackpot_reward_distribution" USING btree ("paid_by" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_jackpot_reward_distribution_salesman_id" ON "jackpot_reward_distribution" USING btree ("salesman_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_locations_nid" ON "locations" USING btree ("n_id" text_ops);--> statement-breakpoint
CREATE INDEX "locations_n_id_idx" ON "locations" USING btree ("n_id" text_ops,"n_parentid" text_ops,"n_name" text_ops,"n_level" text_ops);--> statement-breakpoint
CREATE INDEX "idx_log_tracking_re" ON "log_tracking" USING btree ("tablename" int4_ops,"table_id" bpchar_ops,"aactive" bpchar_ops);--> statement-breakpoint
CREATE INDEX "idx_permission_set_active" ON "office_permission_set" USING btree ("aactive" bool_ops);--> statement-breakpoint
CREATE INDEX "idx_permission_set_based_on" ON "office_permission_set" USING btree ("based_on_set_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_permission_set_default" ON "office_permission_set" USING btree ("is_default" bool_ops) WHERE (is_default = true);--> statement-breakpoint
CREATE INDEX "idx_territory_active" ON "office_territory" USING btree ("aactive" bool_ops);--> statement-breakpoint
CREATE INDEX "idx_territory_city" ON "office_territory" USING btree ("city" text_ops);--> statement-breakpoint
CREATE INDEX "idx_territory_dates" ON "office_territory" USING btree ("start_date" date_ops,"end_date" date_ops);--> statement-breakpoint
CREATE INDEX "idx_territory_district" ON "office_territory" USING btree ("city" text_ops,"district" text_ops);--> statement-breakpoint
CREATE INDEX "idx_territory_office" ON "office_territory" USING btree ("post_office_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_territory_type" ON "office_territory" USING btree ("territory_type" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_territory_ward" ON "office_territory" USING btree ("city" text_ops,"district" text_ops,"ward" text_ops);--> statement-breakpoint
CREATE INDEX "idx_city_street" ON "real_estate" USING btree ("city_id" text_ops,"street_slug" text_ops);--> statement-breakpoint
CREATE INDEX "idx_re_aactive_created_time_id" ON "real_estate" USING btree ("aactive" timestamp_ops,"created_time" timestamp_ops,"id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_re_area" ON "real_estate" USING btree ("area" float8_ops);--> statement-breakpoint
CREATE INDEX "idx_re_city_id" ON "real_estate" USING btree ("city_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_re_code_lower" ON "real_estate" USING btree (lower((real_estate_code)::text) text_ops);--> statement-breakpoint
CREATE INDEX "idx_re_district_id" ON "real_estate" USING btree ("district_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_re_frontage_width" ON "real_estate" USING btree ("frontage_width" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_re_min_price" ON "real_estate" USING btree ("min_price" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_re_property_type_id" ON "real_estate" USING btree ("property_type_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_re_status_id" ON "real_estate" USING btree ("status_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_re_title_trgm" ON "real_estate" USING gin ("title" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX "idx_re_transaction_type" ON "real_estate" USING btree ("transaction_type" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_re_ward_id" ON "real_estate" USING btree ("ward_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_area" ON "real_estate" USING btree ("area" float8_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_city" ON "real_estate" USING btree ("city" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_city_id" ON "real_estate" USING btree ("city_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_code" ON "real_estate" USING btree ("real_estate_code" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_created_on" ON "real_estate" USING btree ("created_on" timestamp_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_created_time" ON "real_estate" USING btree ("created_time" timestamp_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_customer_id" ON "real_estate" USING btree ("customer_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_district" ON "real_estate" USING btree ("district" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_district_id" ON "real_estate" USING btree ("district_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_house_direction" ON "real_estate" USING btree ("house_direction" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_id_created_time" ON "real_estate" USING btree ("id" int4_ops,"created_time" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_is_featured" ON "real_estate" USING btree ("is_featured" bool_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_is_verified" ON "real_estate" USING btree ("is_verified" bool_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_land_direction" ON "real_estate" USING btree ("land_direction" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_owner_created_active" ON "real_estate" USING btree ("owner_id" bool_ops,"created_on" timestamp_ops,"aactive" timestamp_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_owner_id" ON "real_estate" USING btree ("owner_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_post_source_post" ON "real_estate" USING btree ("post" text_ops,"source_post" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_price" ON "real_estate" USING btree ("price" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_project" ON "real_estate" USING btree ("project" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_property_type_id" ON "real_estate" USING btree ("property_type_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_slug" ON "real_estate" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_status_id" ON "real_estate" USING btree ("status_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_street_name" ON "real_estate" USING btree ("street_name" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_transaction_type" ON "real_estate" USING btree ("transaction_type" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_updated_active_status" ON "real_estate" USING btree ("updated_on" timestamp_ops) WHERE ((aactive = true) AND (status_id = 5) AND (slug IS NOT NULL) AND ((slug)::text <> ''::text));--> statement-breakpoint
CREATE INDEX "idx_real_estate_ward" ON "real_estate" USING btree ("ward" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_ward_id" ON "real_estate" USING btree ("ward_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_zone_of_project" ON "real_estate" USING btree ("zone_of_project" text_ops);--> statement-breakpoint
CREATE INDEX "real_estate_aactive_idx" ON "real_estate" USING btree ("aactive" bool_ops);--> statement-breakpoint
CREATE INDEX "real_estate_min_price_idx" ON "real_estate" USING btree ("min_price" int8_ops,"max_price" int8_ops);--> statement-breakpoint
CREATE INDEX "real_estate_project_idx" ON "real_estate" USING btree ("project" text_ops);--> statement-breakpoint
CREATE INDEX "real_estate_street_idx" ON "real_estate" USING btree ("street" int4_ops);--> statement-breakpoint
CREATE INDEX "real_estate_ward_idx" ON "real_estate" USING btree ("ward" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "uq_post_sourcepost" ON "real_estate" USING btree ("post" text_ops,"source_post" text_ops);--> statement-breakpoint
CREATE INDEX "idx_post_office_level" ON "post_office" USING btree ("office_level" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_post_office_manager" ON "post_office" USING btree ("manager_user_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_post_office_parent" ON "post_office" USING btree ("parent_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_post_office_permission" ON "post_office" USING btree ("permission_set_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_work_area_active" ON "staff_work_area" USING btree ("aactive" bool_ops);--> statement-breakpoint
CREATE INDEX "idx_work_area_city" ON "staff_work_area" USING btree ("city" text_ops);--> statement-breakpoint
CREATE INDEX "idx_work_area_dates" ON "staff_work_area" USING btree ("start_date" date_ops,"end_date" date_ops);--> statement-breakpoint
CREATE INDEX "idx_work_area_district" ON "staff_work_area" USING btree ("city" text_ops,"district" text_ops);--> statement-breakpoint
CREATE INDEX "idx_work_area_staff" ON "staff_work_area" USING btree ("office_staff_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_work_area_type" ON "staff_work_area" USING btree ("area_type" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_work_area_ward" ON "staff_work_area" USING btree ("city" text_ops,"district" text_ops,"ward" text_ops);--> statement-breakpoint
CREATE INDEX "idx_permission_access_level" ON "office_permission" USING btree ("access_level" text_ops);--> statement-breakpoint
CREATE INDEX "idx_permission_lookup" ON "office_permission" USING btree ("permission_set_id" int4_ops,"position_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_permission_position" ON "office_permission" USING btree ("position_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_permission_set" ON "office_permission" USING btree ("permission_set_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_staff_dates" ON "office_staff" USING btree ("start_date" date_ops,"end_date" date_ops);--> statement-breakpoint
CREATE INDEX "idx_staff_office" ON "office_staff" USING btree ("post_office_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_staff_primary" ON "office_staff" USING btree ("is_primary" bool_ops) WHERE (is_primary = true);--> statement-breakpoint
CREATE INDEX "idx_staff_salesman" ON "office_staff" USING btree ("salesman_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_staff_status" ON "office_staff" USING btree ("status" bool_ops,"aactive" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_staff_user" ON "office_staff" USING btree ("auth_user_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_staff_user_office" ON "office_staff" USING btree ("auth_user_id" int4_ops,"post_office_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_seo_meta_data_is_active" ON "seo_meta_data" USING btree ("is_active" bool_ops);--> statement-breakpoint
CREATE INDEX "idx_seo_meta_data_page_type" ON "seo_meta_data" USING btree ("page_type" text_ops);--> statement-breakpoint
CREATE INDEX "idx_seo_meta_data_slug" ON "seo_meta_data" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "idx_function_active" ON "system_function" USING btree ("aactive" bool_ops);--> statement-breakpoint
CREATE INDEX "idx_function_category" ON "system_function" USING btree ("function_category" text_ops);--> statement-breakpoint
CREATE INDEX "idx_function_code" ON "system_function" USING btree ("function_code" text_ops);--> statement-breakpoint
CREATE INDEX "idx_function_parent_code" ON "system_function" USING btree ("parent_function_code" text_ops);--> statement-breakpoint
CREATE INDEX "idx_function_parent_menu" ON "system_function" USING btree ("parent_menu_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_function_type" ON "system_function" USING btree ("function_type" text_ops);--> statement-breakpoint
CREATE INDEX "idx_menu_active" ON "system_menu" USING btree ("aactive" bool_ops);--> statement-breakpoint
CREATE INDEX "idx_menu_code" ON "system_menu" USING btree ("menu_code" text_ops);--> statement-breakpoint
CREATE INDEX "idx_menu_level" ON "system_menu" USING btree ("menu_level" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_menu_order" ON "system_menu" USING btree ("display_order" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_menu_parent" ON "system_menu" USING btree ("parent_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_mapping_active" ON "menu_function_mapping" USING btree ("aactive" bool_ops);--> statement-breakpoint
CREATE INDEX "idx_mapping_function" ON "menu_function_mapping" USING btree ("function_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_mapping_menu" ON "menu_function_mapping" USING btree ("menu_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_jackpot_calculation_history_created_by" ON "jackpot_calculation_history" USING btree ("created_by" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_jackpot_calculation_history_jackpot_config_id" ON "jackpot_calculation_history" USING btree ("jackpot_config_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_menu_perm_lookup" ON "menu_permission" USING btree ("permission_set_id" int4_ops,"position_id" int4_ops,"menu_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_menu_perm_menu" ON "menu_permission" USING btree ("menu_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_menu_perm_position" ON "menu_permission" USING btree ("position_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_menu_perm_set" ON "menu_permission" USING btree ("permission_set_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_jackpot_config_project_id" ON "jackpot_config" USING btree ("project_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_jackpot_config_real_estate_sale_id" ON "jackpot_config" USING btree ("real_estate_sale_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_project_code" ON "project" USING btree ("project_code" text_ops);--> statement-breakpoint
CREATE INDEX "idx_slug" ON "project" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "project_slug_idx" ON "project" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "idx_jackpot_apartment_group_jackpot_config_id" ON "jackpot_apartment_group" USING btree ("jackpot_config_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_owner_account_id" ON "real_estate_salesman" USING btree ("owner_account_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_real_estate_salesman_salesman_id" ON "real_estate_salesman" USING btree ("salesman_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_res_reid" ON "real_estate_salesman" USING btree ("real_estate_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_res_salesmanid" ON "real_estate_salesman" USING btree ("salesman_id" int4_ops);--> statement-breakpoint
CREATE INDEX "real_estate_salesman_real_estate_id_idx" ON "real_estate_salesman" USING btree ("real_estate_id" int4_ops,"salesman_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_salesman_auth" ON "salesman" USING btree ("auth_user_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_salesman_auth_user_id" ON "salesman" USING btree ("auth_user_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_salesman_city" ON "salesman" USING btree ("city_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_salesman_created_on" ON "salesman" USING btree ("created_on" timestamp_ops);--> statement-breakpoint
CREATE INDEX "idx_salesman_district" ON "salesman" USING btree ("district_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_salesman_name_trgm" ON "salesman" USING gin ("name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX "idx_salesman_phone" ON "salesman" USING btree ("phone" text_ops);--> statement-breakpoint
CREATE INDEX "idx_salesman_ward" ON "salesman" USING btree ("ward_id" text_ops);--> statement-breakpoint
CREATE INDEX "news_folder_idx" ON "news" USING btree ("folder" int4_ops,"publish_on" bool_ops,"expired_on" timestamp_ops,"created_on" timestamp_ops,"aactive" bool_ops);--> statement-breakpoint
CREATE INDEX "property_type_aactive_idx" ON "property_type" USING btree ("aactive" bool_ops);--> statement-breakpoint
CREATE INDEX "property_type_property_type_idx" ON "property_type" USING btree ("property_type" text_ops);--> statement-breakpoint
CREATE INDEX "idx_re_trans_reid" ON "real_estate_transaction" USING btree ("real_estate_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_re_trans_status" ON "real_estate_transaction" USING btree ("current_status" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_locations_with_count_property_display_order" ON "locations_with_count_property" USING btree ("display_order" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_locations_with_count_property_mergedintoid" ON "locations_with_count_property" USING btree ("mergedintoid" text_ops);--> statement-breakpoint
CREATE INDEX "idx_consultation_suggestions_consultation" ON "consultation_suggestions" USING btree ("consultation_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_consultation_suggestions_estate" ON "consultation_suggestions" USING btree ("real_estate_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_consultation_suggestions_score" ON "consultation_suggestions" USING btree ("match_score" numeric_ops);--> statement-breakpoint
CREATE INDEX "idx_consultation_suggestions_sent" ON "consultation_suggestions" USING btree ("is_sent" timestamp_ops,"sent_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "idx_jackpot_ranking_criteria_config_id" ON "jackpot_ranking_criteria" USING btree ("config_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_jackpot_ranking_criteria_jackpot_config_id" ON "jackpot_ranking_criteria" USING btree ("jackpot_config_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_condition_values_campaign_id" ON "condition_values" USING btree ("campaign_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_condition_values_created_by" ON "condition_values" USING btree ("created_by" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_condition_values_updated_by" ON "condition_values" USING btree ("updated_by" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_campaign_conditions_aactive" ON "campaign_conditions" USING btree ("aactive" bool_ops);--> statement-breakpoint
CREATE INDEX "idx_campaign_conditions_display_order" ON "campaign_conditions" USING btree ("display_order" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_campaign_conditions_group_active_order" ON "campaign_conditions" USING btree ("group_name" int4_ops,"aactive" int4_ops,"display_order" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_campaign_conditions_group_name" ON "campaign_conditions" USING btree ("group_name" text_ops);--> statement-breakpoint
CREATE INDEX "idx_campaign_conditions_parent_id" ON "campaign_conditions" USING btree ("parent_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_function_scope_permission_access_level" ON "function_scope_permission" USING btree ("access_level" text_ops);--> statement-breakpoint
CREATE INDEX "idx_function_scope_permission_function_id" ON "function_scope_permission" USING btree ("function_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_office_position_auth_group_id" ON "office_position" USING btree ("auth_group_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_office_position_parent_id" ON "office_position" USING btree ("parent_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_office_position_post_office_id" ON "office_position" USING btree ("post_office_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_office_position_xpath" ON "office_position" USING btree ("xpath" text_ops);--> statement-breakpoint
CREATE INDEX "idx_entity_tags_table" ON "entity_tags" USING btree ("table_name" int4_ops,"table_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_entity_tags_tag" ON "entity_tags" USING btree ("tag_id" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "idx_entity_tags_unique" ON "entity_tags" USING btree ("table_name" int4_ops,"table_id" int4_ops,"tag_id" int4_ops);
*/