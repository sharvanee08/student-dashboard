// client/src/components/AttendanceCalculator.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import "./AttendanceCalculator.css";

const DEFAULT_THRESHOLD = 75;

function classesToReachThreshold(attended, total, threshold = DEFAULT_THRESHOLD) {
  const current = total === 0 ? 0 : (attended / total) * 100;
  const t = threshold / 100;
  if (current >= threshold) {
    const x = Math.floor(attended / t - total);
    return { canMiss: Math.max(0, x), needToAttend: 0 };
  } else {
    const denom = 1 - t;
    if (denom <= 0) return { canMiss: 0, needToAttend: 0 };
    const need = Math.ceil((t * total - attended) / denom);
    return { canMiss: 0, needToAttend: Math.max(0, need) };
  }
}

export default function AttendanceCalculator() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ subject: "", totalClasses: "", attendedClasses: "" });
  const [editingId, setEditingId] = useState(null);
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);
  const [error, setError] = useState("");

  useEffect(() => { fetchRecords(); }, []);

  async function fetchRecords() {
    try {
      setLoading(true);
      const username = localStorage.getItem("username"); // ✅ added
      const res = await API.get("/attendance", { params: { user: username } }); // ✅ added user param
      setRecords(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Could not load records");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({ subject: "", totalClasses: "", attendedClasses: "" });
    setEditingId(null);
    setError("");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const subject = (form.subject || "").trim();
    const total = Number(form.totalClasses);
    const attended = Number(form.attendedClasses);
    if (!subject) { setError("Enter subject"); return; }
    if (isNaN(total) || total < 0 || isNaN(attended) || attended < 0) { setError("Numbers must be non-negative"); return; }
    if (attended > total) { setError("Attended cannot exceed total"); return; }

    try {
      const username = localStorage.getItem("username"); // ✅ added
      if (editingId) {
        await API.put(`/attendance/${editingId}`, { subject, totalClasses: total, attendedClasses: attended });
      } else {
        await API.post("/attendance", { user: username, subject, totalClasses: total, attendedClasses: attended }); // ✅ attach user
      }
      resetForm();
      fetchRecords();
    } catch (err) {
      console.error(err);
      setError("Save failed");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this record?")) return;
    try {
      await API.delete(`/attendance/${id}`);
      fetchRecords();
    } catch (err) {
      console.error(err);
      setError("Delete failed");
    }
  }

  function startEdit(r) {
    setEditingId(r._id);
    setForm({ subject: r.subject, totalClasses: String(r.totalClasses || 0), attendedClasses: String(r.attendedClasses || 0) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Try atomic mark endpoint first; fallback to client-side PUT update
  async function handleMark(id, attendedBool) {
    try {
      try {
        await API.post(`/attendance/${id}/mark`, { attended: attendedBool });
      } catch (err) {
        // fallback: update full record
        if (!err.response || err.response.status !== 404) throw err;
        const rec = records.find(r => r._id === id);
        if (!rec) return;
        const newTotal = Number(rec.totalClasses || 0) + 1;
        const newAttended = Number(rec.attendedClasses || 0) + (attendedBool ? 1 : 0);
        await API.put(`/attendance/${id}`, { subject: rec.subject, totalClasses: newTotal, attendedClasses: newAttended });
      }
      fetchRecords();
    } catch (err) {
      console.error(err);
      setError("Could not mark attendance");
    }
  }

  const overallAverage = (() => {
    if (!records.length) return 0;
    let sum = 0, count = 0;
    for (const r of records) {
      const t = Number(r.totalClasses || 0), a = Number(r.attendedClasses || 0);
      if (t > 0) { sum += (a / t) * 100; count++; }
    }
    return count ? (sum / count).toFixed(2) : 0;
  })();

  return (
    <div className="attendance-container">
      <h2>📊 Attendance Manager</h2>

      <form className="attendance-form" onSubmit={handleSubmit}>
        <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
        <input name="totalClasses" type="number" min="0" placeholder="Total Classes" value={form.totalClasses} onChange={handleChange} />
        <input name="attendedClasses" type="number" min="0" placeholder="Attended Classes" value={form.attendedClasses} onChange={handleChange} />
        <button type="submit">{editingId ? "Save" : "Add"}</button>
        <button type="button" className="clear-btn" onClick={resetForm}>Clear</button>
      </form>

      <div className="threshold-row">
        <label>Threshold:
          <input type="number" min="1" max="100" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />
          %
        </label>
        <div className="overall">Overall average: <strong>{overallAverage}%</strong></div>
      </div>

      {error && <div className="form-error">{error}</div>}

      {loading ? <p style={{ textAlign: "center" }}>Loading…</p> : (
        <ul className="attendance-list">
          {records.length === 0 && <li className="no-records">No attendance records yet.</li>}
          {records.map((r) => {
            const total = Number(r.totalClasses || 0);
            const attended = Number(r.attendedClasses || 0);
            const percent = total > 0 ? ((attended / total) * 100).toFixed(2) : "0.00";
            const { canMiss, needToAttend } = classesToReachThreshold(attended, total, threshold);
            const isLow = Number(percent) < threshold;

            return (
              <li key={r._id} className={`attendance-item ${isLow ? "low-attendance" : ""}`}>
                <div className="attendance-info">
                  <div>
                    <strong className="subject">{r.subject}</strong>
                    <div className="counts">{attended} / {total} classes</div>
                  </div>

                  <div className="percent-block">
                    <div className="percent">{percent}%</div>
                    <div className="threshold-note">Threshold: {threshold}%</div>
                  </div>
                </div>

                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min(100, Number(percent))}%`, backgroundColor: isLow ? "#e53935" : "#43a047" }} />
                </div>

                <div className="item-actions">
                  <div className="left-actions">
                    <button type="button" className="small-btn" onClick={() => handleMark(r._id, true)}>Mark Attended</button>
                    <button type="button" className="small-btn muted" onClick={() => handleMark(r._id, false)}>Mark Missed</button>
                    <button type="button" className="small-btn" onClick={() => startEdit(r)}>Edit</button>
                    <button type="button" className="small-btn danger" onClick={() => handleDelete(r._id)}>Delete</button>
                  </div>

                  <div className="right-note">
                    {canMiss > 0 && <div className="note">You can miss <strong>{canMiss}</strong> more class(es) and stay ≥{threshold}%</div>}
                    {needToAttend > 0 && <div className="note warn">Attend next <strong>{needToAttend}</strong> class(es) to reach {threshold}%</div>}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

