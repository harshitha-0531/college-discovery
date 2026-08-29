import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center space-y-8">
      <div className="max-w-3xl space-y-4">
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          AI & Fullstack Driven Platform
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Find Your Ideal College & Predict Admission Cutoffs
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore top engineering and higher education institutes, compare fee structures and placement stats side-by-side, and predict eligible colleges using rank matching.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/colleges"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition"
        >
          Explore & Filter Colleges
        </Link>
        <Link
          href="/predictor"
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition"
        >
          Try Rank Predictor
        </Link>
        <Link
          href="/compare"
          className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold py-3 px-8 rounded-xl transition"
        >
          Compare Colleges
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl pt-8 border-t border-slate-200">
        <div className="bg-white p-5 rounded-xl border border-slate-200 text-left">
          <h3 className="font-bold text-slate-900">Direct Search</h3>
          <p className="text-sm text-slate-500 mt-1">Filter by tuition fees, locations, and entrance exam requirements.</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 text-left">
          <h3 className="font-bold text-slate-900">Side-by-Side Matrix</h3>
          <p className="text-sm text-slate-500 mt-1">Compare placement packages, ratings, and course fees across institutes.</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 text-left">
          <h3 className="font-bold text-slate-900">Rank Matching</h3>
          <p className="text-sm text-slate-500 mt-1">Input your JEE Main or TS EAMCET rank to view matching cutoffs.</p>
        </div>
      </div>
    </div>
  )
}