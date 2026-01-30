import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

export default function FocusChart(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    const username = localStorage.getItem("username"); // ✅ added line
    axios.get('/api/sessions/daily',{
      params: { user: username }, // ✅ added line
    }).then(res=>{
      const rows = res.data;
      const hours = Array.from({length:24},(_,i)=>i);
      const totals = hours.map(h=>{
        const r = rows.find(x=>x.hour===h);
        return r ? Math.round(r.totalSec/60) : 0; // minutes
      });
      setData({
        labels: hours.map(h=>String(h)),
        datasets: [{ label: 'Focused minutes', data: totals, fill:false }]
      });
    }).catch(()=>{ setData({
      labels: ['0'], datasets:[{label:'Focused minutes', data:[0]}]
    })});
  },[]);

  if(!data) return <div style={{marginTop:12}}>Loading chart...</div>;
  return (
    <div style={{maxWidth:900, margin:'1rem auto', background:'rgba(0,0,0,0.2)', padding:12, borderRadius:8}}>
      <Line data={data} />
    </div>
  );
}
