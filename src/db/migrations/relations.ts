import { relations } from "drizzle-orm/relations";
import { authGroup, authUser, authCas, authEvent, fileUpload, loanPackage, loan, loanMortgage, loanTracking, paymentMethods, procedures, transactionType, salesman, realEstateAgentAssignment, realEstate, realEstateStatus, transactionNotification, realEstateTransaction, userBank, withdraw, reconciliationBatch, tmessage, tmessageStatus, tmessageType, userActivityLog, customer, dbanks, consultation, folder, archives, authMembership, authPermission, dbank, dbankTransactionsHistorys, postOffice, dcontent, workMember, realEstateWork, realEstateSale, project, realEstateSaleRegister, jackpotSalesmanCriteria, jackpotConfig, jackpotSalesmanCriteriaValue, jackpotRankingCriteria, jackpotRewardDistribution, logError, mediaUpload, officePermissionSet, officeTerritory, propertyType, staffWorkArea, officeStaff, officePermission, officePosition, systemMenu, systemFunction, transactionReconciliation, menuFunctionMapping, jackpotCalculationHistory, menuPermission, jackpotApartmentGroup, realEstateSalesman, newsCategory, news, transactionStatus, transactionHistory, favoriteGroup, favorite, objects, process, processLog, realEstateComment, rocketConfig, rocketRoom, transactionDocument, workTemplate, giftLog, dfield, tablefield, dtable, typeField, salesmanSupport, consultationSuggestions, notification, realEstatePostLog, messageCampaign, reconciliationDispute, transactionPayment, walletSettings, withdrawControl, verify, invitedSalesman, configTypes, config, conditionValues, context, campaignConditions, conditionType, functionScopePermission, officeDepartment, officeStaffDepartment, tagGroups, tags, tagCategories, entityTags } from "./schema";

export const authUserRelations = relations(authUser, ({one, many}) => ({
	authGroup: one(authGroup, {
		fields: [authUser.authGroup],
		references: [authGroup.id]
	}),
	authCas: many(authCas),
	authEvents: many(authEvent),
	fileUploads: many(fileUpload),
	paymentMethods: many(paymentMethods),
	transactionTypes: many(transactionType),
	realEstateAgentAssignments: many(realEstateAgentAssignment),
	realEstateStatuses: many(realEstateStatus),
	transactionNotifications_createdBy: many(transactionNotification, {
		relationName: "transactionNotification_createdBy_authUser_id"
	}),
	transactionNotifications_recipientId: many(transactionNotification, {
		relationName: "transactionNotification_recipientId_authUser_id"
	}),
	reconciliationBatches_createdBy: many(reconciliationBatch, {
		relationName: "reconciliationBatch_createdBy_authUser_id"
	}),
	reconciliationBatches_processedBy: many(reconciliationBatch, {
		relationName: "reconciliationBatch_processedBy_authUser_id"
	}),
	userActivityLogs: many(userActivityLog),
	consultations_authUserId: many(consultation, {
		relationName: "consultation_authUserId_authUser_id"
	}),
	consultations_createdBy: many(consultation, {
		relationName: "consultation_createdBy_authUser_id"
	}),
	consultations_statusChangedBy: many(consultation, {
		relationName: "consultation_statusChangedBy_authUser_id"
	}),
	consultations_updatedBy: many(consultation, {
		relationName: "consultation_updatedBy_authUser_id"
	}),
	consultations_userSupport: many(consultation, {
		relationName: "consultation_userSupport_authUser_id"
	}),
	authMemberships: many(authMembership),
	dbanks_createdBy: many(dbank),
	dbankTransactionsHistorys: many(dbankTransactionsHistorys),
	workMembers: many(workMember),
	realEstateSales: many(realEstateSale),
	realEstateSaleRegisters: many(realEstateSaleRegister),
	jackpotSalesmanCriteria: many(jackpotSalesmanCriteria),
	jackpotSalesmanCriteriaValues: many(jackpotSalesmanCriteriaValue),
	jackpotRewardDistributions_createdBy: many(jackpotRewardDistribution, {
		relationName: "jackpotRewardDistribution_createdBy_authUser_id"
	}),
	jackpotRewardDistributions_paidBy: many(jackpotRewardDistribution, {
		relationName: "jackpotRewardDistribution_paidBy_authUser_id"
	}),
	logErrors: many(logError),
	mediaUploads: many(mediaUpload),
	officePermissionSets: many(officePermissionSet),
	officeTerritories: many(officeTerritory),
	realEstates_createdBy: many(realEstate, {
		relationName: "realEstate_createdBy_authUser_id"
	}),
	realEstates_customerId: many(realEstate, {
		relationName: "realEstate_customerId_authUser_id"
	}),
	realEstates_ownerId: many(realEstate, {
		relationName: "realEstate_ownerId_authUser_id"
	}),
	postOffices_createdBy: many(postOffice, {
		relationName: "postOffice_createdBy_authUser_id"
	}),
	postOffices_managerUserId: many(postOffice, {
		relationName: "postOffice_managerUserId_authUser_id"
	}),
	staffWorkAreas: many(staffWorkArea),
	officePermissions: many(officePermission),
	officeStaffs_authUserId: many(officeStaff, {
		relationName: "officeStaff_authUserId_authUser_id"
	}),
	officeStaffs_createdBy: many(officeStaff, {
		relationName: "officeStaff_createdBy_authUser_id"
	}),
	systemFunctions: many(systemFunction),
	systemMenus: many(systemMenu),
	transactionReconciliations_createdBy: many(transactionReconciliation, {
		relationName: "transactionReconciliation_createdBy_authUser_id"
	}),
	transactionReconciliations_processedBy: many(transactionReconciliation, {
		relationName: "transactionReconciliation_processedBy_authUser_id"
	}),
	menuFunctionMappings: many(menuFunctionMapping),
	jackpotCalculationHistories: many(jackpotCalculationHistory),
	menuPermissions: many(menuPermission),
	jackpotConfigs_createdBy: many(jackpotConfig, {
		relationName: "jackpotConfig_createdBy_authUser_id"
	}),
	jackpotConfigs_modifiedBy: many(jackpotConfig, {
		relationName: "jackpotConfig_modifiedBy_authUser_id"
	}),
	projects: many(project),
	realEstateSalesmen: many(realEstateSalesman),
	propertyTypes: many(propertyType),
	transactionHistories: many(transactionHistory),
	realEstateTransactions_approvedBy: many(realEstateTransaction, {
		relationName: "realEstateTransaction_approvedBy_authUser_id"
	}),
	realEstateTransactions_assignedTo: many(realEstateTransaction, {
		relationName: "realEstateTransaction_assignedTo_authUser_id"
	}),
	realEstateTransactions_createdBy: many(realEstateTransaction, {
		relationName: "realEstateTransaction_createdBy_authUser_id"
	}),
	dbanks_createdBy: many(dbanks),
	realEstateComments_createdBy: many(realEstateComment, {
		relationName: "realEstateComment_createdBy_authUser_id"
	}),
	realEstateComments_updatedBy: many(realEstateComment, {
		relationName: "realEstateComment_updatedBy_authUser_id"
	}),
	realEstateComments_userId: many(realEstateComment, {
		relationName: "realEstateComment_userId_authUser_id"
	}),
	rocketConfigs: many(rocketConfig),
	transactionDocuments_uploadedBy: many(transactionDocument, {
		relationName: "transactionDocument_uploadedBy_authUser_id"
	}),
	transactionDocuments_verifiedBy: many(transactionDocument, {
		relationName: "transactionDocument_verifiedBy_authUser_id"
	}),
	realEstateWorks_assignedTo: many(realEstateWork, {
		relationName: "realEstateWork_assignedTo_authUser_id"
	}),
	realEstateWorks_createdBy: many(realEstateWork, {
		relationName: "realEstateWork_createdBy_authUser_id"
	}),
	workTemplates: many(workTemplate),
	transactionStatuses: many(transactionStatus),
	typeFields: many(typeField),
	salesmanSupports: many(salesmanSupport),
	consultationSuggestions: many(consultationSuggestions),
	notifications: many(notification),
	realEstatePostLogs: many(realEstatePostLog),
	reconciliationDisputes_createdBy: many(reconciliationDispute, {
		relationName: "reconciliationDispute_createdBy_authUser_id"
	}),
	reconciliationDisputes_escalatedTo: many(reconciliationDispute, {
		relationName: "reconciliationDispute_escalatedTo_authUser_id"
	}),
	reconciliationDisputes_resolutionBy: many(reconciliationDispute, {
		relationName: "reconciliationDispute_resolutionBy_authUser_id"
	}),
	transactionPayments_createdBy: many(transactionPayment, {
		relationName: "transactionPayment_createdBy_authUser_id"
	}),
	transactionPayments_verifiedBy: many(transactionPayment, {
		relationName: "transactionPayment_verifiedBy_authUser_id"
	}),
	walletSettings: many(walletSettings),
	withdrawControls_createdBy: many(withdrawControl, {
		relationName: "withdrawControl_createdBy_authUser_id"
	}),
	withdrawControls_processedBy: many(withdrawControl, {
		relationName: "withdrawControl_processedBy_authUser_id"
	}),
	verifies: many(verify),
	jackpotRankingCriteria: many(jackpotRankingCriteria),
	conditionValues_createdBy: many(conditionValues, {
		relationName: "conditionValues_createdBy_authUser_id"
	}),
	conditionValues_updatedBy: many(conditionValues, {
		relationName: "conditionValues_updatedBy_authUser_id"
	}),
	contexts: many(context),
	conditionTypes: many(conditionType),
	functionScopePermissions_createdBy: many(functionScopePermission, {
		relationName: "functionScopePermission_createdBy_authUser_id"
	}),
	functionScopePermissions_modifiedBy: many(functionScopePermission, {
		relationName: "functionScopePermission_modifiedBy_authUser_id"
	}),
	officeDepartments: many(officeDepartment),
	officeStaffDepartments: many(officeStaffDepartment),
	officePositions: many(officePosition),
	entityTags: many(entityTags),
}));

