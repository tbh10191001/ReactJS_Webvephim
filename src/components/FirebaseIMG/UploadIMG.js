import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/middleware/firebase';
import { ref } from 'firebase/storage';
import { useState } from 'react';

function UploadIMG(file) {
    const [progress, setProgress] = useState(0);

    const handlerUpload = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        UploadIMG(file);
    };

    function UploadIMG(file) {
        console.log(file);
        if (!file) return;
        if (file.type !== 'image/jpeg') {
            console.log('Sai dinh dang');
            return;
        }
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const proq = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                );
                setProgress(progress);
            },
            (err) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) =>
                    console.log(url),
                );
            },
        );
    }

    return (
        <div className="App">
            {/* <Header /> */}
            <form className="mt-20" onSubmit={handlerUpload}>
                <input type="file" />
                <button type="submit">Submit</button>
            </form>
            <h1>Upload {progress}</h1>
        </div>
    );
}

export default UploadIMG;
