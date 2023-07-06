import React, { useState, useRef, useEffect } from 'react';
import { compress } from 'image-conversion';
import Chart from 'react-apexcharts';

const Compress = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [originalSize, setOriginalSize] = useState('');
    const [compressedImage, setCompressedImage] = useState(null);
    const [compressedSize, setCompressedSize] = useState('');
    const [compressionPercentage, setCompressionPercentage] = useState(0);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setCompressionPercentage(calculateCompressionPercentage());
    }, [originalSize, compressedSize]);

    const handleImageUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileSelection = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        setOriginalSize(formatBytes(file.size));
        compressImage(file);
    };

    const compressImage = async (file) => {
        const compressedFile = await compress(file, { quality: 0.8 });
        setCompressedImage(URL.createObjectURL(compressedFile));
        setCompressedSize(formatBytes(compressedFile.size));
    };

    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const calculateCompressionPercentage = () => {
        if (!originalSize || !compressedSize) return 0;
        const originalBytes = parseFloat(originalSize.split(' ')[0]);
        const compressedBytes = parseFloat(compressedSize.split(' ')[0]);
        return Math.round(((originalBytes - compressedBytes) / originalBytes) * 100);
    };

    const handleDownload = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = compressedImage;
        downloadLink.download = 'compressed_image.jpg';
        downloadLink.click();
    };

    const chartOptions = {
        series: [compressionPercentage],
        options: {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: '70%',
                        background: '#fff',
                    },
                    dataLabels: {
                        showOn: 'always',
                        name: {
                            offsetY: -10,
                            show: true,
                            color: '#888',
                            fontSize: '17px',
                        },
                        value: {
                            color: '#111',
                            fontSize: '36px',
                            show: true,
                            formatter: (val) => `${val}%`,
                        },
                    },
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    shadeIntensity: 0.4,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 53, 91],
                },
            },
        },
    };

    return (
        <div>
            <h1>Image Uploader</h1>
            <button onClick={handleImageUpload}>Select Image</button>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileSelection}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            {selectedImage && (
                <div>
                    <h2>Original Image</h2>
                    <p>Size: {originalSize}</p>
                </div>
            )}
            {compressedImage && (
                <div>
                    <h2>Compressed Image</h2>
                    <img src={compressedImage} alt="Compressed" />
                    <p>Size: {compressedSize}</p>
                    <button onClick={handleDownload}>Download</button>
                    <Chart options={chartOptions.options} series={chartOptions.series} type="radialBar" height={350} />
                </div>
            )}
        </div>
    );
};

export default Compress;

