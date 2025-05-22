function ButtonText({ onClick, title, primaryColor, disabled, css }) {
    return (
        <div
            className={`font-semibold mr-16 relative w-max group hover:cursor-pointer ${
                css ? css : ''
            }`}
            onClick={onClick}
        >
            <div className="px-1 text-white relative z-10 ">{title}</div>
            <span
                className={`absolute left-0 -bottom-1 w-full px-8 h-1 transition-all group-hover:h-full ${
                    primaryColor ? `bg-${primaryColor}` : 'bg-mainColor'
                } group-hover:pt-12 group-hover:rounded-tr-xl group-hover:rounded-tl-xl `}
                style={{ zIndex: 0 }}
            ></span>
        </div>
    );
}

export default ButtonText;
