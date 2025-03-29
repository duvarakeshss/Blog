"use client";
import QuantumCircuit from '@/components/QuantumCircuit';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Quantum Circuit Composer</h1>
      <QuantumCircuit />
    </main>
  )
}
