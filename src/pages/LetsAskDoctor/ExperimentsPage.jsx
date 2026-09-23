import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  FlaskConical,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Eye,
  DollarSign,
  MessageSquare
} from "lucide-react";

// -------------------------
// Helpers
// -------------------------
const calculateProgress = (elements) => {
  if (!elements || elements.length === 0) return 0;

  let total = 0;
  elements.forEach((el) => {
    const val = parseFloat(el.val.replace("%", "")) || 0;
    const weight = parseFloat(el.weight.replace("%", "")) || 0;
    total += (val * weight) / 100;
  });

  return Math.round(total);
};

const getProgressColor = (progress) => {
  if (progress >= 70) return "#10B981";
  if (progress >= 40) return "#3B82F6";
  if (progress >= 20) return "#F59E0B";
  return "#EF4444";
};

const getTagStyles = (tag) => {
  if (tag === "In Process") return { bg: "#E8F3FF", text: "#2563EB" };
  if (tag === "Successful") return { bg: "#EAFBF2", text: "#059669" };
  if (tag === "Failed") return { bg: "#FEE2E2", text: "#DC2626" };
  if (tag === "Ideas") return { bg: "#FFF7ED", text: "#D97706" };
  return { bg: "#F1F5F9", text: "#64748B" };
};

// -------------------------
// Initial Data
// -------------------------
const initialExperimentsData = {
  demandEngine: [
    {
      id: 1,
      title: "LinkedIn Content A/B Tests (Insight-led vs Outcome-led)",
      tag: "In Process",
      status: true,
      elements: [
        { name: "CTR improvement", val: "30%", weight: "50%" },
        { name: "Comments from decision makers", val: "20%", weight: "50%" }
      ]
    },
    {
      id: 2,
      title: "Buyer Persona Campaigns (Contractor vs Enterprise)",
      tag: "In Process",
      status: true,
      elements: [
        { name: "Lead quality score", val: "20%", weight: "50%" },
        { name: "Inbound form submissions", val: "18%", weight: "50%" }
      ]
    }
  ],

  contentRetargeting: [
    {
      id: 3,
      title: "Weekly Procurement Insights",
      tag: "In Process",
      status: true,
      elements: [
        { name: "Average watch time", val: "40%", weight: "50%" },
        { name: "Shares / saves", val: "20%", weight: "50%" }
      ]
    },
    {
      id: 4,
      title: "Explainer Reels on Demand Aggregation",
      tag: "Ideas",
      status: true,
      elements: [
        { name: "Reach lift", val: "10%", weight: "50%" },
        { name: "Click-through to profile", val: "15%", weight: "50%" }
      ]
    }
  ],

  prPartners: [
    {
      id: 5,
      title: "Industry Articles on Procurement Efficiency",
      tag: "In Process",
      status: true,
      elements: [
        { name: "Inbound partnership interest", val: "15%", weight: "50%" },
        { name: "Brand authority mentions", val: "20%", weight: "50%" }
      ]
    },
    {
      id: 6,
      title: "Founder POV Features",
      tag: "Ideas",
      status: true,
      elements: [
        { name: "Comment quality", val: "10%", weight: "50%" },
        { name: "Profile visits", val: "15%", weight: "50%" }
      ]
    }
  ]
};

