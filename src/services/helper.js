const ImageHelper = ({ image, size = 60 }) => {
    return (
  
    //   <img
    //     src={`http://localhost:5000/${image}`}
    //     width={size}
  
    //     className="border border-primary p-[2px] rounded-full"
    //     style={{ height: size }}
    //   />

      <img
                  src={`http://localhost:5000/${image.replaceAll("\\",'/').replaceAll("public/","")}`}
                  
                  className="h-16 w-16 object-cover rounded-full"
                />
  
  
    );
  };
  
  export default ImageHelper;