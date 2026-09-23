import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Box,
  MessageSquare,
  ListOrdered,
  FileText,
  Settings,
  Menu,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Plus,
  Target,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Cpu,
  PenTool,
  Globe,
} from 'lucide-react';

const WRTS_LOGO = 'https://www.wrtsfranchise.com/wp-content/uploads/2019/08/logofooter.jpg';

const calculateProgress = (elements) => {
  if (!elements || elements.length === 0) return 0;
  let totalProgress = 0;
  elements.forEach(element => {
    const val = parseFloat(element.val.replace('%', '')) || 0;
    const weight = parseFloat(element.weight.replace('%', '')) || 0;
    totalProgress += (val * weight) / 100;
  });
  return Math.round(totalProgress);
};

const initialInitiativesData = {
  infrastructure: [
    { id: 1, title: "Growth Dashboard", progress: 26, status: true, elements: [
      { name: "Website analytics, booking systems, social platforms", val: "28%", weight: "25%" },
      { name: "Daily footfall, memberships, party bookings", val: "26%", weight: "25%" },
      { name: "Campaign performance tracking", val: "25%", weight: "25%" },
      { name: "Live performance dashboard", val: "24%", weight: "25%" }
    ]},
    { id: 2, title: "Attribution Tracking", progress: 24, status: true, elements: [
      { name: "Tracking links across ads and campaigns", val: "26%", weight: "30%" },
      { name: "Channel → visits attribution", val: "24%", weight: "30%" },
      { name: "Campaign → membership signups", val: "23%", weight: "25%" },
      { name: "Source identification", val: "22%", weight: "15%" }
    ]},
    { id: 3, title: "Parent CRM System", progress: 22, status: true, elements: [
      { name: "Visiting families database", val: "24%", weight: "25%" },
      { name: "Membership holders", val: "22%", weight: "25%" },
      { name: "Birthday inquiries", val: "21%", weight: "25%" },
      { name: "Therapy referrals", val: "20%", weight: "25%" }
    ]},
    { id: 4, title: "Automated Follow-ups", progress: 20, status: true, elements: [
      { name: "First visit reminders", val: "22%", weight: "30%" },
      { name: "Membership upgrade triggers", val: "20%", weight: "30%" },
      { name: "Birthday reminders", val: "19%", weight: "25%" },
      { name: "Event & program nudges", val: "18%", weight: "15%" }
    ]}
  ],
  dataLoops: [
    { id: 5, title: "Weekly Growth Panel Meeting", progress: 28, status: true, elements: [
      { name: "Footfall trends review", val: "30%", weight: "30%" },
      { name: "Campaign outcomes review", val: "28%", weight: "30%" },
      { name: "Experiment results", val: "27%", weight: "25%" },
      { name: "Action items", val: "26%", weight: "15%" }
    ]},
    { id: 6, title: "Monthly Performance Report", progress: 24, status: true, elements: [
      { name: "Marketing ROI evaluation", val: "26%", weight: "30%" },
      { name: "Membership growth", val: "24%", weight: "30%" },
      { name: "Booking & footfall trends", val: "23%", weight: "25%" },
      { name: "Channel performance", val: "22%", weight: "15%" }
    ]},
    { id: 7, title: "Quarterly Strategy Review", progress: 18, status: true, elements: [
      { name: "Growth channel optimization", val: "22%", weight: "35%" },
      { name: "Partnership prioritization", val: "18%", weight: "35%" },
      { name: "Strategy documentation", val: "16%", weight: "30%" }
    ]}
  ],
  teamStructure: [
    { id: 8, title: "Growth Lead (External / NS)", progress: 28, status: true, elements: [
      { name: "Strategy, experiments, growth priorities", val: "30%", weight: "35%" },
      { name: "Experiment prioritization", val: "28%", weight: "35%" },
      { name: "Panel oversight", val: "26%", weight: "30%" }
    ]},
    { id: 9, title: "Center Manager", progress: 26, status: true, elements: [
      { name: "Operational alignment with marketing", val: "28%", weight: "35%" },
      { name: "Center-level execution", val: "26%", weight: "35%" },
      { name: "Footfall & booking ops", val: "24%", weight: "30%" }
    ]},
    { id: 10, title: "Digital Marketing Manager", progress: 24, status: true, elements: [
      { name: "Campaigns & parent acquisition channels", val: "26%", weight: "35%" },
      { name: "Paid & organic channels", val: "24%", weight: "35%" },
      { name: "Attribution & reporting", val: "22%", weight: "30%" }
    ]},
    { id: 11, title: "Community Engagement Lead", progress: 22, status: true, elements: [
      { name: "Parent networks and events", val: "24%", weight: "35%" },
      { name: "Workshops & community content", val: "22%", weight: "35%" },
      { name: "Referral & advocacy programs", val: "20%", weight: "30%" }
    ]},
    { id: 12, title: "Partnership Manager", progress: 24, status: true, elements: [
      { name: "Therapist collaborations", val: "26%", weight: "35%" },
      { name: "School tie-ups", val: "24%", weight: "35%" },
      { name: "Cross-referral programs", val: "22%", weight: "30%" }
    ]}
  ]
};

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${active ? 'text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`} style={active ? { backgroundColor: 'var(--primary)', boxShadow: '0 10px 15px -3px rgba(88, 103, 221, 0.1)' } : {}}>
    <div className="flex items-center gap-3">
      <Icon size={20} className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'} />
      <span className="font-medium text-[15px]">{label}</span>
    </div>
  </button>
);

