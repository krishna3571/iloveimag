import React, { useState } from "react";

const ImageConverter = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [convertedPNG, setConvertedPNG] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setOriginalImage(reader.result);
            convertToPNG(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const convertToPNG = (jpegData) => {
        const image = new Image();
        image.src = jpegData;

        image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);

            canvas.toBlob((blob) => {
                setConvertedPNG(URL.createObjectURL(blob));
            }, "image/png");
        };
    };

    const handleDownloadPNG = () => {
        const a = document.createElement("a");
        a.href = convertedPNG;
        a.download = "converted-image.png";
        a.click();
    };

    return (
        <div>
            <h2>Upload a JPEG Image</h2>
            <input type="file" onChange={handleImageChange} />
            <br />
            {originalImage && <img src={originalImage} alt="Original" width={300} />}
            <br />
            {convertedPNG && (
                <>
                    <img src={convertedPNG} alt="Converted" width={300} />
                    <br />
                    <button onClick={handleDownloadPNG}>Download PNG</button>
                </>
            )}
        </div>
    );
};

export default ImageConverter;
