// client/src/components/TimetablePlanner.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import "./TimetablePlanner.css";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function TimetablePlanner() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ day: "Monday", subject: "", startTime: "", endTime: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchEntries(); }, []);

  async function fetchEntries() {
    try {
      setLoading(true);
      const username = localStorage.getItem("username");
      const res = await API.get("/timetable", { params: { user: username } });
      const sorted = (res.data || []).sort((a, b) => {
        const d = DAYS.indexOf(a.day) - DAYS.indexOf(b.day);
        if (d !== 0) return d;
        return a.startTime.localeCompare(b.startTime);
      });
      setEntries(sorted);
    } catch (err) {
      console.error("Fetch timetable error", err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.subject || !form.startTime || !form.endTime) return alert("Fill all fields");
    try {
      const username = localStorage.getItem("username");
      await API.post("/timetable", { ...form, user: username });
      setForm({ day: "Monday", subject: "", startTime: "", endTime: "" });
      fetchEntries();
    } catch (err) {
      console.error("Add error", err);
      alert("Could not add entry");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this entry?")) return;
    try {
      await API.delete(`/timetable/${id}`);
      fetchEntries();
    } catch (err) {
      console.error("Delete error", err);
    }
  }

  // build day -> entries map
  const mapByDay = DAYS.reduce((acc, d) => ({ ...acc, [d]: [] }), {});
  entries.forEach(e => { if (mapByDay[e.day]) mapByDay[e.day].push(e); });
  for (const d of DAYS) mapByDay[d].sort((a,b) => a.startTime.localeCompare(b.startTime));

  const maxLen = Math.max(...DAYS.map(d => mapByDay[d].length));

  return (
    <div className="timetable-container">
      <h2>📅 Timetable (Mon → Sat)</h2>

      <form className="timetable-form" onSubmit={handleAdd}>
        <select name="day" value={form.day} onChange={handleChange}>
          {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />

        <input name="startTime" type="time" value={form.startTime} onChange={handleChange} />
        <input name="endTime" type="time" value={form.endTime} onChange={handleChange} />

        <button type="submit">Add</button>
      </form>

      <div className="timetable-table-wrap">
        {loading ? <p>Loading…</p> : (
          <table className="timetable-table">
            <thead>
              <tr>{DAYS.map(d => <th key={d}>{d}</th>)}</tr>
            </thead>
            <tbody>
              {maxLen === 0 ? (
                <tr><td colSpan={DAYS.length} style={{ textAlign: "center", padding: 20, color: "#666" }}>No entries yet.</td></tr>
              ) : (
                Array.from({ length: maxLen }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {DAYS.map((d) => {
                      const item = mapByDay[d][rowIndex];
                      return (
                        <td key={d + rowIndex}>
                          {item ? (
                            <div className="cell-card">
                              <div className="cell-subject">{item.subject}</div>
                              <div className="cell-time">{item.startTime} - {item.endTime}</div>
                              <button className="cell-delete" type="button" onClick={() => handleDelete(item._id)}>Delete</button>
                            </div>
                          ) : <div className="cell-empty">—</div>}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