export const authGroupRelations = relations(authGroup, ({one, many}) => ({
	authUsers: many(authUser),
	procedures: many(procedures),
	authMemberships: many(authMembership),
	authPermissions: many(authPermission),
	authGroup: one(authGroup, {
		fields: [authGroup.parent],
		references: [authGroup.id],
		relationName: "authGroup_parent_authGroup_id"
	}),
	authGroups: many(authGroup, {
		relationName: "authGroup_parent_authGroup_id"
	}),
	postOffice: one(postOffice, {
		fields: [authGroup.postOffice],
		references: [postOffice.id]
	}),
	menuPermissions: many(menuPermission),
	objects_authGroup: many(objects, {
		relationName: "objects_authGroup_authGroup_id"
	}),
	objects_authOrg: many(objects, {
		relationName: "objects_authOrg_authGroup_id"
	}),
	processLogs: many(processLog),
	functionScopePermissions: many(functionScopePermission),
	officePositions: many(officePosition),
}));

export const authCasRelations = relations(authCas, ({one}) => ({
	authUser: one(authUser, {
		fields: [authCas.userId],
		references: [authUser.id]
	}),
}));

export const authEventRelations = relations(authEvent, ({one}) => ({
	authUser: one(authUser, {
		fields: [authEvent.userId],
		references: [authUser.id]
	}),
}));

export const fileUploadRelations = relations(fileUpload, ({one}) => ({
	authUser: one(authUser, {
		fields: [fileUpload.createdBy],
		references: [authUser.id]
	}),
}));

export const loanRelations = relations(loan, ({one, many}) => ({
	loanPackage: one(loanPackage, {
		fields: [loan.loanPackage],
		references: [loanPackage.id]
	}),
	loanMortgage: one(loanMortgage, {
		fields: [loan.mortgage],
		references: [loanMortgage.id]
	}),
	loanTrackings: many(loanTracking),
}));

export const loanPackageRelations = relations(loanPackage, ({one, many}) => ({
	loans: many(loan),
	dbank: one(dbanks, {
		fields: [loanPackage.bank],
		references: [dbanks.id]
	}),
}));

export const loanMortgageRelations = relations(loanMortgage, ({many}) => ({
	loans: many(loan),
}));

export const loanTrackingRelations = relations(loanTracking, ({one}) => ({
	loan: one(loan, {
		fields: [loanTracking.loan],
		references: [loan.id]
	}),
}));

export const paymentMethodsRelations = relations(paymentMethods, ({one}) => ({
	authUser: one(authUser, {
		fields: [paymentMethods.createdBy],
		references: [authUser.id]
	}),
}));

export const proceduresRelations = relations(procedures, ({one, many}) => ({
	authGroup: one(authGroup, {
		fields: [procedures.userGroup],
		references: [authGroup.id]
	}),
	processes: many(process),
}));

export const transactionTypeRelations = relations(transactionType, ({one, many}) => ({
	authUser: one(authUser, {
		fields: [transactionType.createdBy],
		references: [authUser.id]
	}),
	realEstates: many(realEstate),
	propertyTypes: many(propertyType),
}));

export const realEstateAgentAssignmentRelations = relations(realEstateAgentAssignment, ({one}) => ({
	salesman: one(salesman, {
		fields: [realEstateAgentAssignment.agentId],
		references: [salesman.id]
	}),
	authUser: one(authUser, {
		fields: [realEstateAgentAssignment.createdBy],
		references: [authUser.id]
	}),
	realEstate: one(realEstate, {
		fields: [realEstateAgentAssignment.realEstateId],
		references: [realEstate.id]
	}),
}));

export const salesmanRelations = relations(salesman, ({one, many}) => ({
	realEstateAgentAssignments: many(realEstateAgentAssignment),
	reconciliationBatches: many(reconciliationBatch),
	customers: many(customer),
	workMembers: many(workMember),
	jackpotSalesmanCriteria: many(jackpotSalesmanCriteria),
	jackpotRewardDistributions: many(jackpotRewardDistribution),
	officeStaffs: many(officeStaff),
	transactionReconciliations: many(transactionReconciliation),
	realEstateSalesmen: many(realEstateSalesman),
	postOffice: one(postOffice, {
		fields: [salesman.postOfficeId],
		references: [postOffice.id]
	}),
	salesman: one(salesman, {
		fields: [salesman.sManager],
		references: [salesman.id],
		relationName: "salesman_sManager_salesman_id"
	}),
	salesmen: many(salesman, {
		relationName: "salesman_sManager_salesman_id"
	}),
	realEstateTransactions_agentIdBuyer: many(realEstateTransaction, {
		relationName: "realEstateTransaction_agentIdBuyer_salesman_id"
	}),
	realEstateTransactions_agentIdSeller: many(realEstateTransaction, {
		relationName: "realEstateTransaction_agentIdSeller_salesman_id"
	}),
	realEstatePostLogs: many(realEstatePostLog),
	verifies: many(verify),
	invitedSalesmen_salesman: many(invitedSalesman, {
		relationName: "invitedSalesman_salesman_salesman_id"
	}),
	invitedSalesmen_invited: many(invitedSalesman, {
		relationName: "invitedSalesman_invited_salesman_id"
	}),
}));

