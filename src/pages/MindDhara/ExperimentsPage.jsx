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
  Heart,
  BookOpen
} from 'lucide-react';

const MINDDHARA_LOGO = 'https://minddhara.com/wp-content/uploads/2025/09/MindDhara-Favicon-150x150.png';

const calculateProgress = (elements) => {
  if (!elements || elements.length === 0) return 0;
  let totalProgress = 0;
  elements.forEach(element => {
    const val = parseFloat(String(element.val).replace('%', '')) || 0;
    const weight = parseFloat(String(element.weight).replace('%', '')) || 0;
    totalProgress += (val * weight) / 100;
  });
  return Math.round(totalProgress);
};

// --- MindDhara Experiments from Growth Panel Doc (grouped in 3 columns like other clients) ---
const initialExperimentsData = {
  careAndCareer: [
    {
      id: 1,
      title: "Messaging tests: ‘Support’ vs ‘Understanding’ (MindDhara Couch)",
      progress: 20,
      status: true,
      tag: "Active",
      elements: [
        { name: "Inquiry CTR", val: "25%", weight: "50%" },
        { name: "Bounce rate", val: "15%", weight: "50%" }
      ]
    },
    {
      id: 2,
      title: "Landing page tone tests: clinical vs human",
      progress: 15,
      status: true,
      tag: "Active",
      elements: [
        { name: "Conversion %", val: "20%", weight: "100%" }
      ]
    },
    {
      id: 3,
      title: "Short educational reels (non-diagnostic)",
      progress: 25,
      status: true,
      tag: "Active",
      elements: [
        { name: "Saves", val: "30%", weight: "35%" },
        { name: "DMs", val: "20%", weight: "35%" },
        { name: "Session inquiries", val: "25%", weight: "30%" }
      ]
    },
    {
      id: 4,
      title: "Career confusion ads vs clarity ads (MindDhara Forward)",
      progress: 22,
      status: true,
      tag: "Active",
      elements: [
        { name: "CPL", val: "25%", weight: "50%" },
        { name: "Lead quality", val: "20%", weight: "50%" }
      ]
    },
    {
      id: 5,
      title: "Webinar → mentorship funnel",
      progress: 18,
      status: true,
      tag: "Active",
      elements: [
        { name: "Webinar attendance → conversion", val: "20%", weight: "100%" }
      ]
    },
    {
      id: 6,
      title: "Interview prep content series (psychology career search)",
      progress: 20,
      status: true,
      tag: "Active",
      elements: [
        { name: "Leads", val: "25%", weight: "50%" },
        { name: "Program enrollments", val: "15%", weight: "50%" }
      ]
    }
  ],
  contentAndRetention: [
    {
      id: 7,
      title: "Founder POV posts (weekly)",
      progress: 28,
      status: true,
      tag: "Active",
      elements: [
        { name: "Engagement %", val: "30%", weight: "50%" },
        { name: "Profile visits", val: "25%", weight: "50%" }
      ]
    },
    {
      id: 8,
      title: "Anandhbodh-style long-form captions",
      progress: 20,
      status: true,
      tag: "Active",
      elements: [
        { name: "Save rate", val: "25%", weight: "50%" },
        { name: "Share rate", val: "15%", weight: "50%" }
      ]
    },
    {
      id: 9,
      title: "Research-decoded content (ATLAS)",
      progress: 15,
      status: true,
      tag: "Active",
      elements: [
        { name: "Mentions", val: "20%", weight: "50%" },
        { name: "Inbound collabs", val: "10%", weight: "50%" }
      ]
    },
    {
      id: 10,
      title: "Email journeys for students & patients",
      progress: 18,
      status: true,
      tag: "Active",
      elements: [
        { name: "Open rate", val: "22%", weight: "50%" },
        { name: "Return visits", val: "15%", weight: "50%" }
      ]
    },
    {
      id: 11,
      title: "WhatsApp follow-ups post-webinars",
      progress: 20,
      status: true,
      tag: "Active",
      elements: [
        { name: "Re-activation rate", val: "25%", weight: "100%" }
      ]
    },
    {
      id: 12,
      title: "CRM tagging by vertical",
      progress: 25,
      status: true,
      tag: "Active",
      elements: [
        { name: "Conversion uplift", val: "30%", weight: "100%" }
      ]
    }
  ],
  researchAndPartnerships: [
    {
      id: 13,
      title: "PhD-focused research call campaigns",
      progress: 12,
      status: true,
      tag: "Active",
      elements: [
        { name: "Applications", val: "15%", weight: "50%" },
        { name: "Inquiries", val: "10%", weight: "50%" }
      ]
    },
    {
      id: 14,
      title: "Co-authored insights with academics",
      progress: 15,
      status: true,
      tag: "Active",
      elements: [
        { name: "Citations", val: "20%", weight: "50%" },
        { name: "Backlinks", val: "10%", weight: "50%" }
      ]
    },
    {
      id: 15,
      title: "Conference & journal presence",
      progress: 10,
      status: true,
      tag: "Active",
      elements: [
        { name: "Invitations", val: "15%", weight: "50%" },
        { name: "Mentions", val: "5%", weight: "50%" }
      ]
    },
    {
      id: 16,
      title: "University partnership pilots",
      progress: 8,
      status: true,
      tag: "Active",
      elements: [
        { name: "Active MoUs", val: "10%", weight: "100%" }
      ]
    },
    {
      id: 17,
      title: "Corporate wellbeing pilots",
      progress: 10,
      status: true,
      tag: "Active",
      elements: [
        { name: "Pilot success", val: "12%", weight: "50%" },
        { name: "Renewals", val: "8%", weight: "50%" }
      ]
    },
    {
      id: 18,
      title: "Mental health NGO collaborations",
      progress: 12,
      status: true,
      tag: "Active",
      elements: [
        { name: "Ecosystem trust", val: "15%", weight: "50%" },
        { name: "Referral traffic", val: "10%", weight: "50%" }
      ]
    }
  ]
};

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
  const getSliderColor = (i) => [
    { main: 'var(--blue)', text: 'var(--blue)' }, { main: 'var(--success)', text: 'var(--success)' },
    { main: 'var(--warning)', text: 'var(--warning)' }, { main: 'var(--purple)', text: 'var(--purple)' },
    { main: 'var(--pink)', text: 'var(--pink)' }, { main: 'var(--cyan)', text: 'var(--cyan)' },
    { main: 'var(--indigo)', text: 'var(--indigo)' }, { main: 'var(--danger)', text: 'var(--danger)' },
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
                  <div className={`flex items-center gap-2 text-slate-700 px-3 py-2 rounded-lg ${getElementBgColor(idx)}`}><span className="font-medium">{el.name}</span></div>
                  <span className="text-xs font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">{el.weight} wgt</span>
                </div>
                <div className="pl-5 flex items-center gap-3">
                  <input type="range" min="1" max="10" step="1" value={sliderValue} onChange={(e) => handleSliderChange(idx, parseInt(e.target.value))} className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, ${sc.main} 0%, ${sc.main} ${(sliderValue - 1) * 11.11}%, #e2e8f0 ${(sliderValue - 1) * 11.11}%, #e2e8f0 100%)` }} />
                  <span className="text-xs font-bold min-w-[35px] text-right" style={{ color: sc.text }}>{sliderToPercentage(sliderValue)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isExpanded && (
        <div className="px-4 py-3 bg-white border-t border-slate-100 flex justify-end gap-2">
          <button className="p-1.5 text-slate-400 rounded-lg"><MessageSquare size={16} /></button>
          <button className="p-1.5 text-slate-400 rounded-lg"><Settings size={16} /></button>
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
  const colors = { 'border-emerald-300': '#6ee7b7', 'border-info': 'var(--info)', 'border-danger': 'var(--danger)', 'border-warning': 'var(--warning)', 'border-cyan': 'var(--cyan)', 'border-purple': 'var(--purple)' };
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b-2" style={{ borderBottomColor: colors[color] || 'var(--gray)' }}>
      <div className="flex items-center gap-3">
        {Icon && <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500"><Icon size={18} /></div>}
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg">{count}</span>
      </div>
      <button className="text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-100 rounded-lg"><Plus size={20} /></button>
    </div>
  );
};

export default function ExperimentsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Experiments');
  const [selectedClient, setSelectedClient] = useState('MindDhara');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const [experimentsData, setExperimentsData] = useState(() => {
    const savedData = localStorage.getItem('minddharaExperimentsData');
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
    localStorage.setItem('minddharaExperimentsData', JSON.stringify(experimentsData));
  }, [experimentsData]);

  const clients = [
    '- Select Client -', 'Blue Energy Motors', 'Fabulous Media', 'GoCommercially', 'HeadsUpB2b', 'Human Touch', 'India Meets India',
    'Infabio, Inc.', 'InstaGroup', 'IPL Tech Electric', 'MindDhara', 'Puno', 'Montra Truck', 'Sany', 'Tailworld',
    'VZY-Tv', 'McRAYGOR', 'MovoDream', 'A2 Bilona Ghee', 'Yastudy', 'Kaizen Technicals', 'SID Real Tech',
  ];

  const handleClientSelect = (client) => {
    if (client === '- Select Client -') return;
    setSelectedClient(client);
    setClientDropdownOpen(false);
    const routes = {
      'Puno': '/puno/dashboard', 'Montra Truck': '/montra/dashboard', 'Sany': '/sany/dashboard',
      'HeadsUpB2b': '/headsupb2b/dashboard', 'Tailworld': '/tailworld/dashboard',
      'Blue Energy Motors': '/blueenergymotors/dashboard', 'InstaGroup': '/instagroup/dashboard',
      'VZY-Tv': '/vzytv/dashboard', 'McRAYGOR': '/mcraygor/dashboard', 'MovoDream': '/movodream/dashboard',
      'A2 Bilona Ghee': '/a2bilonaghee/dashboard', 'Yastudy': '/yastudy/dashboard',
      'Kaizen Technicals': '/kaizen/dashboard', 'IPL Tech Electric': '/ipltech/dashboard',
      'SID Real Tech': '/sidrealtech/dashboard', 'MindDhara': '/minddhara/dashboard',
    };
    const path = routes[client];
    if (path) navigate(path);
  };

  const handleUpdateValue = (category, objectiveId, elementIndex, newValue) => {
    setExperimentsData(prev => {
      const updated = { ...prev };
      const categoryArray = [...(updated[category] || [])];
      const idx = categoryArray.findIndex(obj => obj.id === objectiveId);
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
    { key: 'careAndCareer', title: 'Care Access & Career Growth', color: 'border-emerald-300', icon: Heart },
    { key: 'contentAndRetention', title: 'Content, Thought Leadership & Nurture', color: 'border-info', icon: BookOpen },
    { key: 'researchAndPartnerships', title: 'Research, ATLAS & Partnerships', color: 'border-purple', icon: FlaskConical },
  ];

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
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/minddhara/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => navigate('/minddhara/objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => navigate('/minddhara/initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => setActiveTab('Experiments')} />
            <div className="my-6 border-t border-slate-100 mx-2" />
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white shadow-sm lg:border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 hover:bg-slate-100 rounded-lg"><Menu size={24} /></button>
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
                      <button key={i} onClick={() => handleClientSelect(c)} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 ${selectedClient === c ? 'bg-slate-100 font-semibold' : ''} ${c === '- Select Client -' ? 'text-slate-400 italic' : ''}`}>{c}</button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <img src={MINDDHARA_LOGO} alt="MindDhara" className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-white object-cover" />
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
              {columns.map(col => (
                <div key={col.key} className="flex flex-col">
                  <ColumnHeader title={col.title} count={(experimentsData[col.key] || []).length} color={col.color} icon={col.icon} />
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20 min-h-[200px]">
                    {(experimentsData[col.key] || []).map(item => (
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
