import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftRight, Calendar, Clock, Globe, MapPin, Plane, Search, Users } from 'lucide-react';
import React, { useState } from 'react';

interface FlightSearchProps {
  onSearch: (searchData: any) => void;
  compact?: boolean;
}

const FlightSearch = ({ onSearch, compact = false }: FlightSearchProps) => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
    class: 'Economy',
    tripType: 'oneWay'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('提交搜索:', searchData);
    onSearch(searchData);
  };

  const handleSwapCities = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const cities = [
    '北京', '上海', '广州', '深圳', '成都', '重庆', '杭州', '南京', '武汉', '西安',
    '青岛', '大连', '厦门', '昆明', '沈阳', '长沙', '郑州', '天津', '济南', '哈尔滨'
  ];

  if (!compact) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background with multiple layers */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop')`,
            }}
          ></div>
          {/* 夜晚模式下的深色遮罩 */}
          <div className="hidden dark:block absolute inset-0 bg-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-purple-600/70 to-pink-500/60"></div>
        </div>

        {/* Floating illustration elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300/20 rounded-full blur-lg animate-bounce delay-1000"></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-300/15 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-300/20 rounded-full blur-lg animate-bounce delay-700"></div>
          
          {/* Floating planes */}
          <div className="absolute top-1/4 right-1/4 text-white/20 animate-bounce delay-300">
            <Plane className="w-8 h-8 transform rotate-45" />
          </div>
          <div className="absolute top-1/2 left-1/4 text-white/15 animate-pulse delay-1000">
            <Globe className="w-12 h-12" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg text-gray-900 dark:text-white">
              发现您的完美航班
            </h1>
            <p className="text-2xl max-w-3xl mx-auto leading-relaxed text-blue-900 dark:text-blue-100">
              智能搜索系统，为您找到最适合的航班选择
            </p>
          </div>

          {/* Search Card */}
          <div className="max-w-5xl mx-auto">
            <Card className="bg-white/95 dark:bg-gray-900/90 backdrop-blur-lg border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardContent className="p-8">
                {/* Trip Type Selector */}
                <div className="flex gap-6 mb-8 justify-center">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="tripType"
                      value="oneWay"
                      checked={searchData.tripType === 'oneWay'}
                      onChange={(e) => setSearchData(prev => ({ ...prev, tripType: e.target.value }))}
                      className="mr-3 w-5 h-5 text-blue-600"
                    />
                    <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600 transition-colors">单程</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="tripType"
                      value="roundTrip"
                      checked={searchData.tripType === 'roundTrip'}
                      onChange={(e) => setSearchData(prev => ({ ...prev, tripType: e.target.value }))}
                      className="mr-3 w-5 h-5 text-blue-600"
                    />
                    <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600 transition-colors">往返</span>
                  </label>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Cities */}
                  <div className="grid md:grid-cols-3 gap-6 items-end">
                    <div className="space-y-3">
                      <Label htmlFor="from" className="flex items-center text-lg font-semibold text-gray-700">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        出发城市
                      </Label>
                      <Select value={searchData.from} onValueChange={(value) => setSearchData(prev => ({ ...prev, from: value }))}>
                        <SelectTrigger className="h-14 text-lg border-2 hover:border-blue-300 transition-colors">
                          <SelectValue placeholder="选择出发城市" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map(city => (
                            <SelectItem key={city} value={city} className="text-lg py-3">{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={handleSwapCities}
                        className="h-14 w-14 rounded-full border-2 border-blue-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110"
                      >
                        <ArrowLeftRight className="h-6 w-6" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="to" className="flex items-center text-lg font-semibold text-gray-700">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-3">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        到达城市
                      </Label>
                      <Select value={searchData.to} onValueChange={(value) => setSearchData(prev => ({ ...prev, to: value }))}>
                        <SelectTrigger className="h-14 text-lg border-2 hover:border-blue-300 transition-colors">
                          <SelectValue placeholder="选择到达城市" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map(city => (
                            <SelectItem key={city} value={city} className="text-lg py-3">{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="departDate" className="flex items-center text-lg font-semibold text-gray-700">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center mr-3">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        出发日期
                      </Label>
                      <Input
                        id="departDate"
                        type="date"
                        value={searchData.departDate}
                        onChange={(e) => setSearchData(prev => ({ ...prev, departDate: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                        className="h-14 text-lg border-2 hover:border-blue-300 transition-colors"
                      />
                    </div>
                    
                    {searchData.tripType === 'roundTrip' && (
                      <div className="space-y-3">
                        <Label htmlFor="returnDate" className="flex items-center text-lg font-semibold text-gray-700">
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                            <Calendar className="w-4 h-4 text-white" />
                          </div>
                          返程日期
                        </Label>
                        <Input
                          id="returnDate"
                          type="date"
                          value={searchData.returnDate}
                          onChange={(e) => setSearchData(prev => ({ ...prev, returnDate: e.target.value }))}
                          min={searchData.departDate || new Date().toISOString().split('T')[0]}
                          className="h-14 text-lg border-2 hover:border-blue-300 transition-colors"
                        />
                      </div>
                    )}
                  </div>

                  {/* Passengers and Class */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="passengers" className="flex items-center text-lg font-semibold text-gray-700">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        乘客人数
                      </Label>
                      <Select value={searchData.passengers} onValueChange={(value) => setSearchData(prev => ({ ...prev, passengers: value }))}>
                        <SelectTrigger className="h-14 text-lg border-2 hover:border-blue-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8,9].map(num => (
                            <SelectItem key={num} value={num.toString()} className="text-lg py-3">{num} 人</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="class" className="flex items-center text-lg font-semibold text-gray-700">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center mr-3">
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        舱位等级
                      </Label>
                      <Select value={searchData.class} onValueChange={(value) => setSearchData(prev => ({ ...prev, class: value }))}>
                        <SelectTrigger className="h-14 text-lg border-2 hover:border-blue-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Economy" className="text-lg py-3">经济舱</SelectItem>
                          <SelectItem value="Business" className="text-lg py-3">商务舱</SelectItem>
                          <SelectItem value="First" className="text-lg py-3">头等舱</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Search className="mr-3 h-6 w-6" />
                    搜索完美航班
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Compact version for home page
  return (
    <div>
      {/* Trip Type Selector */}
      <div className="flex gap-4 mb-6">
        <label className="flex items-center">
          <input
            type="radio"
            name="tripType"
            value="oneWay"
            checked={searchData.tripType === 'oneWay'}
            onChange={(e) => setSearchData(prev => ({ ...prev, tripType: e.target.value }))}
            className="mr-2"
          />
          单程
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="tripType"
            value="roundTrip"
            checked={searchData.tripType === 'roundTrip'}
            onChange={(e) => setSearchData(prev => ({ ...prev, tripType: e.target.value }))}
            className="mr-2"
          />
          往返
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cities */}
        <div className="grid md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="from" className="flex items-center text-sm font-medium">
              <MapPin className="mr-1 h-4 w-4" />
              出发城市
            </Label>
            <Select value={searchData.from} onValueChange={(value) => setSearchData(prev => ({ ...prev, from: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="选择出发城市" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSwapCities}
              className="hover:bg-blue-50 hover:border-blue-300"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="to" className="flex items-center text-sm font-medium">
              <MapPin className="mr-1 h-4 w-4" />
              到达城市
            </Label>
            <Select value={searchData.to} onValueChange={(value) => setSearchData(prev => ({ ...prev, to: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="选择到达城市" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="departDate" className="flex items-center text-sm font-medium">
              <Calendar className="mr-1 h-4 w-4" />
              出发日期
            </Label>
            <Input
              id="departDate"
              type="date"
              value={searchData.departDate}
              onChange={(e) => setSearchData(prev => ({ ...prev, departDate: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              className="w-full"
            />
          </div>
          
          {searchData.tripType === 'roundTrip' && (
            <div className="space-y-2">
              <Label htmlFor="returnDate" className="flex items-center text-sm font-medium">
                <Calendar className="mr-1 h-4 w-4" />
                返程日期
              </Label>
              <Input
                id="returnDate"
                type="date"
                value={searchData.returnDate}
                onChange={(e) => setSearchData(prev => ({ ...prev, returnDate: e.target.value }))}
                min={searchData.departDate || new Date().toISOString().split('T')[0]}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Passengers and Class */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="passengers" className="flex items-center text-sm font-medium">
              <Users className="mr-1 h-4 w-4" />
              乘客人数
            </Label>
            <Select value={searchData.passengers} onValueChange={(value) => setSearchData(prev => ({ ...prev, passengers: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,6,7,8,9].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num} 人</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="class" className="text-sm font-medium">
              舱位等级
            </Label>
            <Select value={searchData.class} onValueChange={(value) => setSearchData(prev => ({ ...prev, class: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Economy">经济舱</SelectItem>
                <SelectItem value="Business">商务舱</SelectItem>
                <SelectItem value="First">头等舱</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 hover-lift"
        >
          <Search className="mr-2 h-5 w-5" />
          搜索航班
        </Button>
      </form>
    </div>
  );
};

export default FlightSearch;
