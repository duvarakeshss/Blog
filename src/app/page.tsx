"use client";
import QuantumCircuit from '@/components/QuantumCircuit';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const fullText = 'Developed by DK';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="container mx-auto p-4 ">
      {/* Title Section */}
      <div className="relative text-center mb-6">
        {/* Gradient Animated Heading */}
        <h1 className="text-3xl font-bold px-4 py-2 inline-block rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-700">
          Quantum Circuit Composer
        </h1>

        {/* Gradient Animated Underline */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 h-1 w-3/4 animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
      </div>

      <QuantumCircuit />

      {/* OpenQASM 2.0 Code Snippet */}
      <pre className="bg-gray-900 text-white p-4 rounded-lg mt-6 overflow-auto">
        <code>
          {`OPENQASM 2.0;
include "qelib1.inc";
qreg q[3];
creg c[3];`}
        </code>
      </pre>

      {/* Footer Section */}
      <footer className="mt-6 text-center text-gray-500">
        <motion.div 
          className="inline-block font-mono"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.div>
      </footer>
    </main>
  );
}
