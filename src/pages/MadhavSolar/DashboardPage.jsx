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

// Proposed targets supplied for planning; actual performance awaits client baseline data.
const growthTargets = [
  ['Qualified Leads / Month', '100–150+', 'Monthly sales-qualified leads'],
  ['Qualified Lead Growth', '35–50%', 'Growth against the confirmed baseline'],
  ['Lead Qualification Rate', '35–45%', 'Qualified leads ÷ total enquiries'],
  ['Landing Page Conversion Rate', '4–6%', 'Enquiries ÷ landing-page visits'],
  ['Lead → Site Survey Rate', '25–35%', 'Held site surveys ÷ leads; confirm the lead definition'],
  ['Site Survey → Proposal Rate', '50–60%', 'Proposals ÷ held site surveys'],
  ['Proposal → Project Conversion', '20–30%', 'Won projects ÷ proposals'],
  ['Avg. Target Project Value', '₹2.5L+', 'Average target project value'],
  ['Marketing-Influenced Pipeline', '₹50L–₹75L / quarter', 'Attributed opportunity value; not booked revenue'],
  ['Organic Traffic Growth', '30–40%', 'Growth against the confirmed organic baseline'],
  ['High-Intent Keyword Growth', '40–50%', 'Growth in tracked high-intent keyword visibility; definition to confirm'],
  ['Remarketing Contribution', '15–20%', 'Share of qualified leads attributed to remarketing'],
  ['Residential Lead Share', '45–50%', 'Share of qualified leads'],
  ['C&I Lead Share', '35–40%', 'Share of qualified leads'],
  ['Industrial Lead Share', '10–15%', 'First-phase share of qualified leads'],
  ['Maharashtra Lead Contribution', '35–40%', 'Share of qualified leads'],
  ['Gujarat Lead Contribution', '35–40%', 'Share of qualified leads'],
  ['MP Lead Contribution', '20–25%', 'Share of qualified leads'],
];
const targetGroups = {
  'Core Objectives': [
    ['Demand Generation', '+40% qualified lead growth'],
    ['Geographic Expansion', '60–70% leads from Maharashtra + Gujarat'],
    ['C&I Growth', '35–40% of total qualified pipeline'],
    ['Industrial Expansion', '10–15% of qualified leads in the first phase'],
    ['Brand Authority', '+30% branded search growth'],
  ],
  'Strategic KPIs': [
    ['Demand & Conversion', '4–6% landing-page CVR'],
    ['Lead Quality', '35–45% qualified lead rate'],
    ['Search & SEO', '30–40% organic traffic growth'],
    ['Sales Progression', '25–35% lead-to-site-survey'],
    ['Commercial Conversion', '20–30% proposal-to-project'],
  ],
  'Growth Metrics (OKRs)': [
    ['Increase Qualified Demand', '+40% qualified leads'],
    ['Expand Priority Markets', '70% of new pipeline from Maharashtra, Gujarat & MP'],
    ['Strengthen C&I + Industrial Mix', '50%+ of qualified pipeline from C&I + Industrial'],
    ['Improve Marketing Efficiency', '25% improvement in Cost Per Qualified Lead'],
    ['Build Premium Brand Authority', '30% increase in branded search + direct traffic'],
  ],
};
// Strategic maturity assessment supplied from the existing project knowledge.
// This assessment is independent of live performance data and tracker completion.
const growthScoreModel = [
  ['Demand Generation', 100, 52, 'Residential + C&I demand exists, but the qualified lead system is not yet fully structured by geography and segment.'],
  ['Lead Quality & Conversion', 100, 42, 'Qualified leads are a clear priority; hard baselines for qualification, site surveys, proposals and closures are still missing.'],
  ['Brand & Positioning', 100, 58, 'In-house design, quality, installation, service and warranty provide strong foundations; positioning is now clearer.'],
  ['Geographic Expansion', 75, 34, 'Maharashtra, Gujarat and MP are identified; dedicated state-wise acquisition infrastructure still needs to be built.'],
  ['SEO / Content / Authority', 75, 36, 'Strategic content direction and the industrial authority plan are clear; execution and measurable organic growth are needed.'],
  ['Tracking & Sales Integration', 50, 16, 'The Sales Head is identified; CRM feedback, attribution, lead-quality tracking and revenue attribution remain major gaps.'],
];
const growthScore = growthScoreModel.reduce((total, [, , current]) => total + current, 0);
const growthScoreMaximum = growthScoreModel.reduce((total, [, weight]) => total + weight, 0);
const scoreBands = [
  [0, 150, 'Fragmented'], [151, 250, 'Foundation Stage'], [251, 350, 'Structured Growth'],
  [351, 425, 'Scalable Growth Engine'], [426, 500, 'Category-Leading Growth System'],
];
const currentScoreBand = scoreBands.find(([minimum, maximum]) => growthScore >= minimum && growthScore <= maximum)[2];


