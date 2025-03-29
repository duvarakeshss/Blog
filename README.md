# Quantum Circuit Composer

## Overview
Quantum Circuit Composer is a web-based application that allows users to visually construct quantum circuits using a drag-and-drop interface. The application supports dynamic qubit management, quantum gate operations, and circuit visualization.

## Features
- **Drag-and-Drop Interface**: Easily add quantum gates to qubit lines.
- **Quantum Gates**:
  - **Hadamard (H) Gate**: Creates superposition states.
  - **Controlled-NOT (CNOT) Gate**: Implements qubit entanglement.
- **Dynamic Qubit Management**:
  - Add or remove qubits dynamically.
- **Undo/Redo Functionality**: Allows users to correct mistakes efficiently.
- **Probability Visualization**: Displays measurement probabilities using histograms.

## Technologies Used
- **Framework**: Next.js (React-based)
- **State Management**: React State & Context API
- **Visualization**: SVG & TailwindCSS

## Installation & Setup
### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/duvarakeshss/Blog.git
   cd Blog
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

