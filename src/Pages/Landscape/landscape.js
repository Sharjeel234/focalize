import React, { useState, useEffect } from 'react';
import Quote from '../../Components/Quote/quote';
import './landscape.css';
import { FiRefreshCcw } from 'react-icons/fi';

const numImagesAvailable = 988;
const numItemsToGenerate = 1;
const imageWidth = 1920;
const imageHeight = 1080;
const collectionId = 30697288;

function renderGalleryItem(randomNumber) {
    fetch(
        `https://source.unsplash.com/collection/${collectionId}/${imageWidth}x${imageHeight}/?sig=${randomNumber}`
    ).then((response) => {
        let body = document.querySelector("body");
        body.style.backgroundImage = `url(${response.url})`;
    });
}

const Landscape = () => {
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
        renderGalleryItem(randomImageIndex);

        return () => {
            let body = document.querySelector("body");
            body.style.backgroundImage = "";
        };
    }, []);

    const refreshImage = () => {
        let randomImageIndex = Math.floor(Math.random() * numImagesAvailable)
        renderGalleryItem(randomImageIndex);
        setRefresh((prev) => !prev);
    }
    
    return (
        <>
            <Quote refresh={refresh} />

            <button
                className='refresh_btn'
                style={{ position: "absolute", top: "2rem", right: "7rem" }}
                onClick={refreshImage}
            >
                <FiRefreshCcw />
            </button>
        </>
    );
}

export default Landscape;