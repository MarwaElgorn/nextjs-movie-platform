import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div>
      <footer className="bg-neutral text-neutral-content px-24 py-14" >
   <div className="footer sm:footer-horizontal mb-10 ">
         <div>
          <h5 className="footer-title">Home</h5>
          <a className="link link-hover">Categories</a>
          <a className="link link-hover">Devices</a>
          <a className="link link-hover">Pricing</a>
          <a className="link link-hover">FAQ</a>
        </div>
        <div>
          <h5 className="footer-title">Movies</h5>
          <a className="link link-hover">Games</a>
          <a className="link link-hover">Trending</a>
          <a className="link link-hover">New Release</a>
          <a className="link link-hover">Popular</a>
        </div>
        <div>
          <h5 className="footer-title">Shows</h5>
          <a className="link link-hover">Games</a>
          <a className="link link-hover">Trending</a>
          <a className="link link-hover">New Release</a>
          <a className="link link-hover">Popular</a>
        </div>
        <div>
          <h5 className="footer-title">Social</h5>
          <a className="link link-hover">Twitter</a>
          <a className="link link-hover">Instagram</a>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">GitHub</a>
        </div>
        <div>
          <h5 className="footer-title">Suport</h5>
          <a className="link link-hover">Contact Us</a>
        </div>
        <div>
          <h5 className="footer-title ">Connect with Us</h5>
          <div className=" flex gap-2">
            <a className="link link-hover"><Image src="/facebook.svg" width={40} height={40} alt="facebook" /></a>
            <a className="link link-hover"><Image src="/twitter.svg" width={40} height={40} alt="twitter" /></a>{" "}
            <a className="link link-hover"><Image src="/linkedin.svg" width={40} height={40} alt="linkedin" /></a>
          </div>
        </div>

   </div>
              <div className="border-t border-[#1F1F1F] pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
        <p>©2023 StreamVibe. All Rights Reserved</p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <a href="#" className="footer-title text-neutral-content ">Terms of Use </a>
          <span>|</span>
          <a href="#" className="footer-title text-neutral-content ">Privacy Policy </a>
           <span>|</span>
          <a href="#" className="footer-title text-neutral-content ">Cookie Policy</a>
        </div>
      </div>
      </footer>
    </div>
  );
}
