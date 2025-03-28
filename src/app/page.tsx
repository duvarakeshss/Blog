// app/page.tsx
"use client";
import QuantumCircuit from '@/components/QuantumCircuit';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quantum Circuit Composer</h1>
      <QuantumCircuit />
    </main>
  )
}