export type Chemical = {
    name: string, 
    formula: string,
    phase: string,
    molarMass: number, //in g/mol
    charge: number, //integer
    enthalpyForm: number, //in kJ/mol
    entropyForm: number, //in J/mol K
    moles?: number
}
