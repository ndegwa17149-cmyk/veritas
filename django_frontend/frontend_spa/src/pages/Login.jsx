import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({identifier, password})
      })
      if(!res.ok){
        const err = await res.json().catch(()=>({detail:'Login failed'}))
        setMsg({type:'danger', text: err.detail || 'Login failed'})
        return
      }
      const data = await res.json()
      localStorage.setItem('veritas_token', data.access_token)
      nav('/')
    }catch(e){
      setMsg({type:'danger', text:'Network error'})
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title mb-4">Sign In</h2>
            <form onSubmit={submit}>
              <div className="mb-3">
                <label htmlFor="identifier" className="form-label">Email or Username</label>
                <input className="form-control" id="identifier" value={identifier} onChange={e => setIdentifier(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input className="form-control" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <button className="btn btn-primary w-100" type="submit">Login</button>
            </form>
            {msg && <div className={`alert alert-${msg.type} mt-3`}>{msg.text}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
