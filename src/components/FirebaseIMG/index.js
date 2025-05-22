import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
    deleteObject,
    getStorage,
} from 'firebase/storage';
import { storage } from '~/middleware/firebase';

export function UploadImageFirebase(file) {
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
        'state_changed',
        (snapshot) => {
            console.log(snapshot);
        },
        (err) => {
            console.log(err);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url);
            });
        },
    );
}

export const getImgFilm = async (urlImg) => {
    const result = await getDownloadURL(ref(storage, `files/${urlImg}`))
        .then((url) => {
            console.log(url);
            return url;
        })
        .catch((error) => {
            console.log(error);
        });
    return result;
};

export async function deleteImageFirebase(anhtitle) {
    const storage = getStorage();
    const img = ref(storage, `files/${anhtitle}`);

    deleteObject(img)
        .then(() => {
            console.log('deleted successfully');
        })
        .catch((error) => {
            console.log(error);
        });
}
