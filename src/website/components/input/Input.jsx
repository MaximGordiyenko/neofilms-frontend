import './style.css';

export const Input = ({ placeholder, onChange, value, label, name }) => {
  return (
    <div className="input-box">
      {label && <label className="label">{label}</label>}
      <input
        className="input"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name} // Додаємо атрибут name
      />
    </div>
  );
};
