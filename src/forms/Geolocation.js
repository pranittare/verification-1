import React, { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { connect } from 'react-redux';
import stamp from '../assets/stamp.jpeg'

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
                setAudio(url)
            })
            .catch((error) => {
                alert('Audio not found')
            });
    }
    const viewImages = (key, pincode) => {
        const filePath = `forms/${pincode}/${key}/images`
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
            }).catch((error) => {
                // Uh-oh, an error occurred!
            });
    }
    const handleDeleteImage = (item, index) => {
        let text = "Are you Sure?"
        console.log('delete', item, index)
        const desertRef = ref(storage, item);
        if (window.confirm(text) == true) {
            deleteObject(desertRef).then(res => {
                console.log('delete successfully')
                setRefresh(Math.random())
            }).catch(err => {
                console.log('err', err)
            })
        }
    }
    const toDataURL = (url, callback) => {
        let xhRequest = new XMLHttpRequest();
        xhRequest.onload = function () {
            let reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhRequest.response);
        };
        xhRequest.open('GET', url);
        xhRequest.responseType = 'blob';
        xhRequest.send();
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
    const stampAndMapBase64 = () => {
        if (stamp) {
            let datatosubmit = {stamp: '', map: ''}
            toDataURL(stamp, (dataUrl) => {
                datatosubmit.stamp = dataUrl
            });
            toDataURL(`https://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=hybrid&markers=${data?.region?.latitude},${data?.region?.longitude}&key=AIzaSyBPoGWXtGubXKV44J4D4ZsBtvY-lIBjEMU&zoom=16`, (dataUrl) => {
                datatosubmit.map = dataUrl
            });
            props.dispatch({ type: 'STAMPANDMAP', data: datatosubmit })
        }
    }
    useEffect(() => {
        if (data) {
            viewAudio(id, pincode)
            viewImages(id, pincode)
        }
    }, [data])
    useEffect(() => {
        if (images.length > 0) {
            let dataImages = []
            for (let index = 0; index < images.length; index++) {
                const item = images[index];
                toDataURL(item, (dataUrl) => {
                    dataImages.push({
                        style: 'table',
                        table: {
                            widths: [500],
                            body: [
                                [
                                    {
                                        image: dataUrl,
                                        width: 500,
                                    },
                                ]
                            ]
                        }
                    }
                    );
                    props.dispatch({ type: 'IMAGES', data: dataImages })
                })
            }
            stampAndMapBase64()
        }
    }, [images.length, refresh])

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
                    <input className='form-control' type="file" id="image-file" onChange={(e) => uploadImage(e.target.files[0])} />
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