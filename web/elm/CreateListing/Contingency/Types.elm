module CreateListing.Contingency.Types exposing (..)

type alias Contingency = {
    financing: Bool,
    financingDays: Int,
    appraisal: Bool,
    appraisalDays: Int,
    condition: Bool,
    conditionDays: Int
}