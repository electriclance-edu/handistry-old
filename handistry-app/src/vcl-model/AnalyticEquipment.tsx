/*------------
   IMPORTS
------------*/
import { Equipment } from "./Equipment";
import { Glassware } from "./Glassware";

/*
TL;DR: The base class for AnalyticEquipment
This class represents any equipment that could make measurements on a Mixture instance.
*/
export class AnalyticEquipment extends Equipment {
    //----- FIELDS -----//
    //To-do: add stuff here

    //----- METHODS -----//
    public measure(container: Glassware, property: string) {}

    //----- GETTERS -----//
}