const DashboardView = () => {
  const navigate = useNavigate();
  const [selectedOverview, setSelectedOverview] = useState('Overview');
  const [mixGroup, setMixGroup] = useState('Objectives');
  const needleAngle = Math.PI * (1 - growthScore / growthScoreMaximum);
  const groupMix = {
    Objectives: [['Core', 3], ['Strategic KPIs', 3], ['Growth metrics', 3]],
    Initiatives: [['Infrastructure', 3], ['Data loops', 3], ['Team', 3]],
    Experiments: [['Demand & funnel', 4], ['Content & nurture', 4], ['PR & strategic', 6]],
  }[mixGroup];
  const mixTotal = groupMix.reduce((sum, [, count]) => sum + count, 0);
  const firstStop = groupMix[0][1] / mixTotal * 100;
  const secondStop = (groupMix[0][1] + groupMix[1][1]) / mixTotal * 100;
  const tabContent = {
    Demand: ['Qualified demand today', 'Proposed targets: 100–150+ qualified leads per month, 35–45% qualification, 4–6% landing-page conversion and +40% qualified lead growth. Lead-to-survey: 25–35%; survey-to-proposal: 50–60%; proposal-to-project: 20–30%.'],
    Authority: ['Industrial authority tomorrow', 'Target 30–40% organic traffic growth, 40–50% high-intent keyword growth and 10–15% industrial qualified lead share in the first phase. Build verified technical proof and connect authority to consultations.'],
    Brand: ['Premium reliability', 'Designed In-House. Installed Right. Supported Long After. Proposed target: +30% branded search growth; the brand OKR targets 30% growth in branded search + direct traffic against a confirmed baseline.'],
    ROI: ['Commercial efficiency targets', 'Target ₹50L–₹75L quarterly marketing-influenced pipeline, ₹2.5L+ average project value and 25% improvement in Cost Per Qualified Lead. Actual ROI awaits attributed revenue, media costs, margins and baseline data.'],
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
                    { label: 'Qualified Leads / Month', value: '100–150+', icon: Zap, color: 'var(--success)' },
                    { label: 'Landing Page Conversion', value: '4–6%', icon: Target, color: 'var(--info)' },
                    { label: 'Lead Qualification Rate', value: '35–45%', icon: TrendingUp, color: 'var(--warning)' },
                    { label: 'Quarterly Influenced Pipeline', value: '₹50L–₹75L', icon: ArrowUpRight, color: 'var(--purple)' },
                  ].map(stat => <div key={stat.label} className="flex flex-col px-4 py-2 border border-slate-100 border-dashed rounded-xl bg-slate-50/50 min-w-0"><div className="flex items-center gap-2 mb-1"><stat.icon size={14} style={{ color: stat.color }} /><span className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</span></div><span className="text-xs font-semibold text-slate-500">{stat.label}</span></div>)}
                </div>
                <p className="text-[10px] text-slate-400 mt-3">Proposed planning targets · monthly and quarterly periods as labelled · actuals pending</p>
              </div>
            </div>
            <div className="flex border-b border-slate-200 overflow-x-auto" role="tablist" aria-label="Growth overview">
              {['Overview', 'Demand', 'Authority', 'Brand', 'ROI'].map(tab => <button key={tab} role="tab" id={`madhav-tab-${tab}`} aria-selected={selectedOverview === tab} aria-controls="madhav-tab-panel" onClick={() => setSelectedOverview(tab)} className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${selectedOverview === tab ? '' : 'border-transparent text-slate-500 hover:text-slate-800'}`} style={selectedOverview === tab ? { borderBottomColor: 'var(--info)', color: 'var(--info)' } : {}}>{tab}</button>)}
            </div>
          </div>
          <div className="w-full lg:w-72 flex-shrink-0 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-100 text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Growth Score</h3>
            <p className="text-xs text-slate-500 mb-5">Madhav Solar Growth Maturity · Out of 500</p>
            <svg viewBox="0 0 180 104" className="w-40 h-24 mb-2" role="img" aria-label={`Current strategic growth maturity: ${growthScore} out of ${growthScoreMaximum}; ${currentScoreBand}`}>
              <path d="M 18 90 A 72 72 0 0 1 162 90" fill="none" stroke="#e2e8f0" strokeWidth="16" />
              <path d="M 18 90 A 72 72 0 0 1 162 90" fill="none" stroke="var(--warning)" strokeWidth="16" pathLength="500" strokeDasharray={`${growthScore} ${growthScoreMaximum}`} />
              <line x1="90" y1="90" x2={90 + 68 * Math.cos(needleAngle)} y2={90 - 68 * Math.sin(needleAngle)} stroke="#1e293b" strokeWidth="4" />
              <circle cx="90" cy="90" r="8" fill="#1e293b" />
            </svg>
            <div className="text-3xl font-bold text-slate-800 mb-1">{growthScore} / {growthScoreMaximum}</div>
            <p className="text-xs font-semibold text-slate-600 mb-3">Current Growth Maturity</p>
            <p className="text-xs font-semibold text-amber-700 mb-2">{currentScoreBand} · Close to Structured Growth</p>
            <p className="text-xs text-slate-500 mb-3">Foundation Built. Growth System Needs Structuring.</p>
            <div className="w-full space-y-2 mb-3 text-xs text-slate-500">
              <p>90-Day Target: <strong className="text-blue-600">320+/500</strong></p>
              <p>6-Month Target: <strong className="text-emerald-600">390+/500</strong></p>
            </div>
            <p className="text-[10px] text-slate-400 mb-4">Strategic maturity assessment from project knowledge; live performance data is not connected.</p>
            <button onClick={showReport} className="w-full py-2 text-white text-sm font-bold rounded-xl transition-colors shadow-lg" style={{ backgroundColor: 'var(--info)' }}>View Report</button>
          </div>
        </div>
      </div>

      <div id="madhav-tab-panel" role="tabpanel" aria-labelledby={`madhav-tab-${selectedOverview}`}>
        {selectedOverview !== 'Overview' && <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"><h3 className="font-bold text-slate-800 mb-3">{tabContent[selectedOverview][0]}</h3><p className="text-sm text-slate-600 leading-relaxed">{tabContent[selectedOverview][1]}</p><button onClick={selectedOverview === 'ROI' ? showReport : () => navigate(selectedOverview === 'Demand' ? '/madhavsolar/objectives' : '/madhavsolar/experiments')} className="text-xs font-bold text-blue-600 mt-4">{selectedOverview === 'ROI' ? 'View proposed targets →' : 'Explore the action plan →'}</button></div>}
        {selectedOverview === 'Overview' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            {[
              { label: 'Lead → Site Survey', value: '25–35%', detail: 'Proposed lead-to-survey target', color: 'var(--info)' },
              { label: 'Proposal → Project', value: '20–30%', detail: 'Proposed commercial conversion target', color: 'var(--success)' },
              { label: 'Avg. Target Project Value', value: '₹2.5L+', detail: 'Proposed average project value', color: 'var(--purple)' },
            ].map(stat => <div key={stat.label} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-3"><div><h4 className="text-slate-500 font-semibold text-sm mb-1">{stat.label}</h4><p className="text-xs text-slate-400">{stat.detail}</p></div><div className="text-2xl font-bold whitespace-nowrap" style={{ color: stat.color }}>{stat.value}</div></div>)}
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col min-h-[270px]">
            <div className="mb-5"><h3 className="font-bold text-slate-800">Monthly Qualified Lead Target</h3><p className="text-xs text-slate-400 mt-1">Proposed range · 100–150+ per month</p></div>
            <div className="flex-1 flex items-end justify-center gap-8 min-h-[150px]" role="img" aria-label="Proposed monthly qualified leads: lower target 100, upper target 150 plus">
              {[[100, 'Lower target'], [150, 'Upper target +']].map(([value, label]) => <div key={label} className="flex-1 h-40 flex flex-col justify-end items-center gap-2"><span className="text-xs font-bold text-blue-600">{value}{value === 150 ? '+' : ''}</span><div className="w-full bg-blue-100 rounded-t-lg" style={{ height: `${value / 160 * 100}%` }} /><span className="text-[10px] text-slate-400">{label}</span></div>)}
            </div>
            <p className="text-[10px] text-slate-400 mt-3">Targets, not recorded lead volumes.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(targetGroups).map(([group, targets]) => <div key={group} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"><h3 className="font-bold text-slate-800 mb-1">{group}</h3><p className="text-xs text-slate-400 mb-4">Proposed numeric targets</p><div className="space-y-4">{targets.map(([label, value]) => <div key={label} className="border-b border-slate-100 pb-3"><p className="text-sm font-semibold text-slate-700">{label}</p><p className="text-xs text-blue-700 mt-1">{value}</p></div>)}</div></div>)}
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
        <p className="text-xs mt-3">All initiatives are proposed. Percentages on tracker pages represent user-assessed plan completion, not historical performance; numeric growth targets are proposed planning targets; actual performance remains pending.</p>
      </div>
      <div id="madhav-report" className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm scroll-mt-6">
        <div className="flex flex-wrap justify-between items-start gap-3 mb-5">
          <div><h3 className="font-bold text-slate-800">The numbers behind the plan</h3><p className="text-xs text-slate-500 mt-2">Proposed planning targets until client baseline data is available. Each metric uses its stated period and denominator.</p></div>
          <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg">Client validation required</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead><tr className="text-xs text-slate-500 border-b border-slate-200"><th className="py-3 pr-4">Metric</th><th className="py-3 pr-4">Proposed target</th><th className="py-3 pr-4">Assumption / definition</th><th className="py-3">Actual</th></tr></thead>
            <tbody>{growthTargets.map(([label, value, detail]) => <tr key={label} className="border-b border-slate-100"><td className="py-3 pr-4 font-semibold text-slate-700">{label}</td><td className="py-3 pr-4 font-bold text-blue-700 whitespace-nowrap">{value}</td><td className="py-3 pr-4 text-xs text-slate-500">{detail}</td><td className="py-3 text-xs text-slate-400">Pending</td></tr>)}</tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-4">Segment and state shares must be set to a coherent 100% allocation. The proposed Maharashtra + Gujarat objective is 60–70% of leads, while the individual state ranges imply 70–80%; confirm the final lead allocation with the client. The priority-market OKR separately measures 70% of new pipeline across all three states.</p>
        <p className="text-xs text-slate-500 mt-3">Lead share and pipeline-value share are different measures. C&I targets 35–40% of qualified pipeline; C&I + Industrial targets 50%+. Growth and efficiency percentages need a baseline and comparison period. Pipeline value is not revenue or ROI.</p>
        <div className="mt-6 pt-6 border-t border-slate-100">
          <h4 className="font-bold text-slate-800 mb-2">Current Growth Maturity · {growthScore} / {growthScoreMaximum}</h4>
          <p className="text-xs text-slate-500 mb-4">Current strategic maturity assessment based on the client questionnaire, positioning, marketing structure, funnel readiness, geographic plan, content maturity and measurement gaps. This is independent of live ad/CRM performance and saved tracker completion.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead><tr className="text-xs text-slate-500 border-b border-slate-200"><th className="py-3 pr-4">Growth area</th><th className="py-3 pr-4">Weight</th><th className="py-3 pr-4">Current score</th><th className="py-3">Why</th></tr></thead>
              <tbody>{growthScoreModel.map(([label, weight, current, reason]) => <tr key={label} className="border-b border-slate-100"><td className="py-3 pr-4 font-semibold text-slate-700">{label}</td><td className="py-3 pr-4 text-slate-500">{weight}</td><td className="py-3 pr-4 font-bold text-blue-700">{current}</td><td className="py-3 text-xs text-slate-500">{reason}</td></tr>)}</tbody>
              <tfoot><tr><td className="py-3 pr-4 font-bold text-slate-800">Total</td><td className="py-3 pr-4 font-bold">{growthScoreMaximum}</td><td className="py-3 pr-4 font-bold text-blue-700">{growthScore}</td><td className="py-3 text-xs font-semibold text-amber-700">{currentScoreBand} · Close to Structured Growth</td></tr></tfoot>
            </table>
          </div>
          <div className="mt-5 bg-slate-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-slate-700 mb-2">Foundation Built. Growth System Needs Structuring.</p>
            <p className="text-xs text-slate-600">Madhav Solar already has the business foundation, service capability and market opportunity. The growth infrastructure needs a structured qualified lead engine, state-wise campaign architecture, downstream lead-quality tracking, CRM and sales attribution, industrial positioning, and project proof converted into digital authority.</p>
          </div>
          <div className="mt-5"><h5 className="text-sm font-bold text-slate-800 mb-3">Growth maturity score bands</h5><div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{scoreBands.map(([minimum, maximum, label]) => <div key={label} className={`flex justify-between gap-3 rounded-lg px-3 py-2 text-xs ${label === currentScoreBand ? 'bg-amber-50 text-amber-800 font-semibold' : 'bg-slate-50 text-slate-500'}`}><span>{minimum}–{maximum}</span><span>{label}</span></div>)}</div></div>
          <p className="text-sm font-semibold text-slate-700 mt-4">90-Day Target: 320+/500 · 6-Month Target: 390+/500</p>
        </div>
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

