import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Box, 
  Heart, 
  MessageSquare, 
  ListOrdered, 
  TrendingUp, 
  Calendar, 
  CheckSquare, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Search, 
  Bell, 
  Menu,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  MoreHorizontal,
  Plus,
  Target,
  CheckCircle2,
  Circle,
  Clock,
  Activity,
  AlertCircle,
  BarChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  XCircle,
  Lightbulb,
} from 'lucide-react';

const clientRoutes = {
  "Madhav Solar Energy": "/madhavsolar/dashboard",
  "LetsAskDoctor": "/letsaskdoctor/dashboard",
  "Fabulous Media": "/fabulousmedia/dashboard",
  "Battery Smart": "/batterysmart/dashboard",
  "Workwear Express": "/workwearexpress/dashboard",
  "Step Ahead Workwear": "/stepahead/dashboard",
  "WRTS Gym": "/wrtsgym/dashboard",
  "Bonfit": "/bonfit/dashboard",
  "Puno": "/puno/dashboard",
  "Montra Truck": "/montra/dashboard",
  "Sany": "/sany/dashboard",
  "HeadsUpB2b": "/headsupb2b/dashboard",
  "Tailworld": "/tailworld/dashboard",
  "Blue Energy Motors": "/blueenergymotors/dashboard",
  "InstaGroup": "/instagroup/dashboard",
  "VZY-Tv": "/vzytv/dashboard",
  "McRAYGOR": "/mcraygor/dashboard",
  "MovoDream": "/movodream/dashboard",
  "A2 Bilona Ghee": "/a2bilonaghee/dashboard",
  "Yastudy": "/yastudy/dashboard",
  "Kaizen Technicals": "/kaizen/dashboard",
  "IPL Tech Electric": "/ipltech/dashboard",
  "SID Real Tech": "/sidrealtech/dashboard",
  "MindDhara": "/minddhara/dashboard",
  "Mystery Rooms": "/mysteryrooms/dashboard",
  "Afiway": "/afiway/dashboard",
  "MCI": "/mci/dashboard",
  "Travbeez": "/travebeez/dashboard",
  "Tallento": "/tallento/dashboard",
  "BoxOffice": "/boxoffice/dashboard",
  "DeepHorizon": "/deephorizon/dashboard"
};

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, hasSubmenu }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
      active 
        ? 'text-white shadow-lg' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`}
    style={active ? { backgroundColor: 'var(--primary)', boxShadow: '0 10px 15px -3px rgba(88, 103, 221, 0.1)' } : {}}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'} />
      <span className="font-medium text-[15px]">{label}</span>
    </div>
    {hasSubmenu && <ChevronDown size={16} className={`opacity-50 ${active ? 'text-white' : ''}`} />}
  </button>
);

// --- Dashboard View Component ---

// Illustrative 90-day acquisition model; client approval and baseline validation required.
const planningScenario = {
  enquiries: 300,
  qualifiedShare: 0.4,
  surveyShare: 0.5,
  proposalShare: 0.5,
  winShare: 0.4,
  projectValue: 250000,
  mediaSpend: 300000,
};
const qualifiedTarget = planningScenario.enquiries * planningScenario.qualifiedShare;
const surveyTarget = qualifiedTarget * planningScenario.surveyShare;
const proposalTarget = surveyTarget * planningScenario.proposalShare;
const winTarget = proposalTarget * planningScenario.winShare;
const pipelineTarget = proposalTarget * planningScenario.projectValue;
const revenueScenario = winTarget * planningScenario.projectValue;
const rupees = value => `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)}`;

const DashboardView = () => {
  const navigate = useNavigate();
  const [selectedOverview, setSelectedOverview] = useState('Overview');
  const [mixGroup, setMixGroup] = useState('Objectives');
  const [completion] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('madhavsolarObjectivesData') || 'null');
      const tracks = saved && Array.isArray(saved.coreObjectives) && Array.isArray(saved.strategicKPIs) && Array.isArray(saved.growthMetrics)
        ? [...saved.coreObjectives, ...saved.strategicKPIs, ...saved.growthMetrics] : [];
      if (!tracks.length) return null;
      const values = tracks.map(track => (track.elements || []).reduce((sum, el) =>
        sum + (parseFloat(el.val) || 0) * (parseFloat(el.weight) || 0) / 100, 0));
      return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
    } catch { return null; }
  });
  const score = Math.max(0, Math.min(100, completion || 0));
  const needleAngle = Math.PI * (1 - score / 100);
  const groupMix = {
    Objectives: [['Core', 3], ['Strategic KPIs', 3], ['Growth metrics', 3]],
    Initiatives: [['Infrastructure', 3], ['Data loops', 3], ['Team', 3]],
    Experiments: [['Demand & funnel', 4], ['Content & nurture', 4], ['PR & strategic', 6]],
  }[mixGroup];
  const mixTotal = groupMix.reduce((sum, [, count]) => sum + count, 0);
  const firstStop = groupMix[0][1] / mixTotal * 100;
  const secondStop = (groupMix[0][1] + groupMix[1][1]) / mixTotal * 100;
  const tabContent = {
    Demand: ['Qualified demand today', 'Residential + C&I acquisition: 300 enquiries → 120 qualified leads → 60 surveys → 30 proposals. Proposed 90-day targets; state and segment splits to validate.'],
    Authority: ['Industrial authority tomorrow', 'Proposed proof output: 2 industrial case studies within a 6-case library, plus 12 engineering and leadership posts. Connect authority to technical consultations.'],
    Brand: ['Premium reliability', 'Designed In-House. Installed Right. Supported Long After. Recommended mix: 25% reliability, 20% residential, 20% C&I economics, 15% industrial authority, 10% proof and 10% leadership.'],
    ROI: ['Commercial scenario', '₹3 lakh media spend → 12 modelled wins × ₹2.5 lakh average project value = ₹30 lakh gross project revenue. This is a project-value scenario; profit and ROI require margins and full costs.'],
  };
  const showReport = () => document.getElementById('madhav-report')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
              <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-md bg-white p-2 flex items-center justify-center">
                <img src="https://madhavsolarenergy.com/wp-content/uploads/2023/07/MADHAV-SOLAR-ENERGY-scaled-1.png" alt="Madhav Solar Energy logo" className="w-full h-full object-contain" />
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-tl-xl" style={{ backgroundColor: 'var(--success)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Madhav Solar Energy</h2>
                <p className="text-sm text-slate-600 mb-2">Qualified Residential + C&I demand today. Premium Industrial Solar authority tomorrow.</p>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg inline-block">Growth Panel Dashboard</span>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                  {[
                    { label: 'Qualified Leads', value: qualifiedTarget.toString(), icon: Zap, color: 'var(--success)' },
                    { label: 'Lead-to-Sale', value: `${winTarget / qualifiedTarget * 100}%`, icon: Target, color: 'var(--info)' },
                    { label: 'Project Revenue', value: `₹${revenueScenario / 100000}L`, icon: TrendingUp, color: 'var(--warning)' },
                    { label: 'Proposal Pipeline', value: `₹${pipelineTarget / 100000}L`, icon: ArrowUpRight, color: 'var(--purple)' },
                  ].map(stat => <div key={stat.label} className="flex flex-col px-4 py-2 border border-slate-100 border-dashed rounded-xl bg-slate-50/50 min-w-0"><div className="flex items-center gap-2 mb-1"><stat.icon size={14} style={{ color: stat.color }} /><span className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</span></div><span className="text-xs font-semibold text-slate-500">{stat.label}</span></div>)}
                </div>
                <p className="text-[10px] text-slate-400 mt-3">Illustrative 90-day acquisition targets · actual performance pending</p>
              </div>
            </div>
            <div className="flex border-b border-slate-200 overflow-x-auto" role="tablist" aria-label="Growth overview">
              {['Overview', 'Demand', 'Authority', 'Brand', 'ROI'].map(tab => <button key={tab} role="tab" id={`madhav-tab-${tab}`} aria-selected={selectedOverview === tab} aria-controls="madhav-tab-panel" onClick={() => setSelectedOverview(tab)} className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${selectedOverview === tab ? '' : 'border-transparent text-slate-500 hover:text-slate-800'}`} style={selectedOverview === tab ? { borderBottomColor: 'var(--info)', color: 'var(--info)' } : {}}>{tab}</button>)}
            </div>
          </div>
          <div className="w-full lg:w-72 flex-shrink-0 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-100 text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Growth Score</h3>
            <p className="text-xs text-slate-500 mb-5">Objective readiness · out of 100</p>
            <svg viewBox="0 0 180 104" className="w-40 h-24 mb-2" role="img" aria-label={`Objective readiness: ${score} out of 100`}>
              <path d="M 18 90 A 72 72 0 0 1 162 90" fill="none" stroke="var(--danger)" strokeWidth="16" />
              <line x1="90" y1="90" x2={90 + 68 * Math.cos(needleAngle)} y2={90 - 68 * Math.sin(needleAngle)} stroke="#1e293b" strokeWidth="4" />
              <circle cx="90" cy="90" r="8" fill="#1e293b" />
            </svg>
            <div className="text-4xl font-bold mb-2" style={{ color: 'var(--danger)' }}>{score}</div>
            <p className="text-[10px] text-slate-400 mb-4">{score === 0 ? 'Awaiting objective assessment' : 'Based on your saved tracker progress'}</p>
            <button onClick={showReport} className="w-full py-2 text-white text-sm font-bold rounded-xl transition-colors shadow-lg" style={{ backgroundColor: 'var(--info)' }}>View Report</button>
          </div>
        </div>
      </div>

      <div id="madhav-tab-panel" role="tabpanel" aria-labelledby={`madhav-tab-${selectedOverview}`}>
        {selectedOverview !== 'Overview' && <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"><h3 className="font-bold text-slate-800 mb-3">{tabContent[selectedOverview][0]}</h3><p className="text-sm text-slate-600 leading-relaxed">{tabContent[selectedOverview][1]}</p><button onClick={selectedOverview === 'ROI' ? showReport : () => navigate(selectedOverview === 'Demand' ? '/madhavsolar/objectives' : '/madhavsolar/experiments')} className="text-xs font-bold text-blue-600 mt-4">{selectedOverview === 'ROI' ? 'View scenario assumptions →' : 'Explore the action plan →'}</button></div>}
        {selectedOverview === 'Overview' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            {[
              { label: 'Qualified Leads / 90 Days', value: qualifiedTarget.toString(), detail: 'Target: 120 · 40% of 300 enquiries', color: 'var(--info)' },
              { label: 'Cost per Qualified Lead', value: rupees(planningScenario.mediaSpend / qualifiedTarget), detail: 'Target · ₹3 lakh media scenario', color: 'var(--danger)' },
              { label: 'Qualified → Site Survey', value: `${planningScenario.surveyShare * 100}%`, detail: 'Target: 60 surveys from 120 leads', color: 'var(--success)' },
            ].map(stat => <div key={stat.label} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-3"><div><h4 className="text-slate-500 font-semibold text-sm mb-1">{stat.label}</h4><p className="text-xs text-slate-400">{stat.detail}</p></div><div className="text-2xl font-bold whitespace-nowrap" style={{ color: stat.color }}>{stat.value}</div></div>)}
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col min-h-[270px]">
            <div className="mb-5"><h3 className="font-bold text-slate-800">Daily Leads</h3><p className="text-xs text-slate-400 mt-1">Illustrative weekly pace · 300 enquiries / 90 days</p></div>
            <div className="flex-1 flex items-end justify-between gap-2 min-h-[150px]" role="img" aria-label="Illustrative planned week: Monday 3, Tuesday 4, Wednesday 3, Thursday 4, Friday 3, Saturday 3, Sunday 3 enquiries">
              {[3, 4, 3, 4, 3, 3, 3].map((value, index) => <div key={index} className="flex-1 h-40 flex flex-col justify-end items-center gap-2"><span className="text-[10px] text-slate-400">{value}</span><div title={`${['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][index]}: ${value} planned enquiries`} className="w-full bg-blue-100 hover:bg-blue-300 rounded-t-lg transition-colors" style={{ height: `${value / 5 * 100}%` }} /><span className="text-[10px] text-slate-400">{['M','T','W','T','F','S','S'][index]}</span></div>)}
            </div>
            <p className="text-[10px] text-slate-400 mt-3">Planning illustration; no daily results recorded.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col min-h-[270px]">
            <div className="flex justify-between gap-3 items-start mb-5"><div><h3 className="font-bold text-slate-800">Growth Mix</h3><p className="text-xs text-slate-400 mt-1">Plan tracks by group</p></div><select aria-label="Growth mix group" value={mixGroup} onChange={event => setMixGroup(event.target.value)} className="bg-slate-50 border-none text-xs font-bold text-slate-600 rounded-lg outline-none max-w-[110px]"><option>Objectives</option><option>Initiatives</option><option>Experiments</option></select></div>
            <div className="flex-1 flex items-center justify-center py-2"><div className="w-32 h-32 rounded-full p-3" role="img" aria-label={`${mixGroup}: ${groupMix.map(([label,count]) => `${label} ${count}`).join(', ')}`} style={{ background: `conic-gradient(var(--indigo) 0% ${firstStop}%, var(--warning) ${firstStop}% ${secondStop}%, var(--info) ${secondStop}% 100%)` }}><div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center"><span className="text-xs font-bold text-slate-400">Total</span><span className="text-lg font-bold text-slate-800">{mixTotal}</span></div></div></div>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 mt-4">{groupMix.map(([label,count], index) => <div key={label} className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: ['var(--indigo)','var(--warning)','var(--info)'][index] }} />{label} ({count})</div>)}</div>
          </div>
        </div>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          ['Objectives', 'Qualified demand, premium reliability and geographic expansion.', '9 tracked objectives', '/madhavsolar/objectives'],
          ['Initiatives', 'Tracking, landing journeys, proof library and Sales Head feedback loops.', '9 delivery initiatives', '/madhavsolar/initiatives'],
          ['Experiments', 'Segment search pilots, local proof, conversion, nurture and industrial authority.', '14 proposed experiments', '/madhavsolar/experiments'],
        ].map(([title, detail, count, route]) => <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"><div className="flex justify-between items-center mb-4"><h3 className="font-bold text-slate-800">{title}</h3><span className="text-xs text-slate-400">{count}</span></div><p className="text-sm text-slate-600 leading-relaxed">{detail}</p><button onClick={() => navigate(route)} className="text-xs font-bold text-blue-600 mt-5">Open {title.toLowerCase()} →</button></div>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">The two-engine growth model</h3>
          {[
            ['Revenue today: Residential + C&I', 'Google Search, Meta, local pages and remarketing. Convert electricity-cost intent through assessments, qualification and customer proof.'],
            ['Authority tomorrow: Industrial', 'Engineering content, verified case studies, LinkedIn, SEO and PR. Earn confidence in execution complexity and lifecycle reliability.']
          ].map(([title, desc]) => <div key={title} className="mb-5"><h4 className="text-sm font-bold text-slate-800 mb-2">{title}</h4><p className="text-sm text-slate-600 leading-relaxed">{desc}</p></div>)}
          <div className="p-3 bg-emerald-50 rounded-xl text-sm text-emerald-800 font-semibold">Demand + Trust + Proof + Geography = Growth</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Qualified demand → revenue</h3>
          <div className="flex flex-wrap gap-2 mb-5">{['Intent', 'Segment page', 'Assessment', 'Qualification', 'Sales / survey', 'Proposal', 'Won project', 'Testimonial / referral'].map((step, i) => <span key={step} className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600">{i + 1}. {step}</span>)}</div>
          <p className="text-sm text-slate-600 leading-relaxed">The Sales Head closes the feedback loop: source tagged → contacted → qualified / rejected with reason → survey → proposal → won / lost → revenue.</p>
          <p className="text-xs text-slate-500 mt-4">Track cost per qualified lead, held surveys and meetings, proposal value, lead-to-sale conversion and state-wise revenue.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          ['Maharashtra', 'Residential, SMEs and commercial properties; add industrial clusters after coverage and proof are confirmed.'],
          ['Gujarat', 'Commercial and manufacturing use cases, industrial authority and local residential proof.'],
          ['Madhya Pradesh', 'Validate serviceable cities; test high-intent residential and SME demand before scaling.']
        ].map(([title, detail]) => <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"><h3 className="font-bold text-slate-800 mb-3">{title}</h3><p className="text-sm text-slate-600 leading-relaxed">{detail}</p><p className="text-xs text-amber-700 mt-4">City priorities and local sales capacity to confirm</p></div>)}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-5">90-day proposed sequence</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">{[
          ['Days 1–30 · Foundation', 'Tracking audit, CRM, qualification, messaging, segmented landing pages and proof collection.'],
          ['Days 31–60 · Demand', 'Launch approved Residential + C&I Search, Meta and remarketing pilots in confirmed priority cities.'],
          ['Days 61–90 · Optimisation + authority', 'Use sales feedback, publish verified case studies, expand SEO and industrial leadership, then evaluate geographic scaling.']
        ].map(([title, detail]) => <div key={title}><h4 className="text-sm font-bold text-slate-800 mb-2">{title}</h4><p className="text-sm text-slate-600 leading-relaxed">{detail}</p></div>)}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Reliability as the brand</h3>
          <p className="text-lg font-semibold text-slate-800 mb-2">Designed In-House. Installed Right. Supported Long After.</p>
          <p className="text-sm text-slate-600 mb-4">Premium Solar. Engineered for Long-Term Reliability.</p>
          <div className="space-y-3">{[['Reliability & quality',25],['Residential conversion',20],['C&I economics',20],['Industrial authority',15],['Project proof',10],['Brand leadership',10]].map(([label, share]) => <div key={label} className="flex items-center gap-3 text-xs"><span className="w-36 text-slate-600">{label}</span><div className="flex-1 bg-slate-100 h-2 rounded-full"><div className="h-2 rounded-full" style={{ width: `${share * 4}%`, backgroundColor: 'var(--primary)' }} /></div><span className="w-8 font-bold text-slate-700">{share}%</span></div>)}</div>
          <p className="text-xs text-slate-500 mt-4">Recommended content mix from the client brief.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Client inputs still required</h3>
          <ul className="list-disc pl-4 space-y-3 text-sm text-slate-600">
            <li>Residential / C&I revenue split and state-wise revenue.</li>
            <li>Media spend, current leads, CPL and conversion.</li>
            <li>Sales capacity, lead response time and city priorities.</li>
            <li>Minimum project value, margins and profitable packages.</li>
            <li>Approved projects, imagery, testimonials and service terms.</li>
          </ul>
        </div>
      </div>
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-sm text-slate-600">
        <p className="font-semibold mb-2">Source & scope · 07 October 2026</p>
        <p>Built from the supplied Madhav Solar strategic master note. The website currently leads with industrial positioning; dedicated Residential + C&I journeys should connect that public positioning to the brief’s immediate revenue priorities.</p>
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-blue-700"><a href="https://madhavsolarenergy.com/" target="_blank" rel="noopener noreferrer">Company website ↗</a><a href="https://madhavsolarenergy.com/projects/" target="_blank" rel="noopener noreferrer">Project proof to verify ↗</a><a href="https://madhavsolarenergy.com/contact/" target="_blank" rel="noopener noreferrer">Current assessment journey ↗</a></div>
        <p className="text-xs mt-3">All initiatives are proposed. Percentages on tracker pages represent user-assessed plan completion, not historical performance; numeric growth targets are labelled as illustrative assumptions; actual performance remains pending.</p>
      </div>
      <div id="madhav-report" className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm scroll-mt-6">
        <div className="flex flex-wrap justify-between items-start gap-3 mb-5">
          <div><h3 className="font-bold text-slate-800">The numbers behind the plan</h3><p className="text-xs text-slate-500 mt-2">Illustrative targets for 90 days after campaign launch; sales-cycle timing may push wins into a later period.</p></div>
          <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg">Client validation required</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead><tr className="text-xs text-slate-500 border-b border-slate-200"><th className="py-3 pr-4">Metric</th><th className="py-3 pr-4">Proposed target</th><th className="py-3 pr-4">Assumption / definition</th><th className="py-3">Actual</th></tr></thead>
            <tbody>{[
              ['Enquiries', planningScenario.enquiries.toString(), 'Combined Residential + C&I enquiries'],
              ['Qualified leads', qualifiedTarget.toString(), '40% of enquiries accepted by Sales'],
              ['Site surveys held', surveyTarget.toString(), '50% of qualified leads'],
              ['Proposals', proposalTarget.toString(), '50% of held surveys'],
              ['Won projects', winTarget.toString(), '40% of proposals; 10% of qualified leads'],
              ['Proposal pipeline', rupees(pipelineTarget), '30 proposals × ₹2.5 lakh assumed average value'],
              ['Gross revenue scenario', rupees(revenueScenario), '12 wins × ₹2.5 lakh assumed average value'],
              ['Media budget scenario', rupees(planningScenario.mediaSpend), '₹1 lakh per month for 3 acquisition months; unapproved'],
              ['Cost per enquiry', rupees(planningScenario.mediaSpend / planningScenario.enquiries), 'Media spend ÷ enquiries'],
              ['Cost per qualified lead', rupees(planningScenario.mediaSpend / qualifiedTarget), 'Media spend ÷ qualified leads']
            ].map(([label, value, detail]) => <tr key={label} className="border-b border-slate-100"><td className="py-3 pr-4 font-semibold text-slate-700">{label}</td><td className="py-3 pr-4 font-bold text-blue-700 whitespace-nowrap">{value}</td><td className="py-3 pr-4 text-xs text-slate-500">{detail}</td><td className="py-3 text-xs text-slate-400">Pending</td></tr>)}</tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-4">₹2.5 lakh comes from the brief’s project-value focus. Lead volumes, conversion rates and spend are proposed assumptions. Gross revenue is project value, not profit or ROI; costs, margins and sales-cycle lag must be validated. The first 30 days of foundation work are separate from this full acquisition-period model.</p>
      </div>

    </div>
  );
};

