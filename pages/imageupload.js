// import { useState } from "react";

// export default function PrivatePage(props) {
//   const [image, setImage] = useState(null);
//   const [createObjectURL, setCreateObjectURL] = useState(null);

//   const uploadToClient = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       const i = event.target.files[0];

//       setImage(i);
//       setCreateObjectURL(URL.createObjectURL(i));
//     }
//   };

//   const uploadToServer = async (event) => {
//     const body = new FormData();
//     body.append("file", image);
//     const response = await fetch("/api/formidable", {
//       method: "POST",
//       body
//     });
//   };

//   return (
//     <div>
//       <div>
//         {createObjectURL&&<img height="500px" width="1000px" src={createObjectURL}/>}
//         <h4>Select Image</h4>
//         <input type="file" name="myImage" onChange={uploadToClient} />
//         <button
//           className="btn btn-primary"
//           type="submit"
//           onClick={uploadToServer}
//         >
//           Send to server
//         </button>
//       </div>
//     </div>
//   );
// }



// import axios from 'axios';
// import { Component } from 'react';
 
// class ImageUpload extends Component {

//   state = {
//     // for multiple images
//     images: [],

//     // for a single image
//     coverImage: null
//   };

    
//   // upload 1 image (coverImage)
//   onCoverImageChange = event => {
//     this.setState({ coverImage: event.target.files[0] });
//   };

//   // upload multiple images
//   onImagesChange = event => {
//     this.setState({ 
//         images: [...this.state.images, ...event.target.files] 
//     })
//   }

//   onFileUpload = () => {
//     let formData = new FormData();
    
//     // add coverImage to formData
//     this.state.coverImage && formData.append(
//       "coverImage",
//       this.state.coverImage,
//       this.state.coverImage.name
//     );
    
//     // add images to formData
//     if(this.state.images.length > 0){
//       for (const key of Object.keys(this.state.images)) {
//         formData.append('images', this.state.images[key])
//       }
//     }
    
//     // send formData object along with request
//     axios.post("api/multiparter", formData);
//   };
    

//   // display details of image
//   uploadData = () => {

//     if (this.state.coverImage || this.state.images.length > 0) {
//       return (
//       <div>
//         {this.state.coverImage && <div>
//           <h2>Cover image details:</h2>
//           <p>File Name: {this.state.coverImage.name}</p>    
//           <p>File Type: {this.state.coverImage.type}</p>
//         </div>}
        
//         {this.state.images.length > 0 &&
//           <div>
//             <h2>Other images details:</h2>
//             {
//               this.state.images.map((image, index) => {
//                 return <div key={index}>
//                   <p>Image {index+1}</p>
//                   <p>File Name: {image.name}</p>    
//                   <p>File Type: {image.type}</p>
//                 </div>
//               })
//             }
//           </div>
//         }
//       </div>
//       )
//     } else {
//       return (
//         <div>
//           <br />
//           <h4>No images chosen</h4>
//         </div>
//       );
//     }
//   };
    

//   render() {
//     return (
//       <div>
//         <h1>
//           Image uploading using Next.js.
//         </h1>
//         <h3>
//           Single and multiple uploads are covered
//         </h3>

//         <section>
//           <h2>Single upload</h2>
//           <div>
//             <input type="file" onChange={this.onCoverImageChange} />
//           </div>
//         </section>

//         <section>
//           <h2>Multiple upload</h2>
//           <div>
//               <input type="file" multiple onChange={this.onImagesChange} />
//           </div>
//         </section>

//         <div>
//           <button onClick={this.onFileUpload}>Upload!</button>
//         </div>

//         {this.uploadData()}
//       </div>
//     );
//   }
// }
 
// export default ImageUpload;