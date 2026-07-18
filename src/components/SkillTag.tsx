import React from 'react';

interface SkillTagProps {
  skillName: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skillName }) => {
  return (
    <span
      className="bg-transparent text-gray-300 py-1 px-4 rounded-full md:text-sm text-xs font-medium border border-gray-600 hover:scale-105 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 ease-in-out inline-block"
    >
      {skillName}
    </span>
  );
};

export default SkillTag;