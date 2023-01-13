import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import classes from './Modal.module.css';

const modalRootElement = document.getElementById('modal');

const Modal = (props) => {
    const {open, onClose} = props;
    const element = useMemo(() => document.createElement('div'), []) 

    useEffect(() => {
        if (open){
            modalRootElement.appendChild(element)
            return () => {
                modalRootElement.removeChild(element)
            }
        }
    })

    if(open){
        return createPortal(
            <div className={classes.modalBackground} onClick={onClose}>
                {props.children}
            </div>
        , element)
    }
    return null;
}

export default Modal;
