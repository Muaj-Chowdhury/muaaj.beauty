'use client';
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FormTagInput = ({ label, placeholder, tags, setTags, color = "primary" }) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().replace(/,/g, '');
      
      // Prevent duplicates
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold uppercase text-xs tracking-widest opacity-60">
          {label}
        </span>
        <span className="label-text-alt text-base-content/40 italic">Press Enter to add</span>
      </label>

      <div className={`flex flex-wrap gap-2 p-3 bg-base-200/50 border border-base-300 rounded-2xl min-h-[56px] transition-all focus-within:border-${color}/50 focus-within:ring-1 focus-within:ring-${color}/20`}>
        <AnimatePresence>
          {tags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`badge badge-${color} gap-2 py-3 px-4 font-medium text-xs rounded-full shadow-sm`}
            >
              {tag}
              <button 
                type="button" 
                onClick={() => removeTag(tag)}
                className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={addTag}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent outline-none text-sm min-w-[120px] placeholder:text-base-content/30"
        />
      </div>
    </div>
  );
};

export default FormTagInput;