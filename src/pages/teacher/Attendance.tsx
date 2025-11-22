import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  XCircle,
  Clock,
  Save,
  AlertTriangle
} from 'lucide-react';

// Sample data
const COURSES = [
  { id: 1, code: 'CS101', name: 'Introduction to Computer Science', students: 35, schedule: 'Mon, Wed, Fri 10:00 AM', room: 'Tech 301' },
  { id: 2, code: 'CS202', name: 'Advanced Programming', students: 28, schedule: 'Tue, Thu 1:00 PM', room: 'Tech 205' },
  { id: 3, code: 'CS301', name: 'Data Structures and Algorithms', students: 24, schedule: 'Mon, Wed 2:00 PM', room: 'Tech 401' },
];

const STUDENTS = [
  // CS101
  { id: 1, courseId: 1, name: 'Alex Johnson', studentId: 'S1001', attendance: [
    { date: '2025-03-10', status: 'present' },
    { date: '2025-03-12', status: 'present' },
    { date: '2025-03-14', status: 'late' },
  ]},
  { id: 2, courseId: 1, name: 'Sophia Williams', studentId: 'S1002', attendance: [
    { date: '2025-03-10', status: 'present' },
    { date: '2025-03-12', status: 'absent' },
    { date: '2025-03-14', status: 'present' },
  ]},
  { id: 3, courseId: 1, name: 'Michael Brown', studentId: 'S1003', attendance: [
    { date: '2025-03-10', status: 'present' },
    { date: '2025-03-12', status: 'present' },
    { date: '2025-03-14', status: 'present' },
  ]},
  { id: 4, courseId: 1, name: 'Emma Davis', studentId: 'S1004', attendance: [
    { date: '2025-03-10', status: 'absent' },
    { date: '2025-03-12', status: 'present' },
    { date: '2025-03-14', status: 'present' },
  ]},
  { id: 5, courseId: 1, name: 'James Wilson', studentId: 'S1005', attendance: [
    { date: '2025-03-10', status: 'present' },
    { date: '2025-03-12', status: 'present' },
    { date: '2025-03-14', status: 'absent' },
  ]},
  
  // CS202
  { id: 6, courseId: 2, name: 'Olivia Martinez', studentId: 'S1006', attendance: [
    { date: '2025-03-11', status: 'present' },
    { date: '2025-03-13', status: 'present' },
  ]},
  { id: 7, courseId: 2, name: 'Noah Garcia', studentId: 'S1007', attendance: [
    { date: '2025-03-11', status: 'absent' },
    { date: '2025-03-13', status: 'present' },
  ]},
  { id: 8, courseId: 2, name: 'Isabella Rodriguez', studentId: 'S1008', attendance: [
    { date: '2025-03-11', status: 'present' },
    { date: '2025-03-13', status: 'late' },
  ]},
  { id: 9, courseId: 2, name: 'Liam Wilson', studentId: 'S1009', attendance: [
    { date: '2025-03-11', status: 'present' },
    { date: '2025-03-13', status: 'present' },
  ]},
  
  // CS301
  { id: 10, courseId: 3, name: 'Ava Thomas', studentId: 'S1010', attendance: [
    { date: '2025-03-10', status: 'present' },
    { date: '2025-03-12', status: 'present' },
  ]},
  { id: 11, courseId: 3, name: 'Ethan White', studentId: 'S1011', attendance: [
    { date: '2025-03-10', status: 'late' },
    { date: '2025-03-12', status: 'absent' },
  ]},
  { id: 12, courseId: 3, name: 'Charlotte Lopez', studentId: 'S1012', attendance: [
    { date: '2025-03-10', status: 'present' },
    { date: '2025-03-12', status: 'present' },
  ]},
];

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

