import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const Experience = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ role: '', company: '', from: '', to: '', description: '' });

  const submit = (e) => {
    e.preventDefault();
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...editing, ...form } : i));
      setEditing(null);
      toast.success('Experience updated');
    } else {
      setItems(prev => [...prev, { id: Date.now().toString(), ...form }]);
      toast.success('Experience added');
    }
    setForm({ role: '', company: '', from: '', to: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Experience</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input type="text" placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2 md:col-span-1" required />
          <input type="text" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2 md:col-span-1" required />
          <input type="text" placeholder="From (YYYY)" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
          <input type="text" placeholder="To (YYYY or Present)" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
          <input type="text" placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2 md:col-span-2" />
          <div className="md:col-span-1 flex items-center justify-end">
            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">{editing ? 'Update' : 'Add'}</button>
          </div>
        </form>
        <div className="mt-4 space-y-3">
          {items.map(item => (
            <div key={item.id} className="p-4 bg-gray-50 rounded-lg flex items-start justify-between">
              <div>
                <div className="font-medium text-gray-900">Role: {item.role} at {item.company}</div>
                <div className="font-medium text-gray-900">Company: {item.company}</div>

                <div className="text-xs text-gray-500">Duration: {item.from} - {item.to || 'Present'}</div>
                {item.description && <div className="text-sm text-gray-600 mt-1">Description: {item.description}</div>}
              </div>
              <div className="flex space-x-3">
                <button onClick={() => { setEditing(item); setForm({ role: item.role, company: item.company, from: item.from || '', to: item.to || '', description: item.description || '' }); }} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">Edit</button>
                <button onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;

