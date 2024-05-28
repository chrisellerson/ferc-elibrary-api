// FILTERS
export type Libraries =
  | 'General'
  | 'Electric'
  | 'Gas'
  | 'Oil'
  | 'Rulemaking'
  | 'Hydro'
export type Categories = 'Issuance' | 'Submittal'
export type SecurityLevel =
  | 'c' // CEII
  | 's' // Protected
  | 'n' // Privileged
  | 'p' // Public

export type Affiliations = {
  afType: 'author' | 'agent' | 'recipient'
  affiliation: string // organization
  firstInitial: string
  lastName: string
  middleInitial: string
}
export type ClassType = {
  documentClass: string
  documentType: string
}
