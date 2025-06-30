import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, MapPin, Plane, Star, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardProps {
  onViewChange: (view: string) => void;
  seatTrigger?: boolean;
  setSeatTrigger?: (v: boolean) => void;
}

// 选座弹窗组件
const SeatSelect = ({ open, onClose, onSelect, takenSeats = [], orderIdx }: { open: boolean, onClose: () => void, onSelect: (seat: string, orderIdx: number) => void, takenSeats?: string[], orderIdx?: number }) => {
  if (!open) return null;
  const seats = Array.from({ length: 30 }, (_, i) => `${Math.floor(i / 6) + 1}${String.fromCharCode(65 + (i % 6))}`);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-96 shadow-xl relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">请选择座位</h2>
        <div className="grid grid-cols-6 gap-2 mb-6">
          {seats.map(seat => (
            <button
              key={seat}
              disabled={takenSeats.includes(seat)}
              className={`p-2 rounded text-sm font-semibold border ${takenSeats.includes(seat) ? 'bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 hover:bg-blue-400 hover:text-white'}`}
              onClick={() => onSelect(seat, orderIdx!)}
            >
              {seat}
            </button>
          ))}
        </div>
        <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

const Dashboard = ({ onViewChange, seatTrigger, setSeatTrigger }: DashboardProps) => {
  const userName = localStorage.getItem('userName') || '用户';

  const recentFlights = [
    {
      id: 1,
      route: '北京 → 上海',
      date: '2024-01-15',
      flightNumber: 'CA1234',
      status: '已完成'
    },
    {
      id: 2,
      route: '上海 → 广州',
      date: '2024-01-20',
      flightNumber: 'MU5678',
      status: '即将到来'
    }
  ];

  // 模拟订单数据
  const [orders, setOrders] = useState([
    {
      id: 'BT2024002',
      flightNumber: 'MU5678',
      route: '上海 → 广州',
      date: '2024-12-20',
      time: '14:20 - 17:35',
      passengers: 2,
      class: '商务舱',
      price: 3600,
      status: 'confirmed',
      bookingDate: '2024-01-12',
      seatNumber: '待分配'
    },
    {
      id: 'BT2024003',
      flightNumber: 'CZ9012',
      route: '广州 → 深圳',
      date: '2024-01-25',
      time: '19:10 - 20:25',
      passengers: 1,
      class: '经济舱',
      price: 580,
      status: 'pending',
      bookingDate: '2024-01-18',
      seatNumber: '待分配'
    }
  ]);
  const [seatSelectOpen, setSeatSelectOpen] = useState(false);
  const [selectedOrderIdx, setSelectedOrderIdx] = useState<number | null>(null);

  // 判断是否可选座（起飞前且未选座且已确认）
  const canSelectSeat = (order: any) => {
    const now = new Date();
    const flightDate = new Date(order.date);
    return order.status === 'confirmed' && flightDate > now && (!order.seatNumber || order.seatNumber === '待分配');
  };

  // 打开选座弹窗
  const handleOpenSeatSelect = (idx: number) => {
    setSelectedOrderIdx(idx);
    setSeatSelectOpen(true);
  };

  // 选座回调
  const handleSeatSelect = (seat: string, idx: number) => {
    const newOrders = [...orders];
    newOrders[idx] = {
      ...newOrders[idx],
      seatNumber: seat
    };
    setOrders(newOrders);
    setSeatSelectOpen(false);
    toast({
      title: '选座成功',
      description: `您已成功为${newOrders[idx].flightNumber}航班选择座位：${seat}`
    });
  };

  const quickActions = [
    {
      title: '搜索航班',
      description: '查找您想要的航班',
      icon: Plane,
      action: () => onViewChange('search'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: '我的订单',
      description: '查看预订历史',
      icon: Calendar,
      action: () => onViewChange('orders'),
      color: 'from-green-500 to-green-600'
    },
    {
      title: '个人信息',
      description: '管理个人资料',
      icon: Users,
      action: () => onViewChange('profile'),
      color: 'from-purple-500 to-purple-600'
    }
  ];

  // 新增选座板块
  const quickActionsWithSeat = [
    ...quickActions,
    {
      title: '在线选座',
      description: '为即将起飞的航班选择座位',
      icon: MapPin,
      action: () => {
        // 默认选第一个可选座的订单
        const idx = orders.findIndex(canSelectSeat);
        if (idx !== -1) handleOpenSeatSelect(idx);
        else toast({ title: '暂无可选座航班', description: '当前没有可选座的订单' });
      },
      color: 'from-pink-500 to-yellow-500'
    }
  ];

  // seatTrigger为true时自动弹出选座
  useEffect(() => {
    if (seatTrigger && canSelectSeat(orders[0])) {
      setSelectedOrderIdx(0);
      setSeatSelectOpen(true);
      setSeatTrigger && setSeatTrigger(false);
    }
  }, [seatTrigger]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 欢迎区域 */}
        <div className="mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              欢迎回来，{userName}！
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              准备好开始您的下一次旅程了吗？
            </p>
            
            {/* 统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover-lift">
                <CardContent className="p-6 text-center">
                  <Plane className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-blue-100">总飞行次数</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white hover-lift">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-green-100">访问城市</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover-lift">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">24h</div>
                  <div className="text-purple-100">飞行时长</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover-lift">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">VIP</div>
                  <div className="text-yellow-100">会员等级</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="w-full lg:col-span-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">快速操作</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
              {quickActionsWithSeat.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Card 
                    key={index}
                    className="cursor-pointer hover-lift transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 w-full"
                    onClick={action.action}
                  >
                    <CardContent className="p-6 text-center w-full">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {action.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* 最近航班 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">最近航班</h2>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentFlights.map((flight) => (
                  <div key={flight.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Plane className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">{flight.route}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">航班号：{flight.flightNumber}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{flight.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        flight.status === '已完成' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {flight.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => onViewChange('orders')}
                  className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  查看所有订单
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 选座弹窗 */}
      <SeatSelect open={seatSelectOpen} onClose={() => setSeatSelectOpen(false)} onSelect={handleSeatSelect} takenSeats={orders.filter(o => o.seatNumber && o.seatNumber !== '待分配').map(o => o.seatNumber)} orderIdx={selectedOrderIdx!} />
    </div>
  );
};

export default Dashboard;
