export function Notes({ notes }) {
    return (
        <div className="bg-gray-100 px-2 py-1 mb-5 md:mb-0 h-full">
            <h1 className="font-bold text-lg pb-2">Notes Preview</h1>
            {notes.map((note, idx) => (
                <Note note={note} key={idx} />
            ))}
        </div>
    );
    return;
}

function Note({ note }) {
    return (
        <div className="pb-2">
            <h1>{note.heading}</h1>
            <p className="font-light">{note.body}</p>
        </div>
    );
}
