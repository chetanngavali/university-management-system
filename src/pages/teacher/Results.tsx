import React, { useState } from 'react';
import { 
  Award, 
  BookOpen,
  FilePlus, 
  BarChart2, 
  Download, 
  Upload,
  Edit3,
  Save,
  Trash2,
  Plus,
  AlertTriangle
} from 'lucide-react';

// Sample data
const COURSES = [
  { id: 1, code: 'CS101', name: 'Introduction to Computer Science', students: 35, semester: 'Spring 2025' },
  { id: 2, code: 'CS202', name: 'Advanced Programming', students: 28, semester: 'Spring 2025' },
  { id: 3, code: 'CS301', name: 'Data Structures and Algorithms', students: 24, semester: 'Spring 2025' },
];

const ASSESSMENTS = [
  // CS101
  { id: 1, courseId: 1, name: 'Quiz 1', weight: 10, maxScore: 20, published: true },
  { id: 2, courseId: 1, name: 'Assignment 1', weight: 15, maxScore: 100, published: true },
  { id: 3, courseId: 1, name: 'Midterm Exam', weight: 25, maxScore: 100, published: true },
  { id: 4, courseId: 1, name: 'Assignment 2', weight: 15, maxScore: 100, published: true },
  { id: 5, courseId: 1, name: 'Final Project', weight: 15, maxScore: 100, published: false },
  { id: 6, courseId: 1, name: 'Final Exam', weight: 20, maxScore: 100, published: false },
  
  // CS202
  { id: 7, courseId: 2, name: 'Programming Assignment 1', weight: 10, maxScore: 50, published: true },
  { id: 8, courseId: 2, name: 'Programming Assignment 2', weight: 10, maxScore: 50, published: true },
  { id: 9, courseId: 2, name: 'Quiz 1', weight: 5, maxScore: 20, published: true },
  { id: 10, courseId: 2, name: 'Midterm Exam', weight: 25, maxScore: 100, published: true },
  { id: 11, courseId: 2, name: 'Programming Assignment 3', weight: 10, maxScore: 50, published: false },
  { id: 12, courseId: 2, name: 'Final Exam', weight: 40, maxScore: 100, published: false },
  
  // CS301
  { id: 13, courseId: 3, name: 'Quiz 1', weight: 5, maxScore: 20, published: true },
  { id: 14, courseId: 3, name: 'Quiz 2', weight: 5, maxScore: 20, published: true },
  { id: 15, courseId: 3, name: 'Algorithm Analysis Assignment', weight: 15, maxScore: 100, published: true },
  { id: 16, courseId: 3, name: 'Midterm Exam', weight: 25, maxScore: 100, published: true },
  { id: 17, courseId: 3, name: 'Data Structures Project', weight: 20, maxScore: 100, published: false },
  { id: 18, courseId: 3, name: 'Final Exam', weight: 30, maxScore: 100, published: false },
];

// Sample students and grades
const STUDENT_GRADES = [
  // CS101 Students
  { id: 1, courseId: 1, studentId: 'S1001', name: 'Alex Johnson', grades: [
    { assessmentId: 1, score: 18 },
    { assessmentId: 2, score: 87 },
    { assessmentId: 3, score: 78 },
    { assessmentId: 4, score: 92 },
  ]},
  { id: 2, courseId: 1, studentId: 'S1002', name: 'Sophia Williams', grades: [
    { assessmentId: 1, score: 16 },
    { assessmentId: 2, score: 95 },
    { assessmentId: 3, score: 85 },
    { assessmentId: 4, score: 88 },
  ]},
  { id: 3, courseId: 1, studentId: 'S1003', name: 'Michael Brown', grades: [
    { assessmentId: 1, score: 19 },
    { assessmentId: 2, score: 90 },
    { assessmentId: 3, score: 92 },
    { assessmentId: 4, score: 94 },
  ]},
  { id: 4, courseId: 1, studentId: 'S1004', name: 'Emma Davis', grades: [
    { assessmentId: 1, score: 14 },
    { assessmentId: 2, score: 78 },
    { assessmentId: 3, score: 68 },
    { assessmentId: 4, score: 82 },
  ]},
  { id: 5, courseId: 1, studentId: 'S1005', name: 'James Wilson', grades: [
    { assessmentId: 1, score: 17 },
    { assessmentId: 2, score: 85 },
    { assessmentId: 3, score: 75 },
    { assessmentId: 4, score: 80 },
  ]},
  
  // CS202 Students
  { id: 6, courseId: 2, studentId: 'S1006', name: 'Olivia Martinez', grades: [
    { assessmentId: 7, score: 45 },
    { assessmentId: 8, score: 48 },
    { assessmentId: 9, score: 18 },
    { assessmentId: 10, score: 88 },
  ]},
  { id: 7, courseId: 2, studentId: 'S1007', name: 'Noah Garcia', grades: [
    { assessmentId: 7, score: 42 },
    { assessmentId: 8, score: 44 },
    { assessmentId: 9, score: 16 },
    { assessmentId: 10, score: 92 },
  ]},
  { id: 8, courseId: 2, studentId: 'S1008', name: 'Isabella Rodriguez', grades: [
    { assessmentId: 7, score: 47 },
    { assessmentId: 8, score: 46 },
    { assessmentId: 9, score: 19 },
    { assessmentId: 10, score: 95 },
  ]},
  
  // CS301 Students
  { id: 9, courseId: 3, studentId: 'S1009', name: 'Liam Wilson', grades: [
    { assessmentId: 13, score: 18 },
    { assessmentId: 14, score: 17 },
    { assessmentId: 15, score: 88 },
    { assessmentId: 16, score: 82 },
  ]},
  { id: 10, courseId: 3, studentId: 'S1010', name: 'Ava Thomas', grades: [
    { assessmentId: 13, score: 19 },
    { assessmentId: 14, score: 18 },
    { assessmentId: 15, score: 92 },
    { assessmentId: 16, score: 85 },
  ]},
];

const TeacherResults = () => {
  const [selectedCourse, setSelectedCourse] = useState<number>(1);
  const [selectedAssessment, setSelectedAssessment] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showAddAssessment, setShowAddAssessment] = useState<boolean>(false);
  const [newAssessmentData, setNewAssessmentData] = useState({ name: '', weight: 10, maxScore: 100 });
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  const [grades, setGrades] = useState([...STUDENT_GRADES]);
  
  // Filter course assessments
  const courseAssessments = ASSESSMENTS.filter(assessment => assessment.courseId === selectedCourse);
  
  // Get the selected course
  const currentCourse = COURSES.find(course => course.id === selectedCourse);
  
  // Get the selected assessment
  const currentAssessment = courseAssessments.find(a => a.id === selectedAssessment);
  
  // Filter students and grades for the selected course
  const courseStudents = grades.filter(student => student.courseId === selectedCourse);
  
  // Calculate grade statistics for the selected assessment
  const calculateAssessmentStats = () => {
    if (!selectedAssessment) return { avg: 0, min: 0, max: 0, assessmentWeight: 0, maxPossible: 0 };
    
    const studentGrades = courseStudents
      .map(student => {
        const grade = student.grades.find(g => g.assessmentId === selectedAssessment);
        return grade ? grade.score : null;
      })
      .filter(score => score !== null) as number[];
    
    if (studentGrades.length === 0) {
      return { avg: 0, min: 0, max: 0, assessmentWeight: 0, maxPossible: 0 };
    }
    
    const assessment = ASSESSMENTS.find(a => a.id === selectedAssessment);
    
    return {
      avg: studentGrades.reduce((sum, score) => sum + score, 0) / studentGrades.length,
      min: Math.min(...studentGrades),
      max: Math.max(...studentGrades),
      assessmentWeight: assessment?.weight || 0,
      maxPossible: assessment?.maxScore || 0
    };
  };
  
  const stats = calculateAssessmentStats();
  
  // Calculate course average for a student
  const calculateStudentAverage = (student: any) => {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    const assessments = ASSESSMENTS.filter(a => a.courseId === selectedCourse);
    
    student.grades.forEach((grade: any) => {
      const assessment = assessments.find(a => a.id === grade.assessmentId);
      if (assessment && assessment.published) {
        const weightedScore = (grade.score / assessment.maxScore) * assessment.weight;
        totalWeightedScore += weightedScore;
        totalWeight += assessment.weight;
      }
    });
    
    if (totalWeight === 0) return null;
    
    return (totalWeightedScore / totalWeight) * 100;
  };
  
  // Handle grade change
  const handleGradeChange = (studentId: number, assessmentId: number, newScore: number) => {
    // Validate score
    const assessment = ASSESSMENTS.find(a => a.id === assessmentId);
    if (!assessment) return;
    
    const maxScore = assessment.maxScore;
    
    // Ensure score is not negative or greater than max
    if (newScore < 0) newScore = 0;
    if (newScore > maxScore) newScore = maxScore;
    
    setUnsavedChanges(true);
    
    const updatedGrades = grades.map(student => {
      if (student.id === studentId) {
        const gradeIndex = student.grades.findIndex(g => g.assessmentId === assessmentId);
        
        if (gradeIndex >= 0) {
          // Update existing grade
          const updatedGrades = [...student.grades];
          updatedGrades[gradeIndex] = {
            ...updatedGrades[gradeIndex],
            score: newScore
          };
          
          return {
            ...student,
            grades: updatedGrades
          };
        } else {
          // Add new grade
          return {
            ...student,
            grades: [
              ...student.grades,
              { assessmentId, score: newScore }
            ]
          };
        }
      }
      return student;
    });
    
    setGrades(updatedGrades);
  };
  
  // Get grade for a student and assessment
  const getStudentGrade = (student: any, assessmentId: number) => {
    const grade = student.grades.find((g: any) => g.assessmentId === assessmentId);
    return grade ? grade.score : null;
  };
  
  // Save grade changes
  const saveGradeChanges = () => {
    // In a real app, this would send data to the backend
    setEditMode(false);
    setUnsavedChanges(false);
    alert('Grades saved successfully!');
  };
  
  // Handle publishing/unpublishing an assessment
  const togglePublishAssessment = (assessmentId: number) => {
    // In a real app, this would update the backend
    const updatedAssessments = ASSESSMENTS.map(assessment => {
      if (assessment.id === assessmentId) {
        return {
          ...assessment,
          published: !assessment.published
        };
      }
      return assessment;
    });
    
    // Update the local state (in a real app, you'd get this from the backend)
    ASSESSMENTS.splice(0, ASSESSMENTS.length, ...updatedAssessments);
    
    alert(currentAssessment?.published 
      ? 'Assessment has been unpublished. Students will no longer see these grades.' 
      : 'Assessment has been published. Students can now see these grades.');
  };
  
  // Add new assessment
  const handleAddAssessment = () => {
    // Validate form
    if (!newAssessmentData.name.trim() || newAssessmentData.weight <= 0 || newAssessmentData.maxScore <= 0) {
      alert('Please enter valid assessment details.');
      return;
    }
    
    // In a real app, this would send a request to the backend
    const newId = Math.max(...ASSESSMENTS.map(a => a.id)) + 1;
    const newAssessment = {
      id: newId,
      courseId: selectedCourse,
      name: newAssessmentData.name,
      weight: newAssessmentData.weight,
      maxScore: newAssessmentData.maxScore,
      published: false
    };
    
    // Update local state
    ASSESSMENTS.push(newAssessment);
    
    // Reset the form
    setNewAssessmentData({ name: '', weight: 10, maxScore: 100 });
    setShowAddAssessment(false);
    
    // Select the new assessment
    setSelectedAssessment(newId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
            <Award className="mr-2 text-indigo-600" size={20} />
            Grade Management
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Course selector and assessment selector */}
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
                  onChange={(e) => {
                    setSelectedCourse(parseInt(e.target.value));
                    setSelectedAssessment(null);
                    setEditMode(false);
                  }}
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
                <div className="flex justify-between">
                  <label htmlFor="assessment-select" className="block text-sm font-medium text-gray-700">
                    Select Assessment
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAddAssessment(!showAddAssessment)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <Plus size={14} className="mr-1" />
                    Add Assessment
                  </button>
                </div>
                <select
                  id="assessment-select"
                  value={selectedAssessment || ''}
                  onChange={(e) => {
                    setSelectedAssessment(e.target.value ? parseInt(e.target.value) : null);
                    setEditMode(false);
                  }}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select an assessment...</option>
                  {courseAssessments.map((assessment) => (
                    <option key={assessment.id} value={assessment.id}>
                      {assessment.name} ({assessment.weight}%, {assessment.published ? 'Published' : 'Draft'})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add new assessment form */}
            {showAddAssessment && (
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Add New Assessment</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="assessment-name" className="block text-xs font-medium text-gray-700">
                      Assessment Name
                    </label>
                    <input
                      type="text"
                      id="assessment-name"
                      value={newAssessmentData.name}
                      onChange={(e) => setNewAssessmentData({ ...newAssessmentData, name: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g. Quiz 1"
                    />
                  </div>
                  <div>
                    <label htmlFor="assessment-weight" className="block text-xs font-medium text-gray-700">
                      Weight (%)
                    </label>
                    <input
                      type="number"
                      id="assessment-weight"
                      value={newAssessmentData.weight}
                      onChange={(e) => setNewAssessmentData({ ...newAssessmentData, weight: parseInt(e.target.value) || 0 })}
                      min="1"
                      max="100"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="assessment-max" className="block text-xs font-medium text-gray-700">
                      Maximum Score
                    </label>
                    <input
                      type="number"
                      id="assessment-max"
                      value={newAssessmentData.maxScore}
                      onChange={(e) => setNewAssessmentData({ ...newAssessmentData, maxScore: parseInt(e.target.value) || 0 })}
                      min="1"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddAssessment(false)}
                    className="px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddAssessment}
                    className="px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Assessment
                  </button>
                </div>
              </div>
            )}

            {currentCourse && selectedAssessment && (
              <div className="mt-6 bg-gray-50 p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {currentAssessment?.name} ({currentAssessment?.weight}% of total grade)
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      Maximum score: {currentAssessment?.maxScore} points | Status: {' '}
                      <span 
                        className={`font-medium ${currentAssessment?.published ? 'text-green-600' : 'text-amber-600'}`}
                      >
                        {currentAssessment?.published ? 'Published' : 'Draft'}
                      </span>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => togglePublishAssessment(selectedAssessment)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                        currentAssessment?.published
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {currentAssessment?.published ? 'Unpublish' : 'Publish'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setEditMode(!editMode)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                        editMode
                          ? 'bg-gray-200 text-gray-800'
                          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      }`}
                    >
                      {editMode ? 'Cancel Edit' : 'Edit Grades'}
                    </button>
                    
                    {editMode && (
                      <button
                        type="button"
                        onClick={saveGradeChanges}
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

        {/* Grade Statistics */}
        {selectedAssessment ? (
          <div className="bg-white shadow rounded-lg h-full">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-base font-medium text-gray-900 flex items-center">
                <BarChart2 className="mr-2 text-indigo-600" size={18} />
                Grade Statistics
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-medium uppercase text-gray-500 mb-1">Class Average</h4>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold text-indigo-600">
                      {stats.avg.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      / {stats.maxPossible}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {stats.maxPossible > 0 ? ((stats.avg / stats.maxPossible) * 100).toFixed(1) : 0}% average score
                  </div>
                </div>
                
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-medium uppercase text-gray-500 mb-1">Highest Score</h4>
                    <div className="flex items-end">
                      <span className="text-xl font-bold text-green-600">
                        {stats.max}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        / {stats.maxPossible}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {stats.maxPossible > 0 ? ((stats.max / stats.maxPossible) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium uppercase text-gray-500 mb-1">Lowest Score</h4>
                    <div className="flex items-end">
                      <span className="text-xl font-bold text-red-600">
                        {stats.min}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        / {stats.maxPossible}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {stats.maxPossible > 0 ? ((stats.min / stats.maxPossible) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h4 className="text-xs font-medium uppercase text-gray-500 mb-3">Score Distribution</h4>
                  <div className="space-y-2">
                    {/* A Range: 90-100% */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>90-100%</span>
                        <span className="font-medium">
                          {courseStudents.filter(student => {
                            const grade = getStudentGrade(student, selectedAssessment);
                            return grade !== null && grade / stats.maxPossible >= 0.9;
                          }).length} students
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${courseStudents.length > 0 
                              ? (courseStudents.filter(student => {
                                  const grade = getStudentGrade(student, selectedAssessment);
                                  return grade !== null && grade / stats.maxPossible >= 0.9;
                                }).length / courseStudents.length) * 100
                              : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* B Range: 80-89% */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>80-89%</span>
                        <span className="font-medium">
                          {courseStudents.filter(student => {
                            const grade = getStudentGrade(student, selectedAssessment);
                            return grade !== null && grade / stats.maxPossible >= 0.8 && grade / stats.maxPossible < 0.9;
                          }).length} students
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${courseStudents.length > 0 
                              ? (courseStudents.filter(student => {
                                  const grade = getStudentGrade(student, selectedAssessment);
                                  return grade !== null && grade / stats.maxPossible >= 0.8 && grade / stats.maxPossible < 0.9;
                                }).length / courseStudents.length) * 100
                              : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* C Range: 70-79% */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>70-79%</span>
                        <span className="font-medium">
                          {courseStudents.filter(student => {
                            const grade = getStudentGrade(student, selectedAssessment);
                            return grade !== null && grade / stats.maxPossible >= 0.7 && grade / stats.maxPossible < 0.8;
                          }).length} students
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width: `${courseStudents.length > 0 
                              ? (courseStudents.filter(student => {
                                  const grade = getStudentGrade(student, selectedAssessment);
                                  return grade !== null && grade / stats.maxPossible >= 0.7 && grade / stats.maxPossible < 0.8;
                                }).length / courseStudents.length) * 100
                              : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* D Range: 60-69% */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>60-69%</span>
                        <span className="font-medium">
                          {courseStudents.filter(student => {
                            const grade = getStudentGrade(student, selectedAssessment);
                            return grade !== null && grade / stats.maxPossible >= 0.6 && grade / stats.maxPossible < 0.7;
                          }).length} students
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{
                            width: `${courseStudents.length > 0 
                              ? (courseStudents.filter(student => {
                                  const grade = getStudentGrade(student, selectedAssessment);
                                  return grade !== null && grade / stats.maxPossible >= 0.6 && grade / stats.maxPossible < 0.7;
                                }).length / courseStudents.length) * 100
                              : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* F Range: 0-59% */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>0-59%</span>
                        <span className="font-medium">
                          {courseStudents.filter(student => {
                            const grade = getStudentGrade(student, selectedAssessment);
                            return grade !== null && grade / stats.maxPossible < 0.6;
                          }).length} students
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{
                            width: `${courseStudents.length > 0 
                              ? (courseStudents.filter(student => {
                                  const grade = getStudentGrade(student, selectedAssessment);
                                  return grade !== null && grade / stats.maxPossible < 0.6;
                                }).length / courseStudents.length) * 100
                              : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-medium uppercase text-gray-500">Actions</h4>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Download size={16} className="mr-2" />
                      Export Grades
                    </button>
                    
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Upload size={16} className="mr-2" />
                      Import Grades
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg h-full">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-base font-medium text-gray-900">Grade Statistics</h3>
            </div>
            <div className="p-6 flex flex-col items-center justify-center h-64">
              <BookOpen className="h-10 w-10 text-gray-400 mb-2" />
              <h4 className="text-sm font-medium text-gray-900 mb-1">No Assessment Selected</h4>
              <p className="text-xs text-gray-500 text-center">
                Please select an assessment to view grade statistics.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Student Grades Table */}
      {selectedAssessment ? (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-base font-medium text-gray-900 flex items-center">
              <FilePlus className="mr-2 text-indigo-600" size={18} />
              Student Grades for {currentAssessment?.name}
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
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Average
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courseStudents.map((student) => {
                  const score = getStudentGrade(student, selectedAssessment);
                  const percentage = score !== null && stats.maxPossible > 0 
                    ? (score / stats.maxPossible) * 100 
                    : null;
                  const courseAverage = calculateStudentAverage(student);
                  
                  // Determine grade color based on percentage
                  const getGradeColor = (percent: number | null) => {
                    if (percent === null) return 'text-gray-500';
                    if (percent >= 90) return 'text-green-600';
                    if (percent >= 80) return 'text-blue-600';
                    if (percent >= 70) return 'text-yellow-600';
                    if (percent >= 60) return 'text-orange-600';
                    return 'text-red-600';
                  };
                  
                  return (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editMode ? (
                          <input
                            type="number"
                            value={score || ''}
                            onChange={(e) => handleGradeChange(
                              student.id, 
                              selectedAssessment, 
                              e.target.value ? parseInt(e.target.value) : 0
                            )}
                            min="0"
                            max={stats.maxPossible}
                            className="w-20 px-2 py-1 text-sm border-gray-300 rounded-md"
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-900">
                            {score !== null ? score : '—'} 
                            {score !== null ? <span className="text-gray-500">/{stats.maxPossible}</span> : ''}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getGradeColor(percentage)}`}>
                          {percentage !== null ? `${percentage.toFixed(1)}%` : '—'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getGradeColor(courseAverage)}`}>
                          {courseAverage !== null ? `${courseAverage.toFixed(1)}%` : '—'}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-900">Student Grades</h3>
          </div>
          <div className="p-10 flex flex-col items-center justify-center">
            <BookOpen className="h-12 w-12 text-gray-400 mb-3" />
            <h4 className="text-sm font-medium text-gray-900 mb-1">No Assessment Selected</h4>
            <p className="text-sm text-gray-500 text-center max-w-md">
              Please select an assessment from the dropdown menu above to view and manage student grades.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherResults;