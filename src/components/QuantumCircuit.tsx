import React from 'react';
import useQuantumEditorCircuit from '../lib/CircuitState';
import QubitLine from './QubitLine';
import GateSelector from './GateSelector';

const QuantumCircuit: React.FC = () => {
  const { qubits, addQubit, removeQubit, addGate, undo, redo } = useQuantumEditorCircuit();

  return (
    <div className="quantum-circuit-container">
      <div className="circuit-controls">
        <button onClick={addQubit}>Add Qubit</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
      <div className="circuit-grid">
        {qubits.map((qubitLine, index) => (
          <QubitLine key={index} index={index} gates={qubitLine.gates} onRemoveQubit={() => removeQubit(index)}
            onAddGate={(gateType, controlQubitIndex) => addGate(index, gateType, controlQubitIndex)} />
        ))}
      </div>
      <GateSelector />
    </div>
  );
};

export default QuantumCircuit;
