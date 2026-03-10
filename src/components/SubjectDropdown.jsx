import { ChevronDown, Info, Users, Heart, BookOpen, Gift, HelpCircle } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const SUBJECTS = [
  { value: 'info', label: "Demande d'information", icon: Info },
  { value: 'service', label: 'Demande de service', icon: Users },
  { value: 'mariage', label: 'Mariage', icon: Heart },
  { value: 'cours', label: 'Cours et éducation', icon: BookOpen },
  { value: 'don', label: 'Don et finance', icon: Gift },
  { value: 'autre', label: 'Autre', icon: HelpCircle },
];

export default function SubjectDropdown({ value, onChange, className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = SUBJECTS.find(s => s.value === value);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gold-100 rounded-xl text-dark focus:outline-none focus:border-primary-500 transition-colors shadow-sm"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          {selected ? <selected.icon className="w-4 h-4 text-primary-500" /> : null}
          {selected ? selected.label : <span className="text-dark/30">Choisir un sujet</span>}
        </span>
        <ChevronDown className="w-4 h-4 text-dark/40" />
      </button>
      {open && (
        <ul
          className="absolute z-20 mt-2 w-full bg-white border border-gold-100 rounded-xl shadow-lg max-h-60 overflow-auto animate-fadeIn"
          role="listbox"
        >
          {SUBJECTS.map(subject => (
            <li
              key={subject.value}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-primary-50 transition-colors ${value === subject.value ? 'bg-primary-100/40' : ''}`}
              onClick={() => { onChange(subject.value); setOpen(false); }}
              role="option"
              aria-selected={value === subject.value}
            >
              <subject.icon className="w-4 h-4 text-primary-500" />
              <span>{subject.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
