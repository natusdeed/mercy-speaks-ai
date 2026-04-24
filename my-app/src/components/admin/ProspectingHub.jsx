import { useState, useEffect } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "HVAC","Plumbing","Roofing","Electrical","Landscaping",
  "General Contractor","Pest Control","Painting","Flooring",
  "Cleaning Services","Pool Service","Garage Door","Fence & Deck",
  "Concrete & Masonry","Tree Service"
];
const STATUSES = ["New Lead","Contacted","Follow-Up","Demo Booked","Closed","Not Interested"];
const STATUS_COLORS = {
  "New Lead":"#00d4ff","Contacted":"#f59e0b","Follow-Up":"#a78bfa",
  "Demo Booked":"#34d399","Closed":"#10b981","Not Interested":"#6b7280"
};
const CAL_LINK = "https://cal.com/natusdeed/free-ai-receptionist-demo";
const AVG_JOB_VALUES = {
  "HVAC":850,"Plumbing":650,"Roofing":8500,"Electrical":750,
  "Landscaping":400,"General Contractor":4500,"Pest Control":250,
  "Painting":1800,"Flooring":2200,"Cleaning Services":180,
  "Pool Service":320,"Garage Door":450,"Fence & Deck":3200,
  "Concrete & Masonry":2800,"Tree Service":900
};
const MAPS_SEARCHES = [
  { category:"HVAC", queries:["HVAC contractor Houston TX","air conditioning repair Houston","heating and cooling Houston TX","AC installation Houston near me"], signal:"Search on hot weather days for peak urgency signal. Filter listings with no website first." },
  { category:"Plumbing", queries:["plumber Houston TX","emergency plumber Houston","drain cleaning Houston","water heater repair Houston TX"], signal:"Filter by 'open now' — businesses not answering live calls are prime Mercy targets." },
  { category:"Roofing", queries:["roofing contractor Houston TX","roof repair Houston","roof replacement near me Houston","storm damage roof Houston"], signal:"After rain/storms in Houston, contact within 48 hours — call volume spikes and they miss the most." },
  { category:"Electrical", queries:["electrician Houston TX","electrical contractor Houston","panel upgrade Houston","licensed electrician near me Houston"], signal:"Target businesses with under 20 reviews in high-population zip codes (77084, 77449, 77095)." },
  { category:"Landscaping", queries:["landscaping company Houston TX","lawn care service Houston","landscape design Houston","yard maintenance Houston TX"], signal:"Many are solo operators working in the field all day — highest missed-call rate of any category." },
  { category:"General Contractor", queries:["general contractor Houston TX","home remodeling Houston","renovation contractor Houston","construction company Houston TX"], signal:"Look for GBP with no photos and no website link — huge trust gap, easy pitch." },
  { category:"Pest Control", queries:["pest control Houston TX","exterminator Houston","termite treatment Houston","rodent removal Houston TX"], signal:"High inbound call volume businesses. Missed calls are their single biggest pain point." },
  { category:"Cleaning Services", queries:["cleaning service Houston TX","house cleaning Houston","commercial cleaning Houston","maid service near me Houston"], signal:"Often Facebook-only, no website. Easiest pitch — they know they're behind digitally." },
];
const CRITERIA_CHECKS = [
  { id:"reviews", label:"Under 30 Google Reviews", weight:25, tip:"Low review count = low digital investment" },
  { id:"noWebsite", label:"No Website or Facebook-Only", weight:25, tip:"Missing website = missing leads every day" },
  { id:"oldReview", label:"Last Review 60+ Days Ago", weight:20, tip:"Inactive review profile = disengaged owner" },
  { id:"noHours", label:"Hours Not Listed on GBP", weight:15, tip:"Missing hours = losing after-hours calls" },
  { id:"unanswered", label:"Unanswered Reviews / No Responses", weight:10, tip:"No responses = no one managing reputation" },
  { id:"lowRating", label:"Rating Below 4.0", weight:5, tip:"Pain point: reputation is bleeding revenue" },
];
const OBJECTION_HANDLERS = [
  { objection:"We already have a receptionist", response:"That's great — Mercy doesn't replace your receptionist. She handles the overflow: after-hours calls, lunch rush, weekends. Your team handles the relationship work. Mercy handles everything else so nothing falls through the cracks." },
  { objection:"We're too small for this", response:"Actually, smaller operations benefit most. A 3-person plumbing crew missing 5 calls a day is losing $2,000–$5,000 a week in potential jobs. Mercy pays for herself with the first call she captures." },
  { objection:"How much does it cost?", response:"Before I give you a number, let me ask — how many calls do you think you miss per week? [Let them answer.] Multiply that by your average job value. That's what you're losing. Mercy runs at a fraction of that — and I can show you exactly how during a 20-minute demo." },
  { objection:"We use voicemail", response:"Most people under 40 hang up without leaving one. You're not losing leads who leave voicemails — you're losing the ones who never do. Mercy answers every call instantly, qualifies the lead, and books the appointment before they call your competitor." },
  { objection:"I need to think about it", response:"Totally fair. Can I ask what part feels uncertain? [Listen.] Most of my clients felt the same way until they saw it live — that's why I offer a 20-minute demo with no commitment. What does your calendar look like this week?" },
  { objection:"We get enough business through referrals", response:"Referrals are the best leads — agreed. But what happens when a referral calls and no one picks up? They don't wait. They call whoever answers. Mercy makes sure every referral actually turns into a booked job." },
  { objection:"We tried something like this before and it didn't work", response:"I hear that a lot. Most AI tools for contractors are generic — not built for the trades. Mercy is specifically trained for contractor calls: qualifying the job type, capturing the address, checking service area, and booking the estimate. What specifically didn't work before?" },
];
const AUDIT_STEPS = [
  { step:1, title:"Open the Call", script:"Hey [Name], this is Donatus from Mercy Speaks Digital. I was doing some research on top [CATEGORY] contractors in Houston and came across [BUSINESS NAME]. I actually ran a quick AI audit on your online presence and found a couple things I thought you'd want to know about. Do you have about 3 minutes?" },
  { step:2, title:"Deliver the Hook", script:"So based on your Google profile, here's what I'm seeing: [Review count] reviews — which is below average for your area. Your profile doesn't have [missing element]. And businesses in your category in Houston are typically missing about [X] calls per week. That's roughly $[estimated lost revenue] a month walking out the door before you even get a chance to pitch them." },
  { step:3, title:"Introduce Mercy", script:"We built an AI receptionist called Mercy — she answers every call 24/7, qualifies the lead, and books the appointment directly into your calendar. She sounds completely natural and is specifically trained for contractors. We've deployed her for HVAC and plumbing companies right here in Houston." },
  { step:4, title:"Handle Objections", script:"Use the Objection Handler tab for any pushback. Always redirect toward the demo — never try to close on the first call. Your only goal right now is to get a yes to the demo." },
  { step:5, title:"Book the Demo", script:"Here's what I'd like to do — I'll send you a link right now to book a 20-minute live demo. You'll hear Mercy in action, ask her anything, and I'll show you exactly how she'd be set up for [BUSINESS NAME]. No commitment. Fair?" },
  { step:6, title:"Send the Handoff", script:"Use the Demo Handoff tab to generate and send the personalized booking message with the Cal.com link. Follow up within 24 hours if they haven't booked." }
];
const FOLLOW_UP_SEQUENCES = {
  "Contacted":[
    { day:1, channel:"Email", message:"Hey [Name] — just checking in. Did you get a chance to look at the Mercy info I sent over? Happy to answer any questions before you decide on the demo." },
    { day:3, channel:"DM/Text", message:"Hey [Name], Donatus here from Mercy Speaks Digital. Quick follow-up — I know you're busy running [BUSINESS]. Mercy literally exists to handle exactly that. Worth 20 minutes to see it live?" },
    { day:7, channel:"Email", message:"Hey [Name] — last follow-up from me. I'm setting up two more [CATEGORY] businesses in Houston this month and wanted to give you first shot. If timing's off, totally fine. Either way, here's the demo link: " + CAL_LINK },
  ],
  "Follow-Up":[
    { day:0, channel:"Call", message:"Hey [Name], calling as promised. I wanted to make sure you had a chance to think about the Mercy demo. Any questions I can answer before we book it?" },
    { day:2, channel:"Text", message:"Hey [Name] — Donatus. Grabbed a spot that works this week: " + CAL_LINK + " — takes 2 min to book. No pressure at all." },
    { day:5, channel:"Email", message:"Hey [Name], I put together a quick breakdown of what Mercy would look like for [BUSINESS NAME] — call flow, booking logic, the works. Want me to send it over before the demo?" },
  ],
  "Demo Booked":[
    { day:-1, channel:"Text", message:"Hey [Name] — just confirming our Mercy demo tomorrow! You'll actually hear her answer a live call. See you then 🎙️" },
    { day:1, channel:"Email", message:"Hey [Name] — great connecting today! Here's a quick recap of what we covered and the next steps to get Mercy set up for [BUSINESS NAME]." },
    { day:3, channel:"Email", message:"Hey [Name], following up post-demo. Any questions after sitting on it? I can also put together a custom proposal for [BUSINESS NAME] if that helps the decision." },
  ]
};
const HOUSTON_ZIPS = ["77002","77004","77006","77007","77008","77018","77019","77024","77025","77027","77030","77035","77040","77055","77056","77057","77062","77063","77064","77070","77077","77079","77080","77084","77090","77095","77096","77098","77099","77338","77345","77346","77373","77375","77379","77380","77381","77382","77384","77385","77386","77388","77389","77396","77401","77406","77407","77429","77433","77449","77450","77459","77469","77477","77478","77479","77493","77494","77498","77503","77504","77546","77573","77578","77581","77584","77586","77587","77598"];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const IS = { width:"100%", padding:"10px 12px", background:"#0d1117", border:"1px solid #1e293b", borderRadius:6, color:"#e2e8f0", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };
const LS = { display:"block", fontSize:10, color:"#6b7280", letterSpacing:2, fontWeight:700, marginBottom:6, fontFamily:"'Space Mono',monospace" };
const BS = { padding:"8px 16px", border:"1px solid #1e293b", borderRadius:4, background:"transparent", color:"#9ca3af", cursor:"pointer", fontSize:11, fontWeight:700, letterSpacing:1.5, fontFamily:"'Space Mono',monospace" };
const CS = { background:"#0d1117", border:"1px solid #1e293b", borderRadius:10, padding:20 };
const SL = { fontSize:10, color:"#6b7280", letterSpacing:2, fontWeight:700, marginBottom:12, fontFamily:"'Space Mono',monospace", display:"block" };

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function CopyBtn({ text, label="COPY" }) {
  const [cp, setCp] = useState(false);
  return <button onClick={() => { navigator.clipboard.writeText(text); setCp(true); setTimeout(()=>setCp(false),2000); }} style={{ padding:"6px 14px", border:`1px solid ${cp?"#00d4ff":"#00d4ff40"}`, borderRadius:4, background:cp?"#00d4ff20":"transparent", color:cp?"#00d4ff":"#6b7280", cursor:"pointer", fontSize:11, fontFamily:"'Space Mono',monospace", fontWeight:700, transition:"all 0.2s" }}>{cp?"✓ COPIED":label}</button>;
}
function TBtn({ label, active, onClick }) {
  return <button onClick={onClick} style={{ padding:"11px 15px", border:"none", cursor:"pointer", background:active?"#00d4ff10":"transparent", borderBottom:active?"2px solid #00d4ff":"2px solid transparent", color:active?"#00d4ff":"#6b7280", fontSize:10, fontWeight:700, letterSpacing:1.2, fontFamily:"'Space Mono',monospace", transition:"all 0.2s", whiteSpace:"nowrap" }}>{label}</button>;
}
function StatCard({ label, value, color="#00d4ff", sub }) {
  return <div style={{ ...CS, textAlign:"center" }}><div style={{ fontSize:26, fontWeight:800, color, fontFamily:"'Space Mono',monospace", lineHeight:1 }}>{value}</div>{sub&&<div style={{ fontSize:10, color:"#6b7280", marginTop:3 }}>{sub}</div>}<div style={{ fontSize:9, color:"#4b5563", letterSpacing:2, marginTop:8, fontFamily:"'Space Mono',monospace" }}>{label}</div></div>;
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ leads }) {
  const closed = leads.filter(l=>l.status==="Closed").length;
  const demos = leads.filter(l=>l.status==="Demo Booked").length;
  const active = leads.filter(l=>!["Closed","Not Interested"].includes(l.status)).length;
  const mrr = closed * 397;
  const cr = leads.length ? Math.round((closed/leads.length)*100) : 0;
  const pipeline = STATUSES.filter(s=>s!=="Not Interested").map(s=>({ status:s, count:leads.filter(l=>l.status===s).length, color:STATUS_COLORS[s] }));
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:24 }}>
        <StatCard label="TOTAL LEADS" value={leads.length} color="#00d4ff" />
        <StatCard label="ACTIVE PIPELINE" value={active} color="#a78bfa" />
        <StatCard label="DEMOS BOOKED" value={demos} color="#34d399" />
        <StatCard label="CLOSED CLIENTS" value={closed} color="#10b981" />
        <StatCard label="EST. MRR" value={`$${mrr.toLocaleString()}`} color="#f59e0b" sub="@ avg $397/mo" />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        <div style={CS}>
          <span style={SL}>PIPELINE BREAKDOWN</span>
          {pipeline.map(p=>(
            <div key={p.status} style={{ marginBottom:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:12, color:p.color, fontWeight:700 }}>{p.status}</span>
                <span style={{ fontSize:12, color:"#6b7280", fontFamily:"'Space Mono',monospace" }}>{p.count}</span>
              </div>
              <div style={{ height:5, background:"#1e293b", borderRadius:3 }}>
                <div style={{ height:5, borderRadius:3, background:p.color, width:`${leads.length?(p.count/leads.length)*100:0}%`, transition:"width 0.6s", boxShadow:`0 0 8px ${p.color}60` }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid #1e293b", display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontSize:11, color:"#6b7280", fontFamily:"'Space Mono',monospace" }}>CLOSE RATE</span>
            <span style={{ fontSize:14, fontWeight:800, color:cr>=20?"#10b981":"#f59e0b", fontFamily:"'Space Mono',monospace" }}>{cr}%</span>
          </div>
        </div>
        <div style={CS}>
          <span style={SL}>RECENT ACTIVITY</span>
          {[...leads].reverse().slice(0,5).map(l=>(
            <div key={l.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid #0f172a" }}>
              <div><div style={{ fontSize:13, color:"#e2e8f0", fontWeight:600 }}>{l.name}</div><div style={{ fontSize:11, color:"#6b7280" }}>{l.category}</div></div>
              <span style={{ fontSize:10, padding:"3px 10px", borderRadius:20, color:STATUS_COLORS[l.status], background:`${STATUS_COLORS[l.status]}15`, border:`1px solid ${STATUS_COLORS[l.status]}40`, fontFamily:"'Space Mono',monospace", fontWeight:700 }}>{l.status}</span>
            </div>
          ))}
          {leads.length===0&&<div style={{ color:"#374151", fontSize:13 }}>No leads yet. Add your first lead in the Pipeline tab.</div>}
          <div style={{ marginTop:14, padding:12, background:"#080b12", borderRadius:8, border:"1px solid #1e293b" }}>
            <div style={{ fontSize:10, color:"#6b7280", letterSpacing:2, fontFamily:"'Space Mono',monospace", marginBottom:4 }}>$8K MRR TARGET</div>
            <div style={{ fontSize:12, color:"#e2e8f0" }}>Need <span style={{ color:"#00d4ff", fontWeight:700 }}>{Math.max(0,20-closed)} more clients</span> to hit milestone</div>
            <div style={{ height:5, background:"#1e293b", borderRadius:3, marginTop:8 }}>
              <div style={{ height:5, borderRadius:3, background:"linear-gradient(90deg,#00d4ff,#10b981)", width:`${Math.min(100,(closed/20)*100)}%`, transition:"width 0.6s" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAPS GUIDE ───────────────────────────────────────────────────────────────
function MapsGuide() {
  const [cat, setCat] = useState(0);
  const [copied, setCopied] = useState(null);
  const cur = MAPS_SEARCHES[cat];
  const copyQ = (q,i) => { navigator.clipboard.writeText(q); setCopied(i); setTimeout(()=>setCopied(null),2000); };
  const steps = [
    { icon:"🗺", t:"Open Google Maps", d:"maps.google.com — use desktop for full filtering options." },
    { icon:"🔍", t:"Enter Search Query", d:"Use the exact queries on the right. Append a Houston zip code for hyperlocal targeting." },
    { icon:"⭐", t:"Sort by Rating ASC", d:"Click 'Sort' → 'Rating (low to high)' — surfaces struggling businesses first." },
    { icon:"📋", t:"Inspect Each Listing", d:"Check: review count, last review date, website link, hours listed, photos, owner responses." },
    { icon:"🎯", t:"Score the Lead", d:"Open Lead Scorer tab, check what's missing. Score 40+ = contact today." },
    { icon:"✉", t:"Log & Outreach", d:"Add to Pipeline tab, generate message in Outreach tab, send within the hour." },
  ];
  return (
    <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:22 }}>
      <div>
        <span style={SL}>CONTRACTOR NICHES</span>
        {MAPS_SEARCHES.map((m,i)=>(
          <button key={i} onClick={()=>setCat(i)} style={{ width:"100%", textAlign:"left", padding:"10px 14px", border:"none", borderRadius:6, cursor:"pointer", marginBottom:4, background:cat===i?"#00d4ff15":"transparent", borderLeft:`3px solid ${cat===i?"#00d4ff":"transparent"}`, color:cat===i?"#00d4ff":"#9ca3af", fontSize:13, fontWeight:cat===i?700:400 }}>{m.category}</button>
        ))}
      </div>
      <div>
        <div style={{ ...CS, marginBottom:18 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div style={{ fontSize:17, fontWeight:800, color:"#e2e8f0" }}>{cur.category}</div>
            <div style={{ fontSize:11, color:"#f59e0b", background:"#f59e0b15", border:"1px solid #f59e0b40", padding:"4px 10px", borderRadius:4, fontFamily:"'Space Mono',monospace" }}>AVG JOB: ${(AVG_JOB_VALUES[cur.category]||0).toLocaleString()}</div>
          </div>
          <span style={SL}>PASTE THESE INTO GOOGLE MAPS</span>
          {cur.queries.map((q,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px", background:"#080b12", borderRadius:6, marginBottom:7, border:"1px solid #1e293b" }}>
              <code style={{ fontSize:13, color:"#94a3b8" }}>{q}</code>
              <button onClick={()=>copyQ(q,i)} style={{ ...BS, padding:"4px 12px", fontSize:10, flexShrink:0 }}>{copied===i?"✓ COPIED":"COPY"}</button>
            </div>
          ))}
          <div style={{ marginTop:12, padding:"11px 15px", background:"#f59e0b0d", border:"1px solid #f59e0b30", borderRadius:8 }}>
            <span style={{ fontSize:11, color:"#f59e0b", fontWeight:700, fontFamily:"'Space Mono',monospace" }}>⚡ PRO TIP: </span>
            <span style={{ fontSize:12, color:"#94a3b8" }}>{cur.signal}</span>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
          <div style={CS}>
            <span style={SL}>6-STEP PROCESS</span>
            {steps.map((s,i)=>(
              <div key={i} style={{ display:"flex", gap:11, marginBottom:11, alignItems:"flex-start" }}>
                <div style={{ fontSize:16, flexShrink:0 }}>{s.icon}</div>
                <div><div style={{ fontSize:12, fontWeight:700, color:"#e2e8f0", marginBottom:2 }}>{s.t}</div><div style={{ fontSize:11, color:"#6b7280", lineHeight:1.5 }}>{s.d}</div></div>
              </div>
            ))}
          </div>
          <div style={CS}>
            <span style={SL}>HOUSTON HOT ZIP CODES</span>
            <div style={{ fontSize:11, color:"#6b7280", marginBottom:10, lineHeight:1.6 }}>Append to search query for hyperlocal targeting. Click any zip to copy.</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {HOUSTON_ZIPS.slice(0,30).map(z=>(
                <span key={z} onClick={()=>navigator.clipboard.writeText(z)} style={{ fontSize:10, padding:"3px 8px", background:"#080b12", border:"1px solid #1e293b", borderRadius:4, color:"#6b7280", cursor:"pointer", fontFamily:"'Space Mono',monospace" }} title="Click to copy">{z}</span>
              ))}
              <span style={{ fontSize:10, color:"#374151", padding:"3px 8px" }}>+{HOUSTON_ZIPS.length-30} more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── REVENUE CALCULATOR ───────────────────────────────────────────────────────
function RevenueCalculator() {
  const [category, setCategory] = useState("HVAC");
  const [callsPerDay, setCpd] = useState(15);
  const [missRate, setMr] = useState(62);
  const [closeRate, setCr] = useState(30);
  const [jobValue, setJv] = useState(850);
  const [fee, setFee] = useState(397);
  useEffect(()=>{ if(AVG_JOB_VALUES[category]) setJv(AVG_JOB_VALUES[category]); },[category]);
  const missDay = Math.round(callsPerDay*(missRate/100));
  const missMo = missDay*22;
  const jobsLost = Math.round(missMo*(closeRate/100));
  const revLostMo = jobsLost*jobValue;
  const revLostYr = revLostMo*12;
  const roi = fee>0?revLostMo/fee:0;
  const payback = revLostMo>0?Math.round(fee/(revLostMo/30)):0;
  const fmt = n => n.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});
  const pitch = `Based on your numbers, ${category} businesses in your area receive about ${callsPerDay} calls a day and miss roughly ${missRate}% of them. That's ${missMo} missed calls a month. Even at a conservative ${closeRate}% close rate, you're walking away from ${fmt(revLostMo)} every single month — ${fmt(revLostYr)} a year. Mercy runs at $${fee}/month. That's a ${Math.round(roi)}x return on the first job she captures.`;
  const sliders = [
    { label:"Inbound Calls Per Day", val:callsPerDay, set:setCpd, min:1, max:100 },
    { label:"Estimated Miss Rate (%)", val:missRate, set:setMr, min:10, max:95 },
    { label:"Lead-to-Job Close Rate (%)", val:closeRate, set:setCr, min:5, max:80 },
    { label:"Average Job Value ($)", val:jobValue, set:setJv, min:100, max:50000 },
    { label:"Mercy Monthly Fee ($)", val:fee, set:setFee, min:197, max:997 },
  ];
  return (
    <div style={{ display:"grid", gridTemplateColumns:"360px 1fr", gap:22 }}>
      <div style={CS}>
        <span style={SL}>BUSINESS INPUTS</span>
        <div style={{ marginBottom:14 }}>
          <label style={LS}>Contractor Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} style={IS}>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select>
        </div>
        {sliders.map(s=>(
          <div key={s.label} style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <label style={{ ...LS, marginBottom:0 }}>{s.label}</label>
              <span style={{ fontSize:13, fontWeight:700, color:"#00d4ff", fontFamily:"'Space Mono',monospace" }}>{s.label.includes("$")?fmt(s.val):s.val}{s.label.includes("%")?"%":""}</span>
            </div>
            <input type="range" min={s.min} max={s.max} value={s.val} onChange={e=>s.set(Number(e.target.value))} style={{ width:"100%", accentColor:"#00d4ff", cursor:"pointer" }} />
            <input type="number" value={s.val} onChange={e=>s.set(Number(e.target.value))} style={{ ...IS, marginTop:5, padding:"6px 10px" }} />
          </div>
        ))}
      </div>
      <div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:16 }}>
          {[
            { label:"MISSED CALLS/MO", val:missMo, sub:`${missDay}/day × 22 workdays`, color:"#ef4444" },
            { label:"JOBS LOST/MO", val:jobsLost, sub:`At ${closeRate}% close rate`, color:"#f59e0b" },
            { label:"REVENUE LOST/MO", val:fmt(revLostMo), sub:fmt(revLostYr)+"/year", color:"#ef4444" },
          ].map(c=>(
            <div key={c.label} style={{ ...CS, borderColor:c.color+"40" }}>
              <span style={{ ...SL, color:c.color }}>{c.label}</span>
              <div style={{ fontSize:28, fontWeight:800, color:c.color, fontFamily:"'Space Mono',monospace" }}>{c.val}</div>
              <div style={{ fontSize:11, color:"#6b7280", marginTop:4 }}>{c.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
          {[
            { label:"MERCY ROI", val:`${Math.round(roi)}x`, sub:"Return per $1 spent", color:"#10b981" },
            { label:"PAYBACK PERIOD", val:`${payback}d`, sub:"Days until Mercy pays for herself", color:"#10b981" },
          ].map(c=>(
            <div key={c.label} style={{ ...CS, borderColor:c.color+"40", background:c.color+"08" }}>
              <span style={{ ...SL, color:c.color }}>{c.label}</span>
              <div style={{ fontSize:34, fontWeight:800, color:c.color, fontFamily:"'Space Mono',monospace" }}>{c.val}</div>
              <div style={{ fontSize:12, color:"#6b7280", marginTop:4 }}>{c.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ ...CS, borderColor:"#00d4ff30" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={SL}>📋 USE THIS PITCH SNIPPET ON THE CALL</span>
            <CopyBtn text={pitch} />
          </div>
          <div style={{ fontSize:13, color:"#94a3b8", lineHeight:1.9, fontStyle:"italic", background:"#080b12", padding:15, borderRadius:8, border:"1px solid #1e293b" }}>"{pitch}"</div>
          <div style={{ marginTop:10, fontSize:11, color:"#6b7280" }}>💡 Adjust sliders to match what the prospect tells you, then read this back verbatim during the pitch.</div>
        </div>
      </div>
    </div>
  );
}

// ─── LEAD SCORER ──────────────────────────────────────────────────────────────
function LeadScorer() {
  const [checks, setChecks] = useState({});
  const [biz, setBiz] = useState(""); const [cat, setCat] = useState(""); const [rev, setRev] = useState("");
  const score = CRITERIA_CHECKS.reduce((a,c)=>checks[c.id]?a+c.weight:a,0);
  const color = score>=70?"#10b981":score>=40?"#f59e0b":"#ef4444";
  const lbl = score>=70?"HOT LEAD":score>=40?"WARM LEAD":"COLD LEAD";
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22 }}>
      <div>
        <div style={{ marginBottom:14 }}><label style={LS}>Business Name</label><input value={biz} onChange={e=>setBiz(e.target.value)} placeholder="e.g. Houston Pro Plumbing" style={IS} /></div>
        <div style={{ marginBottom:14 }}><label style={LS}>Category</label><select value={cat} onChange={e=>setCat(e.target.value)} style={IS}><option value="">Select...</option>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></div>
        <div style={{ marginBottom:18 }}><label style={LS}>Current Review Count</label><input value={rev} onChange={e=>setRev(e.target.value)} placeholder="e.g. 12" type="number" style={IS} /></div>
        <div style={{ borderTop:"1px solid #1e293b", paddingTop:18 }}>
          <span style={SL}>QUALIFICATION CRITERIA</span>
          {CRITERIA_CHECKS.map(c=>(
            <label key={c.id} style={{ display:"flex", alignItems:"flex-start", gap:11, marginBottom:13, cursor:"pointer" }}>
              <div onClick={()=>setChecks(p=>({...p,[c.id]:!p[c.id]}))} style={{ width:18, height:18, borderRadius:3, flexShrink:0, marginTop:2, border:`2px solid ${checks[c.id]?"#00d4ff":"#374151"}`, background:checks[c.id]?"#00d4ff":"transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}>
                {checks[c.id]&&<span style={{ color:"#0a0a0f", fontSize:11, fontWeight:900 }}>✓</span>}
              </div>
              <div><div style={{ color:"#e2e8f0", fontSize:13, fontWeight:600 }}>{c.label}</div><div style={{ color:"#6b7280", fontSize:11, marginTop:2 }}>{c.tip} · +{c.weight}pts</div></div>
            </label>
          ))}
        </div>
      </div>
      <div>
        <div style={{ textAlign:"center", padding:22 }}>
          <div style={{ width:130, height:130, borderRadius:"50%", border:`6px solid ${color}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", boxShadow:`0 0 40px ${color}40`, transition:"all 0.4s" }}>
            <span style={{ fontSize:36, fontWeight:800, color, fontFamily:"'Space Mono',monospace" }}>{score}</span>
            <span style={{ fontSize:10, color:"#9ca3af", letterSpacing:1 }}>/ 100</span>
          </div>
          <div style={{ display:"inline-block", padding:"4px 16px", background:`${color}20`, border:`1px solid ${color}`, borderRadius:4, fontSize:11, fontWeight:700, color, letterSpacing:2, fontFamily:"'Space Mono',monospace" }}>{lbl}</div>
        </div>
        <div style={CS}>
          <span style={SL}>LEAD SUMMARY</span>
          {biz&&<div style={{ color:"#e2e8f0", fontSize:15, fontWeight:700, marginBottom:4 }}>{biz}</div>}
          {cat&&<div style={{ color:"#6b7280", fontSize:12, marginBottom:10 }}>{cat} · Houston, TX · Avg job: ${(AVG_JOB_VALUES[cat]||0).toLocaleString()}</div>}
          {rev&&<div style={{ padding:"8px 12px", borderRadius:6, marginBottom:10, background:parseInt(rev)<30?"#ef444420":"#10b98120", border:`1px solid ${parseInt(rev)<30?"#ef4444":"#10b981"}40`, color:parseInt(rev)<30?"#ef4444":"#10b981", fontSize:12 }}>{rev} reviews — {parseInt(rev)<30?"⚠ Below threshold. Prime target.":"Above threshold."}</div>}
          <div style={{ fontSize:12, color:"#94a3b8", lineHeight:1.7, marginTop:8 }}>
            {score>=70&&"✦ Priority outreach. Contact within 24 hours. High conversion probability."}
            {score>=40&&score<70&&"✦ Qualified lead. Worth contacting. May need more education on AI value."}
            {score<40&&"✦ Low signal. Skip or revisit in 30 days. Move to next prospect."}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PIPELINE ─────────────────────────────────────────────────────────────────
function Pipeline({ leads, setLeads }) {
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [nl, setNl] = useState({ name:"", category:"", reviews:"", status:"New Lead", notes:"", score:0 });
  const [filter, setFilter] = useState("All");
  const exportCSV = () => {
    const h = ["Business","Category","Reviews","Score","Status","Contacted","Notes"];
    const r = leads.map(l=>[l.name,l.category,l.reviews,l.score,l.status,l.contacted,`"${l.notes}"`]);
    const csv = [h,...r].map(x=>x.join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv],{type:"text/csv"})); a.download="mercy-leads.csv"; a.click();
  };
  const add = () => { setLeads(p=>[...p,{...nl,id:Date.now(),contacted:new Date().toISOString().split("T")[0]}]); setNl({name:"",category:"",reviews:"",status:"New Lead",notes:"",score:0}); setShowAdd(false); };
  const filtered = filter==="All"?leads:leads.filter(l=>l.status===filter);
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, flexWrap:"wrap", gap:8 }}>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
          {["All",...STATUSES].map(s=>(
            <button key={s} onClick={()=>setFilter(s)} style={{ ...BS, padding:"5px 11px", fontSize:10, color:filter===s?(STATUS_COLORS[s]||"#00d4ff"):"#6b7280", borderColor:filter===s?`${STATUS_COLORS[s]||"#00d4ff"}60`:"#1e293b", background:filter===s?`${STATUS_COLORS[s]||"#00d4ff"}15`:"transparent" }}>{s}{s!=="All"&&` (${leads.filter(l=>l.status===s).length})`}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={()=>setShowAdd(true)} style={{ ...BS, color:"#00d4ff", borderColor:"#00d4ff40" }}>+ ADD LEAD</button>
          <button onClick={exportCSV} style={BS}>↓ CSV</button>
        </div>
      </div>
      {showAdd&&(
        <div style={{ ...CS, marginBottom:14, borderColor:"#00d4ff30" }}>
          <span style={{ ...SL, color:"#00d4ff" }}>NEW LEAD</span>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:9, marginBottom:9 }}>
            <input placeholder="Business Name" value={nl.name} onChange={e=>setNl(p=>({...p,name:e.target.value}))} style={IS} />
            <select value={nl.category} onChange={e=>setNl(p=>({...p,category:e.target.value}))} style={IS}><option value="">Category</option>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select>
            <input placeholder="Reviews" type="number" value={nl.reviews} onChange={e=>setNl(p=>({...p,reviews:e.target.value}))} style={IS} />
            <input placeholder="Score (0-100)" type="number" value={nl.score} onChange={e=>setNl(p=>({...p,score:e.target.value}))} style={IS} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:9, marginBottom:9 }}>
            <select value={nl.status} onChange={e=>setNl(p=>({...p,status:e.target.value}))} style={IS}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select>
            <input placeholder="Notes" value={nl.notes} onChange={e=>setNl(p=>({...p,notes:e.target.value}))} style={IS} />
          </div>
          <div style={{ display:"flex", gap:8 }}><button onClick={add} style={{ ...BS, color:"#10b981", borderColor:"#10b98140" }}>SAVE</button><button onClick={()=>setShowAdd(false)} style={BS}>CANCEL</button></div>
        </div>
      )}
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr>{["Business","Category","Reviews","Score","Status","Contacted","Notes",""].map(h=><th key={h} style={{ textAlign:"left", padding:"8px 12px", fontSize:10, color:"#6b7280", letterSpacing:2, fontWeight:700, borderBottom:"1px solid #1e293b", fontFamily:"'Space Mono',monospace" }}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(l=>(
              <tr key={l.id} style={{ borderBottom:"1px solid #0d1117" }}>
                <td style={{ padding:"12px", color:"#e2e8f0", fontSize:13, fontWeight:600 }}>{l.name}</td>
                <td style={{ padding:"12px", color:"#6b7280", fontSize:12 }}>{l.category}</td>
                <td style={{ padding:"12px", color:l.reviews<30?"#ef4444":"#10b981", fontSize:12, fontFamily:"'Space Mono',monospace" }}>{l.reviews}</td>
                <td style={{ padding:"12px", color:l.score>=70?"#10b981":l.score>=40?"#f59e0b":"#6b7280", fontSize:12, fontWeight:700, fontFamily:"'Space Mono',monospace" }}>{l.score}</td>
                <td style={{ padding:"12px" }}>{editing===l.id?<select value={l.status} onChange={e=>setLeads(p=>p.map(x=>x.id===l.id?{...x,status:e.target.value}:x))} style={{ ...IS, padding:"4px 8px", fontSize:11 }}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select>:<span style={{ fontSize:10, padding:"3px 10px", borderRadius:20, color:STATUS_COLORS[l.status], background:`${STATUS_COLORS[l.status]}15`, border:`1px solid ${STATUS_COLORS[l.status]}40`, fontFamily:"'Space Mono',monospace", fontWeight:700 }}>{l.status}</span>}</td>
                <td style={{ padding:"12px", color:"#6b7280", fontSize:12 }}>{l.contacted}</td>
                <td style={{ padding:"12px", color:"#6b7280", fontSize:12, maxWidth:160 }}>{editing===l.id?<input defaultValue={l.notes} onBlur={e=>setLeads(p=>p.map(x=>x.id===l.id?{...x,notes:e.target.value}:x))} style={{ ...IS, padding:"4px 8px", fontSize:11 }} />:l.notes}</td>
                <td style={{ padding:"12px" }}><button onClick={()=>setEditing(editing===l.id?null:l.id)} style={{ ...BS, padding:"4px 10px", fontSize:10 }}>{editing===l.id?"DONE":"EDIT"}</button></td>
              </tr>
            ))}
            {filtered.length===0&&<tr><td colSpan={8} style={{ padding:32, textAlign:"center", color:"#374151", fontSize:13 }}>No leads matching this filter.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── OUTREACH GENERATOR ───────────────────────────────────────────────────────
function OutreachGen() {
  const [biz,setBiz]=useState(""); const [owner,setOwner]=useState(""); const [cat,setCat]=useState(""); const [pain,setPain]=useState("");
  const [mode,setMode]=useState("email"); const [out,setOut]=useState(""); const [loading,setLoading]=useState(false);
  const gen = async () => {
    if(!biz||!cat) return; setLoading(true); setOut("");
    try {
      const prompt = mode==="email"
        ? `Write a cold outreach EMAIL for a local ${cat} business called "${biz}" in Houston, TX${owner?` (owner: ${owner})`:""}.  Pain point: ${pain||"missing calls, no AI receptionist"}. From Donatus at Mercy Speaks Digital LLC. We deploy Mercy — an AI receptionist answering calls 24/7, qualifying leads, booking appointments. Tone: direct, confident, not salesy. Under 150 words. Include subject line. Soft CTA toward a 20-min demo. Reference "demo link" without including the actual URL.`
        : `Write a short cold DM under 80 words for ${cat} business "${biz}" in Houston${owner?` (owner: ${owner})`:""}.  Pain: ${pain||"missing calls"}. From Donatus at Mercy Speaks Digital. Mention Mercy AI receptionist. Soft demo CTA. Conversational tone. Suitable for Instagram DM, Facebook Messenger, or Google Maps message.`;
      const r = await fetch("https://api.anthropic.com/v1/messages",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user",content:prompt}] }) });
      const d = await r.json(); setOut(d.content?.[0]?.text||"Error. Try again.");
    } catch { setOut("Connection error. Please try again."); }
    setLoading(false);
  };
  return (
    <div style={{ display:"grid", gridTemplateColumns:"350px 1fr", gap:22 }}>
      <div>
        <div style={{ display:"flex", gap:8, marginBottom:18 }}>
          {["email","dm"].map(m=><button key={m} onClick={()=>setMode(m)} style={{ padding:"8px 20px", border:`1px solid ${mode===m?"#00d4ff":"#1e293b"}`, borderRadius:4, background:mode===m?"#00d4ff15":"transparent", color:mode===m?"#00d4ff":"#6b7280", cursor:"pointer", fontSize:11, fontWeight:700, letterSpacing:2, fontFamily:"'Space Mono',monospace" }}>{m.toUpperCase()}</button>)}
        </div>
        <div style={{ marginBottom:12 }}><label style={LS}>Business Name *</label><input value={biz} onChange={e=>setBiz(e.target.value)} placeholder="e.g. Ace Roofing Houston" style={IS} /></div>
        <div style={{ marginBottom:12 }}><label style={LS}>Owner Name (optional)</label><input value={owner} onChange={e=>setOwner(e.target.value)} placeholder="e.g. Mike" style={IS} /></div>
        <div style={{ marginBottom:12 }}><label style={LS}>Category *</label><select value={cat} onChange={e=>setCat(e.target.value)} style={IS}><option value="">Select...</option>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></div>
        <div style={{ marginBottom:18 }}><label style={LS}>Specific Pain Point (optional)</label><input value={pain} onChange={e=>setPain(e.target.value)} placeholder="e.g. only 8 reviews, no website" style={IS} /></div>
        <button onClick={gen} disabled={loading||!biz||!cat} style={{ width:"100%", padding:"13px", border:"none", borderRadius:6, background:loading||!biz||!cat?"#1e293b":"linear-gradient(135deg,#00d4ff,#0ea5e9)", color:loading||!biz||!cat?"#6b7280":"#0a0a0f", fontSize:12, fontWeight:800, letterSpacing:2, cursor:loading?"wait":"pointer", fontFamily:"'Space Mono',monospace" }}>{loading?"AI WRITING...":mode==="email"?"GENERATE EMAIL":"GENERATE DM"}</button>
      </div>
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:11 }}>
          <span style={SL}>GENERATED {mode.toUpperCase()}</span>
          {out&&<CopyBtn text={out} />}
        </div>
        <div style={{ background:"#0d1117", border:"1px solid #1e293b", borderRadius:8, padding:16, minHeight:320, fontSize:13, color:"#e2e8f0", lineHeight:1.8, whiteSpace:"pre-wrap" }}>
          {loading?<span style={{ color:"#6b7280" }}>Generating personalized outreach...</span>:out||<span style={{ color:"#374151" }}>Fill in the fields and click Generate. AI writes a personalized message using Mercy's value proposition.</span>}
        </div>
      </div>
    </div>
  );
}

// ─── PITCH SCRIPT ─────────────────────────────────────────────────────────────
function PitchScript() {
  const [step,setStep]=useState(1); const [view,setView]=useState("steps"); const [obj,setObj]=useState(null);
  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:22 }}>
        {["steps","objections"].map(v=><button key={v} onClick={()=>setView(v)} style={{ padding:"8px 20px", border:`1px solid ${view===v?"#00d4ff":"#1e293b"}`, borderRadius:4, background:view===v?"#00d4ff15":"transparent", color:view===v?"#00d4ff":"#6b7280", cursor:"pointer", fontSize:11, fontWeight:700, letterSpacing:2, fontFamily:"'Space Mono',monospace" }}>{v==="steps"?"CALL SCRIPT":"OBJECTION HANDLER"}</button>)}
      </div>
      {view==="steps"&&(
        <div style={{ display:"grid", gridTemplateColumns:"190px 1fr", gap:22 }}>
          <div>{AUDIT_STEPS.map(s=><button key={s.step} onClick={()=>setStep(s.step)} style={{ width:"100%", textAlign:"left", padding:"10px 14px", border:"none", borderRadius:6, cursor:"pointer", marginBottom:5, background:step===s.step?"#00d4ff15":"transparent", borderLeft:`3px solid ${step===s.step?"#00d4ff":"transparent"}`, color:step===s.step?"#00d4ff":"#6b7280", fontSize:12, fontWeight:step===s.step?700:400 }}><div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, marginBottom:2 }}>STEP {s.step}</div>{s.title}</button>)}</div>
          <div>{AUDIT_STEPS.filter(s=>s.step===step).map(s=>(
            <div key={s.step}>
              <div style={{ fontSize:11, color:"#00d4ff", letterSpacing:2, fontWeight:700, marginBottom:10, fontFamily:"'Space Mono',monospace" }}>STEP {s.step} — {s.title.toUpperCase()}</div>
              <div style={{ background:"#0d1117", border:"1px solid #1e293b", borderRadius:8, padding:20, fontSize:14, color:"#e2e8f0", lineHeight:1.9, marginBottom:14 }}>{s.script}</div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <CopyBtn text={s.script} />
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>setStep(Math.max(1,step-1))} disabled={step===1} style={{ ...BS, opacity:step===1?0.3:1 }}>← PREV</button>
                  <button onClick={()=>setStep(Math.min(6,step+1))} disabled={step===6} style={{ ...BS, opacity:step===6?0.3:1 }}>NEXT →</button>
                </div>
              </div>
            </div>
          ))}</div>
        </div>
      )}
      {view==="objections"&&(
        <div>{OBJECTION_HANDLERS.map((o,i)=>(
          <div key={i} style={{ marginBottom:7 }}>
            <button onClick={()=>setObj(obj===i?null:i)} style={{ width:"100%", textAlign:"left", padding:"14px 16px", background:obj===i?"#00d4ff08":"#0d1117", border:`1px solid ${obj===i?"#00d4ff30":"#1e293b"}`, borderRadius:obj===i?"8px 8px 0 0":8, color:"#e2e8f0", cursor:"pointer", fontSize:13, fontWeight:600 }}>
              <span style={{ color:"#ef4444", marginRight:8 }}>⚡</span>"{o.objection}"
            </button>
            {obj===i&&<div style={{ background:"#0d1117", border:"1px solid #00d4ff20", borderTop:"none", borderRadius:"0 0 8px 8px", padding:16 }}><span style={{ ...SL, color:"#00d4ff" }}>YOUR RESPONSE</span><div style={{ color:"#94a3b8", fontSize:13, lineHeight:1.8, marginBottom:12 }}>{o.response}</div><CopyBtn text={o.response} /></div>}
          </div>
        ))}</div>
      )}
    </div>
  );
}

// ─── FOLLOW-UP SCHEDULER ─────────────────────────────────────────────────────
function FollowUp() {
  const [status,setStatus]=useState("Contacted"); const [biz,setBiz]=useState(""); const [owner,setOwner]=useState("");
  const sequences = FOLLOW_UP_SEQUENCES[status]||[];
  const p = msg => msg.replace(/\[Name\]/g,owner||"[Name]").replace(/\[BUSINESS\]/g,biz||"[Business]").replace(/\[BUSINESS NAME\]/g,biz||"[Business Name]").replace(/\[CATEGORY\]/g,"contractor");
  const CC = { "Email":"#00d4ff","Text":"#10b981","DM/Text":"#10b981","Call":"#f59e0b" };
  return (
    <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:22 }}>
      <div style={CS}>
        <span style={SL}>SEQUENCE SETTINGS</span>
        <div style={{ marginBottom:14 }}>
          <span style={SL}>LEAD STATUS STAGE</span>
          {["Contacted","Follow-Up","Demo Booked"].map(s=><button key={s} onClick={()=>setStatus(s)} style={{ display:"block", width:"100%", textAlign:"left", padding:"10px 14px", border:`1px solid ${status===s?STATUS_COLORS[s]+"60":"#1e293b"}`, borderRadius:6, marginBottom:6, background:status===s?`${STATUS_COLORS[s]}15`:"transparent", color:status===s?STATUS_COLORS[s]:"#6b7280", cursor:"pointer", fontSize:12, fontWeight:status===s?700:400 }}><span style={{ marginRight:8 }}>●</span>{s}</button>)}
        </div>
        <div style={{ marginBottom:12 }}><label style={LS}>Owner Name</label><input value={owner} onChange={e=>setOwner(e.target.value)} placeholder="e.g. Mike" style={IS} /></div>
        <div style={{ marginBottom:12 }}><label style={LS}>Business Name</label><input value={biz} onChange={e=>setBiz(e.target.value)} placeholder="e.g. Ace Roofing" style={IS} /></div>
        <div style={{ padding:11, background:"#080b12", borderRadius:8, border:"1px solid #1e293b", fontSize:11, color:"#6b7280", lineHeight:1.6 }}>💡 Select the lead's current status, add their info, and copy each touchpoint in order.</div>
      </div>
      <div>
        <div style={{ fontSize:13, color:"#94a3b8", marginBottom:18, lineHeight:1.6 }}><strong style={{ color:"#e2e8f0" }}>{status}</strong> follow-up sequence — {sequences.length} touchpoints. Send in order with the spacing shown.</div>
        {sequences.map((s,i)=>(
          <div key={i} style={{ display:"flex", gap:14, marginBottom:18 }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div style={{ width:34, height:34, borderRadius:"50%", background:`${CC[s.channel]}20`, border:`2px solid ${CC[s.channel]}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:CC[s.channel], fontFamily:"'Space Mono',monospace", flexShrink:0 }}>{i+1}</div>
              {i<sequences.length-1&&<div style={{ width:2, flex:1, background:"#1e293b", marginTop:4, minHeight:20 }} />}
            </div>
            <div style={{ ...CS, flex:1, padding:15 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:9 }}>
                <div style={{ display:"flex", gap:9, alignItems:"center" }}>
                  <span style={{ fontSize:10, padding:"3px 10px", borderRadius:20, color:CC[s.channel], background:`${CC[s.channel]}15`, border:`1px solid ${CC[s.channel]}40`, fontFamily:"'Space Mono',monospace", fontWeight:700 }}>{s.channel}</span>
                  <span style={{ fontSize:11, color:"#6b7280", fontFamily:"'Space Mono',monospace" }}>{s.day===0?"SAME DAY":s.day<0?`${Math.abs(s.day)} DAY BEFORE`:`DAY +${s.day}`}</span>
                </div>
                <CopyBtn text={p(s.message)} />
              </div>
              <div style={{ fontSize:13, color:"#94a3b8", lineHeight:1.8, background:"#080b12", padding:11, borderRadius:6, border:"1px solid #0f172a" }}>{p(s.message)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DEMO HANDOFF ─────────────────────────────────────────────────────────────
function DemoHandoff() {
  const [biz,setBiz]=useState(""); const [owner,setOwner]=useState(""); const [pain,setPain]=useState(""); const [ch,setCh]=useState("email");
  const email = `Subject: Your Free Mercy AI Demo — Booked & Ready\n\nHi ${owner||"[Name]"},\n\nGreat speaking with you. As promised, here's your link to book a 20-minute live demo of Mercy — our AI receptionist built specifically for contractors like ${biz||"[Business Name]"}.\n\n${pain?`During the demo, I'll show you exactly how Mercy handles the "${pain}" issue you mentioned — live, on the call.`:"During the demo, you'll hear Mercy in action and see exactly how she'd be set up for your business."}\n\n👉 Book your demo here: ${CAL_LINK}\n\nNo commitment. No pressure. Just 20 minutes to see what your phone line could be doing for you around the clock.\n\nTalk soon,\nDonatus\nMercy Speaks Digital LLC\nmercyspeaksdigital.com`;
  const dm = `Hey ${owner||"[Name]"} — great connecting! Here's your free 20-min Mercy demo link: ${CAL_LINK}${pain?` — I'll show live how she handles the "${pain}" situation.`:""} No commitment, just come hear her in action 🎙️`;
  const msg = ch==="email"?email:dm;
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22 }}>
      <div>
        <div style={{ display:"flex", gap:8, marginBottom:18 }}>
          {["email","dm"].map(m=><button key={m} onClick={()=>setCh(m)} style={{ padding:"8px 20px", border:`1px solid ${ch===m?"#00d4ff":"#1e293b"}`, borderRadius:4, background:ch===m?"#00d4ff15":"transparent", color:ch===m?"#00d4ff":"#6b7280", cursor:"pointer", fontSize:11, fontWeight:700, letterSpacing:2, fontFamily:"'Space Mono',monospace" }}>{m.toUpperCase()}</button>)}
        </div>
        {[["Owner Name","e.g. Mike",owner,setOwner],["Business Name","e.g. Ace Roofing",biz,setBiz],["Key Pain Point They Mentioned","e.g. missing weekend calls",pain,setPain]].map(([l,p,v,s])=>(
          <div key={l} style={{ marginBottom:12 }}><label style={LS}>{l}</label><input value={v} onChange={e=>s(e.target.value)} placeholder={p} style={IS} /></div>
        ))}
        <div style={{ background:"#0d1117", border:"1px solid #10b98140", borderRadius:8, padding:13 }}>
          <span style={{ ...SL, color:"#10b981" }}>CAL.COM BOOKING LINK</span>
          <div style={{ fontSize:12, color:"#94a3b8", wordBreak:"break-all", marginBottom:8 }}>{CAL_LINK}</div>
          <CopyBtn text={CAL_LINK} label="COPY LINK" />
        </div>
      </div>
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:11 }}>
          <span style={SL}>HANDOFF MESSAGE</span><CopyBtn text={msg} />
        </div>
        <div style={{ background:"#0d1117", border:"1px solid #1e293b", borderRadius:8, padding:15, minHeight:300, fontSize:13, color:"#e2e8f0", lineHeight:1.9, whiteSpace:"pre-wrap" }}>{msg}</div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS = [
  {label:"⬡ DASHBOARD"},{label:"🗺 MAPS GUIDE"},{label:"◈ CALCULATOR"},
  {label:"◎ LEAD SCORER"},{label:"▦ PIPELINE"},{label:"✦ OUTREACH"},
  {label:"◆ PITCH SCRIPT"},{label:"↻ FOLLOW-UP"},{label:"→ DEMO HANDOFF"}
];

function App() {
  const [tab,setTab] = useState(0);
  const [leads,setLeads] = useState([
    { id:1, name:"Houston Pro Plumbing", category:"Plumbing", reviews:8, status:"New Lead", contacted:"2026-04-22", notes:"No website, 8 reviews", score:85 },
    { id:2, name:"Lone Star HVAC", category:"HVAC", reviews:22, status:"Contacted", contacted:"2026-04-20", notes:"Owner interested, follow up Friday", score:65 },
    { id:3, name:"Texas Best Roofing", category:"Roofing", reviews:6, status:"Demo Booked", contacted:"2026-04-18", notes:"Demo confirmed for Thursday", score:90 },
  ]);
  const closed = leads.filter(l=>l.status==="Closed").length;
  const demos = leads.filter(l=>l.status==="Demo Booked").length;

  return (
    <div style={{ minHeight:"100vh", background:"#080b12", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:"#e2e8f0" }}>
      {/* Header */}
      <div style={{ borderBottom:"1px solid #1e293b", padding:"13px 26px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#0a0d16" }}>
        <div style={{ display:"flex", alignItems:"center", gap:11 }}>
          <div style={{ width:38, height:38, borderRadius:9, background:"linear-gradient(135deg,#00d4ff,#0ea5e9)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:900, color:"#0a0a0f", boxShadow:"0 0 20px #00d4ff40" }}>M</div>
          <div>
            <div style={{ fontSize:13, fontWeight:800, letterSpacing:1.5, color:"#e2e8f0" }}>MERCY SPEAKS DIGITAL</div>
            <div style={{ fontSize:9, color:"#6b7280", letterSpacing:3, fontFamily:"'Space Mono',monospace" }}>PROSPECTING COMMAND CENTER v2</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:18, alignItems:"center" }}>
          <div style={{ fontSize:11, color:"#e2e8f0", fontFamily:"'Space Mono',monospace" }}>
            <span style={{ color:"#10b981", fontWeight:700 }}>{closed}</span> closed · <span style={{ color:"#34d399", fontWeight:700 }}>{demos}</span> demos · <span style={{ color:"#00d4ff", fontWeight:700 }}>{leads.length}</span> total
          </div>
          <div style={{ fontSize:9, color:"#10b981", letterSpacing:2, fontFamily:"'Space Mono',monospace", fontWeight:700, display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#10b981", display:"inline-block", boxShadow:"0 0 6px #10b981" }}></span>
            INTERNAL — AGENCY ONLY
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom:"1px solid #1e293b", padding:"0 26px", display:"flex", background:"#0a0d16", overflowX:"auto" }}>
        {TABS.map((t,i)=><TBtn key={t.label} label={t.label} active={tab===i} onClick={()=>setTab(i)} />)}
      </div>

      {/* Content */}
      <div style={{ padding:"26px 30px", maxWidth:1160, margin:"0 auto" }}>
        {tab===0&&<Dashboard leads={leads} />}
        {tab===1&&<MapsGuide />}
        {tab===2&&<RevenueCalculator />}
        {tab===3&&<LeadScorer />}
        {tab===4&&<Pipeline leads={leads} setLeads={setLeads} />}
        {tab===5&&<OutreachGen />}
        {tab===6&&<PitchScript />}
        {tab===7&&<FollowUp />}
        {tab===8&&<DemoHandoff />}
      </div>
    </div>
  );
}
export default App;