export const realEstateRelations = relations(realEstate, ({one, many}) => ({
	realEstateAgentAssignments: many(realEstateAgentAssignment),
	consultations: many(consultation),
	mediaUploads: many(mediaUpload),
	authUser_createdBy: one(authUser, {
		fields: [realEstate.createdBy],
		references: [authUser.id],
		relationName: "realEstate_createdBy_authUser_id"
	}),
	authUser_customerId: one(authUser, {
		fields: [realEstate.customerId],
		references: [authUser.id],
		relationName: "realEstate_customerId_authUser_id"
	}),
	authUser_ownerId: one(authUser, {
		fields: [realEstate.ownerId],
		references: [authUser.id],
		relationName: "realEstate_ownerId_authUser_id"
	}),
	propertyType: one(propertyType, {
		fields: [realEstate.propertyTypeId],
		references: [propertyType.id]
	}),
	realEstateStatus: one(realEstateStatus, {
		fields: [realEstate.statusId],
		references: [realEstateStatus.id]
	}),
	transactionType: one(transactionType, {
		fields: [realEstate.transactionType],
		references: [transactionType.id]
	}),
	realEstateSalesmen: many(realEstateSalesman),
	realEstateTransactions: many(realEstateTransaction),
	favorites: many(favorite),
	realEstateWorks: many(realEstateWork),
	consultationSuggestions: many(consultationSuggestions),
	realEstatePostLogs: many(realEstatePostLog),
}));

export const realEstateStatusRelations = relations(realEstateStatus, ({one, many}) => ({
	authUser: one(authUser, {
		fields: [realEstateStatus.createdBy],
		references: [authUser.id]
	}),
	realEstates: many(realEstate),
	realEstateSalesmen: many(realEstateSalesman),
}));

export const transactionNotificationRelations = relations(transactionNotification, ({one}) => ({
	authUser_createdBy: one(authUser, {
		fields: [transactionNotification.createdBy],
		references: [authUser.id],
		relationName: "transactionNotification_createdBy_authUser_id"
	}),
	authUser_recipientId: one(authUser, {
		fields: [transactionNotification.recipientId],
		references: [authUser.id],
		relationName: "transactionNotification_recipientId_authUser_id"
	}),
	realEstateTransaction: one(realEstateTransaction, {
		fields: [transactionNotification.transactionId],
		references: [realEstateTransaction.id]
	}),
}));

export const realEstateTransactionRelations = relations(realEstateTransaction, ({one, many}) => ({
	transactionNotifications: many(transactionNotification),
	dbankTransactionsHistorys: many(dbankTransactionsHistorys),
	transactionReconciliations: many(transactionReconciliation),
	transactionHistories: many(transactionHistory),
	salesman_agentIdBuyer: one(salesman, {
		fields: [realEstateTransaction.agentIdBuyer],
		references: [salesman.id],
		relationName: "realEstateTransaction_agentIdBuyer_salesman_id"
	}),
	salesman_agentIdSeller: one(salesman, {
		fields: [realEstateTransaction.agentIdSeller],
		references: [salesman.id],
		relationName: "realEstateTransaction_agentIdSeller_salesman_id"
	}),
	authUser_approvedBy: one(authUser, {
		fields: [realEstateTransaction.approvedBy],
		references: [authUser.id],
		relationName: "realEstateTransaction_approvedBy_authUser_id"
	}),
	authUser_assignedTo: one(authUser, {
		fields: [realEstateTransaction.assignedTo],
		references: [authUser.id],
		relationName: "realEstateTransaction_assignedTo_authUser_id"
	}),
	customer_buyerId: one(customer, {
		fields: [realEstateTransaction.buyerId],
		references: [customer.id],
		relationName: "realEstateTransaction_buyerId_customer_id"
	}),
	realEstateTransaction_cancelledByTransactionId: one(realEstateTransaction, {
		fields: [realEstateTransaction.cancelledByTransactionId],
		references: [realEstateTransaction.id],
		relationName: "realEstateTransaction_cancelledByTransactionId_realEstateTransaction_id"
	}),
	realEstateTransactions_cancelledByTransactionId: many(realEstateTransaction, {
		relationName: "realEstateTransaction_cancelledByTransactionId_realEstateTransaction_id"
	}),
	consultation: one(consultation, {
		fields: [realEstateTransaction.consultationId],
		references: [consultation.id]
	}),
	authUser_createdBy: one(authUser, {
		fields: [realEstateTransaction.createdBy],
		references: [authUser.id],
		relationName: "realEstateTransaction_createdBy_authUser_id"
	}),
	transactionStatus: one(transactionStatus, {
		fields: [realEstateTransaction.currentStatus],
		references: [transactionStatus.id]
	}),
	realEstateTransaction_originalTransactionId: one(realEstateTransaction, {
		fields: [realEstateTransaction.originalTransactionId],
		references: [realEstateTransaction.id],
		relationName: "realEstateTransaction_originalTransactionId_realEstateTransaction_id"
	}),
	realEstateTransactions_originalTransactionId: many(realEstateTransaction, {
		relationName: "realEstateTransaction_originalTransactionId_realEstateTransaction_id"
	}),
	realEstateTransaction_parentId: one(realEstateTransaction, {
		fields: [realEstateTransaction.parentId],
		references: [realEstateTransaction.id],
		relationName: "realEstateTransaction_parentId_realEstateTransaction_id"
	}),
	realEstateTransactions_parentId: many(realEstateTransaction, {
		relationName: "realEstateTransaction_parentId_realEstateTransaction_id"
	}),
	realEstate: one(realEstate, {
		fields: [realEstateTransaction.realEstateId],
		references: [realEstate.id]
	}),
	customer_sellerId: one(customer, {
		fields: [realEstateTransaction.sellerId],
		references: [customer.id],
		relationName: "realEstateTransaction_sellerId_customer_id"
	}),
	transactionPayments: many(transactionPayment),
}));

export const withdrawRelations = relations(withdraw, ({one}) => ({
	userBank: one(userBank, {
		fields: [withdraw.userBank],
		references: [userBank.id]
	}),
}));

export const userBankRelations = relations(userBank, ({one, many}) => ({
	withdraws: many(withdraw),
	dbank: one(dbanks, {
		fields: [userBank.bank],
		references: [dbanks.id]
	}),
}));

export const reconciliationBatchRelations = relations(reconciliationBatch, ({one}) => ({
	salesman: one(salesman, {
		fields: [reconciliationBatch.agentId],
		references: [salesman.id]
	}),
	authUser_createdBy: one(authUser, {
		fields: [reconciliationBatch.createdBy],
		references: [authUser.id],
		relationName: "reconciliationBatch_createdBy_authUser_id"
	}),
	authUser_processedBy: one(authUser, {
		fields: [reconciliationBatch.processedBy],
		references: [authUser.id],
		relationName: "reconciliationBatch_processedBy_authUser_id"
	}),
}));

export const tmessageStatusRelations = relations(tmessageStatus, ({one}) => ({
	tmessage: one(tmessage, {
		fields: [tmessageStatus.tmessageId],
		references: [tmessage.id]
	}),
	tmessageType: one(tmessageType, {
		fields: [tmessageStatus.tmessageType],
		references: [tmessageType.id]
	}),
}));

export const tmessageRelations = relations(tmessage, ({one, many}) => ({
	tmessageStatuses: many(tmessageStatus),
	tmessageType: one(tmessageType, {
		fields: [tmessage.tmessageType],
		references: [tmessageType.id]
	}),
}));

export const tmessageTypeRelations = relations(tmessageType, ({many}) => ({
	tmessageStatuses: many(tmessageStatus),
	tmessages: many(tmessage),
	messageCampaigns: many(messageCampaign),
}));

export const userActivityLogRelations = relations(userActivityLog, ({one}) => ({
	authUser: one(authUser, {
		fields: [userActivityLog.authUser],
		references: [authUser.id]
	}),
}));

