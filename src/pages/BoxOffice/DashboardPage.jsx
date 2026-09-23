import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Box,
  ListOrdered,
  TrendingUp,
  Settings,
  Menu,
  ChevronDown,
  CheckCircle2,
  Zap,
  Target,
  ArrowUpRight,
  Heart,
  Activity,
  Users,
} from 'lucide-react';

const BOXOFFICE_LOGO = 'https://boxofficespace.in/wp-content/uploads/2025/07/311-e1756060146386.png';

const activityLog = [
  { date: '23 Jan', time: '11:10', text: 'LinkedIn Ads: Founder-led vs ROI-led creative test launched.', type: 'brand' },
  { date: '23 Jan', time: '10:25', text: 'Growth Dashboard: GA4 + CRM + Ad platforms unified.', type: 'info' },
  { date: '22 Jan', time: '16:40', text: 'Proposal redesign A/B (Visual-heavy vs ROI breakdown) live.', type: 'warning' },
  { date: '21 Jan', time: '12:15', text: 'Deal-stage framework and occupancy dashboard deployed.', type: 'success' },
  { date: '20 Jan', time: '18:05', text: 'Weekly founder LinkedIn posts and case study drafts ready.', type: 'info' },
];

const auditLog = [
  { title: 'Demand Generation', subtitle: 'Demand - Objectives', type: 'success' },
  { title: 'Pipeline Velocity', subtitle: 'Pipeline - Objectives', type: 'info' },
  { title: 'Occupancy Optimization', subtitle: 'Occupancy - Objectives', type: 'warning' },
];

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${active ? 'text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
    style={active ? { backgroundColor: 'var(--primary)', boxShadow: '0 10px 15px -3px rgba(88, 103, 221, 0.1)' } : {}}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'} />
      <span className="font-medium text-[15px]">{label}</span>
    </div>
  </button>
);

const kpiStats = [
  { label: 'Qualified Leads / Month', val: '—', sub: 'Target: 50+', icon: TrendingUp, color: 'var(--info)' },
  { label: 'Proposal → Closure', val: '—', sub: 'Target: 25–30%', icon: Target, color: 'var(--success)' },
  { label: 'Avg Deal Size', val: '—', sub: 'Target: ₹25L–₹1Cr', icon: Heart, color: 'var(--warning)' },
  { label: 'Workstation Utilization', val: '—', sub: 'Target: 85–90%', icon: Activity, color: 'var(--indigo)' },
  { label: 'Cost per Closed Deal', val: '—', sub: 'Target: ≤ 5% of deal value', icon: Users, color: 'var(--success)' },
  { label: 'LinkedIn Engagement', val: '—', sub: 'Target: 5–7%', icon: Users, color: 'var(--info)' },
  { label: 'Branded search growth', val: '—', sub: 'Target: +15% QoQ', icon: Target, color: 'var(--warning)' },
];

const objectivesList = [
  { title: 'Demand Generation', cat: 'Demand', color: 'var(--info)' },
  { title: 'Pipeline Velocity', cat: 'Pipeline', color: 'var(--success)' },
  { title: 'Occupancy Optimization', cat: 'Occupancy', color: 'var(--warning)' },
  { title: 'Brand Authority (Pune)', cat: 'Authority', color: 'var(--indigo)' },
  { title: 'ROI Accountability', cat: 'Marketing ROI', color: 'var(--cyan)' },
];

