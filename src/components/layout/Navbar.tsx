import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, Bell, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { useAppStore } from '../../store';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAppStore();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-primary-500 text-white flex items-center justify-center">
                  <span className="font-bold">E</span>
                </div>
                <span className="text-xl font-bold text-primary-900">EduPrime</span>
              </NavLink>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16',
                    isActive
                      ? 'border-primary-500 text-primary-900'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  )
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16',
                    isActive
                      ? 'border-primary-500 text-primary-900'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  )
                }
              >
                Courses
              </NavLink>
              <NavLink
                to="/instructors"
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16',
                    isActive
                      ? 'border-primary-500 text-primary-900'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  )
                }
              >
                Instructors
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16',
                    isActive
                      ? 'border-primary-500 text-primary-900'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  )
                }
              >
                About
              </NavLink>
            </nav>
          </div>

          {/* Right section - Auth buttons or user menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  className="p-1 rounded-full text-secondary-400 hover:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" />
                </button>

                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-secondary-700">
                      {user?.name}
                    </span>
                    <Avatar 
                      size="md" 
                      src={user?.avatar} 
                      alt={user?.name || 'User'} 
                      fallback={user?.name?.charAt(0) || 'U'} 
                    />
                  </div>
                </div>

                <div className="ml-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => logout()}
                  >
                    Sign out
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink to="/login">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </NavLink>
                <NavLink to="/register">
                  <Button variant="primary" size="sm">
                    Sign up
                  </Button>
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary-400 hover:text-secondary-500 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                  isActive
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'border-transparent text-secondary-500 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-700'
                )
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                cn(
                  'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                  isActive
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'border-transparent text-secondary-500 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-700'
                )
              }
              onClick={() => setIsOpen(false)}
            >
              Courses
            </NavLink>
            <NavLink
              to="/instructors"
              className={({ isActive }) =>
                cn(
                  'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                  isActive
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'border-transparent text-secondary-500 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-700'
                )
              }
              onClick={() => setIsOpen(false)}
            >
              Instructors
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                cn(
                  'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                  isActive
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'border-transparent text-secondary-500 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-700'
                )
              }
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </div>
          
          {/* Mobile auth buttons */}
          <div className="pt-4 pb-3 border-t border-secondary-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Avatar 
                      size="md" 
                      src={user?.avatar} 
                      alt={user?.name || 'User'} 
                      fallback={user?.name?.charAt(0) || 'U'} 
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-secondary-800">{user?.name}</div>
                    <div className="text-sm font-medium text-secondary-500">{user?.email}</div>
                  </div>
                  <button className="ml-auto flex-shrink-0 p-1 rounded-full text-secondary-400 hover:text-secondary-500">
                    <Bell className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-base font-medium text-secondary-500 hover:text-secondary-800 hover:bg-secondary-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Your Profile
                  </NavLink>
                  <button
                    className="block w-full text-left px-4 py-2 text-base font-medium text-secondary-500 hover:text-secondary-800 hover:bg-secondary-100"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1">
                <NavLink
                  to="/login"
                  className="block px-4 py-2 text-base font-medium text-secondary-500 hover:text-secondary-800 hover:bg-secondary-100"
                  onClick={() => setIsOpen(false)}
                >
                  Sign in
                </NavLink>
                <NavLink
                  to="/register"
                  className="block px-4 py-2 text-base font-medium text-secondary-500 hover:text-secondary-800 hover:bg-secondary-100"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}