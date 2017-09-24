module CreateListing.Contingency.State exposing (update, init)

import CreateListing.Contingency.Types exposing (..)
import Utils exposing (stringToInt)


init: Contingency
init = {
    financing = True,
    financingDays = 10,
    appraisal = True,
    appraisalDays = 10,
    condition = True,
    conditionDays = 10}




update: ContingencyMsg -> Contingency -> (Contingency, Cmd msg)
update msg contingency = case msg of 
    ToggleFinancing ->
        ({contingency | financing = not contingency.financing}, Cmd.none)
    FinancingDays days ->
        ({contingency | financingDays = stringToInt days}, Cmd.none)
    ToggleAppraisal -> 
        ({contingency | appraisal = not contingency.appraisal}, Cmd.none)
    AppraisalDays days -> 
        ({contingency | appraisalDays = stringToInt days}, Cmd.none)
    ToggleCondition ->
        ({contingency | condition = not contingency.condition}, Cmd.none)
    ConditionDays days ->
        ({contingency | conditionDays = stringToInt days}, Cmd.none)
    Continue ->
        (contingency, Cmd.none)
    Back ->
        (contingency, Cmd.none)



