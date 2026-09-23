import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Box, 
  Heart, 
  MessageSquare, 
  ListOrdered, 
  TrendingUp, 
  Calendar, 
  CheckSquare, 
  FileText, 
  Users, 
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
  Clock,
  Activity,
  AlertCircle,
  BarChart,
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
  Share2,
  Star
} from 'lucide-react';

// --- Data Structure extracted from your HTML ---
const objectivesData = {
  brand: [
    {
      id: 1,
      title: "India's 1st EV truck Positioning",
      progress: 36,
      status: true,
      elements: [
        { name: "Search Rankings", val: "100%", weight: "30%" },
        { name: "Linkedin Influence", val: "30%", weight: "30%" },
        { name: "Social Media", val: "40%", weight: "20%" },
        { name: "Marketing Automation", val: "60%", weight: "10%" },
        { name: "Unified Theme", val: "80%", weight: "10%" }
      ]
    },
    {
      id: 2,
      title: "Umbrella Branding",
      progress: 34,
      status: true,
      elements: [
        { name: "Name/ Branding", val: "40%", weight: "30%" },
        { name: "Composition", val: "30%", weight: "20%" },
        { name: "Marketing Collaterals", val: "30%", weight: "40%" },
        { name: "Positioning", val: "40%", weight: "10%" }
      ]
    },
    {
      id: 3,
      title: "Masterpiece Website",
      progress: 66,
      status: true,
      elements: [
        { name: "Pixel Perfect Mockups", val: "60%", weight: "20%" },
        { name: "Benchmarked Sections", val: "70%", weight: "20%" },
        { name: "Unified Theme", val: "90%", weight: "40%" },
        { name: "Mobile/ Tablet First", val: "20%", weight: "20%" }
      ]
    },
    {
      id: 4,
      title: "Brand Guidelines",
      progress: 68,
      status: true,
      elements: [
        { name: "Logo Usage Guidelines", val: "80%", weight: "20%" },
        { name: "Color Palette and Typography", val: "90%", weight: "20%" },
        { name: "Brand Voice and Messaging", val: "60%", weight: "20%" },
        { name: "Web Ecosystem Voice", val: "80%", weight: "20%" },
        { name: "Social Voice", val: "30%", weight: "20%" }
      ]
    },
    {
      id: 5,
      title: "Brand Collaterals",
      progress: 52,
      status: true,
      elements: [
        { name: "Leaflet", val: "50%", weight: "20%" },
        { name: "Brochure", val: "70%", weight: "20%" },
        { name: "Visiting Card", val: "40%", weight: "20%" },
        { name: "Letterhead", val: "40%", weight: "20%" },
        { name: "Standee", val: "60%", weight: "20%" }
      ]
    }
  ],
  marketing: [
    {
      id: 6,
      title: "Social Media Growth",
      progress: 18,
      status: true,
      elements: [
        { name: "Follower Growth 1 lakh", val: "3%", weight: "15%" },
        { name: "Social Engagement Rate", val: "20%", weight: "10%" },
        { name: "Community Building", val: "30%", weight: "25%" },
        { name: "Influencer Marketing", val: "0%", weight: "30%" },
        { name: "Social Listening", val: "40%", weight: "20%" }
      ]
    },
    {
      id: 7,
      title: "Google Analytics",
      progress: 27,
      status: true,
      elements: [
        { name: "Improve user engagement", val: "60%", weight: "30%" },
        { name: "Optimise customer journey", val: "30%", weight: "20%" },
        { name: "Boost referral traffic", val: "4%", weight: "20%" },
        { name: "Reduce bounce rate", val: "5%", weight: "20%" },
        { name: "Increase pages/session", val: "10%", weight: "10%" }
      ]
    },
    {
      id: 8,
      title: "SEO Growth",
      progress: 43,
      status: true,
      elements: [
        { name: "Rank on first page", val: "90%", weight: "30%" },
        { name: "Increase organic traffic", val: "40%", weight: "20%" },
        { name: "Improve DA to 40", val: "20%", weight: "20%" },
        { name: "Fully optimised mobile", val: "10%", weight: "20%" },
        { name: "Increase conversion rates", val: "20%", weight: "10%" }
      ]
    },
    {
      id: 9,
      title: "Conversion Rate Optimisation",
      progress: 0,
      status: true,
      elements: [
        { name: "A/B Testing", val: "0%", weight: "30%" },
        { name: "UX Optimization", val: "0%", weight: "30%" },
        { name: "Conversion Funnel Analysis", val: "0%", weight: "40%" }
      ]
    },
    {
      id: 10,
      title: "Youtube, Linkedin, Google Ads",
      progress: 10,
      status: true,
      elements: []
    }
  ],
  leadSales: [
    {
      id: 11,
      title: "Marketing Automation",
      progress: 30,
      status: true,
      elements: [
        { name: "SMM Canned Responses", val: "50%", weight: "30%" },
        { name: "Email Automation", val: "30%", weight: "40%" },
        { name: "Chatbot Automation", val: "10%", weight: "30%" }
      ]
    },
    {
      id: 12,
      title: "Lead Generation Framework",
      progress: 0,
      status: true,
      elements: []
    },
    {
      id: 13,
      title: "Sponsored Ads Management",
      progress: 7,
      status: true,
      elements: [
        { name: "Search/Display", val: "2%", weight: "30%" },
        { name: "Linkedin Inmail", val: "5%", weight: "20%" },
        { name: "Whatsapp Campaign", val: "10%", weight: "20%" },
        { name: "Meta Page Like", val: "10%", weight: "15%" },
        { name: "Meta Social Boost", val: "10%", weight: "15%" }
      ]
    },
    {
      id: 14,
      title: "Local Listings",
      progress: 0,
      status: true,
      elements: [
        { name: "Local Awareness", val: "0%", weight: "30%" },
        { name: "GMB Update", val: "0%", weight: "30%" },
        { name: "Online Reviews Mgmt", val: "0%", weight: "40%" }
      ]
    },
    {
      id: 15,
      title: "Community",
      progress: 0,
      status: true,
      elements: [
        { name: "Broadcast Channels", val: "0%", weight: "50%" },
        { name: "Community Postings", val: "0%", weight: "50%" }
      ]
    }
  ]
};

