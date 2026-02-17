import { useState } from 'react';

interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'document' | 'spreadsheet' | 'presentation' | 'folder';
  size: string;
  modified: string;
  color: string;
}

export default function FileGridView() {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const files: FileItem[] = [
    { id: '1', name: 'Project Proposal.pdf', type: 'pdf', size: '2.4 MB', modified: 'Yesterday', color: 'bg-red-50' },
    { id: '2', name: 'Financial Report.xlsx', type: 'spreadsheet', size: '1.8 MB', modified: '2 days ago', color: 'bg-green-50' },
    { id: '3', name: 'Team Photos', type: 'folder', size: '45.2 MB', modified: '3 days ago', color: 'bg-blue-50' },
    { id: '4', name: 'Marketing Plan.docx', type: 'document', size: '850 KB', modified: '1 week ago', color: 'bg-purple-50' },
    { id: '5', name: 'Product Demo.pptx', type: 'presentation', size: '5.2 MB', modified: '2 weeks ago', color: 'bg-yellow-50' },
    { id: '6', name: 'Logo Design.png', type: 'image', size: '1.2 MB', modified: '3 weeks ago', color: 'bg-pink-50' },
    { id: '7', name: 'Research Data.csv', type: 'spreadsheet', size: '3.7 MB', modified: '1 month ago', color: 'bg-indigo-50' },
    { id: '8', name: 'Meeting Notes.txt', type: 'document', size: '45 KB', modified: '2 months ago', color: 'bg-gray-50' },
    { id: '9', name: 'User Manual.pdf', type: 'pdf', size: '4.1 MB', modified: '3 days ago', color: 'bg-red-50' },
    { id: '10', name: 'Budget Planning.xlsx', type: 'spreadsheet', size: '2.9 MB', modified: '5 days ago', color: 'bg-green-50' },
    { id: '11', name: 'Design Assets', type: 'folder', size: '128 MB', modified: '1 week ago', color: 'bg-blue-50' },
    { id: '12', name: 'Conference Slides.pptx', type: 'presentation', size: '8.5 MB', modified: '2 weeks ago', color: 'bg-yellow-50' },
  ];

  const toggleFile = (id: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedFiles(newSelected);
  };

  const getFileIcon = (type: FileItem['type']) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'image': return '🖼️';
      case 'document': return '📝';
      case 'spreadsheet': return '📊';
      case 'presentation': return '📽️';
      case 'folder': return '📁';
      default: return '📄';
    }
  };

  const getTypeColor = (type: FileItem['type']) => {
    switch (type) {
      case 'pdf': return 'text-red-600';
      case 'image': return 'text-green-600';
      case 'document': return 'text-blue-600';
      case 'spreadsheet': return 'text-green-600';
      case 'presentation': return 'text-yellow-600';
      case 'folder': return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Files & Documents</h2>
            <p className="text-gray-500">{selectedFiles.size} files selected</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                ⏹️
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                ☰
              </button>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Upload Files
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <button className="hover:text-gray-700">Home</button>
          <span>/</span>
          <button className="hover:text-gray-700">Documents</button>
          <span>/</span>
          <span className="text-gray-700">Projects</span>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${
                  selectedFiles.has(file.id) ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => toggleFile(file.id)}
              >
                <div className={`${file.color} p-4 flex flex-col items-center justify-center h-32`}>
                  <span className="text-4xl mb-2">{getFileIcon(file.type)}</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFiles.has(file.id)}
                      onChange={() => {}}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className={`text-sm font-medium ${getTypeColor(file.type)}`}>
                      {file.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium truncate mb-1">{file.name}</h3>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{file.size}</span>
                    <span>{file.modified}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Size</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Modified</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {files.map((file) => (
                <tr 
                  key={file.id} 
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedFiles.has(file.id) ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => toggleFile(file.id)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getFileIcon(file.type)}</span>
                      <div className="font-medium">{file.name}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(file.type)} bg-opacity-20`}>
                      {file.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{file.size}</td>
                  <td className="py-4 px-6 text-gray-600">{file.modified}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="p-6 border-t flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {files.length} items • 2.1 GB used
        </div>
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}