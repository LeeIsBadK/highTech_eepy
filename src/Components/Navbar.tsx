const Navbar = () => {
    return (
        <>
            <div className="flex justify-between items-center min-w-120 h-20 pt-4 sm:h-20 sm:pt-0 bg-main" style={{ width: "100%" }}>
                <div className="flex justify-between items-center" style={{ width: "100%" }}>
                    <div className="flex items-center" style={{ width: "100%" }}  >
                        <a className="hidden sm:flex mx-10">
                            <img src={"./src/assets/react.svg"}
                                alt="parcel"
                                width={80}
                                height={80}
                            />
                        </a>


                        <form action="#" className="flex items-center space-x-3 ml-5" style={{ width: "100%"}}>
                            <div className="relative w-4/5 sm:w-3/5" style={{minWidth: "200px", maxWidth: "600px" }}>
                                <input className="border-gray-300 bg-white h-8 px-2 py-1 text-sm focus:outline-none font-noto-sans" style={{ borderRadius: "50px", width: "100%" }}
                                    type="text" name="search" placeholder="Search" />
                                <button type="submit" className="absolute right-0 top-0 mt-1.5 mr-5">
                                    <a>
                                        <img src={"./src/assets/react.svg"}
                                            alt="react"
                                            width={20}
                                            height={20}
                                        />
                                    </a>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}
export default Navbar;