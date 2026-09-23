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
  Activity,
  AlertCircle,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Cpu,
  PenTool,
  Globe,
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

// --- VZY Smart TV Key Initiatives Data Structure ---
const initialInitiativesData = {
  infrastructure: [
    {
      id: 1,
      title: "Growth Dashboard Setup",
      progress: 26,
      status: true,
      elements: [
        { name: "Meta Ads + Google Ads Integration", val: "28%", weight: "25%" },
        { name: "Website Analytics Integration", val: "26%", weight: "25%" },
        { name: "Dealer Feedback Integration", val: "25%", weight: "25%" },
        { name: "Single Dashboard: Reach → Inquiry → Sale", val: "24%", weight: "25%" }
      ]
    },
    {
      id: 2,
      title: "Attribution Framework",
      progress: 22,
      status: true,
      elements: [
        { name: "UTMs for all digital campaigns", val: "25%", weight: "30%" },
        { name: "Dealer-level lead tagging", val: "22%", weight: "30%" },
        { name: "City-wise performance tracking", val: "20%", weight: "25%" },
        { name: "Source Attribution Mapping", val: "20%", weight: "15%" }
      ]
    },
    {
      id: 3,
      title: "Retail Conversion Mapping",
      progress: 20,
      status: true,
      elements: [
        { name: "Inquiry source → dealer → sale mapping", val: "22%", weight: "30%" },
        { name: "High-performing cities identification", val: "20%", weight: "30%" },
        { name: "High-performing creatives tracking", val: "19%", weight: "25%" },
        { name: "Conversion path optimization", val: "18%", weight: "15%" }
      ]
    }
  ],
  dataLoops: [
    {
      id: 4,
      title: "Weekly Growth Panel Review",
      progress: 28,
      status: true,
      elements: [
        { name: "Ads & Creatives Performance Review", val: "30%", weight: "30%" },
        { name: "Dealer Feedback Analysis", val: "28%", weight: "30%" },
        { name: "Experiment Results Review", val: "27%", weight: "25%" },
        { name: "Action Items Tracking", val: "26%", weight: "15%" }
      ]
    },
    {
      id: 5,
      title: "Monthly ROI + Sales Contribution Report",
      progress: 24,
      status: true,
      elements: [
        { name: "ROI Calculation & Analysis", val: "26%", weight: "30%" },
        { name: "Sales Contribution Tracking", val: "24%", weight: "30%" },
        { name: "Marketing Activity Impact", val: "23%", weight: "25%" },
        { name: "Trend Analysis & Insights", val: "22%", weight: "15%" }
      ]
    },
    {
      id: 6,
      title: "Quarterly Strategy Reset",
      progress: 18,
      status: true,
      elements: [
        { name: "Markets Focus Refinement", val: "22%", weight: "30%" },
        { name: "Creatives Strategy Reset", val: "18%", weight: "30%" },
        { name: "Budgets Allocation Review", val: "17%", weight: "25%" },
        { name: "Strategy Documentation", val: "15%", weight: "15%" }
      ]
    }
  ],
  teamStructure: [
    {
      id: 8,
      title: "Growth Lead (NS / External)",
      progress: 28,
      status: true,
      elements: [
        { name: "KPI Ownership", val: "30%", weight: "30%" },
        { name: "Experiment Prioritization", val: "28%", weight: "30%" },
        { name: "Strategy Alignment", val: "27%", weight: "25%" },
        { name: "Strategic Decisions", val: "25%", weight: "15%" }
      ]
    },
    {
      id: 7,
      title: "Growth Lead (External / NS)",
      progress: 26,
      status: true,
      elements: [
        { name: "Owns growth logic, KPIs & decision-making", val: "28%", weight: "30%" },
        { name: "Experiment Prioritization", val: "26%", weight: "30%" },
        { name: "Strategy Alignment", val: "25%", weight: "25%" },
        { name: "Performance Review", val: "24%", weight: "15%" }
      ]
    },
    {
      id: 8,
      title: "Brand Marketing Manager (VZY)",
      progress: 24,
      status: true,
      elements: [
        { name: "Aligns campaigns with brand tone & vision", val: "26%", weight: "30%" },
        { name: "Brand Consistency", val: "24%", weight: "30%" },
        { name: "Creative Direction", val: "23%", weight: "25%" },
        { name: "Brand Messaging", val: "22%", weight: "15%" }
      ]
    },
    {
      id: 9,
      title: "Performance Analyst",
      progress: 22,
      status: true,
      elements: [
        { name: "Tracks dashboards, ROI, attribution", val: "24%", weight: "30%" },
        { name: "Data Analysis & Insights", val: "22%", weight: "30%" },
        { name: "Performance Reporting", val: "21%", weight: "25%" },
        { name: "Metrics Tracking", val: "20%", weight: "15%" }
      ]
    },
    {
      id: 10,
      title: "Creative & Content Partner",
      progress: 25,
      status: true,
      elements: [
        { name: "Produces ads, reels, retail creatives", val: "27%", weight: "30%" },
        { name: "Content Production", val: "25%", weight: "30%" },
        { name: "Creative Testing", val: "24%", weight: "25%" },
        { name: "Content Strategy", val: "23%", weight: "15%" }
      ]
    },
    {
      id: 11,
      title: "Sales / Channel Head",
      progress: 28,
      status: true,
      elements: [
        { name: "Feeds dealer insights & sales data", val: "30%", weight: "30%" },
        { name: "Channel Management", val: "28%", weight: "30%" },
        { name: "Dealer Enablement", val: "27%", weight: "25%" },
        { name: "Sales Performance Tracking", val: "26%", weight: "15%" }
      ]
    }
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

const ColumnHeader = ({ title, count, color, icon: Icon }) => {
  const getBorderColor = () => {
    if (color === 'border-indigo') return 'var(--indigo)';
    if (color === 'border-success') return 'var(--success)';
    if (color === 'border-warning') return 'var(--warning)';
    if (color === 'border-cyan') return 'var(--cyan)';
    if (color === 'border-pink') return 'var(--pink)';
    if (color === 'border-purple') return 'var(--purple)';
    if (color === 'border-rose') return 'var(--danger)';
    return 'var(--gray)';
  };
  
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b-2" style={{ borderBottomColor: getBorderColor() }}>
      <div className="flex items-center gap-3">
        {Icon && <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500"><Icon size={18}/></div>}
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg">{count}</span>
      </div>
      <button className="text-slate-400 hover:text-slate-700 transition-colors p-1 hover:bg-slate-100 rounded-lg">
        <Plus size={20} />
      </button>
    </div>
  );
};

// --- Initiatives View Component ---

const InitiativesView = ({ initiativesData, onUpdateValue }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
    <div className="flex flex-col h-full">
      <ColumnHeader title="Infrastructure Setup" count={initiativesData.infrastructure.length} color="border-cyan" icon={Cpu} />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {initiativesData.infrastructure.map(item => (
          <ObjectiveCard 
            key={item.id} 
            item={item} 
            onUpdateValue={onUpdateValue}
            category="infrastructure"
            objectiveId={item.id}
          />
        ))}
      </div>
    </div>
    <div className="flex flex-col h-full">
      <ColumnHeader title="Data Loops" count={initiativesData.dataLoops.length} color="border-pink" icon={PenTool} />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {initiativesData.dataLoops.map(item => (
          <ObjectiveCard 
            key={item.id} 
            item={item} 
            onUpdateValue={onUpdateValue}
            category="dataLoops"
            objectiveId={item.id}
          />
        ))}
      </div>
    </div>
    <div className="flex flex-col h-full">
      <ColumnHeader title="Team Structure" count={initiativesData.teamStructure.length} color="border-purple" icon={Globe} />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {initiativesData.teamStructure.length > 0 ? (
          initiativesData.teamStructure.map(item => (
            <ObjectiveCard 
              key={item.id} 
              item={item} 
              onUpdateValue={onUpdateValue}
              category="teamStructure"
              objectiveId={item.id}
            />
          ))
        ) : (
          <div className="h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
            <span className="text-sm font-medium">No initiatives found</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function InitiativesPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Initiatives');
  const [selectedClient, setSelectedClient] = useState('VZY-Tv');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  
  // Load data from localStorage on mount, or use initial data
  const [initiativesData, setInitiativesData] = useState(() => {
    const savedData = localStorage.getItem('vzytvInitiativesData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Validate that the structure matches expected categories
        const expectedCategories = ['infrastructure', 'dataLoops', 'teamStructure'];
        const hasValidStructure = expectedCategories.every(cat => Array.isArray(parsed[cat]));
        
        // Also check if it has the new VZY Smart TV initiatives
        const hasNewStructure = parsed.infrastructure && parsed.infrastructure.some(obj => 
          obj.title === 'Growth Dashboard Setup' || obj.title === 'Attribution Tracking'
        );
        
        if (hasValidStructure && hasNewStructure) {
          return parsed;
        } else {
          // If structure doesn't match, use initial data
          return initialInitiativesData;
        }
      } catch (e) {
        return initialInitiativesData;
      }
    }
    return initialInitiativesData;
  });

  // Validate and reset data on mount if structure doesn't match
  useEffect(() => {
    const savedData = localStorage.getItem('vzytvInitiativesData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const hasNewStructure = parsed.infrastructure && parsed.infrastructure.some(obj => 
          obj.title === 'Growth Dashboard Setup' || obj.title === 'Attribution Tracking'
        );
        if (!hasNewStructure) {
          // Clear old data and use new structure
          localStorage.setItem('vzytvInitiativesData', JSON.stringify(initialInitiativesData));
          setInitiativesData(initialInitiativesData);
        }
      } catch (e) {
        localStorage.setItem('vzytvInitiativesData', JSON.stringify(initialInitiativesData));
        setInitiativesData(initialInitiativesData);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('vzytvInitiativesData', JSON.stringify(initiativesData));
  }, [initiativesData]);

  const clients = [
    '- Select Client -',
    'Fabulous Media',
    'GoCommercially',
    'Blue Energy Motors',
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
    setInitiativesData(prev => {
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
              <img 
                src="https://www.vzy.co.in/assets/logo-CLE74tod.png" 
                alt="VZY Smart TV Logo" 
                className="w-8 h-8 mr-3 object-contain"
              />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">GO <span style={{ color: 'var(--primary)' }}>Growth</span></span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/vzytv/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => navigate('/vzytv/objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => setActiveTab('Initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => navigate('/vzytv/experiments')} />
            
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
               <div className="bg-slate-100 rounded-lg px-3 py-2 min-w-[200px]">
                 <span className="text-xs font-bold text-slate-500 mr-2 uppercase">Client:</span>
                 <button
                   onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                   className="text-sm font-bold text-slate-800 flex items-center gap-1 cursor-pointer w-full justify-between"
                 >
                   <span className="truncate">{selectedClient === 'VZY-Tv' ? 'VZY-Tv' : selectedClient}</span>
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
                               navigate('/vzytv/dashboard');
                             } else if (client === 'HeadsUpB2b') {
                               navigate('/headsupb2b/dashboard');
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
                src="https://www.vzy.co.in/assets/logo-CLE74tod.png" 
                alt="VZY Smart TV Logo" 
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto h-full">
            <InitiativesView initiativesData={initiativesData} onUpdateValue={handleUpdateValue} />
          </div>
        </div>
      </main>
    </div>
  );
}

