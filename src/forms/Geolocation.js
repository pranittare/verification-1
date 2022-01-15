import React, { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { connect } from 'react-redux';
const Geolocation = (props) => {
    const { data, id, pincode } = props
    const [audio, setAudio] = useState()
    const [images, setImages] = useState([])
    const [refresh, setRefresh] = useState(0)

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
                let temp = []
                res.items.map((itemRef) => {
                    let imageRef = ref(storage, itemRef._location.path_)
                    getDownloadURL(imageRef).then((x) => {
                        temp.push(x)
                        setImages(temp)
                        setRefresh(Math.random())
                    }).catch(err => {
                        console.log('err', err)
                    })

                    // All the items under listRef.
                });
                console.log('set', temp)
            }).catch((error) => {
                // Uh-oh, an error occurred!
            });
    }
    const handleDeleteImage = (item, index) => {
        let text = "Are you Sure?"
        console.log('delete', item, index)
        const desertRef = ref(storage, item);
        if(window.confirm(text) == true){
            deleteObject(desertRef).then(res => {
                console.log('delete successfully')
                setRefresh(Math.random())
            }).catch(err => {
                console.log('err', err)
            })
        }
    }
    const uploadImage = (file) => {
        const filePath = `forms/${pincode}/${id}/images/${file.name}`
        const storageRef = ref(storage, filePath);
        const metadata = {
            contentType: 'image/jpeg',
        };
        const uploadTask = uploadBytes(storageRef, file, metadata);
        uploadTask.then(res => {
            // console.log('uploadTask', res)
            viewImages(id, pincode)
        }).catch(err => {
            console.log('uploadTask error', err)
        })
    }
    useEffect(() => {
        console.log('data', data, pincode, id)
        if (data) {
            viewAudio(id, pincode)
            viewImages(id, pincode)
        }
    }, [data])
    useEffect(() => {
        if (images.length > 0) {
            props.dispatch({ type: 'IMAGES', data: images })
        }
        console.log('images', images)
    }, [images])
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
                <div className='d-flex justify-content-center'>
                    <img src={`https://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=hybrid&markers=${data?.region?.latitude},${data?.region?.longitude}&key=AIzaSyBPoGWXtGubXKV44J4D4ZsBtvY-lIBjEMU&zoom=16`}
                        alt="" id="imagemap" />
                    <a className='mt-3' href={`http://maps.google.com/maps?q=${data?.region?.latitude} +, + ${data?.region?.longitude}" target="_blank`}>
                        <strong>
                            Latitude: {data?.region?.latitude}
                            <br />
                            Longitude: {data?.region?.longitude}
                        </strong>
                    </a>

                </div>
                <br />
                <p>{data?.locName}</p>
            </div>
            <div>
                <h5>Images</h5>
                <div className='w-50 my-2'>
                <input className='form-control' type="file" id="image-file" onChange={(e) => uploadImage(e.target.files[0])}/>
                </div>
                <div className='d-flex justify-content-between flex-wrap'>
                    {images?.map((item, index) => {
                        return <div key={item} >
                           <a href={item} target='_blank'><img src={item} /></a> 
                            <button onClick={() => handleDeleteImage(item, index)} className='btn btn-danger'>X</button>
                        </div>
                    })}

                </div>
               
            </div>


        </div>
    )
}
export default connect()(Geolocation)