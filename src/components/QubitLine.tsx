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
  
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onRemoveQubit();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const gateType = e.dataTransfer.getData('text/plain') as GateType;
    if (!gateType) return; 

    const rect = e.currentTarget.getBoundingClientRect();
    const position = Math.floor((e.clientX - rect.left) / 50); 

    onAddGate(gateType, position);
  };

  return (
    <motion.div 
      className="qubit-line relative flex items-center gap-4 p-4"
      onContextMenu={handleContextMenu}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Qubit Label */}
      <motion.div 
        className="qubit-label text-white font-bold px-4 py-2 bg-gray-800 rounded-md shadow-md"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        Q{index}
      </motion.div>

      {/* Animated Line */}
      <div className="relative w-full">
        <motion.div 
          className="absolute top-1/2 left-0 w-full h-[3px] bg-white opacity-75"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        ></motion.div>

        {/* Gate Track */}
        <div className="gate-track flex relative overflow-hidden px-6 py-3 bg-gray-900 rounded-lg min-w-[300px]">
          {gates.map((gate, gateIndex) => (
            <motion.div 
              key={`${gate.type}-${gateIndex}`} 
              className="gate-container"
              style={{ left: `${gateIndex * 50}px` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1, background: 'linear-gradient(to bottom, white, grey)' }}
            >
              <QuantumGate type={gate.type} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QubitLine;