export const customerRelations = relations(customer, ({one, many}) => ({
	salesman: one(salesman, {
		fields: [customer.salesman],
		references: [salesman.id]
	}),
	consultations: many(consultation),
	realEstateTransactions_buyerId: many(realEstateTransaction, {
		relationName: "realEstateTransaction_buyerId_customer_id"
	}),
	realEstateTransactions_sellerId: many(realEstateTransaction, {
		relationName: "realEstateTransaction_sellerId_customer_id"
	}),
}));

export const dbanksRelations = relations(dbanks, ({one, many}) => ({
	loanPackages: many(loanPackage),
	realEstateSales: many(realEstateSale),
	authUser: one(authUser, {
		fields: [dbanks.createdBy],
		references: [authUser.id]
	}),
	userBanks: many(userBank),
}));

export const consultationRelations = relations(consultation, ({one, many}) => ({
	authUser_authUserId: one(authUser, {
		fields: [consultation.authUserId],
		references: [authUser.id],
		relationName: "consultation_authUserId_authUser_id"
	}),
	authUser_createdBy: one(authUser, {
		fields: [consultation.createdBy],
		references: [authUser.id],
		relationName: "consultation_createdBy_authUser_id"
	}),
	customer: one(customer, {
		fields: [consultation.customerId],
		references: [customer.id]
	}),
	realEstate: one(realEstate, {
		fields: [consultation.propertyId],
		references: [realEstate.id]
	}),
	authUser_statusChangedBy: one(authUser, {
		fields: [consultation.statusChangedBy],
		references: [authUser.id],
		relationName: "consultation_statusChangedBy_authUser_id"
	}),
	authUser_updatedBy: one(authUser, {
		fields: [consultation.updatedBy],
		references: [authUser.id],
		relationName: "consultation_updatedBy_authUser_id"
	}),
	authUser_userSupport: one(authUser, {
		fields: [consultation.userSupport],
		references: [authUser.id],
		relationName: "consultation_userSupport_authUser_id"
	}),
	realEstateTransactions: many(realEstateTransaction),
	consultationSuggestions: many(consultationSuggestions),
}));

export const folderRelations = relations(folder, ({one, many}) => ({
	folder: one(folder, {
		fields: [folder.parent],
		references: [folder.id],
		relationName: "folder_parent_folder_id"
	}),
	folders: many(folder, {
		relationName: "folder_parent_folder_id"
	}),
	archives: many(archives),
	dcontents: many(dcontent),
	news: many(news),
}));

export const archivesRelations = relations(archives, ({one}) => ({
	folder: one(folder, {
		fields: [archives.folder],
		references: [folder.id]
	}),
}));

export const authMembershipRelations = relations(authMembership, ({one}) => ({
	authGroup: one(authGroup, {
		fields: [authMembership.groupId],
		references: [authGroup.id]
	}),
	authUser: one(authUser, {
		fields: [authMembership.userId],
		references: [authUser.id]
	}),
}));

export const authPermissionRelations = relations(authPermission, ({one}) => ({
	authGroup: one(authGroup, {
		fields: [authPermission.groupId],
		references: [authGroup.id]
	}),
}));

export const dbankRelations = relations(dbank, ({one}) => ({
	authUser: one(authUser, {
		fields: [dbank.createdBy],
		references: [authUser.id]
	}),
}));

export const dbankTransactionsHistorysRelations = relations(dbankTransactionsHistorys, ({one}) => ({
	authUser: one(authUser, {
		fields: [dbankTransactionsHistorys.createdBy],
		references: [authUser.id]
	}),
	realEstateTransaction: one(realEstateTransaction, {
		fields: [dbankTransactionsHistorys.transactionId],
		references: [realEstateTransaction.id]
	}),
}));

export const postOfficeRelations = relations(postOffice, ({one, many}) => ({
	authGroups: many(authGroup),
	officeTerritories: many(officeTerritory),
	authUser_createdBy: one(authUser, {
		fields: [postOffice.createdBy],
		references: [authUser.id],
		relationName: "postOffice_createdBy_authUser_id"
	}),
	authUser_managerUserId: one(authUser, {
		fields: [postOffice.managerUserId],
		references: [authUser.id],
		relationName: "postOffice_managerUserId_authUser_id"
	}),
	postOffice: one(postOffice, {
		fields: [postOffice.parentId],
		references: [postOffice.id],
		relationName: "postOffice_parentId_postOffice_id"
	}),
	postOffices: many(postOffice, {
		relationName: "postOffice_parentId_postOffice_id"
	}),
	officePermissionSet: one(officePermissionSet, {
		fields: [postOffice.permissionSetId],
		references: [officePermissionSet.id]
	}),
	officeStaffs: many(officeStaff),
	salesmen: many(salesman),
	officeDepartments: many(officeDepartment),
	officePositions: many(officePosition),
}));

export const dcontentRelations = relations(dcontent, ({one}) => ({
	folder: one(folder, {
		fields: [dcontent.folder],
		references: [folder.id]
	}),
}));

export const workMemberRelations = relations(workMember, ({one}) => ({
	authUser: one(authUser, {
		fields: [workMember.createdBy],
		references: [authUser.id]
	}),
	salesman: one(salesman, {
		fields: [workMember.salesmanId],
		references: [salesman.id]
	}),
	realEstateWork: one(realEstateWork, {
		fields: [workMember.workId],
		references: [realEstateWork.id]
	}),
}));

export const realEstateWorkRelations = relations(realEstateWork, ({one, many}) => ({
	workMembers: many(workMember),
	authUser_assignedTo: one(authUser, {
		fields: [realEstateWork.assignedTo],
		references: [authUser.id],
		relationName: "realEstateWork_assignedTo_authUser_id"
	}),
	authUser_createdBy: one(authUser, {
		fields: [realEstateWork.createdBy],
		references: [authUser.id],
		relationName: "realEstateWork_createdBy_authUser_id"
	}),
	realEstate: one(realEstate, {
		fields: [realEstateWork.realEstateId],
		references: [realEstate.id]
	}),
	workTemplate: one(workTemplate, {
		fields: [realEstateWork.templateId],
		references: [workTemplate.id]
	}),
}));

export const realEstateSaleRelations = relations(realEstateSale, ({one, many}) => ({
	dbank: one(dbanks, {
		fields: [realEstateSale.bank],
		references: [dbanks.id]
	}),
	authUser: one(authUser, {
		fields: [realEstateSale.createdBy],
		references: [authUser.id]
	}),
	project: one(project, {
		fields: [realEstateSale.projectId],
		references: [project.id]
	}),
	realEstateSaleRegisters: many(realEstateSaleRegister),
	jackpotSalesmanCriteria: many(jackpotSalesmanCriteria),
	jackpotConfigs: many(jackpotConfig),
}));

export const projectRelations = relations(project, ({one, many}) => ({
	realEstateSales: many(realEstateSale),
	realEstateSaleRegisters: many(realEstateSaleRegister),
	jackpotConfigs: many(jackpotConfig),
	authUser: one(authUser, {
		fields: [project.createdBy],
		references: [authUser.id]
	}),
	project: one(project, {
		fields: [project.parentId],
		references: [project.id],
		relationName: "project_parentId_project_id"
	}),
	projects: many(project, {
		relationName: "project_parentId_project_id"
	}),
	propertyType: one(propertyType, {
		fields: [project.projectType],
		references: [propertyType.id]
	}),
}));

