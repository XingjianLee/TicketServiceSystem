import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Clock, Coffee, Plane, Star, Tv, Wifi } from 'lucide-react';
import { useState } from 'react';

interface Flight {
  id: number;
  airline: string;
  flightNumber: string;
  departure: {
    city: string;
    time: string;
    airport: string;
  };
  arrival: {
    city: string;
    time: string;
    airport: string;
  };
  duration: string;
  price: number;
  class: string;
}

interface FlightResultsProps {
  flights: Flight[];
}

// 新增选择乘机人弹窗
const PassengerSelect = ({ open, onClose, onSelect, passengers = [] }: { open: boolean, onClose: () => void, onSelect: (passenger: string) => void, passengers?: string[] }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-96 shadow-xl relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">请选择乘机人</h2>
        <div className="space-y-3 mb-6">
          {passengers.map(passenger => (
            <button
              key={passenger}
              className="w-full p-3 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 hover:bg-blue-400 hover:text-white font-semibold border"
              onClick={() => onSelect(passenger)}
            >
              {passenger}
            </button>
          ))}
        </div>
        <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

const FlightResults = ({ flights }: FlightResultsProps) => {
  const [passengerSelectOpen, setPassengerSelectOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  // 假设有常用乘机人
  const passengers = ['张三', '李四', '王五'];

  const handleBookFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setPassengerSelectOpen(true);
  };

  const handlePassengerSelect = (passenger: string) => {
    setPassengerSelectOpen(false);
    toast({
      title: '已选择乘机人',
      description: `为${selectedFlight?.flightNumber}选择了乘机人：${passenger}，即将跳转支付...`
    });
    // 模拟跳转支付
    setTimeout(() => {
      toast({ title: '跳转支付', description: '请完成支付以预订机票' });
    }, 1000);
  };

  const getClassBadgeColor = (flightClass: string) => {
    switch (flightClass) {
      case 'Economy':
        return 'bg-blue-100 text-blue-800';
      case 'Business':
        return 'bg-purple-100 text-purple-800';
      case 'First':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getClassLabel = (flightClass: string) => {
    switch (flightClass) {
      case 'Economy':
        return '经济舱';
      case 'Business':
        return '商务舱';
      case 'First':
        return '头等舱';
      default:
        return flightClass;
    }
  };

  if (flights.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="text-center py-12">
            <Plane className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">暂无航班信息</h3>
            <p className="text-gray-500">请尝试调整搜索条件</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 pt-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">搜索结果</h2>
        <p className="text-gray-600">找到 {flights.length} 个航班</p>
      </div>

      <div className="space-y-4">
        {flights.map((flight) => (
          <Card key={flight.id} className="hover-lift transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                {/* Flight Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Plane className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-lg">{flight.airline}</span>
                      <Badge variant="outline">{flight.flightNumber}</Badge>
                    </div>
                    <Badge className={getClassBadgeColor(flight.class)}>
                      {getClassLabel(flight.class)}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    {/* Departure */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{flight.departure.time}</div>
                      <div className="text-sm text-gray-600">{flight.departure.city}</div>
                      <div className="text-xs text-gray-500">{flight.departure.airport}</div>
                    </div>

                    {/* Duration */}
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <div className="px-3">
                          <Clock className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1 h-px bg-gray-300"></div>
                      </div>
                      <div className="text-sm text-gray-600">{flight.duration}</div>
                      <div className="text-xs text-gray-500">直飞</div>
                    </div>

                    {/* Arrival */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{flight.arrival.time}</div>
                      <div className="text-sm text-gray-600">{flight.arrival.city}</div>
                      <div className="text-xs text-gray-500">{flight.arrival.airport}</div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Wifi className="w-3 h-3" />
                      WiFi
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Coffee className="w-3 h-3" />
                      餐食
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Tv className="w-3 h-3" />
                      娱乐系统
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Star className="w-3 h-3 fill-current text-yellow-400" />
                      4.8分
                    </div>
                  </div>
                </div>

                {/* Price and Book */}
                <div className="text-center lg:text-right">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-blue-600">¥{flight.price}</div>
                    <div className="text-sm text-gray-500">含税费</div>
                  </div>
                  <Button 
                    onClick={() => handleBookFlight(flight)}
                    size="lg"
                    className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover-lift"
                  >
                    立即预订
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter and Sort Options */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">价格排序</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">时间排序</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">航空公司</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">舱位筛选</Badge>
        </div>
      </div>

      {/* 选择乘机人弹窗 */}
      <PassengerSelect open={passengerSelectOpen} onClose={() => setPassengerSelectOpen(false)} onSelect={handlePassengerSelect} passengers={passengers} />
    </div>
  );
};

export default FlightResults;
