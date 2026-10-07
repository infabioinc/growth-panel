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

const trackerStages = ['In Process', 'Successful', 'Failed', 'Ideas'];
const getTrackerStage = (item) => {
  if (item.workflowStatus === 'Failed') return 'Failed';
  if (!item.status) return 'Ideas';
  return calculateProgress(item.elements) === 100 ? 'Successful' : 'In Process';
};

// --- Madhav Solar Energy Core Objectives Data Structure ---
const initialObjectivesData = {
  "coreObjectives": [
    {
      "id": 1,
      "title": "Build Residential + C&I Qualified Demand",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Residential savings-assessment journey",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "C&I opportunity-assessment journey",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Sales-accepted lead criteria",
          "val": "0%",
          "weight": "30%"
        }
      ]
    },
    {
      "id": 2,
      "title": "Own Premium Reliability",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "In-house design evidence",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Quality material and installation proof",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Service and warranty documentation",
          "val": "0%",
          "weight": "35%"
        }
      ]
    },
    {
      "id": 3,
      "title": "Expand Priority State Demand",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Maharashtra local acquisition system",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Gujarat local acquisition system",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Madhya Pradesh expansion validation",
          "val": "0%",
          "weight": "30%"
        }
      ]
    }
  ],
  "strategicKPIs": [
    {
      "id": 1,
      "title": "Qualified Pipeline Contribution",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Qualified enquiries by source and segment",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Site surveys and sales meetings held",
          "val": "0%",
          "weight": "25%"
        },
        {
          "name": "Proposal value and won revenue attributed",
          "val": "0%",
          "weight": "40%"
        }
      ]
    },
    {
      "id": 2,
      "title": "Industrial Authority Development",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Verified industrial case studies",
          "val": "0%",
          "weight": "40%"
        },
        {
          "name": "Engineering and execution content",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Technical leadership visibility",
          "val": "0%",
          "weight": "25%"
        }
      ]
    },
    {
      "id": 3,
      "title": "Geographic Growth Efficiency",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "State-wise cost per qualified lead",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "State-wise proposal conversion",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Revenue and service capacity by market",
          "val": "0%",
          "weight": "30%"
        }
      ]
    }
  ],
  "growthMetrics": [
    {
      "id": 1,
      "title": "Lead Quality Framework",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Bill, property and roof feasibility",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Buying timeline and decision-maker intent",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Project value and rejection-reason capture",
          "val": "0%",
          "weight": "35%"
        }
      ]
    },
    {
      "id": 2,
      "title": "Funnel Conversion Visibility",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Enquiry to qualified opportunity",
          "val": "0%",
          "weight": "25%"
        },
        {
          "name": "Qualified opportunity to site survey",
          "val": "0%",
          "weight": "25%"
        },
        {
          "name": "Survey to proposal",
          "val": "0%",
          "weight": "25%"
        },
        {
          "name": "Proposal to won project",
          "val": "0%",
          "weight": "25%"
        }
      ]
    },
    {
      "id": 3,
      "title": "Commercial Baseline Readiness",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Lead volume, media spend and current CPL",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Lead-to-sale conversion and response time",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Segment split, state revenue and margins",
          "val": "0%",
          "weight": "30%"
        }
      ]
    }
  ]
};

