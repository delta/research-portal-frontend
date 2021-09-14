import React, { useState, useEffect } from "react";
import "./CentersOfExcellence.css";
let flag = 0;
const Center = () => {
  let img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfIwmbYkJsPOQU_CVkGHmnRFV6zcgajEXm0w&usqp=CAU";
  const [centers, setCenters] = useState([{name:"",description:"",image_url:""}]);
  let arr = [
    {
      name: 'CSE', 
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis nibh convallis elit mollis efficitur. Fusce luctus nisl aliquam fringilla convallis. Pellentesque non purus at tellus volutpat congue. Mauris ex magna, blandit at ligula efficitur, vestibulum feugiat nunc. Praesent condimentum scelerisque lorem, sit amet condimentum nulla bibendum eu. Nunc eget sapien ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque semper elementum libero sed euismod. Ut at mollis augue, nec sollicitudin eros. Aenean in enim iaculis arcu rutrum lacinia non ut dui. Praesent euismod convallis diam, non varius turpis interdum ac. Nullam pulvinar felis ex, et interdum lacus feugiat vitae. Vivamus laoreet urna at tellus consequat, eget gravida ipsum sodales.',
      image_url: img
    },
    {
      name: 'CSE', 
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis nibh convallis elit mollis efficitur. Fusce luctus nisl aliquam fringilla convallis. Pellentesque non purus at tellus volutpat congue. Mauris ex magna, blandit at ligula efficitur, vestibulum feugiat nunc. Praesent condimentum scelerisque lorem, sit amet condimentum nulla bibendum eu. Nunc eget sapien ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque semper elementum libero sed euismod. Ut at mollis augue, nec sollicitudin eros. Aenean in enim iaculis arcu rutrum lacinia non ut dui. Praesent euismod convallis diam, non varius turpis interdum ac. Nullam pulvinar felis ex, et interdum lacus feugiat vitae. Vivamus laoreet urna at tellus consequat, eget gravida ipsum sodales.',
      image_url: img
    },
    {
      name: 'CSE', 
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis nibh convallis elit mollis efficitur. Fusce luctus nisl aliquam fringilla convallis. Pellentesque non purus at tellus volutpat congue. Mauris ex magna, blandit at ligula efficitur, vestibulum feugiat nunc. Praesent condimentum scelerisque lorem, sit amet condimentum nulla bibendum eu. Nunc eget sapien ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque semper elementum libero sed euismod. Ut at mollis augue, nec sollicitudin eros. Aenean in enim iaculis arcu rutrum lacinia non ut dui. Praesent euismod convallis diam, non varius turpis interdum ac. Nullam pulvinar felis ex, et interdum lacus feugiat vitae. Vivamus laoreet urna at tellus consequat, eget gravida ipsum sodales.',
      image_url: img
    },
    {
      name: 'CSE', 
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis nibh convallis elit mollis efficitur. Fusce luctus nisl aliquam fringilla convallis. Pellentesque non purus at tellus volutpat congue. Mauris ex magna, blandit at ligula efficitur, vestibulum feugiat nunc. Praesent condimentum scelerisque lorem, sit amet condimentum nulla bibendum eu. Nunc eget sapien ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque semper elementum libero sed euismod. Ut at mollis augue, nec sollicitudin eros. Aenean in enim iaculis arcu rutrum lacinia non ut dui. Praesent euismod convallis diam, non varius turpis interdum ac. Nullam pulvinar felis ex, et interdum lacus feugiat vitae. Vivamus laoreet urna at tellus consequat, eget gravida ipsum sodales.',
      image_url: img
    }];

  useEffect(() => {
    if(flag == 0){
      setCenters([...arr]);
      flag++;
    }
  })

  const getCenters = ()=>{
    let htmlArr: JSX.Element[] = [];
    centers.forEach(center => {
      htmlArr.push(
        <div className=' border border-gray-100 px-5 py-3 mt-6 mb-6 ml-3 mr-3 rounded-md shadow-lg max-w-sm justify-items-center shadow-2xl'>
          <img className='w-full w-lg center-img rounded-sm' src={`${center.image_url}`} alt="Image" />
          <div className='px-6 py-4 '>
            <h5 className='text-gray-700 font-bold text-xl text-center mb-2'>{center.name}</h5>
            <div className='overflow-y-scroll max-h-sm h-40 mx:m-auto bg-gray-50'>
            <p className='text-gray-600 text-base text-justify'>{center.description}</p>
            </div>
          </div>
        </div>
      );
    });
    return htmlArr;
  };

  return (
    <div className='container'>
      <h1 className='font-bold text-5xl text-gray-700 text-center mt-2 mb-2 tracking-widest'>Centers of Excellence</h1>
      <div className='container md:mx-auto md:px-20 md:py-5 m-auto grid grid-flow-row lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
        {getCenters()}
      </div>
    </div>
   
  );
};

export default Center;
