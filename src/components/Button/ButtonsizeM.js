function ButtonSizeM({ onClick, title, primaryColor, disabled, css }) {
    return (
        <button
            className={`group relative h-16 w-64 overflow-hidden rounded-lg bg-white text-lg shadow ${
                css ? css : ''
            } ${disabled ? ` cursor-not-allowed ` : ''}`}
            onClick={onClick}
            disabled={disabled ? disabled : false}
        >
            <div
                className={`absolute inset-0 w-3  transition-all duration-[500ms] ease-out group-hover:w-full ${
                    primaryColor ? `bg-${primaryColor}` : 'bg-mainColor'
                } ${disabled ? ` !bg-transparent ` : ''}`}
            ></div>
            <span
                className={`relative  text-2xl group-hover:text-white font-semibold ${
                    primaryColor ? `text-${primaryColor}` : 'text-mainColor'
                } ${
                    disabled
                        ? ` !text-textColor group-hover:text-textColor `
                        : ''
                }`}
            >
                {title}
            </span>
        </button>
    );
}

export default ButtonSizeM;
