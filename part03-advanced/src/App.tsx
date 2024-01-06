import React from 'react'

function App() {
  const [count, setCount] = React.useState(0)

  return (
    <div className="w-5/6 mx-auto flex flex-col gap-3">
      <h1 className="text-2xl font-bold text-center">Part03: Advanced</h1>
      <div className="bg-gray-100 border border-gray-200 flex justify-center items-center p-2">
        <button className="bg-blue-700 text-gray-50 rounded-lg p-3" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="font-semibold text-center">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
