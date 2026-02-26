'use client'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { isImage } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useContentAnalysis } from '../content-analysis/[id]/_store/ContentAnalysisStore';

const ModalEmail = () => {
	const supabase = createClient()
	const { formData, updateData } = useContentAnalysis()
	const [email, setEmail] = useState("");
	const [alert, setAlert] = useState(false)
	const [open, setOpen] = useState(false)
	const pathname = usePathname();
	const segments = pathname.split('/');
	const targetSegment = segments[2];

	useEffect(() => {
		if (segments[3]) {
			const timer = setTimeout(() => {
				setOpen(true)
			}, 25000);
			return () => clearTimeout(timer);
		}
	}, [pathname])

	const updateEmailCampain = async (e: React.FormEvent) => {
		e.preventDefault(); // Mencegah reload halaman
		if (email && segments[3]) {
			const { error } = await supabase
				.from('campaign')
				.update({ email: email })
				.eq('id', segments[3])
			setEmail(""); // Langsung clear input setelah sukses
			setAlert(true)
			setTimeout(() => {
				setAlert(false)
			}, 5000);
		}
	}

	const handleAsyncAction = async () => {
		// Perform some logic, then open the dialog
		if (open) {
			setOpen(false)
		} else {
			setOpen(true)
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleAsyncAction}>
			{
				targetSegment == 'content-analysis' ?
					<DialogTrigger asChild>
						<Button className='h-fit rounded bg-[#C1FF72] text-black font-semibold py-2 px-6 hover:bg-[#C1FF72] mr-2 md:mr-12'>Export Analysis</Button>
					</DialogTrigger>
					: ''
			}

			<DialogContent className='rounded-xl p-0 ring-0 max-w-11/12 lg:min-w-5xl'>
				<DialogTitle className=''>
					<div className='flex flex-col lg:flex-row justify-between'>
						<div className='flex flex-col p-4 lg:p-9 font-normal text-base lg:min-w-1/2'>
							<div className='flex flex-col justify-center items-center bg-[#E8ECF3] rounded-xl'>
								{
									formData.asset && isImage(formData.asset) ? (
										<Image
											src={formData.asset}
											alt="Preview"
											className="max-h-40 lg:max-h-[340] w-full object-contain rounded-lg"
											width={500}
											height={500}
										// onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))} // Free memory
										/>
									)
										: formData.asset && !isImage(formData.asset) ? (
											<div className="max-h-40 lg:max-h-[340] flex items-center justify-center bg-gray-100 rounded-lg">
												<video controls className="w-full max-h-[340] object-contain">
													<source src={formData.asset} />
													Browser Anda tidak mendukung tag video.
												</video>
											</div>
										) : ''
								}
							</div>
							<p className='text-base lg:text-2xl font-semibold mt-2 lg:mt-9'>Christmas Campaign 2025</p>
							<p className='text-[10px] font-semibold text-[#91A0B6] mt-1.5 lg:mt-4'>CHOSEN SUGGESTED AUDIENCE</p>
							<div className='flex flex-row gap-1 lg:gap-3.5 flex-wrap mt-1.5 lg:mt-4'>
								<div className='px-3 py-1.5 lg:px-4 lg:py-2.5 bg-[#F1EBFF] rounded-full border-[##CEC4EC] border'>
									<p className='text-[#615C8B] text-[10px] lg:text-base'>{formData.primaryAudience}</p>
								</div>
								{
									formData.secondaryAudience?.map?.((item) => {
										return (
											<div key={item} className='px-3 py-1.5 lg:px-4 lg:py-2.5 bg-[#F1EBFF] rounded-full border-[##CEC4EC] border'>
												<p className='text-[#615C8B] text-[10px] lg:text-base'>{item}</p>
											</div>
										)
									})
								}
							</div>
						</div>
						<div className='flex flex-col p-4 lg:p-9 bg-primary rounded-b-xl lg:rounded-r-xl font-normal text-base lg:max-w-1/2'>
							<div className='flex flex-row items-center mb-2 lg:mb-3 lg:mt-16'>
								<Sparkles size={16} color='#615C8B' />
								<p className='text-[#A894E2] text-[10px] lg:text-xs ml-2'>ADVANCED ANALYSIS</p>
							</div>
							<p className='text-xl/tight lg:text-4xl font-semibold mb-0 md:mb-2'>Want a Real Analysis of Your Creative?</p>
							<p className='text-[#615C8B] text-xs lg:text-base mb-6 lg:mb-16'>We’re currently running hands-on reviews using our internal tooling.</p>
							<p className='text-[10px] md:text-xs mb-2'>Share your email and we will Ask Bert what he thinks!</p>
							<form onSubmit={updateEmailCampain} className="flex flex-col lg:gap-3">
								<FieldGroup className="gap-3 lg:gap-7">
									<Field>
										<InputGroup className='lg:h-12 p-2 lg:p-4 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-none has-[[data-slot=input-group-control]:focus-visible]:shadow-0 bg-white ring-0 border-none'>
											<InputGroupInput
												required
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												type="email" id="input-group-url" placeholder="Type your email" className="text-sm" />
											<InputGroupAddon>
												<Mail size={16} />
											</InputGroupAddon>
										</InputGroup>
									</Field>
									<Button type="submit" className='h-fit w-full lg:mb-8 rounded-md bg-[#C1FF72] text-black font-semibold py-2 lg:py-3.5 px-6 hover:bg-[#C1FF72] mr-12'>Submit to Ask Bert<ArrowRight size={24} /></Button>
								</FieldGroup>
							</form>
							<p className={`self-center ${alert ? 'opacity-100 mt-4 mb-2 text-sm lg:text-base lg:mt-0 lg:mb-0' : 'opacity-0'}`}>Thank you! We are gearing up.</p>
						</div>
					</div>
				</DialogTitle>
			</DialogContent>
		</Dialog>
	)
}

export default ModalEmail
