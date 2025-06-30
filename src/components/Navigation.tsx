import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, Calendar, LogOut, Moon, Plane, Search, Settings, Sun, User, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isVisible?: boolean;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

const Navigation = ({ currentView, onViewChange, isVisible = true, isDarkMode = false, onThemeToggle }: NavigationProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // 检查登录状态
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserName = localStorage.getItem('userName') || '';
    setIsLoggedIn(loggedIn);
    setUserName(storedUserName);
  }, [currentView]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    onViewChange('home');
  };

  const navItemsBeforeLogin = [
    { id: 'auth', label: '登录/注册', icon: User },
  ];

  const navItemsAfterLogin = [
    { id: 'search', label: '搜索航班', icon: Search },
    { id: 'orders', label: '我的订单', icon: Calendar },
    { id: 'notices', label: '最新通知', icon: Bell },
    { id: 'profile', label: '个人信息', icon: UserCircle },
  ];

  const currentNavItems = isLoggedIn ? navItemsAfterLogin : navItemsBeforeLogin;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      isVisible 
        ? 'translate-y-0 opacity-100' 
        : '-translate-y-full opacity-0'
    }`}>
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onViewChange(isLoggedIn ? 'dashboard' : 'home')}
            >
              <Plane className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">蓝天航空</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {/* 主题切换 */}
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={onThemeToggle}
                  className="data-[state=checked]:bg-blue-600"
                />
                <Moon className="h-4 w-4 text-blue-600" />
              </div>
              
              {currentNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      currentView === item.id
                        ? 'text-blue-600 bg-blue-50/80 backdrop-blur-sm shadow-sm'
                        : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
              
              {isLoggedIn && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 dark:text-gray-300">欢迎，{userName}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-600 backdrop-blur-sm"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    退出
                  </Button>
                </div>
              )}
            </div>
            
            <div className="md:hidden flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Sun className="h-3 w-3 text-yellow-500" />
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={onThemeToggle}
                  className="scale-75"
                />
                <Moon className="h-3 w-3 text-blue-600" />
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
