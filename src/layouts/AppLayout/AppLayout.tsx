import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'
import { AppAside } from '@/layouts/AppLayout/AppAside'
import { SheetAppMobile } from '@/layouts/AppLayout/SheetAppMobile'

import { DropDownUserSettings } from '@/components/DropDownUserSettings'
import { useAppSelector } from '@/store'

export function AppLayout() {
	const titleHeader = useAppSelector((state) => state.appHeaderTitleSlice.title)

	return (
		<div className="flex flex-col md:grid h-full min-h-screen w-full md:grid-cols-[min-content_1fr] md:items-start">
			<AppAside />

			<div className="grid grid-rows-[min-content_1fr] min-h-full">
				<Header>
					<SheetAppMobile />
					<h1 className="text-xl font-semibold capitalize">{titleHeader}</h1>
					<div className="md:ml-auto">
						<DropDownUserSettings />
					</div>
				</Header>

				<Outlet />
			</div>
		</div>
	)
}