export const realEstateSaleRegisterRelations = relations(realEstateSaleRegister, ({one}) => ({
	authUser: one(authUser, {
		fields: [realEstateSaleRegister.createdBy],
		references: [authUser.id]
	}),
	project: one(project, {
		fields: [realEstateSaleRegister.projectId],
		references: [project.id]
	}),
	realEstateSale: one(realEstateSale, {
		fields: [realEstateSaleRegister.realEstateSale],
		references: [realEstateSale.id]
	}),
}));

export const jackpotSalesmanCriteriaRelations = relations(jackpotSalesmanCriteria, ({one, many}) => ({
	authUser: one(authUser, {
		fields: [jackpotSalesmanCriteria.createdBy],
		references: [authUser.id]
	}),
	jackpotConfig: one(jackpotConfig, {
		fields: [jackpotSalesmanCriteria.jackpotConfigId],
		references: [jackpotConfig.id]
	}),
	realEstateSale: one(realEstateSale, {
		fields: [jackpotSalesmanCriteria.realEstateSaleId],
		references: [realEstateSale.id]
	}),
	salesman: one(salesman, {
		fields: [jackpotSalesmanCriteria.salesmanId],
		references: [salesman.id]
	}),
	jackpotSalesmanCriteriaValues: many(jackpotSalesmanCriteriaValue),
}));

export const jackpotConfigRelations = relations(jackpotConfig, ({one, many}) => ({
	jackpotSalesmanCriteria: many(jackpotSalesmanCriteria),
	jackpotRewardDistributions: many(jackpotRewardDistribution),
	jackpotCalculationHistories: many(jackpotCalculationHistory),
	authUser_createdBy: one(authUser, {
		fields: [jackpotConfig.createdBy],
		references: [authUser.id],
		relationName: "jackpotConfig_createdBy_authUser_id"
	}),
	authUser_modifiedBy: one(authUser, {
		fields: [jackpotConfig.modifiedBy],
		references: [authUser.id],
		relationName: "jackpotConfig_modifiedBy_authUser_id"
	}),
	project: one(project, {
		fields: [jackpotConfig.projectId],
		references: [project.id]
	}),
	realEstateSale: one(realEstateSale, {
		fields: [jackpotConfig.realEstateSaleId],
		references: [realEstateSale.id]
	}),
	jackpotApartmentGroups: many(jackpotApartmentGroup),
	jackpotRankingCriteria: many(jackpotRankingCriteria),
}));

export const jackpotSalesmanCriteriaValueRelations = relations(jackpotSalesmanCriteriaValue, ({one}) => ({
	jackpotSalesmanCriterion: one(jackpotSalesmanCriteria, {
		fields: [jackpotSalesmanCriteriaValue.jackpotSalesmanCriteriaId],
		references: [jackpotSalesmanCriteria.id]
	}),
	jackpotRankingCriterion: one(jackpotRankingCriteria, {
		fields: [jackpotSalesmanCriteriaValue.jackpotRankingCriteriaId],
		references: [jackpotRankingCriteria.id]
	}),
	authUser: one(authUser, {
		fields: [jackpotSalesmanCriteriaValue.createdBy],
		references: [authUser.id]
	}),
}));

export const jackpotRankingCriteriaRelations = relations(jackpotRankingCriteria, ({one, many}) => ({
	jackpotSalesmanCriteriaValues: many(jackpotSalesmanCriteriaValue),
	config: one(config, {
		fields: [jackpotRankingCriteria.configId],
		references: [config.id]
	}),
	authUser: one(authUser, {
		fields: [jackpotRankingCriteria.createdBy],
		references: [authUser.id]
	}),
	jackpotConfig: one(jackpotConfig, {
		fields: [jackpotRankingCriteria.jackpotConfigId],
		references: [jackpotConfig.id]
	}),
}));

export const jackpotRewardDistributionRelations = relations(jackpotRewardDistribution, ({one}) => ({
	authUser_createdBy: one(authUser, {
		fields: [jackpotRewardDistribution.createdBy],
		references: [authUser.id],
		relationName: "jackpotRewardDistribution_createdBy_authUser_id"
	}),
	jackpotConfig: one(jackpotConfig, {
		fields: [jackpotRewardDistribution.jackpotConfigId],
		references: [jackpotConfig.id]
	}),
	authUser_paidBy: one(authUser, {
		fields: [jackpotRewardDistribution.paidBy],
		references: [authUser.id],
		relationName: "jackpotRewardDistribution_paidBy_authUser_id"
	}),
	salesman: one(salesman, {
		fields: [jackpotRewardDistribution.salesmanId],
		references: [salesman.id]
	}),
}));

export const logErrorRelations = relations(logError, ({one}) => ({
	authUser: one(authUser, {
		fields: [logError.authUser],
		references: [authUser.id]
	}),
}));

export const mediaUploadRelations = relations(mediaUpload, ({one}) => ({
	realEstate: one(realEstate, {
		fields: [mediaUpload.realEstateId],
		references: [realEstate.id]
	}),
	authUser: one(authUser, {
		fields: [mediaUpload.verifiedBy],
		references: [authUser.id]
	}),
}));

export const officePermissionSetRelations = relations(officePermissionSet, ({one, many}) => ({
	officePermissionSet: one(officePermissionSet, {
		fields: [officePermissionSet.basedOnSetId],
		references: [officePermissionSet.id],
		relationName: "officePermissionSet_basedOnSetId_officePermissionSet_id"
	}),
	officePermissionSets: many(officePermissionSet, {
		relationName: "officePermissionSet_basedOnSetId_officePermissionSet_id"
	}),
	authUser: one(authUser, {
		fields: [officePermissionSet.createdBy],
		references: [authUser.id]
	}),
	postOffices: many(postOffice),
	officePermissions: many(officePermission),
	menuPermissions: many(menuPermission),
}));

export const officeTerritoryRelations = relations(officeTerritory, ({one}) => ({
	authUser: one(authUser, {
		fields: [officeTerritory.createdBy],
		references: [authUser.id]
	}),
	postOffice: one(postOffice, {
		fields: [officeTerritory.postOfficeId],
		references: [postOffice.id]
	}),
}));

export const propertyTypeRelations = relations(propertyType, ({one, many}) => ({
	realEstates: many(realEstate),
	projects: many(project),
	authUser: one(authUser, {
		fields: [propertyType.createdBy],
		references: [authUser.id]
	}),
	propertyType: one(propertyType, {
		fields: [propertyType.parentId],
		references: [propertyType.id],
		relationName: "propertyType_parentId_propertyType_id"
	}),
	propertyTypes: many(propertyType, {
		relationName: "propertyType_parentId_propertyType_id"
	}),
	transactionType: one(transactionType, {
		fields: [propertyType.transactionType],
		references: [transactionType.id]
	}),
}));

export const staffWorkAreaRelations = relations(staffWorkArea, ({one}) => ({
	authUser: one(authUser, {
		fields: [staffWorkArea.createdBy],
		references: [authUser.id]
	}),
	officeStaff: one(officeStaff, {
		fields: [staffWorkArea.officeStaffId],
		references: [officeStaff.id]
	}),
}));

export const officeStaffRelations = relations(officeStaff, ({one, many}) => ({
	staffWorkAreas: many(staffWorkArea),
	authUser_authUserId: one(authUser, {
		fields: [officeStaff.authUserId],
		references: [authUser.id],
		relationName: "officeStaff_authUserId_authUser_id"
	}),
	authUser_createdBy: one(authUser, {
		fields: [officeStaff.createdBy],
		references: [authUser.id],
		relationName: "officeStaff_createdBy_authUser_id"
	}),
	officeStaff: one(officeStaff, {
		fields: [officeStaff.managerId],
		references: [officeStaff.id],
		relationName: "officeStaff_managerId_officeStaff_id"
	}),
	officeStaffs: many(officeStaff, {
		relationName: "officeStaff_managerId_officeStaff_id"
	}),
	postOffice: one(postOffice, {
		fields: [officeStaff.postOfficeId],
		references: [postOffice.id]
	}),
	salesman: one(salesman, {
		fields: [officeStaff.salesmanId],
		references: [salesman.id]
	}),
	officeDepartments: many(officeDepartment),
	officeStaffDepartments: many(officeStaffDepartment),
}));