const TeacherAttendance = () => {
  const [selectedCourse, setSelectedCourse] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [attendanceData, setAttendanceData] = useState<any[]>([...STUDENTS]);
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

  // Filter students by selected course
  const courseStudents = attendanceData.filter(student => student.courseId === selectedCourse);
  
  // Get the selected course
  const currentCourse = COURSES.find(course => course.id === selectedCourse);

  // Toggle course details
  const toggleCourseDetails = (courseId: number) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  // Calculate attendance stats for selected course
  const calculateAttendanceStats = () => {
    // Get all attendance records for the selected course
    const allAttendance: any[] = [];
    courseStudents.forEach(student => {
      student.attendance.forEach((record: any) => {
        allAttendance.push(record);
      });
    });
    
    const present = allAttendance.filter(a => a.status === 'present').length;
    const absent = allAttendance.filter(a => a.status === 'absent').length;
    const late = allAttendance.filter(a => a.status === 'late').length;
    const total = allAttendance.length;
    
    return { present, absent, late, total };
  };
  
  const stats = calculateAttendanceStats();
  
  // Handle attendance status change
  const handleAttendanceChange = (studentId: number, newStatus: string) => {
    setUnsavedChanges(true);
    
    const updatedData = attendanceData.map(student => {
      if (student.id === studentId) {
        // Check if there's already an attendance record for today
        const existingAttendanceIndex = student.attendance.findIndex(
          (a: any) => a.date === selectedDate
        );
        
        if (existingAttendanceIndex >= 0) {
          // Update existing record
          const updatedAttendance = [...student.attendance];
          updatedAttendance[existingAttendanceIndex] = {
            ...updatedAttendance[existingAttendanceIndex],
            status: newStatus
          };
          
          return {
            ...student,
            attendance: updatedAttendance
          };
        } else {
          // Add new record
          return {
            ...student,
            attendance: [
              ...student.attendance,
              { date: selectedDate, status: newStatus }
            ]
          };
        }
      }
      return student;
    });
    
    setAttendanceData(updatedData);
  };
  
  // Get attendance status for a student on selected date
  const getAttendanceStatus = (student: any) => {
    const record = student.attendance.find((a: any) => a.date === selectedDate);
    return record ? record.status : null;
  };
  
  // Save attendance changes
  const saveAttendanceChanges = () => {
    // In a real app, this would send data to the backend
    setEditMode(false);
    setUnsavedChanges(false);
    alert('Attendance saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
            <Calendar className="mr-2 text-indigo-600" size={20} />
            Attendance Management
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Course selector and date picker */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="course-select" className="block text-sm font-medium text-gray-700">
                  Select Course
                </label>
                <select
                  id="course-select"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(parseInt(e.target.value))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {COURSES.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.code}: {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date-select" className="block text-sm font-medium text-gray-700">
                  Select Date
                </label>
                <input
                  type="date"
                  id="date-select"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
              </div>
            </div>

            {currentCourse && (
              <div className="mt-6 bg-gray-50 p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{currentCourse.code}: {currentCourse.name}</h4>
                    <p className="mt-1 text-xs text-gray-500">Schedule: {currentCourse.schedule} | Room: {currentCourse.room}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditMode(!editMode)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                        editMode
                          ? 'bg-gray-200 text-gray-800'
                          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      }`}
                    >
                      {editMode ? 'Cancel Edit' : 'Edit Attendance'}
                    </button>
                    
                    {editMode && (
                      <button
                        type="button"
                        onClick={saveAttendanceChanges}
                        disabled={!unsavedChanges}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center ${
                          unsavedChanges
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <Save size={14} className="mr-1" />
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white shadow rounded-lg h-full">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-900">Attendance Summary</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Present</span>
                <span className="text-sm font-medium text-gray-900">
                  {stats.present} of {stats.total} ({stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${stats.total > 0 ? (stats.present / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Late</span>
                <span className="text-sm font-medium text-gray-900">
                  {stats.late} of {stats.total} ({stats.total > 0 ? Math.round((stats.late / stats.total) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${stats.total > 0 ? (stats.late / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Absent</span>
                <span className="text-sm font-medium text-gray-900">
                  {stats.absent} of {stats.total} ({stats.total > 0 ? Math.round((stats.absent / stats.total) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${stats.total > 0 ? (stats.absent / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Attendance by Date</h4>
              <div className="text-xs text-gray-600">
                Select a date above to view or record attendance for a specific class session.
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <span className="font-medium">Selected Date:</span> {new Date(selectedDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Record Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-base font-medium text-gray-900 flex items-center">
            <Clock className="mr-2 text-indigo-600" size={18} />
            Attendance Record for {new Date(selectedDate).toLocaleDateString()}
          </h3>
          
          {unsavedChanges && (
            <div className="flex items-center text-amber-600">
              <AlertTriangle size={16} className="mr-1" />
              <span className="text-xs font-medium">Unsaved changes</span>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {editMode && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courseStudents.map((student) => {
                const status = getAttendanceStatus(student);
                
                return (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.studentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {status ? (
                        <div className="flex items-center">
                          {status === 'present' ? (
                            <CheckCircle className="text-green-500 mr-2" size={16} />
                          ) : status === 'absent' ? (
                            <XCircle className="text-red-500 mr-2" size={16} />
                          ) : (
                            <Clock className="text-yellow-500 mr-2" size={16} />
                          )}
                          <span 
                            className={`text-sm font-medium ${
                              status === 'present' ? 'text-green-700' : 
                              status === 'absent' ? 'text-red-700' : 
                              'text-yellow-700'
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Not recorded</span>
                      )}
                    </td>
                    {editMode && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'present')}
                          className={`px-2 py-1 rounded-md text-xs ${
                            status === 'present' 
                              ? 'bg-green-100 text-green-800 font-medium ring-1 ring-green-600' 
                              : 'bg-gray-100 text-gray-800 hover:bg-green-50'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'late')}
                          className={`px-2 py-1 rounded-md text-xs ${
                            status === 'late' 
                              ? 'bg-yellow-100 text-yellow-800 font-medium ring-1 ring-yellow-600' 
                              : 'bg-gray-100 text-gray-800 hover:bg-yellow-50'
                          }`}
                        >
                          Late
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student.id, 'absent')}
                          className={`px-2 py-1 rounded-md text-xs ${
                            status === 'absent' 
                              ? 'bg-red-100 text-red-800 font-medium ring-1 ring-red-600' 
                              : 'bg-gray-100 text-gray-800 hover:bg-red-50'
                          }`}
                        >
                          Absent
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Attendance History */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-base font-medium text-gray-900">Attendance History by Course</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {COURSES.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-md overflow-hidden">
                <div 
                  className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleCourseDetails(course.id)}
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{course.code}: {course.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {course.schedule} • Room {course.room} • {course.students} students
                    </p>
                  </div>
                  <div>
                    {expandedCourse === course.id ? (
                      <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-500" />
                    )}
                  </div>
                </div>
                
                {expandedCourse === course.id && (
                  <div className="px-4 py-3">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Present
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Late
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Absent
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Attendance Rate
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {/* Get unique dates for this course */}
                          {Array.from(new Set(
                            STUDENTS
                              .filter(s => s.courseId === course.id)
                              .flatMap(s => s.attendance.map((a: any) => a.date))
                          )).sort().map(date => {
                            // Calculate stats for this date
                            const dateAttendance = STUDENTS
                              .filter(s => s.courseId === course.id)
                              .map(s => {
                                const record = s.attendance.find((a: any) => a.date === date);
                                return record ? record.status : null;
                              })
                              .filter(s => s !== null);
                              
                            const present = dateAttendance.filter(s => s === 'present').length;
                            const late = dateAttendance.filter(s => s === 'late').length;
                            const absent = dateAttendance.filter(s => s === 'absent').length;
                            const total = present + late + absent;
                            const rate = total > 0 ? ((present + late) / total) * 100 : 0;
                            
                            return (
                              <tr key={date}>
                                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                                  {new Date(date as string).toLocaleDateString()}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs text-green-600 font-medium">
                                  {present}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs text-yellow-600 font-medium">
                                  {late}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-xs text-red-600 font-medium">
                                  {absent}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                                      <div
                                        className={`h-1.5 rounded-full ${
                                          rate >= 90 ? 'bg-green-500' : 
                                          rate >= 80 ? 'bg-blue-500' : 
                                          rate >= 70 ? 'bg-yellow-500' : 
                                          'bg-red-500'
                                        }`}
                                        style={{ width: `${rate}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs text-gray-900 font-medium">{rate.toFixed(0)}%</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendance;