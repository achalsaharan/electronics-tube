import YouTube from 'react-youtube';

const videos = [
	{
		id: 1,
		videoId: 'Zp8a0IskmkE',
		name: 'Startups vs Service Companies',
	},
	{
		id: 2,
		videoId: '4d073Hl9cyc',
		name: 'Stephen Curry Mix - "Stole The Show" ',
	},
	{
		id: 3,
		videoId: 'InVDXJCHLww',
		name: 'Internships or Not',
	},
	{
		id: 4,
		videoId: 'MMEIVh49pS8',
		name: 'Getting started with Git, VSCode and Hosting',
	},
];

export function Home() {
	return (
		<>
			<SearchBar />
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-2 pb-10">
				{videos.map((item, key) => (
					<VideoCard
						key={key}
						videoId={item.videoId}
						name={item.name}
					/>
				))}
			</div>
		</>
	);
}

function VideoCard({ videoId, name }) {
	function onReady(event) {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	}

	const opts = {
		height: '300px',
		width: '100%',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	return (
		<div className="shadow-lg flex flex-col">
			<YouTube videoId={videoId} opts={opts} onReady={onReady} />
			<div className="p-4 flex flex-col flex-grow">
				<div className="flex-grow">
					<h1 className="font-bold">{name}</h1>
				</div>

				<div className="flex flex-row pt-4 space-x-8">
					<button className="focus:text-red-800 text-red-600">
						<i className="fas fa-play fa-lg "></i>
					</button>
					<button className="focus:text-red-800">
						<i className="fas fa-heart fa-lg"></i>
					</button>
					<button className="focus:text-red-800">
						<i className="far fa-clock fa-lg"></i>
					</button>
					<button className="focus:text-red-800">
						<i className="fas fa-list-ul fa-lg"></i>
					</button>
				</div>
			</div>
		</div>
	);
}

function SearchBar() {
	return (
		<div className="p-2 mx-3 rounded border-2 flex ring-red-300 mb-4 ring">
			<input
				type="text"
				placeholder="search"
				className="focus:outline-none w-full mr-2"
			/>
			<button>
				<i class="fas fa-search"></i>
			</button>
		</div>
	);
}