const ProgressBar = ({ percentage, colorClass }) => {
  const getColorValue = () => { if (colorClass === 'bg-success') return 'var(--success)'; if (colorClass === 'bg-info') return 'var(--info)'; if (colorClass === 'bg-warning') return 'var(--warning)'; if (colorClass === 'bg-danger') return 'var(--danger)'; return 'var(--gray)'; };
  return <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden"><div className="h-2.5 rounded-full transition-all duration-500" style={{ width: `${percentage}%`, backgroundColor: getColorValue() }}></div></div>;
};

const ObjectiveCard = ({ item, onUpdateValue, category, objectiveId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const calculatedProgress = calculateProgress(item.elements);
  let colorClass = 'bg-danger';
  if (calculatedProgress >= 70) colorClass = 'bg-success'; else if (calculatedProgress >= 40) colorClass = 'bg-info'; else if (calculatedProgress >= 20) colorClass = 'bg-warning';
  const percentageToSlider = (p) => Math.round((parseFloat(p.replace('%', '')) || 0) / 10) || 1;
  const sliderToPercentage = (v) => v * 10;
  const handleSliderChange = (idx, v) => onUpdateValue(category, objectiveId, idx, `${sliderToPercentage(v)}%`);
  const getElementBgColor = (i) => ['bg-blue-50', 'bg-emerald-50', 'bg-amber-50', 'bg-purple-50', 'bg-pink-50', 'bg-cyan-50', 'bg-indigo-50', 'bg-rose-50'][i % 8];
  const getSliderColor = (i) => [{ main: 'var(--blue)', text: 'var(--blue)' }, { main: 'var(--success)', text: 'var(--success)' }, { main: 'var(--warning)', text: 'var(--warning)' }, { main: 'var(--purple)', text: 'var(--purple)' }, { main: 'var(--pink)', text: 'var(--pink)' }, { main: 'var(--cyan)', text: 'var(--cyan)' }, { main: 'var(--indigo)', text: 'var(--indigo)' }, { main: 'var(--danger)', text: 'var(--danger)' }][i % 8];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-4 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-bold text-slate-800 text-[15px] leading-tight pr-4">{item.title}</h4>
          <div className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent ${item.status ? '' : 'bg-slate-200'}`} style={item.status ? { backgroundColor: 'var(--success)' } : {}}>
            <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ${item.status ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Success Rate</span>
            <span className="text-sm font-bold text-slate-800">{calculatedProgress}%</span>
          </div>
          <ProgressBar percentage={calculatedProgress} colorClass={colorClass} />
        </div>
        {item.elements.length > 0 && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-1 text-xs font-semibold text-slate-500">
            {isExpanded ? <ChevronUp size={14} /> : <ChevronRight size={14} />}
            {isExpanded ? 'Hide Elements' : `View Elements (${item.elements.length})`}
          </button>
        )}
      </div>
      {isExpanded && item.elements.length > 0 && (
        <div className="bg-slate-50 border-t border-slate-100 p-4 space-y-3">
          {item.elements.map((el, idx) => {
            const sliderValue = percentageToSlider(el.val);
            const sc = getSliderColor(idx);
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className={`flex items-center gap-2 text-slate-700 px-3 py-2 rounded-lg ${getElementBgColor(idx)}`}><span className="font-medium">{el.name}</span></div>
                  <span className="text-xs font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">{el.weight} wgt</span>
                </div>
                <div className="pl-5">
                  <div className="flex items-center gap-3">
                    <input type="range" min="1" max="10" step="1" value={sliderValue} onChange={(e) => handleSliderChange(idx, parseInt(e.target.value))} className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, ${sc.main} 0%, ${sc.main} ${(sliderValue - 1) * 11.11}%, #e2e8f0 ${(sliderValue - 1) * 11.11}%, #e2e8f0 100%)` }} />
                    <span className="text-xs font-bold min-w-[35px] text-right" style={{ color: sc.text }}>{sliderToPercentage(sliderValue)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isExpanded && <div className="px-4 py-3 bg-white border-t border-slate-100 flex justify-end gap-2"><button className="p-1.5 text-slate-400 rounded-lg"><MessageSquare size={16} /></button><button className="p-1.5 text-slate-400 rounded-lg"><Settings size={16} /></button></div>}
    </div>
  );
};