const clientRoutes = {
  "Madhav Solar Energy": "/madhavsolar/dashboard",
  "LetsAskDoctor": "/letsaskdoctor/dashboard",
  "Fabulous Media": "/fabulousmedia/dashboard",
  "Battery Smart": "/batterysmart/dashboard",
  "Workwear Express": "/workwearexpress/dashboard",
  "Step Ahead Workwear": "/stepahead/dashboard",
  "WRTS Gym": "/wrtsgym/dashboard",
  "Bonfit": "/bonfit/dashboard",
  "Puno": "/puno/dashboard",
  "Montra Truck": "/montra/dashboard",
  "Sany": "/sany/dashboard",
  "HeadsUpB2b": "/headsupb2b/dashboard",
  "Tailworld": "/tailworld/dashboard",
  "Blue Energy Motors": "/blueenergymotors/dashboard",
  "InstaGroup": "/instagroup/dashboard",
  "VZY-Tv": "/vzytv/dashboard",
  "McRAYGOR": "/mcraygor/dashboard",
  "MovoDream": "/movodream/dashboard",
  "A2 Bilona Ghee": "/a2bilonaghee/dashboard",
  "Yastudy": "/yastudy/dashboard",
  "Kaizen Technicals": "/kaizen/dashboard",
  "IPL Tech Electric": "/ipltech/dashboard",
  "SID Real Tech": "/sidrealtech/dashboard",
  "MindDhara": "/minddhara/dashboard",
  "Mystery Rooms": "/mysteryrooms/dashboard",
  "Afiway": "/afiway/dashboard",
  "MCI": "/mci/dashboard",
  "Travbeez": "/travebeez/dashboard",
  "Tallento": "/tallento/dashboard",
  "BoxOffice": "/boxoffice/dashboard",
  "DeepHorizon": "/deephorizon/dashboard"
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

const proposedTargets = {
  coreObjectives: {
    1: '90-day acquisition target: 120 qualified Residential + C&I leads from 300 enquiries.',
    2: '90-day delivery target: 6 verified project cases, 6 approved testimonials and 3 lifecycle proof assets.',
    3: '90-day delivery target: 3 state landing journeys with confirmed city coverage and sales routing.',
  },
  strategicKPIs: {
    1: 'Scenario: 60 surveys → 30 proposals / ₹75 lakh pipeline → 12 wins / ₹30 lakh gross project revenue.',
    2: '90-day delivery target: 2 industrial case studies within the 6-case proof library + 12 engineering / leadership posts.',
    3: '90-day measurement target: weekly reporting for all 3 priority states across spend, lead quality and proposals.',
  },
  growthMetrics: {
    1: 'Scenario targets: 40% sales acceptance; ₹2,500 cost per qualified lead on ₹3 lakh media spend.',
    2: 'Scenario conversion targets: 50% qualified-to-survey, 50% survey-to-proposal, 40% proposal-to-win.',
    3: 'Days 1–30 target: agree 100% of baseline definitions with Sales Head before approving the media plan.',
  },
};

const ObjectiveCard = ({ item, onUpdateValue, onUpdateStatus, onUpdateStage, category, objectiveId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate progress dynamically
  const calculatedProgress = calculateProgress(item.elements);
  
  // Determine color based on progress (Using project color palette)
  let colorClass = 'bg-danger';
  if (calculatedProgress >= 70) colorClass = 'bg-success';
  else if (calculatedProgress >= 40) colorClass = 'bg-info';
  else if (calculatedProgress >= 20) colorClass = 'bg-warning';
  
  // Convert percentage to slider value (0-10)
  const percentageToSlider = (percentage) => {
    const val = parseFloat(percentage.replace('%', '')) || 0;
    return Math.max(0, Math.min(10, Math.round(val / 10))); // Allow an unstarted track to remain at 0%.
  };

  // Convert slider value (0-10) to percentage
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
          <button
            type="button"
            role="switch"
            aria-checked={item.status}
            aria-label={`Enable tracking for ${item.title}`}
            onClick={() => onUpdateStatus(category, objectiveId)}
            className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${item.status ? '' : 'bg-slate-200'}`}
            style={item.status ? { backgroundColor: 'var(--success)' } : {}}
          >
            <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.status ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Plan completion</span>
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
        <p className="text-xs text-blue-700 bg-blue-50 rounded-lg p-3 mb-4 leading-relaxed"><span className="font-semibold">Proposed target · </span>{proposedTargets[category]?.[objectiveId]}<span className="block text-slate-500 mt-1">Planning assumption; validate against baseline, budget and capacity.</span></p>
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
                      min="0"
                      aria-label={`Completion for ${el.name}`}
                      max="10"
                      step="1"
                      value={sliderValue}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        handleSliderChange(idx, newValue);
                      }}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${sliderColor.main} 0%, ${sliderColor.main} ${sliderValue * 10}%, #e2e8f0 ${sliderValue * 10}%, #e2e8f0 100%)`
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
        <div className="px-5 py-3 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
          <label htmlFor={`stage-${category}-${objectiveId}`} className="text-xs font-medium text-slate-500">Tracking status</label>
          <select id={`stage-${category}-${objectiveId}`} value={getTrackerStage(item)}
            onChange={(event) => onUpdateStage(category, objectiveId, event.target.value)}
            className="text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
            {trackerStages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
          </select>
        </div>
      )}
    </div>
  );
};

