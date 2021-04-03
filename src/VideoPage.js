import YouTube from 'react-youtube';

export function VideoPage() {
	const video = {
		id: 2,
		videoId: '4d073Hl9cyc',
		name: 'Stephen Curry Mix - "Stole The Show" ',
		views: '135,677',
		date: 'Jan 19, 2021 ',
	};

	return (
		<div>
			<VideoWindow video={video} />
			<div className="grid grid-cols-1 px-2 pt-2 space-y-2 mb-5">
				<div className="bg-gray-100 p-2 flex flex-col space-y-2">
					<div className="flex">
						<input
							className="w-9/12 ring-2 ring-red-200 focus:ring-red-300 focus:outline-none rounded p-1"
							type="text"
							placeholder="Heading / Time"
						/>
						<button className="bg-red-500 px-2 py-1 rounded text-gray-50 ml-2">
							{/* <i className="fas fa-plus"></i> */}
							Add Note
						</button>
					</div>
					<textarea
						className="ring-2 ring-red-200 focus:ring-red-300 focus:outline-none p-1 rounded"
						type="text"
						rows="3"
						placeholder="Enter Note"
					/>
				</div>
				<div className="bg-gray-100 px-2 py-1 mb-5">
					<h1 className="font-bold text-lg">Notes Preview</h1>
					<div className="py-2">
						<h1> Note Heading 1 (2:55)</h1>
						<p className="font-light">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Nulla convallis ligula vel quam interdum, vel
							tempus neque volutpat. Nunc ullamcorper felis vel
							lobortis semper.
						</p>
					</div>
					<div>
						<h1> Note Heading 2 (3:10)</h1>
						<p className="font-light">
							Sed porttitor interdum euismod. Quisque gravida nibh
							a orci dapibus fermentum. Vivamus et ligula est.
							Etiam facilisis ligula vitae quam sagittis, sit amet
							molestie mi lacinia.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function VideoWindow({ video }) {
	function onReady(event) {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	}

	const opts = {
		height: '330px',
		width: '100%',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	return (
		<div className="flex flex-col px-2">
			<YouTube videoId={video.videoId} opts={opts} onReady={onReady} />
			<div className="pt-4 pb-2 bg-gray-100 px-2">
				<h1 className="font-bold">{video.name}</h1>

				<div className="flex items-center justify-between mt-4">
					<div className="flex space-x-4 font-light text-xs">
						<span>{video.views} views</span>
						<span>{video.date}</span>
					</div>

					<div className="flex flex-row space-x-8">
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
		</div>
	);
}
