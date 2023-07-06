import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinimize, faUpDownLeftRight, faCropSimple, faFileImage } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import './Main.css'
import { useNavigate } from "react-router-dom";


export default function Mainpage() {
    const navigate = useNavigate();
    return (
        <>
            <Header />

            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-lg-3  p-1' onClick={() => navigate("/com")}>
                        <div className='box1'>
                            <FontAwesomeIcon icon={faMinimize} style={{ color: "#b6bf36", }} className='compress' />
                            <h4 className='mt-3'>Compress IMAGE</h4>
                            <p className='mt-2'>Compress <strong>JPG</strong>, <strong>PNG</strong>, <strong>SVG</strong>, and <strong>GIFs</strong> while saving space and maintaining quality.</p>
                        </div>
                    </div>
                    <div className='col-lg-3  p-1 ' onClick={() => navigate('/res')}>
                        <div className='box1'>
                            <FontAwesomeIcon icon={faUpDownLeftRight} style={{ color: "#b6bf36", }} className='compress' />
                            <h4 className='mt-3'>Resize IMAGE</h4>
                            <p className='mt-2'>Define your dimensions, by percent or pixel, and resize your <strong>JPG</strong>, <strong>PNG</strong>, <strong>SVG</strong>, and <strong>GIF</strong> images.</p>
                        </div>
                    </div>
                    <div className='col-lg-3  p-1 ' onClick={() => { navigate('./crop') }}>
                        <div className='box1'>
                            <FontAwesomeIcon icon={faCropSimple} style={{ color: "#b6bf36", }} className='compress' />
                            <h4 className='mt-3'>Crop IMAGE</h4>
                            <p className='mt-2'>Crop <strong>JPG</strong>, <strong>PNG</strong>, or <strong>GIFs</strong> with ease; Choose pixels to define your rectangle or use our visual editor.</p>  </div>
                    </div>
                    <div className='col-lg-3   p-1' onClick={() => { navigate('./jpg') }}>
                        <div className='box1'>
                            <FontAwesomeIcon icon={faFileImage} style={{ color: "#b6bf36", }} className='compress' />
                            <h4 className='mt-3'>Convert to JPG</h4>
                            <p className='mt-2'>Turn <b>PNG</b>, <b>GIF</b>, <b>TIF</b>, <b>PSD</b>, <b>SVG</b>, <b>WEBP</b>, <b>HEIC</b>, or <b>RAW</b> format images to JPG in bulk with ease.</p>    </div>
                    </div>
                </div>
            </div>
            <div className='container '>
                <div className='row'>
                    <div className='col-lg-3  p-1' onClick={() => { navigate('./png') }}>
                        <div className='box1'>
                            <FontAwesomeIcon icon={faMinimize} style={{ color: "#b6bf36", }} className='compress' />
                            <h4 className='mt-3'>Convert from JPG</h4>
                            <p className='mt-2'>Turn <b>JPG</b> images to <b>PNG</b> and <b>GIF</b>. Choose several <b>JPGs</b> to create an <b>animated GIF</b> in seconds!</p>
                        </div>
                    </div>
                    <div className='col-lg-3  p-1 ' onClick={() => { navigate('./edit') }}>
                        <div className='box1'>
                            <FontAwesomeIcon icon={faUpDownLeftRight} style={{ color: "#b6bf36", }} className='compress' />
                            <h4 className='mt-3'>Photo editor</h4>
                            <p className='mt-2'>Spice up your pictures with text, effects, frames or stickers. Simple editing tools for your image needs.</p>
                        </div>
                    </div>
                    <div className='col-lg-3  p-1 ' onClick={() => { navigate('./water') }}>
                        <div className='box1'>
                            <FontAwesomeIcon icon={faCropSimple} style={{ color: "#b6bf36", }} className='compress' />
                            <h4 className='mt-3'>Watermark IMAGE</h4>
                            <p className='mt-2'>Crop <strong>JPG</strong>, <strong>PNG</strong>, or <strong>GIFs</strong> with ease; Choose pixels to define your rectangle or use our visual editor.</p>  </div>
                    </div>
                    <div className='col-lg-3   p-1'>
                        <div className='box1'>
                            <FontAwesomeIcon icon={faFileImage} style={{ color: "#b6bf36", }} className='compress' />
                            <h4 className='mt-3'>Meme generator</h4>
                            <p className='mt-2'>Create your memes online with ease. Caption meme images or upload your pictures to make custom memes.</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
