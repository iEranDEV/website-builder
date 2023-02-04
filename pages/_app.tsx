import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContextProvider } from '@/context/UserContext'
import NotificationsWrapper from '@/components/general/notification/NotificationsWrapper'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserContextProvider>
			<NotificationsWrapper>
				<div className='overflow-x-hidden'>
					<Component {...pageProps} />
				</div>
			</NotificationsWrapper>
		</UserContextProvider>
	)
}
