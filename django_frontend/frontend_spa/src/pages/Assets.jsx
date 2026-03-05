import React, { useEffect, useState } from 'react'

export default function Assets(){
  const [assets, setAssets] = useState([])
  const [err, setErr] = useState(null)

  useEffect(()=>{
    fetch('/api/assets')
      .then(r=>{ if(!r.ok) throw new Error('Network'); return r.json() })
      .then(setAssets)
      .catch(e=>setErr(e.message))
  },[])

  if(err) return <div className="alert alert-danger">Unable to load assets at this time. Please try again later.</div>

  return (
    <div>
      <header className="mb-4">
        <h1 className="display-5">Public Assets</h1>
        <p className="lead text-muted">Explore assets shared by the Veritas community.</p>
      </header>

      <section className="mb-5">
        <div className="row">
          <div className="col-md-6">
            <h2>Our Mission</h2>
            <p className="text-secondary">To empower individuals and teams by providing a transparent platform for sharing, discovering, and collaborating on valuable assets and ideas.</p>
          </div>
          <div className="col-md-6">
            <h2>Our Vision</h2>
            <p className="text-secondary">To become the leading hub where innovation meets integrity—fostering a global community built on trust, transparency, and collective growth.</p>
          </div>
        </div>
      </section>

      <div className="row g-4">
        {assets.length === 0 && <p className="text-muted">No public assets have been published yet.</p>}
        {assets.map(a => (
          <div key={a.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{a.title}</h5>
                <p className="card-text">{a.description || ''}</p>
              </div>
              <div className="card-footer text-muted small">
                By {a.user?.username || 'unknown'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
