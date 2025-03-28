'use client';

export default function TestComponent() {
  return (
    <div style={{padding: '2rem', marginTop: '5rem', border: '2px solid black'}}>
      <h1 className="text-3xl ">This should be blue and bold if Tailwind is working</h1>
      <p className="mt-4 text-gray-700">This text should have a top margin and be gray</p>
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
        This button should be green
      </button>
      
      <div className="mt-8 p-4 border border-red-500">
        <p>This box should have a red border</p>
      </div>
      
      <div className="mt-4">
        <p>Below are some colored squares with inline styles for comparison:</p>
        <div className="flex mt-2">
          <div style={{width: '50px', height: '50px', backgroundColor: 'blue', marginRight: '10px'}}></div>
          <div style={{width: '50px', height: '50px', backgroundColor: 'green', marginRight: '10px'}}></div>
          <div style={{width: '50px', height: '50px', backgroundColor: 'red'}}></div>
        </div>
        
        <p className="mt-4">Below are some colored squares with Tailwind classes:</p>
        <div className="flex mt-2">
          <div className="w-[50px] h-[50px] bg-blue-500 mr-[10px]"></div>
          <div className="w-[50px] h-[50px] bg-green-500 mr-[10px]"></div>
          <div className="w-[50px] h-[50px] bg-red-500"></div>
        </div>
      </div>
    </div>
  );
}