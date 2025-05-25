import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAppStore } from '../store';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Error handling is already done in the store
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-secondary-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
              <LogIn className="h-6 w-6 text-primary-600" />
            </div>
            <CardTitle className="mt-6 text-center text-3xl font-extrabold text-secondary-900">
              Sign in to your account
            </CardTitle>
            <p className="mt-2 text-center text-sm text-secondary-600">
              Or{' '}
              <Link to="/register" className="font-medium text-primary-500 hover:text-primary-400">
                create a new account
              </Link>
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-error-50 text-error-500 p-3 rounded-md flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              <div>
                <Input
                  label="Email Address"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  icon={<Mail size={18} />}
                />
              </div>
              <div>
                <Input
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  icon={<Lock size={18} />}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-secondary-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-primary-500 hover:text-primary-400">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-secondary-500 bg-secondary-50">
            <p className="w-full">
              This is a demo application. Use any email and password to sign in.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};