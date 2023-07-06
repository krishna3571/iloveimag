import React, { useState } from 'react';

export default function ImageConverter() {
    const [image, setImage] = useState('');
    const [output, setOutput] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const convertToJpg = () => {
        if (!image) {
            alert('Please select an image first.');
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = image;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);

            // Convert canvas data to JPG data URL
            const jpgDataUrl = canvas.toDataURL('image/jpeg');
            setOutput(jpgDataUrl);
        };
    };

    return (
        <div>
            <input type="file" accept=".png, .svg" onChange={handleImageChange} />
            <br />
            <br />
            {image && (
                <div>
                    <img src={image} alt="Input Image" />
                    <br />
                    <button onClick={convertToJpg}>Convert to JPG</button>
                </div>
            )}
            {output && (
                <div>
                    <img src={output} alt="Converted JPG" />
                    <br />
                    <a href={output} download="converted_image.jpg">
                        Download JPG
                    </a>
                </div>
            )}
        </div>
    );
}
