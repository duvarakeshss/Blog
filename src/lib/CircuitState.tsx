"use client";
import { useState, useCallback } from 'react';
import { QubitLineState, GateType } from '../types/quantum';

function useQuantumCircuit() {
  const [qubits, setQubits] = useState<QubitLineState[]>([{ gates: [] }]);
  const [history, setHistory] = useState<QubitLineState[][]>([]);
  const [redoStack, setRedoStack] = useState<QubitLineState[][]>([]);

  // const saveHistory = useCallback(() => {
  //   setHistory(prev => [...prev, qubits]);
  //   setRedoStack([]);
  // }, [qubits]);

  const addQubit = useCallback(() => {
    setQubits(prev => {
      const newQubits = [...prev, { gates: [] }];
      setHistory(hist => [...hist, prev]);
      return newQubits;
    });
    setRedoStack([]);
  }, []);

  const removeQubit = useCallback((index: number) => {
    if (qubits.length > 1) {
      setQubits(prev => {
        const newQubits = prev.filter((_, i) => i !== index);
        setHistory(hist => [...hist, prev]);
        return newQubits;
      });
      setRedoStack([]);
    }
  }, [qubits]);

  const addGate = useCallback((qubitIndex: number, gateType: GateType, controlQubitIndex?: number) => {
    setQubits(prev => {
      const newQubits = prev.map((qubitLine, idx) =>
        idx === qubitIndex
          ? { ...qubitLine, gates: [...qubitLine.gates, { type: gateType, qubitIndex, controlQubitIndex }] }
          : qubitLine
      );
      setHistory(hist => [...hist, prev]);
      return newQubits;
    });
    setRedoStack([]);
  }, []);

  const undo = useCallback(() => {
    if (history.length > 0) {
      setRedoStack(prev => [...prev, qubits]);
      setQubits(history[history.length - 1]);
      setHistory(prev => prev.slice(0, -1));
    }
  }, [history, qubits]);

  const redo = useCallback(() => {
    if (redoStack.length > 0) {
      setHistory(prev => [...prev, qubits]);
      setQubits(redoStack[redoStack.length - 1]);
      setRedoStack(prev => prev.slice(0, -1));
    }
  }, [redoStack, qubits]);

  return {
    qubits,
    addQubit,
    removeQubit,
    addGate,
    undo,
    redo
  };
}

export default useQuantumCircuit;
