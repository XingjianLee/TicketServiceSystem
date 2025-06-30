
import React, { useState } from 'react';
import { User, Mail, Phone, IdCard, MapPin, Building, Edit, Save, X, Camera, Shield, CreditCard, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '张三',
    email: 'admin@example.com',
    phone: '138****8888',
    idCard: '110101199001011234',
    address: '北京市朝阳区建国门外大街1号',
    company: '北京科技有限公司',
    birthDate: '1990-01-01',
    gender: 'male',
    occupation: '软件工程师',
    emergencyContact: '李四',
    emergencyPhone: '139****9999'
  });

  const [editInfo, setEditInfo] = useState({ ...userInfo });

  const handleEdit = () => {
    setIsEditing(true);
    setEditInfo({ ...userInfo });
  };

  const handleSave = () => {
    setUserInfo({ ...editInfo });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditInfo({ ...userInfo });
    setIsEditing(false);
  };

  const membershipLevel = 'VIP';
  const totalFlights = 12;
  const totalMiles = 25680;
  const memberSince = '2020-03-15';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">个人信息</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            管理您的个人资料和偏好设置
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 个人资料卡片 */}
          <div className="lg:col-span-1">
            <Card className="dark:bg-gray-800 dark:border-gray-700 hover-lift">
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src="/placeholder.svg" alt="用户头像" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl">
                      {userInfo.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 rounded-full w-8 h-8 p-0"
                    variant="outline"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{userInfo.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{userInfo.email}</p>
                
                <div className="flex justify-center mb-4">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                    {membershipLevel} 会员
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>会员等级</span>
                    <span className="font-medium">{membershipLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>飞行次数</span>
                    <span className="font-medium">{totalFlights}次</span>
                  </div>
                  <div className="flex justify-between">
                    <span>累计里程</span>
                    <span className="font-medium">{totalMiles.toLocaleString()}公里</span>
                  </div>
                  <div className="flex justify-between">
                    <span>入会时间</span>
                    <span className="font-medium">{memberSince}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 快速统计 */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover-lift">
                <CardContent className="p-4 text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-lg font-bold">安全</div>
                  <div className="text-xs opacity-80">账户安全</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white hover-lift">
                <CardContent className="p-4 text-center">
                  <CreditCard className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-lg font-bold">已绑定</div>
                  <div className="text-xs opacity-80">支付方式</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 详细信息表单 */}
          <div className="lg:col-span-2">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="dark:text-white">详细信息</CardTitle>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-1" />
                        保存
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancel} className="dark:border-gray-600">
                        <X className="w-4 h-4 mr-1" />
                        取消
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={handleEdit} variant="outline" className="dark:border-gray-600">
                      <Edit className="w-4 h-4 mr-1" />
                      编辑
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">基本信息</TabsTrigger>
                    <TabsTrigger value="contact">联系方式</TabsTrigger>
                    <TabsTrigger value="security">安全设置</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center dark:text-gray-200">
                          <User className="w-4 h-4 mr-2" />
                          姓名
                        </Label>
                        <Input
                          id="name"
                          value={isEditing ? editInfo.name : userInfo.name}
                          onChange={(e) => setEditInfo(prev => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gender" className="flex items-center dark:text-gray-200">
                          <User className="w-4 h-4 mr-2" />
                          性别
                        </Label>
                        <Select 
                          value={isEditing ? editInfo.gender : userInfo.gender} 
                          onValueChange={(value) => setEditInfo(prev => ({ ...prev, gender: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">男</SelectItem>
                            <SelectItem value="female">女</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="birthDate" className="flex items-center dark:text-gray-200">
                          <Calendar className="w-4 h-4 mr-2" />
                          出生日期
                        </Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={isEditing ? editInfo.birthDate : userInfo.birthDate}
                          onChange={(e) => setEditInfo(prev => ({ ...prev, birthDate: e.target.value }))}
                          disabled={!isEditing}
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="idCard" className="flex items-center dark:text-gray-200">
                          <IdCard className="w-4 h-4 mr-2" />
                          身份证号
                        </Label>
                        <Input
                          id="idCard"
                          value={isEditing ? editInfo.idCard : userInfo.idCard}
                          onChange={(e) => setEditInfo(prev => ({ ...prev, idCard: e.target.value }))}
                          disabled={!isEditing}
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="occupation" className="flex items-center dark:text-gray-200">
                          <Building className="w-4 h-4 mr-2" />
                          职业
                        </Label>
                        <Input
                          id="occupation"
                          value={isEditing ? editInfo.occupation : userInfo.occupation}
                          onChange={(e) => setEditInfo(prev => ({ ...prev, occupation: e.target.value }))}
                          disabled={!isEditing}
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company" className="flex items-center dark:text-gray-200">
                          <Building className="w-4 h-4 mr-2" />
                          工作单位
                        </Label>
                        <Input
                          id="company"
                          value={isEditing ? editInfo.company : userInfo.company}
                          onChange={(e) => setEditInfo(prev => ({ ...prev, company: e.target.value }))}
                          disabled={!isEditing}
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center dark:text-gray-200">
                        <MapPin className="w-4 h-4 mr-2" />
                        地址
                      </Label>
                      <Input
                        id="address"
                        value={isEditing ? editInfo.address : userInfo.address}
                        onChange={(e) => setEditInfo(prev => ({ ...prev, address: e.target.value }))}
                        disabled={!isEditing}
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="contact" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center dark:text-gray-200">
                          <Mail className="w-4 h-4 mr-2" />
                          邮箱地址
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={isEditing ? editInfo.email : userInfo.email}
                          onChange={(e) => setEditInfo(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center dark:text-gray-200">
                          <Phone className="w-4 h-4 mr-2" />
                          手机号码
                        </Label>
                        <Input
                          id="phone"
                          value={isEditing ? editInfo.phone : userInfo.phone}
                          onChange={(e) => setEditInfo(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact" className="flex items-center dark:text-gray-200">
                          <User className="w-4 h-4 mr-2" />
                          紧急联系人
                        </Label>
                        <Input
                          id="emergencyContact"
                          value={isEditing ? editInfo.emergencyContact : userInfo.emergencyContact}
                          onChange={(e) => setEditInfo(prev => ({ ...prev, emergencyContact: e.target.value }))}
                          disabled={!isEditing}
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone" className="flex items-center dark:text-gray-200">
                          <Phone className="w-4 h-4 mr-2" />
                          紧急联系电话
                        </Label>
                        <Input
                          id="emergencyPhone"
                          value={isEditing ? editInfo.emergencyPhone : userInfo.emergencyPhone}
                          onChange={(e) => setEditInfo(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                          disabled={!isEditing}
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="security" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">密码安全</h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                          为了保护您的账户安全，建议定期更改密码
                        </p>
                        <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400">
                          更改密码
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">双重验证</h3>
                        <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                          已启用手机短信验证，为您的账户提供额外保护
                        </p>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                          已启用
                        </Badge>
                      </div>
                      
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                        <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">登录日志</h3>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-3">
                          查看您的账户登录记录
                        </p>
                        <Button size="sm" variant="outline" className="border-yellow-200 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-800 dark:text-yellow-400">
                          查看日志
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
