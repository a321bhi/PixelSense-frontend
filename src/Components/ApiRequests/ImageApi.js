// export const getImages = async () => {
//     await axios.get( baseUrl+"/media/getAll",
//     {
//         headers: { 
//           "Authorization":userCtx.token
//         }
//     },
//     ).then(response=>{setArr(response.data);}).catch(err=>console.log(err))
//   };
//   export const deleteImage = async (event,mediaId) => {
//     event.preventDefault();
//     var bodyFormData = new FormData();
//     bodyFormData.append('mediaId', mediaId);
//     await axios.post( baseUrl+"/media/deleteOneMedia",
//     bodyFormData,
//     {
//         headers: { 
//           "Authorization":userCtx.token
//         }
//     },
//     ).then(response=>{modalCloseButtonHandle.current.click();}).catch(err=>console.log(err));
//     return 
//   };
//   export const unlikeImage = async (event,mediaId) => {
//     event.preventDefault();
//     var bodyFormData = new FormData();
//     bodyFormData.append('mediaId', mediaId);
//     await axios.post(baseUrl+"/media/unlikeMedia",
//     bodyFormData,
//     {
//         headers: { 
//           "Authorization":userCtx.token
//         }
//     },
//     ).then(response=>{console.log("unliked media");
//   }).catch(err=>console.log(err));
//   };
//   export const likeImage = async (event,mediaId) => {
//     event.preventDefault();
//     var bodyFormData = new FormData();
//     bodyFormData.append('mediaId', mediaId);
//     await axios.post( baseUrl+"/media/likeMedia",
//     bodyFormData,
//     {
//         headers: { 
//           "Authorization":userCtx.token
//         }
//     },
//     ).then(response=>{console.log("Liked media");
//     getImages();
//   }).catch(err=>console.log(err));
//   };