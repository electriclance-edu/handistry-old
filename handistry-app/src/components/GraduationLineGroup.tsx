/*------------
   IMPORTS
------------*/
import '../styles/style.css';

interface GraduationLineGroupProps {
    graduation : number;
}

/* A component for the graduated-volume measurement line markings */
function GraduationLineGroup(props : GraduationLineGroupProps) {
    return (
        <div className="GraduationLineGroup">
            <div className="markedLine">
                <div className="line"></div>
                <p>{props.graduation}</p>
            </div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    );
}

export default GraduationLineGroup;