import { FC } from "react";

import 'react-slideshow-image/dist/styles.css';
import { Zoom } from 'react-slideshow-image';
import styles from './ProductSlideshow.module.css'

interface Props {
    images: string[];
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Zoom scale={1.4} indicators={true} duration={ 7000 } >
    {/* <Slide
        easing="ease"
        duration={ 7000 }
        indicators
    > */}
        {
            images.map( image => {
                const url = `/products/${ image }`;
                return (
                       
                    <div className={ styles['each-slide'] } key={ image } >
                        <div style={{
                            backgroundImage: `url(${ url })`,
                            backgroundSize: 'cover'
                        }}>
                            

                        </div>
                    </div>
                        
                )
            })
        }

    {/* </Slide> */}
    </Zoom>
  )
}