export default function MadhavSolarDashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedClient, setSelectedClient] = useState('Madhav Solar Energy');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const clients = [
    '- Select Client -',
    'Madhav Solar Energy',
    'Fabulous Media',
    'Battery Smart',
    'Workwear Express',
    'Step Ahead Workwear',
    'WRTS Gym',
    'Bonfit',
    'Afiway',
    'A2 Bilona Ghee',
    'MCI',
    'Blue Energy Motors',
    'HeadsUpB2b',
    'InstaGroup',
    'IPL Tech Electric',
    'Kaizen Technicals',
    'LetsAskDoctor',
    'McRAYGOR',
    'MindDhara',
    'Montra Truck',
    'MovoDream',
    'Mystery Rooms',
    'Puno',
    'Sany',
    'SID Real Tech',
    'Tailworld',
    'Tallento',
    'BoxOffice',
    'DeepHorizon',
    'Travbeez',
    'VZY-Tv',
    'Yastudy',
  ];

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans text-slate-900 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-white shadow-xl lg:shadow-none lg:border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="h-20 flex items-center px-8 border-b border-slate-50">
            <button 
              onClick={() => navigate('/home')}
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://grow.gocommercially.com/assets/media/logo/L159551452639.svg"
                alt="GO Growth logo"
                className="w-8 h-8 mr-3 object-contain"
              />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">GO <span style={{ color: 'var(--primary)' }}>Growth</span></span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/madhavsolar/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => navigate('/madhavsolar/objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => navigate('/madhavsolar/initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => navigate('/madhavsolar/experiments')} />
            
            <div className="my-6 border-t border-slate-100 mx-2"></div>
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">KPIs</p>

            <SidebarItem icon={FileText} label="Figures List" active={activeTab === 'Figures'} onClick={() => document.getElementById('madhav-report')?.scrollIntoView({ behavior: 'smooth' })} />
            <SidebarItem icon={Users} label="Client Master" active={activeTab === 'Client'} onClick={() => navigate('/home')} />
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="h-20 bg-white shadow-sm lg:shadow-none lg:border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 hover:bg-slate-100 rounded-lg text-slate-600">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center">
              <h2 className="text-xl font-bold text-slate-800">Overview</h2>
            </div>
          </div>

          <div className="flex items-center gap-6">
             {/* Client Dropdown */}
             <div className="hidden md:flex relative">
               <div className="bg-slate-100 rounded-lg px-3 py-2 min-w-[200px]">
                 <span className="text-xs font-bold text-slate-500 mr-2 uppercase">Client:</span>
                 <button
                   onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                   className="text-sm font-bold text-slate-800 flex items-center gap-1 cursor-pointer w-full justify-between"
                 >
                   <span className="truncate">{selectedClient === 'Madhav Solar Energy' ? 'Madhav Solar Energy' : selectedClient}</span>
                   <ChevronDown size={14} className={`transition-transform ${clientDropdownOpen ? 'rotate-180' : ''}`} />
                 </button>
               </div>
               
               {clientDropdownOpen && (
                 <>
                   <div 
                     className="fixed inset-0 z-10" 
                     onClick={() => setClientDropdownOpen(false)}
                   />
                   <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
                     {clients.map((client, index) => (
                       <button
                         key={index}
                         onClick={() => {
                           if (client !== '- Select Client -') {
                             setSelectedClient(client);
                             const targetRoute = clientRoutes[client];
                             if (targetRoute) navigate(targetRoute);
                           }
                           setClientDropdownOpen(false);
                          }}
                         className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                           selectedClient === client 
                             ? 'bg-slate-100 font-semibold text-slate-900' 
                             : 'text-slate-700'
                         } ${client === '- Select Client -' ? 'text-slate-400 italic' : ''}`}
                       >
                         {client}
                       </button>
                     ))}
                   </div>
                 </>
               )}
             </div>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <img 
                src="https://madhavsolarenergy.com/wp-content/uploads/2023/07/MADHAV-SOLAR-ENERGY-scaled-1.png" 
                alt="Madhav Solar Energy Logo" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-white p-1 object-contain"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto h-full">
            <DashboardView />
          </div>
        </div>
      </main>
    </div>
  );
}

