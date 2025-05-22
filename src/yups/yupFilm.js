import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getInfo } from '~/axiosAPI/customerApi';
import { getFilmByID } from '~/axiosAPI/filmsApi';
import customerSlice from '~/redux/customerSlice';
import staffSlice from '~/redux/staffSlice';
import { SchemaCreate } from '../schema/schemaFilm';
import moment from 'moment';

export const YupFilm = () => {
    const schema = SchemaCreate();
    const dispatch = useDispatch();
    const handleGetInformation = async () => {
        try {
            const response = await getInfo();
            if (response) {
                if (response.status === 200) {
                    if (response.data.data.role.idrole === 1) {
                        dispatch(staffSlice.actions.save(response.data.data));
                    } else {
                        dispatch(
                            customerSlice.actions.save(response.data.data),
                        );
                    }
                    return response.data.data;
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const form = useForm({
        defaultValues: async () => {
            const value = await handleGetInformation();
            if (value) {
                return {
                    tenphim: '',
                    thoiluongchieu: 0,
                    ngaybatdauchieu: '',
                    ngonngu: '',
                    daodien: '',
                    dienvien: '',
                    mota: '',
                    anhtitle: '',
                    dotuoixem: 0,
                    trailer: '',
                    sdt: value.user.sdt,
                    theloaiphim: [],
                };
            }
        },
        resolver: yupResolver(schema),
    });
    return form;
};

export const YupFilmInformation = (maphim) => {
    const schema = SchemaCreate();
    const handleGetInformation = async () => {
        try {
            const response = await getFilmByID({
                idphim: maphim,
            });
            if (response) {
                if (response.status === 200) {
                    return response.data.data;
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const form = useForm({
        defaultValues: async () => {
            const filmInfo = await handleGetInformation();
            if (filmInfo) {
                return {
                    tenphim: filmInfo.tenphim,
                    thoiluongchieu: filmInfo.thoiluongchieu,
                    ngaybatdauchieu: filmInfo.ngaybatdauchieu,
                    ngonngu: filmInfo.ngonngu,
                    daodien: filmInfo.daodien,
                    dienvien: filmInfo.dienvien,
                    mota: filmInfo.mota,
                    anhtitle: filmInfo.anhtitle,
                    dotuoixem: filmInfo.dotuoixem,
                    trailer: filmInfo.trailer,
                    sdt: filmInfo.sdt,
                    theloaiphim: filmInfo.theloaiphim,
                };
            }
        },
        resolver: yupResolver(schema),
    });
    return form;
};
