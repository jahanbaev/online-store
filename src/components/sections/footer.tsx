import React, { FC } from 'react'

const Footer : FC = () =>{
    return <div className='footer bg-slate-900 w-full h-40 flex-col text-white flex p-5 items-center'>
    <div className='w-full h-full flex items-center pb-5'>
        <img src="https://app.rs.school/static/images/logo-rsschool3.png" className="w-32 h-11 contrast-0 mr-auto" alt="" />
        <p>Github: jahanbaev</p>
    </div>
    <p className='text-xl opacity-70'>RS school 2022-2023</p>
</div>
}

export default Footer