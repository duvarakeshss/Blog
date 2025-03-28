import React from 'react';
import { motion } from 'framer-motion';
import { GateType } from '../types/quantum';

const GateSelector: React.FC = () => {
  const gates: GateType[] = ['H', 'CNOT'];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, gate: GateType) => {
    e.dataTransfer.setData('text/plain', gate);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex gap-4 mt-4"> {/* Flex layout with spacing between buttons */}
      {gates.map((gate) => (
        <motion.div 
          key={gate}
          className="px-4 py-2 bg-orange-400 text-white font-bold rounded-md shadow-md cursor-pointer"
          draggable
          onDragStart={(e) => handleDragStart(e, gate)}
          whileHover={{ scale: 1.1 }} // Slight scale-up on hover
          whileTap={{ scale: 0.9 }} // Shrinks when tapped or clicked
        >
          {gate}
        </motion.div>
      ))}
    </div>
  );
};

export default GateSelector;
