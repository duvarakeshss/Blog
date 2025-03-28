export type GateType = 'H' | 'CNOT';

export interface Gate {
  type: GateType;
  qubitIndex: number;
  controlQubitIndex?: number;
}

export interface QubitLineState {
  gates: Gate[];
}
