
import {useRef, useState, useCallback, useEffect} from "react";
import Cropper from 'react-easy-crop';
import getCroppedImg from './Easy-crop-functions'
import config from '../../../../config.json';

import 'react-easy-crop/react-easy-crop.css';





function ProfilePictureEditor(props){




    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [image, setImage] = useState(config.server_address+"/images/profile_pictures/" + props.value.slug + ".webp");
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [rotation] = useState(0)
    const [cropping, setCropping] = useState(null);

    const fileInputRef = useRef(null);
    const pictureRef = useRef(null);
    const pictureButtonRef = useRef(null)



    function updatePicture(event){

        const reader = new FileReader();
        if(event !== null){
            reader.readAsDataURL(event.target.files[0])
        }

        reader.onload = function(e) {
            setImage(reader.result);
        };


    }





    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
        try {


         const  croppedImage = await getCroppedImg(
                image,
                croppedAreaPixels,
                rotation
            )
           pictureRef.current.value = croppedImage;;
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation]);



    useEffect(()=>{

        if(props.value.slug !== undefined){
        const  croppedImage = async() =>{

          let img =  await getCroppedImg(
                image,
                {width: 500, height: 500, x: 0, y:0},
                rotation
            )


            pictureRef.current.value = img;

        }

        croppedImage();



        }
    },[])


   return(<div><div style={{position: 'relative'}}>

        <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            showGrid={false}

        />
        <div className="controls">
            <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => {
                    setZoom(e.target.value)
                }}
                className="zoom-range"

            />
        </div>
        <input name="profile_picture" type="text" ref={pictureRef} className="d-none" />
        <button type="button" onClick={function(){showCroppedImage(); setCropping(false); props.value.state.setCropped(true)}} ref={pictureButtonRef} className={"btn btn-success w-100 " + (!cropping ?"d-none":"d-block")}>Mentés</button>

    </div><input type="file" ref={fileInputRef} onChange={function(event){updatePicture(event, setImage); setCropping(true)}} className={"form-control " + (cropping ?"d-none":"d-block")}/></div>);



}
export default ProfilePictureEditor;