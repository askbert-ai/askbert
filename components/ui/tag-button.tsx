// TagButton.tsx
import React from 'react';

interface TagButtonProps {
  tag: string;
  isSelected: boolean;
  onClick: (tag: string) => void;
  variant : string;
  disabled: boolean
}

const TagButton: React.FC<TagButtonProps> = ({ tag, isSelected, onClick, variant, disabled }) => {
  // Gunakan gaya untuk mencocokkan tampilan di gambar: 
  // Putih polos saat tidak dipilih, ungu terang saat dipilih.
  const baseClasses = "px-6 py-3 rounded-full border cursor-pointer transition-colors duration-200 font-light text-base";
  
  const selectedClasses = `${variant == 'primary' ? 'bg-[#F1EBFF] text-[#615C8B] border-[#CEC4EC]' : 'bg-[#EFFFDC] text-[#729842] border-[#C1FF72]'} `;
  const defaultClasses = "bg-white text-[#91A0B6] border-[#E8ECF3] hover:bg-gray-50";
  const disabledClasses = "bg-[#EDF2F6] text-[#91A0B6] border-[#E8ECF3]";

  return (
    <button 
	disabled={disabled}
      onClick={() => onClick(tag)} 
      className={`${baseClasses} ${disabled ? disabledClasses : isSelected ? selectedClasses : defaultClasses}`}
    >
      {tag}
    </button>
  );
};

export default TagButton;
