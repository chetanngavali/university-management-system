import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Filter
} from 'lucide-react';

// Sample data for attendance
const SAMPLE_ATTENDANCE = [
  {
    date: '2025-03-01',
    courses: [
      { id: 1, name: 'Introduction to Computer Science', code: 'CS101', status: 'present', time: '10:00 AM - 11:30 AM' },
      { id: 2, name: 'Calculus I', code: 'MATH101', status: 'present', time: '01:00 PM - 02:30 PM' },
    ]
  },
  {
    date: '2025-03-02',
    courses: [
      { id: 3, name: 'English Composition', code: 'ENG101', status: 'present', time: '11:00 AM - 12:30 PM' },
    ]
  },
  {
    date: '2025-03-03',
    courses: [
      { id: 1, name: 'Introduction to Computer Science', code: 'CS101', status: 'present', time: '10:00 AM - 11:30 AM' },
      { id: 4, name: 'Introduction to Psychology', code: 'PSY101', status: 'absent', time: '03:00 PM - 04:30 PM' },
    ]
  },
  {
    date: '2025-03-04',
    courses: [
      { id: 2, name: 'Calculus I', code: 'MATH101', status: 'late', time: '01:00 PM - 02:30 PM' },
    ]
  },
  {
    date: '2025-03-05',
    courses: [
      { id: 1, name: 'Introduction to Computer Science', code: 'CS101', status: 'present', time: '10:00 AM - 11:30 AM' },
      { id: 3, name: 'English Composition', code: 'ENG101', status: 'present', time: '11:00 AM - 12:30 PM' },
    ]
  },
  {
    date: '2025-03-08',
    courses: [
      { id: 1, name: 'Introduction to Computer Science', code: 'CS101', status: 'present', time: '10:00 AM - 11:30 AM' },
      { id: 2, name: 'Calculus I', code: 'MATH101', status: 'present', time: '01:00 PM - 02:30 PM' },
    ]
  },
  {
    date: '2025-03-09',
    courses: [
      { id: 3, name: 'English Composition', code: 'ENG101', status: 'present', time: '11:00 AM - 12:30 PM' },
    ]
  },
  {
    date: '2025-03-10',
    courses: [
      { id: 1, name: 'Introduction to Computer Science', code: 'CS101', status: 'present', time: '10:00 AM - 11:30 AM' },
      { id: 4, name: 'Introduction to Psychology', code: 'PSY101', status: 'present', time: '03:00 PM - 04:30 PM' },
    ]
  },
  {
    date: '2025-03-11',
    courses: [
      { id: 2, name: 'Calculus I', code: 'MATH101', status: 'present', time: '01:00 PM - 02:30 PM' },
    ]
  },
  {
    date: '2025-03-12',
    courses: [
      { id: 1, name: 'Introduction to Computer Science', code: 'CS101', status: 'absent', time: '10:00 AM - 11:30 AM' },
      { id: 3, name: 'English Composition', code: 'ENG101', status: 'present', time: '11:00 AM - 12:30 PM' },
    ]
  },
];

// List of courses for filter
const COURSES = [
  { id: 1, name: 'Introduction to Computer Science', code: 'CS101' },
  { id: 2, name: 'Calculus I', code: 'MATH101' },
  { id: 3, name: 'English Composition', code: 'ENG101' },
  { id: 4, name: 'Introduction to Psychology', code: 'PSY101' },
];

const StudentAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState(2); // 0-indexed, 2 = March
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Generate the current month's days
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
  
  // Calculate statistics
  const getAttendanceStats = () => {
    let present = 0;
    let absent = 0;
    let late = 0;
    let total = 0;

    SAMPLE_ATTENDANCE.forEach(day => {
      day.courses.forEach(course => {
        if (!selectedFilter || course.id === selectedFilter) {
          total++;
          if (course.status === 'present') present++;
          else if (course.status === 'absent') absent++;
          else if (course.status === 'late') late++;
        }
      });
    });

    return { present, absent, late, total };
  };

  const stats = getAttendanceStats();
  const presentPercentage = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;
  
  // Filter attendance records by selected course
  const filteredAttendance = SAMPLE_ATTENDANCE.map(day => ({
    ...day,
    courses: selectedFilter 
      ? day.courses.filter(course => course.id === selectedFilter)
      : day.courses
  })).filter(day => day.courses.length > 0);

  // Handle month navigation
  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="text-green-500" size={18} />;
      case 'absent':
        return <XCircle className="text-red-500" size={18} />;
      case 'late':
        return <AlertCircle className="text-amber-500" size={18} />;
      default:
        return null;
    }
  };

  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
            <Calendar className="mr-2 text-indigo-600" size={20} />
            Attendance Record
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Filter size={16} className="mr-1.5" />
            Filter
          </button>
        </div>
        
        {showFilters && (
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFilter(null)}
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  selectedFilter === null
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                All Courses
              </button>
              {COURSES.map(course => (
                <button
                  key={course.id}
                  onClick={() => setSelectedFilter(course.id)}
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    selectedFilter === course.id
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {course.code}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-base font-medium text-gray-900">
              {getMonthName(selectedMonth)} {selectedYear}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={prevMonth}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextMonth}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <div 
                  key={index} 
                  className="text-xs font-medium text-gray-500 text-center py-1"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array(firstDayOfMonth).fill(null).map((_, index) => (
                <div key={`empty-${index}`} className="h-10 md:h-16"></div>
              ))}
              
              {Array(daysInMonth).fill(null).map((_, index) => {
                const day = index + 1;
                const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayData = SAMPLE_ATTENDANCE.find(d => d.date === dateStr);
                
                // Filter by selected course
                const filteredCourses = dayData 
                  ? (selectedFilter 
                      ? dayData.courses.filter(c => c.id === selectedFilter) 
                      : dayData.courses)
                  : [];
                
                const hasPresent = filteredCourses.some(c => c.status === 'present');
                const hasAbsent = filteredCourses.some(c => c.status === 'absent');
                const hasLate = filteredCourses.some(c => c.status === 'late');
                
                const getStatusClass = () => {
                  if (hasAbsent) return 'bg-red-100 border-red-200';
                  if (hasLate) return 'bg-amber-50 border-amber-200';
                  if (hasPresent) return 'bg-green-50 border-green-200';
                  return 'hover:bg-gray-50';
                };
                
                return (
                  <div
                    key={`day-${day}`}
                    className={`h-10 md:h-16 p-1 border rounded-md flex flex-col ${getStatusClass()}`}
                  >
                    <div className="text-xs font-medium">{day}</div>
                    {filteredCourses.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-1 justify-center">
                        {filteredCourses.map((course, idx) => (
                          <div
                            key={idx}
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: 
                                course.status === 'present' ? '#10B981' : 
                                course.status === 'absent' ? '#EF4444' : 
                                '#F59E0B'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-900">Attendance Summary</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Overall Attendance</div>
              <div className="font-bold text-lg text-indigo-600">{presentPercentage}%</div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div 
                className={`h-2.5 rounded-full ${
                  presentPercentage >= 90 ? 'bg-green-500' : 
                  presentPercentage >= 80 ? 'bg-blue-500' : 
                  presentPercentage >= 70 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${presentPercentage}%` }}
              ></div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Present</span>
                </div>
                <div className="text-sm font-medium">
                  {stats.present} / {stats.total} ({stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0}%)
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Late</span>
                </div>
                <div className="text-sm font-medium">
                  {stats.late} / {stats.total} ({stats.total > 0 ? Math.round((stats.late / stats.total) * 100) : 0}%)
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Absent</span>
                </div>
                <div className="text-sm font-medium">
                  {stats.absent} / {stats.total} ({stats.total > 0 ? Math.round((stats.absent / stats.total) * 100) : 0}%)
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Attendance Requirements</h4>
              <div className="text-sm text-gray-600">
                <p className="mb-2">
                  Minimum required attendance: <span className="font-medium">75%</span>
                </p>
                <p className={`${presentPercentage < 75 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}`}>
                  {presentPercentage >= 75 
                    ? 'Your attendance meets the requirements.' 
                    : 'Your attendance is below the required minimum.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* List of attendance records */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-base font-medium text-gray-900">Detailed Attendance Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.map((day, dayIndex) => (
                day.courses.map((course, courseIndex) => (
                  <tr key={`${dayIndex}-${courseIndex}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(day.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{course.code}</div>
                      <div className="text-sm text-gray-500">{course.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(course.status)}
                        <span 
                          className={`ml-2 text-sm font-medium ${
                            course.status === 'present' ? 'text-green-700' : 
                            course.status === 'absent' ? 'text-red-700' : 
                            'text-amber-700'
                          }`}
                        >
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;