import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Box,
  ListOrdered,
  FileText,
  Settings,
  Menu,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  MessageSquare,
  Plus,
  Target,
  CheckCircle2,
  XCircle,
  Lightbulb,
  DollarSign,
  Eye,
  FlaskConical,
} from 'lucide-react';

const calculateProgress = (elements) => {
  if (!elements || elements.length === 0) return 0;
  let totalProgress = 0;
  elements.forEach((element) => {
    const val = parseFloat(String(element.val).replace('%', '')) || 0;
    const weight = parseFloat(String(element.weight).replace('%', '')) || 0;
    totalProgress += (val * weight) / 100;
  });
  return Math.round(totalProgress);
};

const initialExperimentsData = {
  enterpriseDemand: [
    { id: 1, title: 'LinkedIn ABM campaigns (HR & Risk Heads)', progress: 20, status: true, tag: 'In Process', elements: [{ name: 'Identify highest-converting industries', val: '22%', weight: '50%' }, { name: 'Metric: CPL, SQL rate', val: '20%', weight: '50%' }] },
    { id: 2, title: 'Corporate webinar: Employee Safety Compliance 2026', progress: 18, status: true, tag: 'In Process', elements: [{ name: 'Generate qualified enterprise leads', val: '20%', weight: '50%' }, { name: 'Metric: Webinar SQL', val: '18%', weight: '50%' }] },
    { id: 3, title: 'Industry-specific landing pages', progress: 16, status: true, tag: 'Ideas', elements: [{ name: 'Segment conversion lift', val: '18%', weight: '50%' }, { name: 'Metric: Conversion rate', val: '16%', weight: '50%' }] },
  ],
  trustCredibility: [
    { id: 4, title: 'Publish Monitoring SLA (response time transparency)', progress: 22, status: true, tag: 'In Process', elements: [{ name: 'Increase institutional trust', val: '24%', weight: '50%' }, { name: 'Metric: Enterprise inquiry lift', val: '22%', weight: '50%' }] },
    { id: 5, title: '"Inside the Monitoring Desk" video series', progress: 18, status: true, tag: 'In Process', elements: [{ name: 'Humanize infrastructure', val: '20%', weight: '50%' }, { name: 'Metric: Engagement rate', val: '18%', weight: '50%' }] },
    { id: 6, title: 'Case Simulation Campaign', progress: 16, status: true, tag: 'Ideas', elements: [{ name: 'Demonstrate escalation logic', val: '18%', weight: '50%' }, { name: 'Metric: Watch time, inbound demo requests', val: '16%', weight: '50%' }] },
  ],
  consumerSubscription: [
    { id: 7, title: 'Emotional vs Infrastructure positioning ads', progress: 20, status: true, tag: 'In Process', elements: [{ name: 'Identify dominant conversion angle', val: '22%', weight: '50%' }, { name: 'Metric: CPA', val: '20%', weight: '50%' }] },
    { id: 8, title: 'Parent-focused landing page', progress: 18, status: true, tag: 'In Process', elements: [{ name: 'Target paying decision-maker', val: '20%', weight: '50%' }, { name: 'Metric: Conversion rate', val: '18%', weight: '50%' }] },
    { id: 9, title: 'Referral incentives for family plans', progress: 16, status: true, tag: 'Ideas', elements: [{ name: 'Reduce paid acquisition', val: '18%', weight: '50%' }, { name: 'Metric: Referral rate', val: '16%', weight: '50%' }] },
  ],
  retargetingAutomation: [
    { id: 10, title: 'CRM-based nurture sequences', progress: 18, status: true, tag: 'In Process', elements: [{ name: 'Increase trial → paid conversion', val: '20%', weight: '50%' }, { name: 'Metric: Activation rate', val: '18%', weight: '50%' }] },
    { id: 11, title: 'Dynamic retargeting (enterprise visitors)', progress: 16, status: true, tag: 'In Process', elements: [{ name: 'Capture delayed decision makers', val: '18%', weight: '50%' }, { name: 'Metric: SQL per retargeting cohort', val: '16%', weight: '50%' }] },
    { id: 12, title: 'Dormant subscriber reactivation', progress: 14, status: true, tag: 'Ideas', elements: [{ name: 'Reduce churn', val: '16%', weight: '50%' }, { name: 'Metric: Reactivation cost', val: '14%', weight: '50%' }] },
  ],
  prInfluence: [
    { id: 13, title: 'Co-authored whitepaper: India\'s Missing Emergency Layer', progress: 20, status: true, tag: 'In Process', elements: [{ name: 'Category ownership', val: '22%', weight: '50%' }, { name: 'Metric: Media mentions', val: '20%', weight: '50%' }] },
    { id: 14, title: 'Security + AI conference speaker placements', progress: 18, status: true, tag: 'In Process', elements: [{ name: 'Authority building', val: '20%', weight: '50%' }, { name: 'Metric: Event leads', val: '18%', weight: '50%' }] },
    { id: 15, title: 'Corporate safety compliance article placements', progress: 16, status: true, tag: 'Ideas', elements: [{ name: 'Enterprise credibility', val: '18%', weight: '50%' }, { name: 'Metric: Backlinks + inquiries', val: '16%', weight: '50%' }] },
  ],
  partnerChannel: [
    { id: 16, title: 'Corporate insurance partnerships', progress: 16, status: true, tag: 'In Process', elements: [{ name: 'Reduce enterprise friction', val: '18%', weight: '50%' }, { name: 'Metric: Partner leads', val: '16%', weight: '50%' }] },
    { id: 17, title: 'Security agency alliances (pilot regions)', progress: 14, status: true, tag: 'Ideas', elements: [{ name: 'Strengthen response perception', val: '16%', weight: '50%' }, { name: 'Metric: Regional contracts', val: '14%', weight: '50%' }] },
    { id: 18, title: 'Campus partnerships', progress: 14, status: true, tag: 'Ideas', elements: [{ name: 'Scale student segment', val: '16%', weight: '50%' }, { name: 'Metric: Campus signups', val: '14%', weight: '50%' }] },
  ],
  investorVisibility: [
    { id: 19, title: 'Monthly Security Impact Dashboard', progress: 18, status: true, tag: 'In Process', elements: [{ name: 'Showcase operational maturity', val: '20%', weight: '50%' }, { name: 'Metric: Investor meetings', val: '18%', weight: '50%' }] },
    { id: 20, title: 'Quarterly Security Index Report', progress: 16, status: true, tag: 'In Process', elements: [{ name: 'Media + institutional traction', val: '18%', weight: '50%' }, { name: 'Metric: Media pickups', val: '16%', weight: '50%' }] },
    { id: 21, title: 'Global expansion narrative refresh', progress: 14, status: true, tag: 'Ideas', elements: [{ name: 'Position for MENA/SEA entry', val: '16%', weight: '50%' }, { name: 'Metric: Strategic intros', val: '14%', weight: '50%' }] },
  ],
};

