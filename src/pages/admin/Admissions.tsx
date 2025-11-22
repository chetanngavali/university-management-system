import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  Mail,
  BookOpen,
  User,
  Phone,
  MapPin,
  PlusCircle
} from 'lucide-react';

// Sample applications data
const APPLICATIONS = [
  { 
    id: 'APP-2025-0001', 
    applicant: { 
      name: 'Emma Roberts', 
      email: 'emma.roberts@example.com',
      phone: '(555) 123-4567',
      address: '123 University Ave, Berkeley, CA 94720',
      dob: '1998-05-12'
    }, 
    program: 'Computer Science', 
    degree: 'Bachelor of Science',
    appliedDate: '2025-03-05', 
    status: 'reviewing',
    documents: ['Transcripts', 'Statement of Purpose', 'Recommendation Letters'],
    education: [
      { school: 'Berkeley High School', degree: 'High School Diploma', gpa: '3.92', year: '2024' }
    ],
    testScores: [
      { test: 'SAT', score: '1480', date: '2024-11-10' },
      { test: 'ACT', score: '32', date: '2024-10-15' }
    ],
    notes: 'Strong academic background with excellent test scores.'
  },
  { 
    id: 'APP-2025-0002', 
    applicant: { 
      name: 'Daniel Chen', 
      email: 'daniel.chen@example.com',
      phone: '(555) 234-5678',
      address: '456 College St, Palo Alto, CA 94301',
      dob: '1997-08-23'
    }, 
    program: 'Electrical Engineering', 
    degree: 'Bachelor of Science',
    appliedDate: '2025-03-04', 
    status: 'accepted',
    documents: ['Transcripts', 'Statement of Purpose', 'Recommendation Letters', 'Portfolio'],
    education: [
      { school: 'Palo Alto High School', degree: 'High School Diploma', gpa: '4.0', year: '2024' }
    ],
    testScores: [
      { test: 'SAT', score: '1520', date: '2024-10-05' }
    ],
    notes: 'Exceptional academic record with multiple awards in robotics competitions.'
  },
  { 
    id: 'APP-2025-0003', 
    applicant: { 
      name: 'Sophia Martinez', 
      email: 'sophia.m@example.com',
      phone: '(555) 345-6789',
      address: '789 Academic Dr, San Jose, CA 95112',
      dob: '1999-02-15'
    }, 
    program: 'Business Administration', 
    degree: 'Bachelor of Business Administration',
    appliedDate: '2025-03-03', 
    status: 'reviewing',
    documents: ['Transcripts', 'Statement of Purpose', 'Recommendation Letters'],
    education: [
      { school: 'Wilcox High School', degree: 'High School Diploma', gpa: '3.85', year: '2024' }
    ],
    testScores: [
      { test: 'SAT', score: '1410', date: '2024-11-12' }
    ],
    notes: 'Demonstrated leadership skills through student government positions.'
  },
  { 
    id: 'APP-2025-0004', 
    applicant: { 
      name: 'James Wilson', 
      email: 'james.w@example.com',
      phone: '(555) 456-7890',
      address: '101 Education St, Oakland, CA 94618',
      dob: '1998-11-30'
    }, 
    program: 'Psychology', 
    degree: 'Bachelor of Arts',
    appliedDate: '2025-03-01', 
    status: 'rejected',
    documents: ['Transcripts', 'Statement of Purpose', 'Recommendation Letters'],
    education: [
      { school: 'Oakland Technical High School', degree: 'High School Diploma', gpa: '3.2', year: '2024' }
    ],
    testScores: [
      { test: 'SAT', score: '1280', date: '2024-09-22' }
    ],
    notes: 'Application incomplete - missing one recommendation letter.'
  },
  { 
    id: 'APP-2025-0005', 
    applicant: { 
      name: 'Olivia Johnson', 
      email: 'olivia.j@example.com',
      phone: '(555) 567-8901',
      address: '202 Scholar Ave, Fremont, CA 94539',
      dob: '1999-07-18'
    }, 
    program: 'Environmental Science', 
    degree: 'Bachelor of Science',
    appliedDate: '2025-02-28', 
    status: 'accepted',
    documents: ['Transcripts', 'Statement of Purpose', 'Recommendation Letters', 'Research Paper'],
    education: [
      { school: 'Mission San Jose High School', degree: 'High School Diploma', gpa: '3.95', year: '2024' }
    ],
    testScores: [
      { test: 'SAT', score: '1490', date: '2024-10-15' },
      { test: 'AP Environmental Science', score: '5', date: '2024-05-10' }
    ],
    notes: 'Impressive extracurricular activities related to environmental conservation.'
  },
  { 
    id: 'APP-2025-0006', 
    applicant: { 
      name: 'Ethan Brown', 
      email: 'ethan.b@example.com',
      phone: '(555) 678-9012',
      address: '303 Campus Blvd, Menlo Park, CA 94025',
      dob: '1998-04-05'
    }, 
    program: 'Computer Engineering', 
    degree: 'Bachelor of Science',
    appliedDate: '2025-02-27', 
    status: 'waitlisted',
    documents: ['Transcripts', 'Statement of Purpose', 'Recommendation Letters'],
    education: [
      { school: 'Menlo-Atherton High School', degree: 'High School Diploma', gpa: '3.78', year: '2024' }
    ],
    testScores: [
      { test: 'SAT', score: '1420', date: '2024-11-05' },
      { test: 'AP Computer Science', score: '5', date: '2024-05-08' }
    ],
    notes: 'Strong technical skills but limited extracurricular activities.'
  },
  { 
    id: 'APP-2025-0007', 
    applicant: { 
      name: 'Ava Thompson', 
      email: 'ava.t@example.com',
      phone: '(555) 789-0123',
      address: '404 Learning Ln, Cupertino, CA 95014',
      dob: '1999-09-22'
    }, 
    program: 'Graphic Design', 
    degree: 'Bachelor of Fine Arts',
    appliedDate: '2025-02-26', 
    status: 'accepted',
    documents: ['Transcripts', 'Statement of Purpose', 'Recommendation Letters', 'Portfolio'],
    education: [
      { school: 'Cupertino High School', degree: 'High School Diploma', gpa: '3.88', year: '2024' }
    ],
    testScores: [
      { test: 'SAT', score: '1380', date: '2024-10-20' }
    ],
    notes: 'Exceptional portfolio with innovative design work.'
  },
  { 
    id: 'APP-2025-0008', 
    applicant: { 
      name: 'Noah Garcia', 
      email: 'noah.g@example.com',
      phone: '(555) 890-1234',
      address: '505 Student Dr, San Francisco, CA 94132',
      dob: '1997-12-10'
    }, 
    program: 'Economics', 
    degree: 'Bachelor of Arts',
    appliedDate: '2025-02-25', 
    status: 'reviewing',
    documents: ['Transcripts', 'Statement of Purpose', 'Recommendation Letters'],
    education: [
      { school: 'Abraham Lincoln High School', degree: 'High School Diploma', gpa: '3.75', year: '2024' }
    ],
    testScores: [
      { test: 'SAT', score: '1450', date: '2024-11-08' },
      { test: 'AP Economics', score: '4', date: '2024-05-12' }
    ],
    notes: 'Demonstrated interest in economics through internship experience.'
  },
];

