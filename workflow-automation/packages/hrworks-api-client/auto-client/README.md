# @hrworks/auto-client@1.0.0

A TypeScript SDK client for the api.hrworks.de API.

## Usage

First, install the SDK from npm.

```bash
npm install @hrworks/auto-client --save
```

Next, try it out.


```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { CreateAbsenceTypesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // EditAbsenceTypesRequest (optional)
    editAbsenceTypesRequest: ...,
  } satisfies CreateAbsenceTypesRequest;

  try {
    const data = await api.createAbsenceTypes(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```


## Documentation

### API Endpoints

All URIs are relative to *https://api.hrworks.de*

| Class | Method | HTTP request | Description
| ----- | ------ | ------------ | -------------
*AbsencesApi* | [**createAbsenceTypes**](docs/AbsencesApi.md#createabsencetypes) | **POST** /v2/absences/absence-types | POST Absence Types
*AbsencesApi* | [**createAbsences**](docs/AbsencesApi.md#createabsencesoperation) | **POST** /v2/absences | POST Absences
*AbsencesApi* | [**deleteAbsence**](docs/AbsencesApi.md#deleteabsence) | **DELETE** /v2/absences/{number} | DELETE Single Absence
*AbsencesApi* | [**deleteAbsences**](docs/AbsencesApi.md#deleteabsences) | **DELETE** /v2/absences | DELETE Absences
*AbsencesApi* | [**editAbsences**](docs/AbsencesApi.md#editabsencesoperation) | **PUT** /v2/absences | PUT Absences
*AbsencesApi* | [**editSingleAbsence**](docs/AbsencesApi.md#editsingleabsence) | **PUT** /v2/absences/{number} | PUT Single Absence
*AbsencesApi* | [**getAbsences**](docs/AbsencesApi.md#getabsences) | **GET** /v2/absences/{number} | GET Single Absence
*AbsencesApi* | [**getEditAbsenceTypesStatus**](docs/AbsencesApi.md#geteditabsencetypesstatus) | **GET** /v2/absences/absence-types/jobs/{jobId} | GET Absence Types Jobs
*AbsencesApi* | [**getEditAbsencesStatus**](docs/AbsencesApi.md#geteditabsencesstatus) | **GET** /v2/absences/jobs/{jobId} | GET Absences Jobs
*AbsencesApi* | [**getLeaveAccountData**](docs/AbsencesApi.md#getleaveaccountdata) | **GET** /v2/absences/leave-accounts | GET Leave Account Data
*AbsencesApi* | [**listAbsenceTypes**](docs/AbsencesApi.md#listabsencetypes) | **GET** /v2/absences/absence-types | GET Absence Types
*AbsencesApi* | [**listAbsences**](docs/AbsencesApi.md#listabsences) | **GET** /v2/absences | GET Absences
*AbsencesApi* | [**listAbsencesAccumulated**](docs/AbsencesApi.md#listabsencesaccumulated) | **GET** /v2/absences/accumulated-values | GET Accumulated Absences
*AbsencesApi* | [**listAbsencesVacationTypes**](docs/AbsencesApi.md#listabsencesvacationtypes) | **GET** /v2/absences/vacation-types | GET Vacation Types
*ApplicantManagementApi* | [**createJobApplicationFiles**](docs/ApplicantManagementApi.md#createjobapplicationfiles) | **POST** /v2/applicant-management/job-applications/{id}/files | POST Job Application Files
*ApplicantManagementApi* | [**createJobApplications**](docs/ApplicantManagementApi.md#createjobapplicationsoperation) | **POST** /v2/applicant-management/job-applications | POST Job Applications
*ApplicantManagementApi* | [**getApplicant**](docs/ApplicantManagementApi.md#getapplicant) | **GET** /v2/applicant-management/applicants/{uuid} | GET Single Applicant
*ApplicantManagementApi* | [**getEditJobApplicationsStatus**](docs/ApplicantManagementApi.md#geteditjobapplicationsstatus) | **GET** /v2/applicant-management/job-applications/jobs/{jobId} | GET Job Applications Jobs
*ApplicantManagementApi* | [**getPost**](docs/ApplicantManagementApi.md#getpost) | **GET** /v2/applicant-management/posts/{uuid} | GET Single Post
*ApplicantManagementApi* | [**listApplicants**](docs/ApplicantManagementApi.md#listapplicants) | **GET** /v2/applicant-management/applicants | GET Applicants
*ApplicantManagementApi* | [**listJobApplications**](docs/ApplicantManagementApi.md#listjobapplications) | **GET** /v2/applicant-management/job-applications | GET Job Applications
*ApplicantManagementApi* | [**listPosts**](docs/ApplicantManagementApi.md#listposts) | **GET** /v2/applicant-management/posts | GET Posts
*CostAccountingApi* | [**createCostCenterAssignments**](docs/CostAccountingApi.md#createcostcenterassignmentsoperation) | **POST** /v2/cost-objects/cost-centers/assignments | POST Cost Centers Assignments
*CostAccountingApi* | [**createCostCenters**](docs/CostAccountingApi.md#createcostcentersoperation) | **POST** /v2/cost-objects/cost-centers | POST Cost Centers
*CostAccountingApi* | [**createCostObjectiveAssignments**](docs/CostAccountingApi.md#createcostobjectiveassignmentsoperation) | **POST** /v2/cost-objects/cost-objectives/assignments | POST Cost Objectives Assignments
*CostAccountingApi* | [**createCostObjectives**](docs/CostAccountingApi.md#createcostobjectivesoperation) | **POST** /v2/cost-objects/cost-objectives | POST Cost Objectives
*CostAccountingApi* | [**deleteCostCenters**](docs/CostAccountingApi.md#deletecostcenters) | **DELETE** /v2/cost-objects/cost-centers | DELETE Cost Centers
*CostAccountingApi* | [**deleteCostObjectives**](docs/CostAccountingApi.md#deletecostobjectives) | **DELETE** /v2/cost-objects/cost-objectives | DELETE Cost Objectives
*CostAccountingApi* | [**getEditCostCenterAssignmentsStatus**](docs/CostAccountingApi.md#geteditcostcenterassignmentsstatus) | **GET** /v2/cost-objects/cost-centers/assignments/jobs/{jobId} | GET Cost Centers Assignments Jobs
*CostAccountingApi* | [**getEditCostCentersStatus**](docs/CostAccountingApi.md#geteditcostcentersstatus) | **GET** /v2/cost-objects/cost-centers/jobs/{jobId} | GET Cost Centers Jobs
*CostAccountingApi* | [**getEditCostObjectiveAssignmentsStatus**](docs/CostAccountingApi.md#geteditcostobjectiveassignmentsstatus) | **GET** /v2/cost-objects/cost-objectives/assignments/jobs/{jobId} | GET Cost Objectives Assignments Jobs
*CostAccountingApi* | [**getEditCostObjectiveStatus**](docs/CostAccountingApi.md#geteditcostobjectivestatus) | **GET** /v2/cost-objects/cost-objectives/jobs/{jobId} | GET Cost Objectives Jobs
*CostAccountingApi* | [**listCostCenters**](docs/CostAccountingApi.md#listcostcenters) | **GET** /v2/cost-objects/cost-centers | GET Cost Centers
*CostAccountingApi* | [**listCostObjectives**](docs/CostAccountingApi.md#listcostobjectives) | **GET** /v2/cost-objects/cost-objectives | GET Cost Objectives
*GeneralApi* | [**createHolidays**](docs/GeneralApi.md#createholidays) | **POST** /v2/holidays | POST Holidays
*GeneralApi* | [**createOrganizationUnits**](docs/GeneralApi.md#createorganizationunits) | **POST** /v2/organization-units | POST Organization Units
*GeneralApi* | [**createPermanentEstablishments**](docs/GeneralApi.md#createpermanentestablishments) | **POST** /v2/permanent-establishments | POST Permanent Establishments
*GeneralApi* | [**editPermanentEstablishments**](docs/GeneralApi.md#editpermanentestablishmentsoperation) | **PUT** /v2/permanent-establishments | PUT Permanent Establishments
*GeneralApi* | [**getEditHolidaysStatus**](docs/GeneralApi.md#geteditholidaysstatus) | **GET** /v2/holidays/jobs/{jobId} | GET Holidays Jobs
*GeneralApi* | [**getEditOrganizationUnitStatus**](docs/GeneralApi.md#geteditorganizationunitstatus) | **GET** /v2/organization-units/jobs/{jobId} | GET Organization Units Jobs
*GeneralApi* | [**getOrganizationUnit**](docs/GeneralApi.md#getorganizationunit) | **GET** /v2/organization-units/{uuid} | GET Single Organization Unit
*GeneralApi* | [**getPermanentEstablishment**](docs/GeneralApi.md#getpermanentestablishment) | **GET** /v2/permanent-establishments/{id} | GET Single Permanent Establishment
*GeneralApi* | [**getPermanentEstablishmentCreationStatus**](docs/GeneralApi.md#getpermanentestablishmentcreationstatus) | **GET** /v2/permanent-establishments/jobs/{jobId} | GET Permanent Establishments Jobs
*GeneralApi* | [**listHolidays**](docs/GeneralApi.md#listholidays) | **GET** /v2/holidays | GET Holidays
*GeneralApi* | [**listOrganizationUnits**](docs/GeneralApi.md#listorganizationunits) | **GET** /v2/organization-units | GET Organization Units
*GeneralApi* | [**listPermanentEstablishments**](docs/GeneralApi.md#listpermanentestablishments) | **GET** /v2/permanent-establishments | GET Permanent Establishments
*GeneralApi* | [**listPresentPersonsOfOrganizationUnit**](docs/GeneralApi.md#listpresentpersonsoforganizationunit) | **GET** /v2/organization-units/{number}/present-persons | GET Present Persons
*OnboardingApi* | [**createOnboardingDocumentFiles**](docs/OnboardingApi.md#createonboardingdocumentfilesoperation) | **POST** /v2/persons/onboarding/{id}/files | POST Onboarding Document Files
*OnboardingApi* | [**createOnboardingDocuments**](docs/OnboardingApi.md#createonboardingdocuments) | **POST** /v2/persons/onboarding | POST Onboarding Documents
*OnboardingApi* | [**getEditOnboardingDocumentsStatus**](docs/OnboardingApi.md#geteditonboardingdocumentsstatus) | **GET** /v2/persons/onboarding/jobs/{jobId} | GET Onboarding Document Jobs
*OnboardingApi* | [**getOnboardingDocument**](docs/OnboardingApi.md#getonboardingdocument) | **GET** /v2/persons/onboarding/{id} | GET Single Onboarding Document
*OnboardingApi* | [**getOnboardingDocuments**](docs/OnboardingApi.md#getonboardingdocuments) | **GET** /v2/persons/onboarding | GET Onboarding Documents
*PersonsApi* | [**createPersonDocuments**](docs/PersonsApi.md#createpersondocuments) | **POST** /v2/persons/files | POST Person Documents
*PersonsApi* | [**createPersonWorkingTime**](docs/PersonsApi.md#createpersonworkingtime) | **POST** /v2/persons/{personIdentifier}/working-times | POST Start/Stop Working Time
*PersonsApi* | [**createPersonnelFileEntries**](docs/PersonsApi.md#createpersonnelfileentriesoperation) | **POST** /v2/persons/personnel-file | POST Personnel File Entries
*PersonsApi* | [**createPersonnelFileEntryFile**](docs/PersonsApi.md#createpersonnelfileentryfile) | **POST** /v2/persons/{personIdentifier}/personnel-file/{personnelFileEntryId}/files | POST Personnel File Entry File
*PersonsApi* | [**createPersonnelFileEntryStatus**](docs/PersonsApi.md#createpersonnelfileentrystatus) | **GET** /v2/persons/personnel-file/jobs/{jobId} | GET Personnel File Jobs
*PersonsApi* | [**createPersons**](docs/PersonsApi.md#createpersons) | **POST** /v2/persons | POST Persons
*PersonsApi* | [**createSinglePersonDocuments**](docs/PersonsApi.md#createsinglepersondocuments) | **POST** /v2/persons/{personIdentifier}/files | POST Single Person Documents
*PersonsApi* | [**editPersons**](docs/PersonsApi.md#editpersonsoperation) | **PUT** /v2/persons | PUT Persons
*PersonsApi* | [**getAvailableWorkingHours**](docs/PersonsApi.md#getavailableworkinghours) | **GET** /v2/persons/available-working-hours | GET Available Working Hours
*PersonsApi* | [**getEditPersonsStatus**](docs/PersonsApi.md#geteditpersonsstatus) | **GET** /v2/persons/jobs/{jobId} | GET Persons Jobs
*PersonsApi* | [**getPerson**](docs/PersonsApi.md#getperson) | **GET** /v2/persons/{personIdentifier} | GET Single Person
*PersonsApi* | [**getPersonLeaveAccountData**](docs/PersonsApi.md#getpersonleaveaccountdata) | **GET** /v2/persons/{personnelNumber}/leave-account | GET Person Leave Account Data
*PersonsApi* | [**getPersonMasterData**](docs/PersonsApi.md#getpersonmasterdata) | **GET** /v2/persons/master-data | GET Persons Master Data
*PersonsApi* | [**getPersonPersonnelFileCategories**](docs/PersonsApi.md#getpersonpersonnelfilecategories) | **GET** /v2/persons/personnel-file/categories | GET Personnel File Categories
*PersonsApi* | [**getPersonPersonnelFileEntries**](docs/PersonsApi.md#getpersonpersonnelfileentries) | **GET** /v2/persons/{personIdentifier}/personnel-file | GET Personnel File Entries
*PersonsApi* | [**getPersonPersonnelFileEntry**](docs/PersonsApi.md#getpersonpersonnelfileentry) | **GET** /v2/persons/{personIdentifier}/personnel-file/{personnelFileEntryId} | GET Single Personnel File Entry
*PersonsApi* | [**getPersonsDay**](docs/PersonsApi.md#getpersonsday) | **GET** /v2/persons/today | GET Persons Today
*PersonsApi* | [**getSinglePersonMasterData**](docs/PersonsApi.md#getsinglepersonmasterdata) | **GET** /v2/persons/{personIdentifier}/master-data | GET Single Person Master Data
*PersonsApi* | [**getSinglePersonWorkingTimeStatus**](docs/PersonsApi.md#getsinglepersonworkingtimestatus) | **GET** /v2/persons/{personIdentifier}/working-times/status | GET Working Time Status
*PersonsApi* | [**listPersons**](docs/PersonsApi.md#listpersons) | **GET** /v2/persons | GET Persons
*RemoteWorkApi* | [**createRemoteWork**](docs/RemoteWorkApi.md#createremoteworkoperation) | **POST** /v2/remote-work | POST Remote Work
*RemoteWorkApi* | [**deleteSingleRemoteWork**](docs/RemoteWorkApi.md#deletesingleremotework) | **DELETE** /v2/remote-work/{number} | DELETE Single Remote Work
*RemoteWorkApi* | [**editRemoteWork**](docs/RemoteWorkApi.md#editremoteworkoperation) | **PUT** /v2/remote-work | PUT Remote Work
*RemoteWorkApi* | [**editSingleRemoteWork**](docs/RemoteWorkApi.md#editsingleremotework) | **PUT** /v2/remote-work/{number} | PUT Single Remote Work
*RemoteWorkApi* | [**getAccumulatedRemoteWork**](docs/RemoteWorkApi.md#getaccumulatedremotework) | **GET** /v2/remote-work/accumulated-values | GET Remote Work Accumulated Values
*RemoteWorkApi* | [**getEditRemoteWorkStatus**](docs/RemoteWorkApi.md#geteditremoteworkstatus) | **GET** /v2/remote-work/jobs/{jobId} | GET Remote Work Jobs
*RemoteWorkApi* | [**getRemoteWork**](docs/RemoteWorkApi.md#getremotework) | **GET** /v2/remote-work | GET Remote Work
*RemoteWorkApi* | [**getSingleRemoteWork**](docs/RemoteWorkApi.md#getsingleremotework) | **GET** /v2/remote-work/{number} | GET Single Remote Work
*SickLeavesApi* | [**createSickLeaveTypes**](docs/SickLeavesApi.md#createsickleavetypes) | **POST** /v2/sick-leaves/sick-leave-types | POST Sick Leave Types
*SickLeavesApi* | [**createSickLeaves**](docs/SickLeavesApi.md#createsickleavesoperation) | **POST** /v2/sick-leaves | POST Sick Leaves
*SickLeavesApi* | [**deleteSickLeave**](docs/SickLeavesApi.md#deletesickleave) | **DELETE** /v2/sick-leaves/{number} | DELETE Single Sick Leave
*SickLeavesApi* | [**deleteSickLeaves**](docs/SickLeavesApi.md#deletesickleaves) | **DELETE** /v2/sick-leaves | DELETE Sick Leaves
*SickLeavesApi* | [**editSickLeaves**](docs/SickLeavesApi.md#editsickleavesoperation) | **PUT** /v2/sick-leaves | PUT Sick Leaves
*SickLeavesApi* | [**getEditSickLeaveTypesStatus**](docs/SickLeavesApi.md#geteditsickleavetypesstatus) | **GET** /v2/sick-leaves/sick-leave-types/jobs/{jobId} | GET Sick Leave Types Jobs
*SickLeavesApi* | [**getEditSickLeavesStatus**](docs/SickLeavesApi.md#geteditsickleavesstatus) | **GET** /v2/sick-leaves/jobs/{jobId} | GET Sick Leaves Jobs
*SickLeavesApi* | [**getSickLeave**](docs/SickLeavesApi.md#getsickleave) | **GET** /v2/sick-leaves/{number} | GET Single Sick Leave
*SickLeavesApi* | [**listSickLeaveTypes**](docs/SickLeavesApi.md#listsickleavetypes) | **GET** /v2/sick-leaves/sick-leave-types | GET Sick Leave Types
*SickLeavesApi* | [**listSickLeaves**](docs/SickLeavesApi.md#listsickleaves) | **GET** /v2/sick-leaves | GET Sick Leaves
*SickLeavesApi* | [**listSickLeavesAccumulated**](docs/SickLeavesApi.md#listsickleavesaccumulated) | **GET** /v2/sick-leaves/accumulated-values | GET Accumulated Sick Leaves
*TravelExpensesApi* | [**getTravelExpense**](docs/TravelExpensesApi.md#gettravelexpense) | **GET** /v2/travel-expenses/expense-reports/{number} | GET Single Expense Report
*TravelExpensesApi* | [**getTravelRequest**](docs/TravelExpensesApi.md#gettravelrequest) | **GET** /v2/travel-expenses/travel-requests/{number} | GET Single Travel Request
*TravelExpensesApi* | [**listExpenseReports**](docs/TravelExpensesApi.md#listexpensereports) | **GET** /v2/travel-expenses/expense-reports | GET Expense Reports
*TravelExpensesApi* | [**listReceiptTypes**](docs/TravelExpensesApi.md#listreceipttypes) | **GET** /v2/travel-expenses/receipt-types | GET Receipt Types
*TravelExpensesApi* | [**listTravelRequests**](docs/TravelExpensesApi.md#listtravelrequests) | **GET** /v2/travel-expenses/travel-requests | GET Travel Requests
*UtilityApi* | [**createToken**](docs/UtilityApi.md#createtoken) | **POST** /v2/authentication | Receive Authentication Token
*UtilityApi* | [**createWebhooks**](docs/UtilityApi.md#createwebhooksoperation) | **POST** /v2/webhooks | POST Webhooks
*UtilityApi* | [**deleteWebhooks**](docs/UtilityApi.md#deletewebhooks) | **DELETE** /v2/webhooks | DELETE Webhooks
*UtilityApi* | [**editWebhooks**](docs/UtilityApi.md#editwebhooksoperation) | **PUT** /v2/webhooks | PUT Webhooks
*UtilityApi* | [**getEditWebhooksStatus**](docs/UtilityApi.md#geteditwebhooksstatus) | **GET** /v2/webhooks/jobs/{jobId} | GET Webhooks Jobs
*UtilityApi* | [**healthCheck**](docs/UtilityApi.md#healthcheck) | **GET** /v2/health-check | GET Health Check
*UtilityApi* | [**listWebhooks**](docs/UtilityApi.md#listwebhooks) | **GET** /v2/webhooks | GET Webhooks
*WageSalaryApi* | [**createPayrollFile**](docs/WageSalaryApi.md#createpayrollfile) | **POST** /v2/payroll/files | POST Payroll File
*WageSalaryApi* | [**getEditPayrollFilesStatus**](docs/WageSalaryApi.md#geteditpayrollfilesstatus) | **GET** /v2/payroll/jobs/{jobId} | GET Payroll Files Jobs
*WageSalaryApi* | [**listWageAndSalaryTypes**](docs/WageSalaryApi.md#listwageandsalarytypes) | **GET** /v2/wage-and-salary/types | GET Wage Types
*WorkingTimesApi* | [**createProjectCustomers**](docs/WorkingTimesApi.md#createprojectcustomers) | **POST** /v2/working-times/projects/customers | POST Project Customers
*WorkingTimesApi* | [**createTimeTrackingProjectAssignments**](docs/WorkingTimesApi.md#createtimetrackingprojectassignmentsoperation) | **POST** /v2/working-times/projects/assignments | POST Time Tracking Project Assignments
*WorkingTimesApi* | [**createTimeTrackingProjects**](docs/WorkingTimesApi.md#createtimetrackingprojectsoperation) | **POST** /v2/working-times/projects | POST Time Tracking Projects
*WorkingTimesApi* | [**createWorkingTimes**](docs/WorkingTimesApi.md#createworkingtimesoperation) | **POST** /v2/working-times | POST Working Times
*WorkingTimesApi* | [**deleteWorkingTimes**](docs/WorkingTimesApi.md#deleteworkingtimes) | **DELETE** /v2/working-times | DELETE Working Times
*WorkingTimesApi* | [**editProjectCustomers**](docs/WorkingTimesApi.md#editprojectcustomers) | **PUT** /v2/working-times/projects/customers | PUT Project Customers
*WorkingTimesApi* | [**editWorkingTimes**](docs/WorkingTimesApi.md#editworkingtimesoperation) | **PUT** /v2/working-times | PUT Working Times
*WorkingTimesApi* | [**getCreateProjectCustomersJobStatus**](docs/WorkingTimesApi.md#getcreateprojectcustomersjobstatus) | **GET** /v2/working-times/projects/customers/jobs/{jobId} | GET Project Customers Jobs
*WorkingTimesApi* | [**getCreateWorkingTimesStatus**](docs/WorkingTimesApi.md#getcreateworkingtimesstatus) | **GET** /v2/working-times/jobs/{jobId} | GET Working Times Jobs
*WorkingTimesApi* | [**getEditTimeTrackingProjectAssignmentsStatus**](docs/WorkingTimesApi.md#getedittimetrackingprojectassignmentsstatus) | **GET** /v2/working-times/projects/assignments/jobs/{jobId} | GET Time Tracking Project Assignment Jobs
*WorkingTimesApi* | [**getEditTimeTrackingProjectsStatus**](docs/WorkingTimesApi.md#getedittimetrackingprojectsstatus) | **GET** /v2/working-times/projects/jobs/{jobId} | GET Time Tracking Project Jobs
*WorkingTimesApi* | [**getPersonsTimeAccounts**](docs/WorkingTimesApi.md#getpersonstimeaccounts) | **GET** /v2/working-times/time-accounts | GET Time Accounts
*WorkingTimesApi* | [**getProjectCustomer**](docs/WorkingTimesApi.md#getprojectcustomer) | **GET** /v2/working-times/projects/customers/{customerNumber} | GET Single Project Customer
*WorkingTimesApi* | [**getSingleTimeTrackingProject**](docs/WorkingTimesApi.md#getsingletimetrackingproject) | **GET** /v2/working-times/projects/{id} | GET Single Time Tracking Project
*WorkingTimesApi* | [**getTimeTrackingProjects**](docs/WorkingTimesApi.md#gettimetrackingprojects) | **GET** /v2/working-times/projects | GET Time Tracking Projects
*WorkingTimesApi* | [**getWorkingTimeRegulations**](docs/WorkingTimesApi.md#getworkingtimeregulations) | **GET** /v2/working-times/time-recording-regulations | GET Time Recording Regulations
*WorkingTimesApi* | [**getWorkingTimes**](docs/WorkingTimesApi.md#getworkingtimes) | **GET** /v2/working-times | GET Working Times
*WorkingTimesApi* | [**listProjectCustomers**](docs/WorkingTimesApi.md#listprojectcustomers) | **GET** /v2/working-times/projects/customers | GET Project Customers
*WorkingTimesApi* | [**listWorkingTimeKiosks**](docs/WorkingTimesApi.md#listworkingtimekiosks) | **GET** /v2/working-times/kiosks | GET Time Tracking Kiosks


### Models

- [Absence](docs/Absence.md)
- [AbsenceData](docs/AbsenceData.md)
- [AbsenceStatus](docs/AbsenceStatus.md)
- [AbsenceType](docs/AbsenceType.md)
- [AbsencesDateIntervalData](docs/AbsencesDateIntervalData.md)
- [AccumulatedAbsencesDateIntervalData](docs/AccumulatedAbsencesDateIntervalData.md)
- [AccumulatedRemoteWorkDateIntervalData](docs/AccumulatedRemoteWorkDateIntervalData.md)
- [AccumulatedSickLeavesDateIntervalData](docs/AccumulatedSickLeavesDateIntervalData.md)
- [Address](docs/Address.md)
- [ApiError](docs/ApiError.md)
- [ApiResourceData](docs/ApiResourceData.md)
- [ApiWarning](docs/ApiWarning.md)
- [Applicant](docs/Applicant.md)
- [AvailableWorkingHoursDateIntervalData](docs/AvailableWorkingHoursDateIntervalData.md)
- [AvailableWorkingHoursDateIntervalDataRelatedEvents](docs/AvailableWorkingHoursDateIntervalDataRelatedEvents.md)
- [BankAccount](docs/BankAccount.md)
- [BaseJobApplication](docs/BaseJobApplication.md)
- [BaseTimeTrackingProject](docs/BaseTimeTrackingProject.md)
- [BorderCrossing](docs/BorderCrossing.md)
- [CareerLevelKey](docs/CareerLevelKey.md)
- [Confession](docs/Confession.md)
- [CostCenter](docs/CostCenter.md)
- [CostCenterAssignment](docs/CostCenterAssignment.md)
- [CostObjectPercentage](docs/CostObjectPercentage.md)
- [CostObjective](docs/CostObjective.md)
- [CostObjectiveAssignment](docs/CostObjectiveAssignment.md)
- [CreateAbsenceData](docs/CreateAbsenceData.md)
- [CreateAbsencesRequest](docs/CreateAbsencesRequest.md)
- [CreateCostCenterAssignmentsRequest](docs/CreateCostCenterAssignmentsRequest.md)
- [CreateCostCentersRequest](docs/CreateCostCentersRequest.md)
- [CreateCostObjectiveAssignmentsRequest](docs/CreateCostObjectiveAssignmentsRequest.md)
- [CreateCostObjectivesRequest](docs/CreateCostObjectivesRequest.md)
- [CreateJobApplicationsRequest](docs/CreateJobApplicationsRequest.md)
- [CreateOnboardingDocumentFilesRequest](docs/CreateOnboardingDocumentFilesRequest.md)
- [CreatePersonWorkingTimeResponse](docs/CreatePersonWorkingTimeResponse.md)
- [CreatePersonnelFileEntriesRequest](docs/CreatePersonnelFileEntriesRequest.md)
- [CreatePersonnelFileEntryStatus200Response](docs/CreatePersonnelFileEntryStatus200Response.md)
- [CreateRemoteWorkData](docs/CreateRemoteWorkData.md)
- [CreateRemoteWorkRequest](docs/CreateRemoteWorkRequest.md)
- [CreateSickLeaveData](docs/CreateSickLeaveData.md)
- [CreateSickLeavesRequest](docs/CreateSickLeavesRequest.md)
- [CreateTimeTrackingProjectAssignmentsRequest](docs/CreateTimeTrackingProjectAssignmentsRequest.md)
- [CreateTimeTrackingProjectCustomersRequest](docs/CreateTimeTrackingProjectCustomersRequest.md)
- [CreateTimeTrackingProjectsRequest](docs/CreateTimeTrackingProjectsRequest.md)
- [CreateWebhooksRequest](docs/CreateWebhooksRequest.md)
- [CreateWorkingTimesRequest](docs/CreateWorkingTimesRequest.md)
- [Credentials](docs/Credentials.md)
- [CurrencyValue](docs/CurrencyValue.md)
- [DataError](docs/DataError.md)
- [EditAbsenceData](docs/EditAbsenceData.md)
- [EditAbsenceTypesRequest](docs/EditAbsenceTypesRequest.md)
- [EditAbsencesRequest](docs/EditAbsencesRequest.md)
- [EditHolidaysRequest](docs/EditHolidaysRequest.md)
- [EditOnboardingDocumentsRequest](docs/EditOnboardingDocumentsRequest.md)
- [EditOrganizationUnitsRequest](docs/EditOrganizationUnitsRequest.md)
- [EditPermanentEstablishmentsRequest](docs/EditPermanentEstablishmentsRequest.md)
- [EditPersonsRequest](docs/EditPersonsRequest.md)
- [EditRemoteWorkData](docs/EditRemoteWorkData.md)
- [EditRemoteWorkRequest](docs/EditRemoteWorkRequest.md)
- [EditSickLeaveData](docs/EditSickLeaveData.md)
- [EditSickLeaveTypesRequest](docs/EditSickLeaveTypesRequest.md)
- [EditSickLeavesRequest](docs/EditSickLeavesRequest.md)
- [EditTimeTrackingProjectCustomersRequest](docs/EditTimeTrackingProjectCustomersRequest.md)
- [EditWebhookData](docs/EditWebhookData.md)
- [EditWebhooksRequest](docs/EditWebhooksRequest.md)
- [EditWorkingTimesRequest](docs/EditWorkingTimesRequest.md)
- [EmergencyContactDegreeOfKinship](docs/EmergencyContactDegreeOfKinship.md)
- [Employment](docs/Employment.md)
- [EmploymentContractTypeKey](docs/EmploymentContractTypeKey.md)
- [EmploymentType](docs/EmploymentType.md)
- [ExpenseReport](docs/ExpenseReport.md)
- [ExpenseReportDay](docs/ExpenseReportDay.md)
- [ExpenseReportMileagesInner](docs/ExpenseReportMileagesInner.md)
- [ExpenseReportStatus](docs/ExpenseReportStatus.md)
- [ExpenseReportsDateIntervalData](docs/ExpenseReportsDateIntervalData.md)
- [ExpensesGroup](docs/ExpensesGroup.md)
- [ExternalId](docs/ExternalId.md)
- [FileUploadRequestResponse](docs/FileUploadRequestResponse.md)
- [FileUploadRequestResult](docs/FileUploadRequestResult.md)
- [FlatRateType](docs/FlatRateType.md)
- [Gender](docs/Gender.md)
- [GetEditAbsencesStatus200Response](docs/GetEditAbsencesStatus200Response.md)
- [GetEditCostCentersStatus200Response](docs/GetEditCostCentersStatus200Response.md)
- [GetEditPersonsStatus200Response](docs/GetEditPersonsStatus200Response.md)
- [GetEditRemoteWorkStatus200Response](docs/GetEditRemoteWorkStatus200Response.md)
- [GetPersonMasterDataResponse](docs/GetPersonMasterDataResponse.md)
- [GetTimeTrackingProjectCustomersResponse](docs/GetTimeTrackingProjectCustomersResponse.md)
- [GetTimeTrackingProjectsResponse](docs/GetTimeTrackingProjectsResponse.md)
- [HealthInsurance](docs/HealthInsurance.md)
- [HealthInsuranceType](docs/HealthInsuranceType.md)
- [HighestLevelOfEducationId](docs/HighestLevelOfEducationId.md)
- [HighestProfessionalQualificationId](docs/HighestProfessionalQualificationId.md)
- [Holiday](docs/Holiday.md)
- [HolidayData](docs/HolidayData.md)
- [HolidaysByCountryWrapper](docs/HolidaysByCountryWrapper.md)
- [HowDidYouHearAboutUsOptions](docs/HowDidYouHearAboutUsOptions.md)
- [IncludeDataForPersonsDayRequest](docs/IncludeDataForPersonsDayRequest.md)
- [Interval](docs/Interval.md)
- [JobApplication](docs/JobApplication.md)
- [JobApplicationData](docs/JobApplicationData.md)
- [JobApplicationStatus](docs/JobApplicationStatus.md)
- [JobIdObject](docs/JobIdObject.md)
- [LeaveAccount](docs/LeaveAccount.md)
- [ListAbsenceTypesResponse](docs/ListAbsenceTypesResponse.md)
- [ListApplicantsResponse](docs/ListApplicantsResponse.md)
- [ListCostCentersResponse](docs/ListCostCentersResponse.md)
- [ListCostObjectivesResponse](docs/ListCostObjectivesResponse.md)
- [ListJobApplicationsResponse](docs/ListJobApplicationsResponse.md)
- [ListOnboardingDocumentsResponse](docs/ListOnboardingDocumentsResponse.md)
- [ListOrganizationUnitsReponse](docs/ListOrganizationUnitsReponse.md)
- [ListPermanentEstablishmentsResponse](docs/ListPermanentEstablishmentsResponse.md)
- [ListPersonPersonnelFileEntriesResponse](docs/ListPersonPersonnelFileEntriesResponse.md)
- [ListPersonnelFileCategoriesResponse](docs/ListPersonnelFileCategoriesResponse.md)
- [ListPostsResponse](docs/ListPostsResponse.md)
- [ListPresentPersonsOfOrganizationUnitResponse](docs/ListPresentPersonsOfOrganizationUnitResponse.md)
- [ListReceiptTypesResponse](docs/ListReceiptTypesResponse.md)
- [ListSickLeaveTypesResponse](docs/ListSickLeaveTypesResponse.md)
- [ListTimeRecordingRegulationsResponse](docs/ListTimeRecordingRegulationsResponse.md)
- [ListVacationTypesResponse](docs/ListVacationTypesResponse.md)
- [ListWageAndSalaryTypesResponse](docs/ListWageAndSalaryTypesResponse.md)
- [ListWebhooksResponse](docs/ListWebhooksResponse.md)
- [ListWorkingTimeKiosksResponse](docs/ListWorkingTimeKiosksResponse.md)
- [MaritalStatus](docs/MaritalStatus.md)
- [Mileage](docs/Mileage.md)
- [MileageFlatRate](docs/MileageFlatRate.md)
- [MileageMultiDate](docs/MileageMultiDate.md)
- [MileageSingleDate](docs/MileageSingleDate.md)
- [MultiDeleteRequestResponse](docs/MultiDeleteRequestResponse.md)
- [MultiDeleteRequestResult](docs/MultiDeleteRequestResult.md)
- [MultiDeleteResult](docs/MultiDeleteResult.md)
- [MultiWriteRequestResponse](docs/MultiWriteRequestResponse.md)
- [MultiWriteRequestResult](docs/MultiWriteRequestResult.md)
- [NumericalRange](docs/NumericalRange.md)
- [ObjectManipulationNotification](docs/ObjectManipulationNotification.md)
- [OnboardingDocument](docs/OnboardingDocument.md)
- [OnboardingDocumentData](docs/OnboardingDocumentData.md)
- [OnboardingStatus](docs/OnboardingStatus.md)
- [OrganizationUnit](docs/OrganizationUnit.md)
- [OrganizationUnitData](docs/OrganizationUnitData.md)
- [OrganizationUnitIdentifierType](docs/OrganizationUnitIdentifierType.md)
- [PaymentAccount](docs/PaymentAccount.md)
- [PermanentEstablishment](docs/PermanentEstablishment.md)
- [PermissionToStoreApplication](docs/PermissionToStoreApplication.md)
- [Person](docs/Person.md)
- [PersonBaseData](docs/PersonBaseData.md)
- [PersonData](docs/PersonData.md)
- [PersonDay](docs/PersonDay.md)
- [PersonHistoricizedAddressData](docs/PersonHistoricizedAddressData.md)
- [PersonHistoricizedBankAccountData](docs/PersonHistoricizedBankAccountData.md)
- [PersonHistoricizedData](docs/PersonHistoricizedData.md)
- [PersonHistoricizedEmploymentData](docs/PersonHistoricizedEmploymentData.md)
- [PersonHistoricizedHealthInsuranceData](docs/PersonHistoricizedHealthInsuranceData.md)
- [PersonHistoricizedSevereDisabilityData](docs/PersonHistoricizedSevereDisabilityData.md)
- [PersonHistoricizedShortTimeWorkScheduleData](docs/PersonHistoricizedShortTimeWorkScheduleData.md)
- [PersonHistoricizedWorkScheduleData](docs/PersonHistoricizedWorkScheduleData.md)
- [PersonIdentifierType](docs/PersonIdentifierType.md)
- [PersonnelFileCategory](docs/PersonnelFileCategory.md)
- [PersonnelFileEntry](docs/PersonnelFileEntry.md)
- [PersonnelFileEntryData](docs/PersonnelFileEntryData.md)
- [PlaceOfWorkTypeKey](docs/PlaceOfWorkTypeKey.md)
- [Post](docs/Post.md)
- [PostContactInformation](docs/PostContactInformation.md)
- [PostDescriptions](docs/PostDescriptions.md)
- [PostOffer](docs/PostOffer.md)
- [ProjectTeam](docs/ProjectTeam.md)
- [ProportionalVacationEntitlementCalculation](docs/ProportionalVacationEntitlementCalculation.md)
- [Receipt](docs/Receipt.md)
- [ReceiptCategory](docs/ReceiptCategory.md)
- [ReceiptType](docs/ReceiptType.md)
- [ReceiptTypeAccount](docs/ReceiptTypeAccount.md)
- [ReceiptTypeAccountPurpose](docs/ReceiptTypeAccountPurpose.md)
- [RemoteWork](docs/RemoteWork.md)
- [RemoteWorkData](docs/RemoteWorkData.md)
- [RemoteWorkDateIntervalData](docs/RemoteWorkDateIntervalData.md)
- [RemoteWorkStatus](docs/RemoteWorkStatus.md)
- [Salutation](docs/Salutation.md)
- [SapCodeType](docs/SapCodeType.md)
- [ScopeOfActivitiesKey](docs/ScopeOfActivitiesKey.md)
- [SevereDisability](docs/SevereDisability.md)
- [ShortTimeWorkSchedule](docs/ShortTimeWorkSchedule.md)
- [SickLeave](docs/SickLeave.md)
- [SickLeaveChild](docs/SickLeaveChild.md)
- [SickLeaveData](docs/SickLeaveData.md)
- [SickLeaveStatus](docs/SickLeaveStatus.md)
- [SickLeaveType](docs/SickLeaveType.md)
- [SickLeavesDateIntervalData](docs/SickLeavesDateIntervalData.md)
- [SingleDeleteRequestResponse](docs/SingleDeleteRequestResponse.md)
- [SingleDeleteRequestResult](docs/SingleDeleteRequestResult.md)
- [SingleDeleteResult](docs/SingleDeleteResult.md)
- [SingleResult](docs/SingleResult.md)
- [SingleResultDataValue](docs/SingleResultDataValue.md)
- [SingleWriteRequestResponse](docs/SingleWriteRequestResponse.md)
- [SingleWriteRequestResult](docs/SingleWriteRequestResult.md)
- [TimeAccount](docs/TimeAccount.md)
- [TimeRecordingRegulation](docs/TimeRecordingRegulation.md)
- [TimeRecordingRegulationBaseData](docs/TimeRecordingRegulationBaseData.md)
- [TimeReference](docs/TimeReference.md)
- [TimeTrackingProject](docs/TimeTrackingProject.md)
- [TimeTrackingProjectAssignmentData](docs/TimeTrackingProjectAssignmentData.md)
- [TimeTrackingProjectBaseCustomer](docs/TimeTrackingProjectBaseCustomer.md)
- [TimeTrackingProjectCustomer](docs/TimeTrackingProjectCustomer.md)
- [TimeTrackingProjectCustomerData](docs/TimeTrackingProjectCustomerData.md)
- [TimeTrackingProjectData](docs/TimeTrackingProjectData.md)
- [TimeTrackingProjectStatus](docs/TimeTrackingProjectStatus.md)
- [TimeTrackingProjectType](docs/TimeTrackingProjectType.md)
- [TitleDescriptionPair](docs/TitleDescriptionPair.md)
- [Token](docs/Token.md)
- [TravelRequest](docs/TravelRequest.md)
- [TravelRequestStatus](docs/TravelRequestStatus.md)
- [TravelRequestsDateIntervalData](docs/TravelRequestsDateIntervalData.md)
- [TriggerForGivingNotice](docs/TriggerForGivingNotice.md)
- [UnitValueTuple](docs/UnitValueTuple.md)
- [VacationType](docs/VacationType.md)
- [ValueAssociatedNumericalRange](docs/ValueAssociatedNumericalRange.md)
- [Vehicle](docs/Vehicle.md)
- [WageType](docs/WageType.md)
- [Webhook](docs/Webhook.md)
- [WebhookAction](docs/WebhookAction.md)
- [WebhookConfiguration](docs/WebhookConfiguration.md)
- [WebhookData](docs/WebhookData.md)
- [WebhookResource](docs/WebhookResource.md)
- [WorkSchedule](docs/WorkSchedule.md)
- [WorkScheduleDay](docs/WorkScheduleDay.md)
- [WorkingTime](docs/WorkingTime.md)
- [WorkingTimeData](docs/WorkingTimeData.md)
- [WorkingTimeKiosk](docs/WorkingTimeKiosk.md)
- [WorkingTimeModelKey](docs/WorkingTimeModelKey.md)
- [WorkingTimeStatus](docs/WorkingTimeStatus.md)
- [WorkingTimeType](docs/WorkingTimeType.md)
- [WorkingTimeTypes](docs/WorkingTimeTypes.md)
- [WorkingTimesDateIntervalData](docs/WorkingTimesDateIntervalData.md)
- [WriteRequestResponse](docs/WriteRequestResponse.md)
- [WriteRequestResult](docs/WriteRequestResult.md)

### Authorization


Authentication schemes defined for the API:
<a id="BearerJWT"></a>
#### BearerJWT


- **Type**: HTTP Bearer Token authentication (JWT)

## About

This TypeScript SDK client supports the [Fetch API](https://fetch.spec.whatwg.org/)
and is automatically generated by the
[OpenAPI Generator](https://openapi-generator.tech) project:

- API version: `2.10`
- Package version: `1.0.0`
- Generator version: `7.20.0-SNAPSHOT`
- Build package: `org.openapitools.codegen.languages.TypeScriptFetchClientCodegen`

The generated npm module supports the following:

- Environments
  * Node.js
  * Webpack
  * Browserify
- Language levels
  * ES5 - you must have a Promises/A+ library installed
  * ES6
- Module systems
  * CommonJS
  * ES6 module system


## Development

### Building

To build the TypeScript source code, you need to have Node.js and npm installed.
After cloning the repository, navigate to the project directory and run:

```bash
npm install
npm run build
```

### Publishing

Once you've built the package, you can publish it to npm:

```bash
npm publish
```

## License

[]()
