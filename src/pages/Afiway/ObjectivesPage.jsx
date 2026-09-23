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

// --- Afiway Objectives from Growth Panel Doc ---
const initialObjectivesData = {
  brand: [
    {
      id: 1,
      title: 'Demand Generation',
      progress: 18,
      status: true,
      elements: [
        { name: 'Weekly MQLs', val: '20%', weight: '40%' },
        { name: 'Qualified enquiry %', val: '15%', weight: '35%' },
        { name: 'France / Medical / Degree mix', val: '10%', weight: '25%' },
      ],
    },
    {
      id: 3,
      title: 'Trust & Brand Authority',
      progress: 15,
      status: true,
      elements: [
        { name: 'Parent trust signals', val: '20%', weight: '40%' },
        { name: 'Engagement rate', val: '10%', weight: '35%' },
        { name: 'Referrals', val: '15%', weight: '25%' },
      ],
    },
  ],
  marketing: [
    {
      id: 2,
      title: 'Application Velocity',
      progress: 22,
      status: true,
      elements: [
        { name: 'Enquiry → counselling cycle time', val: '25%', weight: '50%' },
        { name: 'Application completion rate', val: '18%', weight: '50%' },
      ],
    },
    {
      id: 5,
      title: 'ROI Accountability',
      progress: 20,
      status: true,
      elements: [
        { name: 'CAC', val: '20%', weight: '35%' },
        { name: 'ROAS', val: '15%', weight: '35%' },
        { name: 'LTV / margin per cohort', val: '25%', weight: '30%' },
      ],
    },
  ],
  system: [
    {
      id: 4,
      title: 'Market Expansion Readiness',
      progress: 12,
      status: true,
      elements: [
        { name: 'Partner sign-ups (GCC, Africa)', val: '15%', weight: '60%' },
        { name: 'Country-wise lead inflow', val: '5%', weight: '40%' },
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

const ObjectiveCard = ({ item, onUpdateValue, category, objectiveId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const calculatedProgress = calculateProgress(item.elements);
  let colorClass = 'bg-danger';
  if (calculatedProgress >= 70) colorClass = 'bg-success';
  else if (calculatedProgress >= 40) colorClass = 'bg-info';
  else if (calculatedProgress >= 20) colorClass = 'bg-warning';

  const percentageToSlider = (percentage) => {
    const val = parseFloat(String(percentage).replace('%', '')) || 0;
    return Math.round(val / 10) || 1;
  };
  const sliderToPercentage = (sliderValue) => sliderValue * 10;
  const handleSliderChange = (elementIndex, sliderValue) => {
    onUpdateValue(category, objectiveId, elementIndex, `${sliderToPercentage(sliderValue)}%`);
  };

  const getElementBgColor = (index) => {
    const shades = ['bg-blue-50', 'bg-emerald-50', 'bg-amber-50', 'bg-purple-50', 'bg-pink-50', 'bg-cyan-50', 'bg-indigo-50', 'bg-rose-50'];
    return shades[index % shades.length];
  };
  const getSliderColor = (index) => {
    const colors = [
      { main: 'var(--blue)', text: 'var(--blue)' },
      { main: 'var(--success)', text: 'var(--success)' },
      { main: 'var(--warning)', text: 'var(--warning)' },
      { main: 'var(--purple)', text: 'var(--purple)' },
      { main: 'var(--pink)', text: 'var(--pink)' },
      { main: 'var(--cyan)', text: 'var(--cyan)' },
      { main: 'var(--indigo)', text: 'var(--indigo)' },
      { main: 'var(--danger)', text: 'var(--danger)' },
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-4 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-bold text-slate-800 text-[15px] leading-tight pr-4">{item.title}</h4>
          <div
            className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              item.status ? '' : 'bg-slate-200'
            }`}
            style={item.status ? { backgroundColor: 'var(--success)' } : {}}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                item.status ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
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
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors"
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--info)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '')}
          >
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
                  <span className="text-xs font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {el.weight} wgt
                  </span>
                </div>
                <div className="pl-5 space-y-1">
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={sliderValue}
                      onChange={(e) => handleSliderChange(idx, parseInt(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${sliderColor.main} 0%, ${sliderColor.main} ${(sliderValue - 1) * 11.11}%, #e2e8f0 ${(sliderValue - 1) * 11.11}%, #e2e8f0 100%)`,
                      }}
                    />
                    <span className="text-xs font-bold min-w-[35px] text-right" style={{ color: sliderColor.text }}>
                      {sliderToPercentage(sliderValue)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isExpanded && (
        <div className="px-4 py-3 bg-white border-t border-slate-100 flex justify-end gap-2">
          <button className="p-1.5 text-slate-400 rounded-lg hover:bg-blue-50" style={{ color: 'var(--info)' }}>
            <MessageSquare size={16} />
          </button>
          <button className="p-1.5 text-slate-400 rounded-lg hover:bg-amber-50" style={{ color: 'var(--warning)' }}>
            <Settings size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

const FilterItem = ({ icon: Icon, label, active }) => (
  <button
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      active ? 'bg-slate-100 text-slate-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
    }`}
  >
    <Icon size={18} className={active ? 'text-slate-700' : 'text-slate-400'} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const ColumnHeader = ({ title, count, color }) => {
  const getBorderColor = () => {
    if (color === 'border-indigo') return 'var(--indigo)';
    if (color === 'border-success') return 'var(--success)';
    if (color === 'border-warning') return 'var(--warning)';
    if (color === 'border-cyan') return 'var(--cyan)';
    return 'var(--gray)';
  };
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b-2" style={{ borderBottomColor: getBorderColor() }}>
      <div className="flex items-center gap-3">
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg">{count}</span>
      </div>
      <button className="text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-100 rounded-lg">
        <Plus size={20} />
      </button>
    </div>
  );
};

export default function AfiwayObjectivesPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Objectives');
  const [selectedClient, setSelectedClient] = useState('Afiway');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const [objectivesData, setObjectivesData] = useState(() => {
    const savedData = localStorage.getItem('afiwayObjectivesData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        return initialObjectivesData;
      }
    }
    return initialObjectivesData;
  });

  useEffect(() => {
    localStorage.setItem('afiwayObjectivesData', JSON.stringify(objectivesData));
  }, [objectivesData]);

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
    setObjectivesData((prev) => {
      const updated = { ...prev };
      const categoryArray = [...(updated[category] || [])];
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

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans text-slate-900 overflow-hidden">
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:shadow-none lg:border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${
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
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => setActiveTab('Objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => navigate('/afiway/initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => navigate('/afiway/experiments')} />
            <div className="my-6 border-t border-slate-100 mx-2" />
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white shadow-sm lg:border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 hover:bg-slate-100 rounded-lg text-slate-600">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center">
              <h2 className="text-xl font-bold text-slate-800">Objectives Tracker</h2>
              <span className="mx-3 text-slate-300">|</span>
              <span className="text-sm font-medium text-slate-500">In Process</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative">
              <div className="bg-slate-100 rounded-lg px-3 py-2 min-w-[200px]">
                <span className="text-xs font-bold text-slate-500 mr-2 uppercase">Client:</span>
                <button
                  onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                  className="text-sm font-bold text-slate-800 flex items-center gap-1 cursor-pointer w-full justify-between"
                >
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
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 ${
                          selectedClient === c ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-700'
                        } ${c === '- Select Client -' ? 'text-slate-400 italic' : ''}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <img
                src={AFIWAY_LOGO}
                alt="Afiway"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-white object-contain p-1"
              />
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="flex flex-col">
                <ColumnHeader title="Demand & Trust" count={objectivesData.brand?.length ?? 0} color="border-indigo" />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {(objectivesData.brand || []).map((item) => (
                    <ObjectiveCard key={item.id} item={item} onUpdateValue={handleUpdateValue} category="brand" objectiveId={item.id} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <ColumnHeader title="Funnel & ROI" count={objectivesData.marketing?.length ?? 0} color="border-success" />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {(objectivesData.marketing || []).map((item) => (
                    <ObjectiveCard
                      key={item.id}
                      item={item}
                      onUpdateValue={handleUpdateValue}
                      category="marketing"
                      objectiveId={item.id}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <ColumnHeader title="Market Expansion" count={objectivesData.system?.length ?? 0} color="border-warning" />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {(objectivesData.system || []).map((item) => (
                    <ObjectiveCard key={item.id} item={item} onUpdateValue={handleUpdateValue} category="system" objectiveId={item.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