// -------------------------
// UI Components
// -------------------------
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
      active
        ? "text-white shadow-lg"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    }`}
    style={active ? { backgroundColor: "#5867DD" } : {}}
  >
    <div className="flex items-center gap-3">
      <Icon
        size={20}
        className={active ? "text-white" : "text-slate-400 group-hover:text-slate-900"}
      />
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
  <div
    className="flex items-center justify-between mb-6 pb-4 border-b-2"
    style={{ borderBottomColor: underlineColor }}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className="text-slate-700" />
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

const FilterItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      active ? "bg-slate-100 text-slate-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
    }`}
  >
    <Icon size={18} className={active ? "text-slate-700" : "text-slate-400"} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const ExperimentCard = ({ item, onUpdateValue, category, experimentId }) => {
  const [expanded, setExpanded] = useState(false);

  const progress = calculateProgress(item.elements);
  const barColor = getProgressColor(progress);
  const tagStyle = getTagStyles(item.tag);

  // Convert % to slider (1-10)
  const percentageToSlider = (percentage) => {
    const val = parseFloat(percentage.replace("%", "")) || 0;
    return Math.max(1, Math.round(val / 10));
  };

  // Convert slider to %
  const sliderToPercentage = (sliderValue) => sliderValue * 10;

  const handleSliderChange = (elementIndex, sliderValue) => {
    const percentage = sliderToPercentage(sliderValue);
    onUpdateValue(category, experimentId, elementIndex, `${percentage}%`);
  };

  // Same element BG colors (like your screenshot)
  const getElementBgColor = (index) => {
    const shades = [
      "bg-blue-50",
      "bg-emerald-50",
      "bg-amber-50",
      "bg-purple-50",
      "bg-pink-50",
      "bg-cyan-50",
      "bg-indigo-50",
      "bg-rose-50"
    ];
    return shades[index % shades.length];
  };

  // Same slider colors (like your Objectives page)
  const getSliderColor = (index) => {
    const colors = [
      { main: "#2563EB", text: "#2563EB" }, // blue
      { main: "#10B981", text: "#10B981" }, // green
      { main: "#F59E0B", text: "#F59E0B" }, // amber
      { main: "#7C3AED", text: "#7C3AED" }, // purple
      { main: "#EC4899", text: "#EC4899" }, // pink
      { main: "#06B6D4", text: "#06B6D4" }, // cyan
      { main: "#4F46E5", text: "#4F46E5" }, // indigo
      { main: "#EF4444", text: "#EF4444" }  // red
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4 className="font-bold text-slate-900 text-[16px] leading-snug pr-4">
            {item.title}
          </h4>

          <div
            className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
              item.status ? "bg-emerald-500" : "bg-slate-200"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                item.status ? "translate-x-5" : "translate-x-1"
              } mt-0.5`}
            />
          </div>
        </div>

        <div className="mb-4">
          <span
            className="inline-flex text-[11px] font-bold px-3 py-1 rounded-full"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {item.tag.toUpperCase()}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold tracking-wide text-slate-500 uppercase">
              Success Rate
            </span>
            <span className="text-sm font-bold text-slate-900">{progress}%</span>
          </div>
          <ProgressBar percentage={progress} color={barColor} />
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronRight size={18} />}
          {expanded ? "Hide Elements" : `View Elements (${item.elements.length})`}
        </button>
      </div>

      {/* EXPANDED ELEMENTS */}
      {expanded && (
        <div className="bg-slate-50 border-t border-slate-100 px-6 py-5 space-y-5">
          {item.elements.map((el, idx) => {
            const sliderValue = percentageToSlider(el.val);
            const sliderColor = getSliderColor(idx);

            // Fill percentage for slider background
            const fillPercent = (sliderValue - 1) * 11.11;

            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex items-center gap-2 text-slate-700 px-3 py-2 rounded-lg ${getElementBgColor(
                      idx
                    )}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span className="font-semibold text-slate-800 text-sm">
                      {el.name}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
                    {el.weight} wgt
                  </span>
                </div>

                <div className="pl-2 flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={sliderValue}
                    onChange={(e) =>
                      handleSliderChange(idx, parseInt(e.target.value))
                    }
                    className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${sliderColor.main} 0%, ${sliderColor.main} ${fillPercent}%, #e2e8f0 ${fillPercent}%, #e2e8f0 100%)`
                    }}
                  />

                  <span
                    className="text-sm font-bold min-w-[45px] text-right"
                    style={{ color: sliderColor.text }}
                  >
                    {sliderToPercentage(sliderValue)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FOOTER */}
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
// -------------------------
// Page
// -------------------------
export default function ExperimentsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Experiments");
  const [selectedClient, setSelectedClient] = useState("Let's Ask The Doctor");
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("In Process");

  const [experimentsState, setExperimentsState] = useState(() => {
    const saved = localStorage.getItem("ladExperimentsData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const expected = ["demandEngine", "contentRetargeting", "prPartners"];
        const valid = expected.every((k) => Array.isArray(parsed[k]));
        if (valid) return parsed;
        return initialExperimentsData;
      } catch {
        return initialExperimentsData;
      }
    }
    return initialExperimentsData;
  });

  useEffect(() => {
    localStorage.setItem("ladExperimentsData", JSON.stringify(experimentsState));
  }, [experimentsState]);

  const clients = ["- Select Client -", "HeadsUpB2b", "Let's Ask The Doctor", "Montra Truck", "Puno", "Sany"];

  const handleUpdateValue = (category, experimentId, elementIndex, newValue) => {
    setExperimentsState((prev) => {
      const updated = { ...prev };
      const categoryArray = [...updated[category]];
      const expIndex = categoryArray.findIndex((obj) => obj.id === experimentId);

      if (expIndex !== -1) {
        const updatedExperiment = { ...categoryArray[expIndex] };
        const updatedElements = [...updatedExperiment.elements];

        updatedElements[elementIndex] = {
          ...updatedElements[elementIndex],
          val: newValue
        };

        updatedExperiment.elements = updatedElements;
        categoryArray[expIndex] = updatedExperiment;
        updated[category] = categoryArray;
      }

      return updated;
    });
  };

  const filterByTag = (arr) => arr.filter((x) => x.tag === activeFilter);

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans text-slate-900 overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-white shadow-xl lg:shadow-none lg:border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="h-full flex flex-col">
          <div className="h-20 flex items-center px-8 border-b border-slate-50">
            <button onClick={() => navigate("/home")} className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 mr-3 rounded-xl bg-indigo-100 flex items-center justify-center text-[9px] font-bold text-indigo-700 uppercase">
                LAD
              </div>
              <span className="text-2xl font-bold text-slate-800 tracking-tight">
                GO <span style={{ color: "#5867DD" }}>Growth</span>
              </span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === "Dashboard"} onClick={() => navigate("/letsaskdoctor/dashboard")} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === "Initiatives"} onClick={() => navigate("/letsaskdoctor/initiatives")} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === "Experiments"} onClick={() => setActiveTab("Experiments")} />
            <div className="my-6 border-t border-slate-100 mx-2"></div>
            <SidebarItem icon={Settings} label="Settings" active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} />
          </div>
        </div>
      </aside>

      {/* Main */}
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
              <span className="text-sm font-medium text-slate-500">{activeFilter}</span>
            </div>
          </div>

          {/* Client Dropdown */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative">
              <div className="bg-slate-100 rounded-lg px-3 py-2 min-w-[220px]">
                <span className="text-xs font-bold text-slate-500 mr-2 uppercase">Client:</span>
                <button
                  onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                  className="text-sm font-bold text-slate-800 flex items-center gap-1 cursor-pointer w-full justify-between"
                >
                  <span className="truncate">{selectedClient}</span>
                  <ChevronDown size={14} className={`transition-transform ${clientDropdownOpen ? "rotate-180" : ""}`} />
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
                          }
                          setClientDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                          selectedClient === client ? "bg-slate-100 font-semibold text-slate-900" : "text-slate-700"
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

        {/* Filters */}
        <div className="bg-white border-b border-slate-200 px-6 lg:px-10 py-3">
          <div className="flex items-center gap-6">
            <FilterItem icon={FlaskConical} label="In Process" active={activeFilter === "In Process"} onClick={() => setActiveFilter("In Process")} />
            <FilterItem icon={CheckCircle2} label="Successful" active={activeFilter === "Successful"} onClick={() => setActiveFilter("Successful")} />
            <FilterItem icon={XCircle} label="Failed" active={activeFilter === "Failed"} onClick={() => setActiveFilter("Failed")} />
            <FilterItem icon={Lightbulb} label="Ideas" active={activeFilter === "Ideas"} onClick={() => setActiveFilter("Ideas")} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
              <div className="flex flex-col h-full">
                <ColumnHeader icon={DollarSign} title="Demand Engine & Funnel" count={filterByTag(experimentsState.demandEngine).length} underlineColor="#64748B" />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {filterByTag(experimentsState.demandEngine).map((item) => (
                    <ExperimentCard key={item.id} item={item} onUpdateValue={handleUpdateValue} category="demandEngine" experimentId={item.id} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col h-full">
                <ColumnHeader icon={Eye} title="Content & Retargeting" count={filterByTag(experimentsState.contentRetargeting).length} underlineColor="#2563EB" />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {filterByTag(experimentsState.contentRetargeting).map((item) => (
                    <ExperimentCard key={item.id} item={item} onUpdateValue={handleUpdateValue} category="contentRetargeting" experimentId={item.id} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col h-full">
                <ColumnHeader icon={FlaskConical} title="PR, Partners & Strategic" count={filterByTag(experimentsState.prPartners).length} underlineColor="#EF4444" />
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                  {filterByTag(experimentsState.prPartners).map((item) => (
                    <ExperimentCard key={item.id} item={item} onUpdateValue={handleUpdateValue} category="prPartners" experimentId={item.id} />
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
