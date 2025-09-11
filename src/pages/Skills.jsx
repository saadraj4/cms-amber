import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const Skills = () => {
  const [skillsInput, setSkillsInput] = useState('');
  const [skills, setSkills] = useState([]);

  const save = () => {
    const list = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    setSkills(list);
    toast.success('Skills saved');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Skills</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center space-x-3">
          <input type="text" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} placeholder="Comma separated (e.g., React, Node.js)" className="flex-1 border border-gray-300 rounded-lg px-3 py-2" />
          <button onClick={save} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">Save</button>
        </div>
        {skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{s}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;

