import React, { useState } from 'react';
import Modal from '../components/UI/Modal';
import { toast } from 'react-hot-toast';

const Education = () => {
  const [enabled, setEnabled] = useState(false);
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ school: '', degree: '', field: '', from: '', to: '', description: '' });

  const openModal = (item = null) => {
    setEditing(item);
    setForm(item ? { school: item.school || '', degree: item.degree || '', field: item.field || '', from: item.from || '', to: item.to || '', description: item.description || '' } : { school: '', degree: '', field: '', from: '', to: '', description: '' });
    setModalOpen(true);
  };
  const submit = (e) => {
    e.preventDefault();
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...editing, ...form } : i));
      toast.success('Education updated');
    } else {
      setItems(prev => [...prev, { id: Date.now().toString(), ...form }]);
      toast.success('Education added');
    }
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Education</h1>
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
            <span className="text-sm text-gray-700">Enable</span>
          </label>
          <button onClick={() => openModal()} disabled={!enabled} className={`px-3 py-2 rounded-lg ${enabled ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>+ Add</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-lg flex items-start justify-between">
                <div>
                  <div className="font-medium text-gray-900">Degree: {item.degree} {item.field && `in ${item.field}`}</div>
                  <div className="text-sm text-gray-700">School/University: {item.school}</div>
                  <div className="text-xs text-gray-500">Duration: {item.from} - {item.to || 'Present'}</div>
                  {item.description && <div className="text-sm text-gray-600 mt-1">Description: {item.description}</div>}
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => openModal(item)} className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white'">Edit</button>
                  <button onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))} className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white'">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">No education added yet.</div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Education' : 'Add Education'}>
        <form onSubmit={submit} className="space-y-3">
          <input type="text" placeholder="School" value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Degree" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" required />
            <input type="text" placeholder="Field" value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="From (YYYY)" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
            <input type="text" placeholder="To (YYYY or Present)" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">{editing ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Education;

