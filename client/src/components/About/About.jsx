import React from 'react';
import style from './style.module.css';

export default function About({ setAbout, about }) {
    const closeHandler = () => {
        setAbout(!about);
    };

    return (
        <div className={style.mainBox}>
            <div className={style.contentBox}>
                <div className={style.textBox}>
                    <h3>Hello! My name is Iskandar</h3>
                    <p>I'm a Full Stack JS developer</p>
                    <div onClick={closeHandler} className={style.closeBtn}>
                        <img src="./x-circle.svg" />
                    </div>
                    <div className={style.contactsBox}>
                        <p align="left">
                            <a
                                className={style.contactsBtn}
                                target="_blank"
                                href="https://github.com/iskan-dar/"
                                rel="noreferrer"
                            >
                                <img src="https://img.shields.io/badge/my_github-black?logo=github&logoColor=white&style=for-the-badge" />
                            </a>
                            &nbsp;&nbsp;&nbsp;
                            <a
                                className={style.contactsBtn}
                                target="_blank"
                                href="https://wa.me/46720358488"
                                rel="noreferrer"
                            >
                                <img src="https://img.shields.io/badge/my_whatsapp-darkgreen?logo=whatsapp&logoColor=white&style=for-the-badge" />
                            </a>
                            &nbsp;&nbsp;&nbsp;
                            <a
                                className={style.contactsBtn}
                                target="_blank"
                                href="https://t.me/iskandaru"
                                rel="noreferrer"
                            >
                                <img src="https://img.shields.io/badge/my_telegram-white?logo=telegram&logoColor=white&style=for-the-badge" />
                            </a>
                            &nbsp;&nbsp;&nbsp;
                            <a
                                className={style.contactsBtn}
                                target="_blank"
                                href="mailto:iskandar.umarov@hotmail.com"
                                rel="noreferrer"
                            >
                                <img src="https://img.shields.io/badge/my_email-blue?logo=gmail&logoColor=white&style=for-the-badge" />
                            </a>
                            &nbsp;&nbsp;&nbsp;
                        </p>
                    </div>
                    <p>
                        My stack: React, Redux, NodeJS, Express, PostgreSQL, THREE JS,
                        Socket.IO
                    </p>
                </div>

                <div className={style.stackBox}>
                    <div className={style.iconBackground}>
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/react/react-original-wordmark.svg"
                            title="React"
                            alt="React"
                            width="70"
                            height="70"
                        />
                    </div>
                    <div className={style.iconBackground}>
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/redux/redux-original.svg"
                            title="Redux"
                            alt="Redux "
                            width="70"
                            height="70"
                        />
                    </div>
                    <div className={style.iconBackground}>
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/nodejs/nodejs-original-wordmark.svg"
                            title="NodeJS"
                            alt="NodeJS"
                            width="70"
                            height="70"
                        />
                    </div>
                    <div className={style.iconBackground}>
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/express/express-original-wordmark.svg"
                            title="Express"
                            alt="Express"
                            width="70"
                            height="70"
                        />
                    </div>
                    <div className={style.iconBackground}>
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/postgresql/postgresql-original-wordmark.svg"
                            title="PostgreSQL"
                            alt="PostgreSQL"
                            width="70"
                            height="70"
                        />
                    </div>
                    <div className={style.iconBackground}>
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/threejs/threejs-original-wordmark.svg"
                            title="ThreeJS"
                            alt="ThreeJS"
                            width="70"
                            height="70"
                        />
                    </div>
                    <div className={style.iconBackground}>
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/socketio/socketio-original-wordmark.svg"
                            title="Socket.io"
                            alt="Socket.io"
                            width="70"
                            height="70"
                        />
                    </div>
                </div>
                <div className={style.projectBox}>
                    <h3>My projects</h3>
                    <p>Crossy Road replica. The game you are playing :) </p>
                    <a className={style.projectBtn} href="https://iskan-dar.github.io/crossy-road-threejs-reactjs/">
                        Crossy Road CV
                    </a>
                    <p>
                        Fun Ai app which identifies your gender, age, face emotions and talks back to you
                    </p>
                    <a className={style.projectBtn} href="https://fun-ai.herokuapp.com/">Fun Ai</a>
                    <p>Online store for 3D art miniatures with preview of 3D models</p>
                    <a className={style.projectBtn} href="https://github.com/iskan-dar/galactic_miniatures">
                        Galactic miniatures
                    </a>
                </div>
            </div>
        </div>
    );
}
