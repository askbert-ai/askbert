'use client'
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Field, FieldGroup } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import ProgressSteps from "@/components/ui/progress-step";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, BotMessageSquare, ChevronDown, CloudUpload, Gem, House, Mail, MoveLeft, MoveRight, SendHorizontal, Sparkles, UsersRound, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import StepPage from './_components/StepPage';
import { useContentCopilot } from './_store/ContentCopilotStore';

import { createClient } from '@/utils/supabase/client';

export default function Page() {
	const supabase = createClient()
	const { file, primaryObjective, campaignId, updateCampaignId, steps, currentStep, updateCurrentStep, disabledNext, disabledPrev, updateDisabledNext, hideButton, updateHideButton, primaryAudience, secondaryAudience, clearSecondaryAudience, updatePrimaryAudience } = useContentCopilot((state) => state)

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			updateCurrentStep(currentStep + 1)
			if (currentStep == 0) {
				updateHideButton(true)
			} else {
				updateHideButton(false)
			}
			if (currentStep == 3) {
				updateDisabledNext(true)
			}
			if (currentStep == 4) {
				updateHideButton(true)
			}
		}

	}

	const handlePrev = () => {
		updateCurrentStep(currentStep - 1)
		updateHideButton(false)
		updateDisabledNext(false)
		if (currentStep == 2) {
			updateDisabledNext(true)
			clearSecondaryAudience()
			updatePrimaryAudience('')
			updateHideButton(true)
		}
		if (currentStep == 1) {
			updateDisabledNext(false)
			updateHideButton(false)
		}

	}

	const scrollToTop = () => {
		if (typeof window !== 'undefined') { // Check if running in the browser
			window.scrollTo({
				top: 0,
				behavior: 'smooth' // For a smooth scrolling effect
			});
		}
	};

	useEffect(() => {
		scrollToTop()
	}, [currentStep])

	const [email, setEmail] = useState("");

	const saveCampaign = async () => {
		let publicUrl = ''
		if (file) {
			const response = await fetch(URL.createObjectURL(file));
			const blob = await response.blob();
			const extractFile = new File([blob], `${Date.now()}`, { type: blob.type })
			const mime = blob.type; // e.g., "image/png"
			const ext = mime.split('/').pop(); // "png"
			const filePath = `campaign-assets/${Date.now()}.${ext}`;
			const { error: uploadError } = await supabase.storage
				.from('askbert-bucket') // your bucket name
				.upload(filePath, extractFile);
			if (uploadError) {
				console.log({ uploadError })
			}
			const { data: res } = supabase.storage
				.from('askbert-bucket')
				.getPublicUrl(filePath);
			publicUrl = res.publicUrl
		}
		const { data, error } = await supabase
			.from('campaign')
			.insert({
				primary_audience: primaryAudience,
				secondary_audience: JSON.stringify(secondaryAudience),
				objective_optimizes: primaryObjective,
				asset: publicUrl,
			}).select()
		if (data && data.length > 0) {
			updateCampaignId(data[0].id);
		}
	}
	const [alert, setAlert] = useState(false)
	const updateEmailCampain = async (e: React.FormEvent) => {
		e.preventDefault(); // Mencegah reload halaman

		if (email && campaignId != '') {
			const { error } = await supabase
				.from('campaign')
				.update({ email: email })
				.eq('id', campaignId)

			// alert(`Berhasil mengirim ke: ${email}`);
			setEmail(""); // Langsung clear input setelah sukses
			setAlert(true)
			setTimeout(() => {
				setAlert(false)
			}, 5000);
		}
	}

	useEffect(() => {
		if (currentStep == 2) {
			if (primaryAudience !== '' && secondaryAudience.length === 2) {
				updateDisabledNext(false)
			} else {
				updateDisabledNext(true)
			}
		}

		if (currentStep == 5) {
			saveCampaign()
			const timer = setTimeout(() => {
				updateCurrentStep(currentStep + 1) // Ganti dengan URL tujuan
			}, 5000);
			return () => clearTimeout(timer);
		}

		if (currentStep == 6) {
			const timer = setTimeout(() => {
				setOpen(true) // Ganti dengan URL tujuan
			}, 10000);
			return () => clearTimeout(timer);
		}

	}, [primaryAudience, secondaryAudience, currentStep])

	const [subscribe, setSubscribe] = useState(false)
	const [subscribeChat, setSubscribeChat] = useState(false)
	const [hideChat, setHideChat] = useState(false)


	const onSubscribe = () => {
		if (subscribe) {
			setSubscribe(false)
		} else {
			setSubscribe(true)
		}
	}

	const onSubscribeChat = () => {
		if (subscribeChat) {
			setSubscribeChat(false)
		} else {
			setSubscribeChat(true)
		}
	}

	const onHideChat = () => {
		if (hideChat) {
			setHideChat(false)
		} else {
			setHideChat(true)
		}
	}

	const [open, setOpen] = useState(false)

	const handleAsyncAction = async () => {
		// Perform some logic, then open the dialog
		if (open) {
			setOpen(false)
		} else {
			setOpen(true)
		}
	}



	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="sticky top-0 bg-white flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4 z-10">
					<div className='flex flex-row items-center'>
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#" className="text-[#91A0B6]">
										Content Copilot
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage className="text-black font-medium">Upload an Asset</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<div className='flex flex-row items-center mr-4'>
						<Dialog open={open} onOpenChange={handleAsyncAction}>
								{
									currentStep == 6 ?
									<DialogTrigger asChild>
								<Button className='h-fit rounded bg-[#C1FF72] text-black font-semibold py-2 px-6 hover:bg-[#C1FF72] mr-12'>Export Analysis</Button>
							</DialogTrigger>
							: ''
								}
							
							<DialogContent className='rounded-xl p-0 ring-0 min-w-5xl'>
								<DialogTitle className=''>
									<div className='flex flex-row justify-between'>
										<div className='flex flex-col p-9 font-normal text-base min-w-1/2'>
											<div className='flex flex-col justify-center items-center bg-[#E8ECF3] rounded-xl'>
												{
													file && file.type.startsWith('image/') ? (
														<img
															src={URL.createObjectURL(file)}
															alt="Preview"
															className="max-h-[340] w-full object-contain rounded-lg"
															onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))} // Free memory
														/>
													)
														: file && !file.type.startsWith('image/') ? (
															<div className="max-h-[340] flex items-center justify-center bg-gray-100 rounded-lg">
																<video controls className="w-full max-h-[340] object-contain">
																	<source src={URL.createObjectURL(file)} type={file.type} />
																	Browser Anda tidak mendukung tag video.
																</video>
															</div>
														) : ''
												}
											</div>
											<p className='text-2xl font-semibold mt-9'>Christmas Campaign 2025</p>
											<p className='text-xs font-semibold text-[#91A0B6] mt-4'>CHOSEN SUGGESTED AUDIENCE</p>
											<div className='flex gap-3.5 flex-wrap mt-4'>
												<div className='px-4 py-2.5 bg-[#F1EBFF] rounded-full border-[##CEC4EC] border'>
													<p className='text-[#615C8B]'>{primaryAudience}</p>
												</div>
												{
													secondaryAudience.map((item) => {
														return (
															<div key={item} className='px-4 py-2.5 bg-[#F1EBFF] rounded-full border-[##CEC4EC] border'>
																<p className='text-[#615C8B]'>{item}</p>
															</div>
														)
													})
												}
											</div>
										</div>
										<div className='flex flex-col p-9 bg-primary rounded-r-xl font-normal text-base max-w-1/2'>
											<div className='flex flex-row items-center mb-3 mt-16'>
												<Sparkles size={16} color='#615C8B' />
												<p className='text-[#A894E2] text-xs ml-2'>ADVANCED ANALYSIS</p>
											</div>
											<p className='text-4xl font-semibold mb-2'>Want a Real Analysis of Your Creative?</p>
											<p className='text-[#615C8B] mb-16'>We’re currently running hands-on reviews using our internal tooling.</p>
											<p className='text-xs mb-2'>Share your email and we will Ask Bert what he thinks!</p>
											<form onSubmit={updateEmailCampain} className="flex flex-col gap-3">
												<FieldGroup>
													<Field>
														<InputGroup className='h-12 p-4 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-none has-[[data-slot=input-group-control]:focus-visible]:shadow-0 bg-white ring-0 border-none'>
															<InputGroupInput
																required
																value={email}
																onChange={(e) => setEmail(e.target.value)}
																type="email" id="input-group-url" placeholder="Type your email" />
															<InputGroupAddon>
																<Mail size={16} />
															</InputGroupAddon>
														</InputGroup>
													</Field>
													<Button type="submit" className='h-fit w-full mb-8 rounded-md bg-[#C1FF72] text-black font-semibold py-3.5 px-6 hover:bg-[#C1FF72] mr-12'>Submit to Ask Bert<ArrowRight size={24} /></Button>
												</FieldGroup>
											</form>
											<p className={`self-center ${alert ? 'opacity-100' : 'opacity-0'}`}>“Thank you! We are gearing up.”</p>
										</div>
									</div>
								</DialogTitle>
								{/* <DialogHeader>
									<DialogTitle>No Close Button</DialogTitle>
									<DialogDescription>
										This dialog doesn&apos;t have a close button in the top-right
										corner.
									</DialogDescription>
								</DialogHeader> */}

							</DialogContent>
						</Dialog>
						<Image
							src="/images/avatar-02.png"
							alt="Askbert.ai"
							width={40}
							height={40}
						/>
					</div>

				</header>
				{
					currentStep != 6 ?
						<div className="flex flex-1 flex-col gap-4 p-4 md:p-6 bg-[#FDFDFE]">
							<div className="min-h-screen p-6 md:p-9 bg-white justify-items-center sm:p-16 flex-1 rounded-xl md:min-h-min shadow-[0_4px_24px_0_rgba(0,0,0,0.05)]">
								<ProgressSteps steps={steps} currentStep={currentStep} />
								<StepPage />
								<div className={`flex justify-between min-w-full`}>
									{
										currentStep > 0 && currentStep < 5 ?
											<Button onClick={handlePrev} variant="outline" disabled={disabledPrev} className={`mt-16 ${disabledPrev ? 'bg-[#E8ECF3]' : ''} px-4 md:px-6 py-3 place-self-end`}>
												<MoveLeft className='mr-2 md:mr-6' /> Back
											</Button>
											: <div></div>
									}
									{
										!hideButton ?
											<Button onClick={handleNext} variant="secondary" disabled={disabledNext} className={`mt-16 ${disabledNext ? 'bg-[#E8ECF3]' : 'bg-[#C1FF72] hover:bg-[#C1FF72]/70'} px-4 md:px-6 py-3 place-self-end`}>
												{currentStep == 4 ? 'Start Analyzing' : 'Next'} <MoveRight className='ml-2 md:ml-6' />
											</Button>
											: <></>
									}

								</div>
							</div>
						</div>
						:
						<div className="flex h-full bg-[#FDFDFE]">
							<div className='flex flex-col p-6 mr-80'>
								<div className='flex flex-row gap-12 mb-9'>
									<div>
										<p className='font-semibold'>Platform :</p>
										<p className='text-[#475569]'>Facebook &middot; Instagram</p>
									</div>
									<div>
										<p className='font-semibold'>Platform :</p>
										<p className='text-[#475569]'>Facebook &middot; Instagram</p>
									</div>
								</div>
								{
									file && file.type.startsWith('image/') ? (
										<img
											src={URL.createObjectURL(file)}
											alt="Preview"
											className="max-h-[556] w-full object-contain rounded-lg"
											onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))} // Free memory
										/>
									)
										: file && !file.type.startsWith('image/') ? (
											<div className="max-h-[556] flex items-center justify-center bg-gray-100 rounded-lg">
												<video controls className="w-full max-h-[556] object-contain">
													<source src={URL.createObjectURL(file)} type={file.type} />
													Browser Anda tidak mendukung tag video.
												</video>
											</div>
										) : ''
								}
								<Button onClick={() => window.location.reload()} className='h-fit bg-[#C1FF72] text-black py-3 hover:bg-[#C1FF72] mt-6'><CloudUpload size={24} /> New Upload</Button>
							</div>

							{
								hideChat ?

									<div onClick={onHideChat} className='fixed bottom-4 right-80'>
										<div className='p-3 rounded-full bg-primary mr-3'>
											<BotMessageSquare size={32} color='#615C8B' />
										</div>
									</div>
									:
									<div className='fixed bottom-0 right-80 h-96 w-80 shadow rounded-t-xl bg-white'>
										<div className='flex h-full flex-col justify-between pb-3'>
											<div className='flex flex-row justify-between items-center bg-[#E2D7FE]/25 rounded-t-xl px-6 py-4'>
												<div className='flex flex-row items-center'>
													<div className='p-1.5 rounded-full bg-primary mr-3'>
														<BotMessageSquare size={24} color='#615C8B' />
													</div>
													<p className='font-semibold'>Bert AI</p>
												</div>
												<ChevronDown onClick={onHideChat} size={24} color='#91A0B6' />
											</div>
											<ScrollArea className='h-56 px-2'>
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
										<div className={`absolute bottom-0 right-0 z-2 backdrop-blur-sm w-80 h-full ${subscribeChat ? 'w-80 h-full' : 'max-h-0 opacity-0 overflow-hidden'}`}>
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


							<div className='fixed bg-white right-0 bottom-0 top-16 w-80 border-l'>
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
												quality={100}
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
												quality={100}
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
								<div className={`absolute bottom-0 right-0 z-2 backdrop-blur-sm w-80 h-full ${subscribe ? 'w-80 h-full' : 'max-h-0 opacity-0 overflow-hidden'}`}>
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
						</div>
				}

			</SidebarInset>
		</SidebarProvider>
	)
}
