import React, { useContext } from 'react'
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const DeliveryNotServing = () => {
    const router = useRouter();
    const { language } = useContext(AppContext);
    const goBack = () => {
        router.push('/')
    }

    return (
        <div id="myModal" className="modal-made">
            <div className="modal-content-made">
                <p className="header-modal">
                    {language == "ltr"
                        ? "Currently Unavailable"
                        : "غير متاح حاليا"}{" "}
                </p>
                <p className="text-modal">
                    {" "}
                    {language == "ltr"
                        ? "We are not serving in this area."
                        : "نحن لا نخدم في هذه المنطقة."}{" "}
                </p>
                <div className="delivery-not-serving ">
                    <button onClick={goBack} className="red">
                        {language == "ltr" ? "Change Area" : 'منطقة التغيير'}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeliveryNotServing

