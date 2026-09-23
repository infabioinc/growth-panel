import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Box,
  ListOrdered,
  Settings,
  Menu,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Plus,
  Target,
  Building2,
  Activity,
  Users,
  FileText,
  Globe,
  MessageSquare
} from 'lucide-react';

// --- Helper: weighted progress ---
const calculateProgress = (elements) => {
  if (!elements || elements.length === 0) return 0;

  let total = 0;
  elements.forEach((el) => {
    const val = parseFloat(el.val.replace('%', '')) || 0;
    const weight = parseFloat(el.weight.replace('%', '')) || 0;
    total += (val * weight) / 100;
  });

  return Math.round(total);
};

// --- Initial Data (Dynamic slider-ready) ---
const initialInitiativesData = {
  infrastructure: [
    {
      id: 1,
      title: 'Growth Dashboard Setup',
      status: true,
      elements: [
        { name: 'Channel & video-level KPIs mapped', val: '40%', weight: '30%' },
        { name: 'Shorts vs long-form attribution visible', val: '30%', weight: '25%' },
        { name: 'Engaged user cohorts defined', val: '30%', weight: '25%' },
        { name: 'Reporting cadence locked', val: '30%', weight: '20%' },
      ],
    },
    {
      id: 2,
      title: 'Attribution Tracking',
      status: true,
      elements: [
        { name: 'Source channels mapped', val: '20%', weight: '30%' },
        { name: 'Click paths into series', val: '22%', weight: '25%' },
        { name: 'Drop-off points logged', val: '25%', weight: '25%' },
        { name: 'Shorts-to-long tracking', val: '20%', weight: '20%' },
      ],
    },
    {
      id: 3,
      title: 'MQL → SQL Framework',
      status: true,
      elements: [
        { name: 'Lead intent categories', val: '25%', weight: '30%' },
        { name: 'WhatsApp + forms tracking', val: '28%', weight: '25%' },
        { name: 'Consult signals mapping', val: '22%', weight: '25%' },
        { name: 'Pipeline reporting', val: '25%', weight: '20%' },
      ],
    },
    {
      id: 4,
      title: 'Content Tagging System',
      status: true,
      elements: [
        { name: 'Taxonomy for pillars', val: '30%', weight: '30%' },
        { name: 'Intent stages tagging', val: '25%', weight: '25%' },
        { name: 'Format & hook tags', val: '20%', weight: '25%' },
        { name: 'Top 20% mapped', val: '28%', weight: '20%' },
      ],
    },
  ],

  dataLoops: [
    {
      id: 5,
      title: 'Weekly Growth Panel Review',
      status: true,
      elements: [
        { name: 'Top formats tracked weekly', val: '30%', weight: '30%' },
        { name: 'Retention cliffs logged', val: '28%', weight: '25%' },
        { name: 'Experiment status updated', val: '32%', weight: '25%' },
        { name: 'Actions assigned', val: '30%', weight: '20%' },
      ],
    },
    {
      id: 6,
      title: 'Monthly Demand & ROI Report',
      status: true,
      elements: [
        { name: 'Trust signals report', val: '25%', weight: '30%' },
        { name: 'Audience quality review', val: '26%', weight: '25%' },
        { name: 'Monetization signals', val: '24%', weight: '25%' },
        { name: 'Pipeline summary', val: '25%', weight: '20%' },
      ],
    },
    {
      id: 7,
      title: 'Quarterly Strategy Reset',
      status: true,
      elements: [
        { name: 'Bottom 30% formats killed', val: '18%', weight: '30%' },
        { name: '3–4 scalable series locked', val: '20%', weight: '25%' },
        { name: 'Budget allocation updated', val: '19%', weight: '25%' },
        { name: 'Quarter goals aligned', val: '20%', weight: '20%' },
      ],
    },
  ],

  teamStructure: [
    {
      id: 8,
      title: 'Growth Lead (NS / External)',
      status: true,
      elements: [
        { name: 'Quarterly OKRs defined', val: '30%', weight: '30%' },
        { name: 'Experiment backlog', val: '25%', weight: '25%' },
        { name: 'Weekly panel discipline', val: '28%', weight: '25%' },
        { name: 'Documentation updated', val: '30%', weight: '20%' },
      ],
    },
    {
      id: 9,
      title: 'Internal Marketing Owner (Headsup)',
      status: true,
      elements: [
        { name: 'Execution tracking', val: '24%', weight: '30%' },
        { name: 'Creative pipeline', val: '22%', weight: '25%' },
        { name: 'Campaign coordination', val: '26%', weight: '25%' },
        { name: 'Vendor alignment', val: '24%', weight: '20%' },
      ],
    },
    {
      id: 10,
      title: 'Performance Analyst',
      status: true,
      elements: [
        { name: 'Dashboards updated weekly', val: '20%', weight: '30%' },
        { name: 'Insights shared', val: '18%', weight: '25%' },
        { name: 'Experiment impact tracked', val: '22%', weight: '25%' },
        { name: 'Reporting hygiene', val: '20%', weight: '20%' },
      ],
    },
    {
      id: 11,
      title: 'Partnerships & Community',
      status: true,
      elements: [
        { name: 'Pipeline maintained', val: '22%', weight: '30%' },
        { name: 'Community pilots', val: '20%', weight: '25%' },
        { name: 'DM feedback loop', val: '25%', weight: '25%' },
        { name: 'Partner reporting', val: '22%', weight: '20%' },
      ],
    },
    {
      id: 12,
      title: 'Content Strategist',
      status: true,
      elements: [
        { name: 'Series system design', val: '25%', weight: '30%' },
        { name: 'Hook library', val: '28%', weight: '25%' },
        { name: 'Narrative structure', val: '24%', weight: '25%' },
        { name: 'Format testing', val: '25%', weight: '20%' },
      ],
    },
  ],
};

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
      active ? 'text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`}
    style={active ? { backgroundColor: 'var(--primary)' } : {}}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'} />
      <span className="font-medium text-[15px]">{label}</span>
    </div>
  </button>
);

