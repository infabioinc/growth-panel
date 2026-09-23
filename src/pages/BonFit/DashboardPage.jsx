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

const BONFIT_LOGO = 'https://bonfit.in/cdn/shop/files/Untitled_design_11_128x@2x.png?v=1703571524';

const activityLog = [
  { date: '05 Mar', time: '09:33', text: "Demand Generation campaign status changed to Active.", type: 'danger' },
  { date: '05 Mar', time: '09:30', text: "Conversion Optimization funnel status changed to In Process.", type: 'success' },
  { date: '04 Mar', time: '14:22', text: "Website conversion rate target set to 2.5–3%.", type: 'brand' },
  { date: '02 Mar', time: '11:39', text: "Meta ad testing (comfort vs back-pain) experiment launched.", type: 'warning' },
  { date: '01 Mar', time: '16:54', text: "Monthly website sessions tracking improved to 85K.", type: 'info' },
];

const auditLog = [
  { title: "Meta ad testing (comfort vs back-pain creatives)", subtitle: "Demand Engine - In Process", type: "success" },
  { title: "Product page A/B (technical vs lifestyle messaging)", subtitle: "Funnel Optimization - In Process", type: "info" },
  { title: "Abandoned cart email sequences", subtitle: "Retargeting & Automation - In Process", type: "danger" },
];

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

