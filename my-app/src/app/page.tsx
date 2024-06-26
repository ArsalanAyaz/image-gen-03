"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const query = async (data : any) => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      const result = await response.blob();
      const output = URL.createObjectURL(result);
      return output;

    } catch (error) {
      console.error("Error during fetch:", error);
      throw error;
    }
  };

  const onClickHandler = async () => {
    setLoading(true);
    try {
      const input = { inputs: text }; // Correct key should be "inputs"
      const imageUrl = await query(input);
      setImgUrl(imageUrl);
    } catch (error) {
      console.log("==========error===========", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Generate Image</h1>
        <p>Stable Diffusion v1-5 Model</p>
        <input
          placeholder="Enter your text"
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className={`w-full py-2 px-4 rounded-md text-white ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"} transition duration-300`}
          onClick={onClickHandler}
          disabled={loading}
        >
          {loading ? "Generating ..." : "Generate Image"}
        </button>
        {loading && <p className="text-center mt-4 text-gray-500">Generating...</p>}
      </div>
      {imgUrl && (
        <div className="mt-8">
          <img className="max-w-full h-auto rounded-lg shadow-md" src={imgUrl} alt="Generated content" />
        </div>
      )}
    </div>
  );
}
