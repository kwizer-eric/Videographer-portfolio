import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-[#121212] text-[#F0EAD6] selection:bg-[#F0EAD6] selection:text-[#121212]">
      <header className="p-8">
        <h1 className="text-4xl font-serif italic">Videographer Portfolio</h1>
      </header>
      <main className="flex flex-col items-center justify-center h-[50vh]">
        <div className="card border border-[#F0EAD6]/20 p-8 rounded-lg">
          <button
            className="px-6 py-3 border border-[#F0EAD6] hover:bg-[#F0EAD6] hover:text-[#121212] transition-colors"
            onClick={() => setCount((count) => count + 1)}
          >
            Project Count: {count}
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
