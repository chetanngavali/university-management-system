import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  BookOpen, 
  FileText, 
  Calendar, 
  ArrowUp, 
  ArrowDown,
  Briefcase,
  GraduationCap,
  Building,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Sample data
const admissionStats = {
  applied: 850,
  reviewing: 320,
  accepted: 350,
  rejected: 130,
  waitlisted: 50,
  previousYearApplied: 750
};

const enrollmentStats = {
  total: 2450,
  undergraduate: 1850,
  graduate: 600,
  previousYearTotal: 2300,
  byDepartment: [
    { name: 'Computer Science', count: 480 },
    { name: 'Engineering', count: 520 },
    { name: 'Business', count: 410 },
    { name: 'Arts & Humanities', count: 290 },
    { name: 'Social Sciences', count: 330 },
    { name: 'Natural Sciences', count: 420 }
  ]
};

const recentApplications = [
  { id: 1, name: 'Emma Roberts', program: 'Computer Science', date: '2025-03-05', status: 'reviewing' },
  { id: 2, name: 'Daniel Chen', program: 'Electrical Engineering', date: '2025-03-04', status: 'accepted' },
  { id: 3, name: 'Sophia Martinez', program: 'Business Administration', date: '2025-03-03', status: 'reviewing' },
  { id: 4, name: 'James Wilson', program: 'Psychology', date: '2025-03-01', status: 'rejected' },
  { id: 5, name: 'Olivia Johnson', program: 'Environmental Science', date: '2025-02-28', status: 'accepted' },
];

const upcomingEvents = [
  { id: 1, name: 'Spring Semester Registration', date: '2025-03-15', type: 'academic' },
  { id: 2, name: 'Faculty Senate Meeting', date: '2025-03-12', type: 'administrative' },
  { id: 3, name: 'Campus Open House', date: '2025-03-20', type: 'admissions' },
  { id: 4, name: 'Graduation Ceremony Planning', date: '2025-03-18', type: 'administrative' },
];

