import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { LanguageContext } from '../../../App';

const DeliveryNotServing = () => {
    const history = useHistory();
    const { language } = useContext(LanguageContext);
    const goBack = () => {
        history.push('/info')
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

