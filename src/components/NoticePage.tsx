import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, MapPin } from 'lucide-react';
import React from 'react';

interface NoticePageProps {
  onViewChange: (view: string) => void;
}

const notices = [
  {
    id: 1,
    type: 'seat',
    title: '选座提醒',
    content: '您有即将起飞的航班尚未选座，点击前往选座。',
    time: '1小时前',
  },
  {
    id: 2,
    type: 'flight',
    title: '航班提醒',
    content: '您预订的MU5678航班将于明天起飞，请提前2小时到达机场。',
    time: '2小时前',
  },
  {
    id: 3,
    type: 'reward',
    title: '积分奖励',
    content: '恭喜您获得500积分奖励！',
    time: '1天前',
  },
];

const NoticePage: React.FC<NoticePageProps> = ({ onViewChange }) => {
  const handleSeatNoticeClick = () => {
    // 跳转到dashboard并自动弹出选座
    onViewChange('dashboard-seat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
          <Bell className="w-8 h-8 mr-3 text-blue-600" />
          最新通知
        </h1>
        <div className="space-y-6">
          {notices.map(notice => (
            <Card key={notice.id} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-lg dark:text-white">
                  {notice.type === 'seat' ? <MapPin className="w-5 h-5 mr-2 text-pink-500" /> : <Bell className="w-5 h-5 mr-2 text-blue-600" />}
                  {notice.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-2 md:mb-0">
                    <p className="text-gray-700 dark:text-gray-200 mb-1">{notice.content}</p>
                    <p className="text-xs text-gray-400">{notice.time}</p>
                  </div>
                  {notice.type === 'seat' && (
                    <Button size="sm" className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white" onClick={handleSeatNoticeClick}>
                      去选座
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticePage; 