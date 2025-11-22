import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Download,
  BarChart
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for semesters
const SEMESTERS = [
  { id: 1, name: 'Fall 2024', status: 'completed', gpa: 3.7 },
  { id: 2, name: 'Spring 2025', status: 'current', gpa: 3.5 },
];

// Sample data for courses and results
const COURSES = [
  // Fall 2024
  { 
    id: 1, 
    semesterId: 1,
    code: 'CS100', 
    name: 'Introduction to Programming', 
    credits: 3,
    instructor: 'Dr. Smith',
    grades: [
      { type: 'Assignment 1', weight: 10, score: 95, maxScore: 100 },
      { type: 'Assignment 2', weight: 10, score: 88, maxScore: 100 },
      { type: 'Midterm', weight: 30, score: 82, maxScore: 100 },
      { type: 'Project', weight: 20, score: 90, maxScore: 100 },
      { type: 'Final Exam', weight: 30, score: 85, maxScore: 100 },
    ],
    totalScore: 86.4,
    letterGrade: 'B+',
    gradePoints: 3.3,
  },
  {
    id: 2,
    semesterId: 1,
    code: 'MATH101',
    name: 'Calculus I',
    credits: 4,
    instructor: 'Dr. Johnson',
    grades: [
      { type: 'Quiz 1', weight: 5, score: 95, maxScore: 100 },
      { type: 'Quiz 2', weight: 5, score: 90, maxScore: 100 },
      { type: 'Quiz 3', weight: 5, score: 88, maxScore: 100 },
      { type: 'Quiz 4', weight: 5, score: 92, maxScore: 100 },
      { type: 'Midterm 1', weight: 20, score: 88, maxScore: 100 },
      { type: 'Midterm 2', weight: 20, score: 90, maxScore: 100 },
      { type: 'Final Exam', weight: 40, score: 92, maxScore: 100 },
    ],
    totalScore: 90.6,
    letterGrade: 'A-',
    gradePoints: 3.7,
  },
  {
    id: 3,
    semesterId: 1,
    code: 'ENG101',
    name: 'English Composition',
    credits: 3,
    instructor: 'Prof. Williams',
    grades: [
      { type: 'Essay 1', weight: 15, score: 88, maxScore: 100 },
      { type: 'Essay 2', weight: 15, score: 92, maxScore: 100 },
      { type: 'Research Paper', weight: 30, score: 94, maxScore: 100 },
      { type: 'Presentation', weight: 10, score: 95, maxScore: 100 },
      { type: 'Final Exam', weight: 30, score: 90, maxScore: 100 },
    ],
    totalScore: 91.7,
    letterGrade: 'A-',
    gradePoints: 3.7,
  },
  {
    id: 4,
    semesterId: 1,
    code: 'HIST101',
    name: 'World History',
    credits: 3,
    instructor: 'Prof. Davis',
    grades: [
      { type: 'Quiz 1', weight: 5, score: 95, maxScore: 100 },
      { type: 'Quiz 2', weight: 5, score: 90, maxScore: 100 },
      { type: 'Midterm', weight: 25, score: 94, maxScore: 100 },
      { type: 'Research Paper', weight: 30, score: 92, maxScore: 100 },
      { type: 'Final Exam', weight: 35, score: 96, maxScore: 100 },
    ],
    totalScore: 94.0,
    letterGrade: 'A',
    gradePoints: 4.0,
  },
  
  // Spring 2025
  {
    id: 5,
    semesterId: 2,
    code: 'CS101',
    name: 'Introduction to Computer Science',
    credits: 3,
    instructor: 'Dr. Smith',
    grades: [
      { type: 'Assignment 1', weight: 10, score: 92, maxScore: 100 },
      { type: 'Assignment 2', weight: 10, score: 85, maxScore: 100 },
      { type: 'Midterm', weight: 30, score: 80, maxScore: 100 },
      { type: 'Project', weight: 20, score: 88, maxScore: 100 },
      { type: 'Final Exam', weight: 30, score: 82, maxScore: 100 }, // Final not graded yet
    ],
    totalScore: 84.2,
    letterGrade: 'B',
    gradePoints: 3.0,
  },
  {
    id: 6,
    semesterId: 2,
    code: 'MATH102',
    name: 'Calculus II',
    credits: 4,
    instructor: 'Dr. Johnson',
    grades: [
      { type: 'Quiz 1', weight: 5, score: 90, maxScore: 100 },
      { type: 'Quiz 2', weight: 5, score: 88, maxScore: 100 },
      { type: 'Midterm 1', weight: 20, score: 85, maxScore: 100 },
      { type: 'Midterm 2', weight: 20, score: 82, maxScore: 100 },
      { type: 'Final Exam', weight: 40, score: 0, maxScore: 100, status: 'pending' },
    ],
    totalScore: null,
    letterGrade: null,
    gradePoints: null,
    status: 'in-progress',
  },
  {
    id: 7,
    semesterId: 2,
    code: 'PSY101',
    name: 'Introduction to Psychology',
    credits: 3,
    instructor: 'Dr. Brown',
    grades: [
      { type: 'Quiz 1', weight: 5, score: 95, maxScore: 100 },
      { type: 'Quiz 2', weight: 5, score: 92, maxScore: 100 },
      { type: 'Midterm', weight: 30, score: 85, maxScore: 100 },
      { type: 'Research Paper', weight: 20, score: 90, maxScore: 100 },
      { type: 'Final Exam', weight: 40, score: 0, maxScore: 100, status: 'pending' },
    ],
    totalScore: null,
    letterGrade: null,
    gradePoints: null,
    status: 'in-progress',
  },
  {
    id: 8,
    semesterId: 2,
    code: 'PHYS101',
    name: 'Physics I',
    credits: 4,
    instructor: 'Dr. Garcia',
    grades: [
      { type: 'Lab 1', weight: 5, score: 92, maxScore: 100 },
      { type: 'Lab 2', weight: 5, score: 88, maxScore: 100 },
      { type: 'Lab 3', weight: 5, score: 95, maxScore: 100 },
      { type: 'Lab 4', weight: 5, score: 90, maxScore: 100 },
      { type: 'Midterm 1', weight: 15, score: 82, maxScore: 100 },
      { type: 'Midterm 2', weight: 15, score: 86, maxScore: 100 },
      { type: 'Final Exam', weight: 40, score: 0, maxScore: 100, status: 'pending' },
    ],
    totalScore: null,
    letterGrade: null,
    gradePoints: null,
    status: 'in-progress',
  },
];

const StudentResults = () => {
  const [selectedSemester, setSelectedSemester] = useState<number>(2); // Default to current semester
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  // Toggle course details
  const toggleCourseDetails = (courseId: number) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  // Filter courses by selected semester
  const semesterCourses = COURSES.filter(course => course.semesterId === selectedSemester);

  // Calculate semester GPA if available
  const currentSemester = SEMESTERS.find(sem => sem.id === selectedSemester);
  const semesterGPA = currentSemester?.gpa || 0;

  // Calculate cumulative GPA
  const calculateCumulativeGPA = () => {
    const completedCourses = COURSES.filter(course => course.gradePoints !== null);
    if (completedCourses.length === 0) return 0;
    
    const totalCredits = completedCourses.reduce((sum, course) => sum + course.credits, 0);
    const totalPoints = completedCourses.reduce((sum, course) => sum + (course.gradePoints || 0) * course.credits, 0);
    
    return totalPoints / totalCredits;
  };
  
  const cumulativeGPA = calculateCumulativeGPA();

  // Generate data for GPA chart
  const chartData = {
    labels: SEMESTERS.map(semester => semester.name),
    datasets: [
      {
        label: 'GPA',
        data: SEMESTERS.map(semester => semester.gpa),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Cumulative GPA',
        data: SEMESTERS.map(() => cumulativeGPA),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderDash: [5, 5],
        tension: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 4.0,
        title: {
          display: true,
          text: 'GPA'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with GPA overview */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
            <Award className="mr-2 text-indigo-600" size={20} />
            Academic Results
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-xs uppercase tracking-wide text-indigo-500 font-semibold mb-1">
                Cumulative GPA
              </div>
              <div className="text-3xl font-bold text-indigo-600">
                {cumulativeGPA.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {cumulativeGPA >= 3.5 ? 'Excellent' : 
                 cumulativeGPA >= 3.0 ? 'Good' : 
                 cumulativeGPA >= 2.5 ? 'Average' : 'Needs Improvement'}
              </div>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-xs uppercase tracking-wide text-emerald-500 font-semibold mb-1">
                {currentSemester?.name} GPA
              </div>
              <div className="text-3xl font-bold text-emerald-600">
                {currentSemester?.status === 'current' && currentSemester?.gpa === null 
                  ? '—' 
                  : semesterGPA.toFixed(2)}
              </div>
              {currentSemester?.status === 'current' && currentSemester?.gpa === null ? (
                <div className="text-xs text-gray-500 mt-1">In Progress</div>
              ) : (
                <div className="text-xs text-gray-500 mt-1">
                  {semesterGPA >= 3.5 ? 'Excellent' : 
                  semesterGPA >= 3.0 ? 'Good' : 
                  semesterGPA >= 2.5 ? 'Average' : 'Needs Improvement'}
                </div>
              )}
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-xs uppercase tracking-wide text-blue-500 font-semibold mb-1">
                Total Credits
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {COURSES.reduce((sum, course) => sum + course.credits, 0)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Completed
              </div>
            </div>
          </div>

          <div className="mt-6 h-64">
            <div className="flex items-center mb-4">
              <BarChart size={18} className="text-gray-500 mr-2" />
              <h4 className="text-sm font-medium text-gray-900">GPA Trend</h4>
            </div>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Semester selector */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {SEMESTERS.map(semester => (
            <button
              key={semester.id}
              onClick={() => setSelectedSemester(semester.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedSemester === semester.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {semester.name}
              {semester.status === 'current' && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Current
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Course list */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-base font-medium text-gray-900 flex items-center">
            <BookOpen className="mr-2 text-indigo-600" size={18} />
            Course Results
          </h3>
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Download size={16} className="mr-1.5" />
            Export
          </button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credits
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {semesterCourses.map(course => (
              <React.Fragment key={course.id}>
                <tr className={expandedCourse === course.id ? 'bg-gray-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{course.code}</div>
                    <div className="text-sm text-gray-500">{course.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.status === 'in-progress' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        In Progress
                      </span>
                    ) : (
                      <div className="text-sm text-gray-900">{course.totalScore !== null ? `${course.totalScore.toFixed(1)}%` : '—'}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.status === 'in-progress' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    ) : (
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          course.letterGrade?.startsWith('A') ? 'bg-green-100 text-green-800' :
                          course.letterGrade?.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                          course.letterGrade?.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                          course.letterGrade?.startsWith('D') ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {course.letterGrade || '—'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleCourseDetails(course.id)}
                      className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                    >
                      Details
                      {expandedCourse === course.id ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      )}
                    </button>
                  </td>
                </tr>
                
                {/* Expanded course details */}
                {expandedCourse === course.id && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 bg-gray-50">
                      <div className="text-sm">
                        <div className="mb-3 pb-3 border-b border-gray-200">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-900">Course Details</h4>
                            <span className="text-xs text-gray-500">Instructor: {course.instructor}</span>
                          </div>
                        </div>
                        
                        <h5 className="font-medium text-gray-700 mb-2">Grades Breakdown</h5>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Assessment
                                </th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Weight
                                </th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Score
                                </th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Weighted Score
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {course.grades.map((grade, index) => (
                                <tr key={index}>
                                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                                    {grade.type}
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                    {grade.weight}%
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                    {grade.status === 'pending' ? (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                        Pending
                                      </span>
                                    ) : (
                                      `${grade.score}/${grade.maxScore} (${((grade.score / grade.maxScore) * 100).toFixed(1)}%)`
                                    )}
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                    {grade.status === 'pending' ? 
                                      '—' : 
                                      ((grade.score / grade.maxScore) * grade.weight).toFixed(2)
                                    }
                                  </td>
                                </tr>
                              ))}
                              {course.totalScore !== null && (
                                <tr className="bg-gray-50">
                                  <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                                    Total
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                    100%
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap"></td>
                                  <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-indigo-600">
                                    {course.totalScore.toFixed(2)}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        
                        {/* Grade information */}
                        {course.letterGrade && (
                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="flex justify-between">
                              <div className="text-sm">
                                <span className="text-gray-500">Letter Grade: </span>
                                <span className="font-medium text-gray-900">{course.letterGrade}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-500">Grade Points: </span>
                                <span className="font-medium text-gray-900">{course.gradePoints?.toFixed(1)}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-500">Credits: </span>
                                <span className="font-medium text-gray-900">{course.credits}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-500">Quality Points: </span>
                                <span className="font-medium text-gray-900">
                                  {course.gradePoints !== null ? (course.gradePoints * course.credits).toFixed(1) : '—'}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentResults;