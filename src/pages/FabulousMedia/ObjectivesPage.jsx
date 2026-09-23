import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Box, 
  Heart, 
  MessageSquare, 
  ListOrdered, 
  Calendar, 
  FileText, 
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
  XCircle,
  Lightbulb,
} from 'lucide-react';

// --- Helper function to calculate progress based on weighted average ---
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

// --- Fabulous Media Core Objectives Data Structure ---
const initialObjectivesData = {
  coreObjectives: [
    { id: 1, title: "Close the Proof Loop", progress: 42, status: true, elements: [
      { name: "Rupee-attributed case studies live", val: "40%", weight: "40%" },
      { name: "Named client testimonials (incl. video)", val: "25%", weight: "30%" },
      { name: "'Real numbers' claim substantiated", val: "55%", weight: "30%" } ] },
    { id: 2, title: "Build the Credibility Stack", progress: 30, status: true, elements: [
      { name: "Third-party reviews (Clutch / Google)", val: "15%", weight: "40%" },
      { name: "Partner certifications shown", val: "20%", weight: "35%" },
      { name: "Awards & press footprint", val: "30%", weight: "25%" } ] },
    { id: 3, title: "Scale the Founder-Accelerator Funnel", progress: 55, status: true, elements: [
      { name: "NS Transform to agency conversion", val: "50%", weight: "45%" },
      { name: "Productised senior-pod offer", val: "45%", weight: "30%" },
      { name: "Human origin story used in pitches", val: "70%", weight: "25%" } ] },
    { id: 4, title: "Own AI-Search (AEO / GEO)", progress: 48, status: true, elements: [
      { name: "Client AI-citation wins documented", val: "45%", weight: "40%" },
      { name: "/research thought-leadership hub live", val: "20%", weight: "35%" },
      { name: "AEO productised as a named service", val: "80%", weight: "25%" } ] }
  ],
  strategicKPIs: [
    { id: 1, title: "Verified Client ROI", progress: 45, status: true, elements: [
      { name: "Attribution dashboards per account", val: "50%", weight: "50%" },
      { name: "QBRs delivering the revenue story", val: "55%", weight: "30%" },
      { name: "ROI figure independently substantiated", val: "20%", weight: "20%" } ] },
    { id: 2, title: "Enterprise 360 Revenue Mix", progress: 38, status: true, elements: [
      { name: "New 4L+/mo retainers closed", val: "35%", weight: "45%" },
      { name: "Upsell Growth to Enterprise", val: "40%", weight: "35%" },
      { name: "Average retainer value trend", val: "45%", weight: "20%" } ] },
    { id: 3, title: "Earned-Monthly Retention", progress: 62, status: true, elements: [
      { name: "Net revenue retention", val: "60%", weight: "40%" },
      { name: "Average engagement length", val: "55%", weight: "30%" },
      { name: "Churn on no-lock-in accounts", val: "70%", weight: "30%" } ] }
  ],
  growthMetrics: [
    { id: 1, title: "Qualified Pipeline", progress: 52, status: true, elements: [
      { name: "Inbound from founder brand", val: "55%", weight: "40%" },
      { name: "Accelerator-sourced leads", val: "50%", weight: "35%" },
      { name: "Referral / word-of-mouth", val: "50%", weight: "25%" } ] },
    { id: 2, title: "Vertical Depth (Regulated / Complex)", progress: 58, status: true, elements: [
      { name: "Education & healthcare playbooks", val: "65%", weight: "40%" },
      { name: "EV / hospitality / enterprise wins", val: "55%", weight: "35%" },
      { name: "Sector case-study coverage", val: "50%", weight: "25%" } ] },
    { id: 3, title: "Brand Authority", progress: 44, status: true, elements: [
      { name: "Founder thought-leadership cadence", val: "50%", weight: "40%" },
      { name: "Original research published", val: "25%", weight: "35%" },
      { name: "Media mentions / features", val: "55%", weight: "25%" } ] }
  ]
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
      <div 
        className="h-2.5 rounded-full transition-all duration-500" 
        style={{ width: `${percentage}%`, backgroundColor: getColorValue() }}
      ></div>
    </div>
  );
};

const ObjectiveCard = ({ item, onUpdateValue, category, objectiveId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate progress dynamically
  const calculatedProgress = calculateProgress(item.elements);
  
  // Determine color based on progress (Using project color palette)
  let colorClass = 'bg-danger';
  if (calculatedProgress >= 70) colorClass = 'bg-success';
  else if (calculatedProgress >= 40) colorClass = 'bg-info';
  else if (calculatedProgress >= 20) colorClass = 'bg-warning';
  
  // Convert percentage to slider value (1-10)
  const percentageToSlider = (percentage) => {
    const val = parseFloat(percentage.replace('%', '')) || 0;
    return Math.round(val / 10) || 1; // Convert 0-100% to 1-10 scale
  };

  // Convert slider value (1-10) to percentage
  const sliderToPercentage = (sliderValue) => {
    return sliderValue * 10; // 1 = 10%, 2 = 20%, ... 10 = 100%
  };

  const handleSliderChange = (elementIndex, sliderValue) => {
    const percentage = sliderToPercentage(sliderValue);
    onUpdateValue(category, objectiveId, elementIndex, `${percentage}%`);
  };

  // Different background shades for element names
  const getElementBgColor = (index) => {
    const shades = [
      'bg-blue-50',      // Light blue
      'bg-emerald-50',   // Light green
      'bg-amber-50',     // Light amber
      'bg-purple-50',    // Light purple
      'bg-pink-50',      // Light pink
      'bg-cyan-50',      // Light cyan
      'bg-indigo-50',    // Light indigo
      'bg-rose-50',      // Light rose
    ];
    return shades[index % shades.length];
  };

  // Different colors for sliders (Using project color palette)
  const getSliderColor = (index) => {
    const colors = [
      { main: 'var(--blue)', text: 'var(--blue)' },      // Blue
      { main: 'var(--success)', text: 'var(--success)' },   // Success/Green
      { main: 'var(--warning)', text: 'var(--warning)' },     // Warning/Yellow
      { main: 'var(--purple)', text: 'var(--purple)' },    // Purple
      { main: 'var(--pink)', text: 'var(--pink)' },      // Pink
      { main: 'var(--cyan)', text: 'var(--cyan)' },      // Cyan
      { main: 'var(--indigo)', text: 'var(--indigo)' },    // Indigo
      { main: 'var(--danger)', text: 'var(--danger)' },      // Danger/Red
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-4 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-bold text-slate-800 text-[15px] leading-tight pr-4">{item.title}</h4>
          <div 
            className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${item.status ? '' : 'bg-slate-200'}`}
            style={item.status ? { backgroundColor: 'var(--success)' } : {}}
          >
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
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--info)'}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronRight size={14} />}
            {isExpanded ? 'Hide Elements' : `View Elements (${item.elements.length})`}
          </button>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && item.elements.length > 0 && (
        <div className="bg-slate-50 border-t border-slate-100 p-4 space-y-3">
          {item.elements.map((el, idx) => {
            const sliderValue = percentageToSlider(el.val);
            const sliderColor = getSliderColor(idx);
            return (
              <div key={idx} className="space-y-2 group">
                <div className="flex items-center justify-between text-sm">
                  <div className={`flex items-center gap-2 text-slate-700 px-3 py-2 rounded-lg ${getElementBgColor(idx)}`}>
                    <div 
                      className="w-1.5 h-1.5 rounded-full bg-slate-400 transition-colors"
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--info)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                    ></div>
                    <span className="font-medium">{el.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">{el.weight} wgt</span>
                  </div>
                </div>
                <div className="pl-5 space-y-1">
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={sliderValue}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        handleSliderChange(idx, newValue);
                      }}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${sliderColor.main} 0%, ${sliderColor.main} ${(sliderValue - 1) * 11.11}%, #e2e8f0 ${(sliderValue - 1) * 11.11}%, #e2e8f0 100%)`
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
      
      {/* Footer Actions */}
      {isExpanded && (
        <div className="px-4 py-3 bg-white border-t border-slate-100 flex justify-end gap-2">
            <button 
              className="p-1.5 text-slate-400 rounded-lg transition-colors"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--info)';
                e.currentTarget.style.backgroundColor = 'rgba(54, 163, 247, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '';
                e.currentTarget.style.backgroundColor = '';
              }}
            >
              <MessageSquare size={16} />
            </button>
            <button 
              className="p-1.5 text-slate-400 rounded-lg transition-colors"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--warning)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 184, 34, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '';
                e.currentTarget.style.backgroundColor = '';
              }}
            >
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
      active 
        ? 'bg-slate-100 text-slate-700' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
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
    if (color === 'border-pink') return 'var(--pink)';
    if (color === 'border-violet') return 'var(--purple)';
    if (color === 'border-rose') return 'var(--danger)';
    return 'var(--gray)';
  };
  
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b-2" style={{ borderBottomColor: getBorderColor() }}>
      <div className="flex items-center gap-3">
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg">{count}</span>
      </div>
      <button className="text-slate-400 hover:text-slate-700 transition-colors p-1 hover:bg-slate-100 rounded-lg">
        <Plus size={20} />
      </button>
    </div>
  );
};

