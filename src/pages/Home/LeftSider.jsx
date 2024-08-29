import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-7 sm:static">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          <i class="ri-facebook-circle-fill text-[#135e4c82]"></i>
          <a href="mailto:3ppled.py@gmail.com"><i class="ri-mail-line text-[#135e4c82] "></i></a>
          <i class="ri-instagram-line text-[#135e4c82] "></i>
          <i class="ri-twitter-x-line text-[#135e4c82] "></i>
          <i class="ri-linkedin-box-line text-[#135e4c82] "></i>
          <i class="ri-github-fill text-[#135e4c82] "></i>
        </div>
        <div className="w-[1px] h-32 bg-[#135e4c82] sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
