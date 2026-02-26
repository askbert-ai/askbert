'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useIsMobile } from '@/hooks/use-mobile'
import { createClient } from '@/utils/supabase/client'
import { BotMessageSquare, ChevronDown, ChevronRight, CloudUpload, Gem, House, SendHorizontal, UsersRound, X } from 'lucide-react'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useContentAnalysis } from '../_store/ContentAnalysisStore'

type ContentAnalysis = {
	id: string
	primary_audience: string
	secondary_audience: []
	objective_optimizes: string
	asset: string
	email: string
}
type ContentAnalysisProps = {
	data: ContentAnalysis
}
const ContentAnalysis = ({ data }: ContentAnalysisProps) => {
	const [subscribe, setSubscribe] = useState(false)
	const [hideChat, setHideChat] = useState(false)
	const [subscribeChat, setSubscribeChat] = useState(false)
	const url = data.asset;
	const { formData, updateData } = useContentAnalysis()
	const isImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url?.toLowerCase());
	const isVideo = /\.(mp4|webm|ogg|mov)$/.test(url?.toLowerCase());
	const isMobile = useIsMobile()
	
	const onSubscribe = () => {
		if (subscribe) {
			setSubscribe(false)
		} else {
			setSubscribe(true)
		}
	}

	const onHideChat = () => {
		if (hideChat) {
			setHideChat(false)
		} else {
			setHideChat(true)
		}
	}

	const onSubscribeChat = () => {
		if (subscribeChat) {
			setSubscribeChat(false)
		} else {
			setSubscribeChat(true)
		}
	}
	
	useEffect(() => {
		return isMobile ? setHideChat(true) : setHideChat(hideChat)
	}, [isMobile])

	useEffect(() => {
		updateData({
			campaignId: data.id,
			asset: data.asset,
			primaryAudience: data.primary_audience,
			secondaryAudience: data.secondary_audience,
			primaryObjective: data.objective_optimizes,
		})
	}, [])

	return (
		<div className="flex flex-col md:flex-row justify-between h-full bg-[#FDFDFE]">
			<div className="flex lg:flex-col flex-row p-3 md:p-6 gap-2 md:gap-12 md:mb-9">
				<div className="max-w-1/3 md:max-w-full flex-1 order-1 lg:order-2 flex items-center justify-center">
					{
						data.asset && isImage ? (
							<Image
								src={data.asset}
								alt="Preview"
								className="max-h-36 md:max-h-[556] w-full object-contain rounded-lg"
								width={500}
								height={500}
							/>
						)
							: data.asset && isVideo ? (
								<div className="max-h-36 md:max-h-[556] flex items-center justify-center bg-gray-100 rounded-lg">
									<video controls className="w-full max-h-36 md:max-h-[556] object-contain">
										<source src={data.asset} />
										Browser Anda tidak mendukung tag video.
									</video>
								</div>
							) : ''
					}
				</div>

				<div className="flex flex-1 flex-col order-2 lg:contents max-w-fit">
					<Dialog>
						{

							<DialogTrigger asChild>
								<div className="flex-row md:gap-12 md:mb-9 flex-1 order-1 lg:order-1 flex  ">
									<div>
										<p className='text-xs md:text-base font-semibold'>Platform :</p>
										<p className='text-[#475569] text-xs md:text-base'>Facebook &middot; Instagram</p>
									</div>
									<div>
										<p className='font-semibold text-xs md:text-base'>Placement :</p>
										<p className='text-[#475569] text-xs md:text-base'>Feeds &middot; Story, Status, Reels</p>
									</div>
									<div className='self-center' >
										<ChevronRight color='#615C8B' size={24} />
									</div>
								</div>
							</DialogTrigger>

						}

						<DialogContent className='rounded-xl p-0 ring-0 min-w-full md:max-w-1/2 md:min-w-1/2 min-h-150 md:max-h-full text-base bottom-0 md:bottom-auto left-0 md:left-1/2 top-auto md:top-1/2 translate-x-0 translate-y-0 md:-translate-x-1/2 md:-translate-y-1/2'>
							<DialogTitle className=''>
								<p className='mt-6 ml-9 text-2xl'>Platform & Placement</p>
								<ScrollArea className='flex flex-col px-9 pb-0 md:pb-9 max-h-130 md:max-h-full'>
									<p className='font-semibold mb-4 mt-4'>Platforms</p>
									<div className='flex flex-col md:flex-row gap-x-12'>
										<div className='flex flex-1'>
											<p className='text-sm text-[#475569]'>&bull; Facebook</p>
										</div>
										<div className='flex flex-1'>
											<p className='text-sm text-[#475569]'>&bull; Instagram</p>
										</div>
									</div>
									<p className='font-semibold mb-6 mt-6'>Placements</p>
									<div className='flex flex-col md:flex-row gap-x-12'>
										<div className='flex flex-1 flex-col gap-y-2'>
											<p className='font-semibold mb-2 md:mb-2'>Feeds</p>
											<p className='text-sm text-[#475569] flex-row'>&bull; Facebook Feed</p>
											<p className='text-sm text-[#475569]'>&bull; Facebook profile Feed</p>
											<p className='text-sm text-[#475569]'>&bull; Instagram Feed</p>
											<p className='text-sm text-[#475569]'>&bull; Instagram profile Feed</p>
											<p className='text-sm text-[#475569]'>&bull; Facebook Marketplace</p>
											<p className='text-sm text-[#475569]'>&bull; Instagram Explore</p>
											<p className='text-sm text-[#475569]'>&bull; Instagram Explore Home</p>
											<p className='text-sm text-[#475569]'>&bull; Facebook Business Explore</p>
											<p className='text-sm text-[#475569]'>&bull; Threads feed</p>
											<p className='text-sm text-[#475569]'>&bull; Facebook Notifications</p>
										</div>
										<div className='flex flex-1 flex-col gap-y-2'>
											<p className='font-semibold mt-6 mb-2 md:mt-0 md:mb-2'>Stories, Status, Reels</p>
											<p className='text-sm text-[#475569]'>&bull; Instagram Stories</p>
											<p className='text-sm text-[#475569]'>&bull; Facebook Stories</p>
											<p className='text-sm text-[#475569]'>&bull; Messenger Stories</p>
											<p className='text-sm text-[#475569]'>&bull; Instagram Reels</p>
											<p className='text-sm text-[#475569]'>&bull; Instagram profile reels</p>
											<p className='text-sm text-[#475569]'>&bull; Facebook Reels</p>
										</div>
									</div>
								</ScrollArea>
							</DialogTitle>
						</DialogContent>
					</Dialog>

					<div className="flex-1 order-2 lg:order-3 flex items-center justify-center">
						<Button onClick={() => redirect('/content-copilot')} className='h-fit w-full md:w-1/2 order-3 bg-[#C1FF72] text-black py-3 hover:bg-[#C1FF72] mt-6'><CloudUpload size={24} /> New Upload</Button>
					</div>
				</div>
			</div>


			{/* <div className='fixed bg-white right-0 bottom-0 top-16 w-80 border-l'> */}
			<div className='flex md:max-h-[calc(100vh-var(--spacing)*16)] bottom-0 top-16 bg-white  md:w-80 md:border-l'>
				{/* h-full */}
				<ScrollArea className="h-full">
					<div className='flex flex-col px-3 pt-3'>
						<div className='flex flex-row justify-between mb-4'>
							<div className='flex flex-col'>
								<p className='text-xs text-[#91A0B6]'>PRIMARY GOAL</p>
								<p className='text-lg font-semibold'>Hesitation Index</p>
							</div>
							<div className='flex flex-col'>
								<p className='text-lg font-black italic text-[#C1FF72]'>LOW</p>
								<p className='text-[10px] text-[#91A0B6]'>37.5/100 SCORE</p>
							</div>
						</div>
						<div className='flex p-3 flex-row bg-[#F9FAFC] rounded-lg mb-12'>
							<div className='mr-4 min-w-9'>
								<Image
									src="/images/avatar-01.png"
									alt="Askbert.ai"
									width={36}
									height={36}
								/>
							</div>
							<div className='max-w-54'>
								<p className='font-semibold'>Culture Brokers</p>
								<p className='text-xs truncate '>29-55 yrs &bull; Playful Visual Responders &bull; Prestige Signal Responders</p>
							</div>
						</div>
						<p className='text-xs text-[#91A0B6] mb-9'>COGNITIVE METRICS</p>
						<div className='mb-9'>
							<Image
								src="/images/temperature.png"
								alt="Askbert.ai"
								width={400}
								height={400}
							/>
						</div>
						<div className='flex flex-row justify-between mb-4'>
							<p className='text-xs font-semibold'>Identity Resolution</p>
							<p className='text-xs font-bold text-[#615C8B]'>70% Score</p>
						</div>
						<div className='mb-4'>
							<Image
								src="/images/graph.png"
								alt="Askbert.ai"
								width={400}
								height={400}
							/>
						</div>
						<div className='flex flex-row justify-between gap-4 mb-9'>
							<div className='flex flex-row items-center'>
								<div className='h-2 w-2 rounded-full bg-[#E2D7FE] mr-2' />
								<p className='text-[10px] text-[#91A0B6]'>Actual</p>
							</div>
							<div className='flex flex-row items-center'>
								<Gem size={12} color='#D1FF72' />
								<p className='text-[10px] text-[#91A0B6] text-right ml-2'>Target</p>
							</div>
						</div>
						<p className='text-xs font-semibold mb-6'>Signal Strength</p>
						<div className='flex flex-row justify-between gap-4 mb-2'>
							<div className='h-3 w-full bg-[#E2E8F0] rounded-full'></div>
							<div className='h-3 w-full bg-[#FFBD59] rounded-full'></div>
							<div className='h-3 w-full bg-[#E2E8F0] rounded-full'></div>

						</div>
						<div className='flex flex-row justify-between gap-4 mb-9'>
							<p className='w-full text-[10px] text-[#91A0B6]'>WEAK</p>
							<p className='w-full text-[10px] text-[#FFBD59] text-center'>NEUTRAL</p>
							<p className='w-full text-[10px] text-[#91A0B6] text-right'>CHARGED</p>
						</div>
						<p className='text-xs font-semibold mb-4'>Secondary Audience Matches</p>
						<div className='flex flex-col mb-6'>
							<div className='flex flex-row justify-between items-center mb-4'>
								<div className='bg-primary p-2.5 rounded'>
									<UsersRound size={16} />
								</div>
								<div className='bg-[#D1FF72] rounded-full py-2 px-3'>
									<p className='text-xs font-semibold'>85% MATCH</p>
								</div>
							</div>
							<p className='font-semibold mb-1'>Post-Digital Nomads</p>
							<p className='text-xs text-[#475569] mb-4'>Resonates with high-abstraction visual language and narrative novelty. This segment prioritizes non-linear storytelling.</p>
							<p className='text-[10px] text-[#91A0B6] mb-2'>META KEYWORDS BY INTEREST</p>
							<div className='flex flex-row flex-wrap items-center gap-1 mb-4'>
								<div className='bg-[#D1FF72]/25 rounded py-2 px-2.5'>
									<p className='text-[10px] font-medium'>Frequent International Travelers</p>
								</div>
								<div className='bg-[#D1FF72]/25 rounded py-2 px-2.5'>
									<p className='text-[10px] font-medium'>Recently Detected iPhone 14 Devices</p>
								</div>
								<div className='bg-[#D1FF72]/25 rounded py-2 px-2.5'>
									<p className='text-[10px] font-medium'>Thailand</p>
								</div>
								<div className='bg-[#D1FF72]/25 rounded py-2 px-2.5'>
									<p className='text-[10px] font-medium'>Cocktail</p>
								</div>
							</div>
							<Button onClick={onSubscribe} className='h-fit bg-black text-white py-3 hover:bg-black'>View Full Audience Profile</Button>
						</div>
						<div className='flex flex-col mb-6'>
							<div className='flex flex-row justify-between items-center mb-4'>
								<div className='bg-primary p-2.5 rounded'>
									<House size={16} />
								</div>
								<div className='bg-[#D1FF72] rounded-full py-2 px-3'>
									<p className='text-xs font-semibold'>78% MATCH</p>
								</div>
							</div>
							<p className='font-semibold mb-1'>Suburban Minimalists</p>
							<p className='text-xs text-[#475569] mb-4'>Aligns with the clean, structured layout and professional palette. Values clarity and functional aesthetic above all</p>
							<p className='text-[10px] text-[#91A0B6] mb-2'>META KEYWORDS BY INTEREST</p>
							<div className='flex flex-row flex-wrap items-center gap-1 mb-4'>
								<div className='bg-[#D1FF72]/25 rounded py-2 px-2.5'>
									<p className='text-[10px] font-medium'>Staycation</p>
								</div>
								<div className='bg-[#D1FF72]/25 rounded py-2 px-2.5'>
									<p className='text-[10px] font-medium'>Simple Skincare</p>
								</div>
								<div className='bg-[#D1FF72]/25 rounded py-2 px-2.5'>
									<p className='text-[10px] font-medium'>Running</p>
								</div>
								<div className='bg-[#D1FF72]/25 rounded py-2 px-2.5'>
									<p className='text-[10px] font-medium'>Scandinavian design</p>
								</div>
							</div>
							<Button onClick={onSubscribe} className='h-fit bg-black text-white py-3 hover:bg-black'>View Full Audience Profile</Button>
						</div>

						{/* end */}
					</div>
				</ScrollArea>
				<div className={`absolute bottom-0 right-0 z-2 backdrop-blur-sm ${subscribe ? 'md:w-80 h-full' : 'max-h-0 opacity-0 overflow-hidden'}`}>
					<div className='flex h-full flex-col justify-end pb-11 px-3 z-11'>
						<div className='flex flex-col bg-[#F8F5FF] p-4 rounded-xl shadow-lg'>
							<div className='flex flex-row justify-between'>
								<div className='bg-primary px-2 py-1 rounded-full w-fit mb-4'>
									<p className='text-[#615C8B] text-[10px]'>PRO FEATURE</p>
								</div>
								<Button onClick={onSubscribe} className='h-fit w-fit bg-primary p-1 hover:bg-primary rounded-full'><X size={16} color='#615C8B' /></Button>
							</div>
							<p className='text-2xl font-bold mb-2'>Unlock Full Access</p>
							<p className='text-[10px] text-[#615C8B] mb-6'>View detailed performance for Revenue Impact, Brand Equity, and New Audience Activation.</p>
							<Button className='h-fit bg-primary text-[#615C8B] py-3 hover:bg-primary'>Upgrade to Pro — $49/mo</Button>
						</div>
					</div>
				</div>
			</div>
			{
				hideChat ?

					<div onClick={onHideChat} className='fixed w-fit bottom-2 overflow-hidden right-0 md:bottom-4 md:right-80 '>
						<div className='p-3.5 rounded-full bg-primary mr-3 flex'>
							<BotMessageSquare size={36} color='#615C8B' />
							<div className='fixed flex justify-center  items-center bg-[#FD7272] h-4 w-4 rounded-full right-3 md:right-83 md:bottom-15 bottom-13'>
								<p className='text-[10px] text-white'>1</p>
							</div>
						</div>
					</div>
					:
					<div className='fixed z-10 top-0 md:top-auto right-0 bottom-0 md:right-80 md:h-96 md:w-80 shadow md:bg-white md:rounded-t-xl'>
						<div className='flex h-full flex-col justify-between pb-3 bg-white md:rounded-t-xl'>
							<div className='flex flex-row justify-between items-center bg-[#E2D7FE]/25 md:rounded-t-xl px-6 py-4'>
								<div className='flex flex-row items-center'>
									<div className='p-1.5 rounded-full bg-primary mr-3'>
										<BotMessageSquare size={24} color='#615C8B' />
									</div>
									<p className='font-semibold'>Bert AI</p>
								</div>
								<ChevronDown onClick={onHideChat} size={24} color='#91A0B6' />
							</div>
							<ScrollArea className='h-4/5 py-1 md:py-0 md:h-56 px-2'>
								<div className='flex flex-row items-start mb-6'>
									<div className='p-2 rounded-full bg-primary/25 mr-3'>
										<BotMessageSquare size={24} color='#615C8B' />
									</div>
									<div className='text-xs text-[#475569] bg-[#F9FAFC] p-2 rounded-b-lg rounded-tr-lg'>
										<p>Good job! <b className='text-black'>Hesitation Index</b> is healthy for this creative, meaning people are likely to NOT hesitate to engage with your ad! <br /><br />
											Your Identity Resolution is at 70%. While recognition is high, aspiration is lagging. To hit the 100% Target Resolution for Cultural Brokers, consider :<br /><br />
											1. Increasing visual fidelity to match design-forward expectations.<br />
											2. Increase Narrative Novelty (currently at 58%) to decrease audience fatigue.
										</p>
									</div>
								</div>
								<div className='flex flex-row items-start'>
									<div className='p-2 rounded-full bg-primary/25 mr-3'>
										<BotMessageSquare size={24} color='#615C8B' />
									</div>
									<div className='text-xs text-[#475569] bg-[#F9FAFC] p-2 rounded-b-lg rounded-tr-lg'>
										<p><b>Analysis Summary</b> : The asset shows medium identity resolution among Culture Brokers, indicating a neutral signal that may lack controversial edge. Narrative fatigue is currently quite high. Would you like recommendations to optimize this before running?</p>
									</div>
								</div>
								<div className='flex flex-row items-start mt-2.5 mb-4 pl-12 gap-4'>
									<Button onClick={onSubscribeChat} className='h-fit bg-primary text-[10px] text-[#615C8B] font-bold py-3 hover:bg-primary'>OPTIMIZE NOW</Button>
									<Button onClick={onHideChat} className='h-fit bg-[#EFF4F8] text-[10px] text-[#615C8B] font-bold py-3 hover:bg-[#EFF4F8]'>DISMISS</Button>
								</div>
							</ScrollArea>
							<div>
								<Separator />
								<div className='flex flex-row items-center mx-4 mt-3 bg-[#F9FAFC] rounded pr-2'>
									<Textarea className='[&::-webkit-scrollbar]:hidden resize-none mr-2 shadow-none h-16 border-none focus-visible:ring-0' />
									<SendHorizontal size={24} color='#CEC4EC' />
								</div>
							</div>
						</div>
						<div className={`absolute bottom-0 right-0 z-2 backdrop-blur-sm w-full md:w-80 h-full ${subscribeChat ? 'w-80 h-full' : 'max-h-0 opacity-0 overflow-hidden'}`}>
							<div className='flex h-full flex-col justify-end pb-11 px-3 z-11'>
								<div className='flex flex-col bg-[#F8F5FF] p-4 rounded-xl shadow-lg'>
									<div className='flex flex-row justify-between'>
										<div className='bg-primary px-2 py-1 rounded-full w-fit mb-4'>
											<p className='text-[#615C8B] text-[10px]'>PRO FEATURE</p>
										</div>
										<Button onClick={onSubscribeChat} className='h-fit w-fit bg-primary p-1 hover:bg-primary rounded-full'><X size={16} color='#615C8B' /></Button>
									</div>
									<p className='text-2xl font-bold mb-2'>Unlock Full Access</p>
									<p className='text-[10px] text-[#615C8B] mb-6'>View detailed performance for Revenue Impact, Brand Equity, and New Audience Activation.</p>
									<Button className='h-fit bg-primary text-[#615C8B] py-3 hover:bg-primary'>Upgrade to Pro — $49/mo</Button>
								</div>
							</div>
						</div>
					</div>
			}

		</div>
	)
}

export default ContentAnalysis