const ProgressBar = ({ percentage, color }) => (
  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
    <div
      className="h-2.5 rounded-full transition-all duration-500"
      style={{ width: `${percentage}%`, backgroundColor: color }}
    />
  </div>
);

const ColumnHeader = ({ icon: Icon, title, count, underlineColor }) => (
  <div className="flex items-center justify-between mb-6 pb-4 border-b-2" style={{ borderBottomColor: underlineColor }}>
    <div className="flex items-center gap-3">
      <Icon size={18} className="text-slate-700" />
      <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
      <span className="text-slate-600 text-sm font-semibold">{count}</span>
    </div>

    <button className="text-slate-400 hover:text-slate-700 transition-colors p-1 hover:bg-slate-100 rounded-lg">
      <Plus size={20} />
    </button>
  </div>
);

const InitiativeCard = ({ item, onUpdateValue, category, initiativeId }) => {
  const [expanded, setExpanded] = useState(false);

  const progress = calculateProgress(item.elements);

  // screenshot style colors
  let barColor = 'var(--warning)';
  if (progress >= 70) barColor = 'var(--success)';
  else if (progress >= 40) barColor = 'var(--info)';
  else if (progress <= 19) barColor = 'var(--danger)';

  // Different background shades for element names
  const getElementBgColor = (index) => {
    const shades = [
      'bg-blue-50',
      'bg-emerald-50',
      'bg-amber-50',
      'bg-purple-50',
      'bg-pink-50',
      'bg-cyan-50',
      'bg-indigo-50',
      'bg-rose-50',
    ];
    return shades[index % shades.length];
  };

  // Different slider colors
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

  // Convert percentage to slider value (1-10)
  const percentageToSlider = (percentage) => {
    const val = parseFloat(percentage.replace('%', '')) || 0;
    return Math.max(1, Math.round(val / 10));
  };

  // Convert slider value to percentage
  const sliderToPercentage = (sliderValue) => sliderValue * 10;

  const handleSliderChange = (elementIndex, sliderValue) => {
    const percentage = sliderToPercentage(sliderValue);
    onUpdateValue(category, initiativeId, elementIndex, `${percentage}%`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Title + Toggle */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h4 className="font-bold text-slate-900 text-[16px] leading-snug">{item.title}</h4>

          {/* Toggle (visual) */}
          <div
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors ${
              item.status ? 'bg-emerald-500' : 'bg-slate-200'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                item.status ? 'translate-x-5' : 'translate-x-1'
              } mt-0.5`}
            />
          </div>
        </div>

        {/* Success Rate */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold tracking-wide text-slate-500 uppercase">Success Rate</span>
            <span className="text-sm font-bold text-slate-900">{progress}%</span>
          </div>
          <ProgressBar percentage={progress} color={barColor} />
        </div>

        {/* Expand */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronRight size={18} />}
          {expanded ? 'Hide Elements' : `View Elements (${item.elements.length})`}
        </button>
      </div>

      {/* Expanded Elements with sliders */}
      {expanded && (
        <div className="bg-slate-50 border-t border-slate-100 px-6 py-5 space-y-5">
          {item.elements.map((el, idx) => {
            const sliderValue = percentageToSlider(el.val);
            const sliderColor = getSliderColor(idx);

            return (
              <div key={idx} className="space-y-2">
                {/* Name + Weight */}
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getElementBgColor(idx)}`}>
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span className="font-semibold text-slate-800 text-sm">{el.name}</span>
                  </div>

                  <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
                    {el.weight} wgt
                  </span>
                </div>

                {/* Slider */}
                <div className="pl-2 flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={sliderValue}
                    onChange={(e) => handleSliderChange(idx, parseInt(e.target.value))}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${sliderColor.main} 0%, ${sliderColor.main} ${
                        (sliderValue - 1) * 11.11
                      }%, #e2e8f0 ${(sliderValue - 1) * 11.11}%, #e2e8f0 100%)`,
                    }}
                  />

                  <span className="text-sm font-bold min-w-[45px] text-right" style={{ color: sliderColor.text }}>
                    {sliderToPercentage(sliderValue)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer icons (like screenshot) */}
      {expanded && (
        <div className="px-6 py-4 bg-white border-t border-slate-100 flex justify-end gap-4">
          <button className="text-slate-400 hover:text-slate-700 transition-colors">
            <MessageSquare size={18} />
          </button>
          <button className="text-slate-400 hover:text-slate-700 transition-colors">
            <Settings size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main Page ---
export default function InitiativesPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Initiatives');
  const [selectedClient, setSelectedClient] = useState("Let's Ask The Doctor");
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  // Load from localStorage
  const [initiativesState, setInitiativesState] = useState(() => {
    const saved = localStorage.getItem('letsAskDoctorInitiativesData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const expected = ['infrastructure', 'dataLoops', 'teamStructure'];
        const valid = expected.every((k) => Array.isArray(parsed[k]));
        if (valid) return parsed;
        return initialInitiativesData;
      } catch {
        return initialInitiativesData;
      }
    }
    return initialInitiativesData;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('letsAskDoctorInitiativesData', JSON.stringify(initiativesState));
  }, [initiativesState]);

  const clients = [
    '- Select Client -',
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

  // Update element value
  const handleUpdateValue = (category, initiativeId, elementIndex, newValue) => {
    setInitiativesState((prev) => {
      const updated = { ...prev };
      const categoryArray = [...updated[category]];
      const initiativeIndex = categoryArray.findIndex((obj) => obj.id === initiativeId);

      if (initiativeIndex !== -1) {
        const updatedInitiative = { ...categoryArray[initiativeIndex] };
        const updatedElements = [...updatedInitiative.elements];

        updatedElements[elementIndex] = {
          ...updatedElements[elementIndex],
          val: newValue,
        };

        updatedInitiative.elements = updatedElements;
        categoryArray[initiativeIndex] = updatedInitiative;
        updated[category] = categoryArray;
      }

      return updated;
    });
  };

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
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-white shadow-xl lg:shadow-none lg:border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      >
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
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => setActiveTab('Initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => navigate('/letsaskdoctor/experiments')} />

            <div className="my-6 border-t border-slate-100 mx-2"></div>

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
              <h2 className="text-xl font-bold text-slate-800">Initiatives Tracker</h2>
              <span className="mx-3 text-slate-300">|</span>
              <span className="text-sm font-medium text-slate-500">In Process</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Client Dropdown */}
            <div className="hidden md:flex relative">
              <div className="bg-slate-100 rounded-lg px-3 py-2 min-w-[220px]">
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
                    {clients.map((client, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (client !== '- Select Client -') {
                            setSelectedClient(client);

                            if (client === 'Puno') navigate('/puno/dashboard');
                            else if (client === 'Sany') navigate('/sany/dashboard');
                            else if (client === 'Montra Truck') navigate('/montra/dashboard');
                            else if (client === 'HeadsUpB2b') navigate('/headsupb2b/dashboard');
                            else if (client === 'Tailworld') navigate('/tailworld/dashboard');
                            else if (client === 'InstaGroup') navigate('/instagroup/dashboard');
                            else if (client === 'VZY-Tv') navigate('/vzytv/dashboard');
                            else if (client === 'Yastudy') navigate('/yastudy/dashboard');
                            else if (client === 'Kaizen Technicals') navigate('/kaizen/dashboard');
                            else if (client === 'Ria Gupta') navigate('/riagupta/dashboard');
                            else if (client === 'Oxxy') navigate('/oxxy/dashboard');
                            else if (client === "Let's Ask The Doctor") navigate('/letsaskdoctor/dashboard');
                          }
                          setClientDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                          selectedClient === client ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-700'
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
              {/* Column 1 */}
              <div className="flex flex-col h-full">
                <ColumnHeader
                  icon={Building2}
                  title="Infrastructure Setup"
                  count={initiativesState.infrastructure.length}
                  underlineColor="#0EA5E9"
                />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {initiativesState.infrastructure.map((item) => (
                    <InitiativeCard
                      key={item.id}
                      item={item}
                      onUpdateValue={handleUpdateValue}
                      category="infrastructure"
                      initiativeId={item.id}
                    />
                  ))}
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col h-full">
                <ColumnHeader
                  icon={Activity}
                  title="Data Loops"
                  count={initiativesState.dataLoops.length}
                  underlineColor="#EC4899"
                />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {initiativesState.dataLoops.map((item) => (
                    <InitiativeCard
                      key={item.id}
                      item={item}
                      onUpdateValue={handleUpdateValue}
                      category="dataLoops"
                      initiativeId={item.id}
                    />
                  ))}
                </div>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col h-full">
                <ColumnHeader
                  icon={Globe}
                  title="Team Structure"
                  count={initiativesState.teamStructure.length}
                  underlineColor="#7C3AED"
                />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
                  {initiativesState.teamStructure.map((item) => (
                    <InitiativeCard
                      key={item.id}
                      item={item}
                      onUpdateValue={handleUpdateValue}
                      category="teamStructure"
                      initiativeId={item.id}
                    />
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
