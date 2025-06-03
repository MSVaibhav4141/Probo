import { ReactNode } from "react";

export default function PortfolioLayout({children}:{children: ReactNode}) {

    return(
        <div className="text-center px-80">
            {children}
        </div>
    )
}