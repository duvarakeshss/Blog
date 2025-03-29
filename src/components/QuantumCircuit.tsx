import React from 'react';
import { motion } from 'framer-motion';
import useQuantumEditorCircuit from '../lib/CircuitState';
import QubitLine from './QubitLine';
import GateSelector from './GateSelector';

const QuantumCircuit: React.FC = () => {
  const { qubits, addQubit, removeQubit, addGate, undo, redo } = useQuantumEditorCircuit();

  return (
    <div className="quantum-circuit-container">
      {/* Animated Circuit Controls */}
      <motion.div 
        className="circuit-controls flex justify-center gap-4 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {['Add Qubit', 'Undo', 'Redo'].map((label, index) => {
          const onClickHandler = [addQubit, undo, redo][index];

          return (
            <motion.button
              key={label}
              className="px-6 py-3 font-bold rounded-lg shadow-md text-white text-center
                         bg-gradient-to-r from-green-500 to-yellow-500 
                         hover:from-yellow-500 hover:to-green-500 
                         transition-all duration-300"
              onClick={onClickHandler}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {label}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Circuit Grid */}
      <div className="circuit-grid">
        {qubits.map((qubitLine, index) => (
          <QubitLine
            key={index}
            index={index}
            gates={qubitLine.gates}
            onRemoveQubit={() => removeQubit(index)}
            onAddGate={(gateType, controlQubitIndex) => addGate(index, gateType, controlQubitIndex)}
          />
        ))}
      </div>

      <GateSelector />
    </div>
  );
};

export default QuantumCircuit;
