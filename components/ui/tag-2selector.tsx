// TagSelector.tsx
import React, { useEffect, useState } from 'react';
import TagButton from './tag-button';
import { useContentCopilot } from '@/app/_store/ContentCopilotStore';

// Daftar tag diambil langsung dari teks yang terlihat di gambar
const allTags: string[] = [ // array of strings explicitly typed
	"Longform Readers", "Text-Forward Content Consumers", "Reflective Content Engagers", "Student Culture Network", "Short-Form Trend Participants", "High-Frequency Social Sharers",
	"Lifestyle Product Browsers", "Playful Visual Responders", "Whimsical Aesthetic Engagers", "High-Visual-Density Engagers", "Public Self-Expression Profiles", "Prestige Signal Responders",
	"Emotional Narrative Responders", "Nostalgia-Driven Content Engagers", "Cultural Broker", "Craft & Process Content Responders", "Subculture Event Attendees", "Global Culture Connectors",
	"Creative Industry Connectors", "Low-Frequency High-Intent Buyers"
]

const Tag2Selector: React.FC = () => {
	// Status menyimpan array tag yang dipilih
	// const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const MAX_SELECTIONS = 2;
	const { updateSecondaryAudience, removeSecondaryAudience, secondaryAudience, primaryAudience } = useContentCopilot((state) => state)

	const handleTagClick = (tag: string) => {
		if (secondaryAudience.includes(tag)) {
			// Hapus tag jika sudah dipilih (toggle off)
			removeSecondaryAudience(tag)
			// return prevSelected.filter(t => t !== tag);
		} else {
			// Tambahkan tag HANYA jika batas maksimum belum tercapai
			if (secondaryAudience.length < MAX_SELECTIONS) {
				updateSecondaryAudience(tag)
				// return [...prevSelected, tag];
			} else {
				// Opsional: berikan umpan balik kepada pengguna bahwa batas telah tercapai
				console.log(`Batas maksimum ${MAX_SELECTIONS} tag tercapai.`);
				return;
			}
		}
	};

	return (
		<div className="md:px-52">
			<p className=" text-[#475569]">Secondary</p>
			<p className="text-xs mb-2 font-normal text-[#91A0B6] italic">Please select up to 2 secondary audience segments</p>

			<div className="flex flex-wrap gap-3">
				{allTags.map(tag => (
					<TagButton
					disabled={primaryAudience == tag}
						key={tag}
						tag={tag}
						variant='secondary'
						isSelected={secondaryAudience.includes(tag)}
						onClick={handleTagClick}
					/>
				))}
			</div>
		</div>
	);
};

export default Tag2Selector;
