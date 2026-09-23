import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Target, 
  Box, 
  ListOrdered,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Users,
  ChevronDown
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState('- Select Client -');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const clients = [
    '- Select Client -',
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

  const features = [
    {
      icon: Target,
      title: 'Objectives',
      description: 'Track and manage your business objectives',
      color: 'bg-indigo-300',
      route: '/objectives'
    },
    {
      icon: Box,
      title: 'Initiatives',
      description: 'Manage your strategic initiatives',
      color: 'bg-emerald-300',
      route: '/initiatives'
    },
    {
      icon: ListOrdered,
      title: 'Experiments',
      description: 'Run and track experiments',
      color: 'bg-rose-300',
      route: '/experiments'
    },
    {
      icon: LayoutDashboard,
      title: 'Dashboard',
      description: 'View comprehensive analytics',
      color: 'bg-blue-300',
      route: '/dashboard'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/home')}
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://grow.gocommercially.com/assets/media/logo/L159551452639.svg" 
                  alt="Logo" 
                  className="w-10 h-10"
                />
                <span className="text-2xl font-bold text-slate-800 tracking-tight ml-3">
                  GO <span className="text-blue-400">Growth</span>
                </span>
              </button>
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
                    <div className="absolute top-full right-0 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
                      {clients.map((client, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (client !== '- Select Client -') {
                              setSelectedClient(client);
                              if (client === 'Fabulous Media') {
                                navigate('/fabulousmedia/dashboard');
                              } else if (client === 'Battery Smart') {
                                navigate('/batterysmart/dashboard');
                              } else if (client === 'Workwear Express') {
                                navigate('/workwearexpress/dashboard');
                              } else if (client === 'Step Ahead Workwear') {
                                navigate('/stepahead/dashboard');
                              } else if (client === 'WRTS Gym') {
                                navigate('/wrtsgym/dashboard');
                              } else if (client === 'Bonfit') {
                                navigate('/bonfit/dashboard');
                              } else if (client === 'Puno' || client === 'puno') {
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
                              } else if (client === 'IPL Tech Electric') {
                                navigate('/ipltech/dashboard');
                              } else if (client === 'SID Real Tech') {
                                navigate('/sidrealtech/dashboard');
                              } else if (client === 'MindDhara') {
                                navigate('/minddhara/dashboard');
                              } else if (client === 'Mystery Rooms') {
                                navigate('/mysteryrooms/dashboard');
                              } else if (client === 'LetsAskDoctor') {
                                navigate('/letsaskdoctor/dashboard');
                              } else if (client === 'Afiway') {
                                navigate('/afiway/dashboard');
                              } else if (client === 'MCI') {
                                navigate('/mci/dashboard');
                              } else if (client === 'Travbeez') {
                                navigate('/travebeez/dashboard');
                              } else if (client === 'Tallento') {
                                navigate('/tallento/dashboard');
                              } else if (client === 'BoxOffice') {
                                navigate('/boxoffice/dashboard');
                              } else if (client === 'DeepHorizon') {
                                navigate('/deephorizon/dashboard');
                              } else if (client === 'Bonfit') {
                                navigate('/bonfit/dashboard');
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

              <button
                onClick={() => {
                  if (selectedClient === '- Select Client -') {
                    alert('Please select a client first');
                    return;
                  }
                  // Determine target route based on selected client
                  let targetRoute = '/ipltech/dashboard';
                  if (selectedClient === 'Fabulous Media') {
                    targetRoute = '/fabulousmedia/dashboard';
                  } else if (selectedClient === 'Battery Smart') {
                    targetRoute = '/batterysmart/dashboard';
                  } else if (selectedClient === 'Workwear Express') {
                    targetRoute = '/workwearexpress/dashboard';
                  } else if (selectedClient === 'Step Ahead Workwear') {
                    targetRoute = '/stepahead/dashboard';
                  } else if (selectedClient === 'WRTS Gym') {
                    targetRoute = '/wrtsgym/dashboard';
                  } else if (selectedClient === 'Bonfit') {
                    targetRoute = '/bonfit/dashboard';
                  } else if (selectedClient === 'Puno' || selectedClient === 'puno') {
                    targetRoute = '/puno/dashboard';
                  } else if (selectedClient === 'Montra Truck') {
                    targetRoute = '/montra/dashboard';
                  } else if (selectedClient === 'Sany') {
                    targetRoute = '/sany/dashboard';
                  } else if (selectedClient === 'HeadsUpB2b') {
                    targetRoute = '/headsupb2b/dashboard';
                  } else if (selectedClient === 'Tailworld') {
                    targetRoute = '/tailworld/dashboard';
                  } else if (selectedClient === 'Blue Energy Motors') {
                    targetRoute = '/blueenergymotors/dashboard';
                  } else if (selectedClient === 'InstaGroup') {
                    targetRoute = '/instagroup/dashboard';
                  } else if (selectedClient === 'VZY-Tv') {
                    targetRoute = '/vzytv/dashboard';
                  } else if (selectedClient === 'McRAYGOR') {
                    targetRoute = '/mcraygor/dashboard';
                  } else if (selectedClient === 'MovoDream') {
                    targetRoute = '/movodream/dashboard';
                  } else if (selectedClient === 'A2 Bilona Ghee') {
                    targetRoute = '/a2bilonaghee/dashboard';
                  } else if (selectedClient === 'Yastudy') {
                    targetRoute = '/yastudy/dashboard';
                  } else if (selectedClient === 'Kaizen Technicals') {
                    targetRoute = '/kaizen/dashboard';
                  } else if (selectedClient === 'IPL Tech Electric') {
                    targetRoute = '/ipltech/dashboard';
                  } else if (selectedClient === 'SID Real Tech') {
                    targetRoute = '/sidrealtech/dashboard';
                  } else if (selectedClient === 'MindDhara') {
                    targetRoute = '/minddhara/dashboard';
                  } else if (selectedClient === 'Mystery Rooms') {
                    targetRoute = '/mysteryrooms/dashboard';
                  } else if (selectedClient === 'Afiway') {
                    targetRoute = '/afiway/dashboard';
                  } else if (selectedClient === 'MCI') {
                    targetRoute = '/mci/dashboard';
                  } else if (selectedClient === 'Travbeez') {
                    targetRoute = '/travebeez/dashboard';
                  } else if (selectedClient === 'Tallento') {
                    targetRoute = '/tallento/dashboard';
                  } else if (selectedClient === 'BoxOffice') {
                    targetRoute = '/boxoffice/dashboard';
                  } else if (selectedClient === 'DeepHorizon') {
                    targetRoute = '/deephorizon/dashboard';
                  }
                  navigate(targetRoute);
                }}
                className="px-6 py-2.5 bg-blue-300 text-white font-semibold rounded-xl hover:bg-blue-400 transition-colors shadow-lg shadow-blue-200"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Welcome to <span className="text-blue-400">Growth Panel</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Track your objectives, manage initiatives, run experiments, and grow your business with data-driven insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                onClick={() => {
                  // Check if client is selected
                  if (selectedClient === '- Select Client -') {
                    alert('Please select a client first');
                    return;
                  }
                  // Determine target route based on selected client and feature
                  let targetRoute = `/ipltech${feature.route}`;
                  if (selectedClient === 'Fabulous Media') {
                    targetRoute = `/fabulousmedia${feature.route}`;
                  } else if (selectedClient === 'Battery Smart') {
                    targetRoute = `/batterysmart${feature.route}`;
                  } else if (selectedClient === 'Workwear Express') {
                    targetRoute = `/workwearexpress${feature.route}`;
                  } else if (selectedClient === 'Step Ahead Workwear') {
                    targetRoute = `/stepahead${feature.route}`;
                  } else if (selectedClient === 'WRTS Gym') {
                    targetRoute = `/wrtsgym${feature.route}`;
                  } else if (selectedClient === 'Bonfit') {
                    targetRoute = `/bonfit${feature.route}`;
                  } else if (selectedClient === 'Puno' || selectedClient === 'puno') {
                    targetRoute = `/puno${feature.route}`;
                  } else if (selectedClient === 'Montra Truck') {
                    targetRoute = `/montra${feature.route}`;
                  } else if (selectedClient === 'Sany') {
                    targetRoute = `/sany${feature.route}`;
                  } else if (selectedClient === 'HeadsUpB2b') {
                    targetRoute = `/headsupb2b${feature.route}`;
                  } else if (selectedClient === 'Tailworld') {
                    targetRoute = `/tailworld${feature.route}`;
                  } else if (selectedClient === 'Blue Energy Motors') {
                    targetRoute = `/blueenergymotors${feature.route}`;
                  } else if (selectedClient === 'InstaGroup') {
                    targetRoute = `/instagroup${feature.route}`;
                  } else if (selectedClient === 'VZY-Tv') {
                    targetRoute = `/vzytv${feature.route}`;
                  } else if (selectedClient === 'McRAYGOR') {
                    targetRoute = `/mcraygor${feature.route}`;
                  } else if (selectedClient === 'MovoDream') {
                    targetRoute = `/movodream${feature.route}`;
                  } else if (selectedClient === 'A2 Bilona Ghee') {
                    targetRoute = `/a2bilonaghee${feature.route}`;
                  } else if (selectedClient === 'Yastudy') {
                    targetRoute = `/yastudy${feature.route}`;
                  } else if (selectedClient === 'Kaizen Technicals') {
                    targetRoute = `/kaizen${feature.route}`;
                  } else if (selectedClient === 'IPL Tech Electric') {
                    targetRoute = `/ipltech${feature.route}`;
                  } else if (selectedClient === 'SID Real Tech') {
                    targetRoute = `/sidrealtech${feature.route}`;
                  } else if (selectedClient === 'MindDhara') {
                    targetRoute = `/minddhara${feature.route}`;
                  } else if (selectedClient === 'Mystery Rooms') {
                    targetRoute = `/mysteryrooms${feature.route}`;
                  } else if (selectedClient === 'Afiway') {
                    targetRoute = `/afiway${feature.route}`;
                  } else if (selectedClient === 'MCI') {
                    targetRoute = `/mci${feature.route}`;
                  } else if (selectedClient === 'Travbeez') {
                    targetRoute = `/travebeez${feature.route}`;
                  } else if (selectedClient === 'Tallento') {
                    targetRoute = `/tallento${feature.route}`;
                  } else if (selectedClient === 'BoxOffice') {
                    targetRoute = `/boxoffice${feature.route}`;
                  } else if (selectedClient === 'DeepHorizon') {
                    targetRoute = `/deephorizon${feature.route}`;
                  }
                  navigate(targetRoute);
                }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-blue-400 font-semibold text-sm group-hover:gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Track Progress</h3>
              <p className="text-slate-600">Monitor your objectives and initiatives with real-time progress tracking</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Manage Tasks</h3>
              <p className="text-slate-600">Organize and prioritize your work with comprehensive task management</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Team Collaboration</h3>
              <p className="text-slate-600">Work together seamlessly with your team on shared objectives</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