const FilterItem = ({ icon: Icon, label, active }) => (
  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${active ? 'bg-slate-100 text-slate-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
    <Icon size={18} className={active ? 'text-slate-700' : 'text-slate-400'} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const ColumnHeader = ({ title, count, color, icon: Icon }) => {
  const getBorderColor = () => { if (color === 'border-cyan') return 'var(--cyan)'; if (color === 'border-pink') return 'var(--pink)'; if (color === 'border-purple') return 'var(--purple)'; return 'var(--gray)'; };
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b-2" style={{ borderBottomColor: getBorderColor() }}>
      <div className="flex items-center gap-3">
        {Icon && <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500"><Icon size={18} /></div>}
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg">{count}</span>
      </div>
      <button className="text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-100 rounded-lg"><Plus size={20} /></button>
    </div>
  );
};

const InitiativesView = ({ initiativesData, onUpdateValue }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
    <div className="flex flex-col h-full">
      <ColumnHeader title="Infrastructure Setup" count={initiativesData.infrastructure.length} color="border-cyan" icon={Cpu} />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {initiativesData.infrastructure.map(item => <ObjectiveCard key={item.id} item={item} onUpdateValue={onUpdateValue} category="infrastructure" objectiveId={item.id} />)}
      </div>
    </div>
    <div className="flex flex-col h-full">
      <ColumnHeader title="Data Loops" count={initiativesData.dataLoops.length} color="border-pink" icon={PenTool} />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {initiativesData.dataLoops.map(item => <ObjectiveCard key={item.id} item={item} onUpdateValue={onUpdateValue} category="dataLoops" objectiveId={item.id} />)}
      </div>
    </div>
    <div className="flex flex-col h-full">
      <ColumnHeader title="Team Structure" count={initiativesData.teamStructure.length} color="border-purple" icon={Globe} />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {initiativesData.teamStructure.map(item => <ObjectiveCard key={item.id} item={item} onUpdateValue={onUpdateValue} category="teamStructure" objectiveId={item.id} />)}
      </div>
    </div>
  </div>
);

export default function InitiativesPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Initiatives');
  const [selectedClient, setSelectedClient] = useState('WRTS Gym');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [initiativesData, setInitiativesData] = useState(() => {
    const saved = localStorage.getItem('wrtsgymInitiativesData');
    if (saved) try { const p = JSON.parse(saved); if (p.infrastructure && Array.isArray(p.infrastructure)) return p; } catch (e) {}
    return initialInitiativesData;
  });

  useEffect(() => { localStorage.setItem('wrtsgymInitiativesData', JSON.stringify(initiativesData)); }, [initiativesData]);

  const handleUpdateValue = (category, objectiveId, elementIndex, newValue) => {
    setInitiativesData(prev => {
      const updated = { ...prev };
      const arr = [...updated[category]];
      const i = arr.findIndex(obj => obj.id === objectiveId);
      if (i !== -1) {
        const obj = { ...arr[i], elements: [...arr[i].elements] };
        obj.elements[elementIndex] = { ...obj.elements[elementIndex], val: newValue };
        arr[i] = obj;
        updated[category] = arr;
      }
      return updated;
    });
  };

  const clients = ['- Select Client -', 'WRTS Gym', 'Bonfit', 'Blue Energy Motors', 'HeadsUpB2b', 'MovoDream', 'Puno', 'Montra Truck', 'Sany', 'Tailworld', 'VZY-Tv', 'McRAYGOR', 'A2 Bilona Ghee', 'Yastudy', 'Kaizen Technicals'];
  const navClient = (name) => {
    const routes = { 'WRTS Gym': '/wrtsgym/dashboard', 'Bonfit': '/bonfit/dashboard', 'Blue Energy Motors': '/blueenergymotors/dashboard', 'HeadsUpB2b': '/headsupb2b/dashboard', 'MovoDream': '/movodream/dashboard', 'Puno': '/puno/dashboard', 'Montra Truck': '/montra/dashboard', 'Sany': '/sany/dashboard', 'Tailworld': '/tailworld/dashboard', 'VZY-Tv': '/vzytv/dashboard', 'McRAYGOR': '/mcraygor/dashboard', 'A2 Bilona Ghee': '/a2bilonaghee/dashboard', 'Yastudy': '/yastudy/dashboard', 'Kaizen Technicals': '/kaizen/dashboard' };
    if (routes[name]) navigate(routes[name]);
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans text-slate-900 overflow-hidden">
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:shadow-none lg:border-r border-slate-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-full flex flex-col">
          <div className="h-20 flex items-center px-8 border-b border-slate-50">
            <button onClick={() => navigate('/home')} className="flex items-center cursor-pointer hover:opacity-80">
              <img src={WRTS_LOGO} alt="WRTS Logo" className="w-8 h-8 mr-3 object-contain" />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">GO <span style={{ color: 'var(--primary)' }}>Growth</span></span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/wrtsgym/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => navigate('/wrtsgym/objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={true} onClick={() => {}} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => navigate('/wrtsgym/experiments')} />
            <div className="my-6 border-t border-slate-100 mx-2"></div>
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white shadow-sm lg:border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 hover:bg-slate-100 rounded-lg text-slate-600"><Menu size={24} /></button>
            <div className="hidden md:flex items-center">
              <h2 className="text-xl font-bold text-slate-800">Initiatives Tracker</h2>
              <span className="mx-3 text-slate-300">|</span>
              <span className="text-sm font-medium text-slate-500">In Process</span>
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
                    {clients.map((c, i) => (
                      <button key={i} onClick={() => { if (c !== '- Select Client -') { setSelectedClient(c); navClient(c); } setClientDropdownOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 ${selectedClient === c ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-700'} ${c === '- Select Client -' ? 'text-slate-400 italic' : ''}`}>{c}</button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <img src={WRTS_LOGO} alt="WRTS" className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-white p-1 object-contain" />
            </div>
          </div>
        </header>
        <div className="bg-white border-b border-slate-200 px-6 lg:px-10 py-3">
          <div className="flex items-center gap-6">
            <FilterItem icon={FileText} label="In Process" active={true} />
            <FilterItem icon={CheckCircle2} label="Successful" active={false} />
            <FilterItem icon={XCircle} label="Failed" active={false} />
            <FilterItem icon={Lightbulb} label="Ideas" active={false} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto h-full">
            <InitiativesView initiativesData={initiativesData} onUpdateValue={handleUpdateValue} />
          </div>
        </div>
      </main>
    </div>
  );
}