const FilterItem = ({ icon: Icon, label, active, onClick }) => (
  <button type="button" onClick={onClick} aria-pressed={active}
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

export default function MadhavSolarObjectivesPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Objectives');
  const [selectedClient, setSelectedClient] = useState('Madhav Solar Energy');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  
  // Completion is user-entered planning progress, stored only in this browser.
  const [objectivesData, setObjectivesData] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('madhavsolarObjectivesData') || 'null');
      const valid = parsed && Object.keys(initialObjectivesData).every(category =>
        Array.isArray(parsed[category]) && parsed[category].length === initialObjectivesData[category].length &&
        parsed[category].every((entry, index) => entry.id === initialObjectivesData[category][index].id &&
          entry.title === initialObjectivesData[category][index].title &&
          Array.isArray(entry.elements) && entry.elements.length === initialObjectivesData[category][index].elements.length &&
          entry.elements.every((element, elementIndex) => element.name === initialObjectivesData[category][index].elements[elementIndex].name &&
            element.weight === initialObjectivesData[category][index].elements[elementIndex].weight && typeof element.val === 'string' && typeof element.weight === 'string' &&
            Number.isFinite(parseFloat(element.val)) && parseFloat(element.val) >= 0 && parseFloat(element.val) <= 100))
      );
      return valid ? parsed : initialObjectivesData;
    } catch { return initialObjectivesData; }
  });

  useEffect(() => {
    try { localStorage.setItem('madhavsolarObjectivesData', JSON.stringify(objectivesData)); } catch { /* Storage may be unavailable. */ }
  }, [objectivesData]);

  const clients = [
    '- Select Client -',
    'Madhav Solar Energy',
    'Fabulous Media',
    'Battery Smart',
    'Workwear Express',
    'Step Ahead Workwear',
    'WRTS Gym',
    'Bonfit',
    'Afiway',
    'A2 Bilona Ghee',
    'MCI',
    'Blue Energy Motors',
    'HeadsUpB2b',
    'InstaGroup',
    'IPL Tech Electric',
    'Kaizen Technicals',
    'LetsAskDoctor',
    'McRAYGOR',
    'MindDhara',
    'Montra Truck',
    'MovoDream',
    'Mystery Rooms',
    'Puno',
    'Sany',
    'SID Real Tech',
    'Tailworld',
    'Tallento',
    'BoxOffice',
    'DeepHorizon',
    'Travbeez',
    'VZY-Tv',
    'Yastudy',
  ];

  const [activeFilter, setActiveFilter] = useState(() =>
    trackerStages.find(stage => Object.values(objectivesData).flat().some(item => getTrackerStage(item) === stage)) || 'Ideas');
  const filteredData = Object.fromEntries(Object.entries(objectivesData).map(([category, items]) =>
    [category, items.filter(item => getTrackerStage(item) === activeFilter)]));
  const visibleCount = Object.values(filteredData).flat().length;

  const handleUpdateStage = (category, id, stage) => {
    setObjectivesData(previous => ({ ...previous, [category]: previous[category].map(item => {
      if (item.id !== id) return item;
      const elements = stage === 'Successful' ? item.elements.map(element => ({ ...element, val: '100%' })) : item.elements;
      // Returning a completed track to In Process preserves its assessed values.
      const nextStage = stage === 'In Process' && calculateProgress(elements) === 100 ? 'Successful' : stage;
      return { ...item, elements, status: nextStage !== 'Ideas', workflowStatus: nextStage === 'Failed' ? 'Failed' : undefined };
    }) }));
    const current = objectivesData[category].find(item => item.id === id);
    setActiveFilter(stage === 'In Process' && calculateProgress(current.elements) === 100 ? 'Successful' : stage);
  };
  const handleUpdateStatus = (category, id) => {
    const item = objectivesData[category].find(entry => entry.id === id);
    handleUpdateStage(category, id, item.status ? 'Ideas' : 'In Process');
  };

  // Function to update element value
  const handleUpdateValue = (category, objectiveId, elementIndex, newValue) => {
    const item = objectivesData[category].find(entry => entry.id === objectiveId);
    const nextElements = item.elements.map((element, index) => index === elementIndex ? { ...element, val: newValue } : element);
    setActiveFilter(getTrackerStage({ ...item, elements: nextElements }));
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
                src="https://madhavsolarenergy.com/wp-content/uploads/2023/07/MADHAV-SOLAR-ENERGY-scaled-1.png" 
                alt="Madhav Solar Energy Logo" 
                className="w-8 h-8 mr-3 object-contain"
              />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">GO <span style={{ color: 'var(--primary)' }}>Growth</span></span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/madhavsolar/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => setActiveTab('Objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => navigate('/madhavsolar/initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => navigate('/madhavsolar/experiments')} />
            
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
              <span className="text-sm font-medium text-slate-500">{activeFilter}</span>
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
                   <span className="truncate">{selectedClient === 'Madhav Solar Energy' ? 'Madhav Solar Energy' : selectedClient}</span>
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
                             const targetRoute = clientRoutes[client];
                             if (targetRoute) navigate(targetRoute);
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
                src="https://madhavsolarenergy.com/wp-content/uploads/2023/07/MADHAV-SOLAR-ENERGY-scaled-1.png" 
                alt="Madhav Solar Energy Logo" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-white p-1 object-contain"
              />
            </div>
          </div>
        </header>

        <div className="bg-white border-b border-slate-200 px-6 lg:px-10 py-3 flex flex-wrap items-center gap-5 lg:gap-7">
          {[[FileText, 'In Process'], [CheckCircle2, 'Successful'], [XCircle, 'Failed'], [Lightbulb, 'Ideas']].map(([icon, label]) => (
            <FilterItem key={label} icon={icon} label={label} active={activeFilter === label} onClick={() => setActiveFilter(label)} />
          ))}
        </div>

        {/* Scrollable Content - Kanban Style Layout */}
        <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto h-full">
            <p className="text-xs text-slate-500 mb-5">Proposed plan · Percentages track assessed completion. Expand a card to update it; changes are saved in this browser.</p>
            {visibleCount === 0 && <p className="mb-6 rounded-xl bg-white p-5 text-sm text-slate-500">No tracks in {activeFilter}. Select Ideas to review the proposed plan.</p>}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
              
              {/* Column 1: Core Objectives */}
              <div className="flex flex-col h-full">
                <ColumnHeader title="Core Objectives" count={filteredData.coreObjectives.length} color="border-indigo" />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {filteredData.coreObjectives.map(item => (
                    <ObjectiveCard 
                      key={item.id} 
                      item={item} 
                      onUpdateValue={handleUpdateValue}
                      onUpdateStatus={handleUpdateStatus}
                      onUpdateStage={handleUpdateStage}
                      category="coreObjectives"
                      objectiveId={item.id}
                    />
                  ))}
                </div>
              </div>

              {/* Column 2: Strategic KPIs */}
              <div className="flex flex-col h-full">
                <ColumnHeader title="Strategic KPIs" count={filteredData.strategicKPIs.length} color="border-success" />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {filteredData.strategicKPIs.map(item => (
                    <ObjectiveCard 
                      key={item.id} 
                      item={item} 
                      onUpdateValue={handleUpdateValue}
                      onUpdateStatus={handleUpdateStatus}
                      onUpdateStage={handleUpdateStage}
                      category="strategicKPIs"
                      objectiveId={item.id}
                    />
                  ))}
                </div>
              </div>

              {/* Column 3: Growth Metrics */}
              <div className="flex flex-col h-full">
                <ColumnHeader title="Growth Metrics (OKRs)" count={filteredData.growthMetrics.length} color="border-warning" />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {filteredData.growthMetrics.map(item => (
                    <ObjectiveCard 
                      key={item.id} 
                      item={item} 
                      onUpdateValue={handleUpdateValue}
                      onUpdateStatus={handleUpdateStatus}
                      onUpdateStage={handleUpdateStage}
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

