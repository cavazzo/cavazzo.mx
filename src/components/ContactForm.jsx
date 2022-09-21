import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const ContactForm = () => {
    const [ sendingMessage, setSendingMessage ] = useState(false);
    const [ formValues, setFormValues ] = useState({
        floating_name: "",
        floating_email: "",
        chk_WebSite: false,
        chk_API: false,
        chk_WinLin: false,
        chk_Desk: false,
        message: ""
    });
    const api_send = `https://api.cavazzo.com.mx/contact/notify`;

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        setSendingMessage(true);
        let subjects = [];

        if (formValues.chk_WebSite) { subjects.push("Web Site"); }
        if (formValues.chk_API) { subjects.push("Api Rest"); }
        if (formValues.chk_WinLin) { subjects.push("Windows/Linux Service"); }
        if (formValues.chk_Desk) { subjects.push("Desktop Application"); }

        if (formValues.floating_name != "" && formValues.floating_email != "" && subjects.length > 0) {
            const _subjects = subjects.toString();
            try {
                const request = await fetch(api_send, {
                    method: "POST",
                    body: JSON.stringify({
                        name: formValues.floating_name,
                        email: formValues.floating_email,
                        interest: _subjects,
                        message: formValues.message
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const response = await request.json();
                alert("Message sended");
            } catch (error) {
                console.error(error);
            }
        }

        setSendingMessage(false);
    }

    return (
        <div className="flex flex-col w-full h-full items-center px-2 md:px-0 mt-14 mb-20" id="contact-section" data-offset="85" data-item-section="Contact">
            <div className="mb-10 text-2xl font-bold">Contact information</div>
            <div className="flex flex-col md:flex-row w-8/12 h-full items-stretch rounded shadow-md shadow-gray-300 border border-gray-300">
                <div className="flex flex-col w-full md:w-5/12 rounded-l-md p-2.5">
                    <div className="flex flex-col w-full h-full pb-8 md:pb-0 px-8 rounded-lg bg-gradient-to-t to-emerald-500 from-emerald-300">
                        <div className="font-bold text-white text-center lg:text-left text-xl lg:text-2xl mt-10">How can i help you?</div>
                        <div className="font-bold text-white text-center lg:text-left text-opacity-80 mt-2 text-sm">Fill up the form and i will get back to you within 24 hours.</div>
                        <div className="flex flex-row w-full mt-10 text-sm lg:text-lg space-x-2">
                            <span className="text-violet-500 bg-white rounded-md py-0.5 px-2"><FontAwesomeIcon icon={faEnvelope} size="lg" /></span>
                            <span className="text-white">
                                <a href="mailto:jesus@cavazzo.com.mx" alt="Contact email">jesus@cavazzo.com.mx</a>
                            </span>
                        </div>
                        <div className="flex flex-row w-full mt-10 text-sm lg:text-lg space-x-2">
                            <span className="text-violet-500 bg-white rounded-md py-0.5 px-2"><FontAwesomeIcon icon={faLinkedin} size="lg" /></span>
                            <span className="text-white underline">
                                <a href="https://www.linkedin.com/in/cavazzo/" target="_blank">LinkedIn/cavazzo</a>
                            </span>
                        </div>
                        <div className="flex flex-row w-full mt-10 text-sm lg:text-lg space-x-2">
                            <span className="text-violet-500 bg-white rounded-md py-0.5 px-2"><FontAwesomeIcon icon={faGithub} size="lg" /></span>
                            <span className="text-white underline">
                                <a href="https://github.com/cavazzo" target="_blank">Github/cavazzo</a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-7/12 rounded-r-md py-12 px-5 space-y-5">
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        <div className="relative z-0 mb-6 w-full md:w-1/2 group">
                            <input type="text" name="floating_name" value={formValues.floating_name} onChange={handleInputChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer" placeholder=" " required />
                            <label htmlFor="floating_name" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Firts Name</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full md:w-1/2 group">
                            <input type="email" name="floating_email" value={formValues.floating_email} onChange={handleInputChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                    </div>
                    <div className="flex flex-col w-full space-y-5">
                        <div className="text-gray-600 font-bold text-base">Select the subjects of your interest</div>
                        <div className="flex flex-row flex-wrap w-full gap-5">
                            <div className="form-check">
                                <input name="chk_WebSite" checked={formValues.chk_WebSite} onChange={handleInputChange} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="Web Site" />
                                <label className="form-check-label inline-block text-gray-800" htmlFor="chk_WebSite">
                                    Web Site
                                </label>
                            </div>
                            <div className="form-check">
                                <input name="chk_API" checked={formValues.chk_API} onChange={handleInputChange} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="Api Rest" />
                                <label className="form-check-label inline-block text-gray-800" htmlFor="chk_API">
                                    Api Rest
                                </label>
                            </div>
                            <div className="form-check">
                                <input name="chk_WinLin" checked={formValues.chk_WinLin} onChange={handleInputChange} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="Windows/Linux Service" />
                                <label className="form-check-label inline-block text-gray-800" htmlFor="chk_WinLin">
                                    Windows/Linux Service
                                </label>
                            </div>
                            <div className="form-check">
                                <input name="chk_Desk" checked={formValues.chk_Desk} onChange={handleInputChange} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="Desktop Application" />
                                <label className="form-check-label inline-block text-gray-800" htmlFor="chk_Desk">
                                    Desktop Application
                                </label>
                            </div>
                        </div>
                        <div className="w-full">
                            <textarea name="message" value={formValues.message} onChange={handleInputChange} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg resize-none border border-gray-300 outline-1 outline-violet-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your message..."></textarea>
                        </div>
                        <div className="flex flex-row w-full h-full">
                            <button type="button" onClick={handleSubmit} disabled={sendingMessage} className="w-full inline-block px-6 py-2.5 bg-violet-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-700 active:shadow-lg transition duration-150 ease-in-out">
                                {
                                    sendingMessage ? <FontAwesomeIcon icon={faSpinner} spin={true} /> : "Send Message"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;