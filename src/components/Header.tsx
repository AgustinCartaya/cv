import React from 'react'

const Header = () => {
  return (
    <header className="flex gap-32 bg-winter rounded-t-lg p-8 mx-6 shadow-lg">
      <div>
        <img
          className="profile__image w-60 h-60 rounded-full ml-6 shadow-lg"
          src="https://avatars.githubusercontent.com/u/49463952"
          alt="profile-picture"
        />
      </div>

      <div className="header__content flex flex-col justify-center gap-y-2 text-white">
        <h1 className="content__title text-5xl">Agustin Cartaya</h1>
        <span className="content__profession text-lg">MSc Student in Medical Imaging</span>
        <div className="flex gap-2 text-black">
          <a href='https://linkedin.com/in/agustincartaya' target='_blank' className="flex hover:bg-dark_white gap-6 rounded-md bg-white border-2 px-6 py-2">LinkedIn</a>
          <a href='https://github.com/AgustinCartaya' target='_blank' className="flex hover:bg-dark_white gap-6 rounded-md bg-white border-2 px-6 py-2">Github</a>
          <a href='/Agustin_Cartaya_CV.pdf' target='_blank' className="flex hover:bg-dark_white gap-6 rounded-md bg-white border-2 px-6 py-2">CV</a>
        </div>
      </div>
    </header>
  )
}

export default Header
