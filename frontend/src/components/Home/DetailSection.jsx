import React from 'react'
 
const DetailSection = ({img_url,heading,highlight,body}) => {
    return (
      <section className="flex flex-col lg:flex-row my-20 gap-20 items-center justify-between max-w-6xl mx-auto py-12 px-6">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
            src ={img_url}
            alt="Delicious food"
            className="rounded-xl shadow-lg"
          />
        </div>
 
        {/* Text Section */}
        <div className="lg:w-1/2 mt-6 lg:mt-0 lg:pl-10">
          <h2 className="text-3xl font-bold text-gray-900">
          {heading+" "} 
            <span className="text-orange-500">{highlight}</span>
          </h2>
          <p className="text-gray-600 mt-4">
            {body}
          </p>
        </div>
      </section>
    );
  };
 
 
 
export default DetailSection