import Footer from "@components/events/Footer";
import { ReactNode } from "react";

export default function EventLayout({children}:{children:ReactNode}){

    return(
        <>
        <div className="mx-20 mt-10">
        {children}
            <Footer />
        </div>
        </>
    )
}