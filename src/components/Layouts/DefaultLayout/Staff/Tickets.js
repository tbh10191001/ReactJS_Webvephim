import {
    faChevronLeft,
    faChevronRight,
    faCircleCheck,
    faCircleInfo,
    faClose,
    faTicket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'moment';
import { useEffect, useState } from 'react';
import AlertNoti from '~/components/Notifications/alertNoti';
import { getAccessToken } from '~/cookies/cookies';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { deleteTicket, getTickets } from '~/axiosAPI/ticketApi';

function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [check, setCheck] = useState(false);
    useEffect(() => {
        const getStikets = async () => {
            try {
                const token = getAccessToken();
                const response = await getTickets({
                    token,
                });
                if (response) {
                    if (response.status === 200) {
                        setTickets(response.data.data);
                        setCheck(true);
                    } else {
                        setDesc(response.response.data.message);
                        setType('error');
                        setIsSuccess(true);
                    }
                }
            } catch (err) {
                console.log(err);
                setDesc('Server đang xảy ra lỗi');
                setType('error');
                setIsSuccess(true);
            }
        };
        getStikets();
    }, []);
    useEffect(() => {
        if (tickets !== undefined) {
            setPageCount(Math.ceil(tickets.length / ticketPerPage));
        }
    }, [check]);
    console.log(tickets);
    let [type, setType] = useState('');
    let [desc, setDesc] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const ticketPerPage = 4;
    const pageVisited = pageNumber * ticketPerPage;
    const [pageCount, setPageCount] = useState(0);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const navigator = useNavigate();
    const handleTicketInfo = (ticket) => {
        navigator(`/staff/ticket/${ticket.mave}`);
    };

    return (
        <div className="bg-bgmain h-screen w-full">
            <p className="text-white font-semibold pt-10 text-6xl text-center">
                Quản lí vé
            </p>
            <div className="pr-10 mt-10">
                {tickets
                    .slice(pageVisited, pageVisited + ticketPerPage)
                    .map((ticket, index) => (
                        <div className="text-black font-semibold border relative pl-12 border-yellow ml-20 bg-stone flex justify-between items-center mt-10 first:mt-0 hover:shadow-3xl hover:scale-[1.02]">
                            <FontAwesomeIcon
                                icon={faTicket}
                                className="text-yellow text-9xl absolute rotate-90 -left-20"
                            />
                            <div className="">
                                <p className="mt-2">Mã vé: {ticket.mave}</p>
                                <p className="my-4">
                                    Tên phim: {ticket.tenphim}
                                </p>
                                <p className="mb-2">
                                    Suất chiếu phim:{' '}
                                    {Moment(ticket.thoigianbatdau).format(
                                        'hh:mm:ss DD/MM/YYYY',
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center h-full">
                                {ticket.trangthaive === 0 ? (
                                    <div className="w-5 h-5 bg-yellow rounded-full mr-4"></div>
                                ) : ticket.trangthaive === 1 ? (
                                    <div className="w-5 h-5 bg-btGreen rounded-full mr-4"></div>
                                ) : (
                                    <div className="w-5 h-5 bg-mainColor rounded-full mr-4"></div>
                                )}
                                <div className="border-l border-textColor flex items-center gap-4 px-2">
                                    <button
                                        onClick={() => handleTicketInfo(ticket)}
                                        className="px-4 py-2 h-fit bg-yellow rounded-full opacity-100 hover:text-yellow hover:bg-white"
                                    >
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                <div className="w-full flex justify-center mt-10 font-semibold ">
                    <ReactPaginate
                        previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                        nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        previousClassName="text-white px-6 bg-mainColor rounded-full hover:text-mainColor hover:bg-white"
                        containerClassName="text-center text-white flex gap-6"
                        nextClassName="text-white px-6 bg-mainColor rounded-full hover:text-mainColor hover:bg-white"
                        activeClassName="text-mainColor "
                    />
                </div>
            </div>

            {isSuccess && (
                <div
                    className={`fixed z-20 right-4 top-24 ${
                        isSuccess
                            ? 'animate-[sildeInRight_1s_ease-in-out]'
                            : 'animate-[hide_1s_ease-in-out]'
                    }`}
                >
                    <AlertNoti type={type} desc={desc} />
                </div>
            )}
        </div>
    );
}

export default Tickets;
