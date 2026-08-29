'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface College {
  id: string
  name: string
  location: string
  annualFee: number
  rating: number
  examName: string
  cutoffRank: number
}

export default function SearchPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [search, setSearch] = useState('')
  const [maxFee, setMaxFee] = useState('')

  useEffect(() => {
    fetchColleges()
  }, [])

  const fetchColleges = async () => {
    const params = new URLSearchParams()
    if (search) params.append('q', search)
    if (maxFee) params.append('maxFee', maxFee)
    const res = await fetch(`/api/colleges?${params.toString()}`)
    const data = await res.json()
    setColleges(data)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h1 className="text-2xl font-bold">Discover Colleges</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by college name..."
            className="p-3 border rounded-lg focus:outline-blue-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Annual Fee (₹)..."
            className="p-3 border rounded-lg focus:outline-blue-600"
            value={maxFee}
            onChange={(e) => setMaxFee(e.target.value)}
          />
          <button
            onClick={fetchColleges}
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {colleges.map((college) => (
          <div key={college.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold">{college.name}</h2>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  ★ {college.rating}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{college.location}</p>
              <div className="mt-4 space-y-1 text-sm text-slate-700">
                <p><strong>Annual Fee:</strong> ₹{college.annualFee.toLocaleString()}</p>
                <p><strong>Accepted Exam:</strong> {college.examName} (Cutoff: ~{college.cutoffRank})</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Link
                href={`/compare?ids=${college.id}`}
                className="flex-1 text-center bg-slate-100 font-medium py-2 rounded-lg text-slate-700 hover:bg-slate-200 text-sm"
              >
                Compare
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}