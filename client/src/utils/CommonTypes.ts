export type Option = {
  id: number;
  text: string;
  value: string | number | string[];
};

export interface Company {
  CompanyID: number;
  CompanyName: string;
}

export interface Feature {
  FeatureID: number;
  FeatureName: string;
}

export interface FeatureRight {
  FeatureRightID: number;
  FeatureRight: string;
}

export interface NotiFeature {
  NotiFeatureID: number;
  NotiFeature: string;
}

export interface NotiType {
  NotiTypeID: number;
  NotiType: string;
}

export interface UserGroup {
  UserGroupID: number;
  UserGroupName: string;
  UserGroupDesc: string;
}

export interface NotiGroup {
  NotiGroupID: number;
  NotiGroupName: string;
  NotiGroupDesc: string;
}

export interface RMA {
  RmaID: number;
  Username: string;
  DateTime: string;
  ContactPerson: string;
  CustomerEmail: string;
  Company: string;
  ContactNo: number;
  RmaStatusID: number;
}

export interface TLoans {
  TLoanID: number;
  StartDate: string;
  EndDate: string;
  CompanyName: string;
  CustomerEmail: string;
  ExtensionDuration: string;
}

export type ActionMenuItem = {
  name: string;
  url?: string;
  icon: React.ReactNode;
  delete: boolean;
  deleteFunction?: () => void;
  // deleteFunction?: UseMutationResult<AxiosResponse<any, any>, unknown, string, unknown>
};