import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContextProvider } from '@/context/UserContext'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserContextProvider>
			<div className='overflow-x-hidden'>
				<Component {...pageProps} />
			</div>
		</UserContextProvider>
	)
}
