const Loader = () => {
    return (
        <div className="w-12 mx-auto my-8">
            <svg
                className="animate-spin h-12 w-12 text-white border-t-2 border-black border-solid rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.5" />
            </svg>
            {/* <span className="sr-only">Loading...</span> */}
        </div>
    )
}

export default Loader;