import React, { useState, useEffect } from 'react';
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
  FlaskConical,
  Eye,
  DollarSign,
  XCircle,
  Lightbulb,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

// --- MovoDream Experiment Tracks Data Structure ---
const initialExperimentsData = {
  demandEngine: [
    {
      id: 1,
      title: "AI Travel vs Traditional Travel messaging",
      progress: 24,
      status: true,
      tag: "In Process",
      elements: [
        { name: "AI Travel Messaging", val: "26%", weight: "50%" },
        { name: "Traditional Travel Messaging", val: "22%", weight: "50%" }
      ]
    },
    {
      id: 2,
      title: "Planning-first vs Booking-first creatives",
      progress: 20,
      status: true,
      tag: "In Process",
      elements: [
        { name: "Planning-first Creatives", val: "22%", weight: "50%" },
        { name: "Booking-first Creatives", val: "18%", weight: "50%" }
      ]
    }
  ],
  appFunnelOptimization: [
    {
      id: 3,
      title: "Store listing A/B tests",
      progress: 22,
      status: true,
      tag: "In Process",
      elements: [
        { name: "Store Listing Variant A", val: "24%", weight: "50%" },
        { name: "Store Listing Variant B", val: "20%", weight: "50%" }
      ]
    },
    {
      id: 4,
      title: "Onboarding flow experiments",
      progress: 18,
      status: true,
      tag: "Ideas",
      elements: [
        { name: "Onboarding Flow Variant A", val: "20%", weight: "50%" },
        { name: "Onboarding Flow Variant B", val: "16%", weight: "50%" }
      ]
    }
  ],
  aiFeatureAdoption: [
    {
      id: 5,
      title: "Itinerary-first nudges",
      progress: 26,
      status: true,
      tag: "In Process",
      elements: [
        { name: "Itinerary-first Nudge Strategy", val: "28%", weight: "50%" },
        { name: "Nudge Timing Optimization", val: "24%", weight: "50%" }
      ]
    },
    {
      id: 6,
      title: "Category plan tests (Luxury/Economy/Basic)",
      progress: 19,
      status: true,
      tag: "In Process",
      elements: [
        { name: "Category Plan Presentation", val: "21%", weight: "50%" },
        { name: "Decision Fatigue Reduction", val: "17%", weight: "50%" }
      ]
    }
  ],
  bookingConversion: [
    {
      id: 7,
      title: "AI trust cues vs price cues",
      progress: 20,
      status: true,
      tag: "In Process",
      elements: [
        { name: "AI Trust Cues", val: "22%", weight: "50%" },
        { name: "Price Cues", val: "18%", weight: "50%" }
      ]
    },
    {
      id: 8,
      title: "One-click booking UX tests",
      progress: 17,
      status: true,
      tag: "Ideas",
      elements: [
        { name: "One-click Booking UX", val: "19%", weight: "50%" },
        { name: "Booking Flow Optimization", val: "15%", weight: "50%" }
      ]
    }
  ],
  retentionCompanionUse: [
    {
      id: 9,
      title: "Push & WhatsApp journey tests",
      progress: 23,
      status: true,
      tag: "In Process",
      elements: [
        { name: "Push Notification Journeys", val: "25%", weight: "50%" },
        { name: "WhatsApp Journey Tests", val: "21%", weight: "50%" }
      ]
    },
    {
      id: 10,
      title: "On-trip assistant reminders",
      progress: 18,
      status: true,
      tag: "Ideas",
      elements: [
        { name: "On-trip Reminder Strategy", val: "20%", weight: "50%" },
        { name: "Assistant Reminder Timing", val: "16%", weight: "50%" }
      ]
    }
  ],
  contentEducation: [
    {
      id: 11,
      title: "How AI plans your trip series",
      progress: 21,
      status: true,
      tag: "In Process",
      elements: [
        { name: "AI Planning Education Series", val: "23%", weight: "50%" },
        { name: "Educational Content Production", val: "19%", weight: "50%" }
      ]
    },
    {
      id: 12,
      title: "Use-case led reels",
      progress: 16,
      status: true,
      tag: "Ideas",
      elements: [
        { name: "Use-case Reel Production", val: "18%", weight: "50%" },
        { name: "Trust Building Content", val: "14%", weight: "50%" }
      ]
    }
  ],
  partnerships: [
    {
      id: 13,
      title: "Creator-led installs",
      progress: 20,
      status: true,
      tag: "In Process",
      elements: [
        { name: "Creator Partnership Strategy", val: "22%", weight: "50%" },
        { name: "Creator Install Campaigns", val: "18%", weight: "50%" }
      ]
    },
    {
      id: 14,
      title: "Local partner cross-promo",
      progress: 17,
      status: true,
      tag: "Ideas",
      elements: [
        { name: "Local Partner Outreach", val: "19%", weight: "50%" },
        { name: "Cross-promotion Strategy", val: "15%", weight: "50%" }
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
          <div>
            <h4 className="font-bold text-slate-800 text-[15px] leading-tight pr-4">{item.title}</h4>
            {item.tag && (
              <span className="inline-block mt-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {item.tag}
              </span>
            )}
          </div>
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
            <button className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-50 rounded-lg transition-colors">
              <MessageSquare size={16} />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-50 rounded-lg transition-colors">
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
    if (color === 'border-info') return 'var(--info)';
    if (color === 'border-danger') return 'var(--danger)';
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

// --- Experiments View Component ---

const ExperimentsView = ({ experimentsData, onUpdateValue }) => {
  // Ensure all categories exist with default empty arrays
  const demandEngine = experimentsData?.demandEngine || [];
  const appFunnelOptimization = experimentsData?.appFunnelOptimization || [];
  const aiFeatureAdoption = experimentsData?.aiFeatureAdoption || [];
  const bookingConversion = experimentsData?.bookingConversion || [];
  const retentionCompanionUse = experimentsData?.retentionCompanionUse || [];
  const contentEducation = experimentsData?.contentEducation || [];
  const partnerships = experimentsData?.partnerships || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <div className="flex flex-col h-full">
        <ColumnHeader title="Demand & App Funnel" count={demandEngine.length + appFunnelOptimization.length} color="border-emerald-300" icon={DollarSign} />
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
          {demandEngine.length === 0 && appFunnelOptimization.length === 0 ? (
            <div className="h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
              <span className="text-sm font-medium">No experiments found</span>
            </div>
          ) : (
            <>
              {demandEngine.map(item => (
                <ObjectiveCard 
                  key={item.id} 
                  item={item} 
                  onUpdateValue={onUpdateValue}
                  category="demandEngine"
                  objectiveId={item.id}
                />
              ))}
              {appFunnelOptimization.map(item => (
                <ObjectiveCard 
                  key={item.id} 
                  item={item} 
                  onUpdateValue={onUpdateValue}
                  category="appFunnelOptimization"
                  objectiveId={item.id}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col h-full">
        <ColumnHeader title="AI Features & Booking" count={aiFeatureAdoption.length + bookingConversion.length} color="border-info" icon={Eye} />
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
          {aiFeatureAdoption.length === 0 && bookingConversion.length === 0 ? (
            <div className="h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
              <span className="text-sm font-medium">No experiments found</span>
            </div>
          ) : (
            <>
              {aiFeatureAdoption.map(item => (
                <ObjectiveCard 
                  key={item.id} 
                  item={item} 
                  onUpdateValue={onUpdateValue}
                  category="aiFeatureAdoption"
                  objectiveId={item.id}
                />
              ))}
              {bookingConversion.map(item => (
                <ObjectiveCard 
                  key={item.id} 
                  item={item} 
                  onUpdateValue={onUpdateValue}
                  category="bookingConversion"
                  objectiveId={item.id}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col h-full">
        <ColumnHeader title="Retention, Content & Partners" count={retentionCompanionUse.length + contentEducation.length + partnerships.length} color="border-danger" icon={FlaskConical} />
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
          {retentionCompanionUse.length === 0 && contentEducation.length === 0 && partnerships.length === 0 ? (
            <div className="h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
              <span className="text-sm font-medium">No experiments found</span>
            </div>
          ) : (
            <>
              {retentionCompanionUse.map(item => (
                <ObjectiveCard 
                  key={item.id} 
                  item={item} 
                  onUpdateValue={onUpdateValue}
                  category="retentionCompanionUse"
                  objectiveId={item.id}
                />
              ))}
              {contentEducation.map(item => (
                <ObjectiveCard 
                  key={item.id} 
                  item={item} 
                  onUpdateValue={onUpdateValue}
                  category="contentEducation"
                  objectiveId={item.id}
                />
              ))}
              {partnerships.map(item => (
                <ObjectiveCard 
                  key={item.id} 
                  item={item} 
                  onUpdateValue={onUpdateValue}
                  category="partnerships"
                  objectiveId={item.id}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ExperimentsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Experiments');
  const [selectedClient, setSelectedClient] = useState('MovoDream');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  
  // Load data from localStorage on mount, or use initial data
  const [experimentsData, setExperimentsData] = useState(() => {
    const savedData = localStorage.getItem('movodreamExperimentsData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Validate that the structure matches expected categories
        const expectedCategories = ['demandEngine', 'appFunnelOptimization', 'aiFeatureAdoption', 'bookingConversion', 'retentionCompanionUse', 'contentEducation', 'partnerships'];
        const hasValidStructure = expectedCategories.every(cat => Array.isArray(parsed[cat]));
        
        // Also check if it has the new VZY Smart TV experiments
        const hasNewStructure = parsed.demandEngine && parsed.demandEngine.some(obj => 
          obj.title && (obj.title.includes('Insight-led') || obj.title.includes('Buyer Persona'))
        );
        
        if (hasValidStructure && hasNewStructure) {
          return parsed;
        } else {
          // If structure doesn't match, use initial data
          return initialExperimentsData;
        }
      } catch (e) {
        return initialExperimentsData;
      }
    }
    return initialExperimentsData;
  });

  // Validate and reset data on mount if structure doesn't match
  useEffect(() => {
    const savedData = localStorage.getItem('movodreamExperimentsData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const hasNewStructure = parsed.demandEngine && parsed.demandEngine.some(obj => 
          obj.title && (obj.title.includes('Insight-led') || obj.title.includes('Buyer Persona'))
        );
        if (!hasNewStructure) {
          // Clear old data and use new structure
          localStorage.setItem('movodreamExperimentsData', JSON.stringify(initialExperimentsData));
          setExperimentsData(initialExperimentsData);
        }
      } catch (e) {
        localStorage.setItem('movodreamExperimentsData', JSON.stringify(initialExperimentsData));
        setExperimentsData(initialExperimentsData);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('movodreamExperimentsData', JSON.stringify(experimentsData));
  }, [experimentsData]);

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
    setExperimentsData(prev => {
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
                src="https://content.app-sources.com/s/432484035579470251/uploads/MovoDream/qt_q_95-removebg-preview-8201683.png?format=webp" 
                alt="MovoDream Logo" 
                className="w-8 h-8 mr-3 object-contain"
              />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">GO <span style={{ color: 'var(--primary)' }}>Growth</span></span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/movodream/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => navigate('/movodream/objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => navigate('/movodream/initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => setActiveTab('Experiments')} />
            
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
              <h2 className="text-xl font-bold text-slate-800">Experiments Tracker</h2>
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
                   <span className="truncate">{selectedClient === 'MovoDream' ? 'MovoDream' : selectedClient}</span>
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
                               navigate('/movodream/dashboard');
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
                             } else if (client === 'McRAYGOR') {
                               navigate('/mcraygor/dashboard');
                             } else if (client === 'MovoDream') {
                               navigate('/movodream/dashboard');
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
                src="https://content.app-sources.com/s/432484035579470251/uploads/MovoDream/qt_q_95-removebg-preview-8201683.png?format=webp" 
                alt="MovoDream Logo" 
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
            <ExperimentsView experimentsData={experimentsData} onUpdateValue={handleUpdateValue} />
          </div>
        </div>
      </main>
    </div>
  );
}

