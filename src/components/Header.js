import { useState } from 'react';
import { Sidebar } from './Sidebar';

export function Header({ setRoute }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	// useEffect(() => {
	// 	setSidebarOpen('false');
	// });
	return (
		<>
			<div className="bg-red-100 fixed w-screen top-0 left-0 z-0">
				<div className="container mx-auto py-4 px-2 text-red-600 flex items-center">
					<button
						className="mr-4 md:hidden hover:text-red-800"
						onClick={() => setSidebarOpen(true)}
					>
						<i className="fas fa-bars fa-lg "></i>
					</button>
					<h1 className="text-lg font-bold">Video Library</h1>
					<div className="flex space-x-4 ml-auto">
						<button className="hover:text-red-800">link 1</button>
						<button className="hover:text-red-800">link 2</button>
					</div>
				</div>
			</div>

			{sidebarOpen && (
				<SidebarModal
					setSidebarOpen={setSidebarOpen}
					setRoute={setRoute}
				/>
			)}
		</>
	);
}

function SidebarModal({ setSidebarOpen, setRoute }) {
	return (
		<div
			id="sidebar-modal-wrapper"
			className="z-10 h-screen w-screen fixed top-0 left-0 bg-gray-50 bg-opacity-50"
			onClick={(e) => {
				if (e.target.id === 'sidebar-modal-wrapper') {
					setSidebarOpen(false);
				} else if (
					e.target.tagName === 'BUTTON' ||
					// e.target.tagName === 'DIV' ||
					e.target.tagName === 'A'
				) {
					setSidebarOpen(false);
				}
			}}
		>
			<div className="max-w-xs bg-gray-50">
				<div className="flex">
					<button
						className="text-4xl ml-auto focus:text-red-700"
						onClick={() => setSidebarOpen(false)}
					>
						&times;
					</button>
				</div>

				<Sidebar setRoute={setRoute} />
			</div>
		</div>
	);
}
