import { Sidebar } from './Sidebar';

export function SidebarModal({ setSidebarOpen, setRoute }) {
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
