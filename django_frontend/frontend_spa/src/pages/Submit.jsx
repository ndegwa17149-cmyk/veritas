import React, {useState} from 'react'

export default function Submit(){
  const [msg, setMsg] = useState(null)

  async function submit(e){
    e.preventDefault()
    const token = localStorage.getItem('veritas_token')
    if(!token){ setMsg({type:'warning', text:'Please login first.'}); return }
    const payload = {
      title: e.target.title.value,
      description: e.target.description.value,
      type: e.target.type.value,
      file_url: e.target.file_url.value || undefined
    }
    try{
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      if(res.status===201){ setMsg({type:'success', text:'Submitted successfully (pending verification).'}); return }
      const err = await res.json().catch(()=>({detail:'Submission failed'}))
      setMsg({type:'danger', text: err.detail || 'Submission failed'})
    }catch(e){ setMsg({type:'danger', text:'Network error'}) }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title mb-4">Submit a Contribution</h2>
            <form onSubmit={submit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input name="title" className="form-control" id="title" required />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea name="description" className="form-control" id="description" />
              </div>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <select name="type" className="form-select" id="type" required>
                  <option value="asset" defaultValue>Asset</option>
                  <option value="idea">Idea</option>
                  <option value="work">Work</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="file_url" className="form-label">File URL (HTTPS)</label>
                <input name="file_url" className="form-control" id="file_url" placeholder="https://example.com/file.pdf" />
              </div>
              <button className="btn btn-primary w-100" type="submit">Submit</button>
            </form>
            {msg && <div className={`alert alert-${msg.type} mt-3`}>{msg.text}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