export const officePermissionRelations = relations(officePermission, ({one}) => ({
	authUser: one(authUser, {
		fields: [officePermission.createdBy],
		references: [authUser.id]
	}),
	officePermissionSet: one(officePermissionSet, {
		fields: [officePermission.permissionSetId],
		references: [officePermissionSet.id]
	}),
	officePosition: one(officePosition, {
		fields: [officePermission.positionId],
		references: [officePosition.id]
	}),
}));

export const officePositionRelations = relations(officePosition, ({one, many}) => ({
	officePermissions: many(officePermission),
	menuPermissions: many(menuPermission),
	officeStaffDepartments: many(officeStaffDepartment),
	authGroup: one(authGroup, {
		fields: [officePosition.authGroupId],
		references: [authGroup.id]
	}),
	authUser: one(authUser, {
		fields: [officePosition.createdBy],
		references: [authUser.id]
	}),
	officeDepartment: one(officeDepartment, {
		fields: [officePosition.departmentId],
		references: [officeDepartment.id]
	}),
	officePosition: one(officePosition, {
		fields: [officePosition.parentId],
		references: [officePosition.id],
		relationName: "officePosition_parentId_officePosition_id"
	}),
	officePositions: many(officePosition, {
		relationName: "officePosition_parentId_officePosition_id"
	}),
	postOffice: one(postOffice, {
		fields: [officePosition.postOfficeId],
		references: [postOffice.id]
	}),
}));

export const systemFunctionRelations = relations(systemFunction, ({one, many}) => ({
	systemMenu_menuId: one(systemMenu, {
		fields: [systemFunction.menuId],
		references: [systemMenu.id],
		relationName: "systemFunction_menuId_systemMenu_id"
	}),
	authUser: one(authUser, {
		fields: [systemFunction.createdBy],
		references: [authUser.id]
	}),
	systemFunction: one(systemFunction, {
		fields: [systemFunction.parentFunctionCode],
		references: [systemFunction.functionCode],
		relationName: "systemFunction_parentFunctionCode_systemFunction_functionCode"
	}),
	systemFunctions: many(systemFunction, {
		relationName: "systemFunction_parentFunctionCode_systemFunction_functionCode"
	}),
	systemMenu_parentMenuId: one(systemMenu, {
		fields: [systemFunction.parentMenuId],
		references: [systemMenu.id],
		relationName: "systemFunction_parentMenuId_systemMenu_id"
	}),
	menuFunctionMappings: many(menuFunctionMapping),
	functionScopePermissions: many(functionScopePermission),
}));

export const systemMenuRelations = relations(systemMenu, ({one, many}) => ({
	systemFunctions_menuId: many(systemFunction, {
		relationName: "systemFunction_menuId_systemMenu_id"
	}),
	systemFunctions_parentMenuId: many(systemFunction, {
		relationName: "systemFunction_parentMenuId_systemMenu_id"
	}),
	authUser: one(authUser, {
		fields: [systemMenu.createdBy],
		references: [authUser.id]
	}),
	systemMenu: one(systemMenu, {
		fields: [systemMenu.parentId],
		references: [systemMenu.id],
		relationName: "systemMenu_parentId_systemMenu_id"
	}),
	systemMenus: many(systemMenu, {
		relationName: "systemMenu_parentId_systemMenu_id"
	}),
	menuFunctionMappings: many(menuFunctionMapping),
	menuPermissions: many(menuPermission),
}));

export const transactionReconciliationRelations = relations(transactionReconciliation, ({one, many}) => ({
	salesman: one(salesman, {
		fields: [transactionReconciliation.agentId],
		references: [salesman.id]
	}),
	authUser_createdBy: one(authUser, {
		fields: [transactionReconciliation.createdBy],
		references: [authUser.id],
		relationName: "transactionReconciliation_createdBy_authUser_id"
	}),
	authUser_processedBy: one(authUser, {
		fields: [transactionReconciliation.processedBy],
		references: [authUser.id],
		relationName: "transactionReconciliation_processedBy_authUser_id"
	}),
	realEstateTransaction: one(realEstateTransaction, {
		fields: [transactionReconciliation.transactionId],
		references: [realEstateTransaction.id]
	}),
	reconciliationDisputes: many(reconciliationDispute),
}));

export const menuFunctionMappingRelations = relations(menuFunctionMapping, ({one}) => ({
	authUser: one(authUser, {
		fields: [menuFunctionMapping.createdBy],
		references: [authUser.id]
	}),
	systemFunction: one(systemFunction, {
		fields: [menuFunctionMapping.functionId],
		references: [systemFunction.id]
	}),
	systemMenu: one(systemMenu, {
		fields: [menuFunctionMapping.menuId],
		references: [systemMenu.id]
	}),
}));

export const jackpotCalculationHistoryRelations = relations(jackpotCalculationHistory, ({one}) => ({
	authUser: one(authUser, {
		fields: [jackpotCalculationHistory.createdBy],
		references: [authUser.id]
	}),
	jackpotConfig: one(jackpotConfig, {
		fields: [jackpotCalculationHistory.jackpotConfigId],
		references: [jackpotConfig.id]
	}),
}));

export const menuPermissionRelations = relations(menuPermission, ({one}) => ({
	authGroup: one(authGroup, {
		fields: [menuPermission.authGroup],
		references: [authGroup.id]
	}),
	authUser: one(authUser, {
		fields: [menuPermission.createdBy],
		references: [authUser.id]
	}),
	systemMenu: one(systemMenu, {
		fields: [menuPermission.menuId],
		references: [systemMenu.id]
	}),
	officePermissionSet: one(officePermissionSet, {
		fields: [menuPermission.permissionSetId],
		references: [officePermissionSet.id]
	}),
	officePosition: one(officePosition, {
		fields: [menuPermission.positionId],
		references: [officePosition.id]
	}),
}));

export const jackpotApartmentGroupRelations = relations(jackpotApartmentGroup, ({one}) => ({
	jackpotConfig: one(jackpotConfig, {
		fields: [jackpotApartmentGroup.jackpotConfigId],
		references: [jackpotConfig.id]
	}),
}));

export const realEstateSalesmanRelations = relations(realEstateSalesman, ({one}) => ({
	authUser: one(authUser, {
		fields: [realEstateSalesman.createdBy],
		references: [authUser.id]
	}),
	realEstate: one(realEstate, {
		fields: [realEstateSalesman.realEstateId],
		references: [realEstate.id]
	}),
	realEstateStatus: one(realEstateStatus, {
		fields: [realEstateSalesman.realEstateStatus],
		references: [realEstateStatus.id]
	}),
	salesman: one(salesman, {
		fields: [realEstateSalesman.salesmanId],
		references: [salesman.id]
	}),
}));

export const newsRelations = relations(news, ({one, many}) => ({
	newsCategory: one(newsCategory, {
		fields: [news.category],
		references: [newsCategory.id]
	}),
	folder: one(folder, {
		fields: [news.folder],
		references: [folder.id]
	}),
	giftLogs: many(giftLog),
}));

export const newsCategoryRelations = relations(newsCategory, ({many}) => ({
	news: many(news),
}));

