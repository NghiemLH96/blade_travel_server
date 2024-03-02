import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//congif firebase
const firebaseConfig = {
    apiKey: "AIzaSyAFNkFtJ91GJKq2cLFtTdGuC9hPu4Bra1Y",
    authDomain: "blade-firebase.firebaseapp.com",
    projectId: "blade-firebase",
    storageBucket: "blade-firebase.appspot.com",
    messagingSenderId: "633194441848",
    appId: "1:633194441848:web:1feaff23fd3776966d118d",
    measurementId: "G-WT770FKWJ0"
  };

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadFileToStorage(file, folderName, bufferData = undefined) {
    console.log("file",file)
    // nếu file là null thì không làm gì hết
    if (!file) {
        return false
    }

    let fileRef;
    let metadata;
    if (!bufferData) {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + Math.random() * Date.now() + "."  + file.type.split('/')[1]);
    } else {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + `${Date.now() * Math.ceil(Math.random())}` + file.originalname);
        metadata = {
            contentType: file.mimetype,
        };
    }
    let url;
    if (bufferData) {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, bufferData, metadata).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    } else {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, file).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    }

    return url
}