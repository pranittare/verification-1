// import { store } from "../index";
const images = () =>{
 import("../index").then((index) => {
     console.log('index' ,index)
    let {store} = index;
     return store.getState().images
 })
} 
const table = {
    style: 'tableExample',
    table: {
        widths: ['auto', 'auto', 'auto', 'auto' ],
        body: [
            [images()],
            // ['One value goes here', 'Another one here', 'OK?']
        ]
    }
}
export default table;