// --- Initiatives Data Structure ---
const initiativesData = {
  technology: [
    {
      id: 2225,
      title: "Live Chat",
      progress: 0,
      status: true,
      elements: [
        { name: "Chatbot", val: "0%", weight: "100%" }
      ]
    }
  ],
  design: [
    {
      id: 2314,
      title: "Wrap Design",
      progress: 49,
      status: true,
      elements: [
        { name: "Dussehra Festive Creative", val: "100%", weight: "5%" },
        { name: "Wrap Design", val: "40%", weight: "20%" },
        { name: "Brand Guidelines", val: "90%", weight: "35%" },
        { name: "Brochure", val: "10%", weight: "40%" }
      ]
    }
  ],
  digital: []
};

// --- Experiments Data Structure (New) ---
const experimentsData = {
  revenue: [
    {
      id: 301,
      title: "Marketing Campaign",
      progress: 0,
      status: true,
      tag: "Ideas",
      elements: []
    }
  ],
  visibility: [
    {
      id: 302,
      title: "Pan India",
      progress: 0,
      status: true,
      tag: "Ideas",
      elements: []
    }
  ],
  conversion: [
    {
      id: 303,
      title: "CRO: Conversion System",
      progress: 0,
      status: true,
      tag: "Ideas",
      elements: []
    }
  ]
};

// --- Activity Log Data (Updated from HTML) ---
const activityLog = [
  { date: '13 Mar', time: '03:32', text: "Topic named Brand Guidelines status changed to Active.", type: 'danger' },
  { date: '13 Mar', time: '03:32', text: "Topic named Brand Guidelines status changed to Inactive.", type: 'success' },
  { date: '05 Dec', time: '11:37', text: "Added New Comment on Task with Task ID : 63.", type: 'brand' },
  { date: '05 Dec', time: '11:37', text: "Updated Comment with Comment ID : 17.", type: 'warning' },
  { date: '05 Dec', time: '11:37', text: "Added New Comment on Task with Task ID : 63.", type: 'info' },
];

const auditLog = [
  { title: "Marketing Campaign", subtitle: "Revenue - Ideas", type: "success" },
  { title: "Pan India", subtitle: "Visibility - Ideas", type: "info" },
  { title: "CRO", subtitle: "Conversion System - Ideas", type: "danger" },
];

