import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './App.css'; 

const App = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        const templateParams = {
            to_email: email,
            message: message
        };

        emailjs.send('service_kiakddj', 'template_xoacuaw', templateParams, 'tyRWgViIpSDmDaaJ8')
            .then((response) => {
                setModalContent('تم إرسال البريد الإلكتروني بنجاح!');
                setIsSuccess(true);
                setModalVisible(true);
            })
            .catch((error) => {
                setModalContent('حدث خطأ أثناء إرسال البريد، يرجى المحاولة مرة أخرى.');
                setIsSuccess(false);
                setModalVisible(true);
            });

        setEmail('');
        setMessage('');
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-100 p-5">
            <h1 className="text-3xl font-bold mb-5 text-orange-700">إرسال رسالة عبر البريد الإلكتروني</h1>
            <form onSubmit={sendEmail} className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    أدخل بريدك الإلكتروني:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    اكتب رسالتك:
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                </label>
                <button type="submit" className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg">
                    إرسال البريد
                </button>
            </form>

            {/* Modal */}
            {modalVisible && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className={`bg-white rounded-lg shadow-lg p-6 w-80 transform transition-all ${isSuccess ? 'scale-100' : 'scale-95'}`}>
                            <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>×</button>
                            <div className="flex items-center">
                                {isSuccess ? (
                                    <svg className="w-6 h-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                                <h2 className={`font-bold text-lg ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>{isSuccess ? 'نجاح' : 'خطأ'}</h2>
                            </div>
                            <p className="mt-2 text-gray-700">{modalContent}</p>
                            <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg" onClick={closeModal}>إغلاق</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
