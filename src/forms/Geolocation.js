import React, { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";

export default function Geolocation({ data, id, pincode }) {
    const [audio, setAudio] = useState()
    const [images, setImages] = useState([])
    const [map, setMap] = useState();

    const storage = getStorage();

    const viewAudio = (key, pincode) => {
        const filePath = `forms/${pincode}/${key}/audio/newAudio`
        const storageRef = ref(storage, filePath);
        getDownloadURL(storageRef)
            .then((url) => {
                console.log('url', url)
                setAudio(url)
            })
            .catch((error) => {
                alert('Audio not found')
            });
    }
    const viewImages = (key, pincode) => {
        const filePath = `forms/${pincode}/${key}/images/`
        const storageRef = ref(storage, filePath);
        listAll(storageRef)
        .then((res) => {
            // setImages(res)
            // console.log('viewImages', res)
          res.items.map((itemRef) => {
              console.log('single', itemRef)
              getDownloadURL(storage, itemRef._location.path_).then((x) => {
                  console.log('x',x)
                setImages([...images, x])
              }).catch(err => {
                  console.log('err', err)
              })
            // All the items under listRef.
          });
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
    }
    useEffect(() => {
        console.log('data', data, pincode, id)
        if (data) {
            viewAudio(id, pincode)
            viewImages(id, pincode)
        }
    }, [data])
    return (
        <div className='w-100'>
            <h3>Geolocation and Images</h3>
            <div>
                <h5>Audio</h5>
                <a href={audio} target="_blank"
                    rel="noopener noreferrer">Play</a>
            </div>
            <div>
                <h5>Map</h5>
                <img src={`https://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=hybrid&markers=${data?.region?.latitude},${data?.region?.latitude}&key=AIzaSyBPoGWXtGubXKV44J4D4ZsBtvY-lIBjEMU&zoom=16`}
                    alt="" id="imagemap" />
                <a href={`http://maps.google.com/maps?q=${data?.region?.latitude} +, + ${data?.region?.longitude}" target="_blank`}>
                    <strong>
                        Latitude: {data?.region?.latitude}
                        <br />
                        Longitude: {data?.region?.longitude}
                    </strong>
                </a>
                <p>{data?.locName}</p>
            </div>
            <div>
                <h5>Images</h5>
                {images?.map((item, index) => {
                    return <img src={item} key={item} />
                })}
            </div>


        </div>
    )
}
