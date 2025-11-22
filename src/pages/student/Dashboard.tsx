import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Book, Clock, Calendar, Award, CheckCircle, AlertCircle } from 'lucide-react';
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
  { id: 1, name: 'Introduction to Computer Science', code: 'CS101', instructor: 'Dr. Smith', grade: 'A', attendance: '95%', time: 'Mon, Wed, Fri 10:00 AM', status: 'active' },
  { id: 2, name: 'Calculus I', code: 'MATH101', instructor: 'Dr. Johnson', grade: 'B+', attendance: '88%', time: 'Tue, Thu 1:00 PM', status: 'active' },
  { id: 3, name: 'English Composition', code: 'ENG101', instructor: 'Prof. Williams', grade: 'A-', attendance: '92%', time: 'Mon, Wed 2:00 PM', status: 'active' },
  { id: 4, name: 'Introduction to Psychology', code: 'PSY101', instructor: 'Dr. Brown', grade: 'B', attendance: '85%', time: 'Tue, Thu 3:00 PM', status: 'active' },
];

const announcements = [
  { id: 1, title: 'Mid-term Exam Schedule', date: '2025-03-15', content: 'Mid-term exams will be held from March 20th to March 24th. Please check your email for detailed schedule.' },
  { id: 2, title: 'Campus Maintenance', date: '2025-03-10', content: 'The library will be closed for maintenance from March 12th to March 14th.' },
  { id: 3, title: 'Registration for Next Semester', date: '2025-03-05', content: 'Registration for the fall semester will open on April 1st. Please meet with your advisor before registering.' },
];

const deadlines = [
  { id: 1, course: 'CS101', title: 'Programming Assignment #3', due: '2025-03-18' },
  { id: 2, course: 'MATH101', title: 'Problem Set #5', due: '2025-03-20' },
  { id: 3, course: 'ENG101', title: 'Essay Draft', due: '2025-03-22' },
];

const StudentDashboard = () => {
  const { user } = useAuth();

  // Chart data for grades
  const gradeData = {
    labels: courses.map(course => course.code),
    datasets: [
      {
        label: 'Current Grade (GPA)',
        data: courses.map(course => {
          const gradeMap: {[key: string]: number} = {
            'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0
          };
          return gradeMap[course.grade] || 0;
        }),
        backgroundColor: 'rgba(79, 70, 229, 0.6)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 4.0,
        title: {
          display: true,
          text: 'GPA',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Current Course Grades',
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
            Here's an overview of your academic status and upcoming activities.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Current Courses Card */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <Book className="mr-2 text-indigo-600" size={20} />
              Current Courses
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {courses.length} Active
            </span>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-200">
              {courses.slice(0, 3).map((course) => (
                <li key={course.id} className="py-3">
                  <div className="flex items-start">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{course.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {course.code} • {course.instructor}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="inline-flex items-center mr-3 text-xs font-medium">
                          <Clock size={14} className="mr-1 text-gray-400" />
                          {course.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-indigo-600">{course.grade}</span>
                      <span className="text-xs text-gray-500 mt-1">{course.attendance}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link 
                to="/student/courses" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                View all courses →
              </Link>
            </div>
          </div>
        </div>

        {/* Announcements Card */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <Calendar className="mr-2 text-indigo-600" size={20} />
              Announcements
            </h3>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <li key={announcement.id} className="py-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {announcement.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(announcement.date).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {announcement.content}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <a 
                href="#" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                View all announcements →
              </a>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines Card */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <Clock className="mr-2 text-indigo-600" size={20} />
              Upcoming Deadlines
            </h3>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-200">
              {deadlines.map((deadline) => {
                const dueDate = new Date(deadline.due);
                const now = new Date();
                const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                const isUrgent = diffDays <= 3;
                
                return (
                  <li key={deadline.id} className="py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {isUrgent ? (
                          <AlertCircle className="text-amber-500" size={18} />
                        ) : (
                          <CheckCircle className="text-green-500" size={18} />
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {deadline.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {deadline.course} • Due {dueDate.toLocaleDateString()}
                        </p>
                        <p className={`text-xs mt-1 ${isUrgent ? 'text-amber-500 font-medium' : 'text-gray-500'}`}>
                          {diffDays > 0 
                            ? `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}` 
                            : 'Due today'}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4">
              <a 
                href="#" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                View all assignments →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Performance Chart */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <Award className="mr-2 text-indigo-600" size={20} />
              Academic Performance
            </h3>
          </div>
          <div className="p-4 h-72">
            <Bar data={gradeData} options={chartOptions} />
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
              <Calendar className="mr-2 text-indigo-600" size={20} />
              Attendance Overview
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {courses.map((course) => {
                const attendanceValue = parseInt(course.attendance.replace('%', ''), 10);
                const getColorClass = (value: number) => {
                  if (value >= 90) return 'bg-green-500';
                  if (value >= 80) return 'bg-blue-500';
                  if (value >= 70) return 'bg-yellow-500';
                  return 'bg-red-500';
                };
                
                return (
                  <div key={course.id} className="flex items-center">
                    <div className="w-24 flex-shrink-0">
                      <p className="text-sm font-medium text-gray-700">{course.code}</p>
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            style={{ width: course.attendance }}
                            className={`${getColorClass(attendanceValue)} rounded`}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-12 flex-shrink-0 text-right">
                      <p className="text-sm font-medium text-gray-900">{course.attendance}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6">
              <Link
                to="/student/attendance"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                View detailed attendance →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;