import Dashboard from '@/components/Dashboard';
import FlightResults from '@/components/FlightResults';
import FlightSearch from '@/components/FlightSearch';
import MyOrders from '@/components/MyOrders';
import Navigation from '@/components/Navigation';
import NoticePage from '@/components/NoticePage';
import PersonalInfo from '@/components/PersonalInfo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserAuth from '@/components/UserAuth';
import { ChevronDown, Clock, Globe, Heart, Plane, Search, Shield, Star, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MainApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 路由与视图映射
  const pathToView = {
    '/': 'home',
    '/search': 'search',
    '/orders': 'orders',
    '/notices': 'notices',
    '/profile': 'profile',
    '/auth': 'auth',
    '/dashboard': 'dashboard',
  };
  const viewToPath = {
    'home': '/',
    'search': '/search',
    'orders': '/orders',
    'notices': '/notices',
    'profile': '/profile',
    'auth': '/auth',
    'dashboard': '/dashboard',
  };
  const [currentView, setCurrentView] = useState(pathToView[location.pathname] || 'home');
  const [searchResults, setSearchResults] = useState([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [navVisible, setNavVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dashboardSeatTrigger, setDashboardSeatTrigger] = useState(false);

  useEffect(() => {
    // 检查登录状态
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn && currentView === 'home') {
      setCurrentView('dashboard');
    }

    // 检查暗色模式偏好
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollIndicator(scrollY < 100);
      setNavVisible(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setCurrentView(pathToView[location.pathname] || 'home');
  }, [location.pathname]);

  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLoginSuccess = () => {
    setCurrentView('dashboard');
  };

  const handleSearch = (searchData: any) => {
    console.log('搜索航班:', searchData);
    const mockResults = [
      {
        id: 1,
        airline: '中国国航',
        flightNumber: 'CA1234',
        departure: { city: searchData.from, time: '08:30', airport: 'PEK' },
        arrival: { city: searchData.to, time: '11:45', airport: 'PVG' },
        duration: '3h 15m',
        price: 1280,
        class: 'Economy'
      },
      {
        id: 2,
        airline: '东方航空',
        flightNumber: 'MU5678',
        departure: { city: searchData.from, time: '14:20', airport: 'PEK' },
        arrival: { city: searchData.to, time: '17:35', airport: 'PVG' },
        duration: '3h 15m',
        price: 1150,
        class: 'Economy'
      },
      {
        id: 3,
        airline: '南方航空',
        flightNumber: 'CZ9012',
        departure: { city: searchData.from, time: '19:10', airport: 'PEK' },
        arrival: { city: searchData.to, time: '22:25', airport: 'PVG' },
        duration: '3h 15m',
        price: 1580,
        class: 'Business'
      }
    ];
    setSearchResults(mockResults);
    setCurrentView('results');
  };

  const scrollToContent = () => {
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    const path = viewToPath[view] || '/';
    if (location.pathname !== path) navigate(path);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={setCurrentView} seatTrigger={dashboardSeatTrigger} setSeatTrigger={setDashboardSeatTrigger} />;
      case 'search':
        return <FlightSearch onSearch={handleSearch} />;
      case 'results':
        return <FlightResults flights={searchResults} />;
      case 'orders':
        return <MyOrders />;
      case 'profile':
        return <PersonalInfo />;
      case 'auth':
        return <UserAuth onLoginSuccess={handleLoginSuccess} />;
      case 'notices':
        return <NoticePage onViewChange={(view) => {
          if (view === 'dashboard-seat') {
            setDashboardSeatTrigger(true);
            setCurrentView('dashboard');
          } else {
            setCurrentView(view);
          }
        }} />;
      default:
        return (
          <div className="min-h-screen">
            {/* Full Screen Logo Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
              {/* Multiple Background Images with Parallax Effect */}
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop')`,
                    transform: `translateY(${window.scrollY * 0.6}px)`
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/60 to-blue-800/80 dark:from-gray-900/90 dark:via-purple-900/70 dark:to-gray-800/90"></div>
                
                {/* Enhanced Flying Elements */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-300/30 rounded-full animate-bounce delay-1000"></div>
                <div className="absolute bottom-1/3 left-1/5 w-4 h-4 bg-purple-300/20 rounded-full animate-pulse delay-500"></div>
                <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/60 rounded-full animate-ping delay-700"></div>
                <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-yellow-300/30 rounded-full animate-bounce delay-300"></div>
                <div className="absolute bottom-1/4 right-1/5 w-3 h-3 bg-pink-300/20 rounded-full animate-pulse delay-1200"></div>
              </div>
              
              <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
                <div className="fade-in">
                  {/* Large Logo Animation */}
                  <div className="mb-8 relative">
                    <Plane className="w-24 h-24 mx-auto mb-6 animate-bounce text-white drop-shadow-2xl" />
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-ping"></div>
                  </div>
                  
                  <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-lg animate-fade-in">
                    蓝天航空
                  </h1>
                  <p className="text-2xl md:text-3xl mb-12 text-blue-100 font-light tracking-wide slide-in-left">
                    翱翔云端，连接世界每一个角落
                  </p>
                  
                  {/* Enhanced CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 slide-in-right">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 btn-3d"
                      onClick={() => setCurrentView('search')}
                    >
                      <Search className="mr-3 h-6 w-6" />
                      开始您的旅程
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-2 border-white/30 text-gray-900 dark:text-white bg-white/60 dark:bg-transparent hover:bg-white/80 dark:hover:bg-white/10 backdrop-blur-md px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 btn-3d"
                      onClick={() => setCurrentView('auth')}
                    >
                      <Users className="mr-3 h-6 w-6" />
                      登录 / 注册
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Scroll Indicator */}
              {showScrollIndicator && (
                <div 
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce hover:scale-110 transition-transform"
                  onClick={scrollToContent}
                >
                  <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
                    <span className="text-sm mb-2 animate-pulse">继续探索</span>
                    <div className="w-8 h-8 border-2 border-white/60 rounded-full flex items-center justify-center hover:border-white transition-colors">
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Main Content with Smooth Transitions */}
            <div id="main-content" className="relative z-10">
              {/* Quick Search Section */}
              <section className="py-20 px-4 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1920&h=1080&fit=crop')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 via-white/90 to-purple-50/95 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95"></div>
                
                <div className="max-w-6xl mx-auto relative z-10">
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                      <Search className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">快速预订</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                      AI智能推荐，几步简单操作，轻松预订您的完美航班
                    </p>
                  </div>
                  
                  <Card className="hover-lift shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <FlightSearch onSearch={handleSearch} compact={true} />
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Features Section */}
              <section className="py-20 px-4 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1920&h=1080&fit=crop')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-blue-50/90 to-white/95 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95"></div>
                
                <div className="max-w-6xl mx-auto relative z-10">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">为什么选择蓝天航空</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">专业、安全、便捷的航空服务，让每一次飞行都成为美好体验</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <Card className="text-center hover-lift bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
                      <CardHeader>
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4">
                          <Shield className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl dark:text-white">安全保障</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                          国际最高安全标准认证，99.9%安全记录，让您的每一次旅行都安心无忧
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="text-center hover-lift bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
                      <CardHeader>
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mb-4">
                          <Zap className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl dark:text-white">准点率高</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                          98.5%的准点率，行业领先，AI智能调度系统，珍惜您的宝贵时间
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="text-center hover-lift bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
                      <CardHeader>
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full mx-auto mb-4">
                          <Heart className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl dark:text-white">优质服务</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                          24/7贴心服务，多语言支持，让您的旅途更加舒适愉快
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* Stats Section */}
              <section className="py-20 px-4 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1920&h=1080&fit=crop')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-blue-800/90 dark:from-gray-900/95 dark:via-purple-900/85 dark:to-gray-800/95"></div>
                
                <div className="max-w-6xl mx-auto relative z-10">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">数字见证我们的实力</h2>
                    <p className="text-xl text-blue-100">值得信赖的航空伙伴</p>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-8 text-center">
                    <div className="fade-in bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                      <Globe className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                      <div className="text-5xl font-bold mb-2 text-white">500+</div>
                      <div className="text-blue-100 text-lg">全球航线</div>
                    </div>
                    <div className="fade-in bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                      <Clock className="w-12 h-12 mx-auto mb-4 text-green-300" />
                      <div className="text-5xl font-bold mb-2 text-white">98.5%</div>
                      <div className="text-blue-100 text-lg">准点率</div>
                    </div>
                    <div className="fade-in bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                      <Users className="w-12 h-12 mx-auto mb-4 text-purple-300" />
                      <div className="text-5xl font-bold mb-2 text-white">2000万+</div>
                      <div className="text-blue-100 text-lg">年服务旅客</div>
                    </div>
                    <div className="fade-in bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                      <Star className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                      <div className="text-5xl font-bold mb-2 text-white">4.9</div>
                      <div className="text-blue-100 text-lg">用户评分</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <Navigation 
        currentView={currentView} 
        onViewChange={handleViewChange} 
        isVisible={navVisible || currentView !== 'home'}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
      />
      {renderContent()}
    </div>
  );
};

export default MainApp;
