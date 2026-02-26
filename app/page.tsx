import { redirect } from 'next/navigation'

const Page = () => {
	redirect('/content-copilot?step=upload')
}

export default Page
