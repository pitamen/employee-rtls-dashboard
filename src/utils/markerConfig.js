// import fiberKingIcon from '../img/vendor-markers/fiber-king/nst.png';
// import fiberKingISTIcon from '../img/vendor-markers/fiber-king/ticket2.png';

//new icons
import fiberKingIcon from '../img/vendor-markers/fiber-king/nst-new-a.png';
import fiberKingISTIcon from '../img/vendor-markers/fiber-king/ist-new-a.png';
import smartenIcon from '../img/vendor-markers/smarten/nst.png'
import smartenISTIcon from '../img/vendor-markers/smarten/ist.png';
import optinetIcon from '../img/vendor-markers/optinet/nst-new-a.png'
import optinetISTIcon from '../img/vendor-markers/optinet/ist-new-a.png'
import paschimanchalIcon from '../img/vendor-markers/paschimanchal/ist.png'
import paschimanchalISTIcon from '../img/vendor-markers/paschimanchal/nst.png'

export const markerConfig = {
    "Fiber King": {
        "IST/OST": {
            mapIconColor: '#FF0000', // Red color for IST/OST employees
            mapIconColorInnerCircle: '#0000FF',
            pinInnerCircleRadius: 10,
            icon_url: fiberKingISTIcon
        },
        "NST": {
            mapIconColor: '#0000FF', // Blue color for NST employees
            mapIconColorInnerCircle: '#FFFFFF',
            pinInnerCircleRadius: 10,
            icon_url: fiberKingIcon
        },
        "default": {
            icon_url: fiberKingISTIcon
        }
    },
    "DMN(P)": {
        "IST/OST": {
            mapIconColor: '#FF0000', // Red color for IST/OST employees
            mapIconColorInnerCircle: '#0000FF',
            pinInnerCircleRadius: 10,
            icon_url: optinetISTIcon
        },
        "NST": {
            mapIconColor: '#0000FF', // Blue color for NST employees
            mapIconColorInnerCircle: '#FFFFFF',
            pinInnerCircleRadius: 10,
            icon_url: optinetIcon
        },
        "default": {
            icon_url: optinetIcon
        }
    },
    "Smarten": {
        "IST/OST": {
            mapIconColor: '#FF0000', // Red color for IST/OST employees
            mapIconColorInnerCircle: '#0000FF',
            pinInnerCircleRadius: 10,
            icon_url: smartenISTIcon
        },
        "NST": {
            mapIconColor: '#0000FF', // Blue color for NST employees
            mapIconColorInnerCircle: '#FFFFFF',
            pinInnerCircleRadius: 10,
            icon_url: smartenIcon
        },
        "default": {
            icon_url: smartenISTIcon
        }
    },
    "Optinet": {
        "IST/OST": {
            mapIconColor: '#FF0000', // Red color for IST/OST employees
            mapIconColorInnerCircle: '#0000FF',
            pinInnerCircleRadius: 10,
            icon_url: optinetISTIcon
        },
        "NST": {
            mapIconColor: '#0000FF', // Blue color for NST employees
            mapIconColorInnerCircle: '#FFFFFF',
            pinInnerCircleRadius: 10,
            icon_url: optinetIcon
        },
        "default": {
            icon_url: optinetIcon
        }
    },
    "Paschimanchal": {
        "IST/OST": {
            mapIconColor: '#FF0000', // Red color for IST/OST employees
            mapIconColorInnerCircle: '#0000FF',
            pinInnerCircleRadius: 10,
            icon_url: paschimanchalISTIcon
        },
        "NST": {
            mapIconColor: '#0000FF', // Blue color for NST employees
            mapIconColorInnerCircle: '#FFFFFF',
            pinInnerCircleRadius: 10,
            icon_url: paschimanchalIcon
        },
        "default": {
            icon_url: paschimanchalIcon
        }
    }

};