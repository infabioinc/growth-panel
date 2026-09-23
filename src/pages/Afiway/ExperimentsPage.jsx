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
  FlaskConical,
  XCircle,
  Lightbulb,
  BookOpen,
} from 'lucide-react';

const AFIWAY_LOGO = 'https://afiway.com/assets/images/logo/Dark.png';

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

// --- Afiway Experiments from Growth Panel Doc (grouped into 3 columns) ---
const initialExperimentsData = {
  demandAndContent: [
    {
      id: 1,
      title: 'Meta ads A/B (Parent-trust vs Student-aspiration)',
      progress: 22,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'CPL', val: '20%', weight: '40%' },
        { name: 'Qualified Lead %', val: '25%', weight: '30%' },
        { name: 'CTR', val: '10%', weight: '30%' },
      ],
    },
    {
      id: 2,
      title: 'Google Search campaigns (France internship vs Medical intent)',
      progress: 18,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'CPL', val: '20%', weight: '40%' },
        { name: 'Intent match rate', val: '15%', weight: '60%' },
      ],
    },
    {
      id: 3,
      title: 'Weekly “Verified Pathways” series',
      progress: 20,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Engagement %', val: '25%', weight: '50%' },
        { name: 'Saves, inbound DMs', val: '15%', weight: '50%' },
      ],
    },
    {
      id: 4,
      title: 'Country clarity reels: France / Georgia / USA',
      progress: 24,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Engagement %', val: '28%', weight: '40%' },
        { name: 'Inbound enquiries', val: '20%', weight: '60%' },
      ],
    },
    {
      id: 5,
      title: 'Parent-focused myth-busting carousel',
      progress: 15,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Parent trust signals', val: '15%', weight: '60%' },
        { name: 'Share rate', val: '12%', weight: '40%' },
      ],
    },
    {
      id: 6,
      title: 'Google reviews push with SOP',
      progress: 18,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Review velocity', val: '18%', weight: '60%' },
        { name: 'Rating 4.5+', val: '15%', weight: '40%' },
      ],
    },
    {
      id: 7,
      title: 'Parent testimonials video bank',
      progress: 12,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Trust CTR', val: '12%', weight: '50%' },
        { name: 'Lead quality', val: '10%', weight: '50%' },
      ],
    },
    {
      id: 8,
      title: '"Total cost clarity" calculators',
      progress: 14,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Trust CTR', val: '14%', weight: '50%' },
        { name: 'Drop-off reduction', val: '12%', weight: '50%' },
      ],
    },
  ],
  funnelAndNurture: [
    {
      id: 9,
      title: 'Counselling funnel A/B (Form → WhatsApp vs Form → Call booking)',
      progress: 20,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Counselling booking %', val: '22%', weight: '60%' },
        { name: 'Drop-off', val: '15%', weight: '40%' },
      ],
    },
    {
      id: 10,
      title: 'Application checklist automation',
      progress: 18,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Completion rate', val: '18%', weight: '60%' },
        { name: 'Cycle time', val: '18%', weight: '40%' },
      ],
    },
    {
      id: 11,
      title: 'Drop-off recovery sequences',
      progress: 22,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Reactivation %', val: '20%', weight: '60%' },
        { name: 'Cost per conversion', val: '15%', weight: '40%' },
      ],
    },
    {
      id: 12,
      title: 'Retargeting by intent (Medical vs Hospitality)',
      progress: 20,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'CTR', val: '22%', weight: '50%' },
        { name: 'Cost per conversion', val: '18%', weight: '50%' },
      ],
    },
    {
      id: 13,
      title: 'CRM reactivation for dormant leads',
      progress: 18,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Reactivation %', val: '20%', weight: '70%' },
        { name: 'Counselling bookings', val: '15%', weight: '30%' },
      ],
    },
    {
      id: 14,
      title: 'WhatsApp drip for document completion',
      progress: 17,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Completion rate', val: '18%', weight: '60%' },
        { name: 'Response rate', val: '20%', weight: '40%' },
      ],
    },
    {
      id: 15,
      title: 'Referral program experiments',
      progress: 15,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Enrollments per cohort', val: '15%', weight: '60%' },
        { name: 'Referral share', val: '12%', weight: '40%' },
      ],
    },
    {
      id: 16,
      title: '"Cohort deadline" urgency testing',
      progress: 14,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Conversion uplift', val: '15%', weight: '60%' },
        { name: 'Cohort fill rate', val: '12%', weight: '40%' },
      ],
    },
    {
      id: 17,
      title: 'Scholarship/fee-clarity messaging',
      progress: 16,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Lead quality', val: '18%', weight: '50%' },
        { name: 'Enrollment rate', val: '14%', weight: '50%' },
      ],
    },
  ],
  partnershipsAndAuthority: [
    {
      id: 18,
      title: 'Institute MOUs pilot (top colleges)',
      progress: 15,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Partner leads', val: '15%', weight: '60%' },
        { name: 'Partner CAC', val: '10%', weight: '40%' },
      ],
    },
    {
      id: 19,
      title: 'Hospital/university webinars',
      progress: 14,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Webinar attendance', val: '15%', weight: '50%' },
        { name: 'Lead quality', val: '12%', weight: '50%' },
      ],
    },
    {
      id: 20,
      title: 'Education influencers (micro) collaborations',
      progress: 12,
      status: true,
      tag: 'Active',
      elements: [
        { name: 'Partner leads', val: '12%', weight: '60%' },
        { name: 'Inbound enquiries', val: '10%', weight: '40%' },
      ],
    },
  ],
};

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
      active ? 'text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`}
    style={active ? { backgroundColor: 'var(--primary)', boxShadow: '0 10px 15px -3px rgba(88, 103, 221, 0.1)' } : {}}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'} />
      <span className="font-medium text-[15px]">{label}</span>
    </div>
  </button>
);