export const transactionHistoryRelations = relations(transactionHistory, ({one}) => ({
	transactionStatus_newStatus: one(transactionStatus, {
		fields: [transactionHistory.newStatus],
		references: [transactionStatus.id],
		relationName: "transactionHistory_newStatus_transactionStatus_id"
	}),
	authUser: one(authUser, {
		fields: [transactionHistory.performedBy],
		references: [authUser.id]
	}),
	transactionStatus_previousStatus: one(transactionStatus, {
		fields: [transactionHistory.previousStatus],
		references: [transactionStatus.id],
		relationName: "transactionHistory_previousStatus_transactionStatus_id"
	}),
	realEstateTransaction: one(realEstateTransaction, {
		fields: [transactionHistory.transactionId],
		references: [realEstateTransaction.id]
	}),
}));

export const transactionStatusRelations = relations(transactionStatus, ({one, many}) => ({
	transactionHistories_newStatus: many(transactionHistory, {
		relationName: "transactionHistory_newStatus_transactionStatus_id"
	}),
	transactionHistories_previousStatus: many(transactionHistory, {
		relationName: "transactionHistory_previousStatus_transactionStatus_id"
	}),
	realEstateTransactions: many(realEstateTransaction),
	authUser: one(authUser, {
		fields: [transactionStatus.createdBy],
		references: [authUser.id]
	}),
}));

export const favoriteRelations = relations(favorite, ({one}) => ({
	favoriteGroup: one(favoriteGroup, {
		fields: [favorite.favoriteGroup],
		references: [favoriteGroup.id]
	}),
	realEstate: one(realEstate, {
		fields: [favorite.realEstate],
		references: [realEstate.id]
	}),
}));

export const favoriteGroupRelations = relations(favoriteGroup, ({many}) => ({
	favorites: many(favorite),
}));

export const objectsRelations = relations(objects, ({one, many}) => ({
	authGroup_authGroup: one(authGroup, {
		fields: [objects.authGroup],
		references: [authGroup.id],
		relationName: "objects_authGroup_authGroup_id"
	}),
	authGroup_authOrg: one(authGroup, {
		fields: [objects.authOrg],
		references: [authGroup.id],
		relationName: "objects_authOrg_authGroup_id"
	}),
	process: one(process, {
		fields: [objects.process],
		references: [process.id]
	}),
	processLogs: many(processLog),
}));

export const processRelations = relations(process, ({one, many}) => ({
	objects: many(objects),
	process: one(process, {
		fields: [process.pnext],
		references: [process.id],
		relationName: "process_pnext_process_id"
	}),
	processes: many(process, {
		relationName: "process_pnext_process_id"
	}),
	procedure: one(procedures, {
		fields: [process.procedures],
		references: [procedures.id]
	}),
	processLogs: many(processLog),
}));

export const processLogRelations = relations(processLog, ({one}) => ({
	authGroup: one(authGroup, {
		fields: [processLog.authGroup],
		references: [authGroup.id]
	}),
	object: one(objects, {
		fields: [processLog.objects],
		references: [objects.id]
	}),
	process: one(process, {
		fields: [processLog.process],
		references: [process.id]
	}),
}));

export const realEstateCommentRelations = relations(realEstateComment, ({one, many}) => ({
	authUser_createdBy: one(authUser, {
		fields: [realEstateComment.createdBy],
		references: [authUser.id],
		relationName: "realEstateComment_createdBy_authUser_id"
	}),
	realEstateComment: one(realEstateComment, {
		fields: [realEstateComment.replyToCommentId],
		references: [realEstateComment.id],
		relationName: "realEstateComment_replyToCommentId_realEstateComment_id"
	}),
	realEstateComments: many(realEstateComment, {
		relationName: "realEstateComment_replyToCommentId_realEstateComment_id"
	}),
	authUser_updatedBy: one(authUser, {
		fields: [realEstateComment.updatedBy],
		references: [authUser.id],
		relationName: "realEstateComment_updatedBy_authUser_id"
	}),
	authUser_userId: one(authUser, {
		fields: [realEstateComment.userId],
		references: [authUser.id],
		relationName: "realEstateComment_userId_authUser_id"
	}),
}));

export const rocketConfigRelations = relations(rocketConfig, ({one, many}) => ({
	authUser: one(authUser, {
		fields: [rocketConfig.authUserId],
		references: [authUser.id]
	}),
	rocketRooms: many(rocketRoom),
}));

export const rocketRoomRelations = relations(rocketRoom, ({one}) => ({
	rocketConfig: one(rocketConfig, {
		fields: [rocketRoom.rocketConfig],
		references: [rocketConfig.id]
	}),
}));

export const transactionDocumentRelations = relations(transactionDocument, ({one}) => ({
	authUser_uploadedBy: one(authUser, {
		fields: [transactionDocument.uploadedBy],
		references: [authUser.id],
		relationName: "transactionDocument_uploadedBy_authUser_id"
	}),
	authUser_verifiedBy: one(authUser, {
		fields: [transactionDocument.verifiedBy],
		references: [authUser.id],
		relationName: "transactionDocument_verifiedBy_authUser_id"
	}),
}));

export const workTemplateRelations = relations(workTemplate, ({one, many}) => ({
	realEstateWorks: many(realEstateWork),
	authUser: one(authUser, {
		fields: [workTemplate.createdBy],
		references: [authUser.id]
	}),
}));

export const giftLogRelations = relations(giftLog, ({one}) => ({
	news: one(news, {
		fields: [giftLog.news],
		references: [news.id]
	}),
}));

export const tablefieldRelations = relations(tablefield, ({one}) => ({
	dfield: one(dfield, {
		fields: [tablefield.dfield],
		references: [dfield.id]
	}),
	dtable: one(dtable, {
		fields: [tablefield.dtable],
		references: [dtable.id]
	}),
}));

export const dfieldRelations = relations(dfield, ({many}) => ({
	tablefields: many(tablefield),
}));

export const dtableRelations = relations(dtable, ({many}) => ({
	tablefields: many(tablefield),
}));

export const typeFieldRelations = relations(typeField, ({one}) => ({
	authUser: one(authUser, {
		fields: [typeField.createdBy],
		references: [authUser.id]
	}),
}));

export const salesmanSupportRelations = relations(salesmanSupport, ({one}) => ({
	authUser: one(authUser, {
		fields: [salesmanSupport.userSupport],
		references: [authUser.id]
	}),
}));

export const consultationSuggestionsRelations = relations(consultationSuggestions, ({one}) => ({
	consultation: one(consultation, {
		fields: [consultationSuggestions.consultationId],
		references: [consultation.id]
	}),
	authUser: one(authUser, {
		fields: [consultationSuggestions.createdBy],
		references: [authUser.id]
	}),
	realEstate: one(realEstate, {
		fields: [consultationSuggestions.realEstateId],
		references: [realEstate.id]
	}),
}));

export const notificationRelations = relations(notification, ({one}) => ({
	authUser: one(authUser, {
		fields: [notification.authUser],
		references: [authUser.id]
	}),
}));

export const realEstatePostLogRelations = relations(realEstatePostLog, ({one}) => ({
	authUser: one(authUser, {
		fields: [realEstatePostLog.createdBy],
		references: [authUser.id]
	}),
	realEstate: one(realEstate, {
		fields: [realEstatePostLog.realEstateId],
		references: [realEstate.id]
	}),
	salesman: one(salesman, {
		fields: [realEstatePostLog.salesmanId],
		references: [salesman.id]
	}),
}));

export const messageCampaignRelations = relations(messageCampaign, ({one, many}) => ({
	tmessageType: one(tmessageType, {
		fields: [messageCampaign.tmessageType],
		references: [tmessageType.id]
	}),
	conditionValues: many(conditionValues),
}));

