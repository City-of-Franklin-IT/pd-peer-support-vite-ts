export interface SupportInterface extends BaseInterface {
  startDateTime: string
  endDateTime: string
  supportDesignation: SupportDesignationType
  supportType: SupportType
  note: string | null
  Personnel?: PersonnelInterface[]
  OtherSupport?: OtherSupportInterface
}

export interface SupportCreateInterface extends Omit<SupportInterface, 'Personnel' | 'OtherSupport' |'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _dirtied?: boolean | null
  uuid?: string
  Personnel?: PersonnelCreateInterface[]
  OtherSupport?: OtherSupportCreateInterface
}

export interface OtherSupportInterface extends BaseInterface {
  _dirtied?: boolean | null
  parentId: string
  description: string
}

export interface OtherSupportCreateInterface extends Omit<OtherSupportInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  uuid?: string
}

export interface PersonnelInterface extends BaseInterface {
  email: string
  parentId: string
}

export interface PersonnelCreateInterface extends Omit<PersonnelInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _dirtied?: boolean | null
  _deleted?: boolean | null
  uuid?: string
}

export interface PersonnelRosterInterface extends BaseInterface {
  email: string
  Support?: SupportInterface[]
}

export interface PersonnelRosterCreateInterface extends Omit<PersonnelRosterInterface, 'Support' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  _dirtied?: boolean | null
  uuid?: string
}

export type SupportDesignationType =
  | "FPD Employee"
  | "Other COF First Responder"
  | "Other City Employee"
  | "Other Non-COF First Responder"

export type SupportType =
  | "Debrief - External"
  | "Debrief - Internal"
  | "Defusing"
  | "Family"
  | "Finances"
  | "Referral"
  | "Substance Use"
  | "Undisclosed"
  | "Work"
  | "Other"

export interface ServerResponse { // Server response object
  success: boolean
  msg?: string
}

export interface BaseInterface { 
  uuid: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}