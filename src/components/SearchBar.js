import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

export function SearchBar() {
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    function searchVideos() {
        if (search) {
            navigate(`/searchresults/${search}`);
        }
    }

    return (
        <div className="p-2 mx-3 rounded border-2 flex ring-red-300 mb-4 ring max-w-lg">
            <input
                type="text"
                placeholder="search"
                className="focus:outline-none w-full mr-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => (e.keyCode === 13 ? searchVideos() : null)}
            />
            <button onClick={searchVideos}>
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
}
