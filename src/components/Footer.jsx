const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-10 flex justify-between items-center flex-col gap-8 xl:flex-row">
          {/* Logo & Links */}
          <div className="flex items-center flex-col xl:flex-row">
            <ul className="text-lg flex items-center flex-col md:flex-row py-8 gap-6 md:gap-12 xl:border-l border-gray-200 dark:border-gray-700 xl:ml-11 xl:pl-11">
              <li>
                <a
                  href="#"
                  className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="sm:justify-center">
            <a
              href="https://x.com/oxsiju"
              className="group w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600 flex justify-center items-center hover:border-indigo-600 dark:hover:border-indigo-400"
            >
              <svg
                className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
