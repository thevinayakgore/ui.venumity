import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface PlaylistItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  album: string;
}

export default function DraggableList() {
  const [items, setItems] = useState<PlaylistItem[]>([
    {
      id: "1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      duration: "3:20",
      album: "After Hours",
    },
    {
      id: "2",
      title: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      duration: "2:21",
      album: "F*CK LOVE 3",
    },
    {
      id: "3",
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      duration: "2:58",
      album: "SOUR",
    },
    {
      id: "4",
      title: "Levitating",
      artist: "Dua Lipa",
      duration: "3:23",
      album: "Future Nostalgia",
    },
    {
      id: "5",
      title: "Heat Waves",
      artist: "Glass Animals",
      duration: "3:58",
      album: "Dreamland",
    },
    {
      id: "6",
      title: "Industry Baby",
      artist: "Lil Nas X",
      duration: "3:32",
      album: "MONTERO",
    },
    {
      id: "7",
      title: "Bad Habits",
      artist: "Ed Sheeran",
      duration: "3:50",
      album: "=",
    },
  ]);

  const [playingId, setPlayingId] = useState<string>("1");

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">My Playlist</h2>
          <p className="text-gray-500">Drag to reorder songs</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Add Songs
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="playlist">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex items-center p-4 border rounded-lg transition-all ${
                        snapshot.isDragging
                          ? "bg-purple-50 shadow-lg"
                          : "hover:bg-gray-50"
                      } ${
                        playingId === item.id ? "ring-2 ring-purple-500" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="text-gray-400 font-mono w-8">
                          {index + 1}
                        </div>
                        <button
                          onClick={() =>
                            setPlayingId(item.id === playingId ? "" : item.id)
                          }
                          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          {playingId === item.id ? (
                            <span className="text-purple-600">⏸️</span>
                          ) : (
                            <span className="text-gray-600">▶️</span>
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-500">
                            {item.artist}
                          </div>
                        </div>
                        <div className="text-gray-500 text-sm">
                          {item.album}
                        </div>
                        <div className="text-gray-500 font-mono">
                          {item.duration}
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-6 pt-6 border-t flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {items.length} songs • 24 minutes
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            Shuffle
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Play All
          </button>
        </div>
      </div>
    </div>
  );
}
