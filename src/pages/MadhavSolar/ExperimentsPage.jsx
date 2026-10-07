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

// --- Madhav Solar Energy Experiment Tracks Data Structure ---
const initialExperimentsData = {
  "demandEngine": [
    {
      "id": 1,
      "title": "Residential Search + Local Meta Pilot",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Confirm serviceable cities in the 3 priority states",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Test savings versus reliability messaging",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Measure sales-accepted leads and surveys",
          "val": "0%",
          "weight": "40%"
        }
      ],
      "tag": "Ideas"
    },
    {
      "id": 2,
      "title": "C&I High-Intent Search Pilot",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Commercial rooftop and EPC intent clusters",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Sector-relevant project proof and assessment CTA",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Compare proposal value and cost per qualified lead",
          "val": "0%",
          "weight": "40%"
        }
      ],
      "tag": "Ideas"
    }
  ],
  "funnelOptimization": [
    {
      "id": 1,
      "title": "Savings Assessment vs Generic Enquiry",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Segment-specific assessment offer",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Bill, roof and timeline qualification",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Compare qualified assessment-to-survey conversion",
          "val": "0%",
          "weight": "35%"
        }
      ],
      "tag": "Ideas"
    },
    {
      "id": 2,
      "title": "Reliability Proof at the Conversion Point",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "In-house design and installation evidence",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Approved warranty and service terms",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Measure accepted-lead rate, not form count alone",
          "val": "0%",
          "weight": "35%"
        }
      ],
      "tag": "Ideas"
    }
  ],
  "contentVelocity": [
    {
      "id": 1,
      "title": "This Roof Is Costing You Money",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Real roof and factory footage approved",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Explain roof utilisation and business economics",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Track C&I assessments from the creative",
          "val": "0%",
          "weight": "35%"
        }
      ],
      "tag": "Ideas"
    },
    {
      "id": 2,
      "title": "Reliability Across the Solar Lifecycle",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Apply 25/20/20/15/10/10 content mix from brief",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Design, inspection and service explainers",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Publish approved customer and regional proof",
          "val": "0%",
          "weight": "35%"
        }
      ],
      "tag": "Ideas"
    }
  ],
  "retargetingNurture": [
    {
      "id": 1,
      "title": "Buyer-Specific Trust Retargeting",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Segment visitors, form abandoners and proof readers",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Test testimonials, FAQs and lifecycle support",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Measure incremental qualified assessments",
          "val": "0%",
          "weight": "35%"
        }
      ],
      "tag": "Ideas"
    },
    {
      "id": 2,
      "title": "Sales-Led Solar Nurture",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Match follow-ups to buying timeline and objections",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Use verified sector proof and commercial assessment",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Track held meetings, proposals and wins",
          "val": "0%",
          "weight": "35%"
        }
      ],
      "tag": "Ideas"
    }
  ],
  "prInfluence": [
    {
      "id": 1,
      "title": "Industrial Energy Economics Leadership",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Assign business, technical, finance and operations voices",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Publish approved engineering and business insights",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Connect distribution to resources and lead capture",
          "val": "0%",
          "weight": "35%"
        }
      ],
      "tag": "Ideas"
    },
    {
      "id": 2,
      "title": "Project Evidence into Reputation",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Verify project claims and secure customer sign-off",
          "val": "0%",
          "weight": "40%"
        },
        {
          "name": "Convert case study into PR and LinkedIn material",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Track technical consultations sourced from content",
          "val": "0%",
          "weight": "30%"
        }
      ],
      "tag": "Ideas"
    }
  ],
  "partnerChannel": [
    {
      "id": 1,
      "title": "Customer Testimonial + Referral Loop",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Capture installation and service feedback",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Secure approved regional testimonials",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Attribute referral quality and won project value",
          "val": "0%",
          "weight": "35%"
        }
      ],
      "tag": "Ideas"
    },
    {
      "id": 2,
      "title": "Local Commercial Referral Partners",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Validate consultants and relevant local partners",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Agree qualification and sales-routing process",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Compare partner opportunities with paid acquisition",
          "val": "0%",
          "weight": "35%"
        }
      ],
      "tag": "Ideas"
    }
  ],
  "investorStrategic": [
    {
      "id": 1,
      "title": "Industrial Authority + Account Pilot",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Confirm engineering and delivery capacity",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Select accounts and use verified industrial proof",
          "val": "0%",
          "weight": "30%"
        },
        {
          "name": "Measure technical meetings and viable proposals",
          "val": "0%",
          "weight": "35%"
        }
      ],
      "tag": "Ideas"
    },
    {
      "id": 2,
      "title": "Days 61–90: Geographic Scale Decision",
      "progress": 0,
      "status": false,
      "elements": [
        {
          "name": "Review Maharashtra, Gujarat and MP sales cohorts",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Check profitability, support and project-value thresholds",
          "val": "0%",
          "weight": "35%"
        },
        {
          "name": "Scale only markets with credible pipeline",
          "val": "0%",
          "weight": "30%"
        }
      ],
      "tag": "Ideas"
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

const ObjectiveCard = ({ item, onUpdateValue, onUpdateStatus, category, objectiveId }) => {
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
          <div>
            <h4 className="font-bold text-slate-800 text-[15px] leading-tight pr-4">{item.title}</h4>
            {item.tag && (
              <span className="inline-block mt-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {item.tag}
              </span>
            )}
          </div>
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

const ExperimentsView = ({ experimentsData, onUpdateValue, onUpdateStatus }) => {
  // Ensure all categories exist with default empty arrays
  const demandEngine = experimentsData?.demandEngine || [];
  const funnelOptimization = experimentsData?.funnelOptimization || [];
  const contentVelocity = experimentsData?.contentVelocity || [];
  const retargetingNurture = experimentsData?.retargetingNurture || [];
  const prInfluence = experimentsData?.prInfluence || [];
  const partnerChannel = experimentsData?.partnerChannel || [];
  const investorStrategic = experimentsData?.investorStrategic || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <div className="flex flex-col h-full">
        <ColumnHeader title="Demand Engine & Funnel" count={demandEngine.length + funnelOptimization.length} color="border-emerald-300" icon={DollarSign} />
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
          {demandEngine.length === 0 && funnelOptimization.length === 0 ? (
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
                  onUpdateStatus={onUpdateStatus}
                  category="demandEngine"
                  objectiveId={item.id}
                />
              ))}
              {funnelOptimization.map(item => (
                <ObjectiveCard 
                  key={item.id} 
                  item={item} 
                  onUpdateValue={onUpdateValue}
                  onUpdateStatus={onUpdateStatus}
                  category="funnelOptimization"
                  objectiveId={item.id}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col h-full">
        <ColumnHeader title="Content & Retargeting" count={contentVelocity.length + retargetingNurture.length} color="border-info" icon={Eye} />
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
          {contentVelocity.length === 0 && retargetingNurture.length === 0 ? (
            <div className="h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
              <span className="text-sm font-medium">No experiments found</span>
            </div>
          ) : (
            <>
              {contentVelocity.map(item => (
                <ObjectiveCard 
                  key={item.id} 
                  item={item} 
                  onUpdateValue={onUpdateValue}
                  onUpdateStatus={onUpdateStatus}
                  category="contentVelocity"
                  objectiveId={item.id}
                />
              ))}
              {retargetingNurture.map(item => (
                <ObjectiveCard 
                  key={item.id} 
                  item={item} 
                  onUpdateValue={onUpdateValue}
                  onUpdateStatus={onUpdateStatus}
                  category="retargetingNurture"
                  objectiveId={item.id}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col h-full">
        <ColumnHeader title="PR, Partners & Strategic" count={prInfluence.length + partnerChannel.length + investorStrategic.length} color="border-danger" icon={FlaskConical} />
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
          {prInfluence.length === 0 && partnerChannel.length === 0 && investorStrategic.length === 0 ? (
            <div className="h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
              <span className="text-sm font-medium">No experiments found</span>
            </div>
          ) : (
            <>
              {prInfluence.map(item => (
                <ObjectiveCard 
                  key={item.id} 
                  item={item} 
                  onUpdateValue={onUpdateValue}
                  onUpdateStatus={onUpdateStatus}
                  category="prInfluence"
                  objectiveId={item.id}
                />
              ))}
              {partnerChannel.map(item => (
                <ObjectiveCard 
                  key={item.id} 
                  item={item} 
                  onUpdateValue={onUpdateValue}
                  onUpdateStatus={onUpdateStatus}
                  category="partnerChannel"
                  objectiveId={item.id}
                />
              ))}
              {investorStrategic.map(item => (
                <ObjectiveCard 
                  key={item.id} 
                  item={item} 
                  onUpdateValue={onUpdateValue}
                  onUpdateStatus={onUpdateStatus}
                  category="investorStrategic"
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

export default function MadhavSolarExperimentsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Experiments');
  const [selectedClient, setSelectedClient] = useState('Madhav Solar Energy');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  
  // Completion is user-entered planning progress, stored only in this browser.
  const [experimentsData, setExperimentsData] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('madhavsolarExperimentsData') || 'null');
      const valid = parsed && Object.keys(initialExperimentsData).every(category =>
        Array.isArray(parsed[category]) && parsed[category].length === initialExperimentsData[category].length &&
        parsed[category].every((entry, index) => entry.id === initialExperimentsData[category][index].id &&
          entry.title === initialExperimentsData[category][index].title &&
          Array.isArray(entry.elements) && entry.elements.length === initialExperimentsData[category][index].elements.length &&
          entry.elements.every((element, elementIndex) => element.name === initialExperimentsData[category][index].elements[elementIndex].name &&
            element.weight === initialExperimentsData[category][index].elements[elementIndex].weight && typeof element.val === 'string' && typeof element.weight === 'string' &&
            Number.isFinite(parseFloat(element.val)) && parseFloat(element.val) >= 0 && parseFloat(element.val) <= 100))
      );
      return valid ? parsed : initialExperimentsData;
    } catch { return initialExperimentsData; }
  });

  useEffect(() => {
    try { localStorage.setItem('madhavsolarExperimentsData', JSON.stringify(experimentsData)); } catch { /* Storage may be unavailable. */ }
  }, [experimentsData]);

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

  const handleUpdateStatus = (category, id) => {
    setExperimentsData(previous => ({ ...previous, [category]: previous[category].map(item =>
      item.id === id ? { ...item, status: !item.status } : item) }));
  };

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
                src="https://madhavsolarenergy.com/wp-content/uploads/2023/07/MADHAV-SOLAR-ENERGY-scaled-1.png" 
                alt="Madhav Solar Energy Logo" 
                className="w-8 h-8 mr-3 object-contain"
              />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">GO <span style={{ color: 'var(--primary)' }}>Growth</span></span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/madhavsolar/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => navigate('/madhavsolar/objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => navigate('/madhavsolar/initiatives')} />
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

        <div className="bg-blue-50 border-b border-blue-100 px-6 lg:px-10 py-3 text-xs text-slate-600">
          Proposed Madhav Solar plan · Completion starts unassessed at 0%; update only after verification. Values measure plan completion, not business results. Status switches enable tracking; experiments are Ideas until approved. Changes stay in this browser.
        </div>

        <div className="bg-white border-b border-slate-200 px-6 lg:px-10 py-3 flex flex-wrap items-center gap-3">
          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-semibold">Proposed plan</span>
          <span className="text-xs text-slate-500">Expand a card to assess completion; use its switch to enable tracking.</span>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto h-full">
            <ExperimentsView experimentsData={experimentsData} onUpdateValue={handleUpdateValue}
                      onUpdateStatus={handleUpdateStatus} />
          </div>
        </div>
      </main>
    </div>
  );
}

