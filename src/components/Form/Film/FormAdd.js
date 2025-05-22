import moment from 'moment';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { insertFilm } from '~/axiosAPI/filmsApi';
import DatePickerComp from '~/components/DatePicker/DatePickerComp';
import SelectCompHookForm from '~/components/Select/SelectCompHookForm';
import UploadComp from '~/components/Upload/UploadComp';
import { YupFilm } from '~/yups/yupFilm';
import ButtonSizeM from '../../Button/ButtonsizeM';
import InputText from '../../Input/InputText';

function FormAdd({
    types,
    setResult,
    setMessage,
    handlerUploadImage,
    navigator,
}) {
    const form = YupFilm();
    const [fileList, setFileList] = useState([]);

    const handleAddFilm = async () => {
        const response = await insertFilm({
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
        handleAddFilm();
    };

    return (
        <>
            {types && (
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

export default FormAdd;
