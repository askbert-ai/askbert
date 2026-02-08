import { TrendingUp } from 'lucide-react';

// Tipe data untuk properti item akordion
interface AccordionItemProps {
	title: string;
	children: React.ReactNode;
	isOpen: boolean;
	onClick: () => void;
	icon: React.ReactNode;
	iconActive: React.ReactNode;
}

// Komponen Item Akordion Individual
const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick }) => {
	return (

		<div onClick={onClick} className='flex flex-row shadow p-4 rounded-md items-center'>
			<div className='bg-[#D2D2D2]/15 p-3.5 rounded-md mr-6'>
				<TrendingUp size={36} color="#91A0B6" />
			</div>
			<p className='text-2xl font-semibold mr-40'>Revenue Impact</p>
			{
				isOpen ?
					<div className='border-[#E8ECF3] rounded-full bg-white h-8 w-8'></div>
					:
					<div className='bg-[#E2D7FE rounded-full h-8 w-8'><TrendingUp size={16} color="#615C8B" /></div>
			}
			<div>
				{children}
			</div>
		</div>
	);
};