module CreateListing.Contingency.Types exposing (..)

type alias Contingency = {
    financing: Bool,
    financingDays: Int,
    appraisal: Bool,
    appraisalDays: Int,
    condition: Bool,
    conditionDays: Int
}

type ContingencyMsg = ToggleFinancing
    | FinancingDays String
    | ToggleAppraisal
    | AppraisalDays String
    | ToggleCondition
    | ConditionDays String
    | Back
    | Continue