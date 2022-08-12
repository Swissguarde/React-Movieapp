import React from "react";

const Account = () => {
  return (
    <div className="">
      <div className="w-full text-white">
        <img
          className="w-full h-[400px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a1543997-c1fd-4946-92d3-b0a3648b92c7/a3655d04-3a74-4360-a857-4524ef0680d5/NG-en-20220808-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="bg"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl">My Shows</h1>
        </div>
      </div>
      <div className="mt-10 text-2xl px-6">
        Movies you watchlist will show here...
      </div>
    </div>
  );
};

export default Account;
