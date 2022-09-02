import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer() {
    return (
        <React.Fragment>
            {/* Page Footer */}
            <footer className="bg-dark text-center text-light">
                
                {/* <div className="container p-4 pb-0"> */}
                  
                    {/* <section className="mb-3">
                     
                        <a className="btn btn-outline-light border-0 m-1" target="_blank" rel="noreferrer noopener"
                            href="mailto:benedictwcy@hotmail.com" role="button"><i className="bi bi-envelope-fill"></i></a>

                   
                        <a className="btn btn-outline-light border-0 m-1" target="_blank" rel="noreferrer noopener"
                            href="" role="button"><i className="bi bi-linkedin"></i></a>

                        <a className="btn btn-outline-light border-0 m-1" target="_blank" rel="noreferrer noopener"
                            href="" role="button"><i className="bi bi-github"></i></a>
                    </section> */}
                    {/* Section: Social media */}
                {/* </div> */}
                {/* Grid container */}

                {/* Copyright */}
                <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} >
                <div className="text-center p-3">
                <a className="btn btn-outline-light border-0 m-1" target="_blank" rel="noreferrer noopener"
                            href="" role="button"><i className="bi bi-envelope-fill"></i></a>

                        {/* Linkedin */}
                        <a className="btn btn-outline-light border-0 m-1" target="_blank" rel="noreferrer noopener"
                            href="" role="button"><i className="bi bi-linkedin"></i></a>

                        {/* Github */}
                        <a className="btn btn-outline-light border-0 m-1" target="_blank" rel="noreferrer noopener"
                            href="" role="button"><i className="bi bi-github"></i></a>
                </div>
                    © 2022. For educational purpose only.
                </div>
                {/* Copyright */}
            </footer>
            {/* Page Footer */}
        </React.Fragment>
    )
}