const DEEPHORIZON_LOGO = 'https://www.deephorizon.io/images/logotransparent.png';

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

const ProgressBar = ({ percentage, colorClass }) => {
  const getColorValue = () => { if (colorClass === 'bg-success') return 'var(--success)'; if (colorClass === 'bg-info') return 'var(--info)'; if (colorClass === 'bg-warning') return 'var(--warning)'; if (colorClass === 'bg-danger') return 'var(--danger)'; return 'var(--gray)'; };
  return (
    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
      <div className="h-2.5 rounded-full transition-all duration-500" style={{ width: `${percentage}%`, backgroundColor: getColorValue() }}></div>
    </div>
  );
};

const ExperimentCard = ({ item, onUpdateValue, category, objectiveId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const calculatedProgress = calculateProgress(item.elements);
  let colorClass = 'bg-danger';
  if (calculatedProgress >= 70) colorClass = 'bg-success';
  else if (calculatedProgress >= 40) colorClass = 'bg-info';
  else if (calculatedProgress >= 20) colorClass = 'bg-warning';
  const percentageToSlider = (percentage) => Math.round((parseFloat(String(percentage).replace('%', '')) || 0) / 10) || 1;
  const sliderToPercentage = (sliderValue) => sliderValue * 10;
  const handleSliderChange = (elementIndex, sliderValue) => onUpdateValue(category, objectiveId, elementIndex, `${sliderToPercentage(sliderValue)}%`);
  const getElementBgColor = (index) => ['bg-blue-50', 'bg-emerald-50', 'bg-amber-50', 'bg-purple-50', 'bg-pink-50', 'bg-cyan-50', 'bg-indigo-50', 'bg-rose-50'][index % 8];
  const getSliderColor = (index) => [{ main: 'var(--blue)', text: 'var(--blue)' }, { main: 'var(--success)', text: 'var(--success)' }, { main: 'var(--warning)', text: 'var(--warning)' }, { main: 'var(--purple)', text: 'var(--purple)' }, { main: 'var(--cyan)', text: 'var(--cyan)' }, { main: 'var(--indigo)', text: 'var(--indigo)' }, { main: 'var(--danger)', text: 'var(--danger)' }][index % 7];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-4 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-bold text-slate-800 text-[15px] leading-tight pr-4">{item.title}</h4>
            {item.tag && <span className="inline-block mt-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{item.tag}</span>}
          </div>
          <div className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${item.status ? '' : 'bg-slate-200'}`} style={item.status ? { backgroundColor: 'var(--success)' } : {}}>
            <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.status ? 'translate-x-4' : 'translate-x-0'}`} />
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
          <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors" onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--info)')} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronRight size={14} />}
            {isExpanded ? 'Hide Elements' : `View Elements (${item.elements.length})`}
          </button>
        )}
      </div>
      {isExpanded && item.elements.length > 0 && (
        <div className="bg-slate-50 border-t border-slate-100 p-4 space-y-3">
          {item.elements.map((el, idx) => {
            const sliderValue = percentageToSlider(el.val);
            const sliderColor = getSliderColor(idx);
            return (
              <div key={idx} className="space-y-2 group">
                <div className="flex items-center justify-between text-sm">
                  <div className={`flex items-center gap-2 text-slate-700 px-3 py-2 rounded-lg ${getElementBgColor(idx)}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span className="font-medium">{el.name}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">{el.weight} wgt</span>
                </div>
                <div className="pl-5 space-y-1">
                  <div className="flex items-center gap-3">
                    <input type="range" min="1" max="10" step="1" value={sliderValue} onChange={(e) => handleSliderChange(idx, parseInt(e.target.value))} className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, ${sliderColor.main} 0%, ${sliderColor.main} ${(sliderValue - 1) * 11.11}%, #e2e8f0 ${(sliderValue - 1) * 11.11}%, #e2e8f0 100%)` }} />
                    <span className="text-xs font-bold min-w-[35px] text-right" style={{ color: sliderColor.text }}>{sliderToPercentage(sliderValue)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isExpanded && (
        <div className="px-4 py-3 bg-white border-t border-slate-100 flex justify-end gap-2">
          <button className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-50 rounded-lg transition-colors"><MessageSquare size={16} /></button>
          <button className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-50 rounded-lg transition-colors"><Settings size={16} /></button>
        </div>
      )}
    </div>
  );
};

const FilterItem = ({ icon: Icon, label, active }) => (
  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${active ? 'bg-slate-100 text-slate-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
    <Icon size={18} className={active ? 'text-slate-700' : 'text-slate-400'} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const ColumnHeader = ({ title, count, color, icon: Icon }) => {
  const getBorderColor = () => { if (color === 'border-success') return 'var(--success)'; if (color === 'border-info') return 'var(--info)'; if (color === 'border-danger') return 'var(--danger)'; return 'var(--gray)'; };
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b-2" style={{ borderBottomColor: getBorderColor() }}>
      <div className="flex items-center gap-3">
        {Icon && <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500"><Icon size={18} /></div>}
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg">{count}</span>
      </div>
      <button className="text-slate-400 hover:text-slate-700 transition-colors p-1 hover:bg-slate-100 rounded-lg"><Plus size={20} /></button>
    </div>
  );
};

const clients = ['- Select Client -', 'Afiway', 'A2 Bilona Ghee', 'Blue Energy Motors', 'HeadsUpB2b', 'InstaGroup', 'IPL Tech Electric', 'Kaizen Technicals', 'McRAYGOR', 'Montra Truck', 'MovoDream', 'Puno', 'Sany', 'Tailworld', 'BoxOffice', 'DeepHorizon', 'Tallento', 'Travbeez', 'VZY-Tv', 'Yastudy'];

export default function DeepHorizonExperimentsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Experiments');
  const [selectedClient, setSelectedClient] = useState('DeepHorizon');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [experimentsData, setExperimentsData] = useState(() => {
    try {
      const savedData = localStorage.getItem('deepHorizonExperimentsData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        const cats = ['enterpriseDemand', 'trustCredibility', 'consumerSubscription', 'retargetingAutomation', 'prInfluence', 'partnerChannel', 'investorVisibility'];
        if (cats.every((cat) => Array.isArray(parsed[cat]))) return parsed;
      }
    } catch (e) {}
    return initialExperimentsData;
  });

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('deepHorizonExperimentsData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        const hasValid = parsed.enterpriseDemand && parsed.enterpriseDemand.some((obj) => obj.title && obj.title.includes('LinkedIn'));
        if (!hasValid) {
          localStorage.setItem('deepHorizonExperimentsData', JSON.stringify(initialExperimentsData));
          setExperimentsData(initialExperimentsData);
        }
      }
    } catch (e) {
      localStorage.setItem('deepHorizonExperimentsData', JSON.stringify(initialExperimentsData));
      setExperimentsData(initialExperimentsData);
    }
  }, []);
  useEffect(() => { localStorage.setItem('deepHorizonExperimentsData', JSON.stringify(experimentsData)); }, [experimentsData]);

  const handleUpdateValue = (category, objectiveId, elementIndex, newValue) => {
    setExperimentsData((prev) => {
      const updated = { ...prev };
      const categoryArray = [...updated[category]];
      const objectiveIndex = categoryArray.findIndex((obj) => obj.id === objectiveId);
      if (objectiveIndex !== -1) {
        const updatedObjective = { ...categoryArray[objectiveIndex] };
        const updatedElements = [...updatedObjective.elements];
        updatedElements[elementIndex] = { ...updatedElements[elementIndex], val: newValue };
        updatedObjective.elements = updatedElements;
        categoryArray[objectiveIndex] = updatedObjective;
        updated[category] = categoryArray;
      }
      return updated;
    });
  };

  const handleClientSelect = (client) => {
    if (client === '- Select Client -') return;
    setSelectedClient(client);
    setClientDropdownOpen(false);
    const routes = { BoxOffice: '/boxoffice/dashboard', DeepHorizon: '/deephorizon/dashboard', Tallento: '/tallento/dashboard', Travbeez: '/travebeez/dashboard', McRAYGOR: '/mcraygor/dashboard', Puno: '/puno/dashboard', 'Montra Truck': '/montra/dashboard', Sany: '/sany/dashboard', HeadsUpB2b: '/headsupb2b/dashboard', Tailworld: '/tailworld/dashboard', 'Blue Energy Motors': '/blueenergymotors/dashboard', InstaGroup: '/instagroup/dashboard', 'VZY-Tv': '/vzytv/dashboard', MovoDream: '/movodream/dashboard', 'A2 Bilona Ghee': '/a2bilonaghee/dashboard', Yastudy: '/yastudy/dashboard', 'Kaizen Technicals': '/kaizen/dashboard', 'IPL Tech Electric': '/ipltech/dashboard', Afiway: '/afiway/dashboard' };
    const path = routes[client];
    if (path) navigate(path);
  };

  const enterpriseDemand = experimentsData?.enterpriseDemand || [];
  const trustCredibility = experimentsData?.trustCredibility || [];
  const consumerSubscription = experimentsData?.consumerSubscription || [];
  const retargetingAutomation = experimentsData?.retargetingAutomation || [];
  const prInfluence = experimentsData?.prInfluence || [];
  const partnerChannel = experimentsData?.partnerChannel || [];
  const investorVisibility = experimentsData?.investorVisibility || [];

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
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/deephorizon/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => navigate('/deephorizon/objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => navigate('/deephorizon/initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => setActiveTab('Experiments')} />
            <div className="my-6 border-t border-slate-100 mx-2" />
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white shadow-sm lg:border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 hover:bg-slate-100 rounded-lg text-slate-600"><Menu size={24} /></button>
            <div className="hidden md:flex items-center"><h2 className="text-xl font-bold text-slate-800">Experiments Tracker</h2><span className="mx-3 text-slate-300">|</span><span className="text-sm font-medium text-slate-500">In Process</span></div>
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
              <img src={DEEPHORIZON_LOGO} alt="Deep Horizon" className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-white object-contain p-1" />
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
              <div className="flex flex-col h-full">
                <ColumnHeader title="Enterprise & Trust" count={enterpriseDemand.length + trustCredibility.length} color="border-success" icon={DollarSign} />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {enterpriseDemand.map((item) => <ExperimentCard key={item.id} item={item} onUpdateValue={handleUpdateValue} category="enterpriseDemand" objectiveId={item.id} />)}
                  {trustCredibility.map((item) => <ExperimentCard key={item.id} item={item} onUpdateValue={handleUpdateValue} category="trustCredibility" objectiveId={item.id} />)}
                </div>
              </div>
              <div className="flex flex-col h-full">
                <ColumnHeader title="Subscription & Retargeting" count={consumerSubscription.length + retargetingAutomation.length} color="border-info" icon={Eye} />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {consumerSubscription.map((item) => <ExperimentCard key={item.id} item={item} onUpdateValue={handleUpdateValue} category="consumerSubscription" objectiveId={item.id} />)}
                  {retargetingAutomation.map((item) => <ExperimentCard key={item.id} item={item} onUpdateValue={handleUpdateValue} category="retargetingAutomation" objectiveId={item.id} />)}
                </div>
              </div>
              <div className="flex flex-col h-full">
                <ColumnHeader title="PR, Partner & Investor" count={prInfluence.length + partnerChannel.length + investorVisibility.length} color="border-danger" icon={FlaskConical} />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {prInfluence.map((item) => <ExperimentCard key={item.id} item={item} onUpdateValue={handleUpdateValue} category="prInfluence" objectiveId={item.id} />)}
                  {partnerChannel.map((item) => <ExperimentCard key={item.id} item={item} onUpdateValue={handleUpdateValue} category="partnerChannel" objectiveId={item.id} />)}
                  {investorVisibility.map((item) => <ExperimentCard key={item.id} item={item} onUpdateValue={handleUpdateValue} category="investorVisibility" objectiveId={item.id} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
