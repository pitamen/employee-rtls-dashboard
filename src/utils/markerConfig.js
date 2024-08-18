// import fiberKingIcon from '../img/vendor-markers/fiber-king/nst.png';
// import fiberKingISTIcon from '../img/vendor-markers/fiber-king/ticket2.png';

//new icons
import fiberKingIcon from '../img/vendor-markers/fiber-king/nst-new-a.png';
import fiberKingISTIcon from '../img/vendor-markers/fiber-king/ist-new-a.png';
import smartenIcon from '../img/vendor-markers/smarten/nst.png'
import smartenISTIcon from '../img/vendor-markers/smarten/ist.png';

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
    "DMN(P)": {
        "IST/OST": {
            mapIconColor: '#00FF00', // Green color for IST/OST employees
            mapIconColorInnerCircle: '#FFFFFF',
            pinInnerCircleRadius: 10,
        },
        "NST": {
            mapIconColor: '#FFFF00', // Yellow color for NST employees
            mapIconColorInnerCircle: '#FFFFFF',
            pinInnerCircleRadius: 10,
        },
        "default": {
            icon_url: fiberKingIcon
        }
    }
};