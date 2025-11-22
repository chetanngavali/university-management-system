import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Book, 
  Calendar, 
  Award, 
  FileText, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  if (!user) return null;

  // Define navigation based on user role
  const getNavigation = () => {
    const baseNav = [
      { name: 'Dashboard', href: `/${user.role}/dashboard`, icon: Home },
    ];

    if (user.role === 'student') {
      return [
        ...baseNav,
        { name: 'Attendance', href: '/student/attendance', icon: Calendar },
        { name: 'Results', href: '/student/results', icon: Award },
        { name: 'Courses', href: '/student/courses', icon: Book },
      ];
    }

    if (user.role === 'teacher') {
      return [
        ...baseNav,
        { name: 'Attendance', href: '/teacher/attendance', icon: Calendar },
        { name: 'Results', href: '/teacher/results', icon: Award },
        { name: 'Courses', href: '/teacher/courses', icon: Book },
        { name: 'Students', href: '/teacher/students', icon: Users },
      ];
    }

    if (user.role === 'admin') {
      return [
        ...baseNav,
        { name: 'Admissions', href: '/admin/admissions', icon: FileText },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Courses', href: '/admin/courses', icon: Book },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
      ];
    }

    return baseNav;
  };

  const navigation = getNavigation();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-indigo-800">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-indigo-900">
            <h1 className="text-xl font-bold text-white">UniManager</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-indigo-900 text-white'
                        : 'text-indigo-100 hover:bg-indigo-700'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        isActive ? 'text-indigo-200' : 'text-indigo-300'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex-shrink-0 flex border-t border-indigo-700 p-4">
            <div className="flex items-center">
              {user.avatar ? (
                <img
                  className="h-9 w-9 rounded-full object-cover"
                  src={user.avatar}
                  alt={user.name}
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs font-medium text-indigo-200 group-hover:text-white">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="ml-auto flex items-center justify-center h-8 w-8 rounded-full bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <LogOut size={16} className="text-indigo-200" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;