const AdminDashboard = () => {
  const { user } = useAuth();

  // Calculate admission growth rate
  const admissionGrowthRate = ((admissionStats.applied - admissionStats.previousYearApplied) / admissionStats.previousYearApplied) * 100;
  
  // Calculate enrollment growth rate
  const enrollmentGrowthRate = ((enrollmentStats.total - enrollmentStats.previousYearTotal) / enrollmentStats.previousYearTotal) * 100;

  // Data for admissions status chart
  const admissionsData = {
    labels: ['Reviewing', 'Accepted', 'Rejected', 'Waitlisted'],
    datasets: [
      {
        data: [
          admissionStats.reviewing,
          admissionStats.accepted,
          admissionStats.rejected,
          admissionStats.waitlisted
        ],
        backgroundColor: [
          'rgba(79, 70, 229, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(245, 158, 11, 0.6)',
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for enrollment by department chart
  const enrollmentByDepartmentData = {
    labels: enrollmentStats.byDepartment.map(dept => dept.name),
    datasets: [
      {
        label: 'Students',
        data: enrollmentStats.byDepartment.map(dept => dept.count),
        backgroundColor: 'rgba(79, 70, 229, 0.6)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Welcome back, {user?.name}!
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Here's an overview of university operations and key metrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats Cards */}
        <div className="bg-white shadow rounded-lg p-5 border-l-4 border-indigo-500">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-5">
              <h4 className="text-sm font-medium text-gray-500">Total Students</h4>
              <div className="mt-1 flex items-baseline">
                <h3 className="text-xl font-semibold text-gray-900">{enrollmentStats.total.toLocaleString()}</h3>
                <span className={`ml-2 text-sm ${enrollmentGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {enrollmentGrowthRate >= 0 ? '+' : ''}{enrollmentGrowthRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5">
              <h4 className="text-sm font-medium text-gray-500">Applications</h4>
              <div className="mt-1 flex items-baseline">
                <h3 className="text-xl font-semibold text-gray-900">{admissionStats.applied.toLocaleString()}</h3>
                <span className={`ml-2 text-sm ${admissionGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {admissionGrowthRate >= 0 ? '+' : ''}{admissionGrowthRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5">
              <h4 className="text-sm font-medium text-gray-500">Programs</h4>
              <div className="mt-1 flex items-baseline">
                <h3 className="text-xl font-semibold text-gray-900">42</h3>
                <span className="ml-2 text-sm text-gray-600">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5">
              <h4 className="text-sm font-medium text-gray-500">Faculty & Staff</h4>
              <div className="mt-1 flex items-baseline">
                <h3 className="text-xl font-semibold text-gray-900">218</h3>
                <span className="ml-2 text-sm text-green-600">+5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Admissions Summary */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <FileText className="mr-2 text-indigo-600" size={20} />
              Admissions Summary
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {admissionStats.accepted} Accepted
            </span>
          </div>
          <div className="p-6">
            <div className="mb-6 h-64">
              <Doughnut data={admissionsData} options={chartOptions} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="bg-indigo-50 rounded-md p-4 text-center">
                <span className="text-xs font-medium text-indigo-600 uppercase">Reviewing</span>
                <p className="mt-1 text-lg font-semibold text-indigo-800">{admissionStats.reviewing}</p>
                <p className="text-xs text-indigo-500">{((admissionStats.reviewing / admissionStats.applied) * 100).toFixed(1)}%</p>
              </div>
              
              <div className="bg-green-50 rounded-md p-4 text-center">
                <span className="text-xs font-medium text-green-600 uppercase">Accepted</span>
                <p className="mt-1 text-lg font-semibold text-green-800">{admissionStats.accepted}</p>
                <p className="text-xs text-green-500">{((admissionStats.accepted / admissionStats.applied) * 100).toFixed(1)}%</p>
              </div>
              
              <div className="bg-red-50 rounded-md p-4 text-center">
                <span className="text-xs font-medium text-red-600 uppercase">Rejected</span>
                <p className="mt-1 text-lg font-semibold text-red-800">{admissionStats.rejected}</p>
                <p className="text-xs text-red-500">{((admissionStats.rejected / admissionStats.applied) * 100).toFixed(1)}%</p>
              </div>
              
              <div className="bg-amber-50 rounded-md p-4 text-center">
                <span className="text-xs font-medium text-amber-600 uppercase">Waitlisted</span>
                <p className="mt-1 text-lg font-semibold text-amber-800">{admissionStats.waitlisted}</p>
                <p className="text-xs text-amber-500">{((admissionStats.waitlisted / admissionStats.applied) * 100).toFixed(1)}%</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link to="/admin/admissions" className="text-sm font-medium text-indigo-600 hover:text-indigo-900 flex items-center">
                View all applications
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Enrollment by Department */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <Building className="mr-2 text-indigo-600" size={20} />
              Enrollment by Department
            </h3>
          </div>
          <div className="p-6">
            <div className="mb-6 h-64">
              <Bar data={enrollmentByDepartmentData} options={chartOptions} />
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-indigo-50 rounded-md p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-indigo-600 uppercase">Undergraduate</span>
                  <p className="mt-1 text-lg font-semibold text-indigo-800">{enrollmentStats.undergraduate.toLocaleString()}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-indigo-400" />
              </div>
              
              <div className="bg-blue-50 rounded-md p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-blue-600 uppercase">Graduate</span>
                  <p className="mt-1 text-lg font-semibold text-blue-800">{enrollmentStats.graduate.toLocaleString()}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link to="/admin/students" className="text-sm font-medium text-indigo-600 hover:text-indigo-900 flex items-center">
                View detailed enrollment
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <FileText className="mr-2 text-indigo-600" size={20} />
              Recent Applications
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentApplications.map((application) => (
              <div key={application.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{application.name}</h4>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <BookOpen className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <p>{application.program}</p>
                    </div>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <p>Applied: {new Date(application.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    application.status === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : application.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : application.status === 'waitlisted'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <Link to="/admin/admissions" className="text-sm font-medium text-indigo-600 hover:text-indigo-900 flex items-center">
              View all applications
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <Calendar className="mr-2 text-indigo-600" size={20} />
              Upcoming Events
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="px-6 py-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`rounded-md p-3 ${
                      event.type === 'academic'
                        ? 'bg-blue-100'
                        : event.type === 'administrative'
                        ? 'bg-purple-100'
                        : 'bg-green-100'
                    }`}>
                      {event.type === 'academic' && <BookOpen className="h-5 w-5 text-blue-600" />}
                      {event.type === 'administrative' && <Briefcase className="h-5 w-5 text-purple-600" />}
                      {event.type === 'admissions' && <Users className="h-5 w-5 text-green-600" />}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{event.name}</h4>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <p>{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <div className="mt-1 flex items-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        event.type === 'academic'
                          ? 'bg-blue-100 text-blue-800'
                          : event.type === 'administrative'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <Link to="/admin/calendar" className="text-sm font-medium text-indigo-600 hover:text-indigo-900 flex items-center">
              View full calendar
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Key metrics */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Key Performance Metrics
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
              <dt>
                <div className="absolute bg-indigo-500 rounded-md p-3">
                  <Users className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">Acceptance Rate</p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {((admissionStats.accepted / admissionStats.applied) * 100).toFixed(1)}%
                </p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <ArrowUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
                  <span className="sr-only">Increased by</span>
                  2.5%
                </p>
              </dd>
            </div>

            <div className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
              <dt>
                <div className="absolute bg-blue-500 rounded-md p-3">
                  <GraduationCap className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">Graduation Rate</p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  92.3%
                </p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <ArrowUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
                  <span className="sr-only">Increased by</span>
                  1.2%
                </p>
              </dd>
            </div>

            <div className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
              <dt>
                <div className="absolute bg-amber-500 rounded-md p-3">
                  <BookOpen className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">Student-Teacher Ratio</p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  14:1
                </p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                  <ArrowDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" aria-hidden="true" />
                  <span className="sr-only">Decreased by</span>
                  0.5
                </p>
              </dd>
            </div>

            <div className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
              <dt>
                <div className="absolute bg-green-500 rounded-md p-3">
                  <Building className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">Retention Rate</p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  89.7%
                </p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <ArrowUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
                  <span className="sr-only">Increased by</span>
                  3.2%
                </p>
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;