const DashboardView = () => (
  <div className="space-y-6 max-w-7xl mx-auto pb-10">
    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-start gap-6 mb-8">
            <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-md bg-white p-2 flex items-center justify-center">
              <img src={BONFIT_LOGO} alt="Bonfit Logo" className="w-full h-full object-contain" />
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-tl-xl" style={{ backgroundColor: 'var(--success)' }}></div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-slate-900">Bonfit</h2>
                    <CheckCircle2 size={20} className="fill-blue-50" style={{ color: 'var(--info)' }} />
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Data-driven growth command center for Bonfit to systematically increase customer acquisition, brand trust, repeat purchases, and market penetration in the Indian sleep products market. The Growth Panel connects marketing, content, and performance activities to measurable outcomes: website conversions, CAC, repeat purchase rate, and brand recall.</p>
                  <div className="flex items-center gap-2">
                    <button className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                      Growth Panel Dashboard
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-6">
                {[
                  { label: 'Monthly Sessions', val: '100K+', color: 'bg-emerald-50', icon: Zap, textColor: 'var(--success)' },
                  { label: 'Conversion Rate', val: '2.5–3%', color: 'bg-blue-50', icon: Target, textColor: 'var(--info)' },
                  { label: 'Marketing ROI', val: '≥300%', color: 'bg-amber-50', icon: TrendingUp, textColor: 'var(--warning)' },
                  { label: 'Repeat Purchase', val: '20%', color: 'bg-purple-50', icon: ArrowUpRight, textColor: 'var(--purple)' },
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
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {['Overview', 'Demand', 'Conversion', 'Brand', 'ROI'].map((tab, i) => (
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
        <div className="w-full lg:w-72 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-100 text-center">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Growth Score</h3>
          <p className="text-xs text-slate-500 mb-6">Business growth percentage</p>
          <div className="relative w-40 h-20 overflow-hidden mb-4">
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[16px] border-slate-200 box-border"></div>
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[16px] border-b-transparent border-l-transparent border-r-transparent transform rotate-[-125deg] origin-center box-border" style={{ borderColor: 'var(--danger)' }}></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-slate-800 rounded-full z-10"></div>
            <div className="absolute bottom-0 left-1/2 w-20 h-1 bg-slate-800 origin-left rotate-[-125deg] z-0"></div>
          </div>
          <div className="text-4xl font-bold mb-4 -mt-2" style={{ color: 'var(--danger)' }}>280</div>
          <button
            className="w-full py-2 text-white text-sm font-bold rounded-xl transition-colors shadow-lg"
            style={{ backgroundColor: 'var(--info)' }}
          >
            View Report
          </button>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="space-y-4">
        {[
          { label: 'Website Traffic', val: '85K', sub: 'Monthly sessions', icon: Users, color: 'var(--info)' },
          { label: 'Cost per Purchase', val: '<₹2000', sub: 'CAC target', icon: ArrowDownRight, color: 'var(--danger)' },
          { label: 'Social Engagement', val: '5–7%', sub: 'Content KPIs', icon: CheckCircle2, color: 'var(--success)' }
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
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        <div className="mb-4">
          <h3 className="font-bold text-slate-800">Weekly Website Sessions</h3>
          <p className="text-xs text-slate-400">Traffic trend</p>
        </div>
        <div className="flex-1 flex items-end justify-between gap-2 h-32 px-2">
          {[40, 60, 30, 80, 50, 70, 55].map((h, i) => (
            <div
              key={i}
              className="w-full bg-blue-100 rounded-t-lg transition-colors"
              style={{ height: `${h}%` }}
            ></div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-slate-800">Growth Rate</h3>
            <p className="text-xs text-slate-400">% by track</p>
          </div>
          <select className="bg-slate-50 border-none text-xs font-bold text-slate-600 rounded-lg outline-none">
            <option>Objectives</option>
            <option>Initiatives</option>
          </select>
        </div>
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-32 h-32 rounded-full border-[12px]" style={{ borderColor: 'var(--indigo)', borderRightColor: 'var(--warning)', borderBottomColor: 'var(--info)' }}></div>
          <div className="absolute flex flex-col items-center">
            <span className="text-xs font-bold text-slate-400">Total</span>
            <span className="text-lg font-bold text-slate-800">18</span>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--indigo)' }}></span> In Process (12)
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--warning)' }}></span> Ideas (6)
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-50 bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Objectives</h3>
        </div>
        <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-96 custom-scrollbar">
          {[
            { title: "Demand Generation", cat: "Core Objective", color: "var(--success)" },
            { title: "Conversion Optimization", cat: "Core Objective", color: "var(--info)" },
            { title: "Brand Trust & Authority", cat: "Core Objective", color: "var(--warning)" },
            { title: "Market Expansion", cat: "Core Objective", color: "var(--indigo)" },
            { title: "ROI Accountability", cat: "Core Objective", color: "var(--purple)" },
            { title: "Meta ad testing (comfort vs back-pain)", cat: "Experiment", color: "var(--cyan)" }
          ].map((task, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="mt-1">
                <input type="checkbox" disabled className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">{task.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: task.color }}></span>
                  <span className="text-xs text-slate-400 font-medium">{task.cat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-50 bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Activity Log</h3>
        </div>
        <div className="p-5 flex-1 overflow-y-auto max-h-96 custom-scrollbar">
          <div className="relative pl-4 border-l border-slate-200 space-y-8">
            {activityLog.map((log, i) => (
              <div key={i} className="relative">
                <span
                  className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ring-1 ring-slate-200"
                  style={{
                    backgroundColor: log.type === 'danger' ? 'var(--danger)' :
                      log.type === 'success' ? 'var(--success)' :
                        log.type === 'brand' ? 'var(--indigo)' : 'var(--gray)'
                  }}
                ></span>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-slate-400">{log.date}, {log.time}</span>
                  <p className="text-sm text-slate-600 leading-relaxed">{log.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-50 bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Experiment Audit</h3>
        </div>
        <div className="p-4 space-y-2">
          {auditLog.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className={`w-2 h-2 rounded-full ${item.type === 'success' ? 'bg-emerald-300' : item.type === 'info' ? 'bg-blue-300' : 'bg-rose-300'}`}></div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-500">{item.subtitle}</p>
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
  const [selectedClient, setSelectedClient] = useState('Bonfit');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const clients = [
    '- Select Client -',
    'Bonfit',
    'Blue Energy Motors',
    'HeadsUpB2b',
    'MovoDream',
    'Puno',
    'Montra Truck',
    'Sany',
    'Tailworld',
    'VZY-Tv',
    'McRAYGOR',
    'A2 Bilona Ghee',
    'Yastudy',
    'Kaizen Technicals',
  ];

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans text-slate-900 overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:shadow-none lg:border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-full flex flex-col">
          <div className="h-20 flex items-center px-8 border-b border-slate-50">
            <button onClick={() => navigate('/home')} className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
              <img src={BONFIT_LOGO} alt="Bonfit Logo" className="w-8 h-8 mr-3 object-contain" />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">GO <span style={{ color: 'var(--primary)' }}>Growth</span></span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/bonfit/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => navigate('/bonfit/objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => navigate('/bonfit/initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => navigate('/bonfit/experiments')} />
            <div className="my-6 border-t border-slate-100 mx-2"></div>
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">KPIs</p>
            <SidebarItem icon={FileText} label="Figures List" active={activeTab === 'Figures'} onClick={() => setActiveTab('Figures')} />
            <SidebarItem icon={Users} label="Client Master" active={activeTab === 'Client'} onClick={() => setActiveTab('Client')} />
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
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
            <div className="hidden md:flex relative">
              <div className="bg-slate-100 rounded-lg px-3 py-2 min-w-[200px]">
                <span className="text-xs font-bold text-slate-500 mr-2 uppercase">Client:</span>
                <button onClick={() => setClientDropdownOpen(!clientDropdownOpen)} className="text-sm font-bold text-slate-800 flex items-center gap-1 cursor-pointer w-full justify-between">
                  <span className="truncate">{selectedClient}</span>
                  <ChevronDown size={14} className={`transition-transform ${clientDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {clientDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setClientDropdownOpen(false)} />
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
                    {clients.map((client, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (client !== '- Select Client -') {
                            setSelectedClient(client);
                            if (client === 'Bonfit') navigate('/bonfit/dashboard');
                            else if (client === 'Blue Energy Motors') navigate('/blueenergymotors/dashboard');
                            else if (client === 'HeadsUpB2b') navigate('/headsupb2b/dashboard');
                            else if (client === 'MovoDream') navigate('/movodream/dashboard');
                            else if (client === 'Puno') navigate('/puno/dashboard');
                            else if (client === 'Montra Truck') navigate('/montra/dashboard');
                            else if (client === 'Sany') navigate('/sany/dashboard');
                            else if (client === 'Tailworld') navigate('/tailworld/dashboard');
                            else if (client === 'VZY-Tv') navigate('/vzytv/dashboard');
                            else if (client === 'McRAYGOR') navigate('/mcraygor/dashboard');
                            else if (client === 'A2 Bilona Ghee') navigate('/a2bilonaghee/dashboard');
                            else if (client === 'Yastudy') navigate('/yastudy/dashboard');
                            else if (client === 'Kaizen Technicals') navigate('/kaizen/dashboard');
                          }
                          setClientDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${selectedClient === client ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-700'} ${client === '- Select Client -' ? 'text-slate-400 italic' : ''}`}
                      >
                        {client}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <img src={BONFIT_LOGO} alt="Bonfit Logo" className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-white p-1 object-contain" />
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto h-full">
            <DashboardView />
          </div>
        </div>
      </main>
    </div>
  );
}
