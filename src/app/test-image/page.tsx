'use client';

export default function TestImage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Image Test</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Direct Image Test:</h2>
            <img 
              src="/team/debsmit-ghosh.jpg" 
              alt="Debsmit Ghosh"
              className="w-32 h-32 object-cover rounded-full border-4 border-blue-500"
              onLoad={() => console.log('Image loaded successfully!')}
              onError={(e) => {
                console.error('Image failed to load:', e);
                (e.target as HTMLElement).style.border = '4px solid red';
              }}
            />
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Image URL Test:</h2>
            <p className="text-sm text-gray-600">
              Try accessing: <a href="/team/debsmit-ghosh.jpg" target="_blank" className="text-blue-600 underline">/team/debsmit-ghosh.jpg</a>
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">File Info:</h2>
            <p className="text-sm text-gray-600">
              Expected path: /public/team/debsmit-ghosh.jpg<br/>
              Web path: /team/debsmit-ghosh.jpg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