export const reconciliationDisputeRelations = relations(reconciliationDispute, ({one}) => ({
	authUser_createdBy: one(authUser, {
		fields: [reconciliationDispute.createdBy],
		references: [authUser.id],
		relationName: "reconciliationDispute_createdBy_authUser_id"
	}),
	authUser_escalatedTo: one(authUser, {
		fields: [reconciliationDispute.escalatedTo],
		references: [authUser.id],
		relationName: "reconciliationDispute_escalatedTo_authUser_id"
	}),
	transactionReconciliation: one(transactionReconciliation, {
		fields: [reconciliationDispute.reconciliationId],
		references: [transactionReconciliation.id]
	}),
	authUser_resolutionBy: one(authUser, {
		fields: [reconciliationDispute.resolutionBy],
		references: [authUser.id],
		relationName: "reconciliationDispute_resolutionBy_authUser_id"
	}),
}));

export const transactionPaymentRelations = relations(transactionPayment, ({one}) => ({
	authUser_createdBy: one(authUser, {
		fields: [transactionPayment.createdBy],
		references: [authUser.id],
		relationName: "transactionPayment_createdBy_authUser_id"
	}),
	realEstateTransaction: one(realEstateTransaction, {
		fields: [transactionPayment.transactionId],
		references: [realEstateTransaction.id]
	}),
	authUser_verifiedBy: one(authUser, {
		fields: [transactionPayment.verifiedBy],
		references: [authUser.id],
		relationName: "transactionPayment_verifiedBy_authUser_id"
	}),
}));

export const walletSettingsRelations = relations(walletSettings, ({one}) => ({
	authUser: one(authUser, {
		fields: [walletSettings.createdBy],
		references: [authUser.id]
	}),
}));

export const withdrawControlRelations = relations(withdrawControl, ({one}) => ({
	authUser_createdBy: one(authUser, {
		fields: [withdrawControl.createdBy],
		references: [authUser.id],
		relationName: "withdrawControl_createdBy_authUser_id"
	}),
	authUser_processedBy: one(authUser, {
		fields: [withdrawControl.processedBy],
		references: [authUser.id],
		relationName: "withdrawControl_processedBy_authUser_id"
	}),
}));

export const verifyRelations = relations(verify, ({one}) => ({
	authUser: one(authUser, {
		fields: [verify.authUserId],
		references: [authUser.id]
	}),
	salesman: one(salesman, {
		fields: [verify.salesman],
		references: [salesman.id]
	}),
}));

export const invitedSalesmanRelations = relations(invitedSalesman, ({one}) => ({
	salesman_salesman: one(salesman, {
		fields: [invitedSalesman.salesman],
		references: [salesman.id],
		relationName: "invitedSalesman_salesman_salesman_id"
	}),
	salesman_invited: one(salesman, {
		fields: [invitedSalesman.invited],
		references: [salesman.id],
		relationName: "invitedSalesman_invited_salesman_id"
	}),
}));

export const configRelations = relations(config, ({one, many}) => ({
	configType: one(configTypes, {
		fields: [config.configType],
		references: [configTypes.id]
	}),
	jackpotRankingCriteria: many(jackpotRankingCriteria),
}));

export const configTypesRelations = relations(configTypes, ({many}) => ({
	configs: many(config),
}));

export const conditionValuesRelations = relations(conditionValues, ({one}) => ({
	messageCampaign: one(messageCampaign, {
		fields: [conditionValues.campaignId],
		references: [messageCampaign.id]
	}),
	authUser_createdBy: one(authUser, {
		fields: [conditionValues.createdBy],
		references: [authUser.id],
		relationName: "conditionValues_createdBy_authUser_id"
	}),
	authUser_updatedBy: one(authUser, {
		fields: [conditionValues.updatedBy],
		references: [authUser.id],
		relationName: "conditionValues_updatedBy_authUser_id"
	}),
}));

export const contextRelations = relations(context, ({one, many}) => ({
	authUser: one(authUser, {
		fields: [context.createdBy],
		references: [authUser.id]
	}),
	conditionTypes: many(conditionType),
}));

export const campaignConditionsRelations = relations(campaignConditions, ({one, many}) => ({
	campaignCondition: one(campaignConditions, {
		fields: [campaignConditions.parentId],
		references: [campaignConditions.id],
		relationName: "campaignConditions_parentId_campaignConditions_id"
	}),
	campaignConditions: many(campaignConditions, {
		relationName: "campaignConditions_parentId_campaignConditions_id"
	}),
}));

export const conditionTypeRelations = relations(conditionType, ({one}) => ({
	context: one(context, {
		fields: [conditionType.contextId],
		references: [context.id]
	}),
	authUser: one(authUser, {
		fields: [conditionType.createdBy],
		references: [authUser.id]
	}),
}));

export const functionScopePermissionRelations = relations(functionScopePermission, ({one}) => ({
	authGroup: one(authGroup, {
		fields: [functionScopePermission.authGroup],
		references: [authGroup.id]
	}),
	authUser_createdBy: one(authUser, {
		fields: [functionScopePermission.createdBy],
		references: [authUser.id],
		relationName: "functionScopePermission_createdBy_authUser_id"
	}),
	systemFunction: one(systemFunction, {
		fields: [functionScopePermission.functionId],
		references: [systemFunction.id]
	}),
	authUser_modifiedBy: one(authUser, {
		fields: [functionScopePermission.modifiedBy],
		references: [authUser.id],
		relationName: "functionScopePermission_modifiedBy_authUser_id"
	}),
}));

export const officeDepartmentRelations = relations(officeDepartment, ({one, many}) => ({
	authUser: one(authUser, {
		fields: [officeDepartment.createdBy],
		references: [authUser.id]
	}),
	officeStaff: one(officeStaff, {
		fields: [officeDepartment.managerStaffId],
		references: [officeStaff.id]
	}),
	officeDepartment: one(officeDepartment, {
		fields: [officeDepartment.parentId],
		references: [officeDepartment.id],
		relationName: "officeDepartment_parentId_officeDepartment_id"
	}),
	officeDepartments: many(officeDepartment, {
		relationName: "officeDepartment_parentId_officeDepartment_id"
	}),
	postOffice: one(postOffice, {
		fields: [officeDepartment.postOfficeId],
		references: [postOffice.id]
	}),
	officeStaffDepartments: many(officeStaffDepartment),
	officePositions: many(officePosition),
}));

export const officeStaffDepartmentRelations = relations(officeStaffDepartment, ({one}) => ({
	authUser: one(authUser, {
		fields: [officeStaffDepartment.createdBy],
		references: [authUser.id]
	}),
	officeDepartment: one(officeDepartment, {
		fields: [officeStaffDepartment.departmentId],
		references: [officeDepartment.id]
	}),
	officeStaff: one(officeStaff, {
		fields: [officeStaffDepartment.officeStaffId],
		references: [officeStaff.id]
	}),
	officePosition: one(officePosition, {
		fields: [officeStaffDepartment.positionId],
		references: [officePosition.id]
	}),
}));

export const tagsRelations = relations(tags, ({one, many}) => ({
	tagGroup: one(tagGroups, {
		fields: [tags.groupId],
		references: [tagGroups.id]
	}),
	entityTags: many(entityTags),
}));

export const tagGroupsRelations = relations(tagGroups, ({one, many}) => ({
	tags: many(tags),
	tagCategory: one(tagCategories, {
		fields: [tagGroups.categoryId],
		references: [tagCategories.id]
	}),
}));

export const tagCategoriesRelations = relations(tagCategories, ({many}) => ({
	tagGroups: many(tagGroups),
}));

export const entityTagsRelations = relations(entityTags, ({one}) => ({
	authUser: one(authUser, {
		fields: [entityTags.createdBy],
		references: [authUser.id]
	}),
	tag: one(tags, {
		fields: [entityTags.tagId],
		references: [tags.id]
	}),
}));