import { useState } from 'react';

export default function ContentCalculator() {
  const [accounts, setAccounts] = useState(1);
  const [postsPerAccount, setPostsPerAccount] = useState(10);
  const [graphicPosts, setGraphicPosts] = useState(5);
  const [contentPosts, setContentPosts] = useState(5);
  const [reelPosts, setReelPosts] = useState(5);

  const [graphicTime, setGraphicTime] = useState(2); // hours per graphic post
  const [contentTime, setContentTime] = useState(1); // hours per content post
  const [reelTime, setReelTime] = useState(3); // hours per reel

  const [graphicRate, setGraphicRate] = useState(50);
  const [contentRate, setContentRate] = useState(30);
  const [reelRate, setReelRate] = useState(80);

  const totalGraphicHours = graphicPosts * graphicTime;
  const totalContentHours = contentPosts * contentTime;
  const totalReelHours = reelPosts * reelTime;
  const totalHours = totalGraphicHours + totalContentHours + totalReelHours;

  const totalCost = (graphicPosts * graphicRate) + (contentPosts * contentRate) + (reelPosts * reelRate);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-bold text-center">Agency Content Cost Forecaster</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="font-medium">General Settings</h3>
          <label className="block">Number of Accounts</label>
          <input
            type="number"
            value={accounts}
            onChange={(e) => setAccounts(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      
        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="font-medium">Post Counts</h3>
          <label className="block">Graphic Posts</label>
          <input
            type="number"
            value={graphicPosts}
            onChange={(e) => setGraphicPosts(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
          <label className="block">Content Posts</label>
          <input
            type="number"
            value={contentPosts}
            onChange={(e) => setContentPosts(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
          <label className="block">Reel Posts</label>
          <input
            type="number"
            value={reelPosts}
            onChange={(e) => setReelPosts(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      
        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="font-medium">Time Estimates per Post Type (in hours)</h3>
          <label className="block">Graphic Post Time</label>
          <input
            type="number"
            value={graphicTime}
            onChange={(e) => setGraphicTime(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
          <label className="block">Content Post Time</label>
          <input
            type="number"
            value={contentTime}
            onChange={(e) => setContentTime(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
          <label className="block">Reel Post Time</label>
          <input
            type="number"
            value={reelTime}
            onChange={(e) => setReelTime(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      
        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="font-medium">Pricing per Post Type</h3>
          <label className="block">Graphic Rate</label>
          <input
            type="number"
            value={graphicRate}
            onChange={(e) => setGraphicRate(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
          <label className="block">Content Rate</label>
          <input
            type="number"
            value={contentRate}
            onChange={(e) => setContentRate(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
          <label className="block">Reel Rate</label>
          <input
            type="number"
            value={reelRate}
            onChange={(e) => setReelRate(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      
        <div className="p-4 bg-blue-100 rounded-md text-center">
          <h3 className="font-bold">Results</h3>
          <p><strong>Total Graphic Hours:</strong> {totalGraphicHours} hrs</p>
          <p><strong>Total Content Hours:</strong> {totalContentHours} hrs</p>
          <p><strong>Total Reel Hours:</strong> {totalReelHours} hrs</p>
          <p><strong>Total Hours Required:</strong> {totalHours} hrs</p>
          <p><strong>Estimated Cost:</strong> ${totalCost}</p>
        </div>
      </div>
    </div>
  );
}