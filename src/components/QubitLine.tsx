import React from 'react';
import { motion } from 'framer-motion';
import { Gate, GateType } from '../types/quantum';
import QuantumGate from './QuantumGate';

interface QubitLineProps {
  index: number;
  gates: Gate[];
  onRemoveQubit: () => void;
  onAddGate: (gateType: GateType, position: number) => void;
}

const QubitLine: React.FC<QubitLineProps> = ({ 
  index, 
  gates, 
  onRemoveQubit, 
  onAddGate 
}) => {
  
  // Handles right-click (context menu) to remove qubit
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onRemoveQubit();
  };

  // Handles when a gate is dragged over the qubit line
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Allows dropping
  };

  // Handles dropping a gate onto the qubit line
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const gateType = e.dataTransfer.getData('text/plain') as GateType;
    if (!gateType) return; // Ensure valid gate

    // Determine position (based on mouse X)
    const rect = e.currentTarget.getBoundingClientRect();
    const position = Math.floor((e.clientX - rect.left) / 50); // Adjust for spacing

    onAddGate(gateType, position);
  };

  return (
    <div 
      className="qubit-line" 
      onContextMenu={handleContextMenu}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="qubit-label">Q{index}</div>
      <div className="gate-track">
        {gates.map((gate, gateIndex) => (
          <motion.div 
            key={`${gate.type}-${gateIndex}`} 
            className="gate-container"
            style={{ left: `${gateIndex * 50}px` }} // Position based on index
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <QuantumGate type={gate.type} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QubitLine;
