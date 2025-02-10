import React, { useState } from 'react';
import './PasswordField.css';

const PasswordField = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="password-field">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Digite a senha"
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={togglePassword}
        className="toggle-password"
      >
        {showPassword ? '👁️' : '🔒'}
      </button>
    </div>
  );
};

export default PasswordField;
