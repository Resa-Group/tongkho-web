import { pgTable, foreignKey, serial, varchar, integer, timestamp, char, text, doublePrecision, unique, numeric, bigint, date, check, smallint, index, bigserial, boolean, uniqueIndex, json, pgSequence } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const transactionCodeSeq = pgSequence("transaction_code_seq", {  startWith: "10000000", increment: "1", minValue: "1", maxValue: "9223372036854775807", cache: "1", cycle: false })

export const authUser = pgTable("auth_user", {
	id: serial().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 128 }),
	lastName: varchar("last_name", { length: 128 }),
	email: varchar({ length: 512 }),
	username: varchar({ length: 128 }),
	password: varchar({ length: 512 }),
	registrationKey: varchar("registration_key", { length: 512 }),
	resetPasswordKey: varchar("reset_password_key", { length: 512 }),
	registrationId: varchar("registration_id", { length: 512 }),
	authGroup: integer("auth_group"),
	role: varchar({ length: 512 }),
	image: varchar({ length: 512 }),
	phone: varchar({ length: 512 }),
	loginNext: varchar("login_next", { length: 512 }),
	displayOrder: integer("display_order"),
	motpSecret: varchar("motp_secret", { length: 512 }),
	motpPin: varchar("motp_pin", { length: 128 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	testProject: varchar("test_project", { length: 128 }),
}, (table) => [
	foreignKey({
			columns: [table.authGroup],
			foreignColumns: [authGroup.id],
			name: "auth_user_auth_group_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const authCas = pgTable("auth_cas", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	service: varchar({ length: 512 }),
	ticket: varchar({ length: 512 }),
	renew: char({ length: 1 }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [authUser.id],
			name: "auth_cas_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const authEvent = pgTable("auth_event", {
	id: serial().primaryKey().notNull(),
	timeStamp: timestamp("time_stamp", { mode: 'string' }),
	clientIp: varchar("client_ip", { length: 512 }),
	userId: integer("user_id"),
	origin: varchar({ length: 512 }),
	description: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [authUser.id],
			name: "auth_event_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const fileUpload = pgTable("file_upload", {
	id: serial().primaryKey().notNull(),
	tablename: text(),
	pkey: text(),
	tableId: text("table_id"),
	name: text(),
	filetype: text(),
	extension: text(),
	filesize: doublePrecision(),
	filecomment: text(),
	textcontent: text(),
	publish: text().default('True'),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	filename: text(),
	logOrderCode: varchar("log_order_code"),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "fk_created_by"
		}),
]);

export const loan = pgTable("loan", {
	id: serial().primaryKey().notNull(),
	nameCustomer: text("name_customer"),
	phoneCustomer: text("phone_customer"),
	loanPackage: integer("loan_package"),
	loanAmount: text("loan_amount"),
	disbursementDate: text("disbursement_date"),
	transactionId: varchar("transaction_id", { length: 512 }),
	status: text(),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	paymentMethod: varchar("payment_method", { length: 512 }),
	loanTerm: text("loan_term"),
	mortgage: integer(),
	note: text(),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	customer: integer(),
	rose: text(),
	userId: integer("user_id"),
}, (table) => [
	foreignKey({
			columns: [table.loanPackage],
			foreignColumns: [loanPackage.id],
			name: "loan_loan_package_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.mortgage],
			foreignColumns: [loanMortgage.id],
			name: "loan_mortgage_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const loanMortgage = pgTable("loan_mortgage", {
	id: serial().primaryKey().notNull(),
	xtype: text(),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	name: text(),
});

export const loanTracking = pgTable("loan_tracking", {
	id: serial().primaryKey().notNull(),
	loan: integer(),
	title: text(),
	note: text(),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.loan],
			foreignColumns: [loan.id],
			name: "loan_tracking_loan_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const tmessageType = pgTable("tmessage_type", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 512 }),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
});

export const paymentMethods = pgTable("payment_methods", {
	id: serial().primaryKey().notNull(),
	methodName: varchar("method_name", { length: 512 }),
	methodCode: varchar("method_code", { length: 512 }),
	methodType: varchar("method_type", { length: 512 }),
	isDepositEnabled: char("is_deposit_enabled", { length: 1 }),
	isWithdrawalEnabled: char("is_withdrawal_enabled", { length: 1 }),
	minAmount: numeric("min_amount", { precision: 15, scale:  2 }),
	maxAmount: numeric("max_amount", { precision: 15, scale:  2 }),
	dailyLimit: numeric("daily_limit", { precision: 15, scale:  2 }),
	monthlyLimit: numeric("monthly_limit", { precision: 15, scale:  2 }),
	depositFeeType: varchar("deposit_fee_type", { length: 512 }),
	depositFeeAmount: numeric("deposit_fee_amount", { precision: 15, scale:  2 }),
	depositFeePercentage: numeric("deposit_fee_percentage", { precision: 5, scale:  2 }),
	withdrawalFeeType: varchar("withdrawal_fee_type", { length: 512 }),
	withdrawalFeeAmount: numeric("withdrawal_fee_amount", { precision: 15, scale:  2 }),
	withdrawalFeePercentage: numeric("withdrawal_fee_percentage", { precision: 5, scale:  2 }),
	icon: varchar({ length: 512 }),
	logo: varchar({ length: 512 }),
	description: text(),
	instructions: text(),
	displayOrder: integer("display_order"),
	gatewayConfig: text("gateway_config"),
	processingTime: varchar("processing_time", { length: 512 }),
	isActive: char("is_active", { length: 1 }),
	isMaintenance: char("is_maintenance", { length: 1 }),
	maintenanceMessage: text("maintenance_message"),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "payment_methods_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("payment_methods_method_code_key").on(table.methodCode),
]);

export const procedures = pgTable("procedures", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	label: varchar({ length: 512 }),
	description: varchar({ length: 512 }),
	avatar: varchar({ length: 512 }),
	userGroup: integer("user_group"),
	authGroup: text("auth_group"),
	folderParent: integer("folder_parent"),
	folder: text(),
	ptype: varchar({ length: 512 }),
	controller: varchar({ length: 512 }),
	tablename: varchar({ length: 512 }),
	yearField: varchar("year_field", { length: 512 }),
	isCreate: char("is_create", { length: 1 }),
	selectYear: char("select_year", { length: 1 }),
	setting: text(),
	displayOrder: integer("display_order"),
}, (table) => [
	foreignKey({
			columns: [table.userGroup],
			foreignColumns: [authGroup.id],
			name: "procedures_user_group_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("procedures_name_key").on(table.name),
]);

export const transactionType = pgTable("transaction_type", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 512 }).notNull(),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "transaction_type_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const realEstateAgentAssignment = pgTable("real_estate_agent_assignment", {
	id: serial().primaryKey().notNull(),
	realEstateId: integer("real_estate_id"),
	agentId: integer("agent_id"),
	commissionRate: numeric("commission_rate", { precision: 5, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	commissionAmount: bigint("commission_amount", { mode: "number" }),
	isPrimaryAgent: char("is_primary_agent", { length: 1 }),
	isExclusive: char("is_exclusive", { length: 1 }),
	assignmentType: varchar("assignment_type", { length: 512 }),
	territory: varchar({ length: 512 }),
	notes: text(),
	startDate: date("start_date"),
	endDate: date("end_date"),
	isActive: char("is_active", { length: 1 }),
	totalTransactions: integer("total_transactions"),
	successfulTransactions: integer("successful_transactions"),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.agentId],
			foreignColumns: [salesman.id],
			name: "real_estate_agent_assignment_agent_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "real_estate_agent_assignment_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.realEstateId],
			foreignColumns: [realEstate.id],
			name: "real_estate_agent_assignment_real_estate_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const realEstateStatus = pgTable("real_estate_status", {
	id: serial().primaryKey().notNull(),
	statusName: varchar("status_name", { length: 512 }).notNull(),
	statusCode: varchar("status_code", { length: 512 }),
	description: text(),
	colorCode: varchar("color_code", { length: 512 }),
	icon: varchar({ length: 512 }),
	displayOrder: integer("display_order"),
	showInResaBds: char("show_in_resa_bds", { length: 1 }),
	showInMyPosts: char("show_in_my_posts", { length: 1 }),
	showInAssignedBds: char("show_in_assigned_bds", { length: 1 }),
	allowView: char("allow_view", { length: 1 }),
	allowEdit: char("allow_edit", { length: 1 }),
	allowDelete: char("allow_delete", { length: 1 }),
	allowFavorite: char("allow_favorite", { length: 1 }),
	allowHold: char("allow_hold", { length: 1 }),
	allowDeposit: char("allow_deposit", { length: 1 }),
	allowChat: char("allow_chat", { length: 1 }),
	allowScheduleViewing: char("allow_schedule_viewing", { length: 1 }),
	allowUploadDocuments: char("allow_upload_documents", { length: 1 }),
	allowPause: char("allow_pause", { length: 1 }),
	allowReopen: char("allow_reopen", { length: 1 }),
	allowConfirmDeposit: char("allow_confirm_deposit", { length: 1 }),
	allowCancel: char("allow_cancel", { length: 1 }),
	allowRefund: char("allow_refund", { length: 1 }),
	allowRemove: char("allow_remove", { length: 1 }),
	allowSupplementDocs: char("allow_supplement_docs", { length: 1 }),
	permissionsJson: text("permissions_json"),
	isActive: char("is_active", { length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	allowCreateTransaction: char("allow_create_transaction", { length: 1 }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "real_estate_status_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("real_estate_status_status_code_key").on(table.statusCode),
]);

export const transactionNotification = pgTable("transaction_notification", {
	id: serial().primaryKey().notNull(),
	transactionId: integer("transaction_id"),
	recipientType: varchar("recipient_type", { length: 512 }),
	recipientId: integer("recipient_id"),
	notificationType: varchar("notification_type", { length: 512 }),
	title: varchar({ length: 512 }),
	tmessage: text(),
	priority: integer(),
	sendEmail: char("send_email", { length: 1 }),
	sendSms: char("send_sms", { length: 1 }),
	sendPush: char("send_push", { length: 1 }),
	sendInApp: char("send_in_app", { length: 1 }),
	emailSent: char("email_sent", { length: 1 }),
	smsSent: char("sms_sent", { length: 1 }),
	pushSent: char("push_sent", { length: 1 }),
	emailSentAt: timestamp("email_sent_at", { mode: 'string' }),
	smsSentAt: timestamp("sms_sent_at", { mode: 'string' }),
	pushSentAt: timestamp("push_sent_at", { mode: 'string' }),
	isRead: char("is_read", { length: 1 }),
	readAt: timestamp("read_at", { mode: 'string' }),
	scheduledAt: timestamp("scheduled_at", { mode: 'string' }),
	sentAt: timestamp("sent_at", { mode: 'string' }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "transaction_notification_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.recipientId],
			foreignColumns: [authUser.id],
			name: "transaction_notification_recipient_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.transactionId],
			foreignColumns: [realEstateTransaction.id],
			name: "transaction_notification_transaction_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const withdraw = pgTable("withdraw", {
	id: serial().primaryKey().notNull(),
	userBank: integer("user_bank"),
	amount: varchar({ length: 512 }),
	description: text(),
	tableName: text("table_name"),
	tableId: text("table_id"),
	implementer: varchar({ length: 512 }),
	transactionId: integer("transaction_id"),
	status: integer(),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.userBank],
			foreignColumns: [userBank.id],
			name: "withdraw_user_bank_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const reconciliationBatch = pgTable("reconciliation_batch", {
	id: serial().primaryKey().notNull(),
	batchCode: varchar("batch_code", { length: 512 }),
	batchName: varchar("batch_name", { length: 512 }),
	period: varchar({ length: 512 }),
	agentId: integer("agent_id"),
	totalTransactions: integer("total_transactions"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalAmount: bigint("total_amount", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalCommissionSeller: bigint("total_commission_seller", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalCommissionBuyer: bigint("total_commission_buyer", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalCommissionProject: bigint("total_commission_project", { mode: "number" }),
	batchStatus: varchar("batch_status", { length: 512 }),
	submittedAt: timestamp("submitted_at", { mode: 'string' }),
	processedAt: timestamp("processed_at", { mode: 'string' }),
	completedAt: timestamp("completed_at", { mode: 'string' }),
	processedBy: integer("processed_by"),
	notes: text(),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.agentId],
			foreignColumns: [salesman.id],
			name: "reconciliation_batch_agent_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "reconciliation_batch_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.processedBy],
			foreignColumns: [authUser.id],
			name: "reconciliation_batch_processed_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("reconciliation_batch_batch_code_key").on(table.batchCode),
]);

export const tmessageStatus = pgTable("tmessage_status", {
	id: serial().primaryKey().notNull(),
	tmessageId: integer("tmessage_id"),
	tmessageType: integer("tmessage_type"),
	equipment: text(),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.tmessageId],
			foreignColumns: [tmessage.id],
			name: "tmessage_status_tmessage_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.tmessageType],
			foreignColumns: [tmessageType.id],
			name: "tmessage_status_tmessage_type_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const userActivityLog = pgTable("user_activity_log", {
	id: serial().primaryKey().notNull(),
	authUser: integer("auth_user"),
	systemName: integer("system_name"),
	sessionNumber: integer("session_number"),
	lastTime: char("last_time", { length: 1 }),
	app: varchar({ length: 512 }),
	createdOn: timestamp("created_on", { mode: 'string' }),
	userAction: text("user_action"),
	tableName: text("table_name"),
	tableId: integer("table_id"),
}, (table) => [
	foreignKey({
			columns: [table.authUser],
			foreignColumns: [authUser.id],
			name: "user_activity_log_auth_user_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const verifyAgent = pgTable("verify_agent", {
	id: serial().primaryKey().notNull(),
	salesman: integer(),
	idCard: varchar("id_card", { length: 50 }),
	name: varchar({ length: 255 }),
	birthday: date(),
	sex: smallint(),
	address: text(),
	idDay: date("id_day"),
	idBy: varchar("id_by", { length: 255 }),
	legalDocumentType: integer("legal_document_type"),
	citizenIdFront: varchar("citizen_id_front", { length: 255 }),
	citizenIdBack: varchar("citizen_id_back", { length: 255 }),
	licenseFront: varchar("license_front", { length: 255 }),
	licenseBack: varchar("license_back", { length: 255 }),
	createdBy: integer("created_by").default(1).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	step: smallint(),
	cmndNumber: varchar("cmnd_number"),
}, (table) => [
	check("verify_agent_legal_document_type_check", sql`legal_document_type = ANY (ARRAY[1, 2])`),
	check("verify_agent_sex_check", sql`sex = ANY (ARRAY[0, 1, 2])`),
]);

export const customer = pgTable("customer", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 512 }),
	phone: varchar({ length: 512 }),
	email: varchar({ length: 512 }),
	birthday: date(),
	sex: varchar({ length: 512 }),
	customerType: varchar("customer_type", { length: 512 }),
	city: varchar({ length: 512 }),
	district: varchar({ length: 512 }),
	ward: varchar({ length: 512 }),
	cityName: varchar("city_name", { length: 512 }),
	districtName: varchar("district_name", { length: 512 }),
	wardName: varchar("ward_name", { length: 512 }),
	address: varchar({ length: 512 }),
	latlng: varchar({ length: 512 }),
	salesman: integer(),
	savedContacts: char("saved_contacts", { length: 1 }),
	aactive: char({ length: 1 }),
	startDate: date("start_date"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	createdBy: integer("created_by"),
	xtype: varchar({ length: 512 }),
	contactFacebook: varchar("contact_facebook"),
}, (table) => [
	foreignKey({
			columns: [table.salesman],
			foreignColumns: [salesman.id],
			name: "customer_salesman_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const loanPackage = pgTable("loan_package", {
	id: serial().primaryKey().notNull(),
	bank: integer(),
	interestRate: text("interest_rate"),
	termMonths: text("term_months"),
	maxTermMonths: text("max_term_months"),
	gracePeriod: text("grace_period"),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	interestRateFloat: text("interest_rate_float"),
	rose: text(),
	name: text(),
	status: varchar({ length: 20 }),
}, (table) => [
	foreignKey({
			columns: [table.bank],
			foreignColumns: [dbanks.id],
			name: "loan_package_bank_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const consultation = pgTable("consultation", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	email: varchar({ length: 100 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	authUserId: bigint("auth_user_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userSupport: bigint("user_support", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	propertyId: bigint("property_id", { mode: "number" }),
	budgetRange: numeric("budget_range", { precision: 15, scale:  2 }),
	aactive: boolean().default(true),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	fullName: varchar("full_name", { length: 100 }),
	phoneNumber: varchar("phone_number", { length: 20 }),
	customerId: integer("customer_id"),
	propertyType: text("property_type"),
	transactionType: text("transaction_type"),
	interestedCities: text("interested_cities"),
	interestedDistricts: text("interested_districts"),
	interestedWards: text("interested_wards"),
	interestedProjects: text("interested_projects"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	budgetMin: bigint("budget_min", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	budgetMax: bigint("budget_max", { mode: "number" }),
	areaMin: doublePrecision("area_min"),
	areaMax: doublePrecision("area_max"),
	bedroomsMin: integer("bedrooms_min"),
	bedroomsMax: integer("bedrooms_max"),
	bathroomsMin: integer("bathrooms_min"),
	floorsMin: integer("floors_min"),
	floorsMax: integer("floors_max"),
	preferredDirections: text("preferred_directions"),
	legalRequirements: text("legal_requirements"),
	furnitureRequirements: text("furniture_requirements"),
	note: text(),
	specialRequirements: text("special_requirements"),
	enablePushNotification: char("enable_push_notification", { length: 1 }),
	enableSmsNotification: char("enable_sms_notification", { length: 1 }),
	maxNotificationsPerDay: integer("max_notifications_per_day"),
	notificationSchedule: text("notification_schedule"),
	lastMatchedOn: timestamp("last_matched_on", { mode: 'string' }),
	totalSuggestionsSent: integer("total_suggestions_sent"),
	totalSuggestionsToday: integer("total_suggestions_today"),
	matchingCriteria: text("matching_criteria"),
	priorityScore: integer("priority_score"),
	demandStatus: varchar("demand_status", { length: 20 }),
	statusChangedOn: timestamp("status_changed_on", { mode: 'string' }),
	statusChangedBy: integer("status_changed_by"),
	statusReason: text("status_reason"),
	viewCount: integer("view_count"),
	contactCount: integer("contact_count"),
	lastContactedOn: timestamp("last_contacted_on", { mode: 'string' }),
	consultationType: varchar("consultation_type", { length: 20 }),
	createdBy: integer("created_by"),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	updatedBy: integer("updated_by"),
	status: varchar({ length: 5 }),
	bedrooms: text(),
	consultationCode: varchar("consultation_code"),
	interestedLocations: text("interested_locations"),
	postOfficeId: integer("post_office_id"),
	tagId: text("tag_id"),
}, (table) => [
	index("idx_consultation_created_on").using("btree", table.createdOn.asc().nullsLast().op("timestamp_ops")),
	index("idx_consultation_demand_status").using("btree", table.demandStatus.asc().nullsLast().op("text_ops")),
	index("idx_consultation_last_matched").using("btree", table.lastMatchedOn.asc().nullsLast().op("timestamp_ops")),
	index("idx_consultation_user_support").using("btree", table.userSupport.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.authUserId],
			foreignColumns: [authUser.id],
			name: "consultation_auth_user_id_fkey"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "consultation_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [customer.id],
			name: "consultation_customer_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.propertyId],
			foreignColumns: [realEstate.id],
			name: "consultation_property_id_fkey"
		}),
	foreignKey({
			columns: [table.statusChangedBy],
			foreignColumns: [authUser.id],
			name: "consultation_status_changed_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [authUser.id],
			name: "consultation_updated_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userSupport],
			foreignColumns: [authUser.id],
			name: "consultation_user_support_fkey"
		}),
]);

export const folder = pgTable("folder", {
	id: serial().primaryKey().notNull(),
	parent: integer(),
	name: varchar({ length: 255 }),
	label: varchar({ length: 512 }),
	publish: char({ length: 1 }),
	description: text(),
	avatar: char({ length: 512 }),
	setting: text(),
	layout: char({ length: 512 }),
	urlLink: char("url_link", { length: 512 }),
	displayOrder: integer("display_order"),
}, (table) => [
	foreignKey({
			columns: [table.parent],
			foreignColumns: [table.id],
			name: "folder_parent_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("folder_name_key").on(table.name),
]);

export const archives = pgTable("archives", {
	id: serial().primaryKey().notNull(),
	folder: integer(),
	name: varchar({ length: 512 }),
	description: text(),
	daystart: date(),
	dayend: date(),
	userSigned: varchar("user_signed", { length: 512 }),
	userOffice: varchar("user_office", { length: 512 }),
	orgPublish: varchar("org_publish", { length: 512 }),
	publishOn: timestamp("publish_on", { mode: 'string' }),
	expiredOn: timestamp("expired_on", { mode: 'string' }),
	createdOn: timestamp("created_on", { mode: 'string' }),
	createdBy: integer("created_by"),
	displayOrder: integer("display_order"),
	fieldType: integer("field_type"),
	htmlcontent: text(),
}, (table) => [
	foreignKey({
			columns: [table.folder],
			foreignColumns: [folder.id],
			name: "archives_folder_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const authMembership = pgTable("auth_membership", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id"),
	groupId: integer("group_id"),
}, (table) => [
	index("idx_auth_membership_user_group").using("btree", table.userId.asc().nullsLast().op("int4_ops"), table.groupId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.groupId],
			foreignColumns: [authGroup.id],
			name: "auth_membership_group_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [authUser.id],
			name: "auth_membership_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const authPermission = pgTable("auth_permission", {
	id: serial().primaryKey().notNull(),
	groupId: integer("group_id"),
	name: varchar({ length: 512 }),
	tableName: varchar("table_name", { length: 512 }),
	recordId: integer("record_id"),
}, (table) => [
	foreignKey({
			columns: [table.groupId],
			foreignColumns: [authGroup.id],
			name: "auth_permission_group_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const dbank = pgTable("dbank", {
	id: serial().primaryKey().notNull(),
	bankName: varchar("bank_name").notNull(),
	bankCode: varchar("bank_code").notNull(),
	bankLogo: varchar("bank_logo"),
	isActive: boolean("is_active").default(true),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "dbank_created_by_fkey"
		}),
]);

export const dbankTransactionsHistorys = pgTable("dbank_transactions_historys", {
	id: serial().primaryKey().notNull(),
	transactionId: integer("transaction_id"),
	transactionType: varchar("transaction_type", { length: 512 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	transactionAmount: bigint("transaction_amount", { mode: "number" }),
	transactionDate: timestamp("transaction_date", { mode: 'string' }),
	transactionStatus: varchar("transaction_status", { length: 512 }),
	transactionDescription: text("transaction_description"),
	transactionReference: varchar("transaction_reference", { length: 512 }),
	transactionNotes: text("transaction_notes"),
	transactionFiles: varchar("transaction_files", { length: 512 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "dbank_transactions_historys_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.transactionId],
			foreignColumns: [realEstateTransaction.id],
			name: "dbank_transactions_historys_transaction_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const smsBank = pgTable("sms_bank", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }),
	sms: text(),
	tableName: varchar("table_name", { length: 100 }),
	tableId: integer("table_id"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	numMoney: bigint("num_money", { mode: "number" }),
	noteInternal: text("note_internal"),
	autoInsert: boolean("auto_insert").default(false),
	autoCatch: boolean("auto_catch").default(false),
	payConfirm: boolean("pay_confirm").default(false),
	accountantCheck: boolean("accountant_check").default(false),
	validType: integer("valid_type"),
	status: boolean().default(false),
	createdOn: timestamp("created_on", { mode: 'string' }).defaultNow(),
	hiddenSms: boolean("hidden_sms"),
	isActive: boolean("is_active"),
	postOfficeId: integer("post_office_id"),
});

export const authGroup = pgTable("auth_group", {
	id: serial().primaryKey().notNull(),
	parent: integer(),
	role: varchar({ length: 512 }),
	email: varchar({ length: 512 }),
	description: text(),
	displayOrder: integer("display_order"),
	atype: varchar({ length: 512 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	aactive: boolean().default(true),
	postOffice: integer("post_office"),
}, (table) => [
	foreignKey({
			columns: [table.parent],
			foreignColumns: [table.id],
			name: "auth_group_parent_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.postOffice],
			foreignColumns: [postOffice.id],
			name: "fk_auth_group_post_office"
		}),
]);

export const dcontent = pgTable("dcontent", {
	id: serial().primaryKey().notNull(),
	folder: integer(),
	dtable: varchar(),
	tableId: integer("table_id"),
	link: varchar(),
	name: varchar(),
	avatar: varchar(),
	description: text(),
	publishOn: timestamp("publish_on", { mode: 'string' }),
	expiredOn: timestamp("expired_on", { mode: 'string' }),
	metaTitle: varchar("meta_title"),
	metaDescription: varchar("meta_description"),
	metaKeywords: varchar("meta_keywords"),
	textcontent: text(),
	languague: varchar(),
	publisher: varchar(),
	creator: varchar(),
	createdOn: timestamp("created_on", { mode: 'string' }),
	modifiedOn: timestamp("modified_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.folder],
			foreignColumns: [folder.id],
			name: "dcontent_folder_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const smsBankSession = pgTable("sms_bank_session", {
	id: serial().primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	paySession: bigint("pay_session", { mode: "number" }),
	smsBank: text("sms_bank"),
	tableName: text("table_name"),
	tableId: integer("table_id"),
	note: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalMoney: bigint("total_money", { mode: "number" }),
	validationType: integer("validation_type"),
	accountantCheck: boolean("accountant_check").default(false),
	createdOn: timestamp("created_on", { mode: 'string' }).defaultNow(),
	updatedOn: timestamp("updated_on", { mode: 'string' }).defaultNow(),
}, (table) => [
	check("sms_bank_session_validation_type_check", sql`validation_type = ANY (ARRAY[1, 2])`),
]);

export const favoriteGroup = pgTable("favorite_group", {
	id: serial().primaryKey().notNull(),
	title: text(),
	authUser: integer("auth_user"),
	images: varchar({ length: 512 }),
	description: varchar({ length: 512 }),
	aactive: char({ length: 1 }),
	defaultGroup: char("default_group", { length: 1 }),
	createdOn: timestamp("created_on", { mode: 'string' }),
});

export const commissionPolicy = pgTable("commission_policy", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	tableName: text("table_name"),
	tableId: text("table_id"),
	zoneOfProject: text("zone_of_project"),
	cityId: text("city_id"),
	districtId: text("district_id"),
	wardId: text("ward_id"),
	validFrom: date("valid_from"),
	validTo: date("valid_to"),
	aactive: boolean().default(true),
	commissionOwnerPercent: numeric("commission_owner_percent", { precision: 5, scale:  2 }).default('0.0'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	commissionOwnerFixed: bigint("commission_owner_fixed", { mode: "number" }).default(0),
	commissionCustomerPercent: numeric("commission_customer_percent", { precision: 5, scale:  2 }).default('0.0'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	commissionCustomerFixed: bigint("commission_customer_fixed", { mode: "number" }).default(0),
	bonusOwnerPercent: numeric("bonus_owner_percent", { precision: 5, scale:  2 }).default('0.0'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	bonusOwnerFixed: bigint("bonus_owner_fixed", { mode: "number" }).default(0),
	bonusCustomerPercent: numeric("bonus_customer_percent", { precision: 5, scale:  2 }).default('0.0'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	bonusCustomerFixed: bigint("bonus_customer_fixed", { mode: "number" }).default(0),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	roundingStep: bigint("rounding_step", { mode: "number" }).default(100000),
	roundingMode: smallint("rounding_mode").default(1),
	depositType: text("deposit_type").default('1'),
	depositMode: smallint("deposit_mode").default(1),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	depositAmountFixed: bigint("deposit_amount_fixed", { mode: "number" }).default(0),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	depositAmountMin: bigint("deposit_amount_min", { mode: "number" }).default(0),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	depositAmountMax: bigint("deposit_amount_max", { mode: "number" }).default(0),
	depositPercentFixed: numeric("deposit_percent_fixed", { precision: 5, scale:  2 }).default('0.0'),
	depositPercentMin: numeric("deposit_percent_min", { precision: 5, scale:  2 }).default('0.0'),
	depositPercentMax: numeric("deposit_percent_max", { precision: 5, scale:  2 }).default('0.0'),
	depositEditable: boolean("deposit_editable").default(false),
	notes: text(),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).defaultNow(),
	updatedOn: timestamp("updated_on", { mode: 'string' }).defaultNow(),
	transactionType: smallint("transaction_type").default(1),
	commissionOwnerMode: smallint("commission_owner_mode").default(1),
	commissionOwnerValue: doublePrecision("commission_owner_value"),
	commissionCustomerMode: smallint("commission_customer_mode").default(1),
	commissionCustomerValue: doublePrecision("commission_customer_value"),
	bonusOwnerMode: smallint("bonus_owner_mode").default(1),
	bonusOwnerValue: doublePrecision("bonus_owner_value"),
	bonusCustomerMode: smallint("bonus_customer_mode").default(1),
	bonusCustomerValue: doublePrecision("bonus_customer_value"),
});

export const workMember = pgTable("work_member", {
	id: serial().primaryKey().notNull(),
	workId: integer("work_id").notNull(),
	salesmanId: integer("salesman_id").notNull(),
	role: varchar({ length: 512 }),
	status: varchar({ length: 512 }),
	assignedAt: timestamp("assigned_at", { mode: 'string' }),
	confirmedAt: timestamp("confirmed_at", { mode: 'string' }),
	startedAt: timestamp("started_at", { mode: 'string' }),
	note: text(),
	permissionLevel: varchar("permission_level", { length: 512 }),
	notificationEnabled: char("notification_enabled", { length: 1 }),
	isActive: char("is_active", { length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "work_member_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.salesmanId],
			foreignColumns: [salesman.id],
			name: "work_member_salesman_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.workId],
			foreignColumns: [realEstateWork.id],
			name: "work_member_work_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const realEstateSaleDetail = pgTable("real_estate_sale_detail", {
	id: bigserial({ mode: "bigint" }).notNull(),
	realEstateSale: integer("real_estate_sale").notNull(),
	realEstateId: integer("real_estate_id").notNull(),
	salesmanId: integer("salesman_id").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	depositAmount: bigint("deposit_amount", { mode: "number" }).default(0),
	status: integer().default(1).notNull(),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	depositType: integer("deposit_type"),
	customerId: integer("customer_id"),
	notes: text(),
	realEstateTransactionId: integer("real_estate_transaction_id"),
	realEstateWorkId: integer("real_estate_work_id"),
});

export const realEstateSale = pgTable("real_estate_sale", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	title: varchar({ length: 255 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	projectId: bigint("project_id", { mode: "number" }).notNull(),
	visibilityLevel: integer("visibility_level").default(1).notNull(),
	realEstateIds: text("real_estate_ids"),
	startAt: timestamp("start_at", { mode: 'string' }).notNull(),
	endAt: timestamp("end_at", { mode: 'string' }),
	lockWaitExpected: integer("lock_wait_expected").default(900).notNull(),
	lockWaitActual: integer("lock_wait_actual").default(1020).notNull(),
	status: integer().default(1).notNull(),
	notes: text(),
	requiredInforVerify: boolean("required_infor_verify").default(false).notNull(),
	registrationType: integer("registration_type").default(1).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	bank: bigint({ mode: "number" }),
	bankAccName: text("bank_acc_name"),
	bankAccNumber: text("bank_acc_number"),
	bankBranch: text("bank_branch"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	createdBy: bigint("created_by", { mode: "number" }),
	createdOn: timestamp("created_on", { mode: 'string' }).defaultNow().notNull(),
	updatedOn: timestamp("updated_on", { mode: 'string' }).defaultNow().notNull(),
	zoneOfProject: text("zone_of_project"),
	contentTransfer: text("content_transfer"),
	role: integer().default(1),
	extensionAt: timestamp("extension_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.bank],
			foreignColumns: [dbanks.id],
			name: "real_estate_sale_bank_fkey"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "real_estate_sale_created_by_fkey"
		}),
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [project.id],
			name: "real_estate_sale_project_id_fkey"
		}),
	check("chk_sale_time_range", sql`end_at >= start_at`),
	check("real_estate_sale_required_sales_registration_check", sql`registration_type = ANY (ARRAY[1, 2, 3])`),
	check("real_estate_sale_status_check", sql`status = ANY (ARRAY[1, 2, 3, 4, 5, 9])`),
	check("real_estate_sale_visibility_level_check", sql`visibility_level = ANY (ARRAY[1, 2, 3])`),
]);

export const realEstateSaleRegister = pgTable("real_estate_sale_register", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	projectId: bigint("project_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	realEstateSale: bigint("real_estate_sale", { mode: "number" }).notNull(),
	visibilityLevel: integer("visibility_level").default(2).notNull(),
	salesmanIds: text("salesman_ids").notNull(),
	status: integer().default(1).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	createdBy: bigint("created_by", { mode: "number" }),
	createdOn: timestamp("created_on", { mode: 'string' }).defaultNow().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	approvalBy: bigint("approval_by", { mode: "number" }),
	approvalOn: timestamp("approval_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "real_estate_sale_register_created_by_fkey"
		}),
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [project.id],
			name: "real_estate_sale_register_project_id_fkey"
		}),
	foreignKey({
			columns: [table.realEstateSale],
			foreignColumns: [realEstateSale.id],
			name: "real_estate_sale_register_real_estate_sale_fkey"
		}),
	check("real_estate_sale_register_status_check", sql`status = ANY (ARRAY[1, 2, 9])`),
	check("real_estate_sale_register_visibility_level_check", sql`visibility_level = ANY (ARRAY[2, 3])`),
]);

export const jackpotSalesmanCriteria = pgTable("jackpot_salesman_criteria", {
	id: serial().primaryKey().notNull(),
	jackpotConfigId: integer("jackpot_config_id").notNull(),
	salesmanId: integer("salesman_id").notNull(),
	realEstateSaleId: integer("real_estate_sale_id"),
	notes: text(),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	isActive: boolean("is_active"),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "jackpot_salesman_criteria_created_by_fkey"
		}),
	foreignKey({
			columns: [table.jackpotConfigId],
			foreignColumns: [jackpotConfig.id],
			name: "jackpot_salesman_criteria_jackpot_config_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.realEstateSaleId],
			foreignColumns: [realEstateSale.id],
			name: "jackpot_salesman_criteria_real_estate_sale_id_fkey"
		}),
	foreignKey({
			columns: [table.salesmanId],
			foreignColumns: [salesman.id],
			name: "jackpot_salesman_criteria_salesman_id_fkey"
		}),
]);

export const jackpotSalesmanCriteriaValue = pgTable("jackpot_salesman_criteria_value", {
	id: serial().primaryKey().notNull(),
	jackpotSalesmanCriteriaId: integer("jackpot_salesman_criteria_id").notNull(),
	jackpotRankingCriteriaId: integer("jackpot_ranking_criteria_id").notNull(),
	vvalue: text().notNull(),
	isActive: boolean("is_active").default(true),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).defaultNow(),
	updatedOn: timestamp("updated_on", { mode: 'string' }).defaultNow(),
}, (table) => [
	index("idx_jackpot_salesman_criteria_value_active").using("btree", table.isActive.asc().nullsLast().op("bool_ops")).where(sql`(is_active = true)`),
	index("idx_jackpot_salesman_criteria_value_criteria_id").using("btree", table.jackpotSalesmanCriteriaId.asc().nullsLast().op("int4_ops")),
	index("idx_jackpot_salesman_criteria_value_ranking_id").using("btree", table.jackpotRankingCriteriaId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.jackpotSalesmanCriteriaId],
			foreignColumns: [jackpotSalesmanCriteria.id],
			name: "jackpot_salesman_criteria_val_jackpot_salesman_criteria_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.jackpotRankingCriteriaId],
			foreignColumns: [jackpotRankingCriteria.id],
			name: "jackpot_salesman_criteria_valu_jackpot_ranking_criteria_id_fkey"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "jackpot_salesman_criteria_value_created_by_fkey"
		}),
]);

export const jackpotRewardDistribution = pgTable("jackpot_reward_distribution", {
	id: serial().primaryKey().notNull(),
	jackpotConfigId: integer("jackpot_config_id").notNull(),
	salesmanId: integer("salesman_id").notNull(),
	rankingPosition: integer("ranking_position").default(0),
	totalScore: numeric("total_score", { precision: 10, scale:  2 }).default('0.0'),
	rewardAmount: numeric("reward_amount", { precision: 18, scale:  2 }).default('0.0').notNull(),
	rewardPercentage: numeric("reward_percentage", { precision: 5, scale:  2 }).default('0.0'),
	calculationPeriodStart: date("calculation_period_start"),
	calculationPeriodEnd: date("calculation_period_end"),
	calculatedOn: timestamp("calculated_on", { mode: 'string' }),
	status: integer().default(0),
	paidOn: timestamp("paid_on", { mode: 'string' }),
	paidBy: integer("paid_by"),
	notes: text(),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).defaultNow(),
	updatedOn: timestamp("updated_on", { mode: 'string' }).defaultNow(),
}, (table) => [
	index("idx_jackpot_reward_distribution_created_by").using("btree", table.createdBy.asc().nullsLast().op("int4_ops")),
	index("idx_jackpot_reward_distribution_jackpot_config_id").using("btree", table.jackpotConfigId.asc().nullsLast().op("int4_ops")),
	index("idx_jackpot_reward_distribution_paid_by").using("btree", table.paidBy.asc().nullsLast().op("int4_ops")),
	index("idx_jackpot_reward_distribution_salesman_id").using("btree", table.salesmanId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "jackpot_reward_distribution_created_by_fkey"
		}),
	foreignKey({
			columns: [table.jackpotConfigId],
			foreignColumns: [jackpotConfig.id],
			name: "jackpot_reward_distribution_jackpot_config_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.paidBy],
			foreignColumns: [authUser.id],
			name: "jackpot_reward_distribution_paid_by_fkey"
		}),
	foreignKey({
			columns: [table.salesmanId],
			foreignColumns: [salesman.id],
			name: "jackpot_reward_distribution_salesman_id_fkey"
		}),
	check("jackpot_reward_distribution_status_check", sql`status = ANY (ARRAY[0, 1, 2, 9])`),
]);

export const locations = pgTable("locations", {
	id: serial().primaryKey().notNull(),
	nId: varchar("n_id"),
	nParentid: varchar("n_parentid"),
	nName: varchar("n_name"),
	nLatlng: varchar("n_latlng"),
	nNormalizedname: varchar("n_normalizedname"),
	nAddress: varchar("n_address"),
	nType: varchar("n_type"),
	nLevel: varchar("n_level"),
	nCountry: varchar("n_country"),
	nCreateddate: varchar("n_createddate"),
	nModifieddate: varchar("n_modifieddate"),
	nStatus: varchar("n_status"),
	isPartition: varchar("is_partition"),
	cityId: varchar("city_id"),
	districtId: varchar("district_id"),
	wardId: varchar("ward_id"),
	cityName: varchar("city_name"),
	districtName: varchar("district_name"),
	wardName: varchar("ward_name"),
	totalRate: numeric("total_rate", { precision: 5, scale:  2 }).default('0.0'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalAmount: bigint("total_amount", { mode: "number" }).default(0),
	rateSeller: numeric("rate_seller", { precision: 5, scale:  2 }).default('0.0'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountSeller: bigint("amount_seller", { mode: "number" }).default(0),
	rateBuyer: numeric("rate_buyer", { precision: 5, scale:  2 }).default('0.0'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountBuyer: bigint("amount_buyer", { mode: "number" }).default(0),
	rateProject: numeric("rate_project", { precision: 5, scale:  2 }).default('0.0'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountProject: bigint("amount_project", { mode: "number" }).default(0),
	aactive: boolean().default(true),
	updateOn: timestamp("update_on", { mode: 'string' }),
	createdOn: timestamp("created_on", { mode: 'string' }),
	createdBy: integer("created_by"),
	decodeAddress: varchar("decode_address"),
	displayOrder: integer("display_order").default(100),
	nSlug: varchar("n_slug"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	searchCount: bigint("search_count", { mode: "number" }).default(8386),
	mergedintoid: varchar(),
	nSlugV1: varchar("n_slug_v1"),
}, (table) => [
	index("idx_locations_nid").using("btree", table.nId.asc().nullsLast().op("text_ops")),
	index("locations_n_id_idx").using("btree", table.nId.asc().nullsLast().op("text_ops"), table.nParentid.asc().nullsLast().op("text_ops"), table.nName.asc().nullsLast().op("text_ops"), table.nLevel.asc().nullsLast().op("text_ops")),
	check("locations_is_partition_check", sql`(is_partition)::text = ANY (ARRAY[('v1'::character varying)::text, ('v2'::character varying)::text, ('v3'::character varying)::text, ('v3.5'::character varying)::text, ('v4'::character varying)::text, ('v5'::character varying)::text, ('v6'::character varying)::text, ('v7'::character varying)::text, ('v8'::character varying)::text])`),
]);

export const logError = pgTable("log_error", {
	id: serial().primaryKey().notNull(),
	fileContain: text("file_contain"),
	funtion: text(),
	typeError: text("type_error"),
	contentError: text("content_error"),
	lineError: integer("line_error"),
	sourceError: text("source_error"),
	authUser: integer("auth_user"),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.authUser],
			foreignColumns: [authUser.id],
			name: "log_error_auth_user_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const mediaUpload = pgTable("media_upload", {
	id: serial().primaryKey().notNull(),
	uuid: varchar({ length: 36 }).notNull(),
	s3Url: varchar("s3_url", { length: 1024 }),
	s3Key: varchar("s3_key", { length: 512 }),
	fileName: varchar("file_name", { length: 255 }),
	fileExt: varchar("file_ext", { length: 50 }),
	mimeType: varchar("mime_type", { length: 100 }),
	fileSize: integer("file_size"),
	actionType: varchar("action_type", { length: 50 }).default('real_estate_verify'),
	realEstateId: integer("real_estate_id"),
	verifiedBy: integer("verified_by"),
	verifiedAt: timestamp("verified_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	notes: text(),
	isActive: boolean("is_active").default(true),
}, (table) => [
	foreignKey({
			columns: [table.realEstateId],
			foreignColumns: [realEstate.id],
			name: "media_upload_real_estate_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.verifiedBy],
			foreignColumns: [authUser.id],
			name: "media_upload_verified_by_fkey"
		}).onDelete("set null"),
	unique("media_upload_uuid_key").on(table.uuid),
	check("media_upload_action_type_check", sql`(action_type)::text = ANY (ARRAY[('real_estate_verify'::character varying)::text, ('user_verify'::character varying)::text, ('other'::character varying)::text])`),
]);

export const logTracking = pgTable("log_tracking", {
	id: serial().primaryKey().notNull(),
	tablename: text(),
	tableId: integer("table_id"),
	timeStamp: timestamp("time_stamp", { mode: 'string' }),
	listTableId: text("list_table_id"),
	clientIp: text("client_ip"),
	authUser: integer("auth_user"),
	status: integer(),
	description: text(),
	aactive: char({ length: 1 }),
	isSecurity: varchar("is_security", { length: 512 }),
}, (table) => [
	index("idx_log_tracking_re").using("btree", table.tablename.asc().nullsLast().op("int4_ops"), table.tableId.asc().nullsLast().op("bpchar_ops"), table.aactive.asc().nullsLast().op("bpchar_ops")),
]);

export const contractVerificationOtp = pgTable("contract_verification_otp", {
	id: serial().primaryKey().notNull(),
	contractId: integer("contract_id").notNull(),
	phone: varchar({ length: 50 }).notNull(),
	purpose: integer().default(1).notNull(),
	otpHash: varchar("otp_hash", { length: 255 }).notNull(),
	salt: varchar({ length: 255 }).notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	attempts: integer().default(0),
	maxAttempts: integer("max_attempts").default(5),
	status: integer().default(1).notNull(),
	channel: varchar({ length: 50 }).default('zalo'),
	sentAt: timestamp("sent_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	verifiedAt: timestamp("verified_at", { mode: 'string' }),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	check("chk_contract_verification_otp_purpose", sql`purpose = ANY (ARRAY[1, 2, 3, 4, 5])`),
	check("chk_contract_verification_otp_status", sql`status = ANY (ARRAY[1, 2, 3, 4])`),
]);

export const officePermissionSet = pgTable("office_permission_set", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	nameCode: varchar("name_code", { length: 20 }),
	description: text(),
	isDefault: boolean("is_default").default(false),
	basedOnSetId: integer("based_on_set_id"),
	aactive: boolean().default(true),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by"),
}, (table) => [
	index("idx_permission_set_active").using("btree", table.aactive.asc().nullsLast().op("bool_ops")),
	index("idx_permission_set_based_on").using("btree", table.basedOnSetId.asc().nullsLast().op("int4_ops")),
	index("idx_permission_set_default").using("btree", table.isDefault.asc().nullsLast().op("bool_ops")).where(sql`(is_default = true)`),
	foreignKey({
			columns: [table.basedOnSetId],
			foreignColumns: [table.id],
			name: "office_permission_set_based_on_set_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "office_permission_set_created_by_fkey"
		}),
]);

export const contract = pgTable("contract", {
	id: bigserial({ mode: "bigint" }).notNull(),
	infoOffice: integer("info_office"),
	verifyAgent: integer("verify_agent"),
	realEstateSalesman: integer("real_estate_salesman"),
	contractType: integer("contract_type").default(1).notNull(),
	signingMethod: integer("signing_method").default(1).notNull(),
	contractNo: integer("contract_no"),
	contractYear: integer("contract_year"),
	signedAt: timestamp("signed_at", { mode: 'string' }),
	signatureImage: text("signature_image"),
	status: integer().default(1),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	consultationId: integer("consultation_id"),
	transactionId: integer("transaction_id"),
	contractCode: varchar("contract_code", { length: 255 }),
	postOfficeId: integer("post_office_id"),
	assignedTo: integer("assigned_to"),
});

export const infoOffice = pgTable("info_office", {
	id: bigserial({ mode: "bigint" }).notNull(),
	companyName: varchar("company_name", { length: 255 }).notNull(),
	businessCode: varchar("business_code", { length: 255 }),
	companyAddress: text("company_address"),
	bank: integer(),
	bankName: varchar("bank_name", { length: 255 }),
	bankAccountNumber: varchar("bank_account_number", { length: 255 }),
	bankBranch: varchar("bank_branch", { length: 255 }),
	companyRepresentative: varchar("company_representative", { length: 255 }),
	positionRepresentative: varchar("position_representative", { length: 255 }),
	office: varchar({ length: 255 }),
	signatureImage: text("signature_image"),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	officeCode: varchar("office_code"),
	postOfficeId: integer("post_office_id"),
	authorizationNumber: varchar("authorization_number"),
});

export const officeTerritory = pgTable("office_territory", {
	id: serial().primaryKey().notNull(),
	postOfficeId: integer("post_office_id").notNull(),
	territoryType: integer("territory_type").default(1),
	city: varchar({ length: 20 }),
	district: varchar({ length: 20 }),
	ward: varchar({ length: 20 }),
	coordinates: text(),
	priority: integer().default(1),
	startDate: date("start_date"),
	endDate: date("end_date"),
	aactive: boolean().default(true),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by"),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	wardName: varchar("ward_name", { length: 100 }),
	cityName: varchar("city_name", { length: 100 }),
}, (table) => [
	index("idx_territory_active").using("btree", table.aactive.asc().nullsLast().op("bool_ops")),
	index("idx_territory_city").using("btree", table.city.asc().nullsLast().op("text_ops")),
	index("idx_territory_dates").using("btree", table.startDate.asc().nullsLast().op("date_ops"), table.endDate.asc().nullsLast().op("date_ops")),
	index("idx_territory_district").using("btree", table.city.asc().nullsLast().op("text_ops"), table.district.asc().nullsLast().op("text_ops")),
	index("idx_territory_office").using("btree", table.postOfficeId.asc().nullsLast().op("int4_ops")),
	index("idx_territory_type").using("btree", table.territoryType.asc().nullsLast().op("int4_ops")),
	index("idx_territory_ward").using("btree", table.city.asc().nullsLast().op("text_ops"), table.district.asc().nullsLast().op("text_ops"), table.ward.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "office_territory_created_by_fkey"
		}),
	foreignKey({
			columns: [table.postOfficeId],
			foreignColumns: [postOffice.id],
			name: "office_territory_post_office_id_fkey"
		}).onDelete("cascade"),
	check("office_territory_territory_type_check", sql`territory_type = ANY (ARRAY[1, 2, 3, 4])`),
]);

export const realEstate = pgTable("real_estate", {
	id: serial().primaryKey().notNull(),
	title: varchar().notNull(),
	post: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	price: bigint({ mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	minPrice: bigint("min_price", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	maxPrice: bigint("max_price", { mode: "number" }),
	priceDescription: varchar("price_description"),
	bedrooms: integer(),
	bathrooms: integer(),
	floors: integer(),
	propertyType: varchar("property_type"),
	propertyTypeId: integer("property_type_id"),
	houseDirection: varchar("house_direction"),
	yearBuilt: varchar("year_built"),
	transactionType: integer("transaction_type").default(1),
	city: varchar(),
	cityId: varchar("city_id"),
	district: varchar(),
	districtId: varchar("district_id"),
	ward: varchar(),
	wardId: varchar("ward_id"),
	streetName: varchar("street_name"),
	streetAddress: varchar("street_address"),
	googleMapsUrl: varchar("google_maps_url"),
	latlng: varchar(),
	ownershipStatus: varchar("ownership_status"),
	contactName: varchar("contact_name"),
	contactPhone: varchar("contact_phone"),
	contactEmail: varchar("contact_email"),
	images: text(),
	isFeatured: boolean("is_featured").default(false),
	isVerified: boolean("is_verified").default(false),
	viewCount: integer("view_count").default(0),
	aactive: boolean().default(true),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	backupPhone: varchar("backup_phone", { length: 512 }),
	videoUrl: varchar("video_url", { length: 512 }),
	sourcePost: varchar("source_post", { length: 512 }),
	slug: varchar({ length: 512 }),
	description: text(),
	mainImage: text("main_image"),
	dataJson: text("data_json"),
	priceHistory: text("price_history"),
	balconyDirection: varchar("balcony_direction", { length: 512 }),
	rateSeller: numeric("rate_seller", { precision: 5, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountSeller: bigint("amount_seller", { mode: "number" }),
	rateBuyer: numeric("rate_buyer", { precision: 5, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountBuyer: bigint("amount_buyer", { mode: "number" }),
	rateProject: numeric("rate_project", { precision: 5, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountProject: bigint("amount_project", { mode: "number" }),
	ownerId: integer("owner_id"),
	customerId: integer("customer_id"),
	legalDocumentUrl: text("legal_document_url"),
	createdTime: timestamp("created_time", { mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	returnPrice: bigint("return_price", { mode: "number" }),
	totalRate: numeric("total_rate", { precision: 5, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalAmount: bigint("total_amount", { mode: "number" }),
	project: varchar({ length: 512 }),
	statusId: integer("status_id"),
	status: varchar({ length: 512 }),
	zoneOfProject: varchar("zone_of_project", { length: 512 }),
	managementFee: integer("management_fee"),
	numOfFloors: integer("num_of_floors"),
	frontage: integer(),
	buildingDensity: varchar("building_density", { length: 512 }),
	landDirection: varchar("land_direction", { length: 512 }),
	ceilingHeight: integer("ceiling_height"),
	doorSize: integer("door_size"),
	houseNumber: varchar("house_number", { length: 512 }),
	hammlet: varchar({ length: 512 }),
	alley: varchar({ length: 512 }),
	pricePerMeter: integer("price_per_meter"),
	furniture: varchar({ length: 512 }),
	roadWidth: integer("road_width"),
	frontageWidth: integer("frontage_width"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	bonusAmt: bigint("bonus_amt", { mode: "number" }),
	htmlContent: text("html_content"),
	contactFacebook: varchar("contact_facebook", { length: 512 }),
	area: doublePrecision(),
	legalDocumentType: text("legal_document_type"),
	realEstateCode: varchar("real_estate_code", { length: 512 }),
	apartmentCode: varchar("apartment_code", { length: 512 }),
	streetSlug: varchar("street_slug", { length: 512 }),
	street: integer(),
	isChecked: boolean("is_checked").default(false),
	checkedStatus: integer("checked_status").default(0),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	vatAmount: bigint("vat_amount", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	maintenanceFund: bigint("maintenance_fund", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	priceInclVatMaintenance: bigint("price_incl_vat_maintenance", { mode: "number" }),
	sourceUrl: varchar("source_url", { length: 512 }),
	realEstateSalesman: integer("real_estate_salesman"),
	newWard: varchar("new_ward"),
	newProvince: varchar("new_province"),
}, (table) => [
	index("idx_city_street").using("btree", table.cityId.asc().nullsLast().op("text_ops"), table.streetSlug.asc().nullsLast().op("text_ops")),
	index("idx_re_aactive_created_time_id").using("btree", table.aactive.asc().nullsLast().op("timestamp_ops"), table.createdTime.desc().nullsFirst().op("timestamp_ops"), table.id.desc().nullsFirst().op("int4_ops")),
	index("idx_re_area").using("btree", table.area.asc().nullsLast().op("float8_ops")),
	index("idx_re_city_id").using("btree", table.cityId.asc().nullsLast().op("text_ops")),
	index("idx_re_code_lower").using("btree", sql`lower((real_estate_code)::text)`),
	index("idx_re_district_id").using("btree", table.districtId.asc().nullsLast().op("text_ops")),
	index("idx_re_frontage_width").using("btree", table.frontageWidth.asc().nullsLast().op("int4_ops")),
	index("idx_re_min_price").using("btree", table.minPrice.asc().nullsLast().op("int8_ops")),
	index("idx_re_property_type_id").using("btree", table.propertyTypeId.asc().nullsLast().op("int4_ops")),
	index("idx_re_status_id").using("btree", table.statusId.asc().nullsLast().op("int4_ops")),
	index("idx_re_title_trgm").using("gin", table.title.asc().nullsLast().op("gin_trgm_ops")),
	index("idx_re_transaction_type").using("btree", table.transactionType.asc().nullsLast().op("int4_ops")),
	index("idx_re_ward_id").using("btree", table.wardId.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_area").using("btree", table.area.asc().nullsLast().op("float8_ops")),
	index("idx_real_estate_city").using("btree", table.city.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_city_id").using("btree", table.cityId.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_code").using("btree", table.realEstateCode.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_created_on").using("btree", table.createdOn.desc().nullsFirst().op("timestamp_ops")),
	index("idx_real_estate_created_time").using("btree", table.createdTime.desc().nullsFirst().op("timestamp_ops")),
	index("idx_real_estate_customer_id").using("btree", table.customerId.asc().nullsLast().op("int4_ops")),
	index("idx_real_estate_district").using("btree", table.district.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_district_id").using("btree", table.districtId.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_house_direction").using("btree", table.houseDirection.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_id_created_time").using("btree", table.id.asc().nullsLast().op("int4_ops"), table.createdTime.asc().nullsLast().op("int4_ops")),
	index("idx_real_estate_is_featured").using("btree", table.isFeatured.asc().nullsLast().op("bool_ops")),
	index("idx_real_estate_is_verified").using("btree", table.isVerified.asc().nullsLast().op("bool_ops")),
	index("idx_real_estate_land_direction").using("btree", table.landDirection.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_owner_created_active").using("btree", table.ownerId.asc().nullsLast().op("bool_ops"), table.createdOn.asc().nullsLast().op("timestamp_ops"), table.aactive.asc().nullsLast().op("timestamp_ops")),
	index("idx_real_estate_owner_id").using("btree", table.ownerId.asc().nullsLast().op("int4_ops")),
	index("idx_real_estate_post_source_post").using("btree", table.post.asc().nullsLast().op("text_ops"), table.sourcePost.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_price").using("btree", table.price.asc().nullsLast().op("int8_ops")),
	index("idx_real_estate_project").using("btree", table.project.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_property_type_id").using("btree", table.propertyTypeId.asc().nullsLast().op("int4_ops")),
	index("idx_real_estate_slug").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_status_id").using("btree", table.statusId.asc().nullsLast().op("int4_ops")),
	index("idx_real_estate_street_name").using("btree", table.streetName.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_transaction_type").using("btree", table.transactionType.asc().nullsLast().op("int4_ops")),
	index("idx_real_estate_updated_active_status").using("btree", table.updatedOn.desc().nullsFirst().op("timestamp_ops")).where(sql`((aactive = true) AND (status_id = 5) AND (slug IS NOT NULL) AND ((slug)::text <> ''::text))`),
	index("idx_real_estate_ward").using("btree", table.ward.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_ward_id").using("btree", table.wardId.asc().nullsLast().op("text_ops")),
	index("idx_real_estate_zone_of_project").using("btree", table.zoneOfProject.asc().nullsLast().op("text_ops")),
	index("real_estate_aactive_idx").using("btree", table.aactive.asc().nullsLast().op("bool_ops")),
	index("real_estate_min_price_idx").using("btree", table.minPrice.asc().nullsLast().op("int8_ops"), table.maxPrice.asc().nullsLast().op("int8_ops")),
	index("real_estate_project_idx").using("btree", table.project.asc().nullsLast().op("text_ops")),
	index("real_estate_street_idx").using("btree", table.street.asc().nullsLast().op("int4_ops")),
	index("real_estate_ward_idx").using("btree", table.ward.asc().nullsLast().op("text_ops")),
	uniqueIndex("uq_post_sourcepost").using("btree", table.post.asc().nullsLast().op("text_ops"), table.sourcePost.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "real_estate_created_by_fkey"
		}),
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [authUser.id],
			name: "real_estate_customer_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [authUser.id],
			name: "real_estate_owner_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.propertyTypeId],
			foreignColumns: [propertyType.id],
			name: "real_estate_property_type_id_fkey"
		}),
	foreignKey({
			columns: [table.statusId],
			foreignColumns: [realEstateStatus.id],
			name: "real_estate_status_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.transactionType],
			foreignColumns: [transactionType.id],
			name: "real_estate_transaction_type_fkey"
		}),
	check("chk_positive_area", sql`(area IS NULL) OR (area > (0)::double precision)`),
	check("chk_valid_property_type", sql`(property_type_id IS NULL) OR (property_type_id > 0)`),
]);

export const postOffice = pgTable("post_office", {
	id: serial().primaryKey().notNull(),
	parentId: integer("parent_id"),
	officeLevel: integer("office_level").default(2),
	managerUserId: integer("manager_user_id"),
	permissionSetId: integer("permission_set_id"),
	name: varchar({ length: 200 }).notNull(),
	nameCode: varchar("name_code", { length: 20 }),
	phone: varchar({ length: 20 }),
	email: varchar({ length: 100 }),
	addressLatitude: varchar("address_latitude", { length: 20 }),
	addressLongitude: varchar("address_longitude", { length: 20 }),
	address: varchar({ length: 200 }),
	city: varchar({ length: 20 }),
	district: varchar({ length: 20 }),
	ward: varchar({ length: 20 }),
	cityName: varchar("city_name", { length: 255 }),
	districtName: varchar("district_name", { length: 255 }),
	wardName: varchar("ward_name", { length: 255 }),
	startDate: date("start_date"),
	maps: text(),
	typeOffice: integer("type_office").default(0),
	notesOther: text("notes_other"),
	status: integer().default(1),
	aactive: boolean().default(true),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by").default(1),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	timeWork: varchar("time_work", { length: 250 }),
	fullName: varchar("full_name"),
	displayOrder: integer("display_order"),
}, (table) => [
	index("idx_post_office_level").using("btree", table.officeLevel.asc().nullsLast().op("int4_ops")),
	index("idx_post_office_manager").using("btree", table.managerUserId.asc().nullsLast().op("int4_ops")),
	index("idx_post_office_parent").using("btree", table.parentId.asc().nullsLast().op("int4_ops")),
	index("idx_post_office_permission").using("btree", table.permissionSetId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "post_office_created_by_fkey"
		}),
	foreignKey({
			columns: [table.managerUserId],
			foreignColumns: [authUser.id],
			name: "post_office_manager_user_id_fkey"
		}),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "post_office_parent_id_fkey"
		}),
	foreignKey({
			columns: [table.permissionSetId],
			foreignColumns: [officePermissionSet.id],
			name: "post_office_permission_set_id_fkey"
		}),
	check("post_office_office_level_check", sql`office_level = ANY (ARRAY[1, 2, 3, 4, 5])`),
	check("post_office_status_check", sql`status = ANY (ARRAY[1, 2, 3, 4, 9])`),
	check("post_office_type_office_check", sql`type_office = ANY (ARRAY[0, 1, 2, 3])`),
]);

export const staffWorkArea = pgTable("staff_work_area", {
	id: serial().primaryKey().notNull(),
	officeStaffId: integer("office_staff_id").notNull(),
	areaType: integer("area_type").default(2),
	city: varchar({ length: 20 }),
	district: varchar({ length: 20 }),
	ward: varchar({ length: 20 }),
	cityName: varchar("city_name", { length: 200 }),
	districtName: varchar("district_name", { length: 200 }),
	wardName: varchar("ward_name", { length: 200 }),
	customAreaName: varchar("custom_area_name", { length: 200 }),
	coordinates: text(),
	startDate: date("start_date"),
	endDate: date("end_date"),
	isExclusive: boolean("is_exclusive").default(false),
	mustWithinOfficeTerritory: boolean("must_within_office_territory").default(true),
	aactive: boolean().default(true),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by"),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_work_area_active").using("btree", table.aactive.asc().nullsLast().op("bool_ops")),
	index("idx_work_area_city").using("btree", table.city.asc().nullsLast().op("text_ops")),
	index("idx_work_area_dates").using("btree", table.startDate.asc().nullsLast().op("date_ops"), table.endDate.asc().nullsLast().op("date_ops")),
	index("idx_work_area_district").using("btree", table.city.asc().nullsLast().op("text_ops"), table.district.asc().nullsLast().op("text_ops")),
	index("idx_work_area_staff").using("btree", table.officeStaffId.asc().nullsLast().op("int4_ops")),
	index("idx_work_area_type").using("btree", table.areaType.asc().nullsLast().op("int4_ops")),
	index("idx_work_area_ward").using("btree", table.city.asc().nullsLast().op("text_ops"), table.district.asc().nullsLast().op("text_ops"), table.ward.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "staff_work_area_created_by_fkey"
		}),
	foreignKey({
			columns: [table.officeStaffId],
			foreignColumns: [officeStaff.id],
			name: "staff_work_area_office_staff_id_fkey"
		}).onDelete("cascade"),
	check("staff_work_area_area_type_check", sql`area_type = ANY (ARRAY[1, 2, 3])`),
]);

export const officePermission = pgTable("office_permission", {
	id: serial().primaryKey().notNull(),
	permissionSetId: integer("permission_set_id").notNull(),
	positionId: integer("position_id").notNull(),
	accessLevel: varchar("access_level", { length: 20 }).default('view'),
	canAccess: boolean("can_access").default(true),
	conditions: text(),
	priority: integer().default(1),
	notes: text(),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by"),
	tableName: varchar("table_name", { length: 100 }),
	tableId: integer("table_id"),
}, (table) => [
	index("idx_permission_access_level").using("btree", table.accessLevel.asc().nullsLast().op("text_ops")),
	index("idx_permission_lookup").using("btree", table.permissionSetId.asc().nullsLast().op("int4_ops"), table.positionId.asc().nullsLast().op("int4_ops")),
	index("idx_permission_position").using("btree", table.positionId.asc().nullsLast().op("int4_ops")),
	index("idx_permission_set").using("btree", table.permissionSetId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "office_permission_created_by_fkey"
		}),
	foreignKey({
			columns: [table.permissionSetId],
			foreignColumns: [officePermissionSet.id],
			name: "office_permission_permission_set_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.positionId],
			foreignColumns: [officePosition.id],
			name: "office_permission_position_id_fkey"
		}).onDelete("cascade"),
	check("office_permission_access_level_check", sql`(access_level)::text = ANY ((ARRAY['view'::character varying, 'disabled'::character varying, 'hidden'::character varying])::text[])`),
]);

export const officeStaff = pgTable("office_staff", {
	id: serial().primaryKey().notNull(),
	postOfficeId: integer("post_office_id").notNull(),
	authUserId: integer("auth_user_id").notNull(),
	salesmanId: integer("salesman_id"),
	positionIds: text("position_ids"),
	isPrimary: boolean("is_primary").default(true),
	employmentType: integer("employment_type").default(1),
	startDate: date("start_date"),
	endDate: date("end_date"),
	status: integer().default(1),
	contractNumber: varchar("contract_number", { length: 50 }),
	contractFile: varchar("contract_file", { length: 512 }),
	aactive: boolean().default(true),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by"),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	managerId: integer("manager_id"),
	teamName: varchar("team_name", { length: 100 }),
}, (table) => [
	index("idx_staff_dates").using("btree", table.startDate.asc().nullsLast().op("date_ops"), table.endDate.asc().nullsLast().op("date_ops")),
	index("idx_staff_office").using("btree", table.postOfficeId.asc().nullsLast().op("int4_ops")),
	index("idx_staff_primary").using("btree", table.isPrimary.asc().nullsLast().op("bool_ops")).where(sql`(is_primary = true)`),
	index("idx_staff_salesman").using("btree", table.salesmanId.asc().nullsLast().op("int4_ops")),
	index("idx_staff_status").using("btree", table.status.asc().nullsLast().op("bool_ops"), table.aactive.asc().nullsLast().op("int4_ops")),
	index("idx_staff_user").using("btree", table.authUserId.asc().nullsLast().op("int4_ops")),
	index("idx_staff_user_office").using("btree", table.authUserId.asc().nullsLast().op("int4_ops"), table.postOfficeId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.authUserId],
			foreignColumns: [authUser.id],
			name: "office_staff_auth_user_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "office_staff_created_by_fkey"
		}),
	foreignKey({
			columns: [table.managerId],
			foreignColumns: [table.id],
			name: "office_staff_manager_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.postOfficeId],
			foreignColumns: [postOffice.id],
			name: "office_staff_post_office_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.salesmanId],
			foreignColumns: [salesman.id],
			name: "office_staff_salesman_id_fkey"
		}).onDelete("set null"),
	check("office_staff_employment_type_check", sql`employment_type = ANY (ARRAY[1, 2, 3, 4])`),
	check("office_staff_status_check", sql`status = ANY (ARRAY[1, 2, 3])`),
]);

export const seoMetaData = pgTable("seo_meta_data", {
	id: serial().primaryKey().notNull(),
	slug: varchar({ length: 255 }).notNull(),
	pageType: varchar("page_type", { length: 64 }),
	title: varchar({ length: 255 }),
	metaDescription: text("meta_description"),
	metaKeywords: text("meta_keywords"),
	ogTitle: varchar("og_title", { length: 512 }),
	ogDescription: text("og_description"),
	ogImage: varchar("og_image", { length: 512 }),
	twitterTitle: varchar("twitter_title", { length: 512 }),
	twitterDescription: text("twitter_description"),
	twitterImage: varchar("twitter_image", { length: 512 }),
	canonicalUrl: varchar("canonical_url", { length: 512 }),
	schemaType: varchar("schema_type", { length: 512 }),
	schemaJson: text("schema_json"),
	breadcrumbJson: text("breadcrumb_json"),
	contentAbove: text("content_above"),
	contentBelow: text("content_below"),
	isActive: boolean("is_active"),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdBy: integer("created_by"),
	updatedBy: integer("updated_by"),
	socialTags: text("social_tags"),
	isDefault: boolean("is_default"),
	orderby: integer(),
	titleWeb: varchar("title_web"),
	cachedHtml: text("cached_html"),
}, (table) => [
	index("idx_seo_meta_data_is_active").using("btree", table.isActive.asc().nullsLast().op("bool_ops")),
	index("idx_seo_meta_data_page_type").using("btree", table.pageType.asc().nullsLast().op("text_ops")),
	index("idx_seo_meta_data_slug").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	unique("seo_meta_data_slug_key").on(table.slug),
]);

export const systemFunction = pgTable("system_function", {
	id: serial().primaryKey().notNull(),
	functionCode: varchar("function_code", { length: 100 }).notNull(),
	functionName: varchar("function_name", { length: 200 }).notNull(),
	functionCategory: varchar("function_category", { length: 50 }),
	controller: varchar({ length: 100 }),
	aaction: varchar({ length: 100 }),
	urlPattern: varchar("url_pattern", { length: 200 }),
	parentMenuId: integer("parent_menu_id"),
	parentFunctionCode: varchar("parent_function_code", { length: 100 }),
	functionType: varchar("function_type", { length: 20 }).default('view'),
	requiresApproval: boolean("requires_approval").default(false),
	isCritical: boolean("is_critical").default(false),
	displayOrder: integer("display_order").default(0),
	description: text(),
	aactive: boolean().default(true),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by"),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	roleGroup: text("role_group"),
	officePosition: text("office_position"),
	dataScopeConfig: json("data_scope_config"),
	menuId: integer("menu_id"),
}, (table) => [
	index("idx_function_active").using("btree", table.aactive.asc().nullsLast().op("bool_ops")),
	index("idx_function_category").using("btree", table.functionCategory.asc().nullsLast().op("text_ops")),
	index("idx_function_code").using("btree", table.functionCode.asc().nullsLast().op("text_ops")),
	index("idx_function_parent_code").using("btree", table.parentFunctionCode.asc().nullsLast().op("text_ops")),
	index("idx_function_parent_menu").using("btree", table.parentMenuId.asc().nullsLast().op("int4_ops")),
	index("idx_function_type").using("btree", table.functionType.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.menuId],
			foreignColumns: [systemMenu.id],
			name: "fk_system_function_menu_id"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "system_function_created_by_fkey"
		}),
	foreignKey({
			columns: [table.parentFunctionCode],
			foreignColumns: [table.functionCode],
			name: "system_function_parent_function_code_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.parentMenuId],
			foreignColumns: [systemMenu.id],
			name: "system_function_parent_menu_id_fkey"
		}).onDelete("set null"),
	unique("system_function_function_code_key").on(table.functionCode),
	check("system_function_function_type_check", sql`(function_type)::text = ANY ((ARRAY['menu'::character varying, 'view'::character varying, 'create'::character varying, 'update'::character varying, 'delete'::character varying, 'approve'::character varying, 'other'::character varying])::text[])`),
]);

export const systemMenu = pgTable("system_menu", {
	id: serial().primaryKey().notNull(),
	parentId: integer("parent_id"),
	menuCode: varchar("menu_code", { length: 100 }).notNull(),
	menuName: varchar("menu_name", { length: 200 }).notNull(),
	menuLevel: integer("menu_level").default(1),
	url: varchar({ length: 200 }),
	icon: varchar({ length: 50 }),
	displayOrder: integer("display_order").default(0),
	description: text(),
	aactive: boolean().default(true),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by"),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	menuType: varchar("menu_type", { length: 20 }),
}, (table) => [
	index("idx_menu_active").using("btree", table.aactive.asc().nullsLast().op("bool_ops")),
	index("idx_menu_code").using("btree", table.menuCode.asc().nullsLast().op("text_ops")),
	index("idx_menu_level").using("btree", table.menuLevel.asc().nullsLast().op("int4_ops")),
	index("idx_menu_order").using("btree", table.displayOrder.asc().nullsLast().op("int4_ops")),
	index("idx_menu_parent").using("btree", table.parentId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "system_menu_created_by_fkey"
		}),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "system_menu_parent_id_fkey"
		}).onDelete("cascade"),
	unique("system_menu_menu_code_key").on(table.menuCode),
	check("system_menu_menu_level_check", sql`menu_level = ANY (ARRAY[1, 2, 3])`),
]);

export const transactionReconciliation = pgTable("transaction_reconciliation", {
	id: serial().primaryKey().notNull(),
	reconciliationCode: varchar("reconciliation_code", { length: 512 }),
	transactionId: integer("transaction_id"),
	agentId: integer("agent_id"),
	commissionType: varchar("commission_type", { length: 512 }),
	reconciliationStatus: varchar("reconciliation_status", { length: 512 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	expectedAmount: bigint("expected_amount", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	verifiedAmount: bigint("verified_amount", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	varianceAmount: bigint("variance_amount", { mode: "number" }),
	reconciliationRate: numeric("reconciliation_rate", { precision: 5, scale:  2 }),
	reconciliationPeriod: varchar("reconciliation_period", { length: 512 }),
	reconciliationBatchId: varchar("reconciliation_batch_id", { length: 512 }),
	submittedAt: timestamp("submitted_at", { mode: 'string' }),
	processedAt: timestamp("processed_at", { mode: 'string' }),
	settledAt: timestamp("settled_at", { mode: 'string' }),
	processedBy: integer("processed_by"),
	notes: text(),
	adminNotes: text("admin_notes"),
	disputeReason: varchar("dispute_reason", { length: 512 }),
	disputeDescription: text("dispute_description"),
	disputeSubmittedAt: timestamp("dispute_submitted_at", { mode: 'string' }),
	disputeResolvedAt: timestamp("dispute_resolved_at", { mode: 'string' }),
	disputeResolution: text("dispute_resolution"),
	supportingDocuments: text("supporting_documents"),
	paymentProof: varchar("payment_proof", { length: 512 }),
	walletTransactionId: varchar("wallet_transaction_id", { length: 512 }),
	paymentMethod: varchar("payment_method", { length: 512 }),
	isActive: char("is_active", { length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	bonusAmt: bigint("bonus_amt", { mode: "number" }),
	bonusRate: numeric("bonus_rate", { precision: 5, scale:  2 }),
}, (table) => [
	foreignKey({
			columns: [table.agentId],
			foreignColumns: [salesman.id],
			name: "transaction_reconciliation_agent_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "transaction_reconciliation_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.processedBy],
			foreignColumns: [authUser.id],
			name: "transaction_reconciliation_processed_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.transactionId],
			foreignColumns: [realEstateTransaction.id],
			name: "transaction_reconciliation_transaction_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("transaction_reconciliation_reconciliation_code_key").on(table.reconciliationCode),
]);

export const menuFunctionMapping = pgTable("menu_function_mapping", {
	id: serial().primaryKey().notNull(),
	menuId: integer("menu_id").notNull(),
	functionId: integer("function_id").notNull(),
	displayOrder: integer("display_order").default(0),
	isPrimary: boolean("is_primary").default(true),
	aactive: boolean().default(true),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by"),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_mapping_active").using("btree", table.aactive.asc().nullsLast().op("bool_ops")),
	index("idx_mapping_function").using("btree", table.functionId.asc().nullsLast().op("int4_ops")),
	index("idx_mapping_menu").using("btree", table.menuId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "menu_function_mapping_created_by_fkey"
		}),
	foreignKey({
			columns: [table.functionId],
			foreignColumns: [systemFunction.id],
			name: "menu_function_mapping_function_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.menuId],
			foreignColumns: [systemMenu.id],
			name: "menu_function_mapping_menu_id_fkey"
		}).onDelete("cascade"),
	unique("menu_function_mapping_menu_id_function_id_key").on(table.functionId, table.menuId),
]);

export const jackpotCalculationHistory = pgTable("jackpot_calculation_history", {
	id: serial().primaryKey().notNull(),
	jackpotConfigId: integer("jackpot_config_id").notNull(),
	calculationType: integer("calculation_type").default(1),
	calculationPeriodStart: date("calculation_period_start"),
	calculationPeriodEnd: date("calculation_period_end"),
	totalSalesmen: integer("total_salesmen").default(0),
	totalRewardDistributed: numeric("total_reward_distributed", { precision: 18, scale:  2 }).default('0.0'),
	calculationData: json("calculation_data"),
	status: integer().default(0),
	errorMessage: text("error_message"),
	notes: text(),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).defaultNow(),
	updatedOn: timestamp("updated_on", { mode: 'string' }).defaultNow(),
}, (table) => [
	index("idx_jackpot_calculation_history_created_by").using("btree", table.createdBy.asc().nullsLast().op("int4_ops")),
	index("idx_jackpot_calculation_history_jackpot_config_id").using("btree", table.jackpotConfigId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "jackpot_calculation_history_created_by_fkey"
		}),
	foreignKey({
			columns: [table.jackpotConfigId],
			foreignColumns: [jackpotConfig.id],
			name: "jackpot_calculation_history_jackpot_config_id_fkey"
		}).onDelete("cascade"),
	check("jackpot_calculation_history_calculation_type_check", sql`calculation_type = ANY (ARRAY[1, 2, 3])`),
	check("jackpot_calculation_history_status_check", sql`status = ANY (ARRAY[0, 1, 2, 9])`),
]);

export const menuPermission = pgTable("menu_permission", {
	id: serial().primaryKey().notNull(),
	permissionSetId: integer("permission_set_id"),
	positionId: integer("position_id"),
	menuId: integer("menu_id").notNull(),
	accessLevel: varchar("access_level", { length: 20 }).default('view'),
	canAccess: boolean("can_access").default(true),
	conditions: text(),
	notes: text(),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by"),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	tableName: varchar("table_name", { length: 100 }),
	tableId: integer("table_id"),
	authGroup: integer("auth_group"),
}, (table) => [
	index("idx_menu_perm_lookup").using("btree", table.permissionSetId.asc().nullsLast().op("int4_ops"), table.positionId.asc().nullsLast().op("int4_ops"), table.menuId.asc().nullsLast().op("int4_ops")),
	index("idx_menu_perm_menu").using("btree", table.menuId.asc().nullsLast().op("int4_ops")),
	index("idx_menu_perm_position").using("btree", table.positionId.asc().nullsLast().op("int4_ops")),
	index("idx_menu_perm_set").using("btree", table.permissionSetId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.authGroup],
			foreignColumns: [authGroup.id],
			name: "menu_permission_auth_group_fk"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "menu_permission_created_by_fkey"
		}),
	foreignKey({
			columns: [table.menuId],
			foreignColumns: [systemMenu.id],
			name: "menu_permission_menu_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.permissionSetId],
			foreignColumns: [officePermissionSet.id],
			name: "menu_permission_permission_set_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.positionId],
			foreignColumns: [officePosition.id],
			name: "menu_permission_position_id_fkey"
		}).onDelete("cascade"),
	check("menu_permission_access_level_check", sql`(access_level)::text = ANY ((ARRAY['view'::character varying, 'disabled'::character varying, 'hidden'::character varying])::text[])`),
]);

export const jackpotConfig = pgTable("jackpot_config", {
	id: serial().primaryKey().notNull(),
	fundName: varchar("fund_name", { length: 500 }).notNull(),
	projectId: integer("project_id").notNull(),
	projectZone: varchar("project_zone", { length: 200 }),
	realEstateSaleId: integer("real_estate_sale_id"),
	status: integer().default(1),
	startDate: date("start_date"),
	endDate: date("end_date"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountBegin: bigint("amount_begin", { mode: "number" }).default(0),
	notes: text(),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	modifiedBy: integer("modified_by"),
	modifiedOn: timestamp("modified_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_jackpot_config_project_id").using("btree", table.projectId.asc().nullsLast().op("int4_ops")),
	index("idx_jackpot_config_real_estate_sale_id").using("btree", table.realEstateSaleId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "jackpot_config_created_by_fkey"
		}),
	foreignKey({
			columns: [table.modifiedBy],
			foreignColumns: [authUser.id],
			name: "jackpot_config_modified_by_fkey"
		}),
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [project.id],
			name: "jackpot_config_project_id_fkey"
		}),
	foreignKey({
			columns: [table.realEstateSaleId],
			foreignColumns: [realEstateSale.id],
			name: "jackpot_config_real_estate_sale_id_fkey"
		}),
	check("jackpot_config_status_check", sql`status = ANY (ARRAY[0, 1, 2, 9])`),
]);

export const project = pgTable("project", {
	id: serial().primaryKey().notNull(),
	slug: varchar({ length: 512 }),
	description: text(),
	projectStatus: varchar("project_status", { length: 512 }),
	areaUnit: varchar("area_unit", { length: 512 }),
	developer: integer(),
	legalStatus: varchar("legal_status", { length: 512 }),
	totalUnits: integer("total_units"),
	totalTowers: integer("total_towers"),
	city: varchar({ length: 512 }),
	cityId: varchar("city_id", { length: 512 }),
	district: varchar({ length: 512 }),
	districtId: varchar("district_id", { length: 512 }),
	ward: varchar({ length: 512 }),
	wardId: varchar("ward_id", { length: 512 }),
	streetAddress: varchar("street_address", { length: 512 }),
	mainImage: text("main_image"),
	galleryImages: text("gallery_images"),
	rateSeller: doublePrecision("rate_seller"),
	amountSeller: doublePrecision("amount_seller"),
	rateBuyer: doublePrecision("rate_buyer"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountBuyer: bigint("amount_buyer", { mode: "number" }),
	rateProject: doublePrecision("rate_project"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountProject: bigint("amount_project", { mode: "number" }),
	isFeatured: boolean("is_featured"),
	aactive: boolean(),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	utilities: text(),
	developerName: varchar("developer_name", { length: 512 }),
	developerLogo: text("developer_logo"),
	projectName: varchar("project_name", { length: 512 }),
	projectCode: varchar("project_code", { length: 512 }),
	totalRate: numeric("total_rate", { precision: 5, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalAmount: bigint("total_amount", { mode: "number" }),
	projectType: integer("project_type"),
	projectArea: doublePrecision("project_area"),
	latitude: varchar({ length: 512 }),
	longitude: varchar({ length: 512 }),
	parentId: integer("parent_id"),
	note: varchar({ length: 512 }),
	sourceGet: varchar("source_get", { length: 512 }),
	masterPlanImages: text("master_plan_images"),
	price: integer(),
	priceDescription: varchar("price_description", { length: 512 }),
	pricePerMeter: integer("price_per_meter"),
	sourceProject: varchar("source_project", { length: 512 }),
	htmlContent: text("html_content"),
	zoneOfProject: varchar("zone_of_project", { length: 512 }),
	groupId: varchar("group_id"),
	botAi: varchar("bot_ai", { length: 512 }),
	isBotAi: boolean("is_bot_ai"),
	aiConvert: char("ai_convert", { length: 1 }),
	aiContent: text("ai_content"),
	projectCodeShow: varchar("project_code_show", { length: 512 }),
	isShowInventory: boolean("is_show_inventory").default(true),
}, (table) => [
	index("idx_project_code").using("btree", table.projectCode.asc().nullsLast().op("text_ops")),
	index("idx_slug").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	index("project_slug_idx").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "project_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "project_parent_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.projectType],
			foreignColumns: [propertyType.id],
			name: "project_project_type_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("project_project_code_key").on(table.projectCode),
]);

export const jackpotApartmentGroup = pgTable("jackpot_apartment_group", {
	id: serial().primaryKey().notNull(),
	jackpotConfigId: integer("jackpot_config_id").notNull(),
	groupCode: text("group_code").notNull(),
	rewardAmount: numeric("reward_amount", { precision: 18, scale:  2 }).default('0.0').notNull(),
	rewardUnit: integer("reward_unit").default(1),
	description: text(),
	displayOrder: integer("display_order").default(0),
}, (table) => [
	index("idx_jackpot_apartment_group_jackpot_config_id").using("btree", table.jackpotConfigId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.jackpotConfigId],
			foreignColumns: [jackpotConfig.id],
			name: "jackpot_apartment_group_jackpot_config_id_fkey"
		}).onDelete("cascade"),
	check("jackpot_apartment_group_reward_unit_check", sql`reward_unit = ANY (ARRAY[1, 2])`),
]);

export const realEstateSalesman = pgTable("real_estate_salesman", {
	id: serial().primaryKey().notNull(),
	realEstateId: integer("real_estate_id"),
	salesmanId: integer("salesman_id"),
	sourceGet: varchar("source_get", { length: 512 }),
	postTime: timestamp("post_time", { mode: 'string' }),
	status: varchar({ length: 512 }),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	isOwner: char("is_owner", { length: 1 }),
	isVerified: boolean("is_verified"),
	post: varchar(),
	sourcePost: varchar("source_post"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	realEstateValue: bigint("real_estate_value", { mode: "number" }),
	latlng: varchar(),
	googleMapsUrl: varchar("google_maps_url"),
	wardId: varchar("ward_id"),
	districtId: varchar("district_id"),
	cityId: varchar("city_id"),
	address: varchar(),
	ownershipType: varchar("ownership_type", { length: 100 }),
	verificationMediaIds: text("verification_media_ids"),
	coverMediaIds: text("cover_media_ids"),
	contractMediaIds: text("contract_media_ids"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	saleOffMemberId: bigint("sale_off_member_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ownerAccountId: bigint("owner_account_id", { mode: "number" }),
	ownerPhone: varchar("owner_phone", { length: 20 }),
	ownerName: varchar("owner_name", { length: 255 }),
	completionPayoutPercent: doublePrecision("completion_payout_percent"),
	depositPercent: doublePrecision("deposit_percent"),
	buyerCompany: varchar("buyer_company", { length: 255 }),
	sellerName: varchar("seller_name", { length: 255 }),
	contractSignedDate: timestamp("contract_signed_date", { mode: 'string' }),
	contractNumber: varchar("contract_number", { length: 100 }),
	redBookPhotos: text("red_book_photos"),
	issuedDate: timestamp("issued_date", { mode: 'string' }),
	numberBook: varchar("number_book", { length: 100 }),
	certificateNumber: varchar("certificate_number", { length: 100 }),
	taxRatePercent: doublePrecision("tax_rate_percent"),
	taxBearer: varchar("tax_bearer", { length: 50 }),
	brokerageFeeUnit: varchar("brokerage_fee_unit", { length: 20 }).default('percent'),
	brokerageFeeValue: doublePrecision("brokerage_fee_value"),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	verifiedAt: timestamp("verified_at", { mode: 'string' }),
	verificationNotes: text("verification_notes"),
	contractType: varchar("contract_type", { length: 128 }),
	verificationStatus: varchar("verification_status", { length: 32 }),
	cccdBackSecond: integer("cccd_back_second"),
	cccdFrontSecond: integer("cccd_front_second"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cccdBackFirst: bigint("cccd_back_first", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cccdFrontFirst: bigint("cccd_front_first", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	verifiedBy: bigint("verified_by", { mode: "number" }),
	ownerNameFirst: varchar("owner_name_first"),
	ownerNameSecond: varchar("owner_name_second"),
	idCardFirst: varchar("id_card_first"),
	idCardSecond: varchar("id_card_second"),
	sellerCccd: varchar("seller_cccd"),
	realEstateStatus: smallint("real_estate_status").default(1),
	assignSaleOffMemberBy: smallint("assign_sale_off_member_by"),
	verifiedWithOwner: boolean("verified_with_owner"),
}, (table) => [
	index("idx_owner_account_id").using("btree", table.ownerAccountId.asc().nullsLast().op("int8_ops")),
	index("idx_real_estate_salesman_salesman_id").using("btree", table.salesmanId.asc().nullsLast().op("int4_ops")),
	index("idx_res_reid").using("btree", table.realEstateId.asc().nullsLast().op("int4_ops")),
	index("idx_res_salesmanid").using("btree", table.salesmanId.asc().nullsLast().op("int4_ops")),
	index("real_estate_salesman_real_estate_id_idx").using("btree", table.realEstateId.asc().nullsLast().op("int4_ops"), table.salesmanId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "real_estate_salesman_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.realEstateId],
			foreignColumns: [realEstate.id],
			name: "real_estate_salesman_real_estate_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.realEstateStatus],
			foreignColumns: [realEstateStatus.id],
			name: "real_estate_salesman_real_estate_status_fk"
		}),
	foreignKey({
			columns: [table.salesmanId],
			foreignColumns: [salesman.id],
			name: "real_estate_salesman_salesman_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const salesman = pgTable("salesman", {
	id: serial().primaryKey().notNull(),
	sManager: integer("s_manager"),
	avatar: varchar({ length: 512 }),
	nameCompany: varchar("name_company", { length: 512 }),
	name: varchar({ length: 512 }),
	nameCode: varchar("name_code", { length: 512 }),
	birthday: date(),
	sex: varchar({ length: 512 }),
	address: varchar({ length: 512 }),
	idCard: varchar("id_card", { length: 512 }),
	idDay: date("id_day"),
	idBy: varchar("id_by", { length: 512 }),
	phone: varchar({ length: 512 }),
	email: varchar({ length: 512 }),
	salesmanType: integer("salesman_type"),
	accType: text("acc_type"),
	numDaysForControl: integer("num_days_for_control"),
	authUserId: integer("auth_user_id"),
	authUserName: varchar("auth_user_name", { length: 512 }),
	startDate: date("start_date"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	createdBy: integer("created_by"),
	displayOrder: integer("display_order"),
	status: char({ length: 1 }),
	aactive: char({ length: 1 }),
	autoOrder: char("auto_order", { length: 1 }),
	note: varchar({ length: 512 }),
	step: integer(),
	isGift: char("is_gift", { length: 1 }),
	otp: integer(),
	citizenIdFront: varchar("citizen_id_front", { length: 512 }),
	citizenIdBack: varchar("citizen_id_back", { length: 512 }),
	licenseFront: varchar("license_front", { length: 512 }),
	licenseBack: varchar("license_back", { length: 512 }),
	yoe: integer(),
	cityId: text("city_id"),
	districtId: text("district_id"),
	wardId: text("ward_id"),
	isSendLead: boolean("is_send_lead"),
	contactFacebook: varchar("contact_facebook"),
	convertLocation: boolean("convert_location").default(false),
	lastPostedAt: timestamp("last_posted_at", { mode: 'string' }),
	countRealEstate: integer("count_real_estate"),
	agentSupport: integer("agent_support"),
	verifiedAt: timestamp("verified_at", { mode: 'string' }),
	taxCode: varchar("tax_code"),
	addressLatitude: varchar("address_latitude", { length: 512 }),
	addressLongitude: varchar("address_longitude", { length: 512 }),
	cmndNumber: varchar("cmnd_number"),
	postOfficeId: integer("post_office_id"),
	awardCode: varchar("award_code"),
	tagId: text("tag_id"),
	sourceGet: integer("source_get"),
}, (table) => [
	index("idx_salesman_auth").using("btree", table.authUserId.asc().nullsLast().op("int4_ops")),
	index("idx_salesman_auth_user_id").using("btree", table.authUserId.asc().nullsLast().op("int4_ops")),
	index("idx_salesman_city").using("btree", table.cityId.asc().nullsLast().op("text_ops")),
	index("idx_salesman_created_on").using("btree", table.createdOn.asc().nullsLast().op("timestamp_ops")),
	index("idx_salesman_district").using("btree", table.districtId.asc().nullsLast().op("text_ops")),
	index("idx_salesman_name_trgm").using("gin", table.name.asc().nullsLast().op("gin_trgm_ops")),
	index("idx_salesman_phone").using("btree", table.phone.asc().nullsLast().op("text_ops")),
	index("idx_salesman_ward").using("btree", table.wardId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.postOfficeId],
			foreignColumns: [postOffice.id],
			name: "fk_post_office_id"
		}).onDelete("restrict"),
	foreignKey({
			columns: [table.sManager],
			foreignColumns: [table.id],
			name: "salesman_s_manager_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const transactionDraft = pgTable("transaction_draft", {
	id: serial().primaryKey().notNull(),
	transactionId: text("transaction_id"),
	tableName: text("table_name"),
	tableId: text("table_id"),
	amount: text(),
	qrCode: text("qr_code"),
	qrWithlogo: text("qr_withlogo"),
	description: text(),
	xtype: varchar({ length: 512 }),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	transactionType: integer("transaction_type"),
	realEstateCode: text("real_estate_code"),
});

export const smsLog = pgTable("sms_log", {
	id: serial().primaryKey().notNull(),
	smsType: varchar("sms_type", { length: 512 }),
	sms: varchar({ length: 512 }),
	idDevice: varchar("id_device", { length: 512 }),
	phone: varchar({ length: 512 }),
	description: text(),
	status: varchar({ length: 512 }),
	createdOn: timestamp("created_on", { mode: 'string' }),
});

export const legalDocument = pgTable("legal_document", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 512 }).notNull(),
	aactive: char({ length: 1 }),
	isDefault: char("is_default", { length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
});

export const rocketMessage = pgTable("rocket_message", {
	id: serial().primaryKey().notNull(),
	messageTime: timestamp("message_time", { mode: 'string' }),
	messageRefresh: timestamp("message_refresh", { mode: 'string' }),
	messageContent: text("message_content"),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	rocketRoom: integer("rocket_room"),
	countMiss: integer("count_miss").default(0),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	userName: text("user_name"),
});

export const furniture = pgTable("furniture", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 512 }).notNull(),
	aactive: char({ length: 1 }),
	isDefault: char("is_default", { length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
});

export const equipmentToken = pgTable("equipment_token", {
	id: serial().primaryKey().notNull(),
	authUser: integer("auth_user"),
	token: text(),
	config: text(),
	app: varchar({ length: 512 }),
	systemName: integer("system_name"),
	updateOn: timestamp("update_on", { mode: 'string' }),
	createdOn: timestamp("created_on", { mode: 'string' }),
	logoutOn: timestamp("logout_on", { mode: 'string' }),
});

export const news = pgTable("news", {
	id: serial().primaryKey().notNull(),
	folder: integer(),
	category: integer(),
	product: text(),
	name: varchar({ length: 512 }),
	description: text(),
	htmlcontent: text(),
	avatar: varchar(),
	publishOn: timestamp("publish_on", { mode: 'string' }),
	expiredOn: timestamp("expired_on", { mode: 'string' }),
	createdOn: timestamp("created_on", { mode: 'string' }),
	createdBy: integer("created_by"),
	displayOrder: integer("display_order"),
	testfield: varchar(),
	aactive: boolean(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locations: bigint({ mode: "number" }),
	versionDocs: text("version_docs"),
}, (table) => [
	index("news_folder_idx").using("btree", table.folder.asc().nullsLast().op("int4_ops"), table.publishOn.asc().nullsLast().op("bool_ops"), table.expiredOn.asc().nullsLast().op("timestamp_ops"), table.createdOn.asc().nullsLast().op("timestamp_ops"), table.aactive.asc().nullsLast().op("bool_ops")),
	foreignKey({
			columns: [table.category],
			foreignColumns: [newsCategory.id],
			name: "news_category_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.folder],
			foreignColumns: [folder.id],
			name: "news_folder_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const propertyType = pgTable("property_type", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 512 }).notNull(),
	parentId: integer("parent_id"),
	transactionType: integer("transaction_type"),
	propertyType: varchar("property_type", { length: 1 }).default('1'),
	vietnamese: varchar(),
	slug: varchar(),
	vietnameseLowercase: varchar("vietnamese_lowercase"),
	description: text(),
	icon: text(),
	totalPost: integer("total_post").default(0),
	aactive: boolean().default(true),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedOn: timestamp("updated_on", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	fieldsArray: text("fields_array"),
}, (table) => [
	index("property_type_aactive_idx").using("btree", table.aactive.asc().nullsLast().op("bool_ops")),
	index("property_type_property_type_idx").using("btree", table.propertyType.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "property_type_created_by_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "property_type_parent_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.transactionType],
			foreignColumns: [transactionType.id],
			name: "property_type_transaction_type_fkey"
		}).onDelete("set null"),
	check("property_type_property_type_check", sql`(property_type)::text = ANY (ARRAY[('0'::character varying)::text, ('1'::character varying)::text, ('2'::character varying)::text])`),
]);

export const transactionHistory = pgTable("transaction_history", {
	id: serial().primaryKey().notNull(),
	transactionId: integer("transaction_id"),
	actionType: varchar("action_type", { length: 512 }),
	previousStatus: integer("previous_status"),
	newStatus: integer("new_status"),
	fieldChanged: varchar("field_changed", { length: 512 }),
	oldValue: text("old_value"),
	newValue: text("new_value"),
	actionDescription: text("action_description"),
	userComment: text("user_comment"),
	systemNote: text("system_note"),
	attachedFiles: text("attached_files"),
	performedBy: integer("performed_by"),
	performedOn: timestamp("performed_on", { mode: 'string' }),
	ipAddress: varchar("ip_address", { length: 512 }),
	userAgent: text("user_agent"),
}, (table) => [
	foreignKey({
			columns: [table.newStatus],
			foreignColumns: [transactionStatus.id],
			name: "transaction_history_new_status_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.performedBy],
			foreignColumns: [authUser.id],
			name: "transaction_history_performed_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.previousStatus],
			foreignColumns: [transactionStatus.id],
			name: "transaction_history_previous_status_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.transactionId],
			foreignColumns: [realEstateTransaction.id],
			name: "transaction_history_transaction_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const realEstateTransaction = pgTable("real_estate_transaction", {
	id: serial().primaryKey().notNull(),
	transactionCode: varchar("transaction_code", { length: 512 }),
	transactionTitle: varchar("transaction_title", { length: 512 }),
	realEstateId: integer("real_estate_id"),
	sellerId: integer("seller_id"),
	buyerId: integer("buyer_id"),
	agentIdSeller: integer("agent_id_seller"),
	rateSeller: numeric("rate_seller", { precision: 5, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountSeller: bigint("amount_seller", { mode: "number" }),
	agentIdBuyer: integer("agent_id_buyer"),
	rateBuyer: numeric("rate_buyer", { precision: 5, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountBuyer: bigint("amount_buyer", { mode: "number" }),
	rateProject: numeric("rate_project", { precision: 5, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountProject: bigint("amount_project", { mode: "number" }),
	transactionStatusType: varchar("transaction_status_type", { length: 512 }),
	queuePosition: integer("queue_position"),
	waitingListDate: timestamp("waiting_list_date", { mode: 'string' }),
	promotedFromWaiting: char("promoted_from_waiting", { length: 1 }),
	originalTransactionId: integer("original_transaction_id"),
	isWinner: char("is_winner", { length: 1 }),
	competitionRank: integer("competition_rank"),
	depositOrder: integer("deposit_order"),
	cancellationReason: varchar("cancellation_reason", { length: 512 }),
	cancelledByTransactionId: integer("cancelled_by_transaction_id"),
	cancelledAt: timestamp("cancelled_at", { mode: 'string' }),
	autoCancelled: char("auto_cancelled", { length: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	agreedPrice: bigint("agreed_price", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	depositAmount: bigint("deposit_amount", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	finalPrice: bigint("final_price", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalFees: bigint("total_fees", { mode: "number" }),
	paymentMethod: varchar("payment_method", { length: 512 }),
	expectedCompletionDate: date("expected_completion_date"),
	actualCompletionDate: date("actual_completion_date"),
	contractDate: date("contract_date"),
	handoverDate: date("handover_date"),
	currentStatus: integer("current_status"),
	priorityLevel: integer("priority_level"),
	notes: text(),
	internalNotes: text("internal_notes"),
	isActive: char("is_active", { length: 1 }),
	createdBy: integer("created_by"),
	assignedTo: integer("assigned_to"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	groupId: varchar("group_id", { length: 512 }),
	commissionReconciliationStatus: varchar("commission_reconciliation_status", { length: 512 }),
	commissionSettlementDate: date("commission_settlement_date"),
	commissionNotes: text("commission_notes"),
	lastReconciliationRequest: timestamp("last_reconciliation_request", { mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	bonusAmt: bigint("bonus_amt", { mode: "number" }),
	bonusRate: numeric("bonus_rate", { precision: 5, scale:  2 }),
	depositType: varchar("deposit_type", { length: 512 }),
	approvalStatus: varchar("approval_status", { length: 512 }),
	approvedBy: integer("approved_by"),
	approvedOn: timestamp("approved_on", { mode: 'string' }),
	rejectionReason: text("rejection_reason"),
	sourceType: varchar("source_type", { length: 512 }),
	parentId: integer("parent_id"),
	parentIds: text("parent_ids"),
	consultationId: integer("consultation_id"),
	isConsultation: boolean("is_consultation"),
	projectId: integer("project_id"),
	postOfficeId: integer("post_office_id"),
}, (table) => [
	index("idx_re_trans_reid").using("btree", table.realEstateId.asc().nullsLast().op("int4_ops")),
	index("idx_re_trans_status").using("btree", table.currentStatus.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.agentIdBuyer],
			foreignColumns: [salesman.id],
			name: "real_estate_transaction_agent_id_buyer_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.agentIdSeller],
			foreignColumns: [salesman.id],
			name: "real_estate_transaction_agent_id_seller_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.approvedBy],
			foreignColumns: [authUser.id],
			name: "real_estate_transaction_approved_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.assignedTo],
			foreignColumns: [authUser.id],
			name: "real_estate_transaction_assigned_to_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.buyerId],
			foreignColumns: [customer.id],
			name: "real_estate_transaction_buyer_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.cancelledByTransactionId],
			foreignColumns: [table.id],
			name: "real_estate_transaction_cancelled_by_transaction_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.consultationId],
			foreignColumns: [consultation.id],
			name: "real_estate_transaction_consultation_fk"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "real_estate_transaction_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.currentStatus],
			foreignColumns: [transactionStatus.id],
			name: "real_estate_transaction_current_status_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.originalTransactionId],
			foreignColumns: [table.id],
			name: "real_estate_transaction_original_transaction_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "real_estate_transaction_parent_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.realEstateId],
			foreignColumns: [realEstate.id],
			name: "real_estate_transaction_real_estate_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.sellerId],
			foreignColumns: [customer.id],
			name: "real_estate_transaction_seller_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("real_estate_transaction_transaction_code_key").on(table.transactionCode),
]);

export const pluginCkeditorUpload = pgTable("plugin_ckeditor_upload", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }),
	filename: varchar({ length: 255 }),
	flength: integer(),
	mimeType: varchar("mime_type", { length: 128 }),
	upload: varchar({ length: 512 }),
});

export const dbanks = pgTable("dbanks", {
	id: serial().primaryKey().notNull(),
	abbreviations: text(),
	bankNameVn: text("bank_name_vn"),
	bankCodeVn: text("bank_code_vn"),
	mbUser: text("mb_user"),
	bankNameEn: text("bank_name_en"),
	swiftCode: text("swift_code"),
	image: varchar(),
	description: text(),
	aactive: boolean().default(true),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by").default(1),
	status: boolean().default(true),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "dbanks_created_by_fkey"
		}),
]);

export const favorite = pgTable("favorite", {
	id: serial().primaryKey().notNull(),
	realEstate: integer("real_estate"),
	favoriteGroup: integer("favorite_group"),
	authUser: integer("auth_user"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.favoriteGroup],
			foreignColumns: [favoriteGroup.id],
			name: "favorite_favorite_group_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.realEstate],
			foreignColumns: [realEstate.id],
			name: "favorite_real_estate_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const objects = pgTable("objects", {
	id: serial().primaryKey().notNull(),
	folder: integer(),
	foldername: varchar({ length: 512 }),
	tablename: varchar({ length: 512 }),
	tableId: integer("table_id"),
	objectsId: integer("objects_id"),
	process: integer(),
	authGroup: integer("auth_group"),
	authOrg: integer("auth_org"),
	publishOn: timestamp("publish_on", { mode: 'string' }),
	expiredOn: timestamp("expired_on", { mode: 'string' }),
	ocomment: text(),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.authGroup],
			foreignColumns: [authGroup.id],
			name: "objects_auth_group_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.authOrg],
			foreignColumns: [authGroup.id],
			name: "objects_auth_org_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.process],
			foreignColumns: [process.id],
			name: "objects_process_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const process = pgTable("process", {
	id: serial().primaryKey().notNull(),
	procedures: integer(),
	paccess: text(),
	pnext: integer(),
	name: varchar({ length: 255 }),
	label: varchar({ length: 512 }),
	description: varchar({ length: 512 }),
	avatar: varchar({ length: 512 }),
	authGroup: text("auth_group"),
	viewGroup: text("view_group"),
	processGroup: text("process_group"),
	pmode: varchar({ length: 512 }),
	ptype: varchar({ length: 512 }),
	url: varchar({ length: 512 }),
	isFirst: char("is_first", { length: 1 }),
	isCopy: char("is_copy", { length: 1 }),
	isConfirm: char("is_confirm", { length: 1 }),
	isLock: char("is_lock", { length: 1 }),
	isComment: char("is_comment", { length: 1 }),
	tablename: varchar({ length: 512 }),
	field: text(),
	setting: text(),
	displayOrder: integer("display_order"),
	timeFeedback: integer("time_feedback"),
	timeType: varchar("time_type", { length: 512 }),
}, (table) => [
	foreignKey({
			columns: [table.pnext],
			foreignColumns: [table.id],
			name: "process_pnext_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.procedures],
			foreignColumns: [procedures.id],
			name: "process_procedures_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("process_name_key").on(table.name),
]);

export const processLog = pgTable("process_log", {
	id: serial().primaryKey().notNull(),
	objects: integer(),
	process: integer(),
	authGroup: integer("auth_group"),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.authGroup],
			foreignColumns: [authGroup.id],
			name: "process_log_auth_group_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.objects],
			foreignColumns: [objects.id],
			name: "process_log_objects_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.process],
			foreignColumns: [process.id],
			name: "process_log_process_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const realEstateComment = pgTable("real_estate_comment", {
	id: serial().primaryKey().notNull(),
	tablename: varchar({ length: 512 }).notNull(),
	tableId: integer("table_id").notNull(),
	userId: integer("user_id").notNull(),
	contentComment: text("content_comment").notNull(),
	commentType: varchar("comment_type", { length: 512 }),
	replyToCommentId: integer("reply_to_comment_id"),
	threadLevel: integer("thread_level"),
	isPrivate: char("is_private", { length: 1 }),
	visibility: varchar({ length: 512 }),
	attachments: text(),
	mentionedUsers: text("mentioned_users"),
	isEdited: char("is_edited", { length: 1 }),
	editCount: integer("edit_count"),
	isDeleted: char("is_deleted", { length: 1 }),
	isPinned: char("is_pinned", { length: 1 }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdBy: integer("created_by"),
	updatedBy: integer("updated_by"),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "real_estate_comment_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.replyToCommentId],
			foreignColumns: [table.id],
			name: "real_estate_comment_reply_to_comment_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [authUser.id],
			name: "real_estate_comment_updated_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [authUser.id],
			name: "real_estate_comment_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const rocketConfig = pgTable("rocket_config", {
	id: serial().primaryKey().notNull(),
	name: text(),
	userName: text("user_name"),
	email: text(),
	password: text(),
	authUserId: integer("auth_user_id"),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	username: text(),
	roomIdAgent: text("room_id_agent"),
	roomIdTongkho: text("room_id_tongkho"),
	listRoomIdProjectAgent: text("list_room_id_project_agent"),
	listRoomIdProjectTongkho: text("list_room_id_project_tongkho"),
}, (table) => [
	foreignKey({
			columns: [table.authUserId],
			foreignColumns: [authUser.id],
			name: "rocket_config_auth_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const rocketRoom = pgTable("rocket_room", {
	id: serial().primaryKey().notNull(),
	roomId: text("room_id"),
	roomName: text("room_name"),
	roomType: integer("room_type"),
	rocketConfig: integer("rocket_config"),
	roomSystem: char("room_system", { length: 1 }),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	"insertIntoPublicRocketRoom (roomId": varchar("INSERT INTO public.rocket_room (room_id", { length: 50 }),
	"roomType)Values": varchar("room_type) VALUES", { length: 50 }),
	aiStatus: boolean("ai_status"),
	projectId: integer("project_id"),
}, (table) => [
	foreignKey({
			columns: [table.rocketConfig],
			foreignColumns: [rocketConfig.id],
			name: "rocket_room_rocket_config_fk"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const transactionDocument = pgTable("transaction_document", {
	id: serial().primaryKey().notNull(),
	documentType: varchar("document_type", { length: 512 }),
	documentName: varchar("document_name", { length: 512 }),
	description: text(),
	filePath: varchar("file_path", { length: 512 }),
	fileSize: integer("file_size"),
	fileType: varchar("file_type", { length: 512 }),
	originalFilename: varchar("original_filename", { length: 512 }),
	isRequired: char("is_required", { length: 1 }),
	isVerified: char("is_verified", { length: 1 }),
	verificationStatus: varchar("verification_status", { length: 512 }),
	verifiedBy: integer("verified_by"),
	verifiedOn: timestamp("verified_on", { mode: 'string' }),
	verificationNotes: text("verification_notes"),
	accessLevel: varchar("access_level", { length: 512 }),
	expiryDate: date("expiry_date"),
	uploadedBy: integer("uploaded_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	tableName: varchar("table_name", { length: 512 }),
	tableId: varchar("table_id", { length: 512 }),
}, (table) => [
	foreignKey({
			columns: [table.uploadedBy],
			foreignColumns: [authUser.id],
			name: "transaction_document_uploaded_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.verifiedBy],
			foreignColumns: [authUser.id],
			name: "transaction_document_verified_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const locationsWithCountProperty = pgTable("locations_with_count_property", {
	id: serial().primaryKey().notNull(),
	city: varchar({ length: 512 }),
	cityId: varchar("city_id", { length: 512 }),
	cityImage: varchar("city_image", { length: 512 }),
	cityLatlng: varchar("city_latlng", { length: 512 }),
	cityRefId: varchar("city_ref_id", { length: 512 }),
	district: varchar({ length: 512 }),
	districtId: varchar("district_id", { length: 512 }),
	ward: varchar({ length: 512 }),
	wardId: varchar("ward_id", { length: 512 }),
	propertyCount: integer("property_count"),
	aactive: char({ length: 1 }),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	title: varchar({ length: 512 }),
	slug: varchar(),
	name: varchar(),
	filename: varchar(),
	displayOrder: integer("display_order"),
	cityImageWeb: varchar("city_image_web"),
	mergedintoid: varchar(),
}, (table) => [
	index("idx_locations_with_count_property_display_order").using("btree", table.displayOrder.asc().nullsLast().op("int4_ops")),
	index("idx_locations_with_count_property_mergedintoid").using("btree", table.mergedintoid.asc().nullsLast().op("text_ops")),
]);

export const realEstateWork = pgTable("real_estate_work", {
	id: serial().primaryKey().notNull(),
	tablename: varchar({ length: 512 }).notNull(),
	tableId: integer("table_id").notNull(),
	templateId: integer("template_id"),
	name: varchar({ length: 512 }).notNull(),
	description: text(),
	status: varchar({ length: 512 }),
	priority: integer(),
	deadline: timestamp({ mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	completedAt: timestamp("completed_at", { mode: 'string' }),
	startedAt: timestamp("started_at", { mode: 'string' }),
	progressPercentage: integer("progress_percentage"),
	estimatedHours: integer("estimated_hours"),
	actualHours: integer("actual_hours"),
	isActive: char("is_active", { length: 1 }),
	createdBy: integer("created_by"),
	assignedTo: integer("assigned_to"),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountDeposit: bigint("amount_deposit", { mode: "number" }),
	depositType: varchar("deposit_type"),
	attachments: text(),
	meetingPlace: varchar("meeting_place", { length: 255 }),
	reason: varchar({ length: 255 }),
	resultNote: varchar("result_note", { length: 255 }),
	returnAmount: integer("return_amount").default(0),
	realEstateId: integer("real_estate_id"),
	contractType: varchar("contract_type"),
	signingMethod: varchar("signing_method"),
	signingDate: timestamp("signing_date", { mode: 'string' }),
	postOfficeId: integer("post_office_id"),
}, (table) => [
	foreignKey({
			columns: [table.assignedTo],
			foreignColumns: [authUser.id],
			name: "real_estate_work_assigned_to_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "real_estate_work_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.realEstateId],
			foreignColumns: [realEstate.id],
			name: "real_estate_work_real_estate_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.templateId],
			foreignColumns: [workTemplate.id],
			name: "real_estate_work_template_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const developerProject = pgTable("developer_project", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 512 }).notNull(),
	logo: text(),
	phone: varchar({ length: 512 }),
	email: varchar({ length: 512 }),
	address: varchar({ length: 512 }),
	aactive: boolean(),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
});

export const fieldType = pgTable("field_type", {
	id: serial().primaryKey().notNull(),
	name: text(),
	aactive: char({ length: 1 }),
});

export const permission = pgTable("permission", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	description: text(),
	displayOrder: integer("display_order"),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	unique("permission_name_key").on(table.name),
]);

export const giftLog = pgTable("gift_log", {
	id: serial().primaryKey().notNull(),
	tableName: text("table_name"),
	tableId: text("table_id"),
	point: text(),
	voucher: text(),
	news: integer(),
	giftStatus: integer("gift_status"),
	note: text(),
	noteForUser: text("note_for_user"),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.news],
			foreignColumns: [news.id],
			name: "gift_log_news_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const workTemplate = pgTable("work_template", {
	id: serial().primaryKey().notNull(),
	tablename: varchar({ length: 512 }).notNull(),
	name: varchar({ length: 512 }).notNull(),
	description: text(),
	defaultDuration: integer("default_duration"),
	priority: integer(),
	orderIndex: integer("order_index"),
	isActive: char("is_active", { length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	transactionStatusFilter: text("transaction_status_filter"),
	transactionType: varchar("transaction_type", { length: 512 }),
	isVisible: char("is_visible", { length: 1 }),
	code: varchar({ length: 512 }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "work_template_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const dfield = pgTable("dfield", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	ftype: varchar({ length: 512 }),
	fdefine: text(),
	fformat: varchar({ length: 512 }),
	ckeditor: char({ length: 1 }),
});

export const tmessage = pgTable("tmessage", {
	id: serial().primaryKey().notNull(),
	status: varchar({ length: 512 }),
	listAuthUser: text("list_auth_user"),
	tmessageType: integer("tmessage_type"),
	messageTitle: varchar("message_title", { length: 512 }),
	messageContent: text("message_content"),
	htmlcontent: text(),
	app: varchar({ length: 512 }),
	image: text(),
	isUrl: varchar("is_url", { length: 512 }),
	isUrlMobile: varchar("is_url_mobile", { length: 512 }),
	isModal: char("is_modal", { length: 1 }),
	foldername: varchar({ length: 512 }),
	tablename: varchar({ length: 512 }),
	tableId: integer("table_id"),
	process: varchar({ length: 512 }),
	aactive: boolean(),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.tmessageType],
			foreignColumns: [tmessageType.id],
			name: "tmessage_tmessage_type_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const dtable = pgTable("dtable", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	label: varchar({ length: 512 }),
	publish: char({ length: 1 }),
	attachment: char({ length: 1 }),
	isImport: char("is_import", { length: 1 }),
	isComment: char("is_comment", { length: 1 }),
	displayOrder: integer("display_order"),
	description: text(),
	setting: text(),
	layout: varchar({ length: 512 }),
	displayRow: text("display_row"),
	displayRows: text("display_rows"),
	linkEdit: varchar("link_edit", { length: 512 }),
}, (table) => [
	unique("dtable_name_key").on(table.name),
]);

export const isread = pgTable("isread", {
	id: serial().primaryKey().notNull(),
	objects: integer(),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	tableName: varchar("table_name"),
	tableId: integer("table_id"),
});

export const zaloAccess = pgTable("zalo_access", {
	id: serial().primaryKey().notNull(),
	zaloId: varchar("zalo_id", { length: 512 }),
	accessToken: varchar("access_token", { length: 512 }),
	refreshToken: varchar("refresh_token", { length: 512 }),
	expiresIn: varchar("expires_in", { length: 512 }),
	refreshTokenTime: varchar("refresh_token_time", { length: 512 }),
	updateOn: timestamp("update_on", { mode: 'string' }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
});

export const zoneOfProject = pgTable("zone_of_project", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 512 }).notNull(),
	slug: varchar({ length: 512 }),
	description: text(),
	totalArea: doublePrecision("total_area"),
	numberOfUnits: integer("number_of_units"),
	utilities: text(),
	mapImage: text("map_image"),
	latlng: text(),
	displayOrder: integer("display_order"),
	rateSeller: numeric("rate_seller", { precision: 5, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountSeller: bigint("amount_seller", { mode: "number" }),
	rateBuyer: numeric("rate_buyer", { precision: 5, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountBuyer: bigint("amount_buyer", { mode: "number" }),
	rateProject: numeric("rate_project", { precision: 5, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amountProject: bigint("amount_project", { mode: "number" }),
	isActive: boolean("is_active"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	totalRate: numeric("total_rate", { precision: 5, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalAmount: bigint("total_amount", { mode: "number" }),
	project: varchar({ length: 512 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	bonusAmt: bigint("bonus_amt", { mode: "number" }),
});

export const tablefield = pgTable("tablefield", {
	id: serial().primaryKey().notNull(),
	dtable: integer(),
	dfield: integer(),
	dlabel: varchar({ length: 512 }),
	writable: char({ length: 1 }),
	readable: char({ length: 1 }),
	linkOnTable: char("link_on_table", { length: 1 }),
	showOnTable: char("show_on_table", { length: 1 }),
	searchOn: char("search_on", { length: 1 }),
	ckeditor: char({ length: 1 }),
	fformat: varchar({ length: 512 }),
	displayOrder: integer("display_order"),
}, (table) => [
	foreignKey({
			columns: [table.dfield],
			foreignColumns: [dfield.id],
			name: "tablefield_dfield_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.dtable],
			foreignColumns: [dtable.id],
			name: "tablefield_dtable_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const transactionStatus = pgTable("transaction_status", {
	id: serial().primaryKey().notNull(),
	statusName: varchar("status_name", { length: 512 }).notNull(),
	statusCode: varchar("status_code", { length: 512 }),
	description: text(),
	colorCode: varchar("color_code", { length: 512 }),
	icon: varchar({ length: 512 }),
	displayOrder: integer("display_order"),
	isFinalStatus: char("is_final_status", { length: 1 }),
	isActive: char("is_active", { length: 1 }),
	notifyBuyer: char("notify_buyer", { length: 1 }),
	notifySeller: char("notify_seller", { length: 1 }),
	notifyAgent: char("notify_agent", { length: 1 }),
	notifyAdmin: char("notify_admin", { length: 1 }),
	statusType: varchar("status_type", { length: 512 }),
	nextStatuses: text("next_statuses"),
	previousStatuses: text("previous_statuses"),
	isEditable: char("is_editable", { length: 1 }),
	canCancel: char("can_cancel", { length: 1 }),
	autoTransition: char("auto_transition", { length: 1 }),
	transitionCondition: text("transition_condition"),
	maxDaysInStatus: integer("max_days_in_status"),
	warningDays: integer("warning_days"),
	escalationStatus: varchar("escalation_status", { length: 512 }),
	requiredRole: varchar("required_role", { length: 512 }),
	approvalRequired: char("approval_required", { length: 1 }),
	approverRole: varchar("approver_role", { length: 512 }),
	notificationTemplate: text("notification_template"),
	emailTemplate: text("email_template"),
	smsTemplate: text("sms_template"),
	statusMetadata: text("status_metadata"),
	businessRules: text("business_rules"),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	approvalStatus: varchar("approval_status").array(),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "transaction_status_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("transaction_status_status_code_key").on(table.statusCode),
]);

export const typeField = pgTable("type_field", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 512 }),
	code: varchar({ length: 512 }),
	apiSource: varchar("api_source", { length: 512 }),
	typeInput: varchar("type_input", { length: 512 }),
	isActive: char("is_active", { length: 1 }),
	createdBy: integer("created_by"),
	dataField: varchar("data_field", { length: 512 }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "type_field_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const userBank = pgTable("user_bank", {
	id: serial().primaryKey().notNull(),
	bank: integer(),
	accName: text("acc_name"),
	accNumber: text("acc_number"),
	branch: text(),
	isUse: char("is_use", { length: 1 }),
	aactive: char({ length: 1 }),
	tableName: text("table_name"),
	tableId: varchar("table_id", { length: 512 }),
	createdOn: timestamp("created_on", { mode: 'string' }),
	createdBy: integer("created_by"),
	status: char({ length: 1 }),
}, (table) => [
	foreignKey({
			columns: [table.bank],
			foreignColumns: [dbanks.id],
			name: "user_bank_bank_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const salesmanSupport = pgTable("salesman_support", {
	id: serial().primaryKey().notNull(),
	userSupport: integer("user_support").notNull(),
	supportType: varchar("support_type", { length: 255 }),
	tableName: varchar("table_name", { length: 255 }),
	tableId: integer("table_id"),
	status: boolean().default(true),
	startDate: date("start_date").default(sql`CURRENT_DATE`),
	endDate: date("end_date"),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.userSupport],
			foreignColumns: [authUser.id],
			name: "salesman_support_user_support_fkey"
		}),
]);

export const achives = pgTable("achives", {
	id: serial().primaryKey().notNull(),
	testfield: varchar({ length: 512 }),
});

export const historySearching = pgTable("history_searching", {
	id: serial().primaryKey().notNull(),
	keyName: text("key_name"),
	dataSearch: text("data_search"),
	name: text(),
	description: text(),
	refId: text("ref_id"),
	address: text(),
	city: text(),
	district: text(),
	ward: text(),
	wardName: text("ward_name"),
	districtName: text("district_name"),
	cityName: text("city_name"),
	latlng: text(),
	authUser: integer("auth_user"),
	createdOn: timestamp("created_on", { mode: 'string' }),
});

export const messageCampaignType = pgTable("message_campaign_type", {
	id: serial().primaryKey().notNull(),
	typeName: text("type_name"),
	description: text(),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
});

export const processLock = pgTable("process_lock", {
	id: serial().primaryKey().notNull(),
	tablename: varchar({ length: 512 }),
	tableId: integer("table_id"),
	objectsId: integer("objects_id"),
	process: integer(),
	commentLock: text("comment_lock"),
	commentUnlock: text("comment_unlock"),
	lockBy: integer("lock_by"),
	lockOn: timestamp("lock_on", { mode: 'string' }),
	unlockOn: timestamp("unlock_on", { mode: 'string' }),
});

export const consultationSuggestions = pgTable("consultation_suggestions", {
	id: serial().primaryKey().notNull(),
	consultationId: integer("consultation_id"),
	realEstateId: integer("real_estate_id"),
	suggestionType: varchar("suggestion_type", { length: 512 }),
	matchScore: numeric("match_score", { precision: 5, scale:  2 }),
	matchCriteria: text("match_criteria"),
	suggestionReason: text("suggestion_reason"),
	isSent: char("is_sent", { length: 1 }),
	sentVia: varchar("sent_via", { length: 512 }),
	sentAt: timestamp("sent_at", { mode: 'string' }),
	isViewed: char("is_viewed", { length: 1 }),
	viewedAt: timestamp("viewed_at", { mode: 'string' }),
	isInterested: char("is_interested", { length: 1 }),
	feedbackScore: integer("feedback_score"),
	feedbackNote: text("feedback_note"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	createdBy: integer("created_by"),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	aactive: char({ length: 1 }),
}, (table) => [
	index("idx_consultation_suggestions_consultation").using("btree", table.consultationId.asc().nullsLast().op("int4_ops")),
	index("idx_consultation_suggestions_estate").using("btree", table.realEstateId.asc().nullsLast().op("int4_ops")),
	index("idx_consultation_suggestions_score").using("btree", table.matchScore.asc().nullsLast().op("numeric_ops")),
	index("idx_consultation_suggestions_sent").using("btree", table.isSent.asc().nullsLast().op("timestamp_ops"), table.sentAt.asc().nullsLast().op("timestamp_ops")),
	foreignKey({
			columns: [table.consultationId],
			foreignColumns: [consultation.id],
			name: "consultation_suggestions_consultation_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "consultation_suggestions_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.realEstateId],
			foreignColumns: [realEstate.id],
			name: "consultation_suggestions_real_estate_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const newsCategory = pgTable("news_category", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	displayOrder: integer("display_order"),
}, (table) => [
	unique("news_category_name_key").on(table.name),
]);

export const notification = pgTable("notification", {
	id: serial().primaryKey().notNull(),
	authUser: integer("auth_user"),
	token: text(),
	notificationTitle: text("notification_title"),
	notificationContent: text("notification_content"),
	linkRefer: text("link_refer"),
	xtype: integer(),
	updateOn: timestamp("update_on", { mode: 'string' }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.authUser],
			foreignColumns: [authUser.id],
			name: "notification_auth_user_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const realEstatePostLog = pgTable("real_estate_post_log", {
	id: serial().primaryKey().notNull(),
	realEstateId: integer("real_estate_id"),
	salesmanId: integer("salesman_id"),
	sourceGet: varchar("source_get", { length: 512 }),
	postTime: timestamp("post_time", { mode: 'string' }),
	status: varchar({ length: 512 }),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "real_estate_post_log_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.realEstateId],
			foreignColumns: [realEstate.id],
			name: "real_estate_post_log_real_estate_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.salesmanId],
			foreignColumns: [salesman.id],
			name: "real_estate_post_log_salesman_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const messageCampaign = pgTable("message_campaign", {
	id: serial().primaryKey().notNull(),
	campaignType: integer("campaign_type"),
	tmessageType: integer("tmessage_type"),
	campaignName: text("campaign_name"),
	notificationTitle: text("notification_title"),
	notificationContent: text("notification_content"),
	dateRun: timestamp("date_run", { mode: 'string' }),
	fDay: integer("f_day"),
	fMonth: integer("f_month"),
	fYear: integer("f_year"),
	fHour: integer("f_hour"),
	fMinute: integer("f_minute"),
	fDaySalesman: integer("f_day_salesman"),
	fDayTo: integer("f_day_to"),
	recipients: text(),
	listAuthUser: text("list_auth_user"),
	tableName: text("table_name"),
	tableId: integer("table_id"),
	contentProcessing: char("content_processing", { length: 1 }),
	notifyToSystem: char("notify_to_system", { length: 1 }),
	notifyToMobile: char("notify_to_mobile", { length: 1 }),
	notifyToSms: char("notify_to_sms", { length: 1 }),
	notifyToZalo: char("notify_to_zalo", { length: 1 }),
	qtyUser: integer("qty_user"),
	aactive: char({ length: 1 }),
	isRun: char("is_run", { length: 1 }),
	historyUpdateOn: text("history_update_on"),
	updateOn: timestamp("update_on", { mode: 'string' }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	image: varchar({ length: 512 }),
	context: integer(),
	contextId: integer("context_id"),
	conditionAbsolute: char("condition_absolute", { length: 1 }),
	xqueryJson: varchar("xquery_json", { length: 512 }),
	conditionType: integer("condition_type"),
}, (table) => [
	foreignKey({
			columns: [table.tmessageType],
			foreignColumns: [tmessageType.id],
			name: "message_campaign_tmessage_type_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const transactions = pgTable("transactions", {
	id: serial().primaryKey().notNull(),
	transactionType: varchar("transaction_type", { length: 512 }),
	transactionId: integer("transaction_id"),
	holdOld: varchar("hold_old", { length: 512 }),
	bonusOld: varchar("bonus_old", { length: 512 }),
	amountHold: varchar("amount_hold", { length: 512 }),
	amountBonus: varchar("amount_bonus", { length: 512 }),
	amountCash: varchar("amount_cash", { length: 512 }),
	amountPoint: varchar("amount_point", { length: 512 }),
	holdNew: varchar("hold_new", { length: 512 }),
	bonusNew: varchar("bonus_new", { length: 512 }),
	pointOld: varchar("point_old", { length: 512 }),
	pointNew: varchar("point_new", { length: 512 }),
	cashOld: varchar("cash_old", { length: 512 }),
	cashNew: varchar("cash_new", { length: 512 }),
	description: text(),
	tableName: text("table_name"),
	tableId: text("table_id"),
	compareName: text("compare_name"),
	compareId: text("compare_id"),
	isCheck: char("is_check", { length: 1 }),
	aactive: char({ length: 1 }),
	isCollaborationReward: char("is_collaboration_reward", { length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
});

export const verifyLog = pgTable("verify_log", {
	id: serial().primaryKey().notNull(),
	field: text(),
	reason: text(),
	authUserId: integer("auth_user_id"),
	decalControl: integer("decal_control"),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
});

export const zaloHook = pgTable("zalo_hook", {
	id: serial().primaryKey().notNull(),
	htmlcontent: varchar({ length: 512 }),
	aactive: char({ length: 1 }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
});

export const consultationInterest = pgTable("consultation_interest", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	consultationId: bigint("consultation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	realEstateId: bigint("real_estate_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	salesmanId: bigint("salesman_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	realEstateTransactionId: bigint("real_estate_transaction_id", { mode: "number" }),
	status: smallint().default(1).notNull(),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	createdBy: bigint("created_by", { mode: "number" }),
}, (table) => [
	check("consultation_interest_status_check", sql`status = ANY (ARRAY[1, 2, 3, 9])`),
]);

export const reconciliationDispute = pgTable("reconciliation_dispute", {
	id: serial().primaryKey().notNull(),
	disputeCode: varchar("dispute_code", { length: 512 }),
	reconciliationId: integer("reconciliation_id"),
	disputeType: varchar("dispute_type", { length: 512 }),
	disputeTitle: varchar("dispute_title", { length: 512 }),
	disputeDescription: text("dispute_description"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	requestedAmount: bigint("requested_amount", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	currentAmount: bigint("current_amount", { mode: "number" }),
	disputeStatus: varchar("dispute_status", { length: 512 }),
	priority: integer(),
	submittedAt: timestamp("submitted_at", { mode: 'string' }),
	reviewedAt: timestamp("reviewed_at", { mode: 'string' }),
	resolvedAt: timestamp("resolved_at", { mode: 'string' }),
	deadline: timestamp({ mode: 'string' }),
	resolutionType: varchar("resolution_type", { length: 512 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	approvedAmount: bigint("approved_amount", { mode: "number" }),
	resolutionNotes: text("resolution_notes"),
	resolutionBy: integer("resolution_by"),
	evidenceDocuments: text("evidence_documents"),
	adminDocuments: text("admin_documents"),
	escalatedTo: integer("escalated_to"),
	escalationReason: text("escalation_reason"),
	escalatedAt: timestamp("escalated_at", { mode: 'string' }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "reconciliation_dispute_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.escalatedTo],
			foreignColumns: [authUser.id],
			name: "reconciliation_dispute_escalated_to_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.reconciliationId],
			foreignColumns: [transactionReconciliation.id],
			name: "reconciliation_dispute_reconciliation_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.resolutionBy],
			foreignColumns: [authUser.id],
			name: "reconciliation_dispute_resolution_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("reconciliation_dispute_dispute_code_key").on(table.disputeCode),
]);

export const transactionPayment = pgTable("transaction_payment", {
	id: serial().primaryKey().notNull(),
	transactionId: integer("transaction_id"),
	paymentType: varchar("payment_type", { length: 512 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	amount: bigint({ mode: "number" }),
	paymentMethod: varchar("payment_method", { length: 512 }),
	paymentReference: varchar("payment_reference", { length: 512 }),
	bankName: varchar("bank_name", { length: 512 }),
	accountNumber: varchar("account_number", { length: 512 }),
	paymentDate: date("payment_date"),
	dueDate: date("due_date"),
	receivedDate: date("received_date"),
	paymentStatus: varchar("payment_status", { length: 512 }),
	verificationStatus: varchar("verification_status", { length: 512 }),
	description: text(),
	receiptFile: varchar("receipt_file", { length: 512 }),
	verifiedBy: integer("verified_by"),
	verifiedOn: timestamp("verified_on", { mode: 'string' }),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "transaction_payment_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.transactionId],
			foreignColumns: [realEstateTransaction.id],
			name: "transaction_payment_transaction_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.verifiedBy],
			foreignColumns: [authUser.id],
			name: "transaction_payment_verified_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const walletSettings = pgTable("wallet_settings", {
	id: serial().primaryKey().notNull(),
	settingKey: varchar("setting_key", { length: 512 }),
	settingName: varchar("setting_name", { length: 512 }),
	settingValue: text("setting_value"),
	settingType: varchar("setting_type", { length: 512 }),
	category: varchar({ length: 512 }),
	subcategory: varchar({ length: 512 }),
	description: text(),
	defaultValue: text("default_value"),
	validationRules: text("validation_rules"),
	isUserConfigurable: char("is_user_configurable", { length: 1 }),
	requiresRestart: char("requires_restart", { length: 1 }),
	isActive: char("is_active", { length: 1 }),
	displayOrder: integer("display_order"),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "wallet_settings_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("wallet_settings_setting_key_key").on(table.settingKey),
]);

export const withdrawControl = pgTable("withdraw_control", {
	id: serial().primaryKey().notNull(),
	code: varchar({ length: 512 }),
	withdraw: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalAmount: bigint("total_amount", { mode: "number" }),
	controlType: varchar("control_type", { length: 512 }),
	period: varchar({ length: 512 }),
	createdDate: date("created_date"),
	processedDate: date("processed_date"),
	completedDate: date("completed_date"),
	status: varchar({ length: 512 }),
	verificationStatus: varchar("verification_status", { length: 512 }),
	processedBy: integer("processed_by"),
	notes: text(),
	adminNotes: text("admin_notes"),
	supportingFiles: text("supporting_files"),
	createdBy: integer("created_by"),
	createdOn: timestamp("created_on", { mode: 'string' }),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "withdraw_control_created_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.processedBy],
			foreignColumns: [authUser.id],
			name: "withdraw_control_processed_by_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("withdraw_control_code_key").on(table.code),
]);

export const verify = pgTable("verify", {
	id: serial().primaryKey().notNull(),
	authUserId: integer("auth_user_id"),
	tableName: text("table_name"),
	tableId: text("table_id"),
	verifyType: text("verify_type"),
	salesman: integer(),
	status: integer(),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	createdOn: timestamp("created_on", { mode: 'string' }),
	createdBy: integer("created_by"),
}, (table) => [
	foreignKey({
			columns: [table.authUserId],
			foreignColumns: [authUser.id],
			name: "verify_auth_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.salesman],
			foreignColumns: [salesman.id],
			name: "verify_salesman_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const invitedSalesman = pgTable("invited_salesman", {
	id: integer().primaryKey().notNull(),
	salesman: integer(),
	invited: integer(),
	aactive: boolean(),
	createdOn: date("created_on"),
	createdBy: integer("created_by"),
}, (table) => [
	foreignKey({
			columns: [table.salesman],
			foreignColumns: [salesman.id],
			name: "invited_salesman_salesman_fk"
		}),
	foreignKey({
			columns: [table.invited],
			foreignColumns: [salesman.id],
			name: "invited_salesman_salesman_fk_1"
		}),
]);

export const configTypes = pgTable("config_types", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 512 }),
	code: varchar({ length: 512 }),
	displayOrder: integer("display_order"),
	note: text(),
	isActive: char("is_active", { length: 1 }),
	inputSchema: json("input_schema"),
	displaySchema: json("display_schema"),
});

export const config = pgTable("config", {
	id: serial().primaryKey().notNull(),
	value0: varchar({ length: 512 }),
	value1: varchar({ length: 512 }),
	value2: varchar({ length: 512 }),
	note: text(),
	displayOrder: integer("display_order"),
	isActive: char("is_active", { length: 1 }),
	configType: integer("config_type").notNull(),
	name: varchar({ length: 512 }),
}, (table) => [
	foreignKey({
			columns: [table.configType],
			foreignColumns: [configTypes.id],
			name: "config_config_type_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const jackpotRankingCriteria = pgTable("jackpot_ranking_criteria", {
	id: serial().primaryKey().notNull(),
	jackpotConfigId: integer("jackpot_config_id").notNull(),
	configId: integer("config_id").notNull(),
	weightPercentage: numeric("weight_percentage", { precision: 5, scale:  2 }).default('0.0').notNull(),
	description: text(),
	displayOrder: integer("display_order").default(0),
	isActive: boolean("is_active").default(true),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_jackpot_ranking_criteria_config_id").using("btree", table.configId.asc().nullsLast().op("int4_ops")),
	index("idx_jackpot_ranking_criteria_jackpot_config_id").using("btree", table.jackpotConfigId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.configId],
			foreignColumns: [config.id],
			name: "jackpot_ranking_criteria_config_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "jackpot_ranking_criteria_created_by_fkey"
		}),
	foreignKey({
			columns: [table.jackpotConfigId],
			foreignColumns: [jackpotConfig.id],
			name: "jackpot_ranking_criteria_jackpot_config_id_fkey"
		}).onDelete("cascade"),
]);

export const conditionValues = pgTable("condition_values", {
	id: serial().primaryKey().notNull(),
	campaignId: integer("campaign_id").notNull(),
	selectedValue: varchar("selected_value", { length: 255 }).default(sql`NULL`),
	inputValue: integer("input_value"),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by"),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	updatedBy: integer("updated_by"),
	groupIndex: integer("group_index"),
	conditionName: varchar("condition_name", { length: 512 }),
	groupName: varchar("group_name", { length: 512 }),
}, (table) => [
	index("idx_condition_values_campaign_id").using("btree", table.campaignId.asc().nullsLast().op("int4_ops")),
	index("idx_condition_values_created_by").using("btree", table.createdBy.asc().nullsLast().op("int4_ops")),
	index("idx_condition_values_updated_by").using("btree", table.updatedBy.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.campaignId],
			foreignColumns: [messageCampaign.id],
			name: "fk_condition_values_campaign"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "fk_condition_values_created_by"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [authUser.id],
			name: "fk_condition_values_updated_by"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const referrals = pgTable("referrals", {
	id: serial().primaryKey().notNull(),
	referrerSalesman: integer("referrer_salesman"),
	referredSalesman: integer("referred_salesman"),
	referrerType: integer("referrer_type").default(0),
	xtype: integer().default(0),
	rewardAmount: text("reward_amount"),
	aactive: boolean().default(true),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updateOn: timestamp("update_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	note: text(),
}, (table) => [
	check("referrals_xtype_check", sql`xtype = ANY (ARRAY[0, 1, 2])`),
]);

export const awardConfig = pgTable("award_config", {
	id: integer().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	code: text(),
	htmlContent: text("html_content"),
	aactive: boolean().default(true),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedOn: timestamp("updated_on", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const context = pgTable("context", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	aactive: varchar({ length: 1 }).default('T'),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	hasCondition: varchar("has_condition", { length: 1 }),
	hasRepeat: varchar("has_repeat", { length: 1 }),
	xtype: varchar({ length: 512 }),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "fk_context_created_by"
		}).onDelete("set null"),
]);

export const campaignConditions = pgTable("campaign_conditions", {
	id: serial().primaryKey().notNull(),
	groupName: varchar("group_name", { length: 255 }).default(sql`NULL`),
	parentId: integer("parent_id"),
	conditionName: varchar("condition_name", { length: 255 }).default(sql`NULL`),
	typeHtml: varchar("type_html", { length: 50 }).default(sql`NULL`),
	defaultValue: text("default_value"),
	isValue: boolean("is_value").default(false),
	aactive: boolean().default(true),
	updateOn: timestamp("update_on", { mode: 'string' }),
	createdOn: timestamp("created_on", { mode: 'string' }),
	createdBy: integer("created_by"),
	decodeAddress: varchar("decode_address", { length: 255 }).default(sql`NULL`),
	displayOrder: integer("display_order").default(100),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	searchCount: bigint("search_count", { mode: "number" }).default(8386),
	mergedintoid: integer(),
	notes: varchar({ length: 512 }),
}, (table) => [
	index("idx_campaign_conditions_aactive").using("btree", table.aactive.asc().nullsLast().op("bool_ops")),
	index("idx_campaign_conditions_display_order").using("btree", table.displayOrder.asc().nullsLast().op("int4_ops")),
	index("idx_campaign_conditions_group_active_order").using("btree", table.groupName.asc().nullsLast().op("int4_ops"), table.aactive.asc().nullsLast().op("int4_ops"), table.displayOrder.asc().nullsLast().op("int4_ops")),
	index("idx_campaign_conditions_group_name").using("btree", table.groupName.asc().nullsLast().op("text_ops")),
	index("idx_campaign_conditions_parent_id").using("btree", table.parentId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "fk_campaign_conditions_parent"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const conditionType = pgTable("condition_type", {
	id: serial().primaryKey().notNull(),
	contextId: integer("context_id"),
	name: varchar({ length: 255 }),
	xvalue: text(),
	hasRepeat: varchar("has_repeat", { length: 1 }).default('F'),
	aactive: varchar({ length: 1 }).default('T'),
	createdBy: integer("created_by").default(1),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.contextId],
			foreignColumns: [context.id],
			name: "fk_condition_type_context"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "fk_condition_type_user"
		}),
]);

export const functionScopePermission = pgTable("function_scope_permission", {
	id: serial().primaryKey().notNull(),
	functionId: integer("function_id").notNull(),
	accessLevel: varchar("access_level", { length: 32 }).default('view'),
	canAccess: boolean("can_access").default(true),
	conditions: json(),
	priority: integer().default(1),
	notes: text(),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by"),
	modifiedOn: timestamp("modified_on", { mode: 'string' }),
	modifiedBy: integer("modified_by"),
	authGroup: integer("auth_group"),
}, (table) => [
	index("idx_function_scope_permission_access_level").using("btree", table.accessLevel.asc().nullsLast().op("text_ops")),
	index("idx_function_scope_permission_function_id").using("btree", table.functionId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.authGroup],
			foreignColumns: [authGroup.id],
			name: "function_scope_permission_auth_group_fk"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "function_scope_permission_created_by_fkey"
		}),
	foreignKey({
			columns: [table.functionId],
			foreignColumns: [systemFunction.id],
			name: "function_scope_permission_function_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.modifiedBy],
			foreignColumns: [authUser.id],
			name: "function_scope_permission_modified_by_fkey"
		}),
]);

export const officeDepartment = pgTable("office_department", {
	id: serial().primaryKey().notNull(),
	postOfficeId: integer("post_office_id").notNull(),
	parentId: integer("parent_id"),
	name: varchar({ length: 200 }).notNull(),
	nameCode: varchar("name_code", { length: 50 }),
	description: text(),
	managerStaffId: integer("manager_staff_id"),
	displayOrder: integer("display_order").default(0),
	status: integer().default(1),
	aactive: boolean().default(true),
	createdOn: timestamp("created_on", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").default(1),
	updatedOn: timestamp("updated_on", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	sourceDepartmentId: integer("source_department_id"),
	sourceOfficeId: integer("source_office_id"),
	importedAt: timestamp("imported_at", { mode: 'string' }),
	autoSync: boolean("auto_sync").default(false),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "office_department_created_by_fkey"
		}),
	foreignKey({
			columns: [table.managerStaffId],
			foreignColumns: [officeStaff.id],
			name: "office_department_manager_staff_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "office_department_parent_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.postOfficeId],
			foreignColumns: [postOffice.id],
			name: "office_department_post_office_id_fkey"
		}).onDelete("restrict"),
	unique("office_department_post_office_id_name_code_key").on(table.nameCode, table.postOfficeId),
	check("office_department_status_check", sql`status = ANY (ARRAY[1, 2, 3])`),
]);

export const officeStaffDepartment = pgTable("office_staff_department", {
	id: serial().primaryKey().notNull(),
	officeStaffId: integer("office_staff_id").notNull(),
	departmentId: integer("department_id").notNull(),
	positionId: integer("position_id"),
	roleType: varchar("role_type", { length: 20 }).default('staff'),
	isPrimary: boolean("is_primary").default(false),
	isManager: boolean("is_manager").default(false),
	startDate: date("start_date"),
	endDate: date("end_date"),
	aactive: boolean().default(true),
	createdOn: timestamp("created_on", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").default(1),
	updatedOn: timestamp("updated_on", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "office_staff_department_created_by_fkey"
		}),
	foreignKey({
			columns: [table.departmentId],
			foreignColumns: [officeDepartment.id],
			name: "office_staff_department_department_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.officeStaffId],
			foreignColumns: [officeStaff.id],
			name: "office_staff_department_office_staff_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.positionId],
			foreignColumns: [officePosition.id],
			name: "office_staff_department_position_id_fkey"
		}).onDelete("set null"),
	check("office_staff_department_check", sql`(end_date IS NULL) OR (end_date >= start_date)`),
	check("office_staff_department_role_type_check", sql`(role_type)::text = ANY (ARRAY[('manager'::character varying)::text, ('deputy_manager'::character varying)::text, ('staff'::character varying)::text, ('coordinator'::character varying)::text, ('specialist'::character varying)::text])`),
]);

export const tagCategories = pgTable("tag_categories", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	code: varchar({ length: 255 }).notNull(),
	description: text(),
	icon: varchar({ length: 255 }),
	color: varchar({ length: 255 }).default('#6c757d'),
	displayOrder: integer("display_order").default(0),
	isActive: boolean("is_active").default(true),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	unique("tag_categories_code_key").on(table.code),
]);

export const officePosition = pgTable("office_position", {
	id: serial().primaryKey().notNull(),
	postOfficeId: integer("post_office_id"),
	name: varchar({ length: 100 }).notNull(),
	nameCode: varchar("name_code", { length: 20 }),
	description: text(),
	llevel: integer().default(5),
	authGroupId: integer("auth_group_id"),
	isDefault: boolean("is_default").default(false),
	isManager: boolean("is_manager").default(false),
	canCreateSuboffice: boolean("can_create_suboffice").default(false),
	canManageStaff: boolean("can_manage_staff").default(false),
	aactive: boolean().default(true),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by").default(1),
	updatedOn: timestamp("updated_on", { mode: 'string' }),
	departmentId: integer("department_id"),
	parentId: integer("parent_id"),
	levelDepth: integer("level_depth").default(0).notNull(),
	xpath: varchar({ length: 255 }),
	canReceiveCare: boolean("can_receive_care"),
	sourcePositionId: integer("source_position_id"),
	sourceOfficeId: integer("source_office_id"),
	importedAt: timestamp("imported_at", { mode: 'string' }),
	autoSync: boolean("auto_sync").default(false),
	sourceAuthGroupId: integer("source_auth_group_id"),
}, (table) => [
	index("idx_office_position_auth_group_id").using("btree", table.authGroupId.asc().nullsLast().op("int4_ops")),
	index("idx_office_position_parent_id").using("btree", table.parentId.asc().nullsLast().op("int4_ops")),
	index("idx_office_position_post_office_id").using("btree", table.postOfficeId.asc().nullsLast().op("int4_ops")),
	index("idx_office_position_xpath").using("btree", table.xpath.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.authGroupId],
			foreignColumns: [authGroup.id],
			name: "office_position_auth_group_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "office_position_created_by_fkey"
		}),
	foreignKey({
			columns: [table.departmentId],
			foreignColumns: [officeDepartment.id],
			name: "office_position_office_department_fk"
		}),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "office_position_parent_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.postOfficeId],
			foreignColumns: [postOffice.id],
			name: "office_position_post_office_id_fkey"
		}).onDelete("cascade"),
	check("office_position_llevel_check", sql`(llevel >= 1) AND (llevel <= 5)`),
]);

export const tags = pgTable("tags", {
	id: serial().primaryKey().notNull(),
	groupId: integer("group_id").notNull(),
	name: varchar({ length: 255 }).notNull(),
	code: varchar({ length: 255 }).notNull(),
	description: text(),
	color: varchar({ length: 255 }).default('#6c757d'),
	icon: varchar({ length: 255 }),
	displayOrder: integer("display_order").default(0),
	isActive: boolean("is_active").default(true),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.groupId],
			foreignColumns: [tagGroups.id],
			name: "tags_group_id_fkey"
		}),
]);

export const tagGroups = pgTable("tag_groups", {
	id: serial().primaryKey().notNull(),
	categoryId: integer("category_id").notNull(),
	name: varchar({ length: 255 }).notNull(),
	code: varchar({ length: 255 }).notNull(),
	description: text(),
	selectionType: varchar("selection_type", { length: 50 }).default('multiple'),
	displayOrder: integer("display_order").default(0),
	isRequired: boolean("is_required").default(false),
	isActive: boolean("is_active").default(true),
	viewRoles: text("view_roles"),
	editRoles: text("edit_roles"),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedOn: timestamp("updated_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [tagCategories.id],
			name: "tag_groups_category_id_fkey"
		}),
	check("tag_groups_selection_type_check", sql`(selection_type)::text = ANY ((ARRAY['single'::character varying, 'multiple'::character varying])::text[])`),
]);

export const entityTags = pgTable("entity_tags", {
	id: serial().primaryKey().notNull(),
	tableName: varchar("table_name", { length: 255 }).notNull(),
	tableId: integer("table_id").notNull(),
	tagId: integer("tag_id").notNull(),
	createdOn: timestamp("created_on", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdBy: integer("created_by"),
}, (table) => [
	index("idx_entity_tags_table").using("btree", table.tableName.asc().nullsLast().op("int4_ops"), table.tableId.asc().nullsLast().op("int4_ops")),
	index("idx_entity_tags_tag").using("btree", table.tagId.asc().nullsLast().op("int4_ops")),
	uniqueIndex("idx_entity_tags_unique").using("btree", table.tableName.asc().nullsLast().op("int4_ops"), table.tableId.asc().nullsLast().op("int4_ops"), table.tagId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [authUser.id],
			name: "entity_tags_created_by_fkey"
		}),
	foreignKey({
			columns: [table.tagId],
			foreignColumns: [tags.id],
			name: "entity_tags_tag_id_fkey"
		}).onDelete("cascade"),
]);
