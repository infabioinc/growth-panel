import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Box, 
  Heart, 
 
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
  RefreshCw,
  XCircle,
  Lightbulb
} from 'lucide-react';

// --- Activity Log Data ---
const activityLog = [
  { date: '28 Jan', time: '10:10', text: "Women's Health vs Lifestyle Health series experiment launched across 3 weeks.", type: 'brand' },
  { date: '27 Jan', time: '18:45', text: "Series-based format increased binge rate by 22% vs episodic videos.", type: 'success' },
  { date: '26 Jan', time: '14:30', text: "Doctor soundbite Shorts delivered 2.4x discovery vs baseline.", type: 'info' },
  { date: '25 Jan', time: '11:05', text: "Comment-to-content loop enabled. 17 new topics sourced from viewer questions.", type: 'success' },
  { date: '24 Jan', time: '09:20', text: "Monthly Authority Pulse: saves & shares at 8.5% of views (within target band).", type: 'warning' },
];

const auditLog = [
  { title: "Audience Clarity", subtitle: "Women's Health vs Lifestyle Health", type: "success" },
  { title: "Content Architecture", subtitle: "Series-based authority formats", type: "info" },
  { title: "Monetization Readiness", subtitle: "Soft CTA + intent signal tracking", type: "danger" },
];

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

