import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [socialEnabled, setSocialEnabled] = useState(false);
  const [links, setLinks] = useState({ facebook: '', twitter: '', instagram: '', linkedin: '', github: '' });

  const save = () => {
    toast.success('Contact details saved');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <input type="checkbox" id="socialEnabled" checked={socialEnabled} onChange={(e) => setSocialEnabled(e.target.checked)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
          <label htmlFor="socialEnabled" className="ml-2 text-sm text-gray-700">Enable Social Icons</label>
        </div>
        {socialEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.keys(links).map((key) => (
              <div key={key}>
                <label className="block text-xs text-gray-600 mb-1">{key.charAt(0).toUpperCase() + key.slice(1)} URL</label>
                <input type="url" value={links[key]} onChange={(e) => setLinks({ ...links, [key]: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder={`https://${key}.com/...`} />
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button onClick={save} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">Save Contact</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

