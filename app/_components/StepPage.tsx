'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import UploadComponent from '@/components/ui/file-upload'
import { Spinner } from '@/components/ui/spinner'
import Tag2Selector from '@/components/ui/tag-2selector'
import TagSelector from '@/components/ui/tag-selector'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Check, CircleStar, ClipboardList, Lightbulb, MessageCircleQuestionMark, TrendingUp, UserRoundPlus, UserRoundSearch } from 'lucide-react'
import { useContentCopilot } from '../_store/ContentCopilotStore'

export default function StepPage() {

	const { file, primaryObjective, updatePrimaryObjective, secondaryAudience, currentStep, updateCurrentStep, updateHideButton, updateDisabledNext } = useContentCopilot((state) => state)

	const handleClickCard = () => {
		updateCurrentStep(currentStep + 1)
		updateHideButton(false)
		updateDisabledNext(true)
		console.log({ secondaryAudience })
	}
	if (currentStep == 1) {
		return (
			<>
				<div className="flex flex-col gap-2 mb-16 items-center mt-[40] text-[#475569]">
					<span className="text-xl font-normal">Step 2 :</span>
					<span className="text-4xl font-bold text-black">Who is this for?</span>
					<span>Find your people.</span>
				</div>
				<div className='flex gap-[94]'>
					<Tooltip>
						<TooltipTrigger>
							<Card size="sm" className="w-fit max-w-[254] bg-gray-50 py-6 px-5 h-fit">
								<CardContent className='flex flex-col items-center '>
									<div className='bg-primary/10 p-[32] rounded-[24] mb-6'>
										<UserRoundPlus size={64} color="#C8BFE1" strokeWidth={1} />
									</div>
									<p className='text-wrap text-xl font-semibold text-center mb-2'>
										Create New Audience
									</p>
									<p className='text-wrap font-normal text-xs text-center text-[#91A0B6]'>
										Build a custom audience based on your targeting criteria.
									</p>
								</CardContent>
							</Card>
						</TooltipTrigger>
						<TooltipContent>
							<p>Only Use A Suggested Audience type for this demo</p>
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger>
							<Card size="sm" className="w-fit max-w-[254] bg-gray-50 py-6 px-2 h-fit">
								<CardContent className='flex flex-col items-center '>
									<div className='bg-primary/10 p-[32] rounded-[24] mb-6'>
										<ClipboardList size={64} color="#C8BFE1" strokeWidth={1} />
									</div>
									<p className='text-wrap text-xl font-semibold text-center mb-2'>
										Choose a Saved Audience
									</p>
									<p className='text-wrap font-normal text-xs text-center text-[#91A0B6]'>
										Reuse an audience you’ve created before.
									</p>
								</CardContent>
							</Card>
						</TooltipTrigger>
						<TooltipContent>
							<p>Only Use A Suggested Audience type for this demo</p>
						</TooltipContent>
					</Tooltip>
					<Card onClick={handleClickCard} size="sm" className="w-fit max-w-[254] hover:bg-primary/50 py-6 px-0 h-fit group">
						<CardContent className='flex flex-col items-center '>
							<div className='bg-primary/10 p-[32] rounded-[24] mb-6 group-hover:bg-[#A894E2]'>
								<Lightbulb size={64} color="#E2D7FE" strokeWidth={1} />
							</div>
							<p className='text-wrap text-xl font-semibold text-center mb-2'>
								Choose a Suggested Audience Type
							</p>
							<p className='text-wrap font-normal text-xs text-center text-[#91A0B6]'>
								Use recommended audience types for common ad goals.
							</p>
						</CardContent>
					</Card>
				</div>
			</>
		)
	}

	if (currentStep == 2) {
		return (
			<>
				<div className="flex flex-col gap-2 mb-16 items-center mt-[40] text-[#475569]">
					<span className="text-xl font-normal">Step 2 :</span>
					<span className="text-4xl font-bold text-black">Who is this for?</span>
					<span>Choose a suggested audience type</span>
				</div>
				<div className="flex flex-col justify-self-start ml-[269] mb-4 mt-[64]">
					<p className="text-xl font-normal text-black">Suggested Audience Type</p>
					<p className="text-xs font-normal text-[#91A0B6] italic">Please select 1 primary and 2 secondary keywords</p>
				</div>
				<TagSelector />
				<Tag2Selector />
			</>
		)
	}
	if (currentStep == 3) {
		return (
			<>
				<div className="flex flex-col gap-2 mb-16 items-center mt-[40] text-[#475569]">
					<span className="text-xl font-normal">Step 3 :</span>
					<span className="text-4xl font-bold text-black">Where is your ad running?</span>
					<span>Check all that applies.</span>
				</div>

				<div className="flex gap-24 min-w-[664]">

					<div key='Platforms' className="flex-1 min-w-0">
						<p className='font-semibold mb-6'>Platforms</p>
						<div className="space-y-3">
							<label key='Facebook' className="flex justify-between items-center cursor-pointer select-none">
								<p className='text-xs text-[#475569]'>Facebook</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
						</div>
						<p className='font-semibold mb-6 mt-9'>Placements</p>
						<div className="space-y-3">
							<label key='Feeds' className="flex justify-between items-center cursor-pointer select-none  mb-6">
								<p className='font-semibold'>Feeds</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Facebook Feed' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Facebook Feed</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Facebook profile Feed' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Facebook profile Feed</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Instagram Feed' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Instagram Feed</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Instagram profile Feed' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Instagram profile Feed</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Facebook Marketplace' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Facebook Marketplace</p>
								<Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Instagram Explore' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Instagram Explore</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Instagram Explore Home' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Instagram Explore Home</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Facebook Business Explore' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Facebook Business Explore</p>
								<Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Threads feed' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Threads feed</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Facebook Notifications' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Facebook Notifications</p>
								<Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
						</div>
					</div>

					<div key='Platform' className="flex-1 min-w-0">
						<p className='font-semibold mb-6'>&nbsp;</p>
						<div className="space-y-3">
							<label key='Instagram' className="flex justify-between items-center cursor-pointer select-none">
								<p className='text-xs text-[#475569]'>Instagram</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
						</div>
						<p className='font-semibold mb-6 mt-9'>&nbsp;</p>
						<div className="space-y-3">
							<label key='Stories' className="flex justify-between items-center cursor-pointer select-none  mb-6">
								<p className='font-semibold'>Stories, Status, Reels</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Instagram Stories' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Instagram Stories</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Facebook Stories' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Facebook Stories</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Messenger Stories' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Messenger Stories</p>
								<Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Instagram Reels' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Instagram Reels</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Instagram profile reels' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Instagram profile reels</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
							<label key='Facebook Reels' className="flex justify-between items-center cursor-pointer select-none mb-3">
								<p className='text-xs text-[#475569]'>Facebook Reels</p>
								<Checkbox checked id="terms-checkbox-basic" name="terms-checkbox-basic" className='w-6 h-6' />
							</label>
						</div>
					</div>
				</div>
			</>
		)
	}



	const handleItemClick = (item: string) => {
		updatePrimaryObjective(item)
		if (primaryObjective == '') {
			updateDisabledNext(false)
		}
	}

	if (currentStep == 4) {
		return (
			<>
				<div className="flex flex-col gap-2 mb-16 items-center mt-[40] text-[#475569]">
					<span className="text-xl font-normal">Step 4 :</span>
					<span className="text-4xl font-bold text-black">Choose your primary objective:</span>
					<span>Each objective optimizes for different outcomes. Choose the one that best reflects your intent for this asset.</span>
				</div>
				<div className='flex flex-col gap-9'>
					<AccordionItem
						title='Revenue Impact'
						icon={<TrendingUp size={36} color="#91A0B6" strokeWidth={1.5} />}
						iconActive={<TrendingUp size={36} color="#FFFFFF" strokeWidth={1.5} />}
						isOpen={primaryObjective === 'Revenue Impact'}
						onClick={() => handleItemClick('Revenue Impact')}>
						<div className='bg-[#E2D7FE]/10 p-4 text-xs'>
							<p className='text-[#615C8B] mb-4 '>FOCUS</p>
							<p>How effectively the asset converts attention into action (sales, signups, etc.) </p>
							<p className='text-[#615C8B] mt-6 mb-4'>KEY SUBMETRICS</p>
							<div className='flex flex-row justify-between gap-2'>
								<div className='flex flex-col w-full gap-2'>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Audience Trust Index</p>
									</div>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Friction Index</p>
									</div>
								</div>
								<div className='flex flex-col w-full gap-2'>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Value Clarity</p>
									</div>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Effort Heuristic</p>
									</div>
								</div>
							</div>
						</div>
					</AccordionItem>
					<AccordionItem
						title='Lower Hesitation'
						icon={<MessageCircleQuestionMark size={36} color="#91A0B6" strokeWidth={1.5} />}
						iconActive={<MessageCircleQuestionMark size={36} color="#FFFFFF" strokeWidth={1.5} />}
						isOpen={primaryObjective === 'Lower Hesitation'}
						onClick={() => handleItemClick('Lower Hesitation')}>
						<div className='bg-[#E2D7FE]/10 p-4 text-xs'>
							<p className='text-[#615C8B] mb-4 '>FOCUS</p>
							<p>What makes the viewer hesitate from taking an action.</p>
							<p className='text-[#615C8B] mt-6 mb-4'>KEY SUBMETRICS</p>
							<div className='flex flex-row justify-between gap-2'>
								<div className='flex flex-col w-full gap-2'>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Abstraction Overload</p>
									</div>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Identity Resolution</p>
									</div>
								</div>
								<div className='flex flex-col w-full gap-2'>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Narrative Fatigue</p>
									</div>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Weak Signaling</p>
									</div>
								</div>
							</div>
						</div>
					</AccordionItem>
					<AccordionItem
						title='Brand Equity'
						icon={<CircleStar size={36} color="#91A0B6" strokeWidth={1.5} />}
						iconActive={<CircleStar size={36} color="#FFFFFF" strokeWidth={1.5} />}
						isOpen={primaryObjective === 'Brand Equity'}
						onClick={() => handleItemClick('Brand Equity')}>
						<div className='bg-[#E2D7FE]/10 p-4 text-xs'>
							<p className='text-[#615C8B] mb-4 '>FOCUS</p>
							<p>How well the content reinforces long-term brand value and perception.</p>
							<p className='text-[#615C8B] mt-6 mb-4'>KEY SUBMETRICS</p>
							<div className='flex flex-row justify-between gap-2'>
								<div className='flex flex-col w-full gap-2'>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Brand Alignment Score</p>
									</div>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Identity Collapse Index</p>
									</div>
								</div>
								<div className='flex flex-col w-full gap-2'>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Voice Drift</p>
									</div>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Cognitive Reach vs. Creative Risk</p>
									</div>
								</div>
							</div>
						</div>
					</AccordionItem>
					<AccordionItem
						title='New Audience Activation'
						icon={<UserRoundSearch size={36} color="#91A0B6" strokeWidth={1.5} />}
						iconActive={<UserRoundSearch size={36} color="#FFFFFF" strokeWidth={1.5} />}
						isOpen={primaryObjective === 'New Audience Activation'}
						onClick={() => handleItemClick('New Audience Activation')}>
						<div className='bg-[#E2D7FE]/10 p-4 text-xs'>
							<p className='text-[#615C8B] mb-4 '>FOCUS</p>
							<p>How well the asset invites or resonates with new potential audience.</p>
							<p className='text-[#615C8B] mt-6 mb-4'>KEY SUBMETRICS</p>
							<div className='flex flex-row justify-between gap-2'>
								<div className='flex flex-col w-full gap-2'>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Audience Ambiguity Tolerance</p>
									</div>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Context Collapse Risk</p>
									</div>
								</div>
								<div className='flex flex-col w-full gap-2'>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Aesthetic Load</p>
									</div>
									<div className='flex flex-row items-center bg-white border-[#E2D7FE]/50 border rounded-md px-3 py-2.5'>
										<div className='h-1.5 w-1.5 rounded-full bg-[#615C8B] mr-2'></div>
										<p className='text-xs'>Audience Polarization</p>
									</div>
								</div>
							</div>
						</div>
					</AccordionItem>
				</div>
			</>
		)
	}

	if (currentStep == 5) {
		if (file) {
			const isImage = file.type.startsWith('image/');
			return (
				<>
					<div className="flex flex-col gap-2 mb-16 items-center mt-[40] text-[#475569]">
						<span className="text-xl font-normal">PROCESSING</span>
						<span className="text-4xl font-bold text-black">Analyzing your asset</span>
						<span>This may take a while. Please wait..</span>
					</div>
					<div className="relative w-fit">
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
						<Spinner className="size-20" />
						</div>
						{isImage ? (
							<img
								src={URL.createObjectURL(file)}
								alt="Preview"
								className="max-h-[556] w-full object-contain rounded-lg opacity-10"
								onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))} // Free memory
							/>
						) : (
							<div className="max-h-[556] flex items-center justify-center bg-gray-100 rounded-lg">
								<video controls className="w-full max-h-[556] object-contain opacity-10">
									<source src={URL.createObjectURL(file)} type={file.type} />
									Browser Anda tidak mendukung tag video.
								</video>
							</div>
						)}
					</div>

				</>
			)

		}
	}

	if (currentStep == 6) {
		if (file) {
			const isImage = file.type.startsWith('image/');
			return (
				<>
					<div className="flex flex-col gap-2 mb-16 items-center mt-[40] text-[#475569]">
						<span className="text-xl font-normal">BERHASIL</span>
						<span className="text-4xl font-bold text-black">Analyzing your asset</span>
						<span>This may take a while. Please wait..</span>
					</div>
					<div className="relative w-fit">
						{isImage ? (
							<img
								src={URL.createObjectURL(file)}
								alt="Preview"
								className="max-h-[556] w-full object-contain rounded-lg"
								onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))} // Free memory
							/>
						) : (
							<div className="max-h-[556] flex items-center justify-center bg-gray-100 rounded-lg">
								{/* <VideoIcon className="w-12 h-12 text-gray-400" />
                <span className="ml-2 text-gray-600">Video Preview Not Available</span> */}
								<video controls className="w-full h-full object-contain">
									<source src={URL.createObjectURL(file)} type={file.type} />
									Browser Anda tidak mendukung tag video.
								</video>
							</div>
						)}
					</div>
				</>
			)

		}
	}

	return (
		<>
			<div className="flex flex-col gap-2 mb-16 items-center mt-[40] text-[#475569]">
				<span className="text-xl font-normal">Step 1 :</span>
				<span className="text-4xl font-bold text-black">Upload a Creative Asset</span>
				<span>Vet your content before you spend a single dollar.</span>
			</div>
			<UploadComponent />
		</>
	)

}

