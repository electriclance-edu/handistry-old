/*
TL;DR: The basic structure (type) for a chemical.
Example Field Values:
    name:           "L. Water"    // [string] First letter represents the physical state (S., L., G., Aq.)    
    formula:        "H2O(l)""     // [string] The chemical formula followed by lowercase state in parenthesis
    phase:          "l"           // [string] Lowercase state (s-solid, l-liquid, g-gas, aq-aqeuous)
    molarMass:      18.015        // [number] Molar mass in grams per mole (g/mol)
    charge:         0             // [number] Formal charge (+N, 0, -N) where N is an integer
    enthalpyForm:   -285.83       // [number] Enthalpy of formation in kilojoules per mole (kJ/mol)
    entropyForm:    69.91         // [number] Entropy of formation in joules per mole-kelvin (J/mol-K)
    moles:          0             // [number] Amount of the chemical in moles (default = 0 mol)
    color:          {"r":48, "g":217, "b":255, "a":0.5}   // [RGBA Map] Values from 0-255 for RGB & 0-1 for A
*/
export type Chemical = {
    name: string, 
    formula: string,
    phase: string,
    molarMass: number,
    charge: number,
    enthalpyForm: number,
    entropyForm: number, 
    moles: number,
    color: any
}