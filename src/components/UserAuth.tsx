import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, IdCard, Lock, Mail, Phone, User } from 'lucide-react';
import React, { useState } from 'react';

interface UserAuthProps {
  onLoginSuccess?: () => void;
}

const UserAuth = ({ onLoginSuccess }: UserAuthProps) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    idCard: '',
    company: '',
    userType: 'passenger'
  });

  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    // 模拟登录验证
    setTimeout(() => {
      if (loginData.email === 'admin@example.com' && loginData.password === '123456') {
        // 登录成功
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', '管理员');
        console.log('登录成功');
        
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setLoginError('邮箱或密码错误，请使用 admin@example.com / 123456');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('密码确认不匹配');
      return;
    }
    console.log('注册:', registerData);
    alert('注册功能正在开发中...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-2xl overflow-visible p-2">
        <div className="text-center mb-8">
          <User className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">欢迎使用蓝天航空</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">登录或注册您的账户</p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>测试账户：</strong> admin@example.com | 密码：123456
            </p>
          </div>
        </div>

        <Card className="hover-lift shadow-2xl dark:bg-gray-800 dark:border-gray-700 rounded-3xl overflow-visible">
          <CardContent className="p-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-visible h-17">
                <TabsTrigger value="login" className="text-lg py-3">登录</TabsTrigger>
                <TabsTrigger value="register" className="text-lg py-3">注册</TabsTrigger>
              </TabsList>
              
              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-6">
                  {loginError && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md">
                      <p className="text-red-700 dark:text-red-300 text-sm">{loginError}</p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="flex items-center text-sm font-medium dark:text-gray-200">
                      <Mail className="mr-2 h-4 w-4" />
                      邮箱地址
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="请输入您的邮箱"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      className="h-12 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="flex items-center text-sm font-medium dark:text-gray-200">
                      <Lock className="mr-2 h-4 w-4" />
                      密码
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="请输入您的密码"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="h-12 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center dark:text-gray-300">
                      <input type="checkbox" className="mr-2" />
                      记住密码
                    </label>
                    <button type="button" className="text-blue-600 hover:underline">
                      忘记密码？
                    </button>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover-lift disabled:opacity-50"
                  >
                    {isLoading ? '登录中...' : '登录'}
                  </Button>
                </form>
              </TabsContent>
              
              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="userType" className="text-sm font-medium dark:text-gray-200">
                      用户类型
                    </Label>
                    <Select value={registerData.userType} onValueChange={(value) => setRegisterData(prev => ({ ...prev, userType: value }))}>
                      <SelectTrigger className="h-12 dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passenger">个人旅客</SelectItem>
                        <SelectItem value="agency">旅行社</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center text-sm font-medium dark:text-gray-200">
                        <User className="mr-2 h-4 w-4" />
                        {registerData.userType === 'agency' ? '机构名称' : '姓名'}
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={registerData.userType === 'agency' ? '请输入机构名称' : '请输入您的姓名'}
                        value={registerData.name}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                        className="h-12 dark:bg-gray-700 dark:border-gray-600"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="flex items-center text-sm font-medium dark:text-gray-200">
                        <Mail className="mr-2 h-4 w-4" />
                        邮箱地址
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="请输入邮箱地址"
                        value={registerData.email}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                        className="h-12 dark:bg-gray-700 dark:border-gray-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="flex items-center text-sm font-medium dark:text-gray-200">
                        <Lock className="mr-2 h-4 w-4" />
                        密码
                      </Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="设置密码"
                        value={registerData.password}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                        className="h-12 dark:bg-gray-700 dark:border-gray-600"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="flex items-center text-sm font-medium dark:text-gray-200">
                        <Lock className="mr-2 h-4 w-4" />
                        确认密码
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="确认密码"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="h-12 dark:bg-gray-700 dark:border-gray-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center text-sm font-medium dark:text-gray-200">
                        <Phone className="mr-2 h-4 w-4" />
                        手机号码
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="请输入手机号码"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
                        className="h-12 dark:bg-gray-700 dark:border-gray-600"
                        required
                      />
                    </div>
                    
                    {registerData.userType === 'passenger' && (
                      <div className="space-y-2">
                        <Label htmlFor="idCard" className="flex items-center text-sm font-medium dark:text-gray-200">
                          <IdCard className="mr-2 h-4 w-4" />
                          身份证号
                        </Label>
                        <Input
                          id="idCard"
                          type="text"
                          placeholder="请输入身份证号"
                          value={registerData.idCard}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, idCard: e.target.value }))}
                          className="h-12 dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                      </div>
                    )}
                  </div>
                  
                  {registerData.userType === 'passenger' && (
                    <div className="space-y-2">
                      <Label htmlFor="company" className="flex items-center text-sm font-medium dark:text-gray-200">
                        <Building className="mr-2 h-4 w-4" />
                        工作单位 <span className="text-gray-500 ml-1">(可选)</span>
                      </Label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="请输入工作单位"
                        value={registerData.company}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, company: e.target.value }))}
                        className="h-12 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" className="rounded" required />
                    <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                      我已阅读并同意 
                      <button type="button" className="text-blue-600 hover:underline ml-1">
                        用户协议
                      </button> 
                      和 
                      <button type="button" className="text-blue-600 hover:underline ml-1">
                        隐私政策
                      </button>
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover-lift"
                  >
                    注册账户
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserAuth;
