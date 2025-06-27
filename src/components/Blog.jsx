import React from "react";
import BlogCard from "./BlogCard";
import blogPosts from "../data/blog";

const Blog = () => {
    return (
        <div className="flex items-center mt-4 bg-[#ff6523] px-4 md:px-12 w-full">
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