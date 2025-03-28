import React from 'react';
import { motion } from 'framer-motion';
import { GateType } from '../types/quantum';

interface QuantumGateProps {
  type: GateType;
  controlQubitIndex?: number;
}

const QuantumGate: React.FC<QuantumGateProps> = ({ type, controlQubitIndex }) => {
  if (!type) return null;

  const renderGate = () => {
    switch (type) {
      case 'H':
        return <div className="gate h-gate">H</div>;
      case 'CNOT':
        return (
          <div className="gate cnot-gate">
            {controlQubitIndex !== undefined ? `CNOT (Q${controlQubitIndex})` : 'CNOT'}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="quantum-gate"
    >
      {renderGate()}
    </motion.div>
  );
};

export default QuantumGate;
