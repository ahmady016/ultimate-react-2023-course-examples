import React from 'react'
import { Link } from 'react-router-dom'

import { navLinks } from './navLinks'

const Footer: React.FC = () => (
    <footer className="bg-white shadow dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Part One Fundamentals™</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                {Object.entries(navLinks)
                    .map(([key, value]) => (
                        <li key={key} className="mx-2 hover:text-white">
                            <Link to={key}>{value}</Link>
                        </li>
                    )
                )}
            </ul>
        </div>
    </footer>
)

export default Footer
