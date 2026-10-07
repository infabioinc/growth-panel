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

const DashboardView = () => {
  const navigate = useNavigate();
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
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-24 lg:w-40 h-24 rounded-2xl bg-white p-2 flex items-center justify-center border border-slate-100 flex-shrink-0">
                <img src="https://madhavsolarenergy.com/wp-content/uploads/2023/07/MADHAV-SOLAR-ENERGY-scaled-1.png" alt="Madhav Solar Energy logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Madhav Solar Energy</h2>
                <p className="text-sm text-slate-600 mb-3">Build qualified Residential + C&I demand today, while growing premium Industrial Solar authority tomorrow.</p>
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg inline-block">Solar EPC · Growth Panel</span>
              </div>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Growth North Star</p>
              <p className="font-semibold text-slate-800">Build a predictable qualified lead engine across Maharashtra, Gujarat and Madhya Pradesh, differentiated by in-house design, installation quality and support beyond commissioning.</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              {['Objectives', 'Initiatives', 'Experiments'].map(page => (
                <button key={page} onClick={() => navigate(`/madhavsolar/${page.toLowerCase()}`)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold hover:bg-slate-50">{page} →</button>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-64 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-100 text-center">
            <h3 className="text-lg font-bold text-slate-800">Plan completion</h3>
            <p className="text-xs text-slate-500 mt-2">User-entered objective tracker values</p>
            <div className="text-4xl font-bold my-5" style={{ color: 'var(--primary)' }}>{completion === null ? 'Unassessed' : `${completion}%`}</div>
            <p className="text-xs text-slate-500 mb-5">No live sales or media data connected. New tracks start at 0% until assessed.</p>
            <button onClick={() => navigate('/madhavsolar/objectives')} className="w-full py-2 text-white text-sm font-bold rounded-xl" style={{ backgroundColor: 'var(--primary)' }}>Update objectives</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Average project-value focus', value: '₹2.5 lakh', detail: 'Client input; minimum threshold pending', color: 'var(--success)' },
          { label: 'Priority geographic markets', value: '3 states', detail: 'Maharashtra · Gujarat · Madhya Pradesh', color: 'var(--info)' },
          { label: 'Primary growth outcome', value: 'Qualified leads', detail: 'Optimise for sales acceptance and pipeline', color: 'var(--primary)' },
          { label: 'Business performance baseline', value: 'Pending', detail: 'Need spend, CPL, leads and conversion data', color: 'var(--warning)' }
        ].map(stat => <div key={stat.label} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"><p className="text-xs font-semibold text-slate-500">{stat.label}</p><p className="text-xl font-bold my-3" style={{ color: stat.color }}>{stat.value}</p><p className="text-xs text-slate-500">{stat.detail}</p></div>)}
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
        <p className="text-xs mt-3">All initiatives are proposed. Percentages on tracker pages represent user-assessed plan completion, not historical performance; no unsupported revenue, campaign activity or growth figures are presented.</p>
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
                src="https://madhavsolarenergy.com/wp-content/uploads/2023/07/MADHAV-SOLAR-ENERGY-scaled-1.png" 
                alt="Madhav Solar Energy Logo" 
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

            <SidebarItem icon={FileText} label="Figures List" active={activeTab === 'Figures'} onClick={() => setActiveTab('Figures')} />
            <SidebarItem icon={Users} label="Client Master" active={activeTab === 'Client'} onClick={() => setActiveTab('Client')} />
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

