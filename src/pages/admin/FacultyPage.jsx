import React, { useState } from 'react';
import { Users, Plus, Edit3, Trash2, ShieldCheck, CheckCircle2, UserPlus, Key } from 'lucide-react';

export default function FacultyPage() {
  const [facultyList, setFacultyList] = useState([
    {
      id: 'f-1',
      name: 'Prof. Ananya Rao',
      designation: 'Head of Department (HOD)',
      dept: 'Computer Science & Engineering',
      email: 'ananya.rao@presidency.ac.in',
      courses: 'PCC-CS401: Data Structures & Algorithms',
      permission: 'Full Edit & Upload Access',
      status: 'Active'
    },
    {
      id: 'f-2',
      name: 'Dr. R. K. Varma',
      designation: 'Professor / Course In-Charge',
      dept: 'Computer Science & Engineering',
      email: 'rk.varma@presidency.ac.in',
      courses: 'PCC-CS402: Operating Systems',
      permission: 'Full Edit Access',
      status: 'Active'
    },
    {
      id: 'f-3',
      name: 'Dr. Priya Sundaram',
      designation: 'Associate Professor',
      dept: 'Electronics & Communication',
      email: 'priya.s@presidency.ac.in',
      courses: 'PCC-EC401: Signals & Systems',
      permission: 'Review & Comment Only',
      status: 'Active'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('Professor / Course In-Charge');
  const [dept, setDept] = useState('Computer Science & Engineering');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('PCC-CS401: Data Structures & Algorithms');
  const [permission, setPermission] = useState('Full Edit & Upload Access');

  const handleAddFaculty = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please enter Professor Name and Email Address.");
      return;
    }
    const newFaculty = {
      id: `f-${Date.now()}`,
      name,
      designation,
      dept,
      email,
      courses: course,
      permission,
      status: 'Active'
    };
    setFacultyList(prev => [newFaculty, ...prev]);
    setShowAddModal(false);
    setName('');
    setEmail('');
  };

  const handleRemoveFaculty = (id) => {
    if (confirm("Are you sure you want to revoke portal access for this professor?")) {
      setFacultyList(prev => prev.filter(f => f.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-4 text-slate-900 font-sans text-base">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-sm font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
            University Admin • Faculty Access Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Faculty & Team Member Access Management
          </h1>
          <p className="text-base text-slate-700 mt-1 font-medium">
            University Admins can add professors, assign courses, and grant curriculum upload & editing permissions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 bg-blue-700 hover:bg-blue-800 text-white text-base font-bold rounded-xl shadow-md transition flex items-center gap-2"
        >
          <UserPlus className="h-5 w-5" />
          <span>Add Professor / Faculty</span>
        </button>
      </div>

      {/* Faculty Table */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden p-6 space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-200 pb-3 flex items-center justify-between">
          <span>Registered Faculty & Course Coordinators ({facultyList.length})</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-base">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800">
                <th className="p-4 font-bold text-base">Professor Name & Title</th>
                <th className="p-4 font-bold text-base">Department</th>
                <th className="p-4 font-bold text-base">Email Address</th>
                <th className="p-4 font-bold text-base">Assigned Course</th>
                <th className="p-4 font-bold text-base">Access Permission</th>
                <th className="p-4 font-bold text-base text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900">
              {facultyList.map(f => (
                <tr key={f.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 align-top">
                    <div className="font-extrabold text-slate-900 text-base">{f.name}</div>
                    <div className="text-sm text-blue-900 font-bold mt-0.5">{f.designation}</div>
                  </td>

                  <td className="p-4 align-top text-sm font-semibold text-slate-800">
                    {f.dept}
                  </td>

                  <td className="p-4 align-top font-mono text-sm font-bold text-slate-800">
                    {f.email}
                  </td>

                  <td className="p-4 align-top text-sm font-bold text-slate-900">
                    {f.courses}
                  </td>

                  <td className="p-4 align-top">
                    <span className="inline-block text-xs font-bold px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {f.permission}
                    </span>
                  </td>

                  <td className="p-4 align-top text-right space-x-2">
                    <button
                      onClick={() => handleRemoveFaculty(f.id)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg text-xs border border-rose-200 transition"
                    >
                      Revoke Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Professor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-slate-300 overflow-hidden text-slate-900 font-sans">
            <div className="bg-blue-900 text-white p-5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <UserPlus className="h-5 w-5" /> Add Faculty & Grant Portal Access
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-white font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleAddFaculty} className="p-6 space-y-4 text-sm font-semibold bg-slate-50">
              <div>
                <label className="block text-slate-900 font-bold mb-1">Professor / Faculty Name</label>
                <input
                  type="text"
                  placeholder="e.g. Prof. Rajesh Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-700"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-900 font-bold mb-1">Academic Designation</label>
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-700"
                >
                  <option value="Head of Department (HOD)">Head of Department (HOD)</option>
                  <option value="Professor / Course In-Charge">Professor / Course In-Charge</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Assistant Professor">Assistant Professor</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-900 font-bold mb-1">Department</label>
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-700"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Information Science & Engineering">Information Science & Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-900 font-bold mb-1">Official University Email</label>
                <input
                  type="email"
                  placeholder="e.g. rajesh.sharma@presidency.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-700"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-900 font-bold mb-1">Assign Course</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-700"
                >
                  <option value="PCC-CS401: Data Structures & Algorithms">PCC-CS401: Data Structures & Algorithms</option>
                  <option value="PCC-CS402: Operating Systems & Cloud Architecture">PCC-CS402: Operating Systems & Cloud Architecture</option>
                  <option value="PEC-CS601: DevOps & Cloud-Native Engineering">PEC-CS601: DevOps & Cloud-Native Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-900 font-bold mb-1">Access Permission Level</label>
                <select
                  value={permission}
                  onChange={(e) => setPermission(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-700"
                >
                  <option value="Full Edit & Upload Access">Full Edit & Upload Access (Can upload PDF & edit syllabus)</option>
                  <option value="Review & Comment Only">Review & Comment Only (Can view & review comparison table)</option>
                  <option value="View Only">View Only</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-slate-200 text-slate-800 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow"
                >
                  Add & Grant Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
