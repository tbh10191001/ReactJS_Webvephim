import * as yup from 'yup';

export const SchemaCreate = () => {
    const schema = yup.object().shape({
        tenphim: yup.string().required('Tên phim không được bỏ trống'),
        thoiluongchieu: yup
            .number()
            .min(60, 'Thời lượng phim phải lớn hơn 60 phút')
            .required('Thời lượng phim không được bỏ trống'),
        ngaybatdauchieu: yup
            .string()
            .required('Ngày bắt đầu chiếu không được bỏ trống'),
        ngonngu: yup.string().required('Ngôn ngữ không được bỏ trống'),
        daodien: yup.string().required('Đạo diễn không được bỏ trống'),
        dienvien: yup.string().required('Diễn viên không được bỏ trống'),
        mota: yup.string().required('Mô tả không được bỏ trống'),
        anhtitle: yup.string().required('Ảnh không được bỏ trống'),
        dotuoixem: yup
            .number()
            .min(3, 'Trẻ em phải trên 3 tuổi')
            .required('Độ tuổi xem không được bỏ trống'),
        trailer: yup.string().required('Trailer không được bỏ trống'),
        theloaiphim: yup
            .array()
            .min(1, 'Vui lòng chọn thể loại phim')
            .required('Thể loại phim không được bỏ trống'),
    });
    return schema;
};
