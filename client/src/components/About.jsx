import React from 'react';
import style from '../Styles/About.module.css';
import {Link} from 'react-router-dom';
import whattsappIcon from '../img/logo-whatsapp.svg';
import gitHubIcon from '../img/logo-github.svg';
import linkedInIcon from '../img/logo-linkedin.svg';

export  function About() {
    return (
    <div className={style.container}>
        <div>
            <Link className={style.link} to='/home' >
                <button className={style.backButton}>Back to countries</button>
            </Link>
        </div>
        <div>
            <a href='https://api.whatsapp.com/send?phone=543777632203'><img src={whattsappIcon} alt='icono whatsapp' className={style.imgwhatts}/></a>
        </div>
        <div>
            <a href='https://github.com/jam20582'><img src={gitHubIcon} alt='icono github' className={style.imggithub}/></a>
        </div>
        <div>
            <a href='https://www.linkedin.com/in/jam20582/'><img src={linkedInIcon} alt='icono linkedIn' className={style.imglinkedin}/></a>
        </div>
    </div>
    )
}