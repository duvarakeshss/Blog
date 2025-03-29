import { FC, useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import React from 'react';
import { motion } from 'framer-motion';
import { GateType } from '../types/quantum';

const GateSelector: React.FC = () => {
  const gates: GateType[] = ['H', 'CNOT'];
  const [probabilities, setProbabilities] = useState<Record<string, number>>({ '00': 1 });

  const applyGate = (gate: GateType) => {
    setProbabilities((prevProbabilities) => {
      const newProbabilities: Record<string, number> = { ...prevProbabilities };
      
      Object.entries(prevProbabilities).forEach(([state, prob]) => {
        if (gate === 'H') {
          newProbabilities[state] = (newProbabilities[state] || 0) + prob * 0.5;
        } else if (gate === 'CNOT') {
          if (state === '00') {
            newProbabilities['00'] = (newProbabilities['00'] || 0) + prob;
          } else if (state === '01') {
            newProbabilities['01'] = (newProbabilities['01'] || 0) + prob;
          } else if (state === '10') {
            newProbabilities['11'] = (newProbabilities['11'] || 0) + prob;
          } else if (state === '11') {
            newProbabilities['10'] = (newProbabilities['10'] || 0) + prob;
          }
        }
      });
      
      return newProbabilities;
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, gate: GateType) => {
    applyGate(gate);
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
    <div className="grid grid-cols-1 md:grid-ols-2 gap-6 p-6">
      <div className="grid grid-cols-2 gap-4 justify-center md:justify-start">
        {gates.map((gate) => (
          <motion.button
            key={gate}
            className="px-6 py-3 font-bold rounded-lg shadow-md 
             bg-gradient-to-r from-purple-500 to-blue-500 
             hover:from-blue-500 hover:to-purple-500 
             transition-all duration-300 text-white text-center"
            onPointerDown={(e) => handlePointerDown(e, gate)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {gate}
          </motion.button>
        ))}
        <div className="border-2 border-black p-4 rounded-md px-6 justify-center text-center">
          <h3 className="text-lg text-blue-700 font-semibold mb-4">Drag and Drop Gates</h3>
          </div>
      </div>
      <ProbabilityChart probabilities={probabilities} />
    </div>
  );
};

export default GateSelector;

// Define the props type
interface ProbabilityChartProps {
  probabilities: Record<string, number> | null;
}

const ProbabilityChart: FC<ProbabilityChartProps> = ({ probabilities }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="border-2 border-black p-4 rounded-md bg-gray-300 text-center">Loading...</div>;
  }

  if (!probabilities) {
    return (
      <div className="border-2 border-black p-4 rounded-md bg-gray-300 text-center">
        No probability data available
      </div>
    );
  }

  const data = Object.entries(probabilities).map(([state, probability]) => ({
    state,
    probability, 
  }));

  return (
    <div className="border-2 border-black p-6 rounded-lg bg-yellow-100 shadow-md">
      <h3 className="text-lg text-blue-700 font-semibold text-center mb-4">Probabilities</h3>
      <BarChart
        width={400}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        className="mx-auto"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
        <XAxis dataKey="state" stroke="#333" />
        <YAxis stroke="#333" domain={[0, 1]} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none' }} />
        <Legend />
        <Bar dataKey="probability" fill="#4A90E2" barSize={20} />
      </BarChart>
    </div>
  );
};
