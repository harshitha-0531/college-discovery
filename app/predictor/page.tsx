'use client'

import { useState } from 'react'

interface College {
  id: string
  name: string
  location: string
  annualFee: number
  cutoffRank: number
  examName: string
}

export default function PredictorPage() {
  const [rank, setRank] = useState('')
  const [exam, setExam] = useState('EAMCET')
  const [results, setResults] = useState<College[]>([])
  const [searched, setSearched] = useState(false)

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rank, exam })
    })
    const data = await res.json()
    setResults(data)
    setSearched(true)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">College Rank Predictor</h1>
        <p className="text-slate-600 text-sm mb-6">Input your entrance rank to see colleges where you meet the estimated cutoff.</p>

        <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="p-3 border rounded-lg focus:outline-blue-600"
          >
            <option value="EAMCET">TS EAMCET</option>
            <option value="JEE Main">JEE Main</option>
          </select>

          <input
            type="number"
            placeholder="Enter Your Rank"
            required
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            className="p-3 border rounded-lg focus:outline-blue-600"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Predict Colleges
          </button>
        </form>
      </div>

      {searched && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Eligible Colleges ({results.length})</h2>
          {results.length === 0 ? (
            <p className="text-slate-500">No matching colleges found for this rank.</p>
          ) : (
            results.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{c.name}</h3>
                  <p className="text-sm text-slate-500">{c.location} • Cutoff: {c.cutoffRank}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">₹{c.annualFee.toLocaleString()} / yr</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}