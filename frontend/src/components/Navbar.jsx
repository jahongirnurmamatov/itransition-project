import { IoSearchOutline } from "react-icons/io5";

function Navbar() {
  return (
    <div className="mx-12 px-5">
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-white">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200">
            <div className="bg-white h-16 justify-between items-center mx-auto px-4 flex">
              <div className="ml-60">
                <p className="text-3xl text-blue-600 font-semibold">My<span className="text-blue-900 text-3xl font-extrabold">Forms</span></p>
              </div>
              <div className="lg:block mr-auto ml-40 hidden relative max-w-xs">
                <p className="pl-3 items-center flex absolute inset-y-0 left-0 pointer-events-none">
                  <span className="justify-center items-center flex">
                    <span className="justify-center items-center flex">
                      <span className="items-center justify-center flex">
                        <IoSearchOutline className="h-6 w-6 text-inherit" />
                      </span>
                    </span>
                  </span>
                </p>
                <input
                  placeholder="Type to search"
                  type="search"
                  className="border border-gray-300 focus:ring-indigo-600
              focus:border-indigo-600 sm:text-sm w-full rounded-lg pt-2 pb-2 pl-10 px-3 py-2"
                />
              </div>
              <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
                <div className="relative">
                  <p
                    className="pt-1 pr-1 pb-1 pl-1 bg-white text-gray-700 rounded-full transition-all duration-200
                hover:text-gray-900 focus:outline-none hover:bg-gray-100"
                  >
                    <span className="items-center justify-center flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2rem"
                        height="1.2rem"
                        viewbox="0 0 456.147 456.147"
                        style={{ enableBackground: "new 0 0 456.147 456.147" }}
                      >
                        <g>
                          <path d="M445.666,4.445c-4.504-4.858-11.756-5.954-17.211-2.19L12.694,290.14c-3.769,2.609-5.878,7.012-5.555,11.586 c0.323,4.574,3.041,8.635,7.139,10.686l95.208,47.607l37.042,86.43c1.78,4.156,5.593,7.082,10.064,7.727 c0.621,0.091,1.242,0.136,1.856,0.136c3.833,0,7.506-1.697,9.989-4.701l38.91-46.994l107.587,52.227 c1.786,0.867,3.725,1.306,5.663,1.306c1.836,0,3.674-0.393,5.384-1.171c3.521-1.604,6.138-4.694,7.146-8.432L448.37,18.128 C449.314,14.629,449.878,8.988,445.666,4.445z M343.154,92.883L116.681,334.604l-71.208-35.603L343.154,92.883z M162.003,416.703 l-27.206-63.48L359.23,113.665L197.278,374.771c-0.836,0.612-1.634,1.305-2.331,2.146L162.003,416.703z M312.148,424.651 l-88.604-43.014L400.427,96.462L312.148,424.651z" />
                        </g>
                      </svg>
                    </span>
                  </p>
                </div>
                <div className="relative">
                  <p
                    className="pt-1 pr-1 pb-1 pl-1 bg-white text-gray-700 rounded-full transition-all duration-200
                hover:text-gray-900 focus:outline-none hover:bg-gray-100"
                  >
                    <span className="justify-center items-center flex">
                      <span className="justify-center items-center flex">
                        <span className="items-center justify-center flex">
                          <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewbox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4
                        0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6
                        0H9"
                            />
                          </svg>
                        </span>
                      </span>
                    </span>
                  </p>
                  <p
                    className="px-1.5 py-0.5 font-semibold text-xs items-center bg-indigo-600 text-white rounded-full inline-flex
                absolute -top-px -right-1"
                  >
                    2
                  </p>
                </div>
                <div className="justify-center items-center flex relative">
                  <img
                    src="data:image/jpeg;base64,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"
                    className="object-cover btn- h-9 w-9 rounded-full mr-2 bg-gray-300"
                    alt=""
                  />
                  <p className="font-semibold text-sm">John Doe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
