import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock, MessageSquare, ArrowRight, ShieldCheck, User } from 'lucide-react';

export default function ApprovalWorkflowView({ approvalRequests, setApprovalRequests, currentRole }) {
  const [selectedReqId, setSelectedReqId] = useState(approvalRequests[0]?.id || '');
  const activeReq = approvalRequests.find(r => r.id === selectedReqId) || approvalRequests[0];
  const [newComment, setNewComment] = useState('');

  const handleApprove = () => {
    const updated = approvalRequests.map(req => {
      if (req.id === selectedReqId) {
        return {
          ...req,
          status: 'Approved',
          currentStage: 'Published',
          comments: [
            ...req.comments,
            { author: `User (${currentRole.toUpperCase()})`, role: currentRole, text: 'Approved for nationwide AICTE publication.', date: new Date().toLocaleString() }
          ]
        };
      }
      return req;
    });
    setApprovalRequests(updated);
  };

  const handleReject = () => {
    const updated = approvalRequests.map(req => {
      if (req.id === selectedReqId) {
        return {
          ...req,
          status: 'Changes Requested',
          comments: [
            ...req.comments,
            { author: `User (${currentRole.toUpperCase()})`, role: currentRole, text: 'Changes requested: Please clarify credit distribution.', date: new Date().toLocaleString() }
          ]
        };
      }
      return req;
    });
    setApprovalRequests(updated);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const updated = approvalRequests.map(req => {
      if (req.id === selectedReqId) {
        return {
          ...req,
          comments: [
            ...req.comments,
            { author: `User (${currentRole.toUpperCase()})`, role: currentRole, text: newComment, date: new Date().toLocaleString() }
          ]
        };
      }
      return req;
    });
    setApprovalRequests(updated);
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-blue-600" />
          Multi-Stage Syllabus Approval Workflow & Audit Trail
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Role-based state machine transition engine: <span className="font-semibold text-slate-700">Draft $\rightarrow$ Peer Review $\rightarrow$ BoS Committee Review $\rightarrow$ Published</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
            Approval Requests ({approvalRequests.length})
          </h3>

          <div className="space-y-2">
            {approvalRequests.map(req => (
              <div
                key={req.id}
                onClick={() => setSelectedReqId(req.id)}
                className={`p-3.5 rounded-lg border cursor-pointer transition ${
                  req.id === selectedReqId
                    ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-900">{req.subjectCode}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    req.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : req.status === 'Under Review'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {req.status}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{req.subjectTitle}</h4>
                <p className="text-[11px] text-slate-500 mt-1">{req.department}</p>
              </div>
            ))}
          </div>
        </div>

        {activeReq && (
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {activeReq.subjectCode}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{activeReq.subjectTitle}</h3>
                  <p className="text-xs text-slate-500">{activeReq.department} • Submitted by {activeReq.submittedBy} on {activeReq.submittedDate}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleReject}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold rounded-md transition flex items-center gap-1"
                  >
                    <XCircle className="h-4 w-4" /> Request Changes
                  </button>
                  <button
                    onClick={handleApprove}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-md shadow transition flex items-center gap-1"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Approve & Publish
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 mb-3">Workflow State Machine Stage:</h4>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Drafted
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Peer Review
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                  <div className={`flex items-center gap-1.5 font-bold ${
                    activeReq.status === 'Approved' ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    <Clock className="h-4 w-4 text-amber-500" /> BoS Committee Approval
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                  <div className={`flex items-center gap-1.5 font-bold ${
                    activeReq.status === 'Approved' ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    <ShieldCheck className="h-4 w-4" /> Published
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                Audit Trail & Review Committee Comments
              </h4>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {activeReq.comments.map((comment, cIdx) => (
                  <div key={cIdx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-800">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-blue-600" /> {comment.author} ({comment.role})
                      </span>
                      <span className="text-[10px] text-slate-400">{comment.date}</span>
                    </div>
                    <p className="text-xs text-slate-700">{comment.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="flex gap-2 pt-2 border-t border-slate-100">
                <input
                  type="text"
                  placeholder="Add review comment or audit feedback..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}