const AdminAdmissions = () => {
  const [applications, setApplications] = useState([...APPLICATIONS]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [programFilter, setProgramFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  // Get unique programs for filter
  const programs = Array.from(new Set(APPLICATIONS.map(app => app.program))).sort();

  // Filter applications based on search and filters
  const filteredApplications = applications.filter(app => {
    // Search term filter
    const searchMatch = !searchTerm || 
      app.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.program.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const statusMatch = !statusFilter || app.status === statusFilter;
    
    // Program filter
    const programMatch = !programFilter || app.program === programFilter;
    
    return searchMatch && statusMatch && programMatch;
  });

  // Update application status
  const updateApplicationStatus = (id: string, newStatus: string) => {
    const updatedApplications = applications.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status: newStatus
        };
      }
      return app;
    });
    
    setApplications(updatedApplications);
  };

  // Get selected application details
  const selectedApplicationDetails = applications.find(app => app.id === selectedApplication);

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return { 
          icon: <CheckCircle size={16} className="mr-1 text-green-500" />,
          bgColor: 'bg-green-100', 
          textColor: 'text-green-800' 
        };
      case 'rejected':
        return { 
          icon: <XCircle size={16} className="mr-1 text-red-500" />,
          bgColor: 'bg-red-100', 
          textColor: 'text-red-800' 
        };
      case 'waitlisted':
        return { 
          icon: <AlertCircle size={16} className="mr-1 text-amber-500" />,
          bgColor: 'bg-amber-100', 
          textColor: 'text-amber-800' 
        };
      default:
        return { 
          icon: <Clock size={16} className="mr-1 text-indigo-500" />,
          bgColor: 'bg-indigo-100', 
          textColor: 'text-indigo-800' 
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
            <FileText className="mr-2 text-indigo-600" size={20} />
            Admissions Management
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Review and process admission applications for all programs.
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="relative rounded-md shadow-sm md:max-w-lg w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by name, ID, or program..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Filter className="mr-2 -ml-1 h-5 w-5 text-gray-400" />
                Filters {showFilters ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </button>
              
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="mr-2 -ml-1 h-5 w-5 text-gray-400" />
                Export
              </button>
              
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusCircle className="mr-2 -ml-1 h-5 w-5" />
                New Application
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter || ''}
                  onChange={(e) => setStatusFilter(e.target.value || null)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">All Statuses</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="waitlisted">Waitlisted</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="program-filter" className="block text-sm font-medium text-gray-700">
                  Program
                </label>
                <select
                  id="program-filter"
                  value={programFilter || ''}
                  onChange={(e) => setProgramFilter(e.target.value || null)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">All Programs</option>
                  {programs.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => {
                const { icon, bgColor, textColor } = getStatusBadge(application.status);
                return (
                  <tr 
                    key={application.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${selectedApplication === application.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelectedApplication(application.id === selectedApplication ? null : application.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{application.applicant.name}</div>
                      <div className="text-sm text-gray-500">{application.applicant.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.program}</div>
                      <div className="text-sm text-gray-500">{application.degree}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
                        {icon}
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApplication(application.id);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredApplications.length === 0 && (
          <div className="px-6 py-10 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* Application Detail Panel */}
      {selectedApplicationDetails && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Application Details - {selectedApplicationDetails.id}
            </h3>
            <div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setSelectedApplication(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left Column - Applicant Information */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Applicant Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {selectedApplicationDetails.applicant.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <h5 className="text-base font-medium text-gray-900">
                          {selectedApplicationDetails.applicant.name}
                        </h5>
                        <div className="mt-1 text-sm text-gray-500">
                          <div className="flex items-center mt-1">
                            <Mail size={14} className="mr-1 text-gray-400" />
                            {selectedApplicationDetails.applicant.email}
                          </div>
                          <div className="flex items-center mt-1">
                            <Phone size={14} className="mr-1 text-gray-400" />
                            {selectedApplicationDetails.applicant.phone}
                          </div>
                          <div className="flex items-center mt-1">
                            <MapPin size={14} className="mr-1 text-gray-400" />
                            {selectedApplicationDetails.applicant.address}
                          </div>
                          <div className="flex items-center mt-1">
                            <Calendar size={14} className="mr-1 text-gray-400" />
                            Born: {new Date(selectedApplicationDetails.applicant.dob).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Application Status
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getStatusBadge(selectedApplicationDetails.status).bgColor
                      } ${
                        getStatusBadge(selectedApplicationDetails.status).textColor
                      }`}>
                        {getStatusBadge(selectedApplicationDetails.status).icon}
                        {selectedApplicationDetails.status.charAt(0).toUpperCase() + selectedApplicationDetails.status.slice(1)}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        Applied: {new Date(selectedApplicationDetails.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">Update Status:</div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => updateApplicationStatus(selectedApplicationDetails.id, 'accepted')}
                          className={`flex justify-center items-center px-3 py-2 border text-sm font-medium rounded-md ${
                            selectedApplicationDetails.status === 'accepted'
                              ? 'bg-green-100 text-green-700 border-green-300'
                              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                          }`}
                        >
                          <CheckCircle size={16} className="mr-1" />
                          Accept
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(selectedApplicationDetails.id, 'rejected')}
                          className={`flex justify-center items-center px-3 py-2 border text-sm font-medium rounded-md ${
                            selectedApplicationDetails.status === 'rejected'
                              ? 'bg-red-100 text-red-700 border-red-300'
                              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                          }`}
                        >
                          <XCircle size={16} className="mr-1" />
                          Reject
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(selectedApplicationDetails.id, 'waitlisted')}
                          className={`flex justify-center items-center px-3 py-2 border text-sm font-medium rounded-md ${
                            selectedApplicationDetails.status === 'waitlisted'
                              ? 'bg-amber-100 text-amber-700 border-amber-300'
                              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                          }`}
                        >
                          <AlertCircle size={16} className="mr-1" />
                          Waitlist
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(selectedApplicationDetails.id, 'reviewing')}
                          className={`flex justify-center items-center px-3 py-2 border text-sm font-medium rounded-md ${
                            selectedApplicationDetails.status === 'reviewing'
                              ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                          }`}
                        >
                          <Clock size={16} className="mr-1" />
                          Reviewing
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Actions:</div>
                      <div className="grid grid-cols-1 gap-2">
                        <button
                          className="flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Mail size={16} className="mr-1" />
                          Send Email to Applicant
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Documents
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="divide-y divide-gray-200">
                      {selectedApplicationDetails.documents.map((doc, index) => (
                        <li key={index} className="py-2 flex justify-between items-center">
                          <span className="text-sm text-gray-700 flex items-center">
                            <FileText size={14} className="mr-2 text-gray-400" />
                            {doc}
                          </span>
                          <button className="text-xs text-indigo-600 hover:text-indigo-900">
                            View
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Middle Column - Educational Background */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Program Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <BookOpen size={18} className="mr-2 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-base font-medium text-gray-900">
                          {selectedApplicationDetails.program}
                        </h5>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedApplicationDetails.degree}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Educational Background
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {selectedApplicationDetails.education.map((edu, index) => (
                      <div key={index} className={index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}>
                        <div className="flex items-start">
                          <GraduationCap size={18} className="mr-2 text-indigo-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-gray-900">
                              {edu.school}
                            </h5>
                            <p className="text-sm text-gray-500 mt-1">
                              {edu.degree}, {edu.year}
                            </p>
                            <div className="mt-2 flex items-center">
                              <span className="text-xs text-gray-500 mr-1">GPA:</span>
                              <span className="text-sm font-medium text-indigo-600">{edu.gpa}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Test Scores
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {selectedApplicationDetails.testScores.map((test, index) => (
                      <div key={index} className={index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}>
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="text-sm font-medium text-gray-900">
                              {test.test}
                            </h5>
                            <p className="text-xs text-gray-500 mt-1">
                              Date: {new Date(test.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              Score: {test.score}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column - Notes and Review */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Review Notes
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <textarea
                      rows={6}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Add review notes here..."
                      defaultValue={selectedApplicationDetails.notes}
                    ></textarea>
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Reviewer Assignment
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <User size={18} className="mr-2 text-gray-400" />
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        defaultValue=""
                      >
                        <option value="" disabled>Assign a reviewer</option>
                        <option value="1">Dr. Johnson (Department Chair)</option>
                        <option value="2">Prof. Williams (Program Director)</option>
                        <option value="3">Dr. Smith (Faculty Member)</option>
                        <option value="4">Dr. Garcia (Admissions Committee)</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Assign Reviewer
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Final Decision
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-col space-y-4">
                      <button
                        onClick={() => updateApplicationStatus(selectedApplicationDetails.id, 'accepted')}
                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Accept Application
                      </button>
                      
                      <button
                        onClick={() => updateApplicationStatus(selectedApplicationDetails.id, 'waitlisted')}
                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                      >
                        <AlertCircle size={16} className="mr-2" />
                        Waitlist Application
                      </button>
                      
                      <button
                        onClick={() => updateApplicationStatus(selectedApplicationDetails.id, 'rejected')}
                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <XCircle size={16} className="mr-2" />
                        Reject Application
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAdmissions;