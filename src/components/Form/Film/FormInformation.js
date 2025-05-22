import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { updateFilm } from '~/axiosAPI/filmsApi';
import DatePickerComp from '~/components/DatePicker/DatePickerComp';
import SelectCompHookForm from '~/components/Select/SelectCompHookForm';
import UploadComp from '~/components/Upload/UploadComp';
import { storage } from '~/middleware/firebase';
import { YupFilmInformation } from '~/yups/yupFilm';
import ButtonSizeM from '../../Button/ButtonsizeM';
import InputText from '../../Input/InputText';
import { deleteImageFirebase } from '~/components/FirebaseIMG';
import moment from 'moment';

function FormInformation({
    maphim,
    setResult,
    setMessage,
    types,
    handlerUploadImage,
    fileList,
    setFileList,
}) {
    const form = YupFilmInformation(maphim);
    const [check, setCheck] = useState(true);
    const imgRef = useRef();

    useEffect(() => {
        if (form.getValues('anhtitle') !== undefined && check === true) {
            const getImgFilm = async () => {
                await getDownloadURL(
                    ref(storage, `files/${form.getValues('anhtitle')}`),
                )
                    .then((url) => {
                        if (url) {
                            setFileList(() => [
                                {
                                    uid: '1',
                                    name: form.getValues('anhtitle'),
                                    status: 'done',
                                    url: url,
                                },
                            ]);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };
            getImgFilm();
            setCheck(false);
        }
    }, [form.getValues('anhtitle'), check]);
    // useEffect(() => {
    //     if (form.getValues('theloaiphim') !== undefined) {
    //         return form.getValues('theloaiphim').reduce((arr, current) => {
    //             return [...arr, current.matheloaiphim];
    //         }, []);
    //     }
    // }, [form.getValues('theloaiphim')]);

    const handleEditFilm = async () => {
        const response = await updateFilm({
            id: maphim,
            tenphim: form.getValues('tenphim'),
            thoiluongchieu: form.getValues('thoiluongchieu'),
            ngaybatdauchieu: moment(form.getValues('ngaybatdauchieu')).format(
                'YYYY-MM-DD',
            ),
            ngonngu: form.getValues('ngonngu'),
            daodien: form.getValues('daodien'),
            dienvien: form.getValues('dienvien'),
            mota: form.getValues('mota'),
            anhtitle: form.getValues('anhtitle'),
            dotuoixem: form.getValues('dotuoixem'),
            trailer: form.getValues('trailer'),
            sdt: form.getValues('sdt'),
            theloaiphim: form.getValues('theloaiphim'),
        });
        if (response) {
            if (response.status === 200) {
                handlerUploadImage(fileList.file);
                // await deleteImageFirebase(form.getValues('anhtitle'));
                setResult(1);
                setMessage(response.data.message);
                navigator('/staff/films');
            } else {
                setResult(2);
                setMessage(response.response.data.message);
            }
        } else {
            setResult(3);
            setMessage('Thêm phim thất bại');
        }
    };

    const onSubmit = () => {
        console.log('type', form.getValues('theloaiphim'));
        // handleEditFilm();
    };

    return (
        <>
            {form && form.getValues('anhtitle') && fileList && (
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="px-10">
                            <InputText
                                labelText={'Tên phim'}
                                name="tenphim"
                                placeholderText="Nhập tên phim..."
                                css={'text-mainColor font-semibold'}
                            />
                            <InputText
                                labelText={'Thời lượng chiếu'}
                                name="thoiluongchieu"
                                placeholderText="Nhập thời lượng chiếu..."
                                css={'text-mainColor font-semibold'}
                            />
                            <DatePickerComp
                                name="ngaybatdauchieu"
                                labelText={'Chọn ngày chiếu'}
                                placeholder={'ngày chiếu'}
                                css={'text-mainColor font-semibold'}
                            />
                            <InputText
                                labelText={'Ngôn ngữ'}
                                name="ngonngu"
                                placeholderText="Nhập ngôn ngữ..."
                                css={'text-mainColor font-semibold'}
                            />
                            <InputText
                                labelText={'Đạo diễn'}
                                name="daodien"
                                placeholderText="Nhập đạo diễn..."
                                css={'text-mainColor font-semibold'}
                            />
                            <InputText
                                labelText={'Diễn viên'}
                                name="dienvien"
                                placeholderText="Nhập diễn viên..."
                                css={'text-mainColor font-semibold'}
                            />
                            <InputText
                                labelText={'Mô tả'}
                                name="mota"
                                placeholderText="Nhập mô tả..."
                                typeComponent={'textarea'}
                                css={'text-mainColor font-semibold'}
                            />
                            <UploadComp
                                name={'anhtitle'}
                                labelText={'Chọn ảnh phim'}
                                setFileList={setFileList}
                                css={'text-mainColor font-semibold'}
                                fileList={fileList}
                            />
                            <InputText
                                labelText={'Độ tuổi xem'}
                                name="dotuoixem"
                                placeholderText="Nhập độ tuổi xem..."
                                css={'text-mainColor font-semibold'}
                            />
                            <InputText
                                labelText={'Trailer'}
                                name="trailer"
                                placeholderText="Nhập trailer..."
                                css={'text-mainColor font-semibold'}
                            />
                            <SelectCompHookForm
                                labelText={'Thể loại'}
                                name={'theloaiphim'}
                                options={types}
                                css={'text-mainColor font-semibold'}
                            />
                        </div>
                        <div className=" text-center mt-10 bg-bgsecondary py-4 rounded-bl-3xl rounded-br-3xl">
                            <ButtonSizeM title="Tạo" />
                        </div>
                    </form>
                </FormProvider>
            )}
        </>
    );
}

export default FormInformation;
