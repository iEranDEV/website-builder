import { UserContextProvider } from '@/context/UserContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserContextProvider>
			<div className='overflow-x-hidden'>
				<Component {...pageProps} />
			</div>
		</UserContextProvider>
	)
}
