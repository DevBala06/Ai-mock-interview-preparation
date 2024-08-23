import React from 'react'
import Testimonials from './Testimonials'

const TestimonialSection = () => {
  return (
    <>
    <section className="pt-12">
           <div className="w-full h-screen bg-[#F1F0EE]  overflow-hidden ">
            <div className="h-1/4 pt-6">
              <div className="flex flex-col justify-center items-center w-[96%]  mx-auto">
                <h1 className="xl:text-4xl xl:font-black max-xl:text-3xl max-xl:font-extrabold max-md:text-xl max-md:font-extrabold ">
                  Reviews that speak volumes.
                </h1>
                <p className="xl:text-lg xl:font-bold mt-4 max-xl:text-lg max-xl:font-bold max-md:text-base max-md:font-bold max-md:px-5">
                  {
                    "Don't just take our word for it, hear what people have to say about us."
                  }
                </p>
              </div>
            </div>
            <div className="h-3/4 w-[87%] mx-auto ">
              <Testimonials />
            </div>
          </div>
        </section>
    </>
  )
}

export default TestimonialSection