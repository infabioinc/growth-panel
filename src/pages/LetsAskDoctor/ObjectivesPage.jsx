import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";

// --- Helper function to calculate progress based on weighted average ---
const calculateProgress = (elements) => {
  if (!elements || elements.length === 0) return 0;

  let totalProgress = 0;
  elements.forEach((element) => {
    const val = parseFloat(element.val.replace("%", "")) || 0;
    const weight = parseFloat(element.weight.replace("%", "")) || 0;
    totalProgress += (val * weight) / 100;
  });

  return Math.round(totalProgress);
};

// --- LET'S ASK THE DOCTOR Objectives Data Structure ---
const initialObjectivesData = {
  coreObjectives: [
    {
      id: 1,
      title: "Audience Trust & Demand",
      progress: 32,
      status: true,
      elements: [
        { name: "Repeat viewers share", val: "35%", weight: "30%" },
        { name: "Sessions with 2+ videos watched", val: "30%", weight: "25%" },
        { name: "Saves & shares per video", val: "32%", weight: "25%" },
        { name: "Return visits to channel", val: "28%", weight: "20%" },
      ],
    },
    {
      id: 2,
      title: "Authority Velocity",
      progress: 30,
      status: true,
      elements: [
        { name: "Doctor / brand inbound requests", val: "30%", weight: "30%" },
        { name: "Mentions in other platforms", val: "28%", weight: "25%" },
        { name: "Searches for channel / doctor name", val: "26%", weight: "25%" },
        { name: "Expert recall in comments & DMs", val: "24%", weight: "20%" },
      ],
    },
    {
      id: 3,
      title: "Content Retention",
      progress: 28,
      status: true,
      elements: [
        { name: "Average view duration", val: "30%", weight: "30%" },
        { name: "Series completion rate", val: "28%", weight: "25%" },
        { name: "Binge sessions (3+ episodes)", val: "26%", weight: "25%" },
        { name: "Playlist usage per viewer", val: "22%", weight: "20%" },
      ],
    },
    {
      id: 4,
      title: "Monetization Readiness",
      progress: 24,
      status: true,
      elements: [
        { name: "High-intent CTAs clicked", val: "26%", weight: "30%" },
        { name: "Consult / learn-more interest", val: "24%", weight: "25%" },
        { name: "Email / WhatsApp opt-ins", val: "22%", weight: "25%" },
        { name: "Structured consult / program pipeline", val: "20%", weight: "20%" },
      ],
    },
    {
      id: 5,
      title: "ROI Accountability",
      progress: 30,
      status: true,
      elements: [
        { name: "Cost per engaged viewer", val: "30%", weight: "30%" },
        { name: "Content group ROI vs baseline", val: "28%", weight: "30%" },
        { name: "Attribution from content to outcomes", val: "26%", weight: "25%" },
        { name: "Low-value formats killed", val: "22%", weight: "15%" },
      ],
    },
  ],
  strategicKPIs: [
    {
      id: 6,
      title: "Audience KPIs",
      progress: 32,
      status: true,
      elements: [
        { name: "Average watch time (+25% QoQ)", val: "34%", weight: "35%" },
        { name: "Sessions with 2+ videos", val: "30%", weight: "30%" },
        { name: "Repeat viewers growth", val: "28%", weight: "25%" },
        { name: "Depth across age & interest clusters", val: "24%", weight: "10%" },
      ],
    },
    {
      id: 7,
      title: "Trust KPIs",
      progress: 30,
      status: true,
      elements: [
        { name: "Save & share rate (8–10%)", val: "32%", weight: "35%" },
        { name: "Comments asking follow-ups", val: "28%", weight: "30%" },
        { name: "DMs requesting help / clarity", val: "26%", weight: "25%" },
        { name: "Health decisions influenced by content", val: "22%", weight: "10%" },
      ],
    },
    {
      id: 8,
      title: "Content KPIs",
      progress: 28,
      status: true,
      elements: [
        { name: "Series completion (30–40%)", val: "30%", weight: "35%" },
        { name: "Performance of top 20% formats", val: "28%", weight: "30%" },
        { name: "Bottom 30% formats killed", val: "26%", weight: "25%" },
        { name: "Content library mapped to pillars", val: "22%", weight: "10%" },
      ],
    },
    {
      id: 9,
      title: "Discovery KPIs",
      progress: 26,
      status: true,
      elements: [
        { name: "Shorts reach growth (2–3x monthly)", val: "30%", weight: "35%" },
        { name: "New subscriber share from Shorts", val: "26%", weight: "30%" },
        { name: "Click-through to long-form episodes", val: "24%", weight: "25%" },
        { name: "Search & suggested traffic quality", val: "20%", weight: "10%" },
      ],
    },
    {
      id: 10,
      title: "Authority KPIs",
      progress: 27,
      status: true,
      elements: [
        { name: "Doctor / brand / hospital inbound (5–10/quarter)", val: "30%", weight: "35%" },
        { name: "Media features & mentions", val: "26%", weight: "30%" },
        { name: "Panels / webinar invitations", val: "24%", weight: "25%" },
        { name: "Positioning as health authority, not influencer", val: "20%", weight: "10%" },
      ],
    },
    {
      id: 11,
      title: "Monetization KPIs",
      progress: 25,
      status: true,
      elements: [
        { name: "High-intent clicks & forms", val: "28%", weight: "35%" },
        { name: "Email / WhatsApp list growth", val: "26%", weight: "30%" },
        { name: "500+ intent signals / quarter", val: "24%", weight: "25%" },
        { name: "Pilot monetization test live", val: "18%", weight: "10%" },
      ],
    },
  ],
  growthMetrics: [
    {
      id: 12,
      title: "90-Day Execution Rhythm",
      progress: 30,
      status: true,
      elements: [
        { name: "Weeks 1–2: Dashboard & KPI map live", val: "32%", weight: "25%" },
        { name: "Weeks 3–4: Audience & content pillars defined", val: "30%", weight: "25%" },
        { name: "Weeks 5–8: Series & Shorts experiments run", val: "28%", weight: "25%" },
        { name: "Weeks 9–12: Partnerships & community pilots", val: "26%", weight: "25%" },
      ],
    },
    {
      id: 13,
      title: "OKR Discipline",
      progress: 28,
      status: true,
      elements: [
        { name: "O1: Trust-led audience growth", val: "30%", weight: "25%" },
        { name: "O2: Authority collaborations", val: "28%", weight: "25%" },
        { name: "O3: Content efficiency", val: "26%", weight: "25%" },
        { name: "O4: Monetization readiness", val: "24%", weight: "25%" },
      ],
    },
    {
      id: 14,
      title: "Global Health Learnings",
      progress: 26,
      status: true,
      elements: [
        { name: "Trust > virality in health decisions", val: "30%", weight: "25%" },
        { name: "Series > random topics", val: "28%", weight: "25%" },
        { name: "Data → content, not intuition", val: "26%", weight: "25%" },
        { name: "Health impact stories tracked", val: "22%", weight: "25%" },
      ],
    },
  ],
};

