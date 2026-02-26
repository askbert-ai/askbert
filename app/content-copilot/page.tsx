import { Suspense } from 'react';
import ContentCopilot from './_components/ContentCopilot';

export default function page() {
	return (
		<Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
			<ContentCopilot />
		</Suspense>
	)
}