interface AccordionItemProps {
	title: string;
	children: React.ReactNode;
	isOpen: boolean;
	onClick: () => void;
	icon: React.ReactNode;
	iconActive: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick, icon, iconActive }) => {
	return (
		<div onClick={onClick} className={`flex flex-col shadow rounded-md border ${isOpen ? 'border-[#E2D7FE]' : 'border-[#EFF4F8]'}`}>
			<div className='flex flex-row items-center p-4 justify-between'>
				<div className='flex flex-row items-center mr-14'>
					<div className={`${isOpen ? 'bg-[#E2D7FE]' : 'bg-[#D2D2D2]/15'} p-3.5 rounded-md mr-6`}>
						{/* <TrendingUp size={36} color="#91A0B6" /> */}
						{
							isOpen ? iconActive : icon
						}
					</div>
					<p className='text-2xl font-semibold'>{title}</p>
				</div>
				{
					isOpen ?
						<div className='flex bg-[#E2D7FE] border rounded-full h-8 w-8 justify-center justify-items-center items-center'><Check size={16} color="#615C8B" strokeWidth={3} /></div>
						:
						<div className='border-[#E8ECF3] border rounded-full bg-white h-8 w-8'></div>
				}

			</div>
			<div className={`${isOpen ? 'max-h-screen opacity-100 pt-0' : 'max-h-0 opacity-0 overflow-hidden'}`}>
				<div className="pt-0">
					{children}
				</div>
			</div>
		</div>
	);
};