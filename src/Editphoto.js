// import React, { useState } from 'react';

// export default function Editphoto() {
//     const [image, setImage] = useState(null);

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();

//         reader.onload = () => {
//             setImage(reader.result);
//         };

//         if (file) {
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleImageChange} /><br />
//             {image && <img src={image} alt="Uploaded" width={500} />}
//         </div>
//     );
// }



// import React, { useState } from 'react';

// export default function Editphoto() {
//     const [image, setImage] = useState(null);
//     const [filter, setFilter] = useState('none');

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();

//         reader.onload = () => {
//             setImage(reader.result);
//         };

//         if (file) {
//             reader.readAsDataURL(file);
//         }
//     };

//     const applyFilter = (selectedFilter) => {
//         setFilter(selectedFilter);
//     };

//     const imageStyle = {
//         filter: filter
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleImageChange} /><br />
//             <div>
//                 <label>Filter:</label>
//                 <button onClick={() => applyFilter('none')}>None</button>
//                 <button onClick={() => applyFilter('grayscale(100%)')}>Grayscale</button>
//                 <button onClick={() => applyFilter('sepia(100%)')}>Sepia</button>
//                 <button onClick={() => applyFilter('blur(5px)')}>Blur</button>
//                 <button onClick={() => applyFilter('brightness(200%)')}>Brightness</button>
//                 <button onClick={() => applyFilter('contrast(200%)')}>Contrast</button>
//                 <button onClick={() => applyFilter('hue-rotate(90deg)')}>Hue Rotate</button>
//                 <button onClick={() => applyFilter('saturate(200%)')}>Saturate</button>
//                 <button onClick={() => applyFilter('invert(100%)')}>Invert</button>
//                 <button onClick={() => applyFilter('drop-shadow(4px 4px 4px black)')}>Drop Shadow</button>
//             </div>
//             <br />
//             {image && <img src={image} alt="Uploaded" style={imageStyle} width={500} />}
//         </div>
//     );
// }

import React, { useState, useRef } from 'react';

export default function Editphoto() {
    const [image, setImage] = useState(null);
    const [filter, setFilter] = useState('none');
    const [roundedCorners, setRoundedCorners] = useState(0);
    const canvasRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
    };

    const handleRoundedCornersChange = (event) => {
        setRoundedCorners(event.target.value);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const img = new Image();
        img.src = image;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            context.filter = filter;
            if (roundedCorners > 0) {
                // Apply rounded corners
                context.beginPath();
                context.moveTo(roundedCorners, 0);
                context.lineTo(canvas.width - roundedCorners, 0);
                context.quadraticCurveTo(canvas.width, 0, canvas.width, roundedCorners);
                context.lineTo(canvas.width, canvas.height - roundedCorners);
                context.quadraticCurveTo(canvas.width, canvas.height, canvas.width - roundedCorners, canvas.height);
                context.lineTo(roundedCorners, canvas.height);
                context.quadraticCurveTo(0, canvas.height, 0, canvas.height - roundedCorners);
                context.lineTo(0, roundedCorners);
                context.quadraticCurveTo(0, 0, roundedCorners, 0);
                context.closePath();
                context.clip();
            }
            context.drawImage(img, 0, 0);

            const dataURL = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = dataURL;
            downloadLink.download = 'modified_image.png';
            downloadLink.click();
        };
    };

    const imageStyle = {
        filter: filter,
        borderRadius: `${roundedCorners}px`
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <br />
            <div>
                <label>Filter:</label>
                <button onClick={() => handleFilterChange('none')}>None</button>
                <button onClick={() => handleFilterChange('grayscale(100%)')}>Grayscale</button>
                <button onClick={() => handleFilterChange('sepia(100%)')}>Sepia</button>
                <button onClick={() => handleFilterChange('blur(5px)')}>Blur</button>
                <button onClick={() => handleFilterChange('brightness(200%)')}>Brightness</button>
                <button onClick={() => handleFilterChange('contrast(200%)')}>Contrast</button>
                <button onClick={() => handleFilterChange('hue-rotate(90deg)')}>Hue Rotate</button>
                <button onClick={() => handleFilterChange('saturate(200%)')}>Saturate</button>
                <br />
                Border Round :  <input
                    type="range"
                    min="0"
                    max="50"
                    value={roundedCorners}
                    onChange={handleRoundedCornersChange}
                />
            </div>
            <br />
            {image && <img src={image} alt="Uploaded" style={imageStyle} width={500} />}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <br />
            <button onClick={handleDownload}>Download Image</button>
        </div>
    );
}
