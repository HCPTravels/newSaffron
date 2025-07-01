import React from "react";
import BlogCard from "./BlogCard";
import blogPosts from "../data/blog";
import saffronHome from "../assets/saffronHome.png"; // Adjust the path as necessary

const Blog = () => {
    return (
        <div className="flex items-center mt-4 bg-[#ff6523] px-4 md:px-12 w-full">
            {/* <img
                src={saffronHome}
                alt="Decorative Saffron"
                className="fixed bottom-[-75px] right-[800px] w-[150px] h-[150px]
         md:top-[100px] md:right-[-154px] md:w-[375px] md:h-[375px]
         object-cover pointer-events-none opacity-30 z-0"
            /> */}
            <img
                src={saffronHome}
                alt="Decorative Saffron"
                className="fixed bottom-[-75px] left-[-75px] w-[150px] h-[150px]
                                           md:top-[586px] md:left-[-154px] md:w-[375px] md:h-[375px]
                                           object-cover pointer-events-none opacity-30 z-0"
            />
             <img
                src={saffronHome}
                alt="Decorative Saffron"
                className="fixed right-[-75px] w-[150px]  h-[150px]
                                           top-[0px] md:left-[1250px] md:w-[375px] md:h-[375px]
                                           object-cover pointer-events-none opacity-30 z-0"
            />

            <div className="flex flex-col md:flex-row p-8 gap-16 md:p-16 bg-[#ff6523] mt-12 md:mt-24 w-full rounded-lg ">

                {/* Title Section - Only "BLOGS" on mobile */}
                <div className="mb-8 md:mb-0">
                    {/* Mobile: Only "BLOGS" */}
                    <div className="md:hidden text-6xl text-center font-black text-black leading-none">
                        BLOGS
                    </div>


                    {/* Desktop: Original split layout */}
                    <div className="hidden md:block space-y-0">
                        <div className="text-8xl md:text-9xl font-black text-black leading-none">
                            BL
                        </div>
                        <div className="text-8xl md:text-9xl pl-8 font-black text-black leading-none">
                            OG-
                        </div>
                        <div className="text-8xl md:text-9xl font-black text-black leading-none">
                            NEW
                        </div>
                        <div className="flex flex-row items-start mt-2">
                            <div className="text-8xl md:text-9xl font-black text-black leading-none pr-4">
                                S
                            </div>
                            <div className="flex flex-col justify-start pt-12">
                                <p className="text-xl md:text-2xl text-black">
                                    Latest News
                                </p>
                                <p className="text-xl md:text-2xl pl-4 text-black">
                                    and updates
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blog Cards */}
                <div className="md:relative md:top-0 md:right-0 md:ml-auto w-full">
                    {blogPosts.map((post, index) => (
                        <BlogCard key={index} {...post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;