const ProgressBar = ({ percentage, colorClass }) => {
  const getColorValue = () => {
    if (colorClass === 'bg-success') return 'var(--success)';
    if (colorClass === 'bg-info') return 'var(--info)';
    if (colorClass === 'bg-warning') return 'var(--warning)';
    if (colorClass === 'bg-danger') return 'var(--danger)';
    return 'var(--gray)';
  };
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

  const percentageToSlider = (p) => Math.round((parseFloat(String(p).replace('%', '')) || 0) / 10) || 1;
  const sliderToPercentage = (v) => v * 10;
  const handleSliderChange = (idx, v) => onUpdateValue(category, objectiveId, idx, `${sliderToPercentage(v)}%`);

  const getElementBgColor = (i) => ['bg-blue-50', 'bg-emerald-50', 'bg-amber-50', 'bg-purple-50', 'bg-pink-50', 'bg-cyan-50', 'bg-indigo-50', 'bg-rose-50'][i % 8];
  const getSliderColor = (i) =>
    [
      { main: 'var(--blue)', text: 'var(--blue)' },
      { main: 'var(--success)', text: 'var(--success)' },
      { main: 'var(--warning)', text: 'var(--warning)' },
      { main: 'var(--purple)', text: 'var(--purple)' },
      { main: 'var(--pink)', text: 'var(--pink)' },
      { main: 'var(--cyan)', text: 'var(--cyan)' },
      { main: 'var(--indigo)', text: 'var(--indigo)' },
      { main: 'var(--danger)', text: 'var(--danger)' },
    ][i % 8];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-4 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-bold text-slate-800 text-[15px] leading-tight pr-4">{item.title}</h4>
            {item.tag && <span className="inline-block mt-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase">{item.tag}</span>}
          </div>
          <div className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent ${item.status ? '' : 'bg-slate-200'}`} style={item.status ? { backgroundColor: 'var(--success)' } : {}}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ${item.status ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase">Success Rate</span>
            <span className="text-sm font-bold text-slate-800">{calculatedProgress}%</span>
          </div>
          <ProgressBar percentage={calculatedProgress} colorClass={colorClass} />
        </div>
        {item.elements?.length > 0 && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-1 text-xs font-semibold text-slate-500">
            {isExpanded ? <ChevronUp size={14} /> : <ChevronRight size={14} />}
            {isExpanded ? 'Hide Elements' : `View Elements (${item.elements.length})`}
          </button>
        )}
      </div>
      {isExpanded && item.elements?.length > 0 && (
        <div className="bg-slate-50 border-t border-slate-100 p-4 space-y-3">
          {item.elements.map((el, idx) => {
            const sliderValue = percentageToSlider(el.val);
            const sc = getSliderColor(idx);
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className={`flex items-center gap-2 text-slate-700 px-3 py-2 rounded-lg ${getElementBgColor(idx)}`}>
                    <span className="font-medium">{el.name}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">{el.weight} wgt</span>
                </div>
                <div className="pl-5 flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={sliderValue}
                    onChange={(e) => handleSliderChange(idx, parseInt(e.target.value))}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${sc.main} 0%, ${sc.main} ${(sliderValue - 1) * 11.11}%, #e2e8f0 ${(sliderValue - 1) * 11.11}%, #e2e8f0 100%)`,
                    }}
                  />
                  <span className="text-xs font-bold min-w-[35px] text-right" style={{ color: sc.text }}>
                    {sliderToPercentage(sliderValue)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isExpanded && (
        <div className="px-4 py-3 bg-white border-t border-slate-100 flex justify-end gap-2">
          <button className="p-1.5 text-slate-400 rounded-lg">
            <MessageSquare size={16} />
          </button>
          <button className="p-1.5 text-slate-400 rounded-lg">
            <Settings size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

const FilterItem = ({ icon: Icon, label, active }) => (
  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${active ? 'bg-slate-100 text-slate-700' : 'text-slate-500 hover:bg-slate-50'}`}>
    <Icon size={18} className={active ? 'text-slate-700' : 'text-slate-400'} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const ColumnHeader = ({ title, count, color, icon: Icon }) => {
  const colors = {
    'border-emerald-300': '#6ee7b7',
    'border-info': 'var(--info)',
    'border-danger': 'var(--danger)',
    'border-warning': 'var(--warning)',
    'border-cyan': 'var(--cyan)',
    'border-purple': 'var(--purple)',
  };
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b-2" style={{ borderBottomColor: colors[color] || 'var(--gray)' }}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
            <Icon size={18} />
          </div>
        )}
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg">{count}</span>
      </div>
      <button className="text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-100 rounded-lg">
        <Plus size={20} />
      </button>
    </div>
  );
};

export default function AfiwayExperimentsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Experiments');
  const [selectedClient, setSelectedClient] = useState('Afiway');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const [experimentsData, setExperimentsData] = useState(() => {
    const savedData = localStorage.getItem('afiwayExperimentsData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        return initialExperimentsData;
      }
    }
    return initialExperimentsData;
  });

  useEffect(() => {
    localStorage.setItem('afiwayExperimentsData', JSON.stringify(experimentsData));
  }, [experimentsData]);

  const clients = [
    '- Select Client -',
    'Afiway',
    'Blue Energy Motors',
    'Fabulous Media',
    'GoCommercially',
    'HeadsUpB2b',
    'Human Touch',
    'India Meets India',
    'Infabio, Inc.',
    'InstaGroup',
    'IPL Tech Electric',
    'MindDhara',
    'Mystery Rooms',
    'Puno',
    'Montra Truck',
    'Sany',
    'Tailworld',
    'VZY-Tv',
    'McRAYGOR',
    'MovoDream',
    'A2 Bilona Ghee',
    'Yastudy',
    'Kaizen Technicals',
    'SID Real Tech',
    'LetsAskDoctor',
  ];

  const handleClientSelect = (client) => {
    if (client === '- Select Client -') return;
    setSelectedClient(client);
    setClientDropdownOpen(false);
    const routes = {
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
    const path = routes[client];
    if (path) navigate(path);
  };

  const handleUpdateValue = (category, objectiveId, elementIndex, newValue) => {
    setExperimentsData((prev) => {
      const updated = { ...prev };
      const categoryArray = [...(updated[category] || [])];
      const idx = categoryArray.findIndex((obj) => obj.id === objectiveId);
      if (idx !== -1) {
        const obj = { ...categoryArray[idx] };
        const elements = [...obj.elements];
        elements[elementIndex] = { ...elements[elementIndex], val: newValue };
        obj.elements = elements;
        categoryArray[idx] = obj;
        updated[category] = categoryArray;
      }
      return updated;
    });
  };

  const columns = [
    { key: 'demandAndContent', title: 'Demand, Content & Trust', color: 'border-info', icon: BookOpen },
    { key: 'funnelAndNurture', title: 'Funnel Optimization & Nurture', color: 'border-emerald-300', icon: Target },
    { key: 'partnershipsAndAuthority', title: 'Partnerships & Authority', color: 'border-purple', icon: FlaskConical },
  ];

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans text-slate-900 overflow-hidden">
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:shadow-none lg:border-r border-slate-200 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-20 flex items-center px-8 border-b border-slate-50">
            <button onClick={() => navigate('/home')} className="flex items-center cursor-pointer hover:opacity-80">
              <img src="https://grow.gocommercially.com/assets/media/logo/L159551452639.svg" alt="Logo" className="w-8 h-8 mr-3" />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">
                GO <span style={{ color: 'var(--primary)' }}>Growth</span>
              </span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/afiway/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => navigate('/afiway/objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => navigate('/afiway/initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => setActiveTab('Experiments')} />
            <div className="my-6 border-t border-slate-100 mx-2" />
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white shadow-sm lg:border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 hover:bg-slate-100 rounded-lg">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center">
              <h2 className="text-xl font-bold text-slate-800">Experiments Tracker</h2>
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
                      <button
                        key={i}
                        onClick={() => handleClientSelect(c)}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 ${selectedClient === c ? 'bg-slate-100 font-semibold' : ''} ${
                          c === '- Select Client -' ? 'text-slate-400 italic' : ''
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <img src={AFIWAY_LOGO} alt="Afiway" className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-white object-contain p-1" />
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
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {columns.map((col) => (
                <div key={col.key} className="flex flex-col">
                  <ColumnHeader title={col.title} count={(experimentsData[col.key] || []).length} color={col.color} icon={col.icon} />
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20 min-h-[200px]">
                    {(experimentsData[col.key] || []).map((item) => (
                      <ExperimentCard key={item.id} item={item} onUpdateValue={handleUpdateValue} category={col.key} objectiveId={item.id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
