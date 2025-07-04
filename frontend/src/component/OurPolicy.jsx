import React from 'react';
import Title from './Title';
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full min-h-[100vh] md:min-h-[70vh] flex flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025] py-10 gap-12'>
      
      <div className='text-center px-4 mt-10'>
        <Title text1="OUR" text2="POLICY" />
        <p className='text-[13px] md:text-[18px] text-blue-100 mt-2'>
          Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
        </p>
      </div>

      <div className='w-full flex flex-wrap justify-center items-start gap-12 px-4'>
        {/* Policy Item 1 */}
        <div className='w-[300px] flex flex-col items-center gap-3 text-center'>
          <RiExchangeFundsLine 
            className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-[#90b9ff]' 
            aria-label="Exchange Icon" 
          />
          <p className='font-semibold text-[18px] md:text-[22px] text-[#a5e8f7]'>
            Easy Exchange Policy
          </p>
          <p className='text-[12px] md:text-[16px] text-[aliceblue]'>
          Changed Your Mind? No Worries — Quick and Easy Exchange Process.
          </p>
        </div>

        {/* Policy Item 2 */}
        <div className='w-[300px] flex flex-col items-center gap-3 text-center'>
          <TbRosetteDiscountCheckFilled 
            className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-[#90b9ff]' 
            aria-label="Return Policy Icon" 
          />
          <p className='font-semibold text-[18px] md:text-[22px] text-[#a5e8f7]'>
            7 Days Return Policy
          </p>
          <p className='text-[12px] md:text-[16px] text-[aliceblue]'>
            Risk-Free Shopping — Return Within 7 Days, No Questions Asked.
          </p>
        </div>

        {/* Policy Item 3 */}
        <div className='w-[300px] flex flex-col items-center gap-3 text-center'>
          <BiSupport 
            className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-[#90b9ff]' 
            aria-label="Support Icon" 
          />
          <p className='font-semibold text-[18px] md:text-[22px] text-[#a5e8f7]'>
            Best Customer Support
          </p>
          <p className='text-[12px] md:text-[16px] text-[aliceblue]'>
            We’re Always Here — Friendly, Fast, and Reliable Support Anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurPolicy;
