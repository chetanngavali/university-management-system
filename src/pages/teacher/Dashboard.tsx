import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  Award,
  CheckCircle,
  XCircle,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample data
const courses = [
  { id: 1, name: 'Introduction to Computer Science', code: 'CS101', students: 35, schedule: 'Mon, Wed, Fri 10:00 AM', room: 'Tech 301', pendingGrades: 0, pendingAttendance: 0 },
  { id: 2, name: 'Advanced Programming', code: 'CS202', students: 28, schedule: 'Tue, Thu 1:00 PM', room: 'Tech 205', pendingGrades: 2, pendingAttendance: 0 },
  { id: 3, name: 'Data Structures and Algorithms', code: 'CS301', students: 24, schedule: 'Mon, Wed 2:00 PM', room: 'Tech 401', pendingGrades: 5, pendingAttendance: 1 },
];

const upcomingClasses = [
  { id: 1, course: 'CS101', name: 'Introduction to Computer Science', day: 'Monday', time: '10:00 AM - 11:30 AM', room: 'Tech 301' },
  { id: 2, course: 'CS301', name: 'Data Structures and Algorithms', day: 'Monday', time: '2:00 PM - 3:30 PM', room: 'Tech 401' },
  { id: 3, course: 'CS202', name: 'Advanced Programming', day: 'Tuesday', time: '1:00 PM - 2:30 PM', room: 'Tech 205' },
];

const recentActivity = [
  { id: 1, type: 'attendance', course: 'CS101', description: 'Attendance recorded for 35 students', time: '2 hours ago' },
  { id: 2, type: 'grades', course: 'CS202', description: 'Assignment 3 grades posted', time: '1 day ago' },
  { id: 3, type: 'message', course: 'CS301', description: 'Announcement posted about project deadline', time: '2 days ago' },
  { id: 4, type: 'grades', course: 'CS101', description: 'Midterm exam grades posted', time: '4 days ago' },
];

const pendingTasks = [
  { id: 1, type: 'grades', course: 'CS301', description: 'Grade Project Submissions', dueDate: '2025-03-15', priority: 'high' },
  { id: 2, type: 'attendance', course: 'CS301', description: 'Update attendance for missed class', dueDate: '2025-03-12', priority: 'medium' },
  { id: 3, type: 'grades', course: 'CS202', description: 'Grade Quiz 4', dueDate: '2025-03-20', priority: 'medium' },
];

const TeacherDashboard = () => {
  const { user } = useAuth();

  // Data for class distribution chart
  const classDistributionData = {
    labels: courses.map(course => course.code),
    datasets: [
      {
        label: 'Number of Students',
        data: courses.map(course => course.students),
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
      title: {
        display: true,
        text: 'Class Distribution',
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
            Here's an overview of your teaching activities and upcoming classes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Stats Cards */}
        <div className="bg-white shadow rounded-lg p-5 border-l-4 border-indigo-500">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-5">
              <h4 className="text-sm font-medium text-gray-500">Total Students</h4>
              <div className="mt-1 flex items-baseline">
                <h3 className="text-xl font-semibold text-gray-900">87</h3>
                <span className="ml-2 text-sm text-green-600">+12%</span>
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
              <h4 className="text-sm font-medium text-gray-500">Courses</h4>
              <div className="mt-1 flex items-baseline">
                <h3 className="text-xl font-semibold text-gray-900">{courses.length}</h3>
                <span className="ml-2 text-sm text-green-600">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5 border-l-4 border-emerald-500">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-emerald-100 rounded-md p-3">
              <Calendar className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-5">
              <h4 className="text-sm font-medium text-gray-500">Classes This Week</h4>
              <div className="mt-1 flex items-baseline">
                <h3 className="text-xl font-semibold text-gray-900">12</h3>
                <span className="ml-2 text-sm text-gray-600">Scheduled</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5 border-l-4 border-amber-500">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
              <FileText className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-5">
              <h4 className="text-sm font-medium text-gray-500">Pending Tasks</h4>
              <div className="mt-1 flex items-baseline">
                <h3 className="text-xl font-semibold text-gray-900">{pendingTasks.length}</h3>
                <span className="ml-2 text-sm text-red-600">Needs Action</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Courses Card */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <BookOpen className="mr-2 text-indigo-600" size={20} />
              My Courses
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Spring 2025
            </span>
          </div>
          <div className="p-6">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pending
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{course.code}</div>
                        <div className="text-xs text-gray-500">{course.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{course.students}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs text-gray-900">{course.schedule}</div>
                        <div className="text-xs text-gray-500">{course.room}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {course.pendingGrades > 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                              {course.pendingGrades} Grades
                            </span>
                          )}
                          {course.pendingAttendance > 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {course.pendingAttendance} Attendance
                            </span>
                          )}
                          {course.pendingGrades === 0 && course.pendingAttendance === 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              Up to date
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <Link to="/teacher/courses" className="text-sm font-medium text-indigo-600 hover:text-indigo-900 flex items-center">
                View all courses
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Classes Card */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <Clock className="mr-2 text-indigo-600" size={20} />
              Upcoming Classes
            </h3>
          </div>
          <div className="px-6 py-5">
            <ul className="divide-y divide-gray-200">
              {upcomingClasses.map((cls) => (
                <li key={cls.id} className="py-4 flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-indigo-100 rounded-md p-3">
                      <Calendar className="h-5 w-5 text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{cls.course}: {cls.name}</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <p>{cls.day}, {cls.time}</p>
                    </div>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <BookOpen className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <p>{cls.room}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link to="/teacher/schedule" className="text-sm font-medium text-indigo-600 hover:text-indigo-900 flex items-center">
                View full schedule
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pending Tasks */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <AlertTriangle className="mr-2 text-amber-500" size={20} />
              Pending Tasks
            </h3>
          </div>
          <div className="p-6">
            {pendingTasks.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {pendingTasks.map((task) => (
                  <li key={task.id} className="py-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {task.priority === 'high' ? (
                          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                            <XCircle className="h-5 w-5 text-red-600" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-amber-600" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{task.description}</p>
                        <div className="mt-1 flex items-center">
                          <span className="text-xs text-gray-500">{task.course}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-xs text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Complete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No pending tasks</h3>
                <p className="mt-1 text-sm text-gray-500">Great job! You're all caught up.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <FileText className="mr-2 text-indigo-600" size={20} />
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="py-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {activity.type === 'attendance' ? (
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                      ) : activity.type === 'grades' ? (
                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Award className="h-5 w-5 text-emerald-600" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <div className="mt-1 flex items-center">
                        <span className="text-xs font-medium text-indigo-600">{activity.course}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Class Distribution */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <Users className="mr-2 text-indigo-600" size={20} />
              Class Distribution
            </h3>
          </div>
          <div className="p-6">
            <Bar data={classDistributionData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;