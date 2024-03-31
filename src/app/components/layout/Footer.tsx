"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer(){
    return (        
      <footer className='border-t p-8 text-center mt-16 bg-black block px-16'>
        <div className=" flex justify-between text-white">
          <div className="flex flex-col text-sm items-start">
            <h4 className="text-lg">Order Now</h4>
                <Link href={''}>Deals</Link>
                <Link href={''}>Meals</Link>
                <Link href={''}>Sides</Link>
                <Link href={''}>Drinks</Link>
          </div>
          <div className="flex flex-col text-sm items-start">
            <h4 className="text-lg">About</h4>
                <Link href={''}>About Us</Link>
                <Link href={''}>Contactless Delivery</Link>
                <Link href={''}>Nutrition</Link>
                <Link href={''}>Career</Link>
          </div>
          <div className="flex flex-col text-sm items-start">
            <h4 className="text-lg">Our Policies</h4>
                <Link href={''}>Privacy</Link>
                <Link href={''}>Terms & Conditions</Link>
                <Link href={''}>Responsible disclosure</Link>
                <Link href={''}>FAQs & Help</Link>
          </div>
          <div className="flex flex-col text-sm items-start">
            <h4 className="text-lg">Visit Foodies</h4>
                <Link href={''}>Locate a Store</Link>
                <Link href={''}>Global Blog</Link>
          </div>
        </div>
        <div className="flex justify-center align-middle mt-16 gap-4">            
            <Link className="" href={'/'}><Image src={'/apple_appstore.png'} width={124} height={27} alt={'salad1'}/></Link>
            <Link className="" href={'/'}><Image src={'/google_playstore.png'} width={145} height={47} alt={'salad1'}/></Link>
        </div>
        <div className="flex justify-between align-middle mt-16 gap-4 text-white">            
            <div className="flex max-w-max">
              <div className="grow">Help us in serving you better</div>
              <button type="button" className="feedbckbtn">Give Feedback</button>
            </div>
            <div className="flex flex-col pr-56">
              <h4>Follow us</h4>   
              <div className="flex flex-row">     
                <Link className="" href={'/'}><Image src={'/facebook.png'} width={36} height={36} alt={'salad1'}/></Link>
                <Link className="" href={'/'}><Image src={'/twitter.png'} width={36} height={36} alt={'salad1'}/></Link>        
                <Link className="" href={'/'}><Image src={'/instagram.png'} width={36} height={36} alt={'salad1'}/></Link>
                <Link className="" href={'/'}><Image src={'/youtube.png'} width={36} height={36} alt={'salad1'}/></Link>
              </div>
            </div>
        </div>
        <div className="text-gray-500 mt-8 text-xs">
          Order delicious Food anywhere, anytime. We are happy to assist you.  * T& C Apply<br/>
          Huury up and place your order now!<br/>
          <div className="mt-2">&copy; 2024 @Foodies All Rights Reserved</div>
        </div>
      </footer>
    )
}