export default function ObjectivesPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Objectives');
  const [selectedClient, setSelectedClient] = useState('Fabulous Media');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  
  // Load data from localStorage on mount, or use initial data
  const [objectivesData, setObjectivesData] = useState(() => {
    const savedData = localStorage.getItem('fabulousmediaObjectivesData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Validate that the structure matches expected categories
        const expectedCategories = ['coreObjectives', 'strategicKPIs', 'growthMetrics'];
        const hasValidStructure = expectedCategories.every(cat => Array.isArray(parsed[cat]));
        
        // Also check if it has the new Fabulous Media objectives
        const hasNewStructure = parsed.coreObjectives && parsed.coreObjectives.some(obj => 
          obj.title === 'Demand Generation' || obj.title === 'Pipeline Velocity'
        );
        
        if (hasValidStructure && hasNewStructure) {
          return parsed;
        } else {
          // If structure doesn't match, use initial data
          return initialObjectivesData;
        }
      } catch (e) {
        return initialObjectivesData;
      }
    }
    return initialObjectivesData;
  });

  // Validate and reset data on mount if structure doesn't match
  useEffect(() => {
    const savedData = localStorage.getItem('fabulousmediaObjectivesData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const hasNewStructure = parsed.coreObjectives && parsed.coreObjectives.some(obj => 
          obj.title === 'Demand Generation' || obj.title === 'Pipeline Velocity'
        );
        if (!hasNewStructure) {
          // Clear old data and use new structure
          localStorage.setItem('fabulousmediaObjectivesData', JSON.stringify(initialObjectivesData));
          setObjectivesData(initialObjectivesData);
        }
      } catch (e) {
        localStorage.setItem('fabulousmediaObjectivesData', JSON.stringify(initialObjectivesData));
        setObjectivesData(initialObjectivesData);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('fabulousmediaObjectivesData', JSON.stringify(objectivesData));
  }, [objectivesData]);

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
  ];

  // Function to update element value
  const handleUpdateValue = (category, objectiveId, elementIndex, newValue) => {
    setObjectivesData(prev => {
      const updated = { ...prev };
      const categoryArray = [...updated[category]];
      const objectiveIndex = categoryArray.findIndex(obj => obj.id === objectiveId);
      
      if (objectiveIndex !== -1) {
        const updatedObjective = { ...categoryArray[objectiveIndex] };
        const updatedElements = [...updatedObjective.elements];
        updatedElements[elementIndex] = {
          ...updatedElements[elementIndex],
          val: newValue
        };
        updatedObjective.elements = updatedElements;
        categoryArray[objectiveIndex] = updatedObjective;
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

      {/* Sidebar - Same as before */}
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
                src="https://content.app-sources.com/s/5059166616638299/uploads/Brand/digital-agency-2669171.png" 
                alt="Fabulous Media Logo" 
                className="w-8 h-8 mr-3 object-contain"
              />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">GO <span style={{ color: 'var(--primary)' }}>Growth</span></span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/fabulousmedia/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => setActiveTab('Objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => navigate('/fabulousmedia/initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => navigate('/fabulousmedia/experiments')} />
            
            <div className="my-6 border-t border-slate-100 mx-2"></div>
            
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header - Same as before */}
        <header className="h-20 bg-white shadow-sm lg:shadow-none lg:border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-20">
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
             {/* Client Dropdown */}
             <div className="hidden md:flex relative">
               <div className="bg-slate-100 rounded-lg px-3 py-2 min-w-[200px]">
                 <span className="text-xs font-bold text-slate-500 mr-2 uppercase">Client:</span>
                 <button
                   onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                   className="text-sm font-bold text-slate-800 flex items-center gap-1 cursor-pointer w-full justify-between"
                 >
                   <span className="truncate">{selectedClient === 'Fabulous Media' ? 'Fabulous Media' : selectedClient}</span>
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
                             if (client === 'Fabulous Media') {
                               navigate('/fabulousmedia/dashboard');
                             } else if (client === 'Sany') {
                               navigate('/sany/dashboard');
                             } else if (client === 'Puno') {
                               navigate('/puno/dashboard');
                             } else if (client === 'Montra Truck') {
                               navigate('/montra/dashboard');
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
              <img 
                src="https://content.app-sources.com/s/5059166616638299/uploads/Brand/digital-agency-2669171.png" 
                alt="Fabulous Media Logo" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-white p-1 object-contain"
              />
            </div>
          </div>
        </header>

        {/* Filter Menu */}
        <div className="bg-white border-b border-slate-200 px-6 lg:px-10 py-3">
          <div className="flex items-center gap-6">
            <FilterItem 
              icon={FileText} 
              label="In Process" 
              active={true}
            />
            <FilterItem 
              icon={CheckCircle2} 
              label="Successful" 
              active={false}
            />
            <FilterItem 
              icon={XCircle} 
              label="Failed" 
              active={false}
            />
            <FilterItem 
              icon={Lightbulb} 
              label="Ideas" 
              active={false}
            />
          </div>
        </div>

        {/* Scrollable Content - Kanban Style Layout */}
        <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto h-full">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
              
              {/* Column 1: Core Objectives */}
              <div className="flex flex-col h-full">
                <ColumnHeader title="Core Objectives" count={objectivesData.coreObjectives.length} color="border-indigo-300" />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {objectivesData.coreObjectives.map(item => (
                    <ObjectiveCard 
                      key={item.id} 
                      item={item} 
                      onUpdateValue={handleUpdateValue}
                      category="coreObjectives"
                      objectiveId={item.id}
                    />
                  ))}
                </div>
              </div>

              {/* Column 2: Strategic KPIs */}
              <div className="flex flex-col h-full">
                <ColumnHeader title="Strategic KPIs" count={objectivesData.strategicKPIs.length} color="border-success" />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {objectivesData.strategicKPIs.map(item => (
                    <ObjectiveCard 
                      key={item.id} 
                      item={item} 
                      onUpdateValue={handleUpdateValue}
                      category="strategicKPIs"
                      objectiveId={item.id}
                    />
                  ))}
                </div>
              </div>

              {/* Column 3: Growth Metrics */}
              <div className="flex flex-col h-full">
                <ColumnHeader title="Growth Metrics" count={objectivesData.growthMetrics.length} color="border-warning" />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {objectivesData.growthMetrics.map(item => (
                    <ObjectiveCard 
                      key={item.id} 
                      item={item} 
                      onUpdateValue={handleUpdateValue}
                      category="growthMetrics"
                      objectiveId={item.id}
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