const DashboardView = () => (
  <div className="space-y-6 max-w-7xl mx-auto pb-10">
    {/* Profile & Growth Card */}
    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left: Profile Info */}
        <div className="flex-1">
          <div className="flex items-start gap-6 mb-8">
            <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-md bg-gradient-to-tr from-indigo-50 via-sky-50 to-emerald-50 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs lg:text-sm font-black tracking-[0.15em] text-indigo-700 uppercase">
                  Let&apos;s<br />Ask<br />Doctor
                </span>
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-tl-xl" style={{ backgroundColor: 'var(--success)' }}></div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-slate-900">Let&apos;s Ask The Doctor</h2>
                    <CheckCircle2 size={20} className="fill-blue-50" style={{ color: 'var(--info)' }} />
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    Health authority &amp; trust-led scale platform for precise, data-backed healthcare content.
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                      Growth Panel Dashboard
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="flex flex-wrap gap-4 mt-6">
                 {[
                   { label: 'Audience Trust Index', val: '78%', color: 'bg-emerald-50', icon: Heart, textColor: 'var(--success)' },
                   { label: 'Repeat Viewers', val: '32%', color: 'bg-blue-50', icon: RefreshCw, textColor: 'var(--info)' },
                   { label: 'Avg Watch Time', val: '6.2 min', color: 'bg-amber-50', icon: Clock, textColor: 'var(--warning)' },
                   { label: 'Authority Signals', val: '14', color: 'bg-purple-50', icon: TrendingUp, textColor: 'var(--purple)' },
                 ].map((stat, i) => (
                   <div key={i} className="flex flex-col px-4 py-2 border border-slate-100 border-dashed rounded-xl bg-slate-50/50 min-w-[120px]">
                      <div className="flex items-center gap-2 mb-1">
                        <stat.icon size={14} style={{ color: stat.textColor }} />
                        <span className="text-lg font-bold" style={{ color: stat.textColor }}>{stat.val}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {['Overview', 'Audience', 'Authority', 'Content', 'Monetization'].map((tab, i) => (
              <button 
                key={tab} 
                className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${i === 0 ? '' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                style={i === 0 ? { borderBottomColor: 'var(--info)', color: 'var(--info)' } : {}}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Growth Score Gauge */}
        <div className="w-full lg:w-72 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-100 text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Authority Score</h3>
            <p className="text-xs text-slate-500 mb-6">Trust-led health platform readiness</p>
            
            {/* CSS Gauge Simulation */}
            <div className="relative w-40 h-20 overflow-hidden mb-4">
               <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[16px] border-slate-200 box-border"></div>
               <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[16px] border-b-transparent border-l-transparent border-r-transparent transform rotate-[-30deg] origin-center box-border" style={{ borderColor: 'var(--info)' }}></div>
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-slate-800 rounded-full z-10"></div>
               <div className="absolute bottom-0 left-1/2 w-20 h-1 bg-slate-800 origin-left rotate-[-125deg] z-0"></div>
            </div>
            
            <div className="text-4xl font-bold text-slate-900 mb-4">380</div>
            <button 
              className="w-full py-2 text-white text-sm font-bold rounded-xl transition-colors shadow-lg"
              style={{ backgroundColor: 'var(--info)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--blue)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--info)'}
            >
              View Authority Report
            </button>
        </div>
      </div>
    </div>

    {/* Middle Row: Stats & Charts */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* 3 Stats Column */}
      <div className="space-y-4">
         {[
           { label: 'Avg Watch Time', val: '6.2 min', sub: 'Per qualified viewer', icon: Clock, color: 'var(--info)' },
           { label: 'Repeat Viewers', val: '32%', sub: 'Viewers who watched 3+ videos', icon: ArrowUpRight, color: 'var(--success)' },
           { label: 'Series Completion', val: '34%', sub: 'Episodes completed per series', icon: CheckCircle2, color: 'var(--warning)' }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="text-slate-500 font-semibold text-sm mb-1">{stat.label}</h4>
                <p className="text-xs text-slate-400">{stat.sub}</p>
              </div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.val}</div>
           </div>
         ))}
      </div>

      {/* Content Retention Chart Placeholder */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        <div className="mb-4">
          <h3 className="font-bold text-slate-800">Series Retention Curve</h3>
          <p className="text-xs text-slate-400">Episode-wise drop-off for top series</p>
        </div>
        <div className="flex-1 flex items-end justify-between gap-2 h-32 px-2">
            {[80, 68, 55, 43, 36, 30].map((h, i) => (
              <div 
                key={i} 
                className="w-full bg-indigo-100 rounded-t-lg transition-colors" 
                style={{ height: `${h}%` }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--info)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              ></div>
            ))}
        </div>
      </div>

      {/* Growth Rate Pie Chart Placeholder */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
         <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-slate-800">Authority Growth Mix</h3>
              <p className="text-xs text-slate-400">% contribution by tracks</p>
            </div>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-600 rounded-lg outline-none">
              <option>Audience</option>
              <option>Authority</option>
              <option>Monetization</option>
            </select>
         </div>
         <div className="flex-1 flex items-center justify-center relative">
            <div className="w-32 h-32 rounded-full border-[12px]" style={{ borderColor: 'var(--indigo)', borderRightColor: 'var(--warning)', borderBottomColor: 'var(--success)' }}></div>
            <div className="absolute flex flex-col items-center">
              <span className="text-xs font-bold text-slate-400">Tracks</span>
              <span className="text-lg font-bold text-slate-800">21</span>
            </div>
         </div>
         <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--indigo)' }}></span> Content &amp; Series
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--warning)' }}></span> Shorts &amp; Discovery
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }}></span> Partnerships &amp; Community
            </div>
         </div>
      </div>
    </div>

    {/* Bottom Row: Lists & Logs */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Objectives List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-50 bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Core Objectives</h3>
        </div>
        <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-96 custom-scrollbar">
           {[
             { title: "Audience Trust & Demand", cat: "Objective", color: "var(--success)" },
             { title: "Authority Velocity", cat: "Objective", color: "var(--info)" },
             { title: "Content Retention", cat: "Objective", color: "var(--warning)" },
             { title: "Monetization Readiness", cat: "Objective", color: "var(--purple)" },
             { title: "ROI Accountability", cat: "Objective", color: "var(--indigo)" },
             { title: "Women’s vs Lifestyle Health Series", cat: "Experiment", color: "var(--cyan)" }
           ].map((task, i) => (
             <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="mt-1">
                   <input type="checkbox" disabled className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </div>
                <div>
                   <p className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">{task.title}</p>
                   <div className="flex items-center gap-2 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: task.color }}></span>
                      <span className="text-xs text-slate-400 font-medium">{task.cat}</span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Experiment Audit */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Experiment Audit</h3>
          <button className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1">
            <FileText size={14} />
            View Matrix
          </button>
        </div>
        <div className="p-4 flex-1 space-y-3">
          {auditLog.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition-all">
              <div className="mt-0.5">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ 
                    backgroundColor: item.type === 'success' 
                      ? 'var(--success)' 
                      : item.type === 'info' 
                      ? 'var(--info)' 
                      : 'var(--danger)' 
                  }}
                >
                  {item.title.charAt(0)}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-slate-100">
                <MoreHorizontal size={16} className="text-slate-400" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Growth Activity Log</h3>
          <span className="text-xs font-medium text-slate-400">Authority &amp; retention events</span>
        </div>
        <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-96 custom-scrollbar">
          {activityLog.map((item, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50/80 transition-colors">
              <div className="w-14 flex flex-col items-center mt-0.5">
                <span className="text-[11px] font-semibold text-slate-500">{item.date}</span>
                <span className="text-[11px] text-slate-400">{item.time}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
              </div>
              <div className="mt-1">
                <span 
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ 
                    backgroundColor: 
                      item.type === 'success' ? 'var(--success)' :
                      item.type === 'danger' ? 'var(--danger)' :
                      item.type === 'warning' ? 'var(--warning)' :
                      item.type === 'brand' ? 'var(--indigo)' :
                      'var(--info)'
                  }}
                ></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  </div>
);

export default function DashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedClient, setSelectedClient] = useState("Let's Ask The Doctor");
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const clients = [
    '- Select Client -',
    'Blue Energy Motors',
    'Fabulous Media',
    'GoCommercially',
    'HeadsUpB2b',
    'Human Touch',
    'India Meets India',
    'Infabio, Inc.',
    'InstaGroup',
    'IPL Tech Electric',
    "Let's Ask The Doctor",
    'Oxxy',
    'Puno',
    'Montra Truck',
    'Ria Gupta',
    'Sany',
    'Tailworld',
    'VZY-Tv',
    'McRAYGOR',
    'MovoDream',
    'A2 Bilona Ghee',
    'Yastudy',
    'Kaizen Technicals',
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
              <div className="w-8 h-8 mr-3 rounded-xl bg-indigo-100 flex items-center justify-center text-[9px] font-bold text-indigo-700 uppercase">
                LAD
              </div>
              <span className="text-2xl font-bold text-slate-800 tracking-tight">
                GO <span style={{ color: 'var(--primary)' }}>Growth</span>
              </span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/letsaskdoctor/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => navigate('/letsaskdoctor/objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => navigate('/letsaskdoctor/initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => navigate('/letsaskdoctor/experiments')} />
            
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
                   <span className="truncate">
                     {selectedClient === "Let's Ask The Doctor" ? "Let's Ask The Doctor" : selectedClient}
                   </span>
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
                            if (client === 'Blue Energy Motors') {
                              navigate('/blueenergymotors/dashboard');
                            } else if (client === 'Puno') {
                              navigate('/puno/dashboard');
                            } else if (client === 'Sany') {
                              navigate('/sany/dashboard');
                            } else if (client === 'Montra Truck') {
                              navigate('/montra/dashboard');
                            } else if (client === 'HeadsUpB2b') {
                              navigate('/headsupb2b/dashboard');
                            } else if (client === 'Tailworld') {
                              navigate('/tailworld/dashboard');
                            } else if (client === 'InstaGroup') {
                              navigate('/instagroup/dashboard');
                            } else if (client === 'VZY-Tv') {
                              navigate('/vzytv/dashboard');
                            } else if (client === 'McRAYGOR') {
                              navigate('/mcraygor/dashboard');
                            } else if (client === 'MovoDream') {
                              navigate('/movodream/dashboard');
                            } else if (client === 'A2 Bilona Ghee') {
                              navigate('/a2bilonaghee/dashboard');
                            } else if (client === 'Yastudy') {
                              navigate('/yastudy/dashboard');
                            } else if (client === 'Kaizen Technicals') {
                              navigate('/kaizen/dashboard');
                            } else if (client === 'Ria Gupta') {
                              navigate('/riagupta/dashboard');
                            } else if (client === 'Oxxy') {
                              navigate('/oxxy/dashboard');
                            } else if (client === "Let's Ask The Doctor") {
                              navigate('/letsaskdoctor/dashboard');
                            }
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
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 uppercase">
                LAD
              </div>
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

