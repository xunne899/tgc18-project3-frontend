import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer() {
    return (
        <React.Fragment>
            {/*Footer */}
            <footer className="bg-dark text-center text-light">
                <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }} >
                <div className="text-center p-3">
                         {/*Email Tab*/}
                        <a className="btn btn-outline-light border-0 m-1" target="_blank"
                            href="" role="button"><i className="bi bi-envelope-fill"></i></a>
                        {/* Linkedin Tab*/}
                        <a className="btn btn-outline-light border-0 m-1" target="_blank" 
                            href="" role="button"><i className="bi bi-linkedin"></i></a>
                        {/* Github Tab*/}
                        <a className="btn btn-outline-light border-0 m-1" target="_blank" 
                            href="" role="button"><i className="bi bi-github"></i></a>
                </div>
                    © 2022. For educational purpose only.
                </div>
            </footer>
        </React.Fragment>
    )
}