import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';

const PostImages =({images}) => {

    const [showImagesZoom, setShowImagesZoom] = useState(false);
    const onZoom = useCallback(() => {

    })
    if(images.length === 1){
        return (
            <>
                <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom}/>
            </>
        )
    }
    if(images.length === 2){
        return (
            <>
                <img width="50%" role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom}/>
                <img width="50%" role="presentation" src={images[1].src} alt={images[1].src} onClick={onZoom}/>
            </>
        )
    }
    return (
        <>
            <img width="50%" role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom}/>
            <img width="50%" role="presentation" src={images[1].src} alt={images[1].src} onClick={onZoom}/>
        </>
    )
}

export default PostImages;