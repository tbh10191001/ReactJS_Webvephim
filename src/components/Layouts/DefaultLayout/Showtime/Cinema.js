function Cinema({ cinema }) {
    return (
        <>
            {cinema &&
                cinema.map((item, index) => (
                    <div key={index} className="col-span-1">
                        <div className="p-10 bg-bgsecondary shadow-3xl">
                            <p className="text-white text-3xl font-semibold">
                                Filmax Cinema
                            </p>
                            <p className="text-textColor text-lg mt-4">
                                {item.cinema}
                            </p>
                        </div>
                    </div>
                ))}
        </>
    );
}

export default Cinema;
