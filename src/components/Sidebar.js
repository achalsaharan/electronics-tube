import { Link } from 'react-router-dom';

export function Sidebar({ setRoute }) {
    return (
        <div className="flex flex-col min-h-screen shadow-lg divide-y divide-red-100">
            <Link
                className="hover:bg-red-100 p-2 rounded flex items-center"
                to="/"
            >
                <i className="fas fa-home mr-2"></i>
                Home
            </Link>

            <Link
                className="hover:bg-red-100 p-2 rounded flex items-center"
                to="/"
            >
                <i className="fas fa-heart mr-2"></i>
                Liked Videos
            </Link>

            {/* <div className="flex flex-col">
				<Link to="/video">video</Link>

				<button
					onClick={() => setRoute('home')}
					className="hover:bg-red-100 p-2 rounded flex items-center space-x-2"
				>
					<i className="fas fa-home"></i>
					<span>Home</span>
				</button>
			</div> */}

            {/* <div className="flex flex-col">
				<button className="hover:bg-red-100 p-2 rounded flex items-center space-x-2">
					<i className="fas fa-heart"></i>
					<span>Liked Videos</span>
				</button>
			</div> */}

            <div className="flex flex-col">
                <Link
                    className="hover:bg-red-100 p-2 rounded flex items-center"
                    to="/"
                >
                    <i className="fas fa-list-ul mr-2"></i>
                    Play Lists
                </Link>

                <div className="flex flex-col ml-4 space-y-1 mr-4 mb-2">
                    <Link
                        className="flex hover:bg-red-100 p-1 rounded font-light items-center"
                        to="/"
                    >
                        <i className="fas fa-dot-circle fa-xs mr-2"></i>
                        list 1
                    </Link>
                    <Link
                        className="flex hover:bg-red-100 p-1 rounded font-light items-center"
                        to="/"
                    >
                        <i className="fas fa-dot-circle fa-xs mr-2"></i>
                        list 2
                    </Link>
                    <Link
                        className="flex hover:bg-red-100 p-1 rounded font-light items-center"
                        to="/"
                    >
                        <i className="fas fa-dot-circle fa-xs mr-2"></i>
                        list 3
                    </Link>
                </div>
            </div>

            <Link
                className="hover:bg-red-100 p-2 rounded flex items-center"
                to="/"
            >
                <i className="far fa-clock mr-2"></i>
                Watch Later
            </Link>

            {/* <div className="flex flex-col">
				<button className="hover:bg-red-100 p-2 rounded flex items-center space-x-2">
					<i className="far fa-clock"></i>
					<span>Watch Later</span>
				</button>
			</div> */}
        </div>
    );
}
