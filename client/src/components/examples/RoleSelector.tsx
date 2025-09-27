import { RoleSelector } from '../RoleSelector';
import { useState } from 'react';

export default function RoleSelectorExample() {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'teacher' | 'student' | 'parent'>('student');
  
  const handleSelectRole = (role: 'admin' | 'teacher' | 'student' | 'parent') => {
    setSelectedRole(role);
    console.log('Selected role:', role);
  };
  
  return (
    <div className="p-6">
      <RoleSelector 
        onSelectRole={handleSelectRole}
        selectedRole={selectedRole}
      />
    </div>
  );
}