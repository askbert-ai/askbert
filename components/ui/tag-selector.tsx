// TagSelector.tsx
import { useContentCopilot } from '@/app/_store/ContentCopilotStore';
import React from 'react';
import TagButton from './tag-button';

// Daftar tag diambil langsung dari teks yang terlihat di gambar
const allTags: string[] = [ // array of strings explicitly typed
	"Longform Readers", "Text-Forward Content Consumers", "Reflective Content Engagers", "Student Culture Network", "Short-Form Trend Participants", "High-Frequency Social Sharers",
	"Lifestyle Product Browsers", "Playful Visual Responders", "Whimsical Aesthetic Engagers", "High-Visual-Density Engagers", "Public Self-Expression Profiles", "Prestige Signal Responders",
	"Emotional Narrative Responders", "Nostalgia-Driven Content Engagers", "Cultural Broker", "Craft & Process Content Responders", "Subculture Event Attendees", "Global Culture Connectors",
	"Creative Industry Connectors", "Low-Frequency High-Intent Buyers"
]

const TagSelector: React.FC = () => {
	// Status sekarang hanya menampung SATU string (atau null jika belum ada yang dipilih)
	// const [selectedTag, setSelectedTag] = useState<string | null>(null);
const { updatePrimaryAudience, primaryAudience, secondaryAudience} = useContentCopilot((state) => state)
	
	const handleTagClick = (tag: string) => {
		// Jika tag yang diklik sudah dipilih, batalkan pilihan (set ke null)
		if (primaryAudience === tag) {
			// setSelectedTag(null);
			updatePrimaryAudience('')
		} else {
			// Jika tag lain yang diklik, atur sebagai satu-satunya yang dipilih
			// setSelectedTag(tag);
			updatePrimaryAudience(tag)
			
		}
	};

	return (
		<div className="px-52 mb-4">
			<p className="text-[#475569]">Primary</p>
			<p className="text-xs mb-2 font-normal text-[#91A0B6] italic">Please select 1 primary audience segment</p>
			<div className="flex flex-wrap gap-3">
				{allTags.map(tag => (
					<TagButton
					disabled={secondaryAudience.includes(tag)}
						key={tag}
						tag={tag}
						variant='primary'
						// Periksa apakah tag saat ini sama persis dengan yang ada di state tunggal
						isSelected={primaryAudience === tag}
						onClick={handleTagClick}
					/>
				))}
			</div>
		</div>
	);
};


export default TagSelector;
