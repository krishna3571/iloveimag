
import React, { useEffect, useRef, useState } from 'react';

export default function Resize() {
    const [image, setImage] = useState('');
    const [w, setW] = useState(100);
    const [h, setH] = useState(100);
    const filechange = useRef(null);
    const [visible, setVisible] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(1);
    const [maintainRatio, setMaintainRatio] = useState(false);

    const handalsubmit = () => {
        filechange.current.click();
        setVisible(true);
    };

    const handalheight = (e) => {
        setH(e.target.value);
        if (maintainRatio) {
            setW(aspectRatio * e.target.value);
        }
    };

    const handalwidth = (e) => {
        setW(e.target.value);
        if (maintainRatio) {
            setH(e.target.value / aspectRatio);
        }
    };

    const handleDownload = () => {
        if (!image || !visible) {
            alert('Please select an image and resize it first.');
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = image;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, w, h);

            // Convert canvas image to a data URL
            const resizedDataURL = canvas.toDataURL('image/jpeg');

            // Create a download link
            const a = document.createElement('a');
            a.href = resizedDataURL;
            a.download = 'resized_image.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
    };

    const handleMaintainRatio = (e) => {
        setMaintainRatio(e.target.checked);
    };

    const handalImage = (element) => {
        var reader = new FileReader();

        //Read the contents of Image File.
        reader.readAsDataURL(element.target.files[0]);
        reader.onload = (e) => {
            //Initiate the JavaScript Image object.
            var image = new Image();

            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            setImage(image.src);

            //Validate the File Height and Width.
            image.onload = function () {
                var height = this.height;
                var width = this.width;
                let aspectRatio = width / height;
                setAspectRatio(aspectRatio);
            };
        };
    };

    return (
        <>
            <div>
                <input type="file" onChange={handalImage} ref={filechange} style={{ display: 'none' }} />
                <button onClick={handalsubmit}>select image</button>
                <br />
            </div>
            <br />

            {visible && (
                <div>
                    widht:
                    <input type="number" value={w} onChange={handalwidth} />
                    <br />
                    height:
                    <input type="number" value={h} onChange={handalheight} />
                    <br />
                    maintain ratio:
                    <input type="checkbox" checked={maintainRatio} onChange={handleMaintainRatio} />
                    <br />
                    <img src={image} style={{ width: w + 'px', height: h + 'px' }} />
                </div>
            )}
            <br />
            <br />
            <button onClick={handleDownload}>Download Resized Image</button>
        </>
    );
}
