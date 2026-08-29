'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface College {
  id: string
  name: string
  location: string
  annualFee: number
  rating: number
  placements?: { avgPackage: number; highestPkg: number }
}

function CompareContent() {
  const searchParams = useSearchParams()
  const idsParam = searchParams.get('ids')
  const [colleges, setColleges] = useState<College[]>([])

  useEffect(() => {
    fetch('/api/colleges')
      .then((res) => res.json())
      .then((data: College[]) => {
        if (idsParam) {
          const selected = data.filter((c) => idsParam.split(',').includes(c.id))
          setColleges(selected.length ? selected : data.slice(0, 2))
        } else {
          setColleges(data.slice(0, 2))
        }
      })
  }, [idsParam])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">College Comparison</h1>
      <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4 w-1/4 font-semibold text-slate-600">Metric</th>
              {colleges.map((c) => (
                <th key={c.id} className="p-4 font-bold text-lg text-blue-600">{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y text-slate-700">
            <tr>
              <td className="p-4 font-semibold text-slate-500">Location</td>
              {colleges.map((c) => <td key={c.id} className="p-4">{c.location}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-slate-500">Rating</td>
              {colleges.map((c) => <td key={c.id} className="p-4">★ {c.rating}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-slate-500">Annual Fee</td>
              {colleges.map((c) => <td key={c.id} className="p-4">₹{c.annualFee.toLocaleString()}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-slate-500">Avg Placement Package</td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4">{c.placements?.avgPackage ? `${c.placements.avgPackage} LPA` : 'N/A'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-slate-500">Highest Package</td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4">{c.placements?.highestPkg ? `${c.placements.highestPkg} LPA` : 'N/A'}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={<p>Loading comparison matrix...</p>}>
      <CompareContent />
    </Suspense>
  )
}