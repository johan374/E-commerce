// Import required dependencies
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ImageCarousel component accepts:
// - images: Array of image objects with image_url and alt_text
// - currentIndex: Currently displayed image index
// - onUpdateIndex: Function to update current image index
const ImageCarousel = ({ images, currentIndex, onUpdateIndex }) => {
   return (
       // Container with relative positioning and fixed height
       <div className="relative w-full h-64">
           {/* Main image display */}
           <img
               src={images[currentIndex].image_url}
               alt={images[currentIndex].alt_text || "Product image"}
               className="w-full h-full object-contain object-center"
               // Fallback if image fails to load
               onError={(e) => {
                   console.error('Image failed to load:', e.target.src);
                   e.target.src = "/placeholder.png";
               }}
           />

           {/* Only show navigation controls if there are multiple images */}
           {images.length > 1 && (
               <>
                   {/* Previous image button */}
                   <button 
                       onClick={e => {
                           e.stopPropagation(); // Prevent event bubbling
                           // Loop to last image if at first image, otherwise go to previous
                           onUpdateIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
                       }}
                       className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                   >
                       <ChevronLeft className="w-4 h-4" />
                   </button>

                   {/* Next image button */}
                   <button 
                       onClick={e => {
                           e.stopPropagation(); // Prevent event bubbling
                           // Loop to first image if at last image, otherwise go to next
                           onUpdateIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
                       }}
                       className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                   >
                       <ChevronRight className="w-4 h-4" />
                   </button>

                   {/* Image counter display */}
                   <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                       {currentIndex + 1} / {images.length}
                   </div>
               </>
           )}
       </div>
   );
};

export default ImageCarousel;