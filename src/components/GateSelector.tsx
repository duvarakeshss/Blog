import React from 'react';
import { motion } from 'framer-motion';
import { GateType } from '../types/quantum';

const GateSelector: React.FC = () => {
  const gates: GateType[] = ['H', 'CNOT'];


  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, gate: GateType) => {
    if (e.currentTarget) {
      const dataTransfer = new DataTransfer();
      dataTransfer.setData('text/plain', gate);
      e.currentTarget.draggable = true; 
      e.currentTarget.ondragstart = (dragEvent) => {
        dragEvent.dataTransfer?.setData('text/plain', gate);
        dragEvent.dataTransfer!.effectAllowed = 'move';
      };
    }
  };

  return (
    <div className="flex gap-4 mt-4">
      {gates.map((gate) => (
        <motion.div
          key={gate}
          className="px-4 py-2 bg-orange-400 text-white font-bold rounded-md shadow-md cursor-pointer"
          draggable
          onPointerDown={(e) => handlePointerDown(e, gate)} 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {gate}
        </motion.div>
      ))}
    </div>
  );
};

export default GateSelector;