// --- Components ---
const SidebarItem = ({ icon: Icon, label, active, onClick, hasSubmenu }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
      active
        ? "text-white shadow-lg"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    }`}
    style={
      active
        ? {
            backgroundColor: "var(--primary)",
            boxShadow: "0 10px 15px -3px rgba(88, 103, 221, 0.1)",
          }
        : {}
    }
  >
    <div className="flex items-center gap-3">
      <Icon
        size={20}
        className={active ? "text-white" : "text-slate-400 group-hover:text-slate-900"}
      />
      <span className="font-medium text-[15px]">{label}</span>
    </div>
    {hasSubmenu && (
      <ChevronDown size={16} className={`opacity-50 ${active ? "text-white" : ""}`} />
    )}
  </button>
);

const ProgressBar = ({ percentage, colorClass }) => {
  const getColorValue = () => {
    if (colorClass === "bg-success") return "var(--success)";
    if (colorClass === "bg-info") return "var(--info)";
    if (colorClass === "bg-warning") return "var(--warning)";
    if (colorClass === "bg-danger") return "var(--danger)";
    return "var(--gray)";
  };

  return (
    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
      <div
        className="h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%`, backgroundColor: getColorValue() }}
      />
    </div>
  );
};

const ObjectiveCard = ({ item, onUpdateValue, category, objectiveId }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const calculatedProgress = calculateProgress(item.elements);

  let colorClass = "bg-danger";
  if (calculatedProgress >= 70) colorClass = "bg-success";
  else if (calculatedProgress >= 40) colorClass = "bg-info";
  else if (calculatedProgress >= 20) colorClass = "bg-warning";

  const percentageToSlider = (percentage) => {
    const val = parseFloat(percentage.replace("%", "")) || 0;
    return Math.max(1, Math.round(val / 10));
  };

  const sliderToPercentage = (sliderValue) => sliderValue * 10;

  const handleSliderChange = (elementIndex, sliderValue) => {
    const percentage = sliderToPercentage(sliderValue);
    onUpdateValue(category, objectiveId, elementIndex, `${percentage}%`);
  };

  const getElementBgColor = (index) => {
    const shades = [
      "bg-blue-50",
      "bg-emerald-50",
      "bg-amber-50",
      "bg-purple-50",
      "bg-pink-50",
      "bg-cyan-50",
      "bg-indigo-50",
      "bg-rose-50",
    ];
    return shades[index % shades.length];
  };

  const getSliderColor = (index) => {
    const colors = [
      { main: "var(--blue)", text: "var(--blue)" },
      { main: "var(--success)", text: "var(--success)" },
      { main: "var(--warning)", text: "var(--warning)" },
      { main: "var(--purple)", text: "var(--purple)" },
      { main: "var(--pink)", text: "var(--pink)" },
      { main: "var(--cyan)", text: "var(--cyan)" },
      { main: "var(--indigo)", text: "var(--indigo)" },
      { main: "var(--danger)", text: "var(--danger)" },
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-4 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-bold text-slate-800 text-[15px] leading-tight pr-4">
            {item.title}
          </h4>

          <div
            className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              item.status ? "" : "bg-slate-200"
            }`}
            style={item.status ? { backgroundColor: "var(--success)" } : {}}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                item.status ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Success Rate
            </span>
            <span className="text-sm font-bold text-slate-800">{calculatedProgress}%</span>
          </div>
          <ProgressBar percentage={calculatedProgress} colorClass={colorClass} />
        </div>

        {item.elements.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors"
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--info)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronRight size={14} />}
            {isExpanded ? "Hide Elements" : `View Elements (${item.elements.length})`}
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
                  <div
                    className={`flex items-center gap-2 text-slate-700 px-3 py-2 rounded-lg ${getElementBgColor(
                      idx
                    )}`}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-slate-400 transition-colors"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "var(--info)")
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                    />
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
                        background: `linear-gradient(to right, ${sliderColor.main} 0%, ${sliderColor.main} ${
                          (sliderValue - 1) * 11.11
                        }%, #e2e8f0 ${(sliderValue - 1) * 11.11}%, #e2e8f0 100%)`,
                      }}
                    />
                    <span
                      className="text-xs font-bold min-w-[35px] text-right"
                      style={{ color: sliderColor.text }}
                    >
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
          <button className="p-1.5 text-slate-400 rounded-lg transition-colors hover:bg-slate-100 hover:text-slate-700">
            <MessageSquare size={16} />
          </button>
          <button className="p-1.5 text-slate-400 rounded-lg transition-colors hover:bg-slate-100 hover:text-slate-700">
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
        ? "bg-slate-100 text-slate-700"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
    }`}
  >
    <Icon size={18} className={active ? "text-slate-700" : "text-slate-400"} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const ColumnHeader = ({ title, count, color }) => {
  const getBorderColor = () => {
    if (color === "border-indigo") return "var(--indigo)";
    if (color === "border-success") return "var(--success)";
    if (color === "border-warning") return "var(--warning)";
    return "var(--gray)";
  };

  return (
    <div
      className="flex items-center justify-between mb-6 pb-4 border-b-2"
      style={{ borderBottomColor: getBorderColor() }}
    >
      <div className="flex items-center gap-3">
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg">
          {count}
        </span>
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
  const [activeTab, setActiveTab] = useState("Objectives");
  const [selectedClient, setSelectedClient] = useState("Let's Ask The Doctor");
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const [objectivesData, setObjectivesData] = useState(() => {
    const savedData = localStorage.getItem("letsAskDoctorObjectivesData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const expectedCategories = ["coreObjectives", "strategicKPIs", "growthMetrics"];
        const hasValidStructure = expectedCategories.every((cat) => Array.isArray(parsed[cat]));
        if (hasValidStructure) return parsed;
        return initialObjectivesData;
      } catch {
        return initialObjectivesData;
      }
    }
    return initialObjectivesData;
  });

  useEffect(() => {
    localStorage.setItem("letsAskDoctorObjectivesData", JSON.stringify(objectivesData));
  }, [objectivesData]);

  const clients = [
    "- Select Client -",
    "Fabulous Media",
    "GoCommercially",
    "HeadsUpB2b",
    "Human Touch",
    "India Meets India",
    "Infabio, Inc.",
    "InstaGroup",
    "IPL Tech Electric",
    "Let's Ask The Doctor",
    "Oxxy",
    "Puno",
    "Montra Truck",
    "Ria Gupta",
    "Sany",
    "Tailworld",
    "VZY-Tv",
    "McRAYGOR",
    "MovoDream",
    "A2 Bilona Ghee",
    "Yastudy",
    "Kaizen Technicals",
  ];

  const handleUpdateValue = (category, objectiveId, elementIndex, newValue) => {
    setObjectivesData((prev) => {
      const updated = { ...prev };
      const categoryArray = [...updated[category]];
      const objectiveIndex = categoryArray.findIndex((obj) => obj.id === objectiveId);

      if (objectiveIndex !== -1) {
        const updatedObjective = { ...categoryArray[objectiveIndex] };
        const updatedElements = [...updatedObjective.elements];

        updatedElements[elementIndex] = {
          ...updatedElements[elementIndex],
          val: newValue,
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
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-white shadow-xl lg:shadow-none lg:border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="h-full flex flex-col">
          <div className="h-20 flex items-center px-8 border-b border-slate-50">
            <button
              onClick={() => navigate("/home")}
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 mr-3 rounded-xl bg-indigo-100 flex items-center justify-center text-[9px] font-bold text-indigo-700 uppercase">
                LAD
              </div>
              <span className="text-2xl font-bold text-slate-800 tracking-tight">
                GO <span style={{ color: "var(--primary)" }}>Growth</span>
              </span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              active={activeTab === "Dashboard"}
              onClick={() => navigate("/letsaskdoctor/dashboard")}
            />
            <SidebarItem
              icon={Target}
              label="Objectives"
              active={activeTab === "Objectives"}
              onClick={() => setActiveTab("Objectives")}
            />
            <SidebarItem
              icon={Box}
              label="Initiatives"
              active={activeTab === "Initiatives"}
              onClick={() => navigate("/letsaskdoctor/initiatives")}
            />
            <SidebarItem
              icon={ListOrdered}
              label="Experiments"
              active={activeTab === "Experiments"}
              onClick={() => navigate("/letsaskdoctor/experiments")}
            />

            <div className="my-6 border-t border-slate-100 mx-2"></div>

            <SidebarItem
              icon={Settings}
              label="Settings"
              active={activeTab === "Settings"}
              onClick={() => setActiveTab("Settings")}
            />
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white shadow-sm lg:shadow-none lg:border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:bg-slate-100 rounded-lg text-slate-600"
            >
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
                <span className="text-xs font-bold text-slate-500 mr-2 uppercase">
                  Client:
                </span>
                <button
                  onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                  className="text-sm font-bold text-slate-800 flex items-center gap-1 cursor-pointer w-full justify-between"
                >
                  <span className="truncate">{selectedClient}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${clientDropdownOpen ? "rotate-180" : ""}`}
                  />
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
                          if (client !== "- Select Client -") {
                            setSelectedClient(client);

                            if (client === "Puno") navigate("/puno/dashboard");
                            else if (client === "Sany") navigate("/sany/dashboard");
                            else if (client === "Montra Truck") navigate("/montra/dashboard");
                            else if (client === "HeadsUpB2b") navigate("/headsupb2b/dashboard");
                            else if (client === "Tailworld") navigate("/tailworld/dashboard");
                            else if (client === "InstaGroup") navigate("/instagroup/dashboard");
                            else if (client === "VZY-Tv") navigate("/vzytv/dashboard");
                            else if (client === "Yastudy") navigate("/yastudy/dashboard");
                            else if (client === "Kaizen Technicals") navigate("/kaizen/dashboard");
                            else if (client === "Ria Gupta") navigate("/riagupta/dashboard");
                            else if (client === "Oxxy") navigate("/oxxy/dashboard");
                            else if (client === "Let's Ask The Doctor")
                              navigate("/letsaskdoctor/dashboard");
                          }
                          setClientDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                          selectedClient === client
                            ? "bg-slate-100 font-semibold text-slate-900"
                            : "text-slate-700"
                        } ${client === "- Select Client -" ? "text-slate-400 italic" : ""}`}
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
                <ColumnHeader
                  title="Core Objectives"
                  count={objectivesData.coreObjectives.length}
                  color="border-indigo"
                />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {objectivesData.coreObjectives.map((item) => (
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

              <div className="flex flex-col h-full">
                <ColumnHeader
                  title="Strategic KPIs"
                  count={objectivesData.strategicKPIs.length}
                  color="border-success"
                />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {objectivesData.strategicKPIs.map((item) => (
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

              <div className="flex flex-col h-full">
                <ColumnHeader
                  title="Growth Metrics"
                  count={objectivesData.growthMetrics.length}
                  color="border-warning"
                />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {objectivesData.growthMetrics.map((item) => (
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