// --- Dashboard Objectives Widget Data (Updated from HTML) ---
const dashboardObjectives = [
  { title: "GO Screen", cat: "Lead | Sales Ideas", color: "bg-cyan-300" },
  { title: "Broadcast Channels", cat: "Lead | Sales Objectives", color: "bg-amber-300" },
  { title: "Sponsored Ads Management", cat: "Lead | Sales Objectives", color: "bg-amber-300" },
  { title: "Response", cat: "Marketing Ideas", color: "bg-blue-300" },
  { title: "ROI Tracker", cat: "Marketing Ideas", color: "bg-rose-300" },
  { title: "Analytics", cat: "Marketing Objectives", color: "bg-blue-300" },
  { title: "Conversion Rate 20%", cat: "Lead | Sales Ideas", color: "bg-cyan-300" }
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, hasSubmenu }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-blue-300 text-white shadow-lg shadow-blue-200' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'} />
      <span className="font-medium text-[15px]">{label}</span>
    </div>
    {hasSubmenu && <ChevronDown size={16} className={`opacity-50 ${active ? 'text-white' : ''}`} />}
  </button>
);

const ProgressBar = ({ percentage, colorClass }) => (
  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
    <div 
      className={`h-2.5 rounded-full transition-all duration-500 ${colorClass}`} 
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

// --- Sub-Views ---

const ObjectiveCard = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  let colorClass = 'bg-rose-300';
  if (item.progress >= 70) colorClass = 'bg-emerald-300';
  else if (item.progress >= 40) colorClass = 'bg-blue-300';
  else if (item.progress >= 20) colorClass = 'bg-amber-300';

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
          <div className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${item.status ? 'bg-emerald-300' : 'bg-slate-200'}`}>
            <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.status ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Success Rate</span>
            <span className="text-sm font-bold text-slate-800">{item.progress}%</span>
          </div>
          <ProgressBar percentage={item.progress} colorClass={colorClass} />
        </div>

        {item.elements.length > 0 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-blue-400 transition-colors"
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronRight size={14} />}
            {isExpanded ? 'Hide Elements' : `View Elements (${item.elements.length})`}
          </button>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && item.elements.length > 0 && (
        <div className="bg-slate-50 border-t border-slate-100 p-4 space-y-3">
          {item.elements.map((el, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm group">
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-300 transition-colors"></div>
                <span>{el.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">{el.weight} wgt</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${parseInt(el.val) > 50 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                  {el.val}
                </span>
              </div>
            </div>
          ))}
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

const ColumnHeader = ({ title, count, color, icon: Icon }) => (
  <div className={`flex items-center justify-between mb-6 pb-4 border-b-2 ${color}`}>
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

// --- View Components ---

const ObjectivesView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
    <div className="flex flex-col h-full">
      <ColumnHeader title="Brand Objectives" count={objectivesData.brand.length} color="border-indigo-300" />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {objectivesData.brand.map(item => <ObjectiveCard key={item.id} item={item} />)}
      </div>
    </div>
    <div className="flex flex-col h-full">
      <ColumnHeader title="Marketing Objectives" count={objectivesData.marketing.length} color="border-emerald-500" />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {objectivesData.marketing.map(item => <ObjectiveCard key={item.id} item={item} />)}
      </div>
    </div>
    <div className="flex flex-col h-full">
      <ColumnHeader title="Lead | Sales Objectives" count={objectivesData.leadSales.length} color="border-amber-500" />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {objectivesData.leadSales.map(item => <ObjectiveCard key={item.id} item={item} />)}
      </div>
    </div>
  </div>
);

const InitiativesView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
    <div className="flex flex-col h-full">
      <ColumnHeader title="Technology Initiatives" count={initiativesData.technology.length} color="border-cyan-500" icon={Cpu} />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {initiativesData.technology.map(item => <ObjectiveCard key={item.id} item={item} />)}
      </div>
    </div>
    <div className="flex flex-col h-full">
      <ColumnHeader title="Design Initiatives" count={initiativesData.design.length} color="border-pink-500" icon={PenTool} />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {initiativesData.design.map(item => <ObjectiveCard key={item.id} item={item} />)}
      </div>
    </div>
    <div className="flex flex-col h-full">
      <ColumnHeader title="Digital Initiatives" count={initiativesData.digital.length} color="border-violet-500" icon={Globe} />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {initiativesData.digital.length > 0 ? (
          initiativesData.digital.map(item => <ObjectiveCard key={item.id} item={item} />)
        ) : (
          <div className="h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
            <span className="text-sm font-medium">No initiatives found</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const ExperimentsView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
    <div className="flex flex-col h-full">
      <ColumnHeader title="Revenue Experiments" count={experimentsData.revenue.length} color="border-emerald-500" icon={DollarSign} />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {experimentsData.revenue.map(item => <ObjectiveCard key={item.id} item={item} />)}
      </div>
    </div>
    <div className="flex flex-col h-full">
      <ColumnHeader title="Visibility Experiments" count={experimentsData.visibility.length} color="border-blue-500" icon={Eye} />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {experimentsData.visibility.map(item => <ObjectiveCard key={item.id} item={item} />)}
      </div>
    </div>
    <div className="flex flex-col h-full">
      <ColumnHeader title="Conversion Experiments" count={experimentsData.conversion.length} color="border-rose-500" icon={FlaskConical} />
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {experimentsData.conversion.map(item => <ObjectiveCard key={item.id} item={item} />)}
      </div>
    </div>
  </div>
);

const DashboardView = () => (
  <div className="space-y-6 max-w-7xl mx-auto pb-10">
    {/* Profile & Growth Card */}
    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left: Profile Info */}
        <div className="flex-1">
          <div className="flex items-start gap-6 mb-8">
            <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
              <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop" alt="User Profile" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-tl-xl"></div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-slate-900">Nikhil Sharma</h2>
                    <CheckCircle2 size={20} className="text-blue-500 fill-blue-50" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                      Upgrade Growth Score
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="flex flex-wrap gap-4 mt-6">
                 {[
                   { label: 'Initiator', val: '20%', color: 'text-emerald-600 bg-emerald-50', icon: Zap },
                   { label: 'Committed', val: '0%', color: 'text-rose-600 bg-rose-50', icon: Target },
                   { label: 'Accelerated', val: '0%', color: 'text-rose-600 bg-rose-50', icon: TrendingUp },
                   { label: 'Elevated', val: '0%', color: 'text-rose-600 bg-rose-50', icon: ArrowUpRight },
                 ].map((stat, i) => (
                   <div key={i} className="flex flex-col px-4 py-2 border border-slate-100 border-dashed rounded-xl bg-slate-50/50 min-w-[120px]">
                      <div className="flex items-center gap-2 mb-1">
                        <stat.icon size={14} className={stat.color.split(' ')[0]} />
                        <span className={`text-lg font-bold ${stat.color.split(' ')[0]}`}>{stat.val}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {['Overview', 'Branding', 'Marketing', 'Technology', 'Growth'].map((tab, i) => (
              <button key={tab} className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${i === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Growth Score Gauge */}
        <div className="w-full lg:w-72 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-100 text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Growth Score</h3>
            <p className="text-xs text-slate-500 mb-6">Your business growth percentage</p>
            
            {/* CSS Gauge Simulation */}
            <div className="relative w-40 h-20 overflow-hidden mb-4">
               <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[16px] border-slate-200 box-border"></div>
               <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[16px] border-emerald-400 border-b-transparent border-l-transparent border-r-transparent transform rotate-[135deg] origin-center box-border opacity-30"></div>
               {/* 200 Score simulation - low progress */}
               <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[16px] border-emerald-500 border-b-transparent border-l-transparent border-r-transparent transform rotate-[-45deg] origin-center box-border" style={{ clipPath: 'polygon(0 0, 40% 0, 50% 50%, 0 100%)'}}></div> 
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-slate-800 rounded-full z-10"></div>
               <div className="absolute bottom-0 left-1/2 w-20 h-1 bg-slate-800 origin-left rotate-[-120deg] z-0"></div>
            </div>
            
            <div className="text-4xl font-bold text-slate-900 mb-4">200</div>
            <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-blue-200">
              View Report
            </button>
        </div>
      </div>
    </div>

    {/* Middle Row: Stats & Charts */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* 3 Stats Column */}
      <div className="space-y-4">
         {[
           { label: 'Traffic', val: '475.00', sub: 'Avg Monthly Traffic', icon: Users, color: 'text-blue-600' },
           { label: 'Bounce Rate %', val: '20.00', sub: 'Avg Monthly Bounce Rate', icon: ArrowDownRight, color: 'text-rose-600' },
           { label: 'Conversions', val: '150.00', sub: 'Avg Monthly Conversions', icon: CheckCircle2, color: 'text-emerald-600' }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="text-slate-500 font-semibold text-sm mb-1">{stat.label}</h4>
                <p className="text-xs text-slate-400">{stat.sub}</p>
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.val}</div>
           </div>
         ))}
      </div>

      {/* Daily Leads Chart Placeholder */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        <div className="mb-4">
          <h3 className="font-bold text-slate-800">Daily Leads</h3>
          <p className="text-xs text-slate-400">Check each column for details</p>
        </div>
        <div className="flex-1 flex items-end justify-between gap-2 h-32 px-2">
            {[40, 60, 30, 80, 50, 70, 40].map((h, i) => (
              <div key={i} className="w-full bg-blue-100 rounded-t-lg hover:bg-blue-500 transition-colors" style={{ height: `${h}%` }}></div>
            ))}
        </div>
      </div>

      {/* Growth Rate Pie Chart Placeholder */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
         <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-slate-800">Growth Rate</h3>
              <p className="text-xs text-slate-400">% as per Groups</p>
            </div>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-600 rounded-lg outline-none">
              <option>Objectives</option>
              <option>Initiatives</option>
            </select>
         </div>
         <div className="flex-1 flex items-center justify-center relative">
            <div className="w-32 h-32 rounded-full border-[12px] border-indigo-500 border-r-amber-400 border-b-blue-400"></div>
            <div className="absolute flex flex-col items-center">
              <span className="text-xs font-bold text-slate-400">Total</span>
              <span className="text-lg font-bold text-slate-800">21</span>
            </div>
         </div>
         <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span> In Process (9)
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Ideas (12)
            </div>
         </div>
      </div>
    </div>

    {/* Bottom Row: Lists & Logs */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Objectives List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-50 bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Objectives</h3>
        </div>
        <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-96 custom-scrollbar">
           {dashboardObjectives.map((task, i) => (
             <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="mt-1">
                   <input type="checkbox" disabled className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </div>
                <div>
                   <p className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">{task.title}</p>
                   <div className="flex items-center gap-2 mt-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${task.color}`}></span>
                      <span className="text-xs text-slate-400 font-medium">{task.cat}</span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-50 bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Activity Log</h3>
        </div>
        <div className="p-5 flex-1 overflow-y-auto max-h-96 custom-scrollbar">
           <div className="relative pl-4 border-l border-slate-200 space-y-8">
              {activityLog.map((log, i) => (
                <div key={i} className="relative">
                   <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ring-1 ring-slate-200 ${
                     log.type === 'danger' ? 'bg-rose-500' : 
                     log.type === 'success' ? 'bg-emerald-500' :
                     log.type === 'brand' ? 'bg-indigo-600' : 'bg-slate-400'
                   }`}></span>
                   <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-slate-400">{log.date}, {log.time}</span>
                      <p className="text-sm text-slate-600 leading-relaxed">{log.text}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Experiment Audit */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-50 bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Experiment Audit</h3>
        </div>
        <div className="p-4 space-y-2">
           {auditLog.map((item, i) => (
             <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  item.type === 'success' ? 'bg-emerald-500' : 
                  item.type === 'info' ? 'bg-blue-500' : 'bg-rose-500'
                }`}></div>
                <div className="flex-1">
                   <p className="text-sm font-bold text-slate-800">{item.title}</p>
                   <p className="text-xs text-slate-500">{item.subtitle}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

    </div>
  </div>
);

export default function HomePage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedClient, setSelectedClient] = useState('Nikhil Sharma');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const clients = [
    '- Select Client -',
    'Blue Energy Motors',
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
    'LetsAskDoctor',
  ];

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
                src="https://grow.gocommercially.com/assets/media/logo/L159551452639.svg" 
                alt="Logo" 
                className="w-8 h-8 mr-3"
              />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">GO <span className="text-blue-600">Growth</span></span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => navigate('/dashboard')} />
            <SidebarItem icon={Target} label="Objectives" active={activeTab === 'Objectives'} onClick={() => navigate('/objectives')} />
            <SidebarItem icon={Box} label="Initiatives" active={activeTab === 'Initiatives'} onClick={() => navigate('/initiatives')} />
            <SidebarItem icon={ListOrdered} label="Experiments" active={activeTab === 'Experiments'} onClick={() => navigate('/experiments')} />
            
            <div className="my-6 border-t border-slate-100 mx-2"></div>
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">KPIs</p>

            <SidebarItem icon={TrendingUp} label="Dashboard Count Master" active={activeTab === 'DashboardCount'} onClick={() => setActiveTab('DashboardCount')} />
            <SidebarItem icon={TrendingUp} label="Client Count Master" active={activeTab === 'ClientCount'} onClick={() => setActiveTab('ClientCount')} />
            <SidebarItem icon={Share2} label="Menu Group Master" active={activeTab === 'MenuGroup'} onClick={() => setActiveTab('MenuGroup')} />
            <SidebarItem icon={BarChart} label="Group Master" active={activeTab === 'GroupMaster'} onClick={() => setActiveTab('GroupMaster')} />
            <SidebarItem icon={Globe} label="Platform URL Master" active={activeTab === 'PlatformURL'} onClick={() => setActiveTab('PlatformURL')} />
            <SidebarItem icon={Star} label="Tier Master" active={activeTab === 'TierMaster'} onClick={() => setActiveTab('TierMaster')} />
            <SidebarItem icon={Globe} label="Client Platform Data" active={activeTab === 'ClientPlatform'} onClick={() => setActiveTab('ClientPlatform')} />
            <SidebarItem icon={Share2} label="Quiz Category Master" active={activeTab === 'QuizCategory'} onClick={() => setActiveTab('QuizCategory')} />
            <SidebarItem icon={Clock} label="Status Panel Dashboard" active={activeTab === 'StatusPanel'} onClick={() => setActiveTab('StatusPanel')} />
            <SidebarItem icon={CheckSquare} label="Tasks Master" active={activeTab === 'TasksMaster'} onClick={() => setActiveTab('TasksMaster')} />
            <SidebarItem icon={FileText} label="Documents Master" active={activeTab === 'DocumentsMaster'} onClick={() => setActiveTab('DocumentsMaster')} />
            
            <div className="my-6 border-t border-slate-100 mx-2"></div>
            
            <SidebarItem icon={FileText} label="Figures List" active={activeTab === 'Figures'} onClick={() => setActiveTab('Figures')} />
            <SidebarItem icon={Users} label="Client Master" active={activeTab === 'Client'} onClick={() => setActiveTab('Client')} />
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
              <h2 className="text-xl font-bold text-slate-800">
                {activeTab === 'Dashboard' ? 'Overview' : 
                 activeTab === 'Objectives' ? 'Objectives Tracker' : 
                 activeTab === 'Initiatives' ? 'Initiatives Tracker' : 
                 activeTab === 'Experiments' ? 'Experiments Tracker' : activeTab}
              </h2>
              {(activeTab === 'Objectives' || activeTab === 'Initiatives' || activeTab === 'Experiments') && (
                <>
                  <span className="mx-3 text-slate-300">|</span>
                  <span className="text-sm font-medium text-slate-500">In Process</span>
                </>
              )}
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
                   <span className="truncate">{selectedClient === 'Puno' || selectedClient === 'puno' ? 'puno select' : selectedClient}</span>
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
                              if (client === 'Puno' || client === 'puno') {
                                navigate('/puno/dashboard');
                              } else if (client === 'Montra Truck') {
                                navigate('/montra/dashboard');
                              } else if (client === 'Sany') {
                                navigate('/sany/dashboard');
                              } else if (client === 'HeadsUpB2b') {
                                navigate('/headsupb2b/dashboard');
                              } else if (client === 'Tailworld') {
                                navigate('/tailworld/dashboard');
                              } else if (client === 'Blue Energy Motors') {
                                navigate('/blueenergymotors/dashboard');
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
                              }else if (client === 'LetsAskDoctor') {
                                navigate('/letsaskdoctor/dashboard');
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
              <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto h-full">
            {activeTab === 'Dashboard' && <DashboardView />}
            {activeTab === 'Objectives' && <ObjectivesView />}
            {activeTab === 'Initiatives' && <InitiativesView />}
            {activeTab === 'Experiments' && <ExperimentsView />}
            {activeTab !== 'Dashboard' && activeTab !== 'Objectives' && activeTab !== 'Initiatives' && activeTab !== 'Experiments' && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Box size={64} className="mb-4 opacity-50" />
                <h3 className="text-lg font-semibold">Content for {activeTab} coming soon</h3>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