const DashboardView = () => (
  <div className="space-y-6 max-w-7xl mx-auto pb-10">
    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-start gap-6 mb-8">
            <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-md bg-white">
              <img src={BOXOFFICE_LOGO} alt="BoxOffice Logo" className="w-full h-full object-contain p-2" />
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-tl-xl" style={{ backgroundColor: 'var(--success)' }}></div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-slate-900">BoxOffice</h2>
                    <CheckCircle2 size={20} className="fill-blue-50" style={{ color: 'var(--info)' }} />
                  </div>
                  <button className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">Upgrade Growth Score</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-6">
                {[
                  { label: 'Initiator', val: '25%', icon: Zap, textColor: 'var(--success)' },
                  { label: 'Committed', val: '0%', icon: Target, textColor: 'var(--danger)' },
                  { label: 'Accelerated', val: '0%', icon: TrendingUp, textColor: 'var(--danger)' },
                  { label: 'Elevated', val: '0%', icon: ArrowUpRight, textColor: 'var(--danger)' },
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
            {['Overview', 'Demand', 'Pipeline', 'Occupancy', 'ROI'].map((tab, i) => (
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
          <p className="text-xs text-slate-500 mb-6">Workspace pipeline %</p>
          <div className="relative w-40 h-20 overflow-hidden mb-4">
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[16px] border-slate-200 box-border"></div>
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[16px] border-b-transparent border-l-transparent border-r-transparent transform rotate-[-125deg] origin-center box-border" style={{ borderColor: 'var(--danger)' }}></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-slate-800 rounded-full z-10"></div>
            <div className="absolute bottom-0 left-1/2 w-20 h-1 bg-slate-800 origin-left rotate-[-125deg] z-0"></div>
          </div>
          <div className="text-4xl font-bold mb-4 -mt-2" style={{ color: 'var(--danger)' }}>250</div>
          <button className="w-full py-2 text-white text-sm font-bold rounded-xl transition-colors shadow-lg" style={{ backgroundColor: 'var(--info)' }}>View Report</button>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="space-y-4">
        {kpiStats.map((stat, i) => (
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
          <h3 className="font-bold text-slate-800">Deal Pipeline Funnel</h3>
          <p className="text-xs text-slate-400">Lead → Site Visit → Proposal → Closure</p>
        </div>
        <div className="flex-1 flex items-end justify-between gap-2 h-32 px-2">
          {[22, 38, 28, 52, 36, 44, 30].map((h, i) => (
            <div key={i} className="w-full bg-blue-100 rounded-t-lg transition-colors" style={{ height: `${h}%` }}></div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-slate-800">Growth Rate</h3>
            <p className="text-xs text-slate-400">% as per Groups</p>
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
            <span className="text-lg font-bold text-slate-800">5</span>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--indigo)' }}></span> In Process (3)
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--warning)' }}></span> Ideas (2)
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
          {objectivesList.map((task, i) => (
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
                <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ring-1 ring-slate-200" style={{ backgroundColor: log.type === 'danger' ? 'var(--danger)' : log.type === 'success' ? 'var(--success)' : log.type === 'brand' ? 'var(--indigo)' : log.type === 'warning' ? 'var(--warning)' : 'var(--info)' }}></span>
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
              <div className={`w-2 h-2 rounded-full ${item.type === 'success' ? 'bg-emerald-300' : item.type === 'info' ? 'bg-blue-300' : 'bg-amber-300'}`}></div>
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

const clients = ['- Select Client -', 'Afiway', 'A2 Bilona Ghee', 'Blue Energy Motors', 'BoxOffice', 'HeadsUpB2b', 'InstaGroup', 'IPL Tech Electric', 'Kaizen Technicals', 'LetsAskDoctor', 'MCI', 'McRAYGOR', 'MindDhara', 'Montra Truck', 'MovoDream', 'Mystery Rooms', 'Puno', 'Sany', 'SID Real Tech', 'Tailworld', 'Tallento', 'Travbeez', 'VZY-Tv', 'Yastudy'];

const routesMap = {
  BoxOffice: '/boxoffice/dashboard',
  Tallento: '/tallento/dashboard',
  Travbeez: '/travebeez/dashboard',
  MCI: '/mci/dashboard',
  Afiway: '/afiway/dashboard',
  Puno: '/puno/dashboard',
  'Montra Truck': '/montra/dashboard',
  Sany: '/sany/dashboard',
  HeadsUpB2b: '/headsupb2b/dashboard',
  Tailworld: '/tailworld/dashboard',
  'Blue Energy Motors': '/blueenergymotors/dashboard',
  InstaGroup: '/instagroup/dashboard',
  'VZY-Tv': '/vzytv/dashboard',
  McRAYGOR: '/mcraygor/dashboard',
  MovoDream: '/movodream/dashboard',
  'A2 Bilona Ghee': '/a2bilonaghee/dashboard',
  Yastudy: '/yastudy/dashboard',
  'Kaizen Technicals': '/kaizen/dashboard',
  'IPL Tech Electric': '/ipltech/dashboard',
  'SID Real Tech': '/sidrealtech/dashboard',
  MindDhara: '/minddhara/dashboard',
  LetsAskDoctor: '/letsaskdoctor/dashboard',
  'Mystery Rooms': '/mysteryrooms/dashboard',
};

export default function BoxOfficeDashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedClient, setSelectedClient] = useState('BoxOffice');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const handleClientSelect = (client) => {
    if (client === '- Select Client -') return;
    setSelectedClient(client);
    setClientDropdownOpen(false);
    const path = routesMap[client];
    if (path) navigate(path);
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans text-slate-900 overflow-hidden">
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:shadow-none lg:border-r border-slate-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-full flex flex-col">
          <div className="h-20 flex items-center px-8 border-b border-slate-50">
            <button onClick={() => navigate('/home')} className="flex items-center cursor-pointer hover:opacity-80">
              <img src="https://grow.gocommercially.com/assets/media/logo/L159551452639.svg" alt="Logo" className="w-8 h-8 mr-3" />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">GO <span style={{ color: 'var(--primary)' }}>Growth</span></span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/boxoffice/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => navigate('/boxoffice/objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => navigate('/boxoffice/initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => navigate('/boxoffice/experiments')} />
            <div className="my-6 border-t border-slate-100 mx-2" />
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white shadow-sm lg:border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 hover:bg-slate-100 rounded-lg text-slate-600"><Menu size={24} /></button>
            <div className="hidden md:flex items-center"><h2 className="text-xl font-bold text-slate-800">Overview</h2></div>
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
                    {clients.map((c, i) => (
                      <button key={i} onClick={() => handleClientSelect(c)} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 ${selectedClient === c ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-700'} ${c === '- Select Client -' ? 'text-slate-400 italic' : ''}`}>{c}</button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <img src={BOXOFFICE_LOGO} alt="BoxOffice" className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-white object-contain p-1" />
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto h-full"><DashboardView /></div>
        </div>
      </main>
    </div>
  );
}
