import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, Clock, CreditCard, Download, Filter, MapPin, Plane, RotateCcw, Search, XCircle } from 'lucide-react';
import { useState } from 'react';

// 选座弹窗组件
const SeatSelect = ({ open, onClose, onSelect, takenSeats = [] }: { open: boolean, onClose: () => void, onSelect: (seat: string) => void, takenSeats?: string[] }) => {
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
              onClick={() => onSelect(seat)}
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

const MyOrders = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [seatSelectOpen, setSeatSelectOpen] = useState(false);
  const [selectedOrderIdx, setSelectedOrderIdx] = useState<number | null>(null);
  const [orderList, setOrderList] = useState([
    {
      id: 'BT2024001',
      flightNumber: 'CA1234',
      route: '北京 → 上海',
      date: '2024-01-15',
      time: '08:30 - 11:45',
      passengers: 1,
      class: '经济舱',
      price: 1280,
      status: 'completed',
      bookingDate: '2024-01-10',
      seatNumber: '12A'
    },
    {
      id: 'BT2024002',
      flightNumber: 'MU5678',
      route: '上海 → 广州',
      date: '2024-01-20',
      time: '14:20 - 17:35',
      passengers: 2,
      class: '商务舱',
      price: 3600,
      status: 'confirmed',
      bookingDate: '2024-01-12',
      seatNumber: '3A, 3B'
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
    },
    {
      id: 'BT2024004',
      flightNumber: 'HU7890',
      route: '深圳 → 成都',
      date: '2024-02-01',
      time: '09:15 - 12:30',
      passengers: 1,
      class: '经济舱',
      price: 1180,
      status: 'cancelled',
      bookingDate: '2024-01-20',
      seatNumber: '已取消'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'confirmed': return '已确认';
      case 'pending': return '待处理';
      case 'cancelled': return '已取消';
      default: return '未知';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredOrders = orderList.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // 判断是否可选座（起飞前且未选座）
  const canSelectSeat = (order: any) => {
    const now = new Date();
    const flightDate = new Date(order.date);
    return flightDate > now && (!order.seatNumber || order.seatNumber === '待分配');
  };

  const handleOpenSeatSelect = (idx: number) => {
    setSelectedOrderIdx(idx);
    setSeatSelectOpen(true);
  };

  const handleSeatSelect = (seat: string) => {
    if (selectedOrderIdx !== null) {
      const newOrders = [...orderList];
      newOrders[selectedOrderIdx] = {
        ...newOrders[selectedOrderIdx],
        seatNumber: seat
      };
      setOrderList(newOrders);
      setSeatSelectOpen(false);
      toast({
        title: '选座成功',
        description: `您已成功为${newOrders[selectedOrderIdx].flightNumber}航班选择座位：${seat}`
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">我的订单</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            管理您的所有机票订单
          </p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover-lift">
            <CardContent className="p-6 text-center">
              <Plane className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{orderList.length}</div>
              <div className="text-blue-100">总订单数</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white hover-lift">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{orderList.filter(o => o.status === 'completed').length}</div>
              <div className="text-green-100">已完成</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover-lift">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{orderList.filter(o => o.status === 'pending').length}</div>
              <div className="text-yellow-100">待处理</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover-lift">
            <CardContent className="p-6 text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">¥{orderList.reduce((sum, order) => sum + order.price, 0)}</div>
              <div className="text-purple-100">总消费</div>
            </CardContent>
          </Card>
        </div>

        {/* 搜索和过滤 */}
        <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="搜索订单号、航班号或路线..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32 dark:bg-gray-700 dark:border-gray-600">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="completed">已完成</SelectItem>
                    <SelectItem value="confirmed">已确认</SelectItem>
                    <SelectItem value="pending">待处理</SelectItem>
                    <SelectItem value="cancelled">已取消</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 订单列表 */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">订单列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-gray-300">订单号</TableHead>
                    <TableHead className="dark:text-gray-300">航班信息</TableHead>
                    <TableHead className="dark:text-gray-300">路线</TableHead>
                    <TableHead className="dark:text-gray-300">日期时间</TableHead>
                    <TableHead className="dark:text-gray-300">乘客</TableHead>
                    <TableHead className="dark:text-gray-300">座位</TableHead>
                    <TableHead className="dark:text-gray-300">价格</TableHead>
                    <TableHead className="dark:text-gray-300">状态</TableHead>
                    <TableHead className="dark:text-gray-300">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order, idx) => (
                    <TableRow key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <TableCell className="font-medium dark:text-white">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <Plane className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium dark:text-white">{order.flightNumber}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{order.class}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 dark:text-white">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{order.route}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="dark:text-white">
                          <div className="font-medium">{order.date}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{order.time}</div>
                        </div>
                      </TableCell>
                      <TableCell className="dark:text-white">{order.passengers}人</TableCell>
                      <TableCell className="dark:text-white">{order.seatNumber}</TableCell>
                      <TableCell className="font-medium text-green-600 dark:text-green-400">¥{order.price}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1`}>
                          {getStatusIcon(order.status)}
                          <span>{getStatusText(order.status)}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                            <Download className="w-4 h-4 mr-1" />
                            下载
                          </Button>
                          {order.status === 'confirmed' && (
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30">
                              <RotateCcw className="w-4 h-4 mr-1" />
                              退票
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 选座弹窗 */}
        <SeatSelect open={seatSelectOpen} onClose={() => setSeatSelectOpen(false)} onSelect={handleSeatSelect} />
      </div>
    </div>
  );
};

export